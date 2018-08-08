import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { Movie } from '../_models/movie';

import { handleError } from '../_helper/handler';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient) { }

    private movieUrl = '/api/movie';

    getMovies(): Observable<Movie[]>{
      return this.http.get<Movie[]>(this.movieUrl).pipe(
        tap(movies => console.log('fetched movies', movies)),
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
        tap(movie => console.log('created movie', movie)),
        catchError(handleError('createMovie', movie))
      )
    }
    updateMovie(id, movie: Movie): Observable<Movie>{
      return this.http.put<Movie>(`${this.movieUrl}/${id}`, movie).pipe(
        tap(movie => console.log('updated movie', movie)),
        catchError(handleError('updateMovie', movie))
      )
    }
  }
