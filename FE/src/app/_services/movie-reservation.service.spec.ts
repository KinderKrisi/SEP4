import { TestBed, inject } from '@angular/core/testing';

import { MovieReservationService } from './movie-reservation.service';

describe('MovieReservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieReservationService]
    });
  });

  it('should be created', inject([MovieReservationService], (service: MovieReservationService) => {
    expect(service).toBeTruthy();
  }));
});
