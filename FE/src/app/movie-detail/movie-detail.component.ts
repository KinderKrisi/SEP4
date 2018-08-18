import { Component, OnInit } from '@angular/core';
import { Movie } from '../_models/movie';
import { Router,ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data/data.service';
import { Observable } from 'rxjs';
import { MovieSeat } from '../_models/movieSeat';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  id: number;
  movie: Movie;
  availableSeats: MovieSeat[];
  constructor(private activedRoute: ActivatedRoute, private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {this.id = params.id});
    this.movie = this.dataService.getMovies()[this.id -1];
    this.availableSeats = this.movie.seats.filter(x => x.reserved == false);
  }
  onBack(): void{
    this.router.navigate(['movie']);
  }

}
