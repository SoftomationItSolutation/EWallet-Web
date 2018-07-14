import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatIconModule, MatRippleModule,MatSidenavModule,  MatMenuModule,   MatButtonModule,    MatCardModule,  MatFormFieldModule,  MatInputModule,  MatTabsModule,  MatTableModule,  MatPaginatorModule,   MatSortModule,  MatSelectModule,  MatDialogModule,  MatTreeModule,  MatProgressSpinnerModule,  MatListModule,  MatTooltipModule,  MatGridListModule,  MatCheckboxModule,MatStepperModule, MatToolbarModule, MatBadgeModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './userlogin/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './userlogin/registration/registration.component';
import { ForgetPasswordComponent } from './userlogin/forget-password/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule } from '../../node_modules/@angular/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavHeaderComponent } from './nav-header/nav-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    NavHeaderComponent
  ],
  imports: [
    NgxSpinnerModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
