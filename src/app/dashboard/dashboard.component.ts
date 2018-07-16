import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig, MatTabChangeEvent} from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../auth/auth.service';
import { ILoginData } from '../models/user.model';
import { TranscationDetailsSource, ITranscationDetails } from '../models/transcation.model';
import {DataSource} from '@angular/cdk/table';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  TrancationdataSource;

  dataSource: MatTableDataSource<ITranscationDetails>;
  displayedColumns = ['PartnerLoginId','TranscationId', 'TranscationDetail','Amount','Ldate'];
 
 constructor(
   private spinner: NgxSpinnerService,
   private dbService: DatabaseService,
   private authService: AuthService) { 
  }

  ngOnInit(){
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
        this.TranscationData = JSON.parse(data.json());
        this.dataSource = new MatTableDataSource(this.TranscationData);
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
      },
      err => console.error(err.message),
      () => {
        this.spinner.hide();
    }
    );
  
    
  }

  onLinkClick(event: MatTabChangeEvent) {
    if(event.index==0)
      this.GetTranscationDetails('all');
    else if(event.index==1)
      this.GetTranscationDetails('recive');
    else if(event.index==2)
      this.GetTranscationDetails('send');
    else if(event.index==3)
      this.GetTranscationDetails('add');
    // console.log('event => ', event);
    // console.log('index => ', event.index);
    // console.log('tab => ', event.tab);
  }
}
