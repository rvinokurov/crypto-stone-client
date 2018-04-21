import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../models/Card';

@Component({
  selector: 'app-enemy-card-in-desk',
  templateUrl: './enemy-card-in-desk.component.html',
  styleUrls: ['./enemy-card-in-desk.component.styl']
})
export class EnemyCardInDeskComponent implements OnInit {

  @Input() card: Card;

  constructor() {
  }

  ngOnInit() {
  }

}
