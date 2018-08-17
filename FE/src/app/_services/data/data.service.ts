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
  public logedin: boolean;
  constructor() { 
    this.logedin = false;
  }

  setUser(user: User){
    this.user = user;
    this.logedin = true;
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
