import {Card} from './Card';
import {General} from './General';

export class Player {

  id = '';

  cards: Card[];

  name: string;

  sausages: number;

  general: General;

  health: number;

  constructor(player: playerModel) {
    Object.assign(<Player>this, player);
  }
}


export type playerModel = {[P in keyof Player]: Player[P]};
