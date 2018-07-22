import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatPaginator, MatTableDataSource } from '../../../node_modules/@angular/material';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../auth/auth.service';
import { ILoginData } from '../models/user.model';
import { ITranscationDetails } from '../models/transcation.model';

@Component({
  selector: 'app-transcationdetails',
  templateUrl: './transcationdetails.component.html',
  styleUrls: ['./transcationdetails.component.css']
})
export class TranscationdetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  UserDetails: ILoginData;
  TranscationData=[];
  dataSource: MatTableDataSource<ITranscationDetails>;
  displayedColumns = ['TranscationId','Amount'];
  //displayedColumns = ['PartnerLoginId','TranscationId', 'TranscationDetail','Amount','Ldate'];
  
  constructor(private spinner: NgxSpinnerService,private dbService: DatabaseService,private authService: AuthService) { }

  ngOnInit() {
    this.UserDetails= JSON.parse(this.authService.getUserDetails());
    this.GetTranscationDetails('all');
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
    });
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
    
  }
}
