import { Ingredient } from "../shared/ingredient.model";
import { BehaviorSubject, catchError, map, Subject, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";


@Injectable({providedIn: "root"})
export default class ShoppingListService {
  startedEditing = new Subject<number>();
  ingredientsChanged = new BehaviorSubject<Ingredient[]>([]);
  isLoading = new BehaviorSubject<boolean>(false);

  private ingredients = [];

  constructor(private http: HttpClient) {
  }

  setLoading(loading: boolean) {
    return this.isLoading.next(loading);
  }

  getAllIngredients() {
    this.setLoading(true);
    return this.http.get<Ingredient[]>(`${environment.firebaseUrl}/shopping-list.json`).pipe(
      map((shoppingListObj) => {
        const shoppingListAsArray = [];
        for (let key in shoppingListObj) {
          shoppingListAsArray.push(shoppingListObj[key]);
        }
        return shoppingListAsArray;
      }),
      tap((shoppingList: Ingredient[]) => {
        this.ingredientsChanged.next(shoppingList);
        this.setLoading(false);
      }),
      catchError((err) => {
        console.log("Something went wrong", err);
        this.setLoading(false);
        return [];
      })
    );
  }

  getIngredientById(id: number) {
    this.setLoading(true);
    return this.http.get<Ingredient>(`${environment.firebaseUrl}/shopping-list/${id}.json`).pipe(
      tap(() => this.setLoading(false))
    );
  }

  addIngredient(ingredient: Ingredient) {
    this.setLoading(true);

    const compareExistIngredient = (ing) => ing.name === ingredient.name && ing.unit === ingredient.unit;

    const existIngredient = this.ingredientsChanged.getValue().find(compareExistIngredient);

    const newIngredient = existIngredient ? {
      ...existIngredient,
      amount: ingredient.amount + existIngredient.amount
    } : ingredient;

    return this.http.put(`${environment.firebaseUrl}/shopping-list/${existIngredient ? existIngredient.id : ingredient.id}.json`, newIngredient)
      .pipe(
        tap(() => this.setLoading(false)),
        catchError((error) => {
          console.log("Something went wrong", error);
          this.setLoading(false);
          return null;
        })
      );
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      const foundedIndex = this.ingredients.findIndex(el => el.name === ingredient.name);
      if (foundedIndex !== -1) this.ingredients[foundedIndex].amount += ingredient.amount;
      else this.ingredients.push({...ingredient});
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(id: number, newIngredient: Ingredient) {
    this.setLoading(true);
    return this.http.put(`${environment.firebaseUrl}/shopping-list/${id}.json`, newIngredient).pipe(
      tap(() => this.setLoading(false)),
      catchError((err) => {
        console.log("Something went wrong", err);
        return null;
      })
    );
  }

  deleteIngredient(id: number) {
    return this.http.delete(`${environment.firebaseUrl}/shopping-list/${id}.json`).pipe(
      tap(() => this.setLoading(false)),
      catchError((err) => {
        console.log("Something went Wrong", err);
        return null;
      })
    );
  }
}
