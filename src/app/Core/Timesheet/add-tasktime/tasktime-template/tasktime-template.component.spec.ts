import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskTimeTemplateComponent } from './tasktime-template.component';

describe('TaskTimeTemplateComponent', () => {
  let component: TaskTimeTemplateComponent;
  let fixture: ComponentFixture<TaskTimeTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTimeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTimeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
