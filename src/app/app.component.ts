import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { ILoginData } from './models/user.model';
import { Router } from '../../node_modules/@angular/router';
import { DatabaseService } from './services/database.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  loginstatus: boolean = false;
  showNavText: boolean = false;
  title = 'Flipper Wallet';
  userName: string; 
  route: string;
  showHearder;
  notiCount:number;
  UserDetails: ILoginData;
  userId='0';

  constructor(private authService: AuthService,private bottomSheet: MatBottomSheet,location: Location, router: Router,private dbService: DatabaseService) {
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

  onMenuBtnClick(){
    let myDiv = document.getElementById('sidecontain');
    this.showNavText = !this.showNavText; 
    if(this.showNavText)
      myDiv.style.marginLeft = '200px';
    else
      myDiv.style.marginLeft = '50px';
  } 
  openBottomSheet(): void {
    this.bottomSheet.open(NotificationSheet);
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

  logoutUser(){
    this.authService.logout();
  }
}

@Component({
  selector: 'notification-sheet',
  templateUrl: './notification-sheet.html',
})
export class NotificationSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<NotificationSheet>) {}
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
