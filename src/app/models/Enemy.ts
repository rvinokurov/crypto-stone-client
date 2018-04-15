import {Hero} from './Hero';
import {range} from 'lodash-es';

export class Enemy {

  cardsInHand = 3;

  name: string;

  sausages: number;

  hero: Hero;

  constructor(enemy: EnemyModel) {
    Object.assign(<Enemy>this, enemy);
  }

  get cards(): number[] {
    return range(this.cardsInHand);
  }
}


export interface EnemyModel {
  cardsInHand: number;
  name: string;
  sausages: number;
  hero: Hero;
}
