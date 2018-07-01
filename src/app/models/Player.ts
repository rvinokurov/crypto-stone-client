import {Card} from './Card';
import {General} from './General';
import {Subject} from 'rxjs/Subject';
import {EnemyCard} from './EnemyCard';

export class Player {

  uuid = '';

  cards: Card[];

  name: string;

  sausagesChangesSubject = new Subject<number>();
  general: General;
  healthChangeSubject = new Subject<number>();

  elements: string[] = [];

  private currentSausages: number;
  private currentHealth;

  constructor(player: PlayerModel) {
    Object.assign(<Player>this, player);
  }

  get sausages() {
    return this.currentSausages;
  }

  set sausages(sausages: number) {
    this.currentSausages = sausages;
    this.sausagesChangesSubject.next(sausages);
  }

  get health() {
    return this.currentHealth;
  }

  set health(health: number) {
    this.currentHealth = health;
    this.healthChangeSubject.next(health);
  }
}

export interface PlayerModel {
  uuid: string;
  name: string;
  sausages: number;
  cards: EnemyCard[];
  general: General;
  health: number;
  elements: string[];
}


