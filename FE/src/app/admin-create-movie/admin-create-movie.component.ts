import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { Movie } from '../_models/movie';
import { MovieService } from '../_services/movie/movie.service';
import { User } from '../_models/user';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-admin-create-movie',
  templateUrl: './admin-create-movie.component.html',
  styleUrls: ['./admin-create-movie.component.css']
})
export class AdminCreateMovieComponent implements OnInit {
  
 
  createMovieForm: FormGroup;
  submitted = false;
  minDateValue = new Date();
  dummyDate = new Date();
  

  movie: Movie;
  startTimeMill: number;
  startTime = new Date();
  user : User;

  constructor(private movieService: MovieService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.minDateValue.setDate(this.minDateValue.getDate() + 1);
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.createMovieForm = this.formBuilder.group({
      name: ['', Validators.required],
      length: ['', [Validators.required, Validators.pattern('[1-9]+[0-9]*')]],
      language: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      startTime: [Date, Validators.required] ,
      price: ['', [Validators.required, Validators.pattern('[1-9]+[0-9]*')]]
    });
  }

  createMovie(movie: Movie): void {
    this.movieService.createMovie(this.movie).subscribe();
  }
  // convenience getter for easy access to form fields
  get f() { return this.createMovieForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createMovieForm.invalid) {
      return;
    }

    console.log("time inside submit form", this.startTimeMill);
    
    this.movie = {
      'name': this.createMovieForm.value.name,
      "length": this.createMovieForm.value.length,
      'language': this.createMovieForm.value.language,
      'startTimeMill': this.startTimeMill,
      'price': this.createMovieForm.value.price
      }
    console.log('movie create request ', this.movie);
    this.createMovie(this.movie);
  }
  setDate(selectedDate: Date): void {
    this.startTime = selectedDate;
    this.startTimeMill = this.startTime.getTime();
    console.log("selected Date Milliseconds", this.startTimeMill);
  }
}
