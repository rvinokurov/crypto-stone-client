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

  gameOver = false;
  ourTurn = false;

  constructor(game: any) {
    this.playerCardsOnDesk = game.player.desk.map(GameModel.createCard);
    this.enemyCardsOnDesk = game.opponent.desk.map(GameModel.createCard);
    const enemyCards = [];
    const pElements = [];
    const eElements = [];
    this.enemyCardsOnDesk.forEach((card) => {
      eElements.push(card.attack.type);
      eElements.push(card.defence.type);
    });

    this.playerCardsOnDesk.forEach((card) => {
      pElements.push(card.attack.type);
      pElements.push(card.defence.type);
    });
    for (let i = 0; i < game.opponent.hand.length; i++) {
      enemyCards.push(new EnemyCard());
    }
    this.ourTurn = game.active;
    this.enemy = new Enemy({
      uuid: game.opponent.uuid,
      elements: eElements,
      general: {
        image_url : game.opponent.general.image_url,
      },
      health: game.opponent.hp,
      cardsInHand: game.opponent.hand,
      cards: enemyCards,
      name: game.opponent.name,
      sausages: game.opponent.sausages,
    });

    this.player = new Player({
      uuid: game.player.uuid,
      name: game.player.name,
      general: {
        image_url : game.player.general.image_url,
      },
      health: game.player.hp,
      cards: game.player.hand.map(GameModel.createCard),
      sausages: game.player.sausages,
      elements: pElements
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
    const {props, image_url, uuid} = rawCard;
    return new Card({
      uuid,
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
      actionPoints: rawCard.actionPoints || 0
    });
  }
}
