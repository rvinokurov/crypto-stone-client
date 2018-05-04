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

@Injectable()
export class CardAttackService {

  public attackingCardCoordsSubject = new Subject<Coordinates>();
  public targetCardCoordsSubject = new Subject<Coordinates>();
  public requestAttackingCardCoordsSubject = new Subject<number>();
  public requestTargetCardCoordsSubject = new Subject<number>();


  public requestPlayerHeroCoordsSubject = new Subject<void>();
  public requestOpponentHeroCoordsSubject = new Subject<void>();
  public playerHeroCoordsSubject = new Subject<Coordinates>();
  public opponentHeroCoordsSubject = new Subject<Coordinates>();
  removeCardSubject = new Subject<number>();
  private actionObservable: Observable<ActionEvent>;
  private cardInAttackSubject = new Subject<Card>();
  private targetCardSubject = new Subject<Card>();
  private targetDefenceSubject = new Subject<AttackDamage>();
  private attacking: Card;
  private target: Card;
  private attackingCardCoords: Coordinates;
  private targetCardCoords: Coordinates;
  private opponentHeroCoords: Coordinates;
  private playerHeroCoords: Coordinates;
  private cardAttackResultSubject = new Subject<AttackResult>();

  constructor(private socketIoService: SocketIoService) {
    this.actionObservable = this.socketIoService.subscribe('action');
    this.actionObservable.subscribe((action: ActionEvent) => this.processAction(action));

    this.attackingCardCoordsSubject.subscribe((coordinates) => {
      this.attackingCardCoords = coordinates;
    });
    this.targetCardCoordsSubject.subscribe((coordinates) => {
      this.targetCardCoords = coordinates;
    });

    this.playerHeroCoordsSubject.subscribe((coordinates) => {
      this.playerHeroCoords = coordinates;
    });

    this.opponentHeroCoordsSubject.subscribe((coordinates) => {
      this.opponentHeroCoords = coordinates;
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
    this.targetCardCoords = coordinates;

    console.log(card, coordinates);
    this.attack(this.attacking, this.target);
  }

  attackGeneral(coordinates: Coordinates) {
    this.opponentHeroCoords = coordinates;

  }

  setCardInAttack(card: Card, coordinates: Coordinates) {
    this.attacking = card;
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
            this.requestAttackingCardCoordsSubject.next(payload.objectId);
            this.requestTargetCardCoordsSubject.next(payload.subjectId);
            console.log(this.attackingCardCoords, this.targetCardCoords);
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
            attackingCoordinates: this.attackingCardCoords,
            targetCoordinates: this.targetCardCoords,
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
