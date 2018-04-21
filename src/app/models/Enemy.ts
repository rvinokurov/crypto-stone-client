import {Hero} from './Hero';
import {range} from 'lodash-es';
import {EnemyCard} from './EnemyCard';

export class Enemy {

  cardsInHand = 3;

  name: string;

  sausages: number;

  hero: Hero;

  cards: EnemyCard[];

  constructor(enemy: EnemyModel) {
    Object.assign(<Enemy>this, enemy);
  }

}


export interface EnemyModel {
  cardsInHand: number;
  name: string;
  sausages: number;
  hero: Hero;
  cards: EnemyCard[];
}
