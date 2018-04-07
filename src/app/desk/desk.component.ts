import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';
import {Player} from '../models/Player';
import {PlayerService} from '../player.service';
import {Card} from '../models/Card';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class DeskComponent implements OnInit {


  playerCardsOnDesk = [];
  enemyCardsOnDesk = [
    new Card(),
    new Card(),
  ];
  player: Player;

  enemy: Player;

  playerInAttack = false;

  showNewCard = false;

  constructor(private playerService: PlayerService, private elementRef: ElementRef) {
  }



  selectToAttack(card: Card) {
    console.log(card);
    card.inAttack = !card.inAttack;
    this.playerCardsOnDesk.forEach((c) => {
      if (c.id !== card.id) {
        c.inAttack = false;
      }
    });
    this.playerInAttack = card.inAttack;
  }

  onCardDrop(e: DropEvent) {
    this.playerCardsOnDesk.push(e.dragData);
    this.player.cards.pop();
    setTimeout(() => {
      this.showNewCard = true;
    }, 1000);

  }


  ngOnInit() {
    this.player = this.playerService.getPlayer();
    console.log(this.player);
    this.enemy = this.playerService.getEnemy();
  }

}
