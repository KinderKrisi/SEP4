import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {RequestOptions, Request, RequestMethod} from '@angular/http';


import { User } from '../../_models/user';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'jwt token'
    })
  };

  
@Injectable({
    providedIn: 'root'
  })

  
  export class AuthenticationService {
    constructor(private http: HttpClient) { }

    private authUrl = '/api/auth/token';
 
    login(username: string, password: string): Observable<User> {
        var headers = new HttpHeaders({
            'Content-Type': 'application/json',  
            'Authorization': `${username}:${password}`
        })
        var options = { headers: new HttpHeaders(
            {
                 'Content-Type': 'application/json',  
                 'Authorization': `${username}:${password}`
                }) };

        httpOptions.headers = httpOptions.headers.set('Authorization', `${username}:${password}`)
        //httpOptions.headers.append('Authorization', `${username}:${password}`);
        console.log('httpOptions', httpOptions);
        console.log('headers', headers);
        console.log('options', options);
        return this.http.post<any>(this.authUrl, options).pipe(
                tap(user => console.log("token", user)),
               map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
 
                return user;
            })
        
       );
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}