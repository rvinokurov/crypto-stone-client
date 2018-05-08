import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cast-element',
  templateUrl: './cast-element.component.html',
  styleUrls: ['./cast-element.component.styl']
})
export class CastElementComponent implements OnInit {

  @Input() elementType;

  constructor() {
  }

  @HostBinding('class') get classByType() {
    return this.elementType;
  }

  ngOnInit() {
  }

}
