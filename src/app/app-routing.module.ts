import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './userlogin/login/login.component';
import { ForgetPasswordComponent } from './userlogin/forget-password/forget-password.component';
import { RegistrationComponent } from './userlogin/registration/registration.component';
import { AddMoneyComponent } from './add-money/add-money.component';
const appRoutes: Routes = [ 
  { path: 'dashborad', component: DashboardComponent }, 
  { path: '', component: LoginComponent }, 
  { path: 'forget', component: ForgetPasswordComponent}, 
  { path: 'registration', component: RegistrationComponent}, 
  { path: 'login', redirectTo: '', pathMatch: 'full' }, 
  { path: 'AddMoney', component:  AddMoneyComponent} ,
  { path: '**', component: PageNotFoundComponent } ];
 
  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes ,{useHash: true});
@NgModule({
  imports: [CommonModule,routing],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { 
 
}
