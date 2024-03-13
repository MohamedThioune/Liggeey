import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollTop]'
})
export class ScrollTopDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.el.nativeElement.scrollTop = 0;
  }

}
