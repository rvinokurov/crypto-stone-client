import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-end-turn-button',
  templateUrl: './end-turn-button.component.html',
  styleUrls: ['./end-turn-button.component.styl']
})
export class EndTurnButtonComponent {

  @Input() active = false;

  constructor() {
  }

  @HostBinding('class.disabled') get isActive() {
    return !this.active;
  }

}
