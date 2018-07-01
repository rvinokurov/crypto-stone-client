import {Injectable} from '@angular/core';
import {SocketIoService} from './socket/socket-io.service';
import {Card, elemental} from './models/Card';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {GameModel} from './models/Game';
import {EnemyCard} from './models/EnemyCard';
import {ActionEvent, ActionObject, ActionSubject, ActionType} from './models/ActionEnum';

export interface GameState {
  playerId: string;
  sausages: {
    newValue: number;
    change: number;
  };
}


export interface Element {
  type: elemental;
}

@Injectable()
export class DeskActionsService {

  gameStateChangeSubject = new Subject<GameState>();
  newPlayerElementSubject = new Subject<Element>();
  newEnemyElementSubject = new Subject<Element>();
  private actionObservable: Observable<ActionEvent>;
  private newPlayerCardSubject = new Subject<Card>();
  private enemyPlayCardSubject = new Subject<Card>();
  private newEnemyCardSubject = new Subject<EnemyCard>();
  private ourTurnSubject = new Subject<boolean>();

  constructor(private socketIoService: SocketIoService) {
    this.actionObservable = this.socketIoService.subscribe('action');
    this.actionObservable.subscribe((action: ActionEvent) => this.processAction(action));
  }

  get ourTurn() {
    return this.ourTurnSubject;
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


  requestCard() {
    this.socketIoService.action(
      ActionType.draw,
      ActionSubject.player,
      {},
      ActionObject.card);
  }

  attack(playerCard, enemyCard) {
    this.socketIoService.action(
      ActionType.attack,
      ActionSubject.card,
      {
        objectId: playerCard.uuid,
        subjectId: enemyCard.uuid
      },
      ActionObject.card);
  }

  endTurn() {
    this.socketIoService.action(ActionType.end, ActionSubject.turn, {});
  }

  processAction(action: ActionEvent) {
    console.log(JSON.stringify(action, null, '   '));
    try {

      if (action.type === ActionType.change && action.subject === ActionSubject.state) {
        this.gameStateChangeSubject.next(<GameState>action.payload);
      }
      if (action.type === ActionType.playCard && action.object === ActionObject.enemy) {
        this.enemyPlayCardSubject.next(GameModel.createCard(action.payload));
      }
      if (action.type === ActionType.draw) {
        if (action.subject === ActionSubject.card) {
          if (action.object === ActionObject.player) {
            this.newPlayerCardSubject.next(GameModel.createCard(action.payload.card));
          }
          if (action.object === ActionObject.opponent) {
            this.newEnemyCardSubject.next(new EnemyCard());
          }
        }
      }
      if (action.subject === ActionSubject.turn) {
        if (action.type === ActionType.start) {
          this.ourTurnSubject.next(true);
        }
        if (action.type === ActionType.end) {
          this.ourTurnSubject.next(false);
        }
      }

    } catch (e) {
      console.log(e);
    }

  }

  playCard(card: Card) {
    this.newPlayerElementSubject.next({
      type: card.attack.type
    });
    this.newPlayerElementSubject.next({
      type: card.defence.type
    });
    this.socketIoService.action(ActionType.playCard, ActionSubject.card, {uuid: card.uuid});
  }


}
