import { Component, OnInit } from '@angular/core';

import {ParkingReservation } from '../_models/parkingReservation';
import { ParkingReservationService } from '../_services/parking-reservation/parking-reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './parking-reservations.component.html',
  styleUrls: ['./parking-reservations.component.css']
})
export class ParkingReservationsComponent implements OnInit {

  parkingReservations: ParkingReservation[];
  parkingReservation: ParkingReservation;

  constructor(private parkingReservationService: ParkingReservationService) { }

  ngOnInit() {
      this.getReservations();
  }
  getReservations(): void {
    this.parkingReservationService.getParkingReservations().subscribe(reservations => this.parkingReservations = reservations);
  }
  getReservationById(id): void {
    this.parkingReservationService.getParkingReservationById(id).subscribe(reservation => this.parkingReservation = reservation);
  }

}
