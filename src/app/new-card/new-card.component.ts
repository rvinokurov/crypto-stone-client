import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.styl']
})
export class NewCardComponent implements OnInit {

  flipped = false;
  showed = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.renderer.addClass(this.elementRef.nativeElement, 'showed');
      setTimeout(() => {
        this.flipped = true;
      }, 200);
    }, 10);
  }

  @HostListener('click')
  flip() {
    this.flipped = true;
  }

}
