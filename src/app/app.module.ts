import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent, NotificationSheet } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatIconModule, MatRippleModule,MatSidenavModule,  MatMenuModule,   MatButtonModule,    MatCardModule,  MatFormFieldModule,  MatInputModule,  MatTabsModule,  MatTableModule,  MatPaginatorModule,   MatSortModule,  MatSelectModule,  MatDialogModule,  MatTreeModule,  MatProgressSpinnerModule,  MatListModule,  MatTooltipModule,  MatGridListModule,  MatCheckboxModule,MatStepperModule, MatToolbarModule, MatBadgeModule, MatAutocompleteModule, MatSnackBarModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './userlogin/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './userlogin/registration/registration.component';
import { ForgetPasswordComponent } from './userlogin/forget-password/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule } from '@angular/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { Ng2Webstorage } from '../../node_modules/ngx-webstorage';
import { RewardManagementComponent } from './adminpages/reward-management/reward-management.component';
import { WalletManagementComponent } from './wallet-management/wallet-management.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BlankpageComponent } from './blankpage/blankpage.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { ErrorboxComponent } from './errorbox/errorbox.component';
import { BalanceComponent } from './balance/balance.component';
import { TranscationemanagementComponent } from './transcationemanagement/transcationemanagement.component';
import { TranscationdetailsComponent } from './transcationdetails/transcationdetails.component';
import { ErrorbarComponent } from './errorbar/errorbar.component';
import { MyProfileComponent } from './userlogin/my-profile/my-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    NavHeaderComponent,
    RewardManagementComponent,
    WalletManagementComponent,
    BlankpageComponent,
    NotificationSheet,
    ErrorboxComponent,
    BalanceComponent,
    TranscationemanagementComponent,
    TranscationdetailsComponent,
    ErrorbarComponent,
    MyProfileComponent
  ],
  imports: [
    NgxSpinnerModule,
    Ng2Webstorage,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatIconModule, 
    MatRippleModule,
    MatSidenavModule,  
    MatMenuModule,   
    MatButtonModule,    
    MatCardModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatTabsModule,  
    MatTableModule,  
    MatPaginatorModule,   
    MatSortModule,  
    MatSelectModule,  
    MatDialogModule,  
    MatTreeModule,  
    MatProgressSpinnerModule,  
    MatListModule,  
    MatTooltipModule,  
    MatGridListModule,  
    MatCheckboxModule,  
    MatStepperModule, 
    MatToolbarModule, 
    LayoutModule,
    MatBottomSheetModule
  ],
  entryComponents: [NotificationSheet,ErrorboxComponent,ErrorbarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
