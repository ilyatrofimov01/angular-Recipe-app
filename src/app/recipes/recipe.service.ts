import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import ShoppingListService from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export default class RecipeService {
  recipesListChanges = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesListChanges.next(this.recipes.slice());
  }

  getAllRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes.find(recipe => recipe.id === id);
  }

  editRecipeById(id: number, newRecipe: Recipe) {
    const idx = this.recipes.findIndex(el => el.id === id);
    if (idx != -1) {
      this.recipes[idx] = newRecipe;
    }
  }

  addNewRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesListChanges.next(this.recipes.slice());
  }

  deleteRecipeById(id: number) {
    const idx = this.recipes.findIndex(recipe => recipe.id === id);
    this.recipes.splice(idx, 1);
    this.recipesListChanges.next(this.recipes.slice());
  }

}
