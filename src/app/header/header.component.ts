import { Component, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["/header.component.scss"]
})

export class HeaderComponent implements OnDestroy {
  saveSubscription: Subscription;
  isDataSaving: boolean = false;
  isError: boolean = false;

  constructor(private dataStorageService: DataStorageService) {
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
          console.log("Something went wrong Error:", error);
        }
      }
    );
  }

  onFetchRecipes()  {
   this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.isError = false;
    this.saveSubscription.unsubscribe();
  }
}

