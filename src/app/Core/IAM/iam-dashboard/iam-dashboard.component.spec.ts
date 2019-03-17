import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IAMDashboardComponent } from './iam-dashboard.component';

describe('IAMDashboardComponent', () => {
  let component: IAMDashboardComponent;
  let fixture: ComponentFixture<IAMDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IAMDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IAMDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
