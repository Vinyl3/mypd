import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetimesheetComponent } from './manage-timesheet.component';

describe('ManagetimesheetComponent', () => {
  let component: ManagetimesheetComponent;
  let fixture: ComponentFixture<ManagetimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
