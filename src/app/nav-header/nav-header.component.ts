import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';
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
  loginstatus=false;
  route: string;
  showHearder;
  notiCount:number;
  UserDetails: ILoginData;
  userId='0';
  constructor(location: Location, router: Router,private authService: AuthService,private dbService: DatabaseService) {
    this.UserDetails= JSON.parse(this.authService.getUserDetails());
    this.NotificationDetails();
    if(this.authService.loggedInStatus){
      this.loginstatus=true;
      
    }
    this.authService.MasterCompDisplay.subscribe(
      (visibility: boolean)  => {
        this.loginstatus = visibility;
      }
    );
   
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path().replace('/','');
      } else {
        this.route = 'login'
      }
    });
    
  }

  NotificationDetails(){
    if(this.UserDetails==null)
      return;
    this.userId=this.UserDetails.UserId || '0';
    if(this.userId !='0'){
    this.dbService.NotificationDetails({UserId:this.UserDetails.UserId}).subscribe(
      data => {
        if(JSON.parse(data.json()).flag.toLowerCase()=='true')
        {
          this.notiCount=JSON.parse(data.json()).NotificationCount;
          this.authService.NotificationCount=this.notiCount;
        }
      },
      err => console.error(err.message),
      () => {
    }
    );
  }
}
  ngOnInit(){
    this.UserDetails= JSON.parse(this.authService.getUserDetails());
    this.NotificationDetails();
    if(this.UserDetails != null)
      this.userName=this.UserDetails.UserName;
  }
  onMenuBtnClick(){
    this.showNavText = !this.showNavText; 
   
  }
  logoutUser(){
    this.authService.logout();
  }

}
