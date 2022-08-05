import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSecAuditComponent } from './app-sec-audit.component';

describe('AppSecAuditComponent', () => {
  let component: AppSecAuditComponent;
  let fixture: ComponentFixture<AppSecAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSecAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSecAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
