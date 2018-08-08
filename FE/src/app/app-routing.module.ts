import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { MovieComponent } from './movie/movie.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'myReservations', component: MyReservationsComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'movies', component: MovieComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'adminUsers', component: AdminUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
