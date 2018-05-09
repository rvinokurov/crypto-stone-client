import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CastCircleComponent} from './cast-circle/cast-circle.component';
import { CastElementComponent } from './cast-element/cast-element.component';
import { CastElementsCircleComponent } from './cast-elements-circle/cast-elements-circle.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CastCircleComponent, CastElementComponent, CastElementsCircleComponent],
  exports: [
    CastCircleComponent
  ]
})
export class CastUiModule {
}
