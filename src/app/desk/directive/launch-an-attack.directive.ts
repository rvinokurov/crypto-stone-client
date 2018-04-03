import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appLaunchAnAttack]'
})
export class LaunchAnAttackDirective {

  public inAttack = false;

  @Input() attackingCard: Object = {};
  @Input() classOnAttack = 'in-attack';

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  @HostListener('click') onStartAttack() {
    this.inAttack = !this.inAttack;
    if (this.inAttack) {
      this.renderer.addClass(this.el.nativeElement, this.classOnAttack);
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.classOnAttack);
    }
  }

}
