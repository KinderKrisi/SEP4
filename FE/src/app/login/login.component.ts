import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../_services/authentication/authentication.service';
import { UserService } from '../_services/user/user.service';
import { Router } from '../../../node_modules/@angular/router';
import { DataService } from '../_services/data/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  password: string;
  email: string;

  constructor(private authenticationService: AuthenticationService,
  private formBuilder: FormBuilder,
  private userService: UserService,
  private dataService: DataService,
  public Router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.password = this.loginForm.get('password').value;
    this.email = this.loginForm.get("email").value;
    console.log("login request", this.email, this.password);
    this.login(this.email, this.password);
  }
  login(email: string, password : string): void{
    this.userService.login(email , password).subscribe();
  }
}
