import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastElementComponent } from './cast-element.component';

describe('CastElementComponent', () => {
  let component: CastElementComponent;
  let fixture: ComponentFixture<CastElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
