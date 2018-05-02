import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Enemy} from '../models/Enemy';
import {Player} from '../models/Player';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.styl']
})
export class HeroCardComponent {

  @Input() isPlayerHero = false;

  @Input() player: Player | Enemy;

  constructor(private sanitizer: DomSanitizer) {
  }

  get heroImage() {
    if (this.player && this.player.general) {
      return this.sanitizer.bypassSecurityTrustStyle(`url('${this.player.general.image_url}')`);
    }
    return '';
  }

}
