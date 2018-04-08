import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';
import {Player} from '../models/Player';
import {PlayerService} from '../player.service';
import {Card, elemental} from '../models/Card';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class DeskComponent implements OnInit {

  gameId = '';

  playerCardsOnDesk = [];
  enemyCardsOnDesk = [
    new Card({
      attack: {
        value: 15,
        type: elemental.earth
      },
      defence: {
        value: 6,
        type: elemental.fire
      },
      sausageSteal: 8,
      avatar: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/658220.svg'
    }),
    new Card({
      attack: {
        value: 9,
        type: elemental.air
      },
      defence: {
        value: 11,
        type: elemental.fire
      },
      sausageSteal: 19,
      avatar: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/660109.svg'
    }),
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
      // this.showNewCard = true;
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
