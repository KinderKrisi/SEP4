import { TestBed, inject } from '@angular/core/testing';

import { ParkingReservationService } from './parking-reservation.service';

describe('ParkingReservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParkingReservationService]
    });
  });

  it('should be created', inject([ParkingReservationService], (service: ParkingReservationService) => {
    expect(service).toBeTruthy();
  }));
});
