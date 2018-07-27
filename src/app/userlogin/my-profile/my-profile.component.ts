import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  DefaultImg='../../../assets/images/users/avatar.png';
  profileImage='';
  constructor() { }

  ngOnInit() {
    this.profileImage=this.DefaultImg;
  }

  GetActiveTab(TabName){
    $('.side-menu > .nav li').removeClass("active");
    $('.content-panel > .tab-content div').removeClass("active");
    $("#"+TabName+"li").addClass("active");
    $("#"+TabName).addClass("active");
  }
  
}
