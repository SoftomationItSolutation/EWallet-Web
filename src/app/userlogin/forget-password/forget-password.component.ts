import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { UserLoginService } from '../../services/user-login.service';
import { ConfirmValidParentMatcher, errorMessages, regExps } from '../../CustomValidation/CustomValidation';
import {  UserResponse } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { MatDialog, MatSnackBar } from '../../../../node_modules/@angular/material';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { ErrorbarComponent } from '../../errorbar/errorbar.component';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild('stepper') stepper;
  hide = true;
  btnResendOTP=false;
  isLogEditable: boolean = true;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;

  LogForm: FormGroup;
  otpForm: FormGroup;
  UserData: UserResponse;
  constructor(private formBuilder: FormBuilder, private loginService: UserLoginService,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private authService: AuthService,public dialog: MatDialog) 
  { 

  }
  stepperSelectionChange($event: StepperSelectionEvent){
    console.log($event.selectedIndex);
    if($event.selectedIndex == 1)
    {
      this.isLogEditable = false;
    }
  }
  
  ngOnInit(){
    this.authService.ClearData();
    this.loginService.LoadComonent='forget'
    this.LogForm = new FormGroup({
      LoginId: new FormControl('', [
        Validators.required,
      ]),
    });

    this.otpForm = this.formBuilder.group({
      OTP: new FormControl('', [
        Validators.required,
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.password)
      ])
      });
  }

 
  
  ResendOTP(){
    this.spinner.show();
    this.loginService.ResendOTP({ OTPId:this.UserData.OTPId}).subscribe(
      data =>{
        this.UserData= JSON.parse(data.json());
        if(this.UserData.flag.toLowerCase()=='true')
        {
          this.btnResendOTP=false;
          this.stepper.selectedIndex=1;
        }
        else
        {
          //this.UserError_Message=this.UserData.Message;
        }
        this.spinner.hide();
      },
    (error) => {
      this.spinner.hide();
      //this.UserError_Message="This user name is not register with us";
    });
  }

  ForgotPasswordmaster(){
    if(this.LogForm.status=="VALID"){
      this.spinner.show();
      this.loginService.ForgotPasswordmaster({ LoginId: this.LogForm.value.LoginId}).subscribe(
      data =>{
        this.UserData= JSON.parse(data.json());
        if(this.UserData.flag.toLowerCase()=='true'){
          this.stepper.selectedIndex=1;
        }
        else{
          this.openSnackBar(this.UserData.Message,false);
        }
        this.spinner.hide();
      },
    (error) =>{
      this.spinner.hide();
      this.openSnackBar("This user name is not register with us",false);
      });
    }
  }

  ChnagePassword(){
    if(this.LogForm.status=="VALID"){
      if (this.LogForm.value.OTP != this.UserData.OTP){
        alert("OTP does not match");
      }
      else{
        this.spinner.show();
        const obj = 
        {
          UserId:this.UserData.UserId,OTPId:this.UserData.OTPId,OTP:this.LogForm.value.OTP,Password: this.LogForm.value.Password
        }
        this.loginService.ChnagePasswordmaster(obj).subscribe(
          data =>{
            this.UserData= JSON.parse(data.json());
            if(this.UserData.flag.toLowerCase()=='true')
            {
              this.stepper.selectedIndex=2;
            }
            else
            {
              this.openSnackBar(this.UserData.Message,false);
            }
            this.spinner.hide();
          },
        (error) =>{
          this.spinner.hide();
          this.openSnackBar("This user name is not register with us",false);
        });
      }
    }
  }

  openSnackBar(message:string,success:boolean) {
    this.snackBar.openFromComponent(ErrorbarComponent, {
      duration: 1000,
      data: {success: success, message: message}
    });
  }

}
