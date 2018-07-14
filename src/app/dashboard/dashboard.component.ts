import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';
// import {DataSource} from '@angular/cdk/table';
// import { Http, Response} from '@angular/http';
// import { dbService } from '../../services/db.service';
// import { CookieService } from 'ngx-cookie-service';
// import { ModelObject } from '../../models/model-object';
// import { ProgressdialogComponent } from '../../dialogs/progressdialog/progressdialog.component';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  headerData: dashHeaderCountIF[] = [];
  accountbalance: number;
  rewardbalance: number;
  filesCount: number;
  completedCount: number;
  pendingCount: number;
  RejectedCount: number;
  constructor(public progressDialog: MatDialog) { 
  }

  ngOnInit() 
  {
    this.accountbalance=5500;
    this.rewardbalance=10000;
  }

  // headerData: dashHeaderCountIF[] = [];
  // projectCount: number;
  // bankCount: number;
  // filesCount: number;
  // completedCount: number;
  // pendingCount: number;
  // RejectedCount: number;
  // isAdmin: boolean = false;
  // constructor(private spinner: NgxSpinnerService, private objDbServ: dbService,private objCook: CookieService, public modelObject: ModelObject, public progressDialog: MatDialog) 
  // { 
  //   if(this.objCook.get('isUserAdmin')=='true')
  //   this.isAdmin =true;

  //   const dashHeaderProjectObj = 
  //   {
  //     Action: 'SelectProjectsCount'
  //   };
  //   this.objDbServ.Dashboardheadermaster(dashHeaderProjectObj)
  //   .subscribe
  //   (
  //     (resp: Response) =>
  //     {
  //       this.headerData = JSON.parse(resp.json());;
  //     }, 
  //     err => {console.log("Dashboard Header Error:" + err);},
  //     () => 
  //     {
  //       this.projectCount = this.headerData[0].Column1;
  //       this.modelObject.projectHeaderLoaded = true;
  //     }
  //   );

  //   const dashHeaderBankObj = 
  //   {
  //     Action: 'SelectBankCount'
  //   };
  //   this.objDbServ.Dashboardheadermaster(dashHeaderBankObj)
  //   .subscribe
  //   (
  //     (resp: Response) =>
  //     {
  //       this.headerData = JSON.parse(resp.json());;
  //     }, 
  //     err => {console.log("Dashboard Header Error:" + err);},
  //     () => 
  //     {
  //       this.bankCount = this.headerData[0].Column1;
  //       this.modelObject.bankHeaderLoaded = true;
  //     }
  //   );

  //   const dashHeaderFilesObj = 
  //   {
  //     Action: 'SelectApplicationcount'
  //   };
  //   this.objDbServ.Dashboardheadermaster(dashHeaderFilesObj)
  //   .subscribe
  //   (
  //     (resp: Response) =>
  //     {
  //       this.headerData = JSON.parse(resp.json());;
  //     }, 
  //     err => {console.log("Dashboard Header Error:" + err);},
  //     () => 
  //     {
  //       this.filesCount = this.headerData[0].Column1;
  //       this.modelObject.fileHeaderLoaded = true;
  //       // this.modelObject.checkDashboardLoading();
  //     }
  //   );

  //   const footerObj = 
  //   {
  //     Action: 'SelectStatusCount'
  //   };
  //   this.objDbServ.Applicantentrymaster(footerObj)
  //   .subscribe
  //   (
  //     (resp: Response) =>
  //     {
  //       const data = JSON.parse(resp.json());
  //       this.completedCount = data[0].cnt;
  //       this.RejectedCount = data[1].cnt;
  //       this.pendingCount = data[2].cnt;
  //     }, 
  //     err => {console.log("Footer Error:" + err);},
  //     () => 
  //     {
       
  //       this.modelObject.footerLoaded = true;
  //       this.spinner.hide();
  //     }
  //   );
  // }

  // ngOnInit() 
  // {
  //   this.spinner.show();
  // }*/
}
export interface dashHeaderCountIF
{
  Column1: number;
}