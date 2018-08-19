import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MovieComponent } from './movie/movie.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { LoginComponent} from './login/login.component';
import { AdminCreateMovieComponent} from './admin-create-movie/admin-create-movie.component';
import { MovieReservationComponent } from './movie-reservation/movie-reservation.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'myReservations', component: MyReservationsComponent},
  {path: 'movies', component: MovieComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'adminUsers', component: AdminUsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'adminCreateMovie', component: AdminCreateMovieComponent},
  {path: 'movieReservation', component: MovieReservationComponent},
  {path: 'movie/:id', component: MovieDetailComponent},
  {path: 'adminUsers/:id', component: UserDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
