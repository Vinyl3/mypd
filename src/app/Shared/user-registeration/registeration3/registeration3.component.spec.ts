import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registeration3Component } from './registeration3.component';

describe('Registeration3Component', () => {
  let component: Registeration3Component;
  let fixture: ComponentFixture<Registeration3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registeration3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registeration3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
