import { Component, OnInit } from '@angular/core';
import { Movie } from '../_models/movie';
import { User } from '../_models/user';
import { MovieReservation } from '../_models/movieReservation';
import { MovieReservationService } from '../_services/movie-reservation/movie-reservation.service'
import {SelectItem} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../_services/data/data.service';


@Component({
  selector: 'app-movie-reservation',
  templateUrl: './movie-reservation.component.html',
  styleUrls: ['./movie-reservation.component.css']
})
export class MovieReservationComponent implements OnInit {

  movie: Movie;
  user: User;
  movieReservation: MovieReservation;
  seats: SelectItem[];

  ReservationForm: FormGroup;
  submitted = false;

  constructor(private movieReservationService : MovieReservationService,
     private formBuilder: FormBuilder,
    private dataService: DataService) 
  {
    this.seats = [
    {label: "row: 1, seatNumber: 1", value: 1},
    {label: "row: 1, seatNumber: 2", value: 2},
    {label: "row: 1, seatNumber: 3", value: 3},
    {label: "row: 1, seatNumber: 4", value: 4},
    {label: "row: 1, seatNumber: 5", value: 5},
    {label: "row: 2, seatNumber: 1", value: 6},
    {label: "row: 2, seatNumber: 2", value: 7},
    {label: "row: 2, seatNumber: 3", value: 8},
    {label: "row: 2, seatNumber: 4", value: 9},
    {label: "row: 2, seatNumber: 5", value: 10},
    {label: "row: 3, seatNumber: 1", value: 11},
    {label: "row: 3, seatNumber: 2", value: 12},
    {label: "row: 3, seatNumber: 3", value: 13},
    {label: "row: 3, seatNumber: 4", value: 14},
    {label: "row: 3, seatNumber: 5", value: 15},
    {label: "row: 4, seatNumber: 1", value: 16},
    {label: "row: 4, seatNumber: 2", value: 17},
    {label: "row: 4, seatNumber: 3", value: 18},
    {label: "row: 4, seatNumber: 4", value: 19},
    {label: "row: 4, seatNumber: 5", value: 20},


    ]
  }
ngOnInit() {
  this.user = this.dataService.getUser();
  console.log("blabla",this.user);
  this.ReservationForm = this.formBuilder.group({
    selectedSeats: [[], [Validators.required]],
    parking: false
  });
  }

  get f() { return this.ReservationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ReservationForm.invalid) {
      return;
    }
    this.ReservationForm.value.selectedSeats.forEach(x => {
      this.movieReservation = {
        endDate: this.movie.endTime,
        movieId: this.movie.Id,
        startDate: this.movie.startTime,
        seatId: x,
        user: this.user,
        wantParking: this.ReservationForm.value.parking
      }

      this.sendReservation(this.movieReservation);
    });
    
  }
  sendReservation(movieReservation: MovieReservation){
    return this.movieReservationService.reserveMovie(movieReservation);
  }

  changeCheckbox():void {
    if(this.ReservationForm.value.parking){
      this.ReservationForm.value.parking = false;
    }
    else{
      this.ReservationForm.value.parking = true;
    }
    console.log("checkbox changed")
  }

}
