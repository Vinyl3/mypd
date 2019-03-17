import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachUserPermissionComponent } from './attach-user-permission.component';

describe('AttachUserPermissionComponent', () => {
  let component: AttachUserPermissionComponent;
  let fixture: ComponentFixture<AttachUserPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachUserPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachUserPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
