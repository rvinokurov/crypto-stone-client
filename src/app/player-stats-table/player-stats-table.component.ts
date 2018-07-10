import {Component, HostBinding, Input} from '@angular/core';
import {Card} from '../models/Card';
import {Player} from '../models/Player';
import {DeskActionsService} from '../desk-actions.service';

@Component({
  selector: 'app-player-stats-table',
  templateUrl: './player-stats-table.component.html',
  styleUrls: ['./player-stats-table.component.styl']
})


export class PlayerStatsTableComponent {

  @Input() playerCardsOnDesk: Card[] = [];
  @Input() opponentCardsOnDesk: Card[] = [];
  @Input() ourTurn = false;
  @Input() player: Player;
  @Input() isOpponent = false;

  constructor(private deskActionsService: DeskActionsService) {
    this.deskActionsService.gameStateChangeSubject.subscribe((gameState) => {
      if (gameState.playerId === this.player.uuid) {
        if ('sausages' in gameState) {
          this.player.sausages = gameState.sausages.newValue;
        }
      }
    });
  }

  get generation() {
    return this.playerCardsOnDesk.reduce((totalGeneration, card) => {
      return totalGeneration + card.sausageGeneration;
    }, 0);
  }

  get steal() {
    return this.opponentCardsOnDesk.reduce((totalSteal, card) => {
      return totalSteal + card.sausageSteal;
    }, 0);
  }

  @HostBinding('class.isOpponent') get isOpponentStats() {
    return this.isOpponent;
  }


}
