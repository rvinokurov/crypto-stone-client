import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyCardInDeskComponent } from './enemy-card-in-desk.component';

describe('EnemyCardInDeskComponent', () => {
  let component: EnemyCardInDeskComponent;
  let fixture: ComponentFixture<EnemyCardInDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnemyCardInDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnemyCardInDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
