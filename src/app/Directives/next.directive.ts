import { Directive ,ElementRef,HostListener} from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el: ElementRef) { }

  @HostListener("click")
  nextFunction() {
    const elm = this.el.nativeElement.parentElement.parentElement.querySelector('.candidat_featured_');
    const items = Array.from(elm.querySelectorAll('.item'));
    elm.appendChild(items[0]);
  }

}
