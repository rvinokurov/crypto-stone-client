import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ElementSector} from './element-sector';


const countOfType = 5;
const angleStep = (Math.PI / 2.2 - Math.PI / 21) / (countOfType + 1);

const SectorsConfig = [
  {
    startAngle: -Math.PI / 2.2,
    endAngle: -Math.PI / 21,
    color: `#55493D`,
    name: 'earth'
  },
  {
    startAngle: -Math.PI / 21,
    endAngle: Math.PI / 2 - Math.PI / 7.5,
    color: `#62F5FA`,
    name: 'water'
  },
  {
    startAngle: Math.PI / 2 + Math.PI / 7.5,
    endAngle: Math.PI + Math.PI / 21,
    color: `#B13600`,
    name: 'fire'
  },
  {
    startAngle: Math.PI + Math.PI / 21,
    endAngle: Math.PI + Math.PI / 2.2,
    color: `#AFCDFC`,
    name: 'air'
  }
];


const hoverClass = 'cast-circle--elements-sector_hover';

export interface CastElement {
  x: string;
  y: string;
  type: string;
}

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

  private elements: CastElement[] = [];

  constructor(private renderer: Renderer2, private element: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (!this.isPlayer) {
      return;
    }
    SectorsConfig.forEach((config) => {
      this.sectors.push(new ElementSector({
        element: this[config.name].nativeElement,
        startAngle: config.startAngle,
        endAngle: config.endAngle,
        color: config.color
      }));
    });

    const r = this.element.nativeElement.getBoundingClientRect();
    const width = r.width;
    const height = r.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = ((width > height ? height : width) / 2) / 1.2;


    SectorsConfig.forEach((sector) => {
      const angle = sector.startAngle + angleStep;

      for (let i = 0; i < countOfType; i++) {
        const currentAngle = angle + i * angleStep;
        console.log('a', currentAngle);
        const x = cx + radius * Math.cos(currentAngle) ;
        const y = cy + radius * Math.sin(currentAngle);

        this.elements.push({
          type: sector.name,
          x: `${x}px`,
          y: `${y}px`
        });
      }
    });

  }

  mousemove(event: MouseEvent) {
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
