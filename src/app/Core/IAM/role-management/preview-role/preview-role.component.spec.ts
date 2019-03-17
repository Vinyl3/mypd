import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRoleComponent } from './preview-role.component';

describe('PreviewRoleComponent', () => {
  let component: PreviewRoleComponent;
  let fixture: ComponentFixture<PreviewRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
