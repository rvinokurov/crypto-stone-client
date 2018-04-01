import {Injectable} from '@angular/core';
import {Player} from './model/Player'

@Injectable()
export class PlayerService {

  constructor() {
  }

  getPlayer() {
    return new Player({
      name: 'ChaosCode',
      cards: [
        {},
        {},
        {},
      ],
      sausages: 99
    });
  }

  getEnemy() {
    return new Player({
      name: 'Gil',
      cards: [
        {},
        {},
        {},
      ],
      sausages: 99
    });
  }

}
