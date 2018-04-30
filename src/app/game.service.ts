import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

import {config} from '../config';
import {Observable} from 'rxjs/Observable';
import {GameModel} from './models/Game';


@Injectable()
export class GameService {

  constructor(private http: HttpClient) {
  }

  getGame(guid: string, puid: string): Observable<GameModel> {
    return this.http.get(`${config.apiPrefix}/games/${guid}/players/${puid}`)
      .map((response: { game: any }) => {
        return new GameModel(response.game);
      });
  }

}
