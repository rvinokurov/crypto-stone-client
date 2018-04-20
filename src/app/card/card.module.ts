import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from './card/card.component';
import {PlayerHandCardComponent} from './player-hand-card/player-hand-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardComponent,
    PlayerHandCardComponent
  ],
  exports : [
    CardComponent,
    PlayerHandCardComponent
  ]
})
export class CardModule { }
