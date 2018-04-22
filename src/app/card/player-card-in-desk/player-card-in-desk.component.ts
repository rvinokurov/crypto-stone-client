import {Component, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {Card} from '../../models/Card';
import {AttackResult, CardAttackService} from '../card-attack.service';
import {offset} from '../offset';

enum AttackAnimationStage {
  none = 'none',
  flight = 'flight',
  attack = 'attack',
  pause1 = 'pause1',
  pause2 = 'pause2',
  end = 'end'
}

@Component({
  selector: 'app-player-card-in-desk',
  templateUrl: './player-card-in-desk.component.html',
  styleUrls: ['./player-card-in-desk.component.styl']
})
export class PlayerCardInDeskComponent implements OnInit {


  inAttack = false;
  putToDeskSound = new Audio('/assets/sound/put-to-desk.wav');
  playerCard: Card;
  cardStyle = {};
  inAttackProcess = false;
  private attackAnimationStage = AttackAnimationStage.none;
  private attackResult: AttackResult;

  constructor(private cardAttackService: CardAttackService, private elementRef: ElementRef, private renderer: Renderer2) {
    this.cardAttackService.cardInAttack.subscribe((cardInAttack: Card) => {
      if (cardInAttack.id !== this.playerCard.id) {
        this.playerCard.inAttack = false;
      }
    });

    this.cardAttackService.cardAttack.subscribe((result) => {
      if (result.attackingCard.id === this.playerCard.id) {
        this.attackResult = result;
        this.attackAnimationStage = AttackAnimationStage.flight;
        this.inAttackProcess = true;

        setTimeout(() => {
          this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', 60000);
          this.initAttackAnimationStyle();
        }, 10);

      }
    });

    this.cardAttackService.targetDefence.subscribe((result) => {
      if (result.id === this.playerCard.id) {
        this.playerCard.defence.value -= result.damage;
      }
    });
  }

  get card() {
    return this.playerCard;
  }

  @Input() set card(card: Card) {
    this.playerCard = card;
    if (this.playerCard.puttedToDesk) {
      setTimeout(() => {
        this.putToDeskSound.volume = 0.5;
        this.putToDeskSound.play();
      }, 800);
    }
    if (this.playerCard.puttedToDesk) {
      setTimeout(() => {
        this.playerCard.puttedToDesk = false;
      }, 1100);
    }
  }

  initAttackAnimationStyle() {
    console.log('animation style', this.attackAnimationStage);
    if (this.attackAnimationStage === AttackAnimationStage.none) {
      this.cardStyle = {};
      return;
    }
    if (this.attackAnimationStage === AttackAnimationStage.end) {
      this.cardStyle = {
        'transition': 'all .15s ease-in-out',
      };
      return;
    }
    const cards = this.attackResult;
    const x =  cards.targetCardCoordinates.x - cards.attackingCardCoordinates.x;
    const y =  cards.targetCardCoordinates.y  - cards.attackingCardCoordinates.y;

    if (this.attackAnimationStage === AttackAnimationStage.flight) {

      this.cardStyle = {
        transform: `translate3d(${x / 2 + 50}px, ${y / 2 }px, 0) scale(1.3) rotateZ(-5deg) rotateX(10deg)`,
        'box-shadow': '-1rem 1rem 1rem 0.1rem rgba(0, 0, 0, 0.5)',
        'transition': 'all .2s ease-in-out',
        'z-index': 60000
      };
    }
    if (this.attackAnimationStage === AttackAnimationStage.attack) {
      this.cardStyle = {
        transform: `translate3d(${x + 20 }px, ${y + 60}px, 0) scale(1)  rotateZ(-10deg) rotateX(20deg)`,
        'box-shadow': '-1rem 1rem 1rem 0.1rem rgba(0, 0, 0, 0.3)',
        'transition': 'all .15s ease-in-out',
        'z-index': 60000
      };
    }
    if (this.attackAnimationStage === AttackAnimationStage.pause1) {
      this.cardStyle = {
        transform: `translate3d(${x + 30 }px, ${y + 50}px, 0) scale(1)  rotateZ(-10deg) rotateX(20deg)`,
        'box-shadow': '-1rem 1rem 1rem 0.1rem rgba(0, 0, 0, 0.3)',
        'transition': 'all .15s ease-in-out',
        'z-index': 60000
      };
    }
    if (this.attackAnimationStage === AttackAnimationStage.pause2) {
      this.cardStyle = {
        transform: `translate3d(${x + 20 }px, ${y + 60}px, 0) scale(1)  rotateZ(-10deg) rotateX(20deg)`,
        'box-shadow': '-1rem 1rem 1rem 0.1rem rgba(0, 0, 0, 0.3)',
        'transition': 'all .15s ease-in-out',
        'z-index': 60000
      };
    }
  }

  private applyAttackResult() {
    this.playerCard.defence.value -= this.attackResult.attackingCard.damage;
    this.cardAttackService.finishAttack(this.attackResult.targetCard);
  }

  finishAttack() {
    this.playerCard.inAttack = false;
  }

  @HostListener('click') inAttackListener() {
    this.playerCard.inAttack = !this.playerCard.inAttack;
    this.cardAttackService.setCardInAttack(this.playerCard, offset(this.elementRef.nativeElement));
  }

  transitionEnd() {
    if (this.attackAnimationStage === AttackAnimationStage.none) {
      return;
    }
    if (this.attackAnimationStage === AttackAnimationStage.flight) {
      this.attackAnimationStage = AttackAnimationStage.attack;
    } else if (this.attackAnimationStage === AttackAnimationStage.attack) {
      this.applyAttackResult();
      this.attackAnimationStage = AttackAnimationStage.pause1;

    } else if (this.attackAnimationStage === AttackAnimationStage.pause1) {
      this.attackAnimationStage = AttackAnimationStage.pause2;

    } else if (this.attackAnimationStage === AttackAnimationStage.pause2) {
      this.attackAnimationStage = AttackAnimationStage.end;

    } else if (this.attackAnimationStage === AttackAnimationStage.end) {
      this.attackAnimationStage = AttackAnimationStage.none;
      this.inAttackProcess = false;
      this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', 40000);
      this.finishAttack();
    }
    this.initAttackAnimationStyle();
  }

  animationEnd() {
    console.log('transend');
    this.playerCard.puttedToDesk = false;
  }

  ngOnInit() {
  }

}
