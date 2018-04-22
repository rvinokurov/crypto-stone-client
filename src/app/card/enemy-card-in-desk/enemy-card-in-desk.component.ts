import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Card} from '../../models/Card';
import {DeskActionsService} from '../../desk-actions.service';

@Component({
  selector: 'app-enemy-card-in-desk',
  templateUrl: './enemy-card-in-desk.component.html',
  styleUrls: ['./enemy-card-in-desk.component.styl']
})
export class EnemyCardInDeskComponent implements OnInit {
  putToDeskSound = new Audio('/assets/sound/put-to-desk.wav');
  attackMode = false;
  private playerCard: Card;

  constructor(private deskActionsService: DeskActionsService) {
    this.deskActionsService.cardInAttack.subscribe((cardInAttack: Card) => {
      this.attackMode = cardInAttack.inAttack;
    });
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

  @HostListener('click') target() {
    console.log('click', this.attackMode);
    if (this.attackMode) {
      this.deskActionsService.setTargetCard(this.playerCard);
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
