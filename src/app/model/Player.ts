import {Card} from './Card';


export class Player {

  cards: Card[];

  name: string;

  sausages: number;

  constructor(player: playerModel) {
    Object.assign(<Player>this, player);
  }
}


export type playerModel = {[P in keyof Player]: Player[P]};
