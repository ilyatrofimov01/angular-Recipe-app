import { Component, OnDestroy, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import RecipeService from "../../services/recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  recipeId: number;
  recipesSub: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.recipesSub = this.recipeService.recipesListChanges.subscribe(() => this.recipe = this.recipeService.getRecipeById(this.recipeId));
    // upper line - solution to fix the bug:when we opened exactly recipe details and reload page, page reloads without data, because we get
    // empty recipes array (in recipe.service) previously then data from Api loaded and we should get recipe details again, when we receive
    // data from back-end so there will be perfect solution to get recipe details by id from back-end endpoint, but i use firebase and can
    // get just all Recipes Array
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params.id;
      this.recipe = this.recipeService.getRecipeById(+params.id);
    });
  }

  onEditRecipe() {
    this.router.navigate(["edit"], {relativeTo: this.route});
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipeById(this.recipeId);
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe();
  }
}
