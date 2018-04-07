export class Card {
  inAttack = false;
  inDesk = false;
  id  = 0;
  attack = 0;
  defence = 0;

  constructor({attack, defence}) {
    this.attack = attack;
    this.defence = defence;
    this.id = Math.floor(Math.random() * 10000000);
  }
}
