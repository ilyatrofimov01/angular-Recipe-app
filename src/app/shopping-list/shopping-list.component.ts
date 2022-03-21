import { Component, OnDestroy, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import ShoppingListService from "../services/shopping-list.service";
import { Subscription } from "rxjs";
import { findUnitLabel } from "../enums/units";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  findUnitLabelTemplate = findUnitLabel
  private igChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.shoppingListService.getAllIngredients().subscribe(remoteIngredientsList=> this.ingredients = remoteIngredientsList);
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  onEditItem(ingredientId: number) {
    this.shoppingListService.startedEditing.next(ingredientId);
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

}
