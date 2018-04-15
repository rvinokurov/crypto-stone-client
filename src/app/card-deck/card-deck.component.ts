import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.styl'],
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
export class CardDeckComponent implements OnInit {

  @Input() card: Number;
  cardState = 'initial';

  constructor() {
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
