export class Card {
  inAttack = false;
  inDesk = false;
  id  = 0;

  constructor() {
    this.id = Math.floor(Math.random() * 10000000);
    console.log(this.id);
  }
}
