import { Directive, ElementRef, HostListener, HostBinding, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})

export class DropdownDirective {
  constructor(private el: ElementRef,  private renderer: Renderer2){}

  @HostListener('click') onClick() {

   // this.renderer[hasClass ? 'removeClass' : 'addClass'](menu, 'show');
  }

  @HostListener('click') toggleOpen(){
    const menu = this.el.nativeElement.querySelector('.dropdown-menu')
    const hasClass = menu.classList.value.includes("show")
    this.renderer[hasClass ? 'removeClass' : 'addClass'](menu, 'show');

  }

}
