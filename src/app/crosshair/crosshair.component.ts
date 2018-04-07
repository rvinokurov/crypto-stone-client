import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2} from '@angular/core';

@Component({
  selector: 'app-crosshair',
  templateUrl: './crosshair.component.html',
  styleUrls: ['./crosshair.component.styl']
})
export class CrosshairComponent implements OnInit {


  @Output() onClicked = new EventEmitter<MouseEvent>;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  fireClick($event: MouseEvent) {
    console.log($event);
    this.onClicked.emit($event);
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMove($event: MouseEvent) {
    this.renderer
      .setStyle(this.elementRef.nativeElement, 'transform', `translate3d(${$event.clientX}px, ${$event.clientY}px, 0)`);

  }

  ngOnInit() {
    console.log('this desk', this.desk);
  }

}
