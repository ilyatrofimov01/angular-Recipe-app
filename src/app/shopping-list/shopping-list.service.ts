import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export default class ShoppingListService {
  ingredientsChanged  = new Subject<Ingredient[]>()
  private ingredients =  [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]

  getAllIngredients(){
    return this.ingredients.slice() // using slice to give access just for copy
  }

  addIngredient(ingredient :Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      const foundedIndex  = this.ingredients.findIndex(el => el.name === ingredient.name)
      if (foundedIndex !== -1 ) this.ingredients[foundedIndex].amount += ingredient.amount
      else this.ingredients.push({...ingredient})
    }
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
