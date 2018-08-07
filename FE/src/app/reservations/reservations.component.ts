import { Component, OnInit } from '@angular/core';

import {Reservation } from '../_models/reservation';
import { ReservationService } from '../_services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[];
  reservation: Reservation;

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
      this.getReservations();
  }
  getReservations(): void {
    this.reservationService.getReservations().subscribe(reservations => this.reservations = reservations);
  }
  getReservationById(id): void {
    this.reservationService.getReservationById(id).subscribe(reservation => this.reservation = reservation);
  }

}
