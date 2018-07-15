import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatabaseService } from '../services/database.service';
import { ILoginData } from '../models/user.model';
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  userName: string; 
  showNavText: boolean = false;
  selectedPageId = 1;
  selectedPage = 1;
  otherPageId = 1;
  loginstatus=false;
  route: string;
  UserDetails: ILoginData;
  NotiCount:Number
  
constructor(
  private spinner: NgxSpinnerService, 
  location: Location, router: Router,
  private authService: AuthService,
  private dbService: DatabaseService
) {
    this.UserDetails= JSON.parse(this.authService.getUserDetails());
    this.loginstatus=this.authService.loggedInStatus;
    this.authService.NotificationCount=0;
    if(this.loginstatus)
      this.GetNotificationDetsils();
    else
      this.authService.logout();
    
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path().replace('/','');
      } else {
        // this.authService.ClearData();
        this.route = 'login'
      }
    });
    
  }

  ngOnInit(){
  }
  GetNotificationDetsils(){
    this.spinner.show();
    this.dbService.NotificationDetails({UserId:this.UserDetails.UserId}).subscribe(
      data => {
        if(JSON.parse(data.json()).flag.toLowerCase()=='true')
        {
          this.authService.NotificationCount=JSON.parse(data.json()).NotificationCount;
        }
        this.spinner.hide();
      },
      err => console.error(err.message),
      () => {
        this.spinner.hide();
    }
    );
    this.NotiCount=this.authService.NotificationCount;
    this.userName=this.UserDetails.UserName;
  }
  onMenuBtnClick(){
    this.showNavText = !this.showNavText; 
   
  }
  logoutUser(){
    this.authService.logout();
  }


}
