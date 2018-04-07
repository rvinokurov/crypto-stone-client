import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {DropEvent} from 'ng-drag-drop';
import {Player} from '../models/Player';
import {PlayerService} from '../player.service';
import {Card} from '../models/Card';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.styl'],
  encapsulation: ViewEncapsulation.None,
})
export class DeskComponent implements OnInit {


  playerCardsOnDesk = [];
  enemyCardsOnDesk = [
    new Card(),
    new Card(),
  ];
  player: Player;

  enemy: Player;

  playerInAttack = false;

  constructor(private playerService: PlayerService, private elementRef: ElementRef) {
  }

  onDragStart(card) {
    console.log('enter drag', card);
  }

  onCrosshairClick($event: MouseEvent) {
    console.log('emited', $event);
    const event = <MouseEvent> new Event('click');
    //Object.assign(event, $event);
    event.clientX = $event.clientX;
    event.clientY = $event.clientY;
    //const event = {...(new Event('click')), ...$event};
    this.elementRef.nativeElement.dispatchEvent(event);
  }

  selectToAttack(card: Card) {
    console.log(card);
    card.inAttack = !card.inAttack;
    this.playerCardsOnDesk.forEach((c) => {
      if (c.id !== card.id) {
        c.inAttack = false;
      }
    });
    this.playerInAttack = card.inAttack;
  }

  onCardDrop(e: DropEvent) {
    this.playerCardsOnDesk.push(e.dragData);
    this.player.cards.pop();
  }


  ngOnInit() {
    this.player = this.playerService.getPlayer();
    console.log(this.player);
    this.enemy = this.playerService.getEnemy();
  }

}
