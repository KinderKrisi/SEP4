import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
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
  }
