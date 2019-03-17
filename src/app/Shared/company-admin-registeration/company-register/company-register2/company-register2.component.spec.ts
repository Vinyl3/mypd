import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegister2Component } from './company-register2.component';

describe('CompanyRegister2Component', () => {
  let component: CompanyRegister2Component;
  let fixture: ComponentFixture<CompanyRegister2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRegister2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegister2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
