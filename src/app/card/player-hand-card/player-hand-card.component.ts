import {Component, HostBinding, Input} from '@angular/core';
import {Card} from '../../models/Card';
import {GameService} from '../../game.service';
import {Player} from '../../models/Player';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-player-hand-card',
  templateUrl: './player-hand-card.component.html',
  styleUrls: ['./player-hand-card.component.styl']
})
export class PlayerHandCardComponent {

  playerCard: Card;

  @Input() active = false;

  player: Player;

  sausages = 0;

  constructor() {

  }


  get card() {
    return this.playerCard;
  }

  @Input() set card(card: Card) {
    this.playerCard = card;
    if (this.playerCard.puttedToHand) {
      setTimeout(() => {
        // this.putToDeskSound.volume = 0.5;
        // this.putToDeskSound.play();
      }, 800);
    }

  }

  @HostBinding('class.disabled') get isActive() {
    return !this.active;
  }

  transitionEnd() {
    setTimeout(() => {
      this.playerCard.puttedToHand = false;
    }, 10);
  }
}
