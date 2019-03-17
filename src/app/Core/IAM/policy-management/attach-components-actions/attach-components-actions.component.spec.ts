import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachComponentsActionsComponent } from './attach-components-actions.component';

describe('AttachComponentsActionsComponent', () => {
  let component: AttachComponentsActionsComponent;
  let fixture: ComponentFixture<AttachComponentsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachComponentsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachComponentsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
