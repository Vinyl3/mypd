import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registeration1Component } from './registeration1.component';

describe('Registeration1Component', () => {
  let component: Registeration1Component;
  let fixture: ComponentFixture<Registeration1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registeration1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registeration1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
