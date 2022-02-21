import { Component, ElementRef,  OnInit,  ViewChild } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import ShoppingListService from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {


  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef<HTMLInputElement>;


  constructor(private shoppingListService :ShoppingListService) {
  }

  onAdd() {
    const ingName = this.nameInputRef.nativeElement.value
    const ingAmount = parseInt(this.amountInputRef.nativeElement.value)
    const newIngredient = new Ingredient(ingName, ingAmount)
    this.shoppingListService.addIngredient(newIngredient)
  }

  ngOnInit(): void {
  }

}
