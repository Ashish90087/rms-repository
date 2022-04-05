import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAppUserComponent } from './map-app-user.component';

describe('MapAppUserComponent', () => {
  let component: MapAppUserComponent;
  let fixture: ComponentFixture<MapAppUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapAppUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAppUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
