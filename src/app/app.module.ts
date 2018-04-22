import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgDragDropModule} from 'ng-drag-drop';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {SocketIoConfig, SocketIoModule} from 'ng-socket-io';

import {AppComponent} from './app.component';
import {DeskComponent} from './desk/desk.component';

import {HeroCardComponent} from './hero-card/hero-card.component';
import {SausageComponent} from './sausage/sausage.component';
import {DeckComponent} from './deck/deck.component';
import {NewCardComponent} from './new-card/new-card.component';
import {GameService} from './game.service';
import {DeskActionsService} from './desk-actions.service';
import {config  as appConfig} from '../config';
import {EndTurnButtonComponent} from './end-turn-button/end-turn-button.component';
import {CardModule} from './card/card.module';
import {SocketModule} from './socket/socket.module';

const appRoutes: Routes = [
  {path: 'table/:guid/:puid', component: DeskComponent},
];

const config: SocketIoConfig = {url: appConfig.apiPrefix, options: {}};


@NgModule({
  declarations: [
    AppComponent,
    DeskComponent,
    HeroCardComponent,
    SausageComponent,
    DeckComponent,
    NewCardComponent,
    EndTurnButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgDragDropModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {}
    ),
    SocketIoModule.forRoot(config),
    CardModule,
    SocketModule
  ],
  providers: [
    GameService,
    DeskActionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
