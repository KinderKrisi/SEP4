import { Component, OnInit } from '@angular/core';

import { ParkingReservationService } from '../_services/parking-reservation.service';
import { ParkingReservation } from '../_models/parkingReservation';

import { MovieReservationService } from '../_services/movie-reservation.service';
import { MovieReservation } from '../_models/movieReservation';


@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  constructor(private parkingreservationservice: ParkingReservationService, private movieReservationService: MovieReservationService) { }

  parkingReservations: ParkingReservation[];
  movieReservations: MovieReservation[];

  ngOnInit() {
  }

  getReservedMovies(): void{
    this.movieReservationService.getMovieReservations().subscribe(movieReservations => this.movieReservations = movieReservations);
  }

  getReservedParking(): void{
    this.parkingreservationservice.getParkingReservations().subscribe(parkingReservations => this.parkingReservations = parkingReservations);
  }
}
