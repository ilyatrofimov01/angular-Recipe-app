import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import ShoppingListService from "./shopping-list.service";
import { BehaviorSubject, catchError, map, Subject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export default class RecipeService {

  recipesListChanges = new Subject<Recipe[]>();
  isLoading = new BehaviorSubject<boolean>(false);
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private shoppingListService: ShoppingListService) {
  }

  setLoading(loading: boolean) {
    return this.isLoading.next(loading);
  }

  getAllRecipes() {
    this.setLoading(true);
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
          this.recipes = fetchedRecipes;
          this.recipesListChanges.next(fetchedRecipes);
          this.setLoading(false);

        }),
        catchError(error => {
          console.log("Something went wrong", error);
          this.setLoading(false);
          return [];

        }));
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    console.log(ingredients)
   // this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    this.setLoading(true);
    return this.http.get<Recipe>(`${environment.firebaseUrl}/recipes-list/${id}.json`).pipe(map(recipe => {
        if (!recipe.ingredients) {
          this.setLoading(false);
          return {...recipe, ingredients: []};
        }
        this.setLoading(false);
        return recipe;
      }),
      catchError(error => {
        console.log("Something went wrong", error);
        this.setLoading(false);
        return null;
      })
    );
  }

  getLocalRecipeById(id: number) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  editRecipeById(id: number, newRecipe: Recipe) {
    this.setLoading(true);
    return this.http.put(`${environment.firebaseUrl}/recipes-list/${id}.json`, newRecipe).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => {
        console.log("Something went wrong", error);
        this.setLoading(false);
        return null;
      })
    );
  }

  addNewRecipe(newRecipe: Recipe) {
    return this.editRecipeById(newRecipe.id, newRecipe);
  }

  deleteRecipeById(id: number) {
    this.setLoading(true);
    return this.http.delete(`${environment.firebaseUrl}/recipes-list/${id}.json`).pipe(
      tap(() => this.setLoading(false)),
      catchError(error => {
        console.log("Something went wrong", error);
        this.setLoading(false);
        return null;
      }));
  }

}
