import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { DropEvent } from 'ng-drag-drop';
import {Player} from '../model/Player';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class DeskComponent implements OnInit {


  playerCardsOnDesk = [];

  player: Player;

  enemy: Player;

  constructor(private playerService: PlayerService) { }

  onCardDrop(e: DropEvent) {
    this.playerCardsOnDesk.push(e.dragData);
    this.player.cards.pop();
  }


  ngOnInit() {
    this.player = this.playerService.getPlayer();
    this.enemy = this.playerService.getEnemy();
  }

}
