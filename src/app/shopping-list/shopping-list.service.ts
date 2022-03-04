import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export default class ShoppingListService {
  startedEditing = new Subject()
  ingredientsChanged  = new Subject<Ingredient[]>()

  private ingredients =  [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]

  getAllIngredients(){
    return this.ingredients.slice() // using slice to give access just for copy
  }

  getIngredientByIndex (index: number){
      return this.ingredients[index]
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

  updateIngredient (index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.ingredients)
  }
}
