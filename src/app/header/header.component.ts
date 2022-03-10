import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Subscription } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["/header.component.scss"]
})

export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription
  saveSubscription: Subscription;

  isAuthenticated: boolean = false;
  isDataSaving: boolean = false;
  isError: boolean = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
  }

  onLogOut(){
    this.authService.logOut()
  }
  onSaveData() {
    this.isDataSaving = true;
    this.saveSubscription = this.dataStorageService.storeRecipes().subscribe({
        next: (requestResponse) => {
          this.isDataSaving = false;
          console.log("Data Saved", requestResponse);
        },
        error: (error) => {
          this.isError = true;
          console.log("Something went wrong Error: ", error);
        }
      }
    );
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.isError = false;
    this.userSubscription.unsubscribe()
    this.saveSubscription.unsubscribe();
  }
}

