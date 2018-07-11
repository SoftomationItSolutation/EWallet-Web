import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
  constructor(public router:Router,private authService: AuthService) { }

  ngOnInit() {
    
    this.isAdmin = true;
    this.userName = 'Admin';
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

  logoutUser(){
    this.authService.logout();   
  }

  mouseEnter(e)
  {
    console.log(e);
  }

  mouseLeave(e)
  {
    console.log(e);
  }

  openCloseNav(id: number)
  {
    this.selectedPageId = id;
    if(this.showNavText == false)
    {
      this.showNavText = true;
      if(this.selectedPageId == 2)
      {
        if(this.showProjectSubMenu == true)
        {
          this.showProjectSubMenu = false;
        }
        else
        {
          this.showProjectSubMenu = true;
        }
      }
      if(this.selectedPageId == 3)
      {
        if(this.showApplicantSubMenu == true)
        {
          this.showApplicantSubMenu = false;
        }
        else
        {
          this.showApplicantSubMenu = true;
        }
      }
      if(this.selectedPageId == 4)
      {
        if(this.showBankSubMenu == true)
        {
          this.showBankSubMenu = false;
          this.showBankDetails = false;
          this.showStaffDetails = false;
        }
        else
        {
          this.showBankSubMenu = true;
        }
      }
      if(this.selectedPageId == 5)
      {
        if(this.showSettingSubMenu == true)
        {
          this.showSettingSubMenu = false;
        }
        else
        {
          this.showSettingSubMenu = true;
        }
      }
    }
    else
    {
      if(this.selectedPageId == 2)
      {
        if(this.showProjectSubMenu == true)
        {
          this.showProjectSubMenu = false;
        }
        else
        {
          this.showProjectSubMenu = true;
        }
      }
      if(this.selectedPageId == 3)
      {
        if(this.showApplicantSubMenu == true)
        {
          this.showApplicantSubMenu = false;
        }
        else
        {
          this.showApplicantSubMenu = true;
        }
      }
      if(this.selectedPageId == 4)
      {
        if(this.showBankSubMenu == true)
        {
          this.showBankSubMenu = false;
        }
        else
        {
          this.showBankSubMenu = true;
        }
      }
      if(this.selectedPageId == 5)
      {
        if(this.showSettingSubMenu == true)
        {
          this.showSettingSubMenu = false;
        }
        else
        {
          this.showSettingSubMenu = true;
        }
      }
    }
  }

  openCloseSubNav()
  {

  }


}
