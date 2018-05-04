import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from '../../models/Card';
import {CardAttackService} from '../card-attack.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl']
})
export class CardComponent {

  @Input() cardStyle = 'player';

  @Input() card: Card;

  @Input() destroyed = false;

  @Output() destroy = new EventEmitter<void>();

  attackMode = false;

  attacking = false;

  constructor(protected cardAttackService: CardAttackService) {

    this.cardAttackService.cardInAttack.subscribe((cardInAttack: Card) => {
      this.attackMode = cardInAttack.inAttack && this.cardStyle !== 'player';
      this.attacking = cardInAttack.inAttack  &&  cardInAttack.id === this.card.id;
    });
  }


  get defenceImage() {
    return `url('/assets/shield-${this.card.defence.type}.png')`;
  }

  get attackImage() {
    return `url('/assets/sword-${this.card.attack.type}.png')`;
  }

  destroyEnd() {
    this.destroy.emit();
  }


}
