import {Card} from './Card';

export interface Hero {
  url: string
}


export class Player {

  cards: Card[];

  name: string;

  sausages: number;

  hero: Hero;

  constructor(player: playerModel) {
    Object.assign(<Player>this, player);
  }
}


export type playerModel = {[P in keyof Player]: Player[P]};
