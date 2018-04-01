import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.styl']
})
export class HeroCardComponent implements OnInit {

  @Input() isPlayerHero = false;

  constructor() {
  }

  ngOnInit() {
  }

}
