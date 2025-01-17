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

  ourTurn = false;

  constructor(game: any) {
    this.playerCardsOnDesk = game.player_desk.map(GameModel.createCard);
    this.enemyCardsOnDesk = game.opponent_desk.map(GameModel.createCard);
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
    for (let i = 0; i < game.opponent_hand; i++) {
      enemyCards.push(new EnemyCard());
    }
    this.ourTurn = game.active;
    this.enemy = new Enemy({
      id: game.opponent_puid,
      elements: eElements,
      general: {
        image_url : game.opponent_general.image_url,
      },
      health: game.opponent_hp,
      cardsInHand: game.opponent_hand,
      cards: enemyCards,
      name: game.opponent_name,
      sausages: game.opponent_sausages,
    });

    this.player = new Player({
      id: game.player_id,
      name: game.player_name,
      general: {
        image_url : game.general.image_url,
      },
      health: game.hp,
      cards: game.hand.map(GameModel.createCard),
      sausages: game.sausages,
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
      actionPoints: rawCard.actionPoints || 0
    });
  }
}
