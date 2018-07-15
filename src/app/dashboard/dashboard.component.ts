import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatabaseService } from '../services/database.service';
import { ILoginData } from '../../models/user.model';
import { AuthService } from '../auth/auth.service';
// import {DataSource} from '@angular/cdk/table';
// import { Http, Response} from '@angular/http';
// import { dbService } from '../../services/db.service';
// import { CookieService } from 'ngx-cookie-service';
// import { ModelObject } from '../../models/model-object';
// import { ProgressdialogComponent } from '../../dialogs/progressdialog/progressdialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accountbalance: number;
  rewardbalance: number;
  UserDetails: ILoginData;
  AvailableBalance_flag=false;
  AvailableBalance_Message='';
  RewardBalance_flag=false;
  RewardBalance_Message='';
  TranscationData=[];
  constructor(private spinner: NgxSpinnerService,private dbService: DatabaseService,private authService: AuthService) { 
  }

  ngOnInit() 
  {
    this.UserDetails= JSON.parse(this.authService.getUserDetails());
    this.GetAvailabeBalance();
    this.GetTranscationDetails('all');
    this.rewardbalance=10000;
  }
  GetAvailabeBalance(){
    this.spinner.show();
    this.dbService.AvailableBalance({UserId:this.UserDetails.UserId}).subscribe(
      data => {
        if(JSON.parse(data.json()).flag.toLowerCase()=='true')
        {
          this.accountbalance=JSON.parse(data.json()).AvailableBalance;
        }
        else
        {
          this.AvailableBalance_flag=true;
          this.AvailableBalance_Message=JSON.parse(data.json()).Message;
        }
        this.spinner.hide();
      },
      err => console.error(err.message),
      () => {
        this.spinner.hide();
    }
    );
  }

  GetTranscationDetails(flag:string){
    this.spinner.show();
    this.dbService.TranscationDetails({UserId:this.UserDetails.UserId,TranscationSource:flag}).subscribe(
      data => {
        this.TranscationData=JSON.parse(data.json());
        this.spinner.hide();
      },
      err => console.error(err.message),
      () => {
        this.spinner.hide();
    }
    );
  }
  
}
