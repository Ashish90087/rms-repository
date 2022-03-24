import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveFormComponent } from './receive-form.component';

describe('ReceiveFormComponent', () => {
  let component: ReceiveFormComponent;
  let fixture: ComponentFixture<ReceiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
