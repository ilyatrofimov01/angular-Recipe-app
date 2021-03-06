import { Component, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import RecipeService from "../../services/recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { findUnitLabel } from "../../enums/units";
import ShoppingListService from "../../services/shopping-list.service";
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  recipeId: number;
  templateFindUnitLabel = findUnitLabel
  idUpdated = new EventEmitter<number>();
  gettingRecipeSub: Subscription;

  constructor(private recipeService: RecipeService,
              private shoppingService: ShoppingListService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idUpdated.subscribe(id => {
      this.gettingRecipeSub = this.recipeService.getRecipeById(id)
        .subscribe((recipe: Recipe | null) => recipe !== null ? this.recipe = recipe : null);
    });
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params.id;
      this.idUpdated.emit(+params.id);
    });
  }

  onEditRecipe() {
    this.router.navigate(["edit"], {relativeTo: this.route});
  }

  onAddToShoppingList() {
      this.shoppingService.getAllIngredients().subscribe((remoteIngredients: Ingredient[]) => {
        this.shoppingService.addRecipeIngredients(this.recipe.ingredients, remoteIngredients).subscribe()
      })
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipeById(this.recipeId).subscribe(() => this.recipeService.getAllRecipes().subscribe());
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.gettingRecipeSub.unsubscribe();
  }
}
