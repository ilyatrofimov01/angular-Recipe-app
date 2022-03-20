import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import RecipeService from "../services/recipe.service";
import {DeviceDetectorService} from "ngx-device-detector";
import ShoppingListService from "../services/shopping-list.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["/header.component.scss"]
})

export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  loadingRecipesSub: Subscription;
  loadingShoppingListSub: Subscription;
  isAuthenticated: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;
  isMobileDevice: boolean

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private deviceDetectorService: DeviceDetectorService,
    private shoppingListService: ShoppingListService
  ) {
  }

  ngOnInit() {
    this.isMobileDevice = this.deviceDetectorService.deviceType === "mobile"
    this.loadingRecipesSub = this.recipeService.isLoading.subscribe((isLoading) => this.isLoading = isLoading);
    this.loadingShoppingListSub = this.shoppingListService.isLoading.subscribe((isLoading) => this.isLoading = isLoading);
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
    this.loadingRecipesSub.unsubscribe();
    this.loadingShoppingListSub.unsubscribe();
  }
}

