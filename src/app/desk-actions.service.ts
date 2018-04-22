import {Injectable} from '@angular/core';
import {SocketIoService} from './socket/socket-io.service';
import {Card} from './models/Card';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {GameModel} from './models/Game';
import {EnemyCard} from './models/EnemyCard';
import {ActionEvent, ActionObject, ActionSubject, ActionType, AttackSide} from './models/ActionEnum';



let newCardMock = {
  'type': 'draw',
  'object': 'player',
  'subject': 'card',
  'payload': {
    'card': {
      'id': 557899,
      'image_url': 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/557899.png',
      'props': {
        'attack': {
          'value': 3,
          'bonus': 0,
          'prob': 0
        },
        'defense': {
          'value': 13,
          'bonus': 0,
          'prob': 0
        },
        'elementalOfAttack': {
          'value': 3
        },
        'elementalOfDefence': {
          'value': 3
        },
        'regeneration': {
          'value': 2,
          'bonus': 0,
          'prob': 0
        },
        'energy drain': {
          'value': 14,
          'bonus': 0,
          'prob': 0
        }
      }
    }
  }
};

@Injectable()
export class DeskActionsService {

  private actionObservable: Observable<ActionEvent>;
  private newPlayerCardSubject = new Subject<Card>();
  private enemyPlayCardSubject = new Subject<Card>();
  private newEnemyCardSubject = new Subject<EnemyCard>();


  constructor(private socketIoService: SocketIoService) {
    this.actionObservable = this.socketIoService.subscribe('action');
    this.actionObservable.subscribe((action: ActionEvent) => this.processAction(action));
    // setInterval(() => {
    //   this.newEnemyCardSubject.next(new EnemyCard());
    // }, 3000);

  }



  get onNewPlayerCard() {
    return this.newPlayerCardSubject;
  }

  get onNewEnemyCard() {
    return this.newEnemyCardSubject;
  }

  get onEnemyPlayCard() {
    return this.enemyPlayCardSubject;
  }



  attack(playerCard, enemyCard) {
    this.socketIoService.action(
      ActionType.attack,
      ActionSubject.card,
      {
        objectId: playerCard.id,
        subjectId: enemyCard.id
      },
      ActionObject.card);
  }

  endTurn() {
    this.socketIoService.action(ActionType.end, ActionSubject.turn, {});
  }

  processAction(action: ActionEvent) {
    console.log(JSON.stringify(action, null, '   '));
    try {

      if (action.type === ActionType.playCard && action.object === ActionObject.enemy) {
        this.enemyPlayCardSubject.next(GameModel.createCard(action.payload));
      }
      if (action.type === ActionType.draw) {
        if (action.subject === ActionSubject.card) {
          if (action.object === ActionObject.player) {
            this.newPlayerCardSubject.next(GameModel.createCard(action.payload.card));
          }
          if (action.object === ActionObject.opponent) {
            console.log('draw enemy card');
            this.newEnemyCardSubject.next(new EnemyCard());
          }
        }
      }
    } catch (e) {
      console.log(e);
    }

  }

  playCard(card: Card) {
    this.socketIoService.action(ActionType.playCard, ActionSubject.card, {id: card.id});
  }


}
