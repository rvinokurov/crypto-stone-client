export enum elemental {
  water = 'water',
  fire = 'fire',
  air = 'air',
  earth = 'earth'
}

export class Card {
  inAttack = false;
  puttedToDesk = false;
  puttedToHand = false;
  id = 0;
  attack = {
    type: elemental.fire,
    value: 0
  };
  defence = {
    type: elemental.fire,
    value: 0
  };
  avatar = '';
  sausageGeneration = 10;
  sausageSteal = 0;
  cost = 40;
  constructor({id, attack, defence, avatar, sausageSteal = 0, sausageGeneration = 10}) {
    this.attack = attack;
    this.defence = defence;
    this.avatar = `url(${avatar})`;
    this.sausageSteal = sausageSteal;
    this.sausageGeneration = sausageGeneration;
    this.id = id;
  }
}
