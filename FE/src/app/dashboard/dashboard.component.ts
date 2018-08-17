import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data/data.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

}
