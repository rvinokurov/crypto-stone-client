import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocketIoService} from './socket-io.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SocketIoService
  ],
  exports: [
  ]

})
export class SocketModule {
}
