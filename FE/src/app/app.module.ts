import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ParkingReservationsComponent } from './parking-reservations/parking-reservations.component';

//TODO: Remove after server is live
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { MovieComponent } from './movie/movie.component';


import { ReactiveFormsModule } from '@angular/forms';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
