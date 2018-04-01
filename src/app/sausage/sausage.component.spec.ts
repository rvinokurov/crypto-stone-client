import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SausageComponent } from './sausage.component';

describe('SausageComponent', () => {
  let component: SausageComponent;
  let fixture: ComponentFixture<SausageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SausageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SausageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
