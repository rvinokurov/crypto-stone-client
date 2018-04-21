import {Enemy} from './Enemy';
import {Player} from './Player';
import {Card, elemental} from './Card';
import {fill} from 'lodash-es';
import {EnemyCard} from './EnemyCard';

export class GameModel {

  player: Player;

  enemy: Enemy;

  playerCardsOnDesk: Card[];
  enemyCardsOnDesk: Card[];

  constructor(game: any) {
    this.playerCardsOnDesk = game.player_desk.map(GameModel.createCard);
    this.enemyCardsOnDesk = game.opponent_desk.map(GameModel.createCard);
    const enemyCards = [];
    for (let i = 0; i < game.opponent_hand; i++) {
      enemyCards.push(new EnemyCard());
    }
    this.enemy = new Enemy({
      cardsInHand: game.opponent_hand,
      cards: enemyCards,
      name: game.opponent_name,
      hero: {
        url: 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/545030.svg',
      },
      sausages: 99,
    });

    this.player = new Player({
      id: game.player_id,
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
