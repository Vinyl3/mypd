import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddtaskTimeComponent } from './add-tasktime.component';

describe('AddtaskTimeComponent', () => {
  let component: AddtaskTimeComponent;
  let fixture: ComponentFixture<AddtaskTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtaskTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
