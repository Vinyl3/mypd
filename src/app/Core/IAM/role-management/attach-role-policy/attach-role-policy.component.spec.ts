import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachRolePolicyComponent } from './attach-role-policy.component';

describe('AttachRolePolicyComponent', () => {
  let component: AttachRolePolicyComponent;
  let fixture: ComponentFixture<AttachRolePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachRolePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachRolePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
