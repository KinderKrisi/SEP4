import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { User } from '../_models/user';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  user: User;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  createUser(user: User): void {
    this.userService.registration(this.user).subscribe();
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.user = {
      'email': this.registerForm.get('email').value,
      "password": this.registerForm.get('password').value,
      'firstName': this.registerForm.get('firstName').value,
      'lastName': this.registerForm.get('lastName').value,
      'phoneNumber': this.registerForm.get('phoneNumber').value
      }
    console.log('user created ', this.user);
    this.createUser(this.user);
  }
}

