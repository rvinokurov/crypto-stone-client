import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {Card} from '../../models/Card';
import {CardAttackService} from '../card-attack.service';
import {offset} from '../offset';
import {AbstractCardInDeskComponent} from '../abstract.card-on-desk.component';

@Component({
  selector: 'app-enemy-card-in-desk',
  templateUrl: './enemy-card-in-desk.component.html',
  styleUrls: ['./enemy-card-in-desk.component.styl']
})
export class EnemyCardInDeskComponent extends AbstractCardInDeskComponent {
  attackMode = false;

  constructor(cardAttackService: CardAttackService, elementRef: ElementRef, renderer: Renderer2) {


    super(cardAttackService, elementRef, renderer);

    this.cardAttackService.cardInAttack.subscribe((cardInAttack: Card) => {
      this.attackMode = cardInAttack.inAttack;
    });
  }

  @HostListener('click') target() {
    console.log('click', this.attackMode);
    if (this.attackMode) {
      this.cardAttackService.setTargetCard(this.playerCard, offset(this.elementRef.nativeElement));
    }
  }


  protected getFlightTranslate(x: number, y: number) {
    return `${x / 2 -  this.size.width / 3 }px, ${y / 2  - this.size.height / 4 }px, 0`;
  }

  protected getAttackTranslate(x: number, y: number) {
    console.log(0, `${x}px, ${y - (this.size.height - this.size.height / 2)}px, 0`);
    return `${x}px, ${y - (this.size.height / 4)}px, 0`;
  }


  protected getPause1Translate(x: number, y: number) {
    console.log(1, `${x + 20}px, ${y + 20 - (this.size.height - this.size.height / 2)}px, 0`);
    return `${x - 10}px, ${y - 10 - ( this.size.height / 4)}px, 0`;
  }

  protected getPause2Translate(x: number, y: number) {
    console.log(2, `${x}px, ${y - (this.size.height - this.size.height / 2)}px, 0`);
    return `${x}px, ${y - ( this.size.height / 4}px, 0`;
  }


}
