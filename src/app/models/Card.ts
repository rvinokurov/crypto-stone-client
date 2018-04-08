export enum elemental {
  water = 'water',
  fire = 'fire',
  air = 'air',
  earth = 'earth'
}

export class Card {
  inAttack = false;
  inDesk = false;
  id = 0;
  attack = {
    type : elemental.fire,
    value: 0
  };
  defence = {
    type: elemental.fire,
    value: 0
  };
  avatar = '';
  sausageGeneration = 10;
  sausageSteal = 0;

  constructor({attack, defence, avatar, sausageSteal = 0}) {
    this.attack = attack;
    this.defence = defence;
    this.avatar = `url(${avatar})`;
    this.sausageSteal = sausageSteal;
    this.id = Math.floor(Math.random() * 10000000);
  }
}
