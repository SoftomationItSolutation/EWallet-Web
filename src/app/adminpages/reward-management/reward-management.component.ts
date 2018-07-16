import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '../../../../node_modules/@angular/forms';
import { ILoginData } from '../../models/user.model';
import { regExps, ConfirmValidParentMatcher, errorMessages } from '../../CustomValidation/CustomValidation';
import { MatPaginator, MatTableDataSource } from '../../../../node_modules/@angular/material';
import { IRewardsDetails } from '../../models/transcation.model';

@Component({
  selector: 'app-reward-management',
  templateUrl: './reward-management.component.html',
  styleUrls: ['./reward-management.component.css']
})
export class RewardManagementComponent implements OnInit {
  RewardForm: FormGroup
  RewardId:number =0;
  errorFlag:boolean = false;
  UserDetails: ILoginData;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  UserError_flag=false;
  UserError_Message='';
  RewardData=[];
  dataSource: MatTableDataSource<IRewardsDetails>;
  displayedColumns = ['RewardCode','ValidFrom', 'ValidTill','RewardAmount'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private spinner: NgxSpinnerService,private dbService: DatabaseService,
    private authService: AuthService, private formBuilder: FormBuilder) { 
      this.UserDetails= JSON.parse(this.authService.getUserDetails());
  }

  ngOnInit() {
    this.RewardForm = this.formBuilder.group({
      RewardAmount: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.RewardAmount)
      ]),
      RewardDays: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.RewardDays)
      ])
      });
      this.GetRewards();
  }
  
  GetRewards(){
    this.spinner.show();
    this.dbService.GetRewardManagement({UserId:this.UserDetails.UserId}).subscribe(
      data => {
        this.RewardData = JSON.parse(data.json()).lstRewardManagementDetails;
        this.dataSource = new MatTableDataSource(this.RewardData);
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
      },
      err => console.error(err.message),
      () => {
        this.spinner.hide();
    }
    );
  }
  saveReward(){
    if(this.RewardForm.valid){
      this.spinner.show();
      const obj={
        UserId:this.UserDetails.UserId,
        RewardAmount:this.RewardForm.value.RewardAmount,
        ValidDay:this.RewardForm.value.RewardDays,
        RewardId:this.RewardId,
      }
        this.dbService.AddReword(obj).subscribe(
          data => {
            if(JSON.parse(data.json()).flag.toLowerCase()=='true'){
              this.RewardData = JSON.parse(data.json()).lstRewardManagementDetails;
              this.dataSource = new MatTableDataSource(this.RewardData);
              this.dataSource.paginator = this.paginator;
            }
            else
            {
              this.UserError_flag=true;
              this.UserError_Message=JSON.parse(data.json()).Message;
            }
            this.spinner.hide();
          },
          err => console.error(err.message),
          () => {
            this.spinner.hide();
        }
        );
    }
  }
}
