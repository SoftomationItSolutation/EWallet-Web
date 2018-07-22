import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog} from '@angular/material';
import { ILoginData } from './models/user.model';
import { Router } from '../../node_modules/@angular/router';
import { DatabaseService } from './services/database.service';
import { Location } from '@angular/common';
import { IRequestMoneyData, INotificationCount } from './models/transcation.model';
import { NgxSpinnerService } from '../../node_modules/ngx-spinner';
import { ErrorboxComponent } from './errorbox/errorbox.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  loginstatus: boolean = false;
  showNavText: boolean = false;
  title = 'Flipper Wallet';
  userName: string; 
  route: string;
  showHearder;
  notiCount:number;
  RequestMoneyNotificationCount:number;
  UserDetails: ILoginData;
  userId='0';
  RequestMoneyData: IRequestMoneyData
  dNotificationCount:any;
 
  ngOnInit(){
    this.NotificationDetails();
  }
  
  constructor(private spinner: NgxSpinnerService,private authService: AuthService,private bottomSheet: MatBottomSheet,location: Location, router: Router,private dbService: DatabaseService) {
    this.UserDetails= JSON.parse(this.authService.getUserDetails());
    
    if(this.authService.loggedInStatus){
      this.loginstatus=true;
      
    }
    this.authService.MasterCompDisplay.subscribe(
      (visibility: boolean)  => {
        this.loginstatus = visibility;
      });
   
    this.authService.NotificationMaster.subscribe(
      (data)  => {
        this.notiCount = data.NotificationCount;
        this.RequestMoneyNotificationCount=data.RequestMoneyNotificationCount;
        this.RequestMoneyData=data.lstMoneyRequestNotificationDetails;
      });

    this.authService.RequestMoneyMaster.subscribe((data)  => {
        this.RequestMoneyData=data;
      });

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
  
  MoneyRequestNotification(): void {
    if(this.RequestMoneyNotificationCount>0){
      const bottomSheetRef = this.bottomSheet.open(NotificationSheet, {
        data: { MyDate:this.RequestMoneyData }
      });
    }
  }

  logoutUser(){
    this.authService.logout();
  }

  NotificationDetails(){
    if(this.UserDetails==null)
      return;
    this.userId=this.UserDetails.UserId || '0';
    if(this.userId !='0'){
    this.dbService.NotificationDetails({UserId:this.UserDetails.UserId}).subscribe(
      data => {
        if(JSON.parse(data.json()).flag.toLowerCase()=='true'){
          this.dNotificationCount=JSON.parse(data.json());
          this.authService.NotificationMaster.emit(this.dNotificationCount);
        }
      },
      err => console.error(err.message),
      () => {
      });
    }
  }
}

@Component({
  selector: 'notification-sheet',
  templateUrl: './notification-sheet.html',
})

export class NotificationSheet {
  RequestMoneyData:{RequestId,Amount,Ldate ,LTime,UserName,MobileNo,PartnerId}[];
  UserDetails: ILoginData;
  dNotificationCount:any;

  constructor(private spinner: NgxSpinnerService,private authService: AuthService,public dialog: MatDialog,
    private dbService: DatabaseService,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
   this.RequestMoneyData=this.data.MyDate;
   this.UserDetails= JSON.parse(this.authService.getUserDetails());
   
   this.authService.NotificationMaster.subscribe(
    (data)  => {
      this.RequestMoneyData=data.lstMoneyRequestNotificationDetails;
    });
  }

  Onchange(value,RequestId){
    if(String(parseFloat(value)) !='NaN'){
      const Value = this.RequestMoneyData.find(pm => pm.RequestId === RequestId);
      Value.Amount = value;
    }

  }

  AcceptRequest(RequestRowData){
      this.spinner.show();
        const obj={
          UserId:this.UserDetails.UserId,
          TranscationSourceId:2,
          Amount:RequestRowData.Amount,
          PatnerUserId:RequestRowData.PartnerId,
          MsgDescription:'',
          RequestId:RequestRowData.RequestId,
          RewardId:0
        }
        this.dbService.TranscationManagement(obj).subscribe(
          data => {
            if(JSON.parse(data.json()).flag.toLowerCase() =='true'){
              this.NotificationDetails();
              this.spinner.hide();
             
            }
            else{
              this.spinner.hide();
              this.openDialog('Error on transfer Moeny !',JSON.parse(data.json()).Message );
            }
            
          },
          err => {
            this.spinner.hide();
          },
          () => {
            this.spinner.hide();
          }
        );
  }

  RejectRequest(RequestRowData){
    this.spinner.show();
        const obj={
          RequesterId:this.UserDetails.UserId,
          RequestToId:RequestRowData.PartnerId,
          Amount:RequestRowData.Amount,
          MsgDescription:'',
          RequestId:RequestRowData.RequestId
        }
        this.dbService.TranscationManagementRequestMoney(obj).subscribe(
          data => {
            if(JSON.parse(data.json()).flag.toLowerCase() =='true'){
              this.NotificationDetails();
              this.spinner.hide();
            }
            else{
              this.spinner.hide();
              this.openDialog('Error on reject money request !',JSON.parse(data.json()).Message );
            }
           
          },
          err => {
            this.spinner.hide();
          },
          () => {
            this.spinner.hide();
        });
  }

  openLink(event: MouseEvent): void {
    // this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  NotificationDetails(){
    if(this.UserDetails==null)
      return;
      this.dbService.NotificationDetails({UserId:this.UserDetails.UserId}).subscribe(
        data => {
          if(JSON.parse(data.json()).flag.toLowerCase()=='true'){
            this.dNotificationCount=JSON.parse(data.json());
            this.authService.NotificationMaster.emit(this.dNotificationCount);
          }
        },
        err => console.error(err.message),
        () => {
        });
  }

  openDialog(title,message): void {
    const dialogRef = this.dialog.open(ErrorboxComponent, {
      width: '350px',
      data: {title: title, message: message}
    });
    
  }
}
