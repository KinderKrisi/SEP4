import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ParkingReservationsComponent } from './parking-reservations/parking-reservations.component';
import { RegistrationComponent } from './registration/registration.component';
import { MovieComponent } from './movie/movie.component';


import { ReactiveFormsModule } from '@angular/forms';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';

import { AuthGuard } from './_guard/authGuard';
import { JwtInterceptor } from './_helper/jwtIntercpetor';
import { AuthenticationService } from './_services/authentication/authentication.service';
import { UserService } from './_services/user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MyReservationsComponent,
    ParkingReservationsComponent,
    RegistrationComponent,
    MovieComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule
  ],
  providers: [
    /*
    AuthGuard,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
