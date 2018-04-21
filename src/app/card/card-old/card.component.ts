import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Card} from '../../models/Card';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl'],
  animations: [
    trigger('cardState', [
      state('initial', style({
        transform: 'scale(0.5) translate3d(0, 1000rem, 0rem)'
      })),
      state('put', style({
        transform: 'scale(1.5) translate3d(0, 150%, 0)'
      })),
      state('putted', style({
        transform: 'scale(0.5) translate3d(0, 0, 0)'
      })),
      state('boomed', style({
        transform: 'scale(1.2) translate3d(0, 0, 0)'
      })),
      state('inited', style({
        transform: 'scale(1) translate3d(0, 0, 0)'
      })),
      transition('initial => put', animate('100ms ease-out')),
      transition('put => putted', animate('100ms ease-out')),
      transition('putted => boomed', animate('250ms ease-out')),
      transition('boomed => inited', animate('100ms ease-out')),
    ])
  ]
})
export class CardComponent implements OnInit {

  @Input() isPlayerCard = false;

  @Input() card: Card;

  // cardState = 'initial';
  cardState = null;

  @Input() puttedToDesk = false;

  constructor() {
  }

  @Input() set inAttack(inAttack) {
    if (inAttack) {
      this.puttedToDesk = false;
    }
  }

  get defenceImage() {
    return `url('/assets/shield-${this.card.defence.type}.png')`;
  }

  get attackImage() {
    return `url('/assets/sword-${this.card.attack.type}.png')`;
  }


  animatePut() {
    this.cardState = 'initial';
    setTimeout(() => {
      this.cardState = 'put';
    }, 100);
    setTimeout(() => {
      this.cardState = 'putted';
    }, 200);
    setTimeout(() => {
      this.cardState = 'boomed';
    }, 300);
    setTimeout(() => {
      this.cardState = 'inited';
    }, 550);
  }


  ngOnInit() {

  }

}
