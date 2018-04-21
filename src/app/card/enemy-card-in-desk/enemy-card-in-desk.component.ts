import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/Card';

@Component({
  selector: 'app-enemy-card-in-desk',
  templateUrl: './enemy-card-in-desk.component.html',
  styleUrls: ['./enemy-card-in-desk.component.styl']
})
export class EnemyCardInDeskComponent implements OnInit {
  putToDeskSound = new Audio('/assets/sound/put-to-desk.wav');
  private playerCard: Card;

  constructor() {
  }

  get card() {
    return this.playerCard;
  }

  @Input() set card(card: Card) {
    this.playerCard = card;
    if (this.playerCard.puttedToDesk) {
      setTimeout(() => {
        this.putToDeskSound.volume = 0.5;
        this.putToDeskSound.play();
      }, 800);
    }
  }

  transitionEnd() {
    console.log('transitionend');
    setTimeout(() => {
      this.playerCard.puttedToDesk = false;
    }, 10);
  }

  ngOnInit() {
  }

}
