import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DeskComponent } from './desk/desk.component';
import { CardComponent } from './card/card.component';
import { HeroCardComponent } from './hero-card/hero-card.component';


@NgModule({
  declarations: [
    AppComponent,
    DeskComponent,
    CardComponent,
    HeroCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
