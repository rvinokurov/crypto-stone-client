import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Card} from '../../models/Card';
import {AttackResult, CardAttackService} from '../card-attack.service';
import {offset} from '../offset';

@Component({
  selector: 'app-enemy-card-in-desk',
  templateUrl: './enemy-card-in-desk.component.html',
  styleUrls: ['./enemy-card-in-desk.component.styl']
})
export class EnemyCardInDeskComponent implements OnInit {
  putToDeskSound = new Audio('/assets/sound/put-to-desk.wav');
  attackMode = false;
  private playerCard: Card;
  private attackResult: AttackResult;

  constructor(private cardAttackService: CardAttackService, private elementRef: ElementRef) {
    this.cardAttackService.cardInAttack.subscribe((cardInAttack: Card) => {
      this.attackMode = cardInAttack.inAttack;
    });

    this.cardAttackService.cardAttack.subscribe((result) => {
      if (result.attackingCard.id === this.playerCard.id) {
        this.attackResult = result;
        this.finishAttack();
      }
    });

    this.cardAttackService.targetDefence.subscribe((result) => {
      if (result.id === this.playerCard.id) {
        this.playerCard.defence.value -= result.damage;
      }
    });
  }

  finishAttack() {
    this.playerCard.defence.value -= this.attackResult.attackingCard.damage;
    this.cardAttackService.finishAttack(this.attackResult.targetCard);
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
      this.cardAttackService.setTargetCard(this.playerCard, offset(this.elementRef.nativeElement));
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
