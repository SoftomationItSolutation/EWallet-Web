import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './userlogin/login/login.component';
import { ForgetPasswordComponent } from './userlogin/forget-password/forget-password.component';
import { RegistrationComponent } from './userlogin/registration/registration.component';
import { RewardManagementComponent } from './adminpages/reward-management/reward-management.component';
import { WalletManagementComponent } from './wallet-management/wallet-management.component';
import { BlankpageComponent } from './blankpage/blankpage.component';
import { MyProfileComponent } from './userlogin/my-profile/my-profile.component';

const appRoutes: Routes = [ 
  { path: 'dashborad', component: DashboardComponent }, 
  { path: '', component: BlankpageComponent }, 
  { path: 'forget', component: ForgetPasswordComponent}, 
  { path: 'registration', component: RegistrationComponent}, 
  { path: 'login', component: LoginComponent }, 
  { path: 'reward', component:  RewardManagementComponent},
  { path: 'wallet', component:  WalletManagementComponent},
  { path: 'profile', component:  MyProfileComponent},
  { path: '**', component: PageNotFoundComponent } ];
 
  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes ,{useHash: true});
@NgModule({
  imports: [CommonModule,routing],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { 
 
}
