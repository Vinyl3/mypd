import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegister1Component } from './admin-register1.component';

describe('AdminRegister1Component', () => {
  let component: AdminRegister1Component;
  let fixture: ComponentFixture<AdminRegister1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegister1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegister1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
