import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { LoadingSpinnerProgressbarComponent } from "./loading-spinner-progressbar/loading-spinner-progressbar.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
   declarations:[
     AlertComponent,
     LoadingSpinnerComponent,
     LoadingSpinnerProgressbarComponent,
     PlaceholderDirective,
     DropdownDirective
   ],
  imports:[
    CommonModule,
  ],
  exports:[
    AlertComponent,
    LoadingSpinnerComponent,
    LoadingSpinnerProgressbarComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {

}
