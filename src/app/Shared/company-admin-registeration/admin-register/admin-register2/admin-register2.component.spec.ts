import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegister2Component } from './admin-register2.component';

describe('AdminRegister2Component', () => {
  let component: AdminRegister2Component;
  let fixture: ComponentFixture<AdminRegister2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegister2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegister2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
