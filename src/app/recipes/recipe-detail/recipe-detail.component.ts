import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import RecipeService from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  recipeId: number;
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params.id
      this.recipe = this.recipeService.getRecipeById(+params.id);
    });
  }

  onEditRecipe() {
    this.router.navigate(["edit"], {relativeTo: this.route});
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipeById(this.recipeId);
    this.router.navigate(['/'])
  }
}
