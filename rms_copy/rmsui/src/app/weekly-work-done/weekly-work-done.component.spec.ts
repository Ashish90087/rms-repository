import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyWorkDoneComponent } from './weekly-work-done.component';

describe('WeeklyWorkDoneComponent', () => {
  let component: WeeklyWorkDoneComponent;
  let fixture: ComponentFixture<WeeklyWorkDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyWorkDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyWorkDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
