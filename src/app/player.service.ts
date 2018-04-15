import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {random} from 'lodash-es';
import 'rxjs/add/operator/map';

import {Player} from './models/Player';
import {Card, elemental} from './models/Card';
import {config} from '../config';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PlayerService {

  createCard = (rawCard: any): Card => {
    const {props, image_url, id} = rawCard;
    return new Card({
      id,
      attack: {
        value: props.attack.value,
        type: this.getElement(props.elementalOfAttack.value),
      },
      defence: {
        value: props.defense.value,
        type: this.getElement(props.elementalOfDefence.value),
      },
      sausageSteal: props['energy drain'].value,
      sausageGeneration: props.regeneration.value,
      avatar: image_url,
    });
  };

  constructor(private http: HttpClient) {
  }

  getElement(type: number) {
    switch (type) {
      case 1:
        return elemental.air;
      case 2:
        return elemental.water;
      case 3:
        return elemental.earth;
      case 4:
        return elemental.fire;
      default:
        return elemental.air;
    }
  }

  getPlayer(guid: string, puid: string): Observable<Player> {
    return this.http.get(`${config.apiPrefix}/games/${guid}/players/${puid}`)
      .map((response: { game: any }) => {
        const {game} = response;
        console.log('game', game);
        return new Player({
          name: game.player_name,
          hero: {
            url: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/545030.svg',
          },
          cards: game.hand.map(this.createCard),
          sausages: 99
        });
      });
  }

  getEnemy() {
    return new Player({
      name: 'Yeaah',
      hero: {
        url: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/539939.svg',
      },
      cards: [
        new Card({
          id: 1,
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
          id: 2,
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
          id: 3,
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
