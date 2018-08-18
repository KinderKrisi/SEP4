import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../_services/reservations/reservations.service';
import { DataService } from '../_services/data/data.service';
import { User } from '../_models/user';
import { UserReservation } from '../_models/userReservation';
import { Movie } from '../_models/movie';
import { ParkingPlace } from '../_models/parkingPlace';
import { MovieSeat } from '../_models/movieSeat';


@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  constructor(private reservationsService: ReservationsService, private dataService: DataService) { }

  userReservations: UserReservation;
  reservedMovies: Movie[];
  user: User;
  reservedParking: ParkingPlace[];
  reservedSeats: MovieSeat[];

  ngOnInit() {
    this.reservedParking = [];
    this.reservedSeats = [];
    this.reservedMovies = [];
    this.user = this.dataService.getUser();
    this.getUserReservations(this.user.id);
    console.log("user service reservation", this.userReservations);
    this.fillObjects(this.userReservations);
  }

  getUserReservations(userId: Number): void{
    this.reservationsService.getUserReservations(userId).subscribe(
      x => this.userReservations = x)
  }
  fillObjects(returnedReservations: UserReservation): void{
    if (this.userReservations){
    if(this.userReservations.ReservedMovies.length > 0) this.reservedMovies = this.userReservations.ReservedMovies;
    if(this.userReservations.ReservedParkingPlaces.length >0 )this.reservedParking = this.userReservations.ReservedParkingPlaces;
    if(this.userReservations.ReservedSeats.length > 0) this.reservedSeats = this.userReservations.ReservedSeats;
    }
  }
}
