import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {angleStep, SectorsConfig} from '../sectorsConfig';
import {ParticleAnimation} from './ParticleAnimation';
import {DeskActionsService} from '../../desk-actions.service';
import {Player} from '../../models/Player';
import {Enemy} from '../../models/Enemy';
import {CanvasAnimationManagerService} from '../../animation/canvas-animation-manager.service';


@Component({
  selector: 'app-cast-elements-circle',
  templateUrl: './cast-elements-circle.component.html',
  styleUrls: ['./cast-elements-circle.component.styl']
})
export class CastElementsCircleComponent implements OnInit, AfterViewInit {


  @Input() isPlayer = false;
  @Input() player: Enemy | Player;

  @ViewChild('canvas') canvasRef: ElementRef;

  private canvas: HTMLCanvasElement;

  private stage;
  private animations: ParticleAnimation[] = [];

  private width;
  private height;
  private cx;
  private cy;
  private radius;


  private elements = {};

  constructor(private deskActions: DeskActionsService, private canvasAnimationManager: CanvasAnimationManagerService) {
    SectorsConfig.forEach((sector) => {
      this.elements[sector.name] = {
        angle: sector.startAngle,
        count: 0,
        color: sector.color
      };
    });

  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;


    const r = this.canvas.getBoundingClientRect();
    this.stage = this.canvas.getContext('2d');
    this.width = r.width;
    this.height = r.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.cx = this.width / 2;
    this.cy = this.height / 2;
    this.radius = ((this.width > this.height ? this.height : this.width) / 2) / 1.2;

    this.reInitElements();

   this.canvasAnimationManager.addAnimationFunction(this.draw);
  }

  draw = () => {
    this.stage.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i].update();
    }
  };

  ngOnInit() {
    if (this.isPlayer) {
      this.deskActions.newPlayerElementSubject.subscribe((element) => {
        this.elements[element.type].count++;
        console.log('new', element);
        this.reInitElements();
      });
    } else {
      this.deskActions.newEnemyElementSubject.subscribe((element) => {
        this.elements[element.type].count++;
        this.reInitElements();
      });
    }
    this.player.elements.forEach((type) => {
      this.elements[type].count++;
    });
  }

  private reInitElements() {

    Object.keys(this.elements).forEach((elementName) => {
      const element = this.elements[elementName];
      const angle = element.angle + angleStep;
      for (let i = 0; i < element.count; i++) {
        const currentAngle = angle + i * angleStep;
        const x = this.cx + this.radius * Math.cos(currentAngle);
        const y = this.cy + this.radius * Math.sin(currentAngle);

        this.animations.push(new ParticleAnimation(this.width / 13, this.height / 13, x, y, this.stage, element.color));
      }
    });

    // SectorsConfig.forEach((sector) => {
    //   const angle = sector.startAngle + angleStep;
    //   for (let i = 0; i < countOfType; i++) {
    //     const currentAngle = angle + i * angleStep;
    //     const x = this.cx + this.radius * Math.cos(currentAngle);
    //     const y = this.cy + this.radius * Math.sin(currentAngle);
    //
    //     this.animations.push(new ParticleAnimation(this.width / 13, this.height / 13, x, y, this.stage, sector.color));
    //   }
  }


}
