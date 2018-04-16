import {Injectable} from '@angular/core';
import {SocketIoService} from './socket-io.service';
import {Card} from './models/Card';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {GameModel} from './models/Game';
import {Player} from './models/Player';

export enum ActionObject {
  player = 'player',
  enemy = 'enemy'
}


export enum ActionSubject {
  card = 'card',
  turn  = 'turn'
}

export enum ActionType {
  playCard = 'play',
  draw = 'draw',
  end = 'end'
}

export interface ActionEvent {
  type: ActionType;
  object?: ActionObject;
  payload?: any;
  subject: ActionSubject;
}

@Injectable()
export class DeskActionsService {

  private actionObservable: Observable<ActionEvent>;
  private newPlayerCardSubject = new Subject<Card>();
  private enemyPlayCardSubject = new Subject<Card>();
  private newEnemyCardSubject = new Subject<void>();

  constructor(private socketIoService: SocketIoService) {
    this.actionObservable = this.socketIoService.subscribe('action');
    this.actionObservable.subscribe((action: ActionEvent) => this.processAction(action));

  }

  get onNewPlayerCard() {
    return this.newPlayerCardSubject;
  }

  get onNewEnemyrCard() {
    return this.newEnemyCardSubject;
  }

  get onEnemyPlayCard() {
    return this.enemyPlayCardSubject;
  }

  endTurn() {
    this.socketIoService.action(ActionType.end, ActionSubject.turn, {});
  }

  processAction(action: ActionEvent) {
    console.log(action);
    if (action.type === ActionType.playCard && action.object === ActionObject.enemy) {
      this.enemyPlayCardSubject.next(GameModel.createCard(action.payload));
    }
    if (action.type === ActionType.draw) {
      if (action.subject === ActionSubject.card) {
        if (action.object === ActionObject.player) {
          this.newPlayerCardSubject.next(GameModel.createCard(action.payload));
        }
        if (action.object === ActionObject.enemy) {
          this.newEnemyCardSubject.next();
        }
      }
    }
  }

  playCard(card: Card) {
    this.socketIoService.action(ActionType.playCard, ActionSubject.card, {id: card.id});
  }


}
