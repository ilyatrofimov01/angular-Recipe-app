import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import ShoppingListService from "../../services/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import {Unit,unitList} from "../../enums/units";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild("f", {static: false}) slForm: NgForm;

  subscription: Subscription;
  editMode: boolean = false;
  editedItemId: number;

  unitListOptions: Unit[] = unitList;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((ingredientId: number) => {
      this.editMode = true;
      this.editedItemId = ingredientId;
      this.shoppingListService.getIngredientById(ingredientId).subscribe(ingredient => {
        this.slForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit
        });
      });
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredientId = new Date().valueOf();
    const newIngredient = new Ingredient(value.name, +value.amount, this.editMode ? this.editedItemId : newIngredientId, value.unit);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemId, newIngredient).subscribe(
        () => this.shoppingListService.getAllIngredients().subscribe());
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient).subscribe(() => this.shoppingListService.getAllIngredients().subscribe());
    }
    form.reset();
  }

  onClearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemId).subscribe(() => this.shoppingListService.getAllIngredients().subscribe());
    this.onClearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
