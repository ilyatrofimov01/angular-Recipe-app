import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loadedNav: string = "recipes"

  onNavigate(nav: string) {
    this.loadedNav = nav
  }
}
