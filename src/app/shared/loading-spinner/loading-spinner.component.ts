import { Component } from "@angular/core";

@Component({
  selector:"app-spinner-component",
  template:"<div class=\"lds-ring\"><div></div><div></div><div></div><div></div></div>",
  styleUrls:["loading-spinner.component.scss"]
})
export class LoadingSpinnerComponent {

}
