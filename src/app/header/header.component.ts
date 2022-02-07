import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
  styleUrls:['/header.component.scss']
})

export class HeaderComponent{

  @Output() selectedView = new EventEmitter<string>()

  onSelect(selected: string){
    this.selectedView.emit(selected)
  }
}

