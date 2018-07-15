import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
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
  accountbalance: number;
  rewardbalance: number;
  constructor(private spinner: NgxSpinnerService) { 
  }

  ngOnInit() 
  {
    this.spinner.show();
    this.GetAvailabeBalance();
    this.GetTranscationDetails('all');
    this.accountbalance=5500;
    this.rewardbalance=10000;
    this.spinner.show();
  }
  GetAvailabeBalance(){

  }

  GetTranscationDetails(flag:string){
    
  }
  
}
