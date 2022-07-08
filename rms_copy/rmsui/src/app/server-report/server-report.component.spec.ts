import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerReportComponent } from './server-report.component';

describe('ServerReportComponent', () => {
  let component: ServerReportComponent;
  let fixture: ComponentFixture<ServerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
