import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  NotiCount=0;
  userName: string; 
  showNavText: boolean = false;
  selectedPageId = 1;
  selectedPage = 1;
  otherPageId = 1;
  showProjectSubMenu: boolean = false;
  showApplicantSubMenu: boolean = false;
  showBankDetails: boolean = false;
  showStaffDetails: boolean = false;
  showBankSubMenu: boolean = false;
  showSettingSubMenu: boolean = false;
  navOpenFlag: boolean = false;
  isAdmin = false;
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
    this.NotiCount=50;
     this.loginstatus=this.authService.loggedInStatus;
     this.userName='Hemant Pundir'
  }
  onMenuBtnClick(){
    this.showNavText = !this.showNavText; 
    if(this.showNavText == false)
    {
      this.showProjectSubMenu = false;
      this.showApplicantSubMenu = false;
      this.showBankSubMenu = false;
      this.showSettingSubMenu = false;
    }
  }


}
