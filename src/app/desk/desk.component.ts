import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { DropEvent } from 'ng-drag-drop';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class DeskComponent implements OnInit {

  cards = [{}, {}, {}];
  enemyCards = [{}, {}, {}];

  playerCardsOnDesk = [];

  constructor() { }

  onCardDrop(e: DropEvent) {
    this.playerCardsOnDesk.push(e.dragData);
    this.cards.pop();
  }


  ngOnInit() {
  }

}
