import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Hero} from '../models/Hero';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.styl']
})
export class HeroCardComponent implements OnInit {

  @Input() isPlayerHero = false;

  @Input() hero: Hero;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    console.log(this.hero);
  }

  get heroImage() {
    if (this.hero) {
      return this.sanitizer.bypassSecurityTrustStyle(`url('${this.hero.url}')`);
    }
    return '';
  }

}
