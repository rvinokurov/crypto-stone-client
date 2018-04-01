import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sausage',
  templateUrl: './sausage.component.html',
  styleUrls: ['./sausage.component.styl']
})
export class SausageComponent implements OnInit {

  @Input() count: number;

  @Input() isPlayer: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
