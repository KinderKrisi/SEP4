import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';
import { ParkingPlace } from '../../_models/parkingPlace';
import { tap, catchError } from '../../../../node_modules/rxjs/operators';
import { handleError } from '../../_helper/handler';
import { DataService } from '../data/data.service';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  constructor(private http: HttpClient, private dataService: DataService, private toast: ToastService) { }

  private parkingUrl = "/api/parking";

  getAll() : Observable<ParkingPlace[]> {
    return this.http.get<ParkingPlace[]>(this.parkingUrl).pipe(
      tap(parkingLot => this.dataService.setParkingLot(parkingLot)),
      catchError(handleError("Get all parking place", null))
    )
  }
  Update(parkingPlace: ParkingPlace): Observable<ParkingPlace> {
    return this.http.put<ParkingPlace>(`${this.parkingUrl}/${parkingPlace.id}`, parkingPlace).pipe(
      tap(parking => console.log("parking has been updated", parking)),
      catchError(handleError("update parking place", null))
    )
  }

  DeleteParking(id: Number){
    return this.http.delete<any>(`${this.parkingUrl}/${id}`).pipe(
      tap(id => this.DeletedParking()),
      catchError(handleError('error deleting', id))
    )
  }

  DeletedParking(){
    this.toast.parkingPlaceDeleted();
    this.getAll();
  }
}
