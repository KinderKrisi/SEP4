import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { UserService } from '../_services/user/user.service';
import { DataService } from '../_services/data/data.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
users: User[]
user: User;
  constructor(private userService: UserService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    this.checkIfLogedIn();
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAll().subscribe(users => this.users = users);
  }
  checkIfLogedIn() : void{
    if (!this.user || this.user.role != "admin"){
      this.router.navigate(['dashboard']);
    }
  }
  deleteUser(userId : Number) : void {
    this.userService.deleteUser(userId).subscribe();
    console.log("user has been deleted", userId)
  }
  GoToDetail(userId: Number): void{
    this.router.navigate([`/adminUsers/${userId}`])
  }
}
