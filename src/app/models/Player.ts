import {Card} from './Card';
import {General} from './General';
import {Subject} from 'rxjs/Subject';

export class Player {

  id = '';

  cards: Card[];

  name: string;

  sausagesChangesSubject = new Subject<number>();
  general: General;
  healthChangeSubject = new Subject<number>();


  private currentSausages: number;
  private currentHealth;

  constructor(player: playerModel) {
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


export type playerModel = {[P in keyof Player]: Player[P]};
