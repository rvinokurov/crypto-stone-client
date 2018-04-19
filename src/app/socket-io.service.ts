import {Injectable} from '@angular/core';
import {Socket} from 'ng-socket-io';
import {Observable} from 'rxjs/Observable';

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

  subscribe<T>(action): Observable<T> {
    return this.socket.fromEvent(action);
  }

  action(type: string, subject: string, payload: any) {
    const action = {
      puid: this.puid,
      guid: this.guid,
      type,
      subject,
      payload
    };
    console.log(JSON.stringify(action, null, '    '));
    this.socket.emit('action', action);
  }

}
