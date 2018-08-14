import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { User } from '../../_models/user';

import { handleError } from '../../_helper/handler';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
  { 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  private userUrl = '/api/user';

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap(users => console.log('fetched reservations', users)),
      catchError(handleError('getUsers', []))
    )
  }

  registration(user: User): Observable<User>{
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
  
  
}
