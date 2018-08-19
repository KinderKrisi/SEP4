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
  public users: User[];
  constructor() { 
    this.logedin = false
    if(localStorage.getItem("currentUser")) this.logedin = true;
  }

  setUser(user: User){
    this.user = user;
    this.logedin = true;
  }
  getUser(){
    return this.user;
  }
  setUsers(users: User[]){
    this.users = users;
  }
  getUsers() {
    return this.users;
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
