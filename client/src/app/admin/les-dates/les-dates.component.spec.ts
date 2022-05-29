import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesDatesComponent } from './les-dates.component';

describe('LesDatesComponent', () => {
  let component: LesDatesComponent;
  let fixture: ComponentFixture<LesDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LesDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LesDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
