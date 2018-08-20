import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { ParkingService } from '../_services/parking/parking.service';
import { ParkingPlace } from '../_models/parkingPlace';
import { DataService } from '../_services/data/data.service';

@Component({
  selector: 'app-admin-parking',
  templateUrl: './admin-parking.component.html',
  styleUrls: ['./admin-parking.component.css']
})
export class AdminParkingComponent implements OnInit {
  user : User;
  parkingLot: ParkingPlace[];
  reservedPlaces: ParkingPlace[];
  freePlaces: ParkingPlace[];
  constructor(private parkingService: ParkingService, private dataService: DataService) {
    this.parkingLot = [];
   }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    this.parkingLot = this.dataService.getParkingLot();
    if (this.parkingLot.length > 0) this.reservedPlaces = this.parkingLot.filter(x => x.reserved == true);
    if (this.parkingLot.length > 0) this.freePlaces = this.parkingLot.filter(x => x.reserved == false);
    console.log("parkingLot", this.parkingLot);
  }
  DeleteParking(parkingId: Number){
    this.parkingService.DeleteParking(parkingId).subscribe();
  }


}
