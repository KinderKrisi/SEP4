import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { User } from '../../_models/user';

import { handleError } from '../../_helper/handler';
import { Observable } from 'rxjs';
import { Login } from '../../_models/login';
import { DataService } from '../data/data.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private dataService: DataService, public Router: Router) { }

  private userUrl = '/api/user';

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap(users => console.log('fetched reservations', users)),
      catchError(handleError('getUsers', []))
    )
  }

  registration(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user).pipe(
      tap(registration => console.log('registred user', registration)),
      catchError(handleError('registration', user))
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
      tap(user => this.dataService.setUser(user), // TODO add routing to dashboard
        catchError(handleError('login failed', null))
      ))
  }


}
