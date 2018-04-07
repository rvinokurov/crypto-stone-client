import {Injectable} from '@angular/core';
import {Player} from './models/Player';
import {Card} from './models/Card';

@Injectable()
export class PlayerService {

  constructor() {
  }

  getPlayer() {
    return new Player({
      name: 'ChaosCode',
      cards: [
        new Card({
          attack: 15,
          defence: 6
        }),
        new Card({
          attack: 9,
          defence: 11
        }),
        new Card({
          attack: 8,
          defence: 14
        }),
      ],
      sausages: 99
    });
  }

  getEnemy() {
    return new Player({
      name: 'Gil',
      cards: [
        new Card({
          attack: 7,
          defence: 13
        }),
        new Card({
          attack: 9,
          defence: 11
        }),
        new Card({
          attack: 8,
          defence: 23
        }),
      ],
      sausages: 99
    });
  }

}
