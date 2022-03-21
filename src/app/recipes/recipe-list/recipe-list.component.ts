import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Recipe } from "../recipe.model";
import RecipeService from "../../services/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { DeviceDetectorService } from "ngx-device-detector";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit, OnDestroy {

  @ViewChild("search", {static: false}) searchRef;
  recipes: Recipe[] = [];
  searchOriginalRecipes: Recipe[] = [];
  subscription: Subscription;
  isMobileDevice: boolean;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private deviceDetectorService: DeviceDetectorService
  ) {
  }

  ngOnInit(): void {
    this.isMobileDevice = this.deviceDetectorService.deviceType === "mobile";
    this.recipeService.getAllRecipes().subscribe();
    this.subscription = this.recipeService.recipesListChanges.subscribe((recipesList: Recipe[]) => {
      this.recipes = recipesList;
      this.searchOriginalRecipes = this.recipes;
    });
  }

  onNewRecipe() {
    this.router.navigate(["new"], {relativeTo: this.route});
  }

  onSearch(searchText) {
    this.recipes = this.searchOriginalRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  onSearchClear() {
    this.searchRef.nativeElement.value = "";
    this.recipes = this.searchOriginalRecipes;
  }

  ngOnDestroy() {
    this.onSearchClear();
    this.subscription.unsubscribe();
  }
}
