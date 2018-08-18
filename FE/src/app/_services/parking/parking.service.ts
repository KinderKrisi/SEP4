import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';
import { ParkingPlace } from '../../_models/parkingPlace';
import { tap, catchError } from '../../../../node_modules/rxjs/operators';
import { handleError } from '../../_helper/handler';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(private http: HttpClient) { }

  private parkingUrl = "/api/parking";

  getAll() : Observable<ParkingPlace[]> {
    return this.http.get<ParkingPlace[]>(this.parkingUrl).pipe(
      tap(parking => console.log(parking)),
      catchError(handleError("Get all parking place", null))
    )
  }
  Update(parkingPlace: ParkingPlace): Observable<ParkingPlace> {
    return this.http.put<ParkingPlace>(`${this.parkingUrl}/${parkingPlace.id}`, parkingPlace).pipe(
      tap(parking => console.log("parking has been updated", parking)),
      catchError(handleError("update parking place", null))
    )
  }
}
