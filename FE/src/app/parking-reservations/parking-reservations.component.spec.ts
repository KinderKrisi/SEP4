import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingReservationsComponent } from './parking-reservations.component';

describe('ReservationsComponent', () => {
  let component: ParkingReservationsComponent;
  let fixture: ComponentFixture<ParkingReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
