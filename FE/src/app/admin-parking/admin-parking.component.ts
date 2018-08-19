import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-admin-parking',
  templateUrl: './admin-parking.component.html',
  styleUrls: ['./admin-parking.component.css']
})
export class AdminParkingComponent implements OnInit {
  user : User;
  constructor() { }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))

  }

}
