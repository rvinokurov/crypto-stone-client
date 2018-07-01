import {Injectable} from '@angular/core';
import {Socket} from 'ng-socket-io';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SocketIoService {

  private pid;

  private gid;

  private actions = {};

  constructor(private socket: Socket) {
  }

  register(gid, pid) {
    this.gid = gid;
    this.pid = pid;

    this.socket.emit('register', this.pid);
    this.socket.on('random', (message) => {
      console.log('message', message);
    });

    this.socket.on('disconnect', () => {
      console.log('reconnect');
      this.socket.emit('register', this.pid);
    });

  }

  subscribe<T>(action): Observable<T> {
    if(this.actions[action] === undefined) {
      this.actions[action] = this.socket.fromEvent(action);
    }
    return this.actions[action];
  }

  action(type: string, subject: string, payload: any, object?) {
    const action = {
      pid: this.pid,
      gid: this.gid,
      type,
      subject,
      object,
      payload
    };
    console.log(JSON.stringify(action, null, '    '));
    this.socket.emit('action', action);
  }

}
