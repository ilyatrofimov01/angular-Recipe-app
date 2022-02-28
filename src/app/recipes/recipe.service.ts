import { EventEmitter, Injectable } from "@angular/core";
import { Recipe, RecipeEdits } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import ShoppingListService from "../shopping-list/shopping-list.service";

@Injectable()
export default class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(1,'BBQ',
      'Test Description',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
      [
        new Ingredient('ribs',1),
        new Ingredient('tomatoes',2),
        new Ingredient('souse',1)
      ]),
    new Recipe(2,'Big Burger',
      'Second recipe Description',
      'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/5:4/w_3129,h_2503,c_limit/Smashburger-recipe-120219.jpg',
      [
        new Ingredient('beef cutlet',1),
        new Ingredient('cheese',2),
        new Ingredient('tomatoes',1),
        new Ingredient('French Fries',20)
      ])
  ]
  constructor(private shoppingListService : ShoppingListService) {
  }

  getAllRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients)
  }
  getRecipeById (id: number){
    return this.recipes.find(recipe => recipe.id === id)
  }
  editRecipeById(id: number, changedFields:RecipeEdits){

  }
}
