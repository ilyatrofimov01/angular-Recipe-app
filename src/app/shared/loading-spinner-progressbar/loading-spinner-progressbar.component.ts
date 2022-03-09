import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner-progressbar',
  template: '<div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner-progressbar.component.scss']
})
export class LoadingSpinnerProgressbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
