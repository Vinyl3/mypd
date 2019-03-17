import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegister1Component } from './company-register1.component';

describe('CompanyRegister1Component', () => {
  let component: CompanyRegister1Component;
  let fixture: ComponentFixture<CompanyRegister1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRegister1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegister1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
