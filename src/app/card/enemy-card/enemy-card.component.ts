import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/Card';

@Component({
  selector: 'app-enemy-card',
  templateUrl: './enemy-card.component.html',
  styleUrls: ['./enemy-card.component.styl']
})
export class EnemyCardComponent implements OnInit {

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
    setTimeout(() => {
      this.playerCard.puttedToHand = false;
    }, 10);
  }
}
