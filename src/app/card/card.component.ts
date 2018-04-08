import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Card} from '../models/Card';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl'],
  animations: [
    trigger('cardState', [
      state('initial', style({
        transform: 'scale(0)'
      })),
      state('boom', style({
        transform: 'scale(1.5)'
      })),
      state('inited', style({
        transform: 'scale(1)'
      })),
      transition('initial => boom', animate('150ms ease-out')),
      transition('boom => inited', animate('150ms ease-out'))
    ])
  ]
})
export class CardComponent implements OnInit {

  @Input() isPlayerCard = false;

  @Input() card: Card;

  cardState = 'initial';

  constructor() {
  }

  get defenceImage() {
    return `url('/assets/shield-${this.card.defence.type}.png')`;
  }

  get attackImage() {
    return `url('/assets/sword-${this.card.attack.type}.png')`;
  }

  ngOnInit() {
    setTimeout(() => {
      this.cardState = 'boom';
    }, 200);
    setTimeout(() => {
      this.cardState = 'inited';
    }, 400);
  }

}
