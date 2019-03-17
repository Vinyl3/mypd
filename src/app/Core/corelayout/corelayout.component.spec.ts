import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorelayoutComponent } from './corelayout.component';

describe('CorelayoutComponent', () => {
  let component: CorelayoutComponent;
  let fixture: ComponentFixture<CorelayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorelayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
