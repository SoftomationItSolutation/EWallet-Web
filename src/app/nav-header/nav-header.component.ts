import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';


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
  constructor(location: Location, router: Router,private authService: AuthService) {
    this.authService.MasterCompDisplay.subscribe(
      (visibility: boolean)  => {
        this.loginstatus = visibility;
        console.log(this.loginstatus);
      }
    );
    console.log(this.loginstatus);
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path().replace('/','');
      } else {
        this.route = 'login'
      }
    });
  }

  ngOnInit(){
    this.authService.NotificationCount=50;
     this.userName='Hemant Pundir'
  }
  onMenuBtnClick(){
    this.showNavText = !this.showNavText; 
   
  }
  logoutUser(){
    this.authService.logout();
  }

}
