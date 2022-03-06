import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import ShoppingListService from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export default class RecipeService {
  recipesListChanges = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(1, "BBQ",
      "Test Description",
      "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
      [
        new Ingredient("ribs", 1),
        new Ingredient("tomatoes", 2),
        new Ingredient("souse", 1)
      ]),
    new Recipe(2, "Big Burger",
      "Second recipe Description",
      "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/5:4/w_3129,h_2503,c_limit/Smashburger-recipe-120219.jpg",
      [
        new Ingredient("beef cutlet", 1),
        new Ingredient("cheese", 2),
        new Ingredient("tomatoes", 1),
        new Ingredient("French Fries", 20)
      ]),
    new Recipe(
      3,
      "TURKEY POT PIE WITH BISCUITS",
      "Grease a 3 qt casserole dish.\n" +
      "In lg. saucepan, combine carrots and broth; bring to a boil. Reduce heat and cover.\n" +
      "Simmer for 5 minutes or til crisp-tender.\n" +
      "Heat oven to 400°F In small bowl, mix 1 1/2 cups milk& 1/4 cup flour.\n" +
      "Mix the milk mixture, sage, 1 T marg. and 1/2 t salt into carrot mixture. Bring back to a boil, constantly stirring.\n" +
      "Boil for approximately 1 min, add chicken and corn.\n" +
      "Pour into greased casserole dish.\n" +
      "In medium bowl, mix together the 1 cup flour, onions, baking powder, and 1/4 t salt.\n" +
      "Once mixed well stir in the 1/2 c milk and 1 T melted or soft marg. until soft dough forms.\n" +
      "Drop dough by spoonful evenly onto chicken mixture.\n" +
      "Bake at 400F for 20-25 minutes or till top is golden brown.\n" +
      "*Note-if not enough biscuits for your liking feel free to double up on the biscuit mix on the top turns out just as well.",
      "https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_562,h_316/v1/img/recipes/39/71/5/2Mv4QgxCTqCxf5onEb7B_turkey-pot-pie-biscuits-0613.jpg",
      [
        new Ingredient("PIE", 2),
        new Ingredient("BISCUITS", 1),
        new Ingredient("TURKEY Fries", 20)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {
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
