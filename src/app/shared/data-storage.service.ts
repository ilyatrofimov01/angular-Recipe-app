import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import RecipeService from "../services/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { catchError, map, tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private router: Router) {
  }

  unAuthorizedError: boolean = false;

  fetchRecipes() {
    return this.http.get<Recipe[]>("https://angular-recipe-book-9e7c1-default-rtdb.europe-west1.firebasedatabase.app/recipes-list.json")
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }),
        catchError(error => {
          if (error.status === 401) {
            this.router.navigate(["unAuthorized"]);
          } else {
            console.log("Something went wrong", error);
          }
          return [];
        })
      );
  }

  storeRecipes() {
    const recipes = this.recipeService.getAllRecipes();
    // firebase always overwrite all data by put request
    return this.http.put("https://angular-recipe-book-9e7c1-default-rtdb.europe-west1.firebasedatabase.app/recipes-list.json", recipes);
  }

}

