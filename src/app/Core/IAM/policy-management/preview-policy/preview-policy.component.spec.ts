import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPolicyComponent } from './preview-policy.component';

describe('PreviewPolicyComponent', () => {
  let component: PreviewPolicyComponent;
  let fixture: ComponentFixture<PreviewPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
