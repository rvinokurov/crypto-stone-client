import {Enemy} from './Enemy';
import {Player} from './Player';
import {Card, elemental} from './Card';

export class GameModel {

  player: Player;

  enemy: Enemy;

  constructor(game: any) {
    this.enemy = new Enemy({
      cardsInHand: game.opponent_hand,
      name: game.opponent_name,
      hero: {
        url: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/545030.svg',
      },
      sausages: 99,
    });

    this.player = new Player({
      name: game.player_name,
      hero: {
        url: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/545030.svg',
      },
      cards: game.hand.map(GameModel.createCard),
      sausages: 99,
    });
  }

  static getElement(type: number) {
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

  static createCard(rawCard: any): Card {
    const {props, image_url, id} = rawCard;
    return new Card({
      id,
      attack: {
        value: props.attack.value,
        type: GameModel.getElement(props.elementalOfAttack.value),
      },
      defence: {
        value: props.defense.value,
        type: GameModel.getElement(props.elementalOfDefence.value),
      },
      sausageSteal: props['energy drain'].value,
      sausageGeneration: props.regeneration.value,
      avatar: image_url,
    });
  }
}
