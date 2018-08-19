import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { DataService } from '../_services/data/data.service';
import { Router,ActivatedRoute } from '../../../node_modules/@angular/router';
import { UserService } from '../_services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user : User;
  id: Number;
  userDetailForm: FormGroup;
  submitted = false;

  constructor(private dataService: DataService,
     private router: Router,
      private userService: UserService,
      private activedRoute: ActivatedRoute,
      private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.checkIfLogedIn();
    this.activedRoute.params.subscribe(params => { this.id = params.id });
    this.user = this.dataService.getUsers()[+this.id-1];
    this.userDetailForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]],
      phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.minLength(8)]]
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userDetailForm.invalid) {
      return;
    }
    this.user = {
      "id": this.user.id,
      'email': this.userDetailForm.value.email,
      "password": this.userDetailForm.value.password,
      'firstName': this.userDetailForm.value.firstName,
      'lastName': this.userDetailForm.value.lastName,
      'phoneNumber': this.userDetailForm.value.phoneNumber
      }
    console.log('user modified ', this.user);
    this.updateUser(this.user);
  }
  updateUser(user: User) {
    console.log("update User user detail", user)
    this.userService.update(user).subscribe();
  }
  checkIfLogedIn() : void{
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user){
      this.router.navigate(['dashboard']);
    }
  }
  onBack() : void {
    this.router.navigate(['adminUsers']);
  }

}
