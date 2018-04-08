import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DeskComponent } from './desk/desk.component';
import { CardComponent } from './card/card.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { SausageComponent } from './sausage/sausage.component';
import {PlayerService} from './player.service';
import { DeckComponent } from './deck/deck.component';
import { NewCardComponent } from './new-card/new-card.component';
import { CardDeckComponent } from './card-deck/card-deck.component';


const appRoutes: Routes = [
  { path: 'games/:gameId/players/:playerId',      component: DeskComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    DeskComponent,
    CardComponent,
    HeroCardComponent,
    SausageComponent,
    DeckComponent,
    NewCardComponent,
    CardDeckComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgDragDropModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {  }
    )
  ],
  providers: [
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
