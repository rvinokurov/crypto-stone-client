import {Component, Input} from '@angular/core';
import {Card} from '../../models/Card';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl']
})
export class CardComponent {

  @Input() card: Card;

  get defenceImage() {
    return `url('/assets/shield-${this.card.defence.type}.png')`;
  }

  get attackImage() {
    return `url('/assets/sword-${this.card.attack.type}.png')`;
  }


}
