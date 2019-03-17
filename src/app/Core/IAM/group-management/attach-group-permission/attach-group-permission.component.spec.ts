import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachGroupPermissionComponent } from './attach-group-permission.component';

describe('AttachGroupPermissionComponent', () => {
  let component: AttachGroupPermissionComponent;
  let fixture: ComponentFixture<AttachGroupPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachGroupPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachGroupPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
