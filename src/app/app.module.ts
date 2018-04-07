import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DeskComponent } from './desk/desk.component';
import { CardComponent } from './card/card.component';
import { HeroCardComponent } from './hero-card/hero-card.component';
import { SausageComponent } from './sausage/sausage.component';
import {PlayerService} from './player.service';
import { CrosshairComponent } from './crosshair/crosshair.component';
import { DeckComponent } from './deck/deck.component';


@NgModule({
  declarations: [
    AppComponent,
    DeskComponent,
    CardComponent,
    HeroCardComponent,
    SausageComponent,
    CrosshairComponent,
    DeckComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgDragDropModule.forRoot()
  ],
  providers: [
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
