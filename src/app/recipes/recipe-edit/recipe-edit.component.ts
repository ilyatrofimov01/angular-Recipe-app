import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import RecipeService from "../recipe.service";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id: number
  recipeForm: FormGroup
  editMode: boolean = false

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params) {
        if (params.id) {
          this.id = +params.id
          this.editMode = true
        }
      }
    })
    this.initForm()
  }

  private initForm() {
    let recipeName = "еые"
    let imagePath = "3131"
    let recipeDescription = "ывфвф"
    if (this.editMode) {
      const editedRecipe: Recipe = this.recipeService.getRecipeById(this.id)
      recipeName = editedRecipe.name
      recipeDescription = editedRecipe.description
      imagePath = editedRecipe.imagePath
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(imagePath),
      'description': new FormControl(recipeDescription)
    })
  }


  onSubmitForm() {
    console.log(this.recipeForm)
  }

}
