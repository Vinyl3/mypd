import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseYourPlanComponent } from './choose-your-plan.component';

describe('ChooseYourPlanComponent', () => {
  let component: ChooseYourPlanComponent;
  let fixture: ComponentFixture<ChooseYourPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseYourPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseYourPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
