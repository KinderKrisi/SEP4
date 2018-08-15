import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ParkingReservationsComponent } from './parking-reservations/parking-reservations.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCreateMovieComponent } from './admin-create-movie/admin-create-movie.component';

//TODO: Remove after server is live
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { MovieComponent } from './movie/movie.component';


import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MyReservationsComponent,
    ParkingReservationsComponent,
    RegistrationComponent,
    MovieComponent,
    AdminUsersComponent,
    AdminCreateMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    CalendarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
