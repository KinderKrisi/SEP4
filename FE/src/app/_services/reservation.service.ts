import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { Reservation } from '../_models/reservation';

import { handleError } from '../_helper/handler';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private http: HttpClient) { }

  private reservationsUrl = '/api/reservation';
  
  /** GET all reservations from the server */
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationsUrl).pipe(
      tap(reservations => console.log('fetched reservations')),
      catchError(handleError('getReservations', []))
    )
  }
}