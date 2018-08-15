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
      name: ['', Validators.required],
      length: ['', Validators.required],
      language: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      price: ['', Validators.required]
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
    this.movie = {
      'name': this.createMovieForm.get('name').value,
      "length": this.createMovieForm.get('length').value,
      'language': this.createMovieForm.get('language').value,
      'startTime': this.createMovieForm.get('startTime').value,
      'price': this.createMovieForm.get('price').value
      }
    console.log('movie created ', this.movie);
    this.createUser(this.movie);
  }
}
