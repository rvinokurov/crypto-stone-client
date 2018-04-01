export class Player {

  cards: Object[];

  name: string;

  sausages: number;

  constructor(player) {
    this.cards = player.cards;
    this.name = player.name;
    this.sausages = player.sausages;
  }
}
