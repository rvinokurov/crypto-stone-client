import {Component, HostBinding, Input} from '@angular/core';
import {Card} from '../models/Card';
import {Player} from '../models/Player';

@Component({
  selector: 'app-player-stats-table',
  templateUrl: './player-stats-table.component.html',
  styleUrls: ['./player-stats-table.component.styl']
})


export class PlayerStatsTableComponent {

  @Input() cardsOnDesk: Card[] = [];
  @Input() ourTurn = false;
  @Input() player: Player;
  @Input() isOpponent = false;

  constructor() {
  }

  get generation() {
    return this.cardsOnDesk.reduce((totalGeneration, card) => {
      return totalGeneration + card.sausageGeneration;
    }, 0);
  }

  get steal() {
    return this.cardsOnDesk.reduce((totalGeneration, card) => {
      return totalGeneration + card.sausageSteal;
    }, 0);
  }

  @HostBinding('class.isOpponent') get isOpponentStats() {
    return this.isOpponent;
  }


}
