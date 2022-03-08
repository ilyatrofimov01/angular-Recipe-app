import { Component, OnDestroy, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import RecipeService from "../recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { DataStorageService } from "../../shared/data-storage.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private dataStorageService: DataStorageService) {
  }

  onNewRecipe() {
    this.router.navigate(["new"], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes().subscribe();
    this.subscription = this.recipeService.recipesListChanges.subscribe((recipesList: Recipe[]) => this.recipes = recipesList);
    this.recipes = this.recipeService.getAllRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
