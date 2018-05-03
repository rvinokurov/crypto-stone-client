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


export interface AttackDamage {
  id: number | string;
  damage: number;
}

export interface AttackResult {
  attackingCard: AttackDamage;
  targetCard: AttackDamage;
  attackingCardCoordinates: Coordinates;
  targetCardCoordinates: Coordinates;
  side: AttackSide;
}

@Injectable()
export class CardAttackService {

  public attackingCardCoordsSubject = new Subject<Coordinates>();
  public targetCardCoordsSubject = new Subject<Coordinates>();
  public requestAttackingCardCoordsSubject = new Subject<number>();
  public requestTargetCardCoordsSubject = new Subject<number>();
  private actionObservable: Observable<ActionEvent>;
  private cardInAttackSubject = new Subject<Card>();
  private targetCardSubject = new Subject<Card>();
  private targetDefenceSubject = new Subject<AttackDamage>();
  private attackingCard: Card;
  private targetCard: Card;
  private attackingCardCoords: Coordinates;
  private targetCardCoords: Coordinates;
  private cardAttackResultSubject = new Subject<AttackResult>();
  removeCardSubject = new Subject<number>();

  constructor(private socketIoService: SocketIoService) {
    this.actionObservable = this.socketIoService.subscribe('action');
    console.log('obs', this.actionObservable);
    this.actionObservable.subscribe((action: ActionEvent) => this.processAction(action));
    this.attackingCardCoordsSubject.subscribe((coordinates) => {
      console.log('recieve attackin coords', coordinates);
      this.attackingCardCoords = coordinates;
    });

    this.targetCardCoordsSubject.subscribe((coordinates) => {
      console.log('recieve target coords', coordinates);
      this.targetCardCoords = coordinates;
    });
  }

  get cardAttack() {
    return this.cardAttackResultSubject;
  }

  get cardInAttack() {
    return this.cardInAttackSubject;
  }

  get targetDefence() {
    return this.targetDefenceSubject;
  }

  finishAttack(target: { id: number | string, damage: number }) {
    this.targetDefenceSubject.next(target);
  }

  setTargetCard(card: Card, coordinates: Coordinates) {
    this.targetCard = card;
    this.targetCardCoords = coordinates;

    console.log(card, coordinates);
    this.attack(this.attackingCard, this.targetCard);
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
            this.requestAttackingCardCoordsSubject.next(payload.objectId);
            this.requestTargetCardCoordsSubject.next(payload.subjectId);
            console.log("DEFENCE!!!");
            console.log(this.attackingCardCoords, this.targetCardCoords);
          }
          const data = {
            attackingCard: {
              id: payload.objectId,
              damage: (<any>action).damageToObject,
            },
            targetCard: {
              id: payload.subjectId,
              damage: (<any>action).damageToSubject
            },
            attackingCardCoordinates: this.attackingCardCoords,
            targetCardCoordinates: this.targetCardCoords,
            side
          };
          console.log('coords', data);
          this.cardAttackResultSubject.next(data);
        }
      }
    } catch (e) {
      console.log(e);
    }

  }


}
