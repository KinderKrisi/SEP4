import { Injectable } from '@angular/core';
import { User } from '../../_models/user';
import { Movie } from '../../_models/movie';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: User;
  public movie: Movie;
  public movies: Movie[];

  constructor() { }

  setUser(user: User){
    this.user = user;
  }
  getUser(){
    return this.user;
  }
  getMovie(){
    return this.movie;
  }
  setMovie(movie: Movie){
    this.movie = movie;
  }
  getMovies(){
    return this.movies;
  }
  setMovies(movies: Movie[]){
    this.movies = movies;
  }

}
