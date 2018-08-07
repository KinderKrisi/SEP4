import { Component, OnInit } from '@angular/core';

import { Movie } from '../_models/movie';
import { MovieService } from '../_services/movie.service';
import { ReservationService } from '../_services/reservation.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Movie[];

  constructor(private movieservice: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void{
    this.movieservice.getMovies().subscribe(movies => this.movies = movies);
  }

}
