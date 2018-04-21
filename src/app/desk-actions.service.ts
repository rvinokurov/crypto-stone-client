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
  card = 'card',
  turn = 'turn'
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

let newCardMock = {
  "type": "draw",
  "object": "player",
  "subject": "card",
  "payload": {
    "card": {
      "id": 557899,
      "image_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/557899.png",
      "props": {
        "attack": {
          "value": 3,
          "bonus": 0,
          "prob": 0
        },
        "defense": {
          "value": 13,
          "bonus": 0,
          "prob": 0
        },
        "elementalOfAttack": {
          "value": 3
        },
        "elementalOfDefence": {
          "value": 3
        },
        "regeneration": {
          "value": 2,
          "bonus": 0,
          "prob": 0
        },
        "energy drain": {
          "value": 14,
          "bonus": 0,
          "prob": 0
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
  private newEnemyCardSubject = new Subject<void>();

  constructor(private socketIoService: SocketIoService) {
    this.actionObservable = this.socketIoService.subscribe('action');
    this.actionObservable.subscribe((action: ActionEvent) => this.processAction(action));
    // setInterval(() => {
    //   this.newPlayerCardSubject.next(GameModel.createCard(newCardMock.payload.card));
    // }, 3000);

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
          if (action.object === ActionObject.enemy) {
            this.newEnemyCardSubject.next();
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
