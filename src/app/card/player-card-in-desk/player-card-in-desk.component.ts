import {Component, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';
import {CardAttackService} from '../card-attack.service';
import {AbstractCardInDeskComponent} from '../abstract.card-on-desk.component';
import {Card} from '../../models/Card';
import {offset} from '../offset';
import {DeskActionsService} from '../../desk-actions.service';

@Component({
  selector: 'app-player-card-in-desk',
  templateUrl: './player-card-in-desk.component.html',
  styleUrls: ['./player-card-in-desk.component.styl']
})
export class PlayerCardInDeskComponent extends AbstractCardInDeskComponent {

  @Input() active = false;


  constructor(
    cardAttackService: CardAttackService,
    elementRef: ElementRef,
    renderer: Renderer2,
    private deskActionsService: DeskActionsService
  ) {
    super(cardAttackService, elementRef, renderer);

    this.cardAttackService.cardInAttack.subscribe((cardInAttack: Card) => {
      if (cardInAttack.id !== this.playerCard.id) {
        this.playerCard.inAttack = false;
      }
    });

    this.cardAttackService.cardAttack.subscribe((result) => {
      if (result.attacking.id === this.playerCard.id) {
        this.playerCard.inAttack = false;
        this.cardAttackService.setCardInAttack(this.playerCard, offset(this.elementRef.nativeElement));
      }
    });

    this.deskActionsService.ourTurn.subscribe((ourTurn) => {
      if (ourTurn) {
        this.card.actionPoints = 1;
      }
    });

  }

  damageBurnAnimationEnd() {
    super.damageBurnAnimationEnd()
    this.card.actionPoints = 0;
  }

  @HostBinding('class.disabled') get isDisabled() {
    return !this.active || this.card.actionPoints === 0;
  }

  @HostListener('click') inAttackListener() {
    if (!this.active || this.isDisabled) {
      return;
    }
    this.playerCard.inAttack = !this.playerCard.inAttack;
    this.cardAttackService.setCardInAttack(this.playerCard, offset(this.elementRef.nativeElement));
  }


}
