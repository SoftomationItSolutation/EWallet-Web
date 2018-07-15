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
  selectedPageId = 1;
  selectedPage = 1;
  otherPageId = 1;
  loginstatus=false;
  route: string;
  constructor(location: Location, router: Router,private authService: AuthService,) {
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
     this.loginstatus=this.authService.loggedInStatus;
     this.userName='Hemant Pundir'
  }
  onMenuBtnClick(){
    this.showNavText = !this.showNavText; 
   
  }


}
