import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data/data.service';
import { User } from '../_models/user';
import { ParkingService } from '../_services/parking/parking.service';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(private dataService: DataService, private parkingService: ParkingService, private userService: UserService) { }

  ngOnInit() {
    
      console.log("loged in", this.dataService.logedin);
      //this.user = JSON.parse(localStorage.getItem("currentUser"));
      this.user = JSON.parse(localStorage.getItem("currentUser"));
      if(this.user.role == "admin") {
        this.parkingService.getAll().subscribe();
        this.userService.getAll().subscribe();
      }
  }

}
