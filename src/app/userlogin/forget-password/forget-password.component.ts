import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { UserLoginService } from '../../services/user-login.service';
import { ConfirmValidParentMatcher, errorMessages, regExps } from '../../CustomValidation/CustomValidation';
import { IForgetPassword, UserResponse, otpFormDataIF } from '../../../models/user.model';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  @ViewChild('stepper') stepper;
  hide = true;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
 
  
  otpForm: FormGroup;
  passForm: FormGroup;
  
  emailForm: FormGroup;
  SendForgetRequest: IForgetPassword;
  UserData: UserResponse;

  otpFormData: otpFormDataIF;
  //UserError:IUserError

  UserError_flag=false;
  UserError_Message='';

  apiOTP: string = '';
  confirmEmailTrue: boolean = true;
  confirmPassTrue: boolean = true;
  confirmOTP: boolean = true;
  isEmailEditable: boolean = true;
  passChangeMsg: string = '';
  constructor(private formBuilder: FormBuilder, private loginService: UserLoginService) 
  { 

  }

  ngOnInit() 
  {
    this.loginService.LoadComonent='forget'
    this.emailForm = new FormGroup({
      LoginId: new FormControl('', [
        Validators.required,
      ]),
    });

    this.otpForm = this.formBuilder.group({
      userOTP: new FormControl('', [
        Validators.required,
      ]),
      userPass: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.password)
      ])
      }
    );

    
  }
  
  ForgotPasswordmaster(){
    this.SendForgetRequest = this.emailForm.value;
    if(this.emailForm.status=="VALID"){
    this.loginService.ForgotPasswordmaster({ LoginId: this.SendForgetRequest.LoginId}).subscribe(
      data =>{
        this.UserData= JSON.parse(data.json());
        if(this.UserData.flag.toLowerCase()=='true')
        {
          this.UserError_flag=false;
          this.stepper.selectedIndex=1;
        }
        else
        {
          this.UserError_flag=true;
          this.UserError_Message=this.UserData.Message;
        }
      },
    (error) => 
    {
      this.UserError_flag=true;
      this.UserError_Message="This user name is not register with us";
      }
    );
  }
  }

  

  ChnagePassword(){
    this.otpFormData = this.otpForm.value;
    if(this.emailForm.status=="VALID"){
      if (this.otpFormData.userOTP != this.UserData.OTP){
        alert("OTP does not match");
      }
      else{
      const obj = 
       {
        UserId:this.UserData.UserId,OTPId:this.UserData.OTPId,OTP:this.otpFormData.userOTP,Password: this.otpFormData.userPass
       }
       this.loginService.ChnagePasswordmaster(obj).subscribe(
        data =>{
          this.UserData= JSON.parse(data.json());
          if(this.UserData.flag.toLowerCase()=='true')
          {
            this.UserError_flag=false;
            this.stepper.selectedIndex=2;
          }
          else
          {
            this.UserError_flag=true;
            this.UserError_Message=this.UserData.Message;
          }
        },
      (error) => 
      {
        this.UserError_flag=true;
        this.UserError_Message="This user name is not register with us";
      }
      );
    }
  }
  }

  stepperSelectionChange($event: StepperSelectionEvent){
    console.log($event.selectedIndex);
    if($event.selectedIndex == 1)
    {
      this.isEmailEditable = false;
    }
  }

  onOTPChange($event){
    
  }

}
