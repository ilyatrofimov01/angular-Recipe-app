import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../services/data-storage.service";
import { Observable } from "rxjs";
import RecipeService from "../services/recipe.service";

@Injectable({providedIn: "root"})

export class RecipesResolverService implements Resolve<Recipe[]>{
  constructor(private  dataStorageService:  DataStorageService, private recipeService: RecipeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getAllRecipes()
    if (recipes.length !== 0){
      console.log("RESOLVER")
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes
    }
  }

}
