import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from './card/card.component';
import {PlayerHandCardComponent} from './player-hand-card/player-hand-card.component';
import {CardDeckComponent} from './card-deck/card-deck.component';
import { EnemyCardComponent } from './enemy-card/enemy-card.component';
import { PlayerCardInDeskComponent } from './player-card-in-desk/player-card-in-desk.component';
import { EnemyCardInDeskComponent } from './enemy-card-in-desk/enemy-card-in-desk.component';
import { CardMarginDirective } from './directives/card-margin.directive';
import {CardAttackService} from './card-attack.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CardComponent,
    PlayerHandCardComponent,
    CardDeckComponent,
    EnemyCardComponent,
    PlayerCardInDeskComponent,
    EnemyCardInDeskComponent,
    CardMarginDirective,

  ],
  providers: [
    CardAttackService
  ],
  exports : [
    CardComponent,
    PlayerHandCardComponent,
    EnemyCardComponent,
    PlayerCardInDeskComponent,
    EnemyCardInDeskComponent,
    CardMarginDirective,
  ]
})
export class CardModule { }
