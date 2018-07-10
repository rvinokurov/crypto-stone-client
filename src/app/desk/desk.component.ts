import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';

import {Player} from '../models/Player';
import {Card} from '../models/Card';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../game.service';
import {GameModel} from '../models/Game';
import {Enemy} from '../models/Enemy';
import {SocketIoService} from '../socket/socket-io.service';
import {DeskActionsService} from '../desk-actions.service';
import {EnemyCard} from '../models/EnemyCard';
import {CardAttackService} from '../card/card-attack.service';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class DeskComponent implements OnInit {

  gid = '';
  pid = '';

  playerCardsOnDesk = [];
  enemyCardsOnDesk = [];

  player: Player;
  enemy: Enemy;

  attackingCard: Card | undefined;

  playerInAttack = false;

  showNewCard = false;

  newPlayerCard: Card;

  takeCardSound = new Audio('/assets/sound/card-take.wav');

  touchCardSound = new Audio('/assets/sound/card-take2.wav');

  endTurnSound = new Audio('/assets/sound/end-turn-2.wav');

  gameOver = false;
  ourTurn = false;

  cardCost = 30;

  constructor(
    private gameService: GameService,
    private  route: ActivatedRoute,
    private socketIoService: SocketIoService,
    private deskActionsService: DeskActionsService,
    private cardAttackService: CardAttackService,
  ) {
    this.touchCardSound.volume = 0.15;
  }

  cardIdentify(index, card) {
    return card.uuid;
  }

  get canDrag() {
    return this.ourTurn && (this.cardCost <= this.player.sausages);
  }

  requestCard() {
    this.deskActionsService.requestCard();
  }

  onCardOver() {
    this.touchCardSound.play();
  }

  onDragStart() {
    this.takeCardSound.play();
  }

  endTurn() {
    this.endTurnSound.play();
    this.deskActionsService.endTurn();
  }

  onCardDrop(e: DropEvent) {
    const deskCard: Card = e.dragData;
    deskCard.puttedToDesk = true;
    this.playerCardsOnDesk.push(deskCard);

    this.player.cards = this.player.cards.filter((card: Card) => card.uuid !== deskCard.uuid);
    this.deskActionsService.playCard(deskCard);
  }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.gid = params.gid;
      this.pid = params.pid;

      this.socketIoService.register(this.gid, this.pid);

      this.gameService.getGame(this.gid, this.pid).subscribe((game: GameModel) => {
        this.player = game.player;
        this.enemy = game.enemy;
        this.enemyCardsOnDesk = game.enemyCardsOnDesk;
        this.playerCardsOnDesk = game.playerCardsOnDesk;

        this.ourTurn = game.ourTurn;
        this.gameOver = game.gameOver;
      });

      this.deskActionsService.gameOver.subscribe((gameOver) => {
        this.gameOver = gameOver;
      });

      this.deskActionsService.ourTurn.subscribe((ourTurn) => {
        this.ourTurn = ourTurn;
      });

      this.deskActionsService.onNewPlayerCard.subscribe((card: Card) => {
        card.puttedToHand = true;
        this.player.cards.push(card);
      });

      this.deskActionsService.onNewEnemyCard.subscribe((card: EnemyCard) => {
        card.puttedToHand = true;
        this.enemy.cards.push(card);
      });

      this.deskActionsService.onEnemyPlayCard.subscribe((card: Card) => {
        card.puttedToDesk = true;
        this.enemyCardsOnDesk.push(card);
        this.enemy.cards.pop();
        this.deskActionsService.newEnemyElementSubject.next({
            type: card.attack.type
        });
        this.deskActionsService.newEnemyElementSubject.next({
          type: card.defence.type
        });
      });

      this.cardAttackService.cardInAttack.subscribe((cardInAttack: Card) => {
        this.playerInAttack = cardInAttack.inAttack;
        if (cardInAttack.inAttack) {
          this.attackingCard = cardInAttack;
        } else {
          this.attackingCard = undefined;
        }
      });

      this.cardAttackService.removeCardSubject.subscribe((id) => {
        this.enemyCardsOnDesk = this.enemyCardsOnDesk.filter((card) => {
          return card.uuid !== id;
        });
        this.playerCardsOnDesk = this.playerCardsOnDesk.filter((card) => {
          return card.uuid !== id;
        });
      });


    });
  }

}
