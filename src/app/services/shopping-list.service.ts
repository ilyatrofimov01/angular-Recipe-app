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

  ingredientsArrayToObject(ingredients: Ingredient[]) {
    const ingredientsObj = {};
    ingredients.forEach(ingredient => ingredientsObj[ingredient.id] = ingredient);
    return ingredientsObj;
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

  addRecipeIngredients(newIngredients: Ingredient[], remoteIngredients: Ingredient[]) {
    this.setLoading(true);
    const newIngredientsToAdd = {};
    const foundInRemote = {};
    let notChangedRemoteIngredients = remoteIngredients;

    newIngredients.forEach(newIngredient => {
      const inRemote = (remoteIngredients.find(remoteIngredient => remoteIngredient.name === newIngredient.name));
      if (inRemote) {
        foundInRemote[inRemote.id] = {...inRemote, amount: inRemote.amount + newIngredient.amount};
        notChangedRemoteIngredients = notChangedRemoteIngredients.filter(el => el.id !== inRemote.id);
      } else {
        const newIngredientId = new Date().valueOf() + Math.floor(Math.random() * 100);
        newIngredientsToAdd[newIngredientId] = {...newIngredient, id: newIngredientId};
      }
    });
    const notChangedToSend = this.ingredientsArrayToObject(notChangedRemoteIngredients);
    return this.http.put(`${environment.firebaseUrl}/shopping-list.json`,
      {...foundInRemote, ...newIngredientsToAdd, ...notChangedToSend}).pipe(
      tap(() => this.setLoading(false)),
      catchError((err) => {
        console.log("Something went wrong", err);
        this.setLoading(false);
        return null;
      })
    );
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
