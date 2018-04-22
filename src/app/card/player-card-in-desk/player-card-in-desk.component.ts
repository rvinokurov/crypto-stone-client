import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Card} from '../../models/Card';
import {CardAttackService} from '../card-attack.service';
import {offset} from '../offset';

@Component({
  selector: 'app-player-card-in-desk',
  templateUrl: './player-card-in-desk.component.html',
  styleUrls: ['./player-card-in-desk.component.styl']
})
export class PlayerCardInDeskComponent implements OnInit {


  inAttack = false;
  putToDeskSound = new Audio('/assets/sound/put-to-desk.wav');
  playerCard: Card;

  constructor(private cardAttackService: CardAttackService, private elementRef: ElementRef) {
    this.cardAttackService.cardInAttack.subscribe((cardInAttack: Card) => {
      if (cardInAttack.id !== this.playerCard.id) {
        this.playerCard.inAttack = false;
      }
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
    if (this.playerCard.puttedToDesk) {
      setTimeout(() => {
        this.playerCard.puttedToDesk = false;
      }, 1100);
    }
  }

  @HostListener('click') inAttackListener() {
    this.playerCard.inAttack = !this.playerCard.inAttack;
    this.cardAttackService.setCardInAttack(this.playerCard, offset(this.elementRef.nativeElement));
  }

  transitionEnd() {
    console.log('transend');
    this.playerCard.puttedToDesk = false;
  }

  ngOnInit() {
  }

}
