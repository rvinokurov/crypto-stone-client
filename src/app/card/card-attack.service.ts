import {Injectable} from '@angular/core';
import {SocketIoService} from '../socket/socket-io.service';
import {Card} from '../models/Card';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ActionEvent, ActionObject, ActionSubject, ActionType, AttackSide} from '../models/ActionEnum';

export interface Coordinates {
  x: number;
  y: number;
}

@Injectable()
export class CardAttackService {

  private actionObservable: Observable<ActionEvent>;
  private cardInAttackSubject = new Subject<Card>();
  private targetCardSubject = new Subject<Card>();

  private attackingCard: Card;
  private targetCard: Card;

  private attackingCardCoords: Coordinates;
  private targetCardCoords: Coordinates;


  private cardAttackResultSubject = new Subject<{
    attackingCard: { id: number | string, damage: number },
    targetCard: { id: number | string, damage: number }
    side
  }>();

  constructor(private socketIoService: SocketIoService) {
    this.actionObservable = this.socketIoService.subscribe('action');
    this.actionObservable.subscribe((action: ActionEvent) => this.processAction(action));
  }

  get cardAttack() {
    return this.cardAttackResultSubject;
  }

  get cardInAttack() {
    return this.cardInAttackSubject;
  }

  setTargetCard(card: Card, coordinates: Coordinates) {
    this.targetCard = card;
    this.targetCardCoords = coordinates;

    console.log(card, coordinates);
    // this.attack(this.attackingCard, this.targetCard);
  }

  setCardInAttack(card: Card, coordinates: Coordinates) {
    this.attackingCard = card;
    this.attackingCardCoords = coordinates;
    console.log(card, coordinates);

    this.cardInAttackSubject.next(card);
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


  processAction(action: ActionEvent) {
    console.log(JSON.stringify(action, null, '   '));
    try {
      if (action.type === ActionType.attack) {
        if (action.object === ActionObject.card && action.subject === ActionSubject.card) {
          const {payload} = action;
          let side = AttackSide.attack;
          if (payload.side === AttackSide.defence) {
            side = AttackSide.defence;
          }
          const data = {
            attackingCard: {
              id: payload.objectId,
              damage: payload.damageToObject,
            },
            targetCard: {
              id: payload.subjectId,
              damage: payload.damageToSubject
            },
            side
          };
          this.cardAttackResultSubject.next(data);
        }
      }
    } catch (e) {
      console.log(e);
    }

  }


}
