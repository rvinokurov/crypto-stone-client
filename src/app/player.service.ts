import {Injectable} from '@angular/core';
import {Player} from './models/Player';
import {Card, elemental} from './models/Card';

@Injectable()
export class PlayerService {

  constructor() {
  }

  getPlayer() {
    return new Player({
      name: 'Ooooh!',
      cards: [
        new Card({
          attack: {
            value: 15,
            type: elemental.water
          },
          defence: {
            value: 6,
            type: elemental.fire
          },
          sausageSteal: 3,
          avatar: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/668104.svg',
        }),
        new Card({
          attack: {
            value: 9,
            type: elemental.air
          },
          defence: {
            value: 11,
            type: elemental.air
          },
          sausageSteal: 9,
          avatar: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/668093.svg',
        }),
        new Card({
          attack: {
            value: 8,
            type: elemental.earth
          },
          defence: {
            value: 14,
            type: elemental.fire
          },
          sausageSteal: 12,
          avatar: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/668022.svg'
        }),
      ],
      sausages: 99
    });
  }

  getEnemy() {
    return new Player({
      name: 'Yeaah',
      cards: [
        new Card({
          attack: {
            value: 7,
            type: elemental.fire
          },
          defence: {
            value: 13,
            type: elemental.air
          },
          avatar: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/668104.svg',
        }),
        new Card({
          attack: {
            value: 9,
            type: elemental.earth
          },
          defence: {
            value: 11,
            type: elemental.earth
          },
          avatar: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/668093.svg',
        }),
        new Card({
          attack: {
            value: 8,
            type: elemental.earth
          },
          defence: {
            value: 23,
            type: elemental.water
          },
          avatar: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/668022.svg'
        }),
      ],
      sausages: 99
    });
  }

}
