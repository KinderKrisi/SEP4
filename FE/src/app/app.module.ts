import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCreateMovieComponent } from './admin-create-movie/admin-create-movie.component';

//TODO: Remove after server is live
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { MovieComponent } from './movie/movie.component';
import { MovieReservationComponent } from './movie-reservation/movie-reservation.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule} from 'primeng/button';
import { PasswordModule} from 'primeng/password';
import { CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule} from 'primeng/multiselect';
import { CheckboxModule} from 'primeng/checkbox';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AdminParkingComponent } from './admin-parking/admin-parking.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MyReservationsComponent,
    RegistrationComponent,
    MovieComponent,
    AdminUsersComponent,
    AdminCreateMovieComponent,
    MovieReservationComponent,
    MovieDetailComponent,
    AdminParkingComponent,
    UserDetailComponent
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
    BrowserAnimationsModule,
    MultiSelectModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
