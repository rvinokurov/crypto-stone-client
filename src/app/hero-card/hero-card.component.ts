import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Enemy} from '../models/Enemy';
import {Player} from '../models/Player';
import {offset} from '../card/offset';
import {CardAttackService} from '../card/card-attack.service';
import {Card} from '../models/Card';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.styl']
})
export class HeroCardComponent implements AfterViewInit {

  @Input() isPlayerHero = false;

  @Input() player: Player | Enemy;

  attackMode = false;

  protected size = {
    width: 0,
    height: 0
  };

  showExplosion = false;

  constructor(
    private sanitizer: DomSanitizer,
    protected cardAttackService: CardAttackService,
    protected elementRef: ElementRef
  ) {

    this.cardAttackService.requestTargetCoordsSubject.subscribe((id: string | number) => {
      if (this.player.id === id) {
        const heroOffset = offset(this.elementRef.nativeElement);
        this.cardAttackService.targetCoordsSubject.next(this.getOffset());
      }
    });

    this.cardAttackService.cardInAttack.subscribe((cardInAttack: Card) => {
      this.attackMode = cardInAttack.inAttack && !this.isPlayerHero;
    });

    this.cardAttackService.targetDefence.subscribe((result) => {
      if (result.id === this.player.id) {

        this.applyDamageBurn(result.damage);
      }
    });
  }

  getOffset() {
    const heroOffset = offset(this.elementRef.nativeElement);
    heroOffset.x += this.size.width / 3;
    heroOffset.y -= this.size.height / 3;
    return heroOffset;
  }

  @HostBinding('class.in-attack') get inAttack() {
    return this.attackMode;
  }

  get heroImage() {
    if (this.player && this.player.general) {
      return this.sanitizer.bypassSecurityTrustStyle(`url('${this.player.general.image_url}')`);
    }
    return '';
  }

  ngAfterViewInit() {
    const geometry = this.elementRef.nativeElement.getBoundingClientRect();
    this.size.width = geometry.width;
    this.size.height = geometry.height;

  }

  applyDamageBurn(damage) {
    this.player.health = this.player.health - damage;
    if (this.player.health < 0) {
      this.player.health = 0;
    }
    this.showExplosion = true;
  }

  explosionEnd() {
    this.showExplosion = false;
  }

  @HostListener('click') target() {
    if (this.attackMode) {
      this.cardAttackService.setTargetGeneral(
        {id: this.player.id},
        this.getOffset()
      );
    }
  }

}
