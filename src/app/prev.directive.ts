import { Directive ,ElementRef,HostListener,Renderer2} from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private el:ElementRef,private renderer: Renderer2) { }
  @HostListener("click")
  prevFunction(){
    var elm = this.el.nativeElement.parentElement.children[0];
    var item = elm.getElementsByClassName("item");
    elm.prepend(item[item.length - 1]);  
   
    
  }

}
