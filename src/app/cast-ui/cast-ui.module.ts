import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CastCircleComponent} from './cast-circle/cast-circle.component';
import { CastElementComponent } from './cast-element/cast-element.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CastCircleComponent, CastElementComponent],
  exports: [
    CastCircleComponent
  ]
})
export class CastUiModule {
}
