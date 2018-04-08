import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {Card} from '../models/Card';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.styl']
})
export class NewCardComponent implements OnInit {

  flipped = false;
  showed = false;

  @Input() card: Card;

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

  get defenceImage() {
    return `url('/assets/shield-${this.card.defence.type}.png')`;
  }

  get attackImage() {
    return `url('/assets/sword-${this.card.attack.type}.png')`;
  }

  @HostListener('click')
  flip() {
    this.flipped = true;
  }

}
