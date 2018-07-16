import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '../../../node_modules/@angular/material';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '../../../node_modules/@angular/forms';
import { regExps, errorMessages, ConfirmValidParentMatcher } from '../CustomValidation/CustomValidation';
import { ILoginData, IPatnerData } from '../models/user.model';
import { IRewardsValidate } from '../models/transcation.model';
import { UserLoginService } from '../services/user-login.service';

@Component({
  selector: 'app-wallet-management',
  templateUrl: './wallet-management.component.html',
  styleUrls: ['./wallet-management.component.css']
})
export class WalletManagementComponent implements OnInit {
  AddMoneyForm:FormGroup;
  SendMoneyForm:FormGroup;
  RequestMoneyForm:FormGroup;
  UserDetails: ILoginData;
  AddAmount='';
  PromoCode='';
  MobileNo='';
  RewardsValidate: IRewardsValidate;
  TransferTo: IPatnerData;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errorFlag:boolean = false;
  errors = errorMessages;
  ValidateCode=false;
  UserError_flag=false;
  UserError_Message='';
  SendValidateCode=false;
  SendUserError_flag=false;
  SendUserError_Message='';
  RequestValidateCode=false;
  RequestUserError_flag=false;
  RequestUserError_Message='';

  constructor( private spinner: NgxSpinnerService,private dbService: DatabaseService,
    private authService: AuthService, private formBuilder: FormBuilder,private userService: UserLoginService) { 

  }

  onLinkClick(event: MatTabChangeEvent) {
    this.ValidateCode=false;
    this.UserError_flag=false;
    this.UserError_Message='';
    this.SendValidateCode=false;
    this.SendUserError_flag=false;
    this.SendUserError_Message='';
    this.RequestValidateCode=false;
    this.RequestUserError_flag=false;
    this.RequestUserError_Message='';
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
  }
  ngOnInit() {
    this.UserDetails= JSON.parse(this.authService.getUserDetails());
    this.AddMoneyForm = this.formBuilder.group({
      AddAmount: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.AddAmount)
      ]),
      PromoCode: new FormControl('', [
        Validators.pattern(regExps.PromoCode)
      ])
      });
      this.SendMoneyForm = this.formBuilder.group({
        AddAmount: new FormControl('', [
          Validators.required,
          Validators.pattern(regExps.AddAmount)
        ]),
        mobile: new FormControl('', [
          Validators.pattern(regExps.mobile)
        ])
        });

        this.RequestMoneyForm = this.formBuilder.group({
          AddAmount: new FormControl('', [
            Validators.required,
            Validators.pattern(regExps.AddAmount)
          ]),
          mobile: new FormControl('', [
            Validators.pattern(regExps.mobile)
          ])
          });
  }

  ValidatePromoCode(event){
    this.ValidateCode=false;
    this.UserError_flag=false;
    this.UserError_Message=''
    if((event.target.value.length)==8){
      this.spinner.show();
        this.dbService.ValidateRewardCode({UserId:this.UserDetails.UserId,RewardCode:this.AddMoneyForm.value.PromoCode}).subscribe(
          data => {
            this.RewardsValidate=JSON.parse(data.json());
            if(this.RewardsValidate.flag.toLowerCase() != 'true')
            {
             
              this.ValidateCode=true;
              this.UserError_Message= this.RewardsValidate.Message;
              
            }
            else{
              this.ValidateCode=true;
              this.UserError_Message= "You will get "+this.RewardsValidate.RewardAmount+" reward." 
              
            }
            this.spinner.hide();
          },
          err => console.error(err.message),
          () => {
            this.spinner.hide();
        }
        );
    }
    else{
      this.ValidateCode=false;
      this.UserError_Message= '';
    }
  }

  AddMoneyReward(){
    this.ValidateCode=false;
    this.UserError_flag=false;
    this.UserError_Message=''
    if(this.AddMoneyForm.valid){
        this.spinner.show();
        const obj={
          UserId:this.UserDetails.UserId,
          TranscationSourceId:1,
          Amount:this.AddMoneyForm.value.AddAmount,
          PatnerUserId:0,
          MsgDescription:'',
          RequestId:0,
          RewardId:this.RewardsValidate.RewardId||0,
        }
        this.dbService.TranscationManagement(obj).subscribe(
          data => {
            if(JSON.parse(data.json()).flag.toLowerCase() =='true')
            {
              this.AddAmount='';
              this.PromoCode='';
              this.UserError_flag=true;
              this.UserError_Message= "Money added successfully";
            }
            else{
              this.ValidateCode=true;
              this.UserError_Message= JSON.parse(data.json()).Message 
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
  
  ValidateMobileno(event){
    this.SendValidateCode=false;
    this.SendUserError_flag=false;
    this.SendUserError_Message=''
    if((event.target.value.length)==10){
      this.spinner.show();
        this.userService.ValidateProfile({LoginId:this.SendMoneyForm.value.mobile}).subscribe(
          data => {
            this.TransferTo=JSON.parse(data.json());
            if(this.TransferTo.flag.toLowerCase() != 'true')
            {
              this.SendValidateCode=true;
              this.SendUserError_Message= this.TransferTo.Message;
            }
            this.spinner.hide();
          },
          err => console.error(err.message),
          () => {
            this.spinner.hide();
        }
        );
    }
    else{
      this.SendValidateCode=false;
      this.SendUserError_Message= '';
    }
  }
  
  SendMoneyReward(){
    this.SendValidateCode=false;
    this.SendUserError_flag=false;
    this.SendUserError_Message=''
    if((this.TransferTo.UserId || 0)!=0){
      if(this.SendMoneyForm.valid){
        this.spinner.show();
        const obj={
          UserId:this.UserDetails.UserId,
          TranscationSourceId:2,
          Amount:this.SendMoneyForm.value.AddAmount,
          PatnerUserId:this.TransferTo.UserId,
          MsgDescription:'',
          RequestId:0,
          RewardId:0,
        }
        this.dbService.TranscationManagement(obj).subscribe(
          data => {
            if(JSON.parse(data.json()).flag.toLowerCase() =='true')
            {
              this.AddAmount='';
              this.MobileNo='';
              this.SendUserError_flag=true;
              this.SendUserError_Message= "Money send successfully";
            }
            else{
              this.SendUserError_flag=true;
              this.SendUserError_Message= JSON.parse(data.json()).Message 
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
    else{
      this.SendUserError_flag=true;
      this.SendUserError_Message= "Patner user not validate." 
    }
  }
}
