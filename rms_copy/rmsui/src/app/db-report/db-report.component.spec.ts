import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbReportComponent } from './db-report.component';

describe('DbReportComponent', () => {
  let component: DbReportComponent;
  let fixture: ComponentFixture<DbReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
