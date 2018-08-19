import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { Movie } from '../../_models/movie';

import { handleError } from '../../_helper/handler';
import { DataService } from '../data/data.service';
import { ToastService } from '../toast/toast.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private toastService: ToastService
  ) { }

    private movieUrl = '/api/movie';

    getMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(this.movieUrl).pipe(
        tap(movies => this.dataService.setMovies(movies)),
        catchError(handleError('getMovies', []))
      )
    }
    getMovie(id): Observable<Movie>{
      return this.http.get<Movie>(`${this.movieUrl}/${id}`).pipe(
        tap(movie => console.log('fetched movie', movie)),
        catchError(handleError('getMovie', id))
      )
    }
    createMovie(movie: Movie): Observable<Movie>{
      return this.http.post<Movie>(this.movieUrl, movie).pipe(
        tap(movie => this.createdMovieToast(movie)),
        catchError(this.errorMovieToast('createMovie', movie))
      )
    }
    updateMovie(id, movie: Movie): Observable<Movie>{
      return this.http.put<Movie>(`${this.movieUrl}/${id}`, movie).pipe(
        tap(movie => console.log('updated movie', movie)),
        catchError(handleError('updateMovie', movie))
      )
    }
    deleteMovie(id): Observable<Movie>{
      return this.http.delete<Movie>(`${this.movieUrl}/${id}`).pipe(
        tap(id => this.movieDeleted()),
        catchError(handleError('error deleting', id))
      )
    }
    createdMovieToast(movie: Movie){
      this.toastService.movieCreated();
    }
    errorMovieToast(errorMessage: string, movie: Movie){
      this.toastService.movieNotCreated();
      return handleError(errorMessage, movie);
    }
    movieDeleted(){
      this.toastService.movieDeleted();
    }


  }
