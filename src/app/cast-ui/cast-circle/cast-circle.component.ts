import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ElementSector} from './element-sector';


const SectorsConfig = [
  {
    startAngle: -Math.PI / 2,
    endAngle: -Math.PI / 15,
    color: `#55493D`,
    name: 'earth'
  },
  {
    startAngle: -Math.PI / 15,
    endAngle: Math.PI / 2 - Math.PI / 7.5,
    color: `#62F5FA`,
    name: 'water'
  },
  {
    startAngle: Math.PI / 2 + Math.PI / 7.5,
    endAngle: Math.PI + Math.PI / 15,
    color: `#B13600`,
    name: 'fire'
  },
  {
    startAngle: Math.PI + Math.PI / 15,
    endAngle: Math.PI + Math.PI / 2,
    color: `#AFCDFC`,
    name: 'air'
  }
];


const hoverClass = 'cast-circle--elements-sector_hover';

@Component({
  selector: 'app-cast-circle',
  templateUrl: './cast-circle.component.html',
  styleUrls: ['./cast-circle.component.styl']
})
export class CastCircleComponent implements OnInit, AfterViewInit {

  @ViewChild('earth') earth: ElementRef;
  @ViewChild('water') water: ElementRef;
  @ViewChild('fire') fire: ElementRef;
  @ViewChild('air') air: ElementRef;

  @Input() isPlayer = false;

  private sectors: ElementSector[] = [];

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    SectorsConfig.forEach((config) => {
      this.sectors.push(new ElementSector({
        element: this[config.name].nativeElement,
        startAngle: config.startAngle,
        endAngle: config.endAngle,
        color: config.color
      }));
    });
  }

  mousemove(event: MouseEvent) {
    console.log(event);
    this.sectors.forEach((sector) => {
      if (sector.inSector(event)) {
        this.renderer.addClass(sector.canvas, hoverClass);
      } else {
        this.renderer.removeClass(sector.canvas, hoverClass);
      }
    });
  }

  mouseout() {
    this.sectors.forEach((sector) => {
      this.renderer.removeClass(sector.canvas, hoverClass);

    });
  }
}
