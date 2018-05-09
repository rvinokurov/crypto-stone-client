import {AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {SectorsConfig, countOfType, angleStep} from '../sectorsConfig';
import {ParticleAnimation} from './ParticleAnimation';


@Component({
  selector: 'app-cast-elements-circle',
  templateUrl: './cast-elements-circle.component.html',
  styleUrls: ['./cast-elements-circle.component.styl']
})
export class CastElementsCircleComponent implements OnInit, AfterViewInit {


  @Input() animate = false;

  @ViewChild('canvas') canvasRef: ElementRef;

  private canvas: HTMLCanvasElement;

  private stage;
  private animations: ParticleAnimation[] = [];

  private timer;

  constructor(private ngZone: NgZone) {
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;


    const r = this.canvas.getBoundingClientRect();
    this.stage = this.canvas.getContext('2d');
    const width = r.width;
    const height = r.height;
    this.canvas.width = width;
    this.canvas.height = height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = ((width > height ? height : width) / 2) / 1.2;

    SectorsConfig.forEach((sector) => {
      const angle = sector.startAngle + angleStep;

      for (let i = 0; i < countOfType; i++) {
        const currentAngle = angle + i * angleStep;
        const x = cx + radius * Math.cos(currentAngle);
        const y = cy + radius * Math.sin(currentAngle);

        this.animations.push(new ParticleAnimation(width / 13, height / 13, x, y, this.stage, sector.color));
      }
    });

    if (this.animate) {
      this.ngZone.runOutsideAngular(() => {
        this.timer = setInterval(() => {
          this.stage.clearRect(0, 0, width, height);
          for (let i = 0; i < this.animations.length; i++) {
            this.animations[i].update();
          }
        }, 50);
      });
    } else {
      for (let i = 0; i < this.animations.length; i++) {
        this.animations[i].update();
      }
    }

  }

  ngOnInit() {
  }

}
