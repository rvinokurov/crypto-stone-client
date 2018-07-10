import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {config} from '../config';
import {Observable} from 'rxjs/Observable';
import {GameModel} from './models/Game';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Player} from './models/Player';


@Injectable()
export class GameService {

  private gameSubject = new BehaviorSubject<GameModel | undefined>(undefined);

  constructor(private http: HttpClient) {
  }

  getGame(gid: string, pid: string): Observable<GameModel> {
    const url = pid ? `${config.apiPrefix}/games/${gid}/players/${pid}` : `${config.apiPrefix}/games/${gid}/spectator`;
    return this.http.get(url)
      .map((response: { game: any }) => {
        const game = new GameModel(response.game);
        this.gameSubject.next(game);
        return game;
      });
  }

  getPlayer(): Observable<Player> {
    return this.gameSubject.map((game): Player => {
      return game.player;
    });
  }
}
