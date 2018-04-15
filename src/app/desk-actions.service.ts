import {Injectable} from '@angular/core';
import {SocketIoService} from './socket-io.service';
import {Card} from './models/Card';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {GameModel} from './models/Game';

export enum ActionObject {
  player = 'player',
  enemy = 'enemy'
}


export enum ActionSubject {
  card = 'card'
}

export enum ActionType {
  playCard = 'play-card',
  draw = 'draw'
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

  processAction(action: ActionEvent) {
    console.log(action);
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
    this.socketIoService.action('play-card', 'card', {id: card.id});
  }


}
