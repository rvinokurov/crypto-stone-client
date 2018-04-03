import {Injectable} from '@angular/core';
import {Player} from './model/Player';
import {Card} from './model/Card';

@Injectable()
export class PlayerService {

  constructor() {
  }

  getPlayer() {
    return new Player({
      name: 'ChaosCode',
      cards: [
        new Card(),
        new Card(),
        new Card(),
      ],
      sausages: 99
    });
  }

  getEnemy() {
    return new Player({
      name: 'Gil',
      cards: [
        new Card(),
        new Card(),
        new Card(),
      ],
      sausages: 99
    });
  }

}
