import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '../../../node_modules/@angular/forms';
import { regExps, errorMessages, ConfirmValidParentMatcher } from '../CustomValidation/CustomValidation';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
import { DatabaseService } from '../services/database.service';
import { ILoginData, IPatnerData } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { UserLoginService } from '../services/user-login.service';
import { IRewardsValidate } from '../models/transcation.model';
import { MatTabChangeEvent } from '../../../node_modules/@angular/material';


export interface ProfileListData {
  flag: string;
  Message:string;
  EmailId:string;
  MobileNo:string;
  Name:string;
  UserName:string;
  UserId:string;
}

@Component({
  selector: 'app-transcationemanagement',
  templateUrl: './transcationemanagement.component.html',
  styleUrls: ['./transcationemanagement.component.css']
})

export class TranscationemanagementComponent implements OnInit {
  AddMoneyForm:FormGroup;
  SendMoneyForm:FormGroup;
  RequestMoneyForm:FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  UserDetails: ILoginData;
  TransferTo: IPatnerData;
  RewardsValidate: IRewardsValidate;

  SendValidateCode=false;
  profileCtrl = new FormControl();
  ProfileList:ProfileListData[];
  filteredProfile: Observable<ProfileListData[]>;

  constructor(private formBuilder: FormBuilder,private spinner: NgxSpinnerService,
    private dbService: DatabaseService,private authService: AuthService,private userService: UserLoginService) { 
      this.UserDetails= JSON.parse(this.authService.getUserDetails());
      this.GetProfile();
  }

  private _filteredProfile(value: string): ProfileListData[] {
    const filterValue = value;
    return this.ProfileList.filter(profile => profile.MobileNo.indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.AddMoneyForm = this.formBuilder.group({
      Amount: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.Amount)
      ]),
      PromoCode: new FormControl('', [
        Validators.pattern(regExps.PromoCode)
      ])
    });

    this.SendMoneyForm = this.formBuilder.group({
      Amount: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.Amount)
      ]),
      MobileNo: new FormControl('', [
        Validators.pattern(regExps.MobileNo)
      ])
    });

    this.RequestMoneyForm = this.formBuilder.group({
      Amount: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.Amount)
      ]),
      MobileNo: new FormControl('', [
        Validators.pattern(regExps.MobileNo)
      ]),
      Remark: new FormControl('', [
        Validators.required
      ]),
    });
  }

  GetProfile(){
    this.spinner.show();
    this.dbService.GetAllProfileDetails({UserId :this.UserDetails.UserId}).subscribe(
      data => {
        this.ProfileList=JSON.parse(data.json());
        this.filteredProfile = this.profileCtrl.valueChanges.pipe(
          startWith(''),map(profile => profile ? this._filteredProfile(profile) : this.ProfileList.slice())
          );
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
    });
  }

  ValidateMobileno(event){
    if((event.target.value.length)==10){
      this.spinner.show();
        this.userService.ValidateProfile({LoginId:this.SendMoneyForm.value.mobile}).subscribe(
          data => {
            this.TransferTo=JSON.parse(data.json());
            if(this.TransferTo.flag.toLowerCase() != 'true'){
              this.SendValidateCode=true;
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
    }
  }

  ValidatePromoCode(event){
    if((event.target.value.length)==8){
      this.spinner.show();
        this.dbService.ValidateRewardCode({UserId:this.UserDetails.UserId,RewardCode:this.AddMoneyForm.value.PromoCode}).subscribe(
          data => {
            this.RewardsValidate=JSON.parse(data.json());
            if(this.RewardsValidate.flag.toLowerCase() != 'true'){
              //this.UserError_Message= this.RewardsValidate.Message;
            }
            else{
              //this.UserError_Message= "You will get "+this.RewardsValidate.RewardAmount+" reward." 
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

  AddMoneyReward(){
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
             
              //this.UserError_Message= "Money added successfully";
            }
            else{
              //this.UserError_Message= JSON.parse(data.json()).Message 
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

  SendMoneyReward(){
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
              //this.SendUserError_Message= "Money send successfully";
            }
            else{
              //this.SendUserError_Message= JSON.parse(data.json()).Message 
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
      //this.SendUserError_Message= "Patner user not validate." 
    }
  }

  ValidateMobilenoRequest(event){
    if((event.target.value.length)==10){
      this.spinner.show();
        this.userService.ValidateProfile({LoginId:this.RequestMoneyForm.value.mobile}).subscribe(
          data => {
            this.TransferTo=JSON.parse(data.json());
            if(this.TransferTo.flag.toLowerCase() != 'true')
            {
              //this.RequestUserError_Message= this.TransferTo.Message;
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

  RequestMoneyReward(){
    if((this.TransferTo.UserId || 0)!=0){
      if(this.RequestMoneyForm.valid){
        this.spinner.show();
        const obj={
          RequesterId:this.UserDetails.UserId,
          RequestToId:this.TransferTo.UserId,
          Amount:this.RequestMoneyForm.value.AddAmount,
          MsgDescription:this.RequestMoneyForm.value.Remark,
        }
        this.dbService.TranscationManagementRequestMoney(obj).subscribe(
          data => {
            if(JSON.parse(data.json()).flag.toLowerCase() =='true')
            {
              //this.RequestUserError_Message= "Request generated successfully";
            }
            else{
              //this.RequestUserError_Message= JSON.parse(data.json()).Message 
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
      //this.RequestUserError_Message= "Patner user not validate." 
    }
  }

  onLinkClick(event: MatTabChangeEvent) {
    if(event.index==0){
      this.AddMoneyForm.reset();
      
    }
    else if(event.index==1){
      this.SendMoneyForm.reset();
    }
    else if(event.index==1){
      this.RequestMoneyForm.reset();
    }
  }
}
