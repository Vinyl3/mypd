import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardDetailCompanyComponent } from './credit-card-detail-company.component';

describe('CreditCardDetailCompanyComponent', () => {
  let component: CreditCardDetailCompanyComponent;
  let fixture: ComponentFixture<CreditCardDetailCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardDetailCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardDetailCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
