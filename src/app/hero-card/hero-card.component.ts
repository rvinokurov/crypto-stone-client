import {Component, ElementRef, Input, Renderer2} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Enemy} from '../models/Enemy';
import {Player} from '../models/Player';
import {offset} from '../card/offset';
import {CardAttackService} from '../card/card-attack.service';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.styl']
})
export class HeroCardComponent {

  @Input() isPlayerHero = false;

  @Input() player: Player | Enemy;

  constructor(private sanitizer: DomSanitizer, protected cardAttackService: CardAttackService, protected elementRef: ElementRef, protected renderer: Renderer2) {

    this.cardAttackService.requestOpponentHeroCoordsSubject.subscribe(() => {
      if (!this.isPlayerHero) {
        this.cardAttackService.opponentHeroCoordsSubject.next(offset(this.elementRef.nativeElement));
      }
    });

    this.cardAttackService.requestPlayerHeroCoordsSubject.subscribe(() => {
      if (this.isPlayerHero) {
        this.cardAttackService.playerHeroCoordsSubject.next(offset(this.elementRef.nativeElement));
      }
    });

  }

  get heroImage() {
    if (this.player && this.player.general) {
      return this.sanitizer.bypassSecurityTrustStyle(`url('${this.player.general.image_url}')`);
    }
    return '';
  }

}
