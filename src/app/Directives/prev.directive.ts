import { Directive ,ElementRef,HostListener,Renderer2} from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private el: ElementRef) { }

  @HostListener("click")
  prevFunction() {
    const elm = this.el.nativeElement.parentElement.parentElement.querySelector('.candidat_featured_');
    const items = Array.from(elm.querySelectorAll('.item'));
    elm.insertBefore(items[items.length - 1], items[0]);
  }

}
