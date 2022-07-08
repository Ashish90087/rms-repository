import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineAccessComponent } from './machine-access.component';

describe('MachineAccessComponent', () => {
  let component: MachineAccessComponent;
  let fixture: ComponentFixture<MachineAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
