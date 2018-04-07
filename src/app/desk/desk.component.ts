import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';
import {Player} from '../models/Player';
import {PlayerService} from '../player.service';
import {Card} from '../models/Card';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class DeskComponent implements OnInit {

  gameId: string = '';

  playerCardsOnDesk = [];
  enemyCardsOnDesk = [
    new Card(),
    new Card(),
  ];
  player: Player;

  enemy: Player;

  playerInAttack = false;

  showNewCard = false;

  constructor(private playerService: PlayerService, private  route: ActivatedRoute) {
  }


  selectToAttack(card: Card) {
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
    this.route.params.subscribe((params) => {
      this.gameId = params.gameId;
      this.player = this.playerService.getPlayer();
      this.enemy = this.playerService.getEnemy();
    });
  }

}
