import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import ShoppingListService from "./shopping-list.service";
import { catchError, map, Subject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export default class RecipeService {

  recipesListChanges = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private shoppingListService: ShoppingListService) {
  }

  getAllRecipes() {
    return this.http.get(`${environment.firebaseUrl}/recipes-list.json`)
      .pipe(map(recipes => {
          const arrayRecipes = [];
          for (let key in recipes) {
            arrayRecipes.push(recipes[key]);
          }
          return arrayRecipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(fetchedRecipes => {
          console.log("inTapRecipes", fetchedRecipes);
          this.recipes = fetchedRecipes;
          this.recipesListChanges.next(fetchedRecipes);
        }),
        catchError(error => {
          console.log("Something went wrong", error);
          return [];
        }));
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.http.get<Recipe>(`${environment.firebaseUrl}/recipes-list/${id}.json`).pipe(map(recipe => {
        if (!recipe.ingredients) {
          return {...recipe, ingredients: []};
        }
        return recipe;
      }),
      catchError(error => {
        console.log("Something went wrong", error);
        return null;
      })
    );
  }

  getLocalRecipeById(id: number) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  editRecipeById(id: number, newRecipe: Recipe) {
    return this.http.put(`${environment.firebaseUrl}/recipes-list/${id}.json`, newRecipe).pipe(
      catchError(error => {
        console.log("Something went wrong", error);
        return null;
      })
    );
  }

  addNewRecipe(newRecipe: Recipe) {
    return this.editRecipeById(newRecipe.id, newRecipe);
  }

  deleteRecipeById(id: number) {
    return this.http.delete(`${environment.firebaseUrl}/recipes-list/${id}.json`).pipe(
      catchError(error => {
        console.log("Something went wrong", error);
        return null;
      }));
  }

}
