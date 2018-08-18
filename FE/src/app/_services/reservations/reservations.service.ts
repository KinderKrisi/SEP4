import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';
import { UserReservation } from '../../_models/userReservation';
import { handleError } from '../../_helper/handler';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient, private dataService: DataService) { }

  private reservationsUrl = "/api/userReservation";

  getUserReservations(userId: Number): Observable<UserReservation> {
    return this.http.get<UserReservation>(`${this.reservationsUrl}/${userId}`).pipe(
      tap(userReservation => console.log(userReservation)),
      catchError(handleError("getUserReservation", new UserReservation))
    )
  }
}
