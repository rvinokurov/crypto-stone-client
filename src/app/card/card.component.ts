import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl'],
  animations: [
    trigger('cardState', [
      state('initial', style({
        transform: 'scale(0)'
      })),
      state('boom',   style({
        transform: 'scale(1.5)'
      })),
      state('inited',   style({
        transform: 'scale(1)'
      })),
      transition('initial => boom', animate('150ms ease-out')),
      transition('boom => inited', animate('150ms ease-out'))
    ])
  ]
})
export class CardComponent implements OnInit {

  @Input() isPlayerCard  = false;

  @Input() card: Object;

  cardState = 'initial';

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.cardState = 'boom';
    }, 200);
    setTimeout(() => {
      this.cardState = 'inited';
    }, 400);
  }

}
