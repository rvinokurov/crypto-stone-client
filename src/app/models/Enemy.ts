import {EnemyCard} from './EnemyCard';
import {General} from './General';

export class Enemy {

  cardsInHand = 3;

  name: string;

  sausages: number;

  cards: EnemyCard[];

  general: General;

  health: number;

  constructor(enemy: EnemyModel) {
    Object.assign(<Enemy>this, enemy);
  }

}


export interface EnemyModel {
  cardsInHand: number;
  name: string;
  sausages: number;
  cards: EnemyCard[];
  general: General;
  health: number;
}
