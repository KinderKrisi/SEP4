import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { User } from '../../_models/user';

import { handleError } from '../../_helper/handler';
import { Observable } from 'rxjs';
import { Login } from '../../_models/login';
import { DataService } from '../data/data.service';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    public router: Router,
    private toast: ToastService
  ) { }

  private userUrl = '/api/user';

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap(users => console.log('fetched reservations', users)),
      catchError(handleError('getUsers', []))
    )
  }

  registration(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user).pipe(
      tap(registration => this.succesfullRegistration( registration)),
      catchError(this.failedRegistration('registration', user))
    )
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user).pipe(
      tap(user => console.log('user has been changed', user)),
      catchError(handleError('updateUser', user))
    )
  }
  login(email: String, password: String): Observable<User> {
    return this.http.get<User>("api/auth", {
      params: {
        email: `${email}`,
        password: `${password}`
      }
    }).pipe(
      tap(user => this.loginUser(user)),
      catchError(this.errorToastLogin("login failed", null))
    )
  }

  loginUser(user: User) {
    this.dataService.setUser(user);
    this.router.navigate(["dashboard"]);
  }
  errorToastLogin(errorMessage: string, user: User) { // TODO why error toast when success
    this.toast.errorLogin();
    return handleError(errorMessage, user);
  }

  succesfullRegistration(user: User) {
    this.loginUser(user);
  }
  failedRegistration(errorMessage: string, user: User) {
    this.toast.registrationFailed();
    return handleError(errorMessage, user);
  }

}
