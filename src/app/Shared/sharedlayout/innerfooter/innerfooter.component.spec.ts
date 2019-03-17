import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerfooterComponent } from './innerfooter.component';

describe('InnerfooterComponent', () => {
  let component: InnerfooterComponent;
  let fixture: ComponentFixture<InnerfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
