import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { Movie } from '../_models/movie';
import { MovieService } from '../_services/movie/movie.service';

@Component({
  selector: 'app-admin-create-movie',
  templateUrl: './admin-create-movie.component.html',
  styleUrls: ['./admin-create-movie.component.css']
})
export class AdminCreateMovieComponent implements OnInit {
  
  date: Date;
  createMovieForm: FormGroup;
  submitted = false;

  movie: Movie;

  constructor(private movieService: MovieService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createMovieForm = this.formBuilder.group({
      name: [''],
      length: [''],
      language: [''],
      startTime: Date,
      price: ['']
    });
  }

  createUser(movie: Movie): void {
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
    console.log("startTime", this.createMovieForm.value.startTime())

    
    this.movie = {
      'name': this.createMovieForm.value.name,
      "length": this.createMovieForm.value.length,
      'language': this.createMovieForm.value.language,
      'startTime': this.createMovieForm.value.startTime(),
      'price': this.createMovieForm.value.price
      }
    console.log('movie created ', this.movie);
    this.createUser(this.movie);
  }
}
