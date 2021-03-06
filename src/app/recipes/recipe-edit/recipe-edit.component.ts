import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import RecipeService from "../../services/recipe.service";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Recipe } from "../recipe.model";
import { Unit, unitList } from "../../enums/units";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.scss"]
})
export class RecipeEditComponent implements OnInit {

  id: number;
  recipeForm: FormGroup;
  editMode: boolean = false;
  ingredientsFormControls;
  unitListOptions: Unit[] = unitList

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params) {
        if (params.id) {
          this.id = +params.id;
          this.editMode = true;
        }
      }
    });
    this.initForm();
  }

  private initForm() {
    let recipeName = "";
    let imagePath = "";
    let recipeDescription = "";
    let ingredientsList = new FormArray([]);
    if (this.editMode) {
      const editedRecipe: Recipe = this.recipeService.getLocalRecipeById(this.id);
      recipeName = editedRecipe.name;
      recipeDescription = editedRecipe.description;
      imagePath = editedRecipe.imagePath;
      if (editedRecipe.ingredients?.length > 0) {
        for (let ingredient of editedRecipe.ingredients) {
          ingredientsList.push(new FormGroup({
            "name": new FormControl(ingredient.name),
            "amount": new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            "unit": new FormControl(ingredient.unit),
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: ingredientsList,
    });
    this.ingredientsFormControls = (this.recipeForm.get("ingredients") as FormArray).controls;
  }

  onAddIngredientForm() {
    (<FormArray>this.recipeForm.get("ingredients")).push(new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        unit: new FormControl(null, Validators.required)
      }
    ));
  }

  onSubmitForm() {
    const formValues = this.recipeForm.value;
    if (this.editMode) {
      const newRecipe = new Recipe(
        this.id, formValues.name, formValues.description, formValues.imagePath, formValues.ingredients
      );
      this.recipeService.editRecipeById(this.id, newRecipe).subscribe(() => {
        this.recipeService.getAllRecipes();
        this.onCancel();
      });
    } else {
      const newRecipeId = new Date().valueOf();
      const newRecipe = new Recipe(
        newRecipeId, formValues.name, formValues.description, formValues.imagePath, formValues.ingredients
      );
      this.recipeService.addNewRecipe(newRecipe).subscribe(() => {
          this.recipeService.getAllRecipes().subscribe();
          this.onCancel();
        }
      );
    }
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(["../"], {relativeTo: this.route});
  }

}
