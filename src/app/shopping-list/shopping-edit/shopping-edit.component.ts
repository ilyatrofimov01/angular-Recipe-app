import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Ingredient } from "../../shared/ingredient.model";
import ShoppingListService from "../../services/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.scss"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild("f", {static: false}) slForm: NgForm;

  subscription: Subscription;
  editMode: boolean = false;
  editedItemIdx: number;
  editedItem: Ingredient;

   unitListOptions: {label: string,value: string}[] = [
    {label: "g", value: "g"},
    {label: "Kg", value: "kg"},
    {label: "Spoon", value: "spoon"},
    {label: "Tea Spoon", value: "teaSpoon"},
    {label: "Cup", value: "cup"},
    {label: "pcs", value: "pcs"},
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIdx = index;
      this.editedItem = this.shoppingListService.getIngredientByIndex(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredientId = new Date().valueOf();
    const newIngredient = new Ingredient(value.name, parseInt(value.amount), newIngredientId, value.unit);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIdx, newIngredient);
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient).subscribe();
    }
    form.reset();
  }

  onClearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIdx);
    this.onClearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
