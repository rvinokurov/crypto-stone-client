import {Card} from './Card';
import {Hero} from './Hero';


export class Player {

  id = '';

  cards: Card[];

  name: string;

  sausages: number;

  hero: Hero;

  constructor(player: playerModel) {
    Object.assign(<Player>this, player);
  }
}


export type playerModel = {[P in keyof Player]: Player[P]};
