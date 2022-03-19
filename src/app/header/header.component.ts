import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import RecipeService from "../services/recipe.service";
import {DeviceDetectorService} from "ngx-device-detector";

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
  isMobileDevice: boolean

  constructor(private authService: AuthService, private recipeService: RecipeService, private deviceDetectorService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.isMobileDevice = this.deviceDetectorService.deviceType === "mobile"
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

