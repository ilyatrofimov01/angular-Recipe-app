import { Ingredient } from "../shared/ingredient.model";
import { catchError, map, Subject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";


@Injectable({providedIn:"root"})
export default class ShoppingListService {
  startedEditing = new Subject();
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients = [];

  constructor(private http: HttpClient) {
  }
  getAllIngredients() {
    return this.http.get<Ingredient[]>(`${environment.firebaseUrl}/shopping-list.json`).pipe(
      map((shoppingListObj)=>{
        const shoppingListAsArray = [];
        for(let key in shoppingListObj){
          shoppingListAsArray.push(shoppingListObj[key])
        }
        return shoppingListAsArray;
      }),
      tap((shoppingList:Ingredient[]) => this.ingredients = shoppingList),
      catchError((err) => {
        console.log("Something went wrong", err)
        return []
      })
    )
  }

  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    return this.http.put(`${environment.firebaseUrl}/shopping-list/${ingredient.id}.json`,ingredient)
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      const foundedIndex = this.ingredients.findIndex(el => el.name === ingredient.name);
      if (foundedIndex !== -1) this.ingredients[foundedIndex].amount += ingredient.amount;
      else this.ingredients.push({...ingredient});
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients);
  }

  saveIngredients(){
    const modifiedIngredients =  this.ingredients
    return this.http.put<Ingredient[]>(`${environment.firebaseUrl}/shopping-list.json`,modifiedIngredients).pipe

  }
}
