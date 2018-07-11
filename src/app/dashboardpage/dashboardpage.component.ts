import { Component, OnInit } from '@angular/core';
import { MatDialog } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardpageComponent implements OnInit 
{
  headerData: dashHeaderCountIF[] = [];
  accountbalance: number;
  rewardbalance: number;
  filesCount: number;
  completedCount: number;
  pendingCount: number;
  RejectedCount: number;
  constructor(public progressDialog: MatDialog) 
  { 

    
  }

  ngOnInit() 
  {
    this.accountbalance=5500;
    this.rewardbalance=10000;
  }


}

export interface dashHeaderCountIF
{
  Column1: number;
}

