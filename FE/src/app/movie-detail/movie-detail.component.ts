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
  }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => { this.id = params.id });
    this.movie = this.dataService.getMovies()[this.id - 1];
    this.seats = [];
    this.availableSeats = this.movie.seats.filter(x => x.reserved == false);
    this.CreateSeats();
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

    let _numberOfParking = +this.movieDetailForm.value.parkingPlaces;
    this.movieDetailForm.value.selectedSeats.forEach(x => {
      let _wantParking = this.movieDetailForm.value.parking;

      if(_numberOfParking <= 0){
        _wantParking = false;
      }
      this.movieReservation = {
        endDate: this.movie.endTime,
        movieId: +this.id,
        startDate: this.movie.startTime,
        seatId: x,
        userId: this.user.id,
        wantParking: this.movieDetailForm.value.parking
      }
      _numberOfParking--;
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
      this.availableSeats.map(x=> this.seats.push(
        {label: `row: ${x.row}, seat: ${x.seatNumber}`, value: x.id}
      ))
      console.log("seats only available", this.seats)
  }

  update() {
    console.log('update');
  }
  delete():void {
      this.movieService.deleteMovie(this.id).subscribe();
  }
}
