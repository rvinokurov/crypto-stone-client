import {Injectable} from '@angular/core';
import {Socket} from 'ng-socket-io';

@Injectable()
export class SocketIoService {

  private puid;

  private guid;

  constructor(private socket: Socket) {
  }

  register(guid, puid) {
    this.guid = guid;
    this.puid = puid;

    this.socket.emit('register', this.puid);
    this.socket.on('random', (message) => {
      console.log('message', message);
    });

    this.socket.on('disconnect', () => {
      console.log('reconnect');
      this.socket.emit('register', this.puid);
    });

  }

  action(type: string, subject: any) {
    this.socket.emit('action', {
      puid: this.puid,
      guid: this.guid,
      type,
      subject
    });
  }

}
