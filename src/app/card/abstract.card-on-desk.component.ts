import {AfterViewInit, ElementRef, Input, Renderer2} from '@angular/core';
import {Card} from '../models/Card';
import {AttackResult, CardAttackService} from './card-attack.service';
import {offset} from './offset';

export enum AttackAnimationStage {
  none = 'none',
  flight = 'flight',
  attack = 'attack',
  pause1 = 'pause1',
  pause2 = 'pause2',
  end = 'end'
}

export class AbstractCardInDeskComponent implements AfterViewInit {


  damageBurnShow = false;
  inAttack = false;
  putToDeskSound = new Audio('/assets/sound/put-to-desk.wav');
  playerCard: Card;
  cardStyle = {};
  inAttackProcess = false;
  damageBurn = 0;
  destroyed = false;
  protected size = {
    width: 0,
    height: 0
  };
  protected attackAnimationStage = AttackAnimationStage.none;
  protected attackResult: AttackResult;

  constructor(protected cardAttackService: CardAttackService, protected elementRef: ElementRef, protected renderer: Renderer2) {


    this.cardAttackService.requestAttackingCoordsSubject.subscribe((id) => {
      if (id === this.playerCard.id) {
        this.cardAttackService.attackingCoordsSubject.next(offset(this.elementRef.nativeElement));
      }
    });

    this.cardAttackService.requestTargetCoordsSubject.subscribe((id) => {
      if (id === this.playerCard.id) {
        this.cardAttackService.targetCoordsSubject.next(offset(this.elementRef.nativeElement));
      }
    });


    this.cardAttackService.cardAttack.subscribe((result) => {
      if (result.attacking.id === this.playerCard.id) {
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

        this.applyDamageBurn(result.damage);
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

  applyDamageBurn(damage) {
    this.playerCard.defence.value -= damage;
    if (this.playerCard.defence.value <= 0) {
      this.playerCard.defence.value = 0;
      this.destroyed = true;
    }
    this.damageBurnShow = true;
    this.damageBurn = damage;
  }

  ngAfterViewInit() {
    const geometry = this.elementRef.nativeElement.getBoundingClientRect();
    this.size.width = geometry.width;
    this.size.height = geometry.height;

  }

  initAttackAnimationStyle() {
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
    let x = 0;
    let y = 0;
    try {
      x = cards.targetCoordinates.x - cards.attackingCoordinates.x;
      y = cards.targetCoordinates.y - cards.attackingCoordinates.y;
    } catch (e) {
      console.error(e);
    }

    if (this.attackAnimationStage === AttackAnimationStage.flight) {

      this.cardStyle = {
        transform: `translate3d(${this.getFlightTranslate(x, y)}) scale(1.3) rotateZ(-5deg) rotateX(10deg)`,
        'box-shadow': '-1rem 1rem 1rem 0.1rem rgba(0, 0, 0, 0.5)',
        'transition': 'all .2s ease-in-out',
        'z-index': 60000
      };
    }
    if (this.attackAnimationStage === AttackAnimationStage.attack) {
      this.cardStyle = {
        transform: `translate3d(${this.getAttackTranslate(x, y)}) scale(1)  rotateZ(-10deg) rotateX(20deg)`,
        'box-shadow': '-1rem 1rem 1rem 0.1rem rgba(0, 0, 0, 0.3)',
        'transition': 'all .15s ease-in-out',
        'z-index': 60000
      };
    }
    if (this.attackAnimationStage === AttackAnimationStage.pause1) {
      this.cardStyle = {
        transform: `translate3d(${this.getPause1Translate(x, y)}) scale(1)  rotateZ(-10deg) rotateX(20deg)`,
        'box-shadow': '-1rem 1rem 1rem 0.1rem rgba(0, 0, 0, 0.3)',
        'transition': 'all .15s ease-in-out',
        'z-index': 60000
      };
    }
    if (this.attackAnimationStage === AttackAnimationStage.pause2) {
      this.cardStyle = {
        transform: `translate3d(${this.getPause2Translate(x, y)}) scale(1)  rotateZ(-10deg) rotateX(20deg)`,
        'box-shadow': '-1rem 1rem 1rem 0.1rem rgba(0, 0, 0, 0.3)',
        'transition': 'all .15s ease-in-out',
        'z-index': 60000
      };
    }
  }

  finishAttack() {
    this.playerCard.inAttack = false;
  }


  transitionEnd($event) {
    if ($event.propertyName !== 'transform') {
      return;
    }
    if (this.playerCard.defence.value <= 0) {
      return;
    }
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
    this.playerCard.puttedToDesk = false;
  }

  damageBurnAnimationEnd() {
    if (this.playerCard.defence.value <= 0) {
      this.cardAttackService.removeCardSubject.next(this.playerCard.id);
    }
    this.damageBurnShow = false;
  }

  destroyEnd() {
    // this.cardAttackService.removeCardSubject.next(this.playerCard.id);
  }


  protected getFlightTranslate(x: number, y: number) {
    return `${x / 2 + this.size.width / 3 }px, ${y / 2 + this.size.height / 4 }px, 0`;
  }

  protected getAttackTranslate(x: number, y: number) {
    return `${x}px, ${y + this.size.height / 4}px, 0`;
  }

  protected getPause1Translate(x: number, y: number) {
    return `${x + 10}px, ${y + 10 + this.size.height / 4}px, 0`;
  }

  protected getPause2Translate(x: number, y: number) {
    return `${x}px, ${y + this.size.height / 4}px, 0`;
  }

  protected applyAttackResult() {
    this.applyDamageBurn(this.attackResult.attacking.damage);
    this.cardAttackService.finishAttack(this.attackResult.target);

  }

}
