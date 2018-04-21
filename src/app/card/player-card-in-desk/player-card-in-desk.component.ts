import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/Card';


@Component({
  selector: 'app-player-card-in-desk',
  templateUrl: './player-card-in-desk.component.html',
  styleUrls: ['./player-card-in-desk.component.styl']
})
export class PlayerCardInDeskComponent implements OnInit {


  private playerCard: Card;

  constructor() {
  }

  putToDeskSound = new Audio('/assets/sound/put-to-desk.wav');

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
    if (this.playerCard.puttedToDesk) {
      setTimeout(() => {
        this.playerCard.puttedToDesk = false;
      }, 1100);
    }
  }

  transitionEnd() {
    console.log('transend');
    this.playerCard.puttedToDesk = false;
  }

  ngOnInit() {
  }

}
