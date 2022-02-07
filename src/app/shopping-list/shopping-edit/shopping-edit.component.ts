import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {


  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef<HTMLInputElement>;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();


  constructor() {
  }

  onAdd() {
    const ingName = this.nameInputRef.nativeElement.value
    const ingAmount = parseInt(this.amountInputRef.nativeElement.value)
    const newIngredient = new Ingredient(ingName, ingAmount)
    this.ingredientAdded.emit(newIngredient)
  }

  ngOnInit(): void {
  }

}
