import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable } from 'rxjs';

import { ParkingReservation } from '../_models/parkingReservation';

import { handleError } from '../_helper/handler';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ParkingReservationService {

  constructor(
    private http: HttpClient) { }

  private reservationsUrl = '/api/parkingReservation';
  
  /** GET all reservations from the server */
  getParkingReservations(): Observable<ParkingReservation[]> {
    return this.http.get<ParkingReservation[]>(this.reservationsUrl).pipe(
      tap(reservations => console.log('fetched parking reservations', reservations)),
      catchError(handleError('getParkingReservations', []))
    )
  }
  getParkingReservationById(id): Observable<ParkingReservation> {
    return this.http.get<ParkingReservation>(`${this.reservationsUrl}/${id}`).pipe(
      tap(reservation => console.log('fetched parking reservation',  reservation)),
      catchError(handleError('getParkingReservationById', id))
    )
  }
}