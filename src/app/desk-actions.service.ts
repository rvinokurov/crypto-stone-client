import {Injectable} from '@angular/core';
import {SocketIoService} from './socket-io.service';
import {Card} from './models/Card';

@Injectable()
export class DeskActionsService {

  constructor(private socketIoService: SocketIoService) {
  }

  playCard(card: Card) {
    this.socketIoService.action('play-card', {id: card.id});
  }

}
