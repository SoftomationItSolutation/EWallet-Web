import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { UserLoginService } from '../../services/user-login.service';
import { ConfirmValidParentMatcher, errorMessages, regExps } from '../../CustomValidation/CustomValidation';
import { IGenerateUser, UserResponse, otpFormDataIF } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('stepper') stepper;
  hide = true;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  otpForm: FormGroup;
  passForm: FormGroup;
  
  emailForm: FormGroup;
  SendGenerateUser: IGenerateUser;
  UserData: UserResponse;

  otpFormData: otpFormDataIF;
  //UserError:IUserError
  btnResendOTP=true;
  UserError_flag=false;
  UserError_Message='';

  apiOTP: string = '';
  confirmEmailTrue: boolean = true;
  confirmPassTrue: boolean = true;
  confirmOTP: boolean = true;
  isEmailEditable: boolean = true;
  passChangeMsg: string = '';
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private loginService: UserLoginService) 
  { 

  }

  ngOnInit() 
  {
    this.authService.MasterCompDisplay.emit(false);
    this.loginService.LoadComonent='registration';
    this.btnResendOTP=false;

    this.emailForm = new FormGroup({
      LoginId: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.LoginId)
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.mobile)
      ]),
      userPass: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.password)
      ])
    });

    this.otpForm = this.formBuilder.group({
      userOTP: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.userOTP)
      ])
      }
    );

    
  }
  ResendOTP(){
    this.loginService.ResendOTP({ OTPId:this.UserData.OTPId}).subscribe(
      data =>{
        this.UserData= JSON.parse(data.json());
        if(this.UserData.flag.toLowerCase()=='true')
        {
          this.btnResendOTP=false;
          this.UserError_flag=false;
          this.stepper.selectedIndex=1;
        }
        else
        {
          this.UserError_flag=true;
          this.UserError_Message=this.UserData.Message;
        }
      },
    (error) => {
      this.UserError_flag=true;
      this.UserError_Message="This user name is not register with us";
    });
  }

  SignUp(){
    this.SendGenerateUser = this.emailForm.value;
    if(this.emailForm.status=="VALID"){
      const Obj={
         Name:'',
         Email:'',
         UserName: this.SendGenerateUser.LoginId,
         MobileNo: this.SendGenerateUser.mobile,
         Password: this.SendGenerateUser.userPass,
      }
     this.loginService.SignUp(Obj).subscribe(
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
          if(this.UserData.Message=='Your Mobile no verification is pending.')
              this.stepper.selectedIndex=1;
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

  

  ValidateOTP(){
    this.otpFormData = this.otpForm.value;
    if(this.emailForm.status=="VALID"){
      this.btnResendOTP=false;
      if (this.otpFormData.userOTP != this.UserData.OTP){
        this.btnResendOTP=true;
        this.UserError_flag=true;
        this.UserError_Message='OTP is not matched.';
      }
      else{
      const obj = 
       {
        OTPId:this.UserData.OTPId,OTP:this.otpFormData.userOTP
       }
       this.loginService.ValidateOTP(obj).subscribe(
        data =>{
          this.UserData= JSON.parse(data.json());
          if(this.UserData.flag.toLowerCase()=='true')
          {
            this.UserError_flag=false;
            this.stepper.selectedIndex=2;
          }
          else
          {
            this.btnResendOTP=true;
            this.UserError_flag=true;
            this.UserError_Message=this.UserData.Message;
          }
        },
      (error) => 
      {
        this.UserError_flag=true;
        this.UserError_Message="OTP is not matched";
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
