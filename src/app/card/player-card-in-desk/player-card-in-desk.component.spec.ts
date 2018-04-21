import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardInDeskComponent } from './player-card-in-desk.component';

describe('PlayerCardInDeskComponent', () => {
  let component: PlayerCardInDeskComponent;
  let fixture: ComponentFixture<PlayerCardInDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCardInDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCardInDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
