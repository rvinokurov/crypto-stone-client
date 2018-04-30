export enum ActionObject {
  player = 'player',
  enemy = 'enemy',
  opponent = 'opponent',
  card = 'card'
}


export enum ActionSubject {
  card = 'card',
  turn = 'turn'
}

export enum ActionType {
  playCard = 'play',
  draw = 'draw',
  end = 'end',
  start = 'start',
  attack = 'attack'
}

export interface ActionEvent {
  type: ActionType;
  object?: ActionObject;
  payload?: any;
  subject: ActionSubject;
}

export  enum AttackSide {
  defence = 'defense',
  attack = 'attack'
}
