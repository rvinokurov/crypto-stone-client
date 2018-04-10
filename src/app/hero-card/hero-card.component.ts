import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Player} from '../models/Player';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.styl']
})
export class HeroCardComponent implements OnInit {

  @Input() isPlayerHero = false;

  @Input() player: Player;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    console.log(this.player);
  }

  get heroImage() {
    if (this.player) {
      return this.sanitizer.bypassSecurityTrustStyle(`url('${this.player.hero.url}')`);
    }
    return '';
  }

}
