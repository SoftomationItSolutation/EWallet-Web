import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../userlogin/login/login.component';
import { ForgetPasswordComponent } from '../userlogin/forget-password/forget-password.component';
import { RegistrationComponent } from '../userlogin/registration/registration.component';

const appRoutes: Routes = [ 
  { path: 'dashborad', component: DashboardComponent }, 
  { path: '', component: LoginComponent }, 
  { path: 'forget', component: ForgetPasswordComponent}, 
  { path: 'registration', component: RegistrationComponent}, 
  { path: 'login', redirectTo: '', pathMatch: 'full' }, 
  { path: '**', component: PageNotFoundComponent } ];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})


  
export class AppRoutingModule { }
