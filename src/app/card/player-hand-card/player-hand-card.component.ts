import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/Card';

@Component({
  selector: 'app-player-hand-card',
  templateUrl: './player-hand-card.component.html',
  styleUrls: ['./player-hand-card.component.styl']
})
export class PlayerHandCardComponent implements OnInit {

  private playerCard: Card;

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

  ngOnInit() {
  }


  transitionEnd() {
    console.log('transitionend');
    setTimeout(() => {
      this.playerCard.puttedToHand = false;
    }, 10);
  }
}
