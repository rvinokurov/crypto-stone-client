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
  attacking: AttackDamage;
  target: AttackDamage;
  attackingCoordinates: Coordinates;
  targetCoordinates: Coordinates;
  side: AttackSide;
}

export interface General {
  id: string;
}

@Injectable()
export class CardAttackService {

  public attackingCoordsSubject = new Subject<Coordinates>();
  public targetCoordsSubject = new Subject<Coordinates>();
  public requestAttackingCoordsSubject = new Subject<number>();
  public requestTargetCoordsSubject = new Subject<number>();


  removeCardSubject = new Subject<number>();
  private actionObservable: Observable<ActionEvent>;
  private cardInAttackSubject = new Subject<Card>();
  private targetDefenceSubject = new Subject<AttackDamage>();
  private attacking: Card | General;
  private target: Card | General;
  private attackingCoords: Coordinates;
  private targetCoords: Coordinates;
  private cardAttackResultSubject = new Subject<AttackResult>();

  constructor(private socketIoService: SocketIoService) {
    this.actionObservable = this.socketIoService.subscribe('action');
    this.actionObservable.subscribe((action: ActionEvent) => this.processAction(action));

    this.attackingCoordsSubject.subscribe((coordinates) => {
      this.attackingCoords = coordinates;
    });
    this.targetCoordsSubject.subscribe((coordinates) => {
      this.targetCoords = coordinates;
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
    this.target = card;
    this.targetCoords = coordinates;

    console.log(card, coordinates);
    this.attack(this.attacking, this.target);
  }

  setTargetGeneral(general: General, coordinates: Coordinates) {
    this.target = general;
    this.targetCoords = coordinates;

    this.attackGeneral();
  }

  attackGeneral() {
    this.socketIoService.action(
      ActionType.attack,
      ActionSubject.card,
      {
        objectId: this.attacking.id,
        subjectId: this.target.id
      },
      ActionObject.card);
  }

  setCardInAttack(card: Card, coordinates: Coordinates) {
    this.attacking = card;
    this.attackingCoords = coordinates;
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

  //
  // attackGeneral(playerCard) {
  //   this.socketIoService.action(
  //     ActionType.attack,
  //     ActionSubject.card,
  //     {
  //       objectId: playerCard.id,
  //       // subjectId: enemyCard.id
  //     },
  //     ActionObject.card);
  // }

  processAction(action: ActionEvent) {
    console.log(JSON.stringify(action, null, '   '));
    try {
      if (action.type === ActionType.attack) {
        if (action.object === ActionObject.card && action.subject === ActionSubject.card) {
          const {payload} = action;
          let side = AttackSide.attack;
          if (payload.side === AttackSide.defence) {
            side = AttackSide.defence;
            this.requestAttackingCoordsSubject.next(payload.objectId);
            this.requestTargetCoordsSubject.next(payload.subjectId);
            console.log(this.attackingCoords, this.targetCoords);
          }
          const data = {
            attacking: {
              id: payload.objectId,
              damage: payload.damageToObject,
            },
            target: {
              id: payload.subjectId,
              damage: payload.damageToSubject
            },
            attackingCoordinates: this.attackingCoords,
            targetCoordinates: this.targetCoords,
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
