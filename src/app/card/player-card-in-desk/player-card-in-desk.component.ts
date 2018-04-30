import {Component, ElementRef, Renderer2} from '@angular/core';
import {CardAttackService} from '../card-attack.service';
import {AbstractCardInDeskComponent} from '../abstract.card-on-desk.component';
import {Card} from '../../models/Card';

@Component({
  selector: 'app-player-card-in-desk',
  templateUrl: './player-card-in-desk.component.html',
  styleUrls: ['./player-card-in-desk.component.styl']
})
export class PlayerCardInDeskComponent extends AbstractCardInDeskComponent {


  constructor(cardAttackService: CardAttackService, elementRef: ElementRef, renderer: Renderer2) {
    super(cardAttackService, elementRef, renderer);

     this.cardAttackService.cardInAttack.subscribe((cardInAttack: Card) => {
       if (cardInAttack.id !== this.playerCard.id) {
         this.playerCard.inAttack = false;
       }
     });
  }


}
