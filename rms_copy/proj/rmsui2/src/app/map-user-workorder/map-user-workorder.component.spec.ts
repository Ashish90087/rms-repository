import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUserWorkorderComponent } from './map-user-workorder.component';

describe('MapUserWorkorderComponent', () => {
  let component: MapUserWorkorderComponent;
  let fixture: ComponentFixture<MapUserWorkorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapUserWorkorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapUserWorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
