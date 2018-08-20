import { Component, OnInit } from '@angular/core';
import { Movie } from '../_models/movie';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data/data.service';
import { Observable } from 'rxjs';
import { MovieSeat } from '../_models/movieSeat';
import { User } from '../_models/user';
import { MovieReservation } from '../_models/movieReservation';
import { SelectItem } from '../../../node_modules/primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieReservationService } from '../_services/movie-reservation/movie-reservation.service';
import { MovieService } from '../_services/movie/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  id: number;
  movie: Movie;
  availableSeats: MovieSeat[];

  user: User;
  movieReservation: MovieReservation;
  seats: SelectItem[];
  movieDetailForm: FormGroup;
  submitted = false;
  numberOfTickets: Number;
  seatsModel: SelectItem[];

  parkingWanted: boolean;
  parkingPlaces: number;

  constructor(private activedRoute: ActivatedRoute,
    private movieService: MovieService,
    private movieReservationService: MovieReservationService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router) {
    this.CreateSeats();
  }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => { this.id = params.id });
    this.movie = this.dataService.getMovies()[this.id - 1];
    this.availableSeats = this.movie.seats.filter(x => x.reserved == false);
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    this.seatsModel = [];
    this.movieDetailForm = this.formBuilder.group({
      selectedSeats: [[], [Validators.required]],
      parking: false,
      parkingPlaces: [[""], [Validators.required/*, Validators.max(this.seatsModel.length)*/]]

    });
    console.log("user",  this.user);
    this.parkingWanted = false;
  }

  get f() { return this.movieDetailForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.movieDetailForm.invalid) {
      return;
    }
    this.movieDetailForm.value.selectedSeats.forEach(x => {
      this.movieReservation = {
        endDate: this.movie.endTime,
        movieId: +this.id,
        startDate: this.movie.startTime,
        seatId: ((+this.id - 1) * 20)+ x,
        userId: this.user.id,
        wantParking: this.movieDetailForm.value.parking
      }
      console.log ("sending reservation request ", this.movieReservation);
      this.sendReservation(this.movieReservation);
    });
  }
  sendReservation(movieReservation: MovieReservation) {
    return this.movieReservationService.reserveMovie(movieReservation).subscribe();
  }

  changeCheckbox(): void {
    if (this.movieDetailForm.value.parking) {
      this.movieDetailForm.value.parking = false;
      this.parkingWanted = false;
    }
    else {
      this.movieDetailForm.value.parking = true;
      this.parkingWanted = true;
     /* this.movieDetailForm = this.formBuilder.group({
        parkingPlaces: [Validators.required, Validators.max(this.seatsModel.length)]
       
      });
    */}
    console.log("checkbox changed")
  }

  onBack(): void {
    this.router.navigate(['movie']);
  }

  CreateSeats() {
    this.seats = [
      { label: "row: 1, seatNumber: 1", value: 1 },
      { label: "row: 1, seatNumber: 2", value: 2 },
      { label: "row: 1, seatNumber: 3", value: 3 },
      { label: "row: 1, seatNumber: 4", value: 4 },
      { label: "row: 1, seatNumber: 5", value: 5 },
      { label: "row: 2, seatNumber: 1", value: 6 },
      { label: "row: 2, seatNumber: 2", value: 7 },
      { label: "row: 2, seatNumber: 3", value: 8 },
      { label: "row: 2, seatNumber: 4", value: 9 },
      { label: "row: 2, seatNumber: 5", value: 10 },
      { label: "row: 3, seatNumber: 1", value: 11 },
      { label: "row: 3, seatNumber: 2", value: 12 },
      { label: "row: 3, seatNumber: 3", value: 13 },
      { label: "row: 3, seatNumber: 4", value: 14 },
      { label: "row: 3, seatNumber: 5", value: 15 },
      { label: "row: 4, seatNumber: 1", value: 16 },
      { label: "row: 4, seatNumber: 2", value: 17 },
      { label: "row: 4, seatNumber: 3", value: 18 },
      { label: "row: 4, seatNumber: 4", value: 19 },
      { label: "row: 4, seatNumber: 5", value: 20 },]
  }

  update() {
    console.log('update');
  }
  delete():void {
      this.movieService.deleteMovie(this.id).subscribe();
  }
}
