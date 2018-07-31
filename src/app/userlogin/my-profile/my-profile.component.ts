import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ILoginData } from '../../models/user.model';
import { environment } from '../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  DefaultImg='../../../assets/images/users/avatar.png';
  profileImage='';
  UserDetails: ILoginData;
  Name:string;
  UserName:string;
  EmailId:string;
  MobileNo:string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.UserDetails= JSON.parse(this.authService.getUserDetails());
    if(this.UserDetails.ProfilePicPath=='')
      this.profileImage=this.DefaultImg;
    else
      this.profileImage=environment.api_ImageUrl+this.UserDetails.ProfilePicPath;

    this.Name=this.UserDetails.Name;
    this.UserName=this.UserDetails.UserName;
    this.EmailId=this.UserDetails.EmailId;
    this.MobileNo=this.UserDetails.MobileNo;
   
  }

  GetActiveTab(TabName){
    $('.side-menu > .nav li').removeClass("active");
    $('.content-panel > .tab-content div').removeClass("active");
    $("#"+TabName+"li").addClass("active");
    $("#"+TabName).addClass("active");
  }
  
}
