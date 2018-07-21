import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { UserLoginService } from '../../services/user-login.service';
import { ConfirmValidParentMatcher, errorMessages, regExps } from '../../CustomValidation/CustomValidation';
import { IForgetPassword, UserResponse, otpFormDataIF } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { ErrorboxComponent } from '../../errorbox/errorbox.component';
import { MatDialog } from '../../../../node_modules/@angular/material';


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

  openDialog(title,message): void {
    const dialogRef = this.dialog.open(ErrorboxComponent, {
      width: '250px',
      data: {title: title, message: message}
    });
    
  }
  
  ResendOTP(){
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
      },
    (error) => {
      //this.UserError_Message="This user name is not register with us";
    });
  }

  ForgotPasswordmaster(){
    if(this.LogForm.status=="VALID"){
      this.loginService.ForgotPasswordmaster({ LoginId: this.LogForm.value.LoginId}).subscribe(
      data =>{
        this.UserData= JSON.parse(data.json());
        if(this.UserData.flag.toLowerCase()=='true'){
          this.stepper.selectedIndex=1;
        }
        else{
          this.openDialog('Error in forget password !',this.UserData.Message);
        }
      },
    (error) =>{
      this.openDialog('Error in forget password !','This user name is not register with us');
      });
    }
  }

  ChnagePassword(){
    if(this.LogForm.status=="VALID"){
      if (this.LogForm.value.OTP != this.UserData.OTP){
        alert("OTP does not match");
      }
      else{
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
              this.openDialog('Error on updating password !',this.UserData.Message);
            }
          },
        (error) =>{
          this.openDialog('Error on updating password !','This user name is not register with us');
        });
      }
    }
  }

}
