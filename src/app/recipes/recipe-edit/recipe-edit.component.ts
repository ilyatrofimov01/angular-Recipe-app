import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import RecipeService from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id: number
  editMode: boolean = false
  newName: string


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


}
