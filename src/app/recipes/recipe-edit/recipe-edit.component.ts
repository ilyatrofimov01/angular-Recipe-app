import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import RecipeService from "../recipe.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnChanges {
  @ViewChild('form') editForm : NgForm

  id: number
  editMode: boolean = false
  disableSubmitButton : boolean = true
  answer: string = ""

  constructor(private route: ActivatedRoute, private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params){
        if(params.id){
          this.id = +params.id
          this.editMode = true
        }
      }
    })
  }
  ngOnChanges(){
    this.disableSubmitButton = this.editForm.valid
  }
  onSubmitForm(){
    console.log(this.editForm)
  }

}
