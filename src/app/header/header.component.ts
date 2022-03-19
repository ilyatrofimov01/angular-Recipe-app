import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import RecipeService from "../services/recipe.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["/header.component.scss"]
})

export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  loadingSubscription: Subscription;
  isAuthenticated: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.recipeService.isLoading.subscribe((isLoading) => this.isLoading = isLoading);
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogOut() {
    this.authService.logOut();
  }

  onFetchRecipes() {
    this.recipeService.getAllRecipes().subscribe();
  }

  ngOnDestroy() {
    this.isError = false;
    this.userSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}

