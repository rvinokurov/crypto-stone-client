import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';
import {Socket} from 'ng-socket-io';

import {Player} from '../models/Player';
import {Card} from '../models/Card';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../game.service';
import {GameModel} from '../models/Game';
import {Enemy} from '../models/Enemy';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class DeskComponent implements OnInit {

  guid = '';
  puid = '';

  playerCardsOnDesk = [];
  enemyCardsOnDesk = [];

  player: Player;
  enemy: Enemy;

  playerInAttack = false;

  showNewCard = false;


  newPlayerCard: Card;

  constructor(
    private gameService: GameService,
    private  route: ActivatedRoute,
    private socket: Socket
  ) {
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
    // setTimeout(() => {
    //   this.newPlayerCard = new Card({
    //     id: 0,
    //     attack: {
    //       value: 9,
    //       type: elemental.air
    //     },
    //     defence: {
    //       value: 11,
    //       type: elemental.fire
    //     },
    //     sausageSteal: 19,
    //     avatar: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/622943.svg'
    //   });
    //   this.showNewCard = true;
    // }, 1000);

  }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.guid = params.guid;
      this.puid = params.puid;

      this.socket.emit('register', this.puid);
      this.socket.on('random', (message) => {
        console.log('message', message);
      });

      this.socket.on('disconnect', () => {
        console.log('reconnect');
        this.socket.emit('register', this.puid);
      });

      this.gameService.getGame(this.guid, this.puid).subscribe((game: GameModel) => {
        this.player = game.player;
        this.enemy = game.enemy;
      });
      // this.enemy = this.playerService.getEnemy();

      // setTimeout(() => {
      //   this.newPlayerCard = new Card({
      //     attack: {
      //       value: 9,
      //       type: elemental.air
      //     },
      //     defence: {
      //       value: 11,
      //       type: elemental.fire
      //     },
      //     sausageSteal: 19,
      //     avatar: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/622943.svg'
      //   });
      //   this.showNewCard = true;
      // }, 10);
    });
  }

}
