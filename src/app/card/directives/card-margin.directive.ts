import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appCardMargin]'
})
export class CardMarginDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @Input('appCardMargin') set cardsCount(count) {
    let margin = (7.5 * count - 24) / (count * 2) + 0.1;
    if (margin < 1.4) {
      margin = 1.4;
    }



    this.renderer.setStyle(this.elementRef.nativeElement, 'margin-right', `-${margin}rem`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'margin-left', `-${margin}rem`);
  }

}
