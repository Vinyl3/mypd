import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachGroupUserComponent } from './attach-group-user.component';

describe('AttachGroupUserComponent', () => {
  let component: AttachGroupUserComponent;
  let fixture: ComponentFixture<AttachGroupUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachGroupUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachGroupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
