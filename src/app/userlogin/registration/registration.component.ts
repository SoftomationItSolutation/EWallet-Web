import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { UserLoginService } from '../../services/user-login.service';
import { ConfirmValidParentMatcher, errorMessages, regExps } from '../../CustomValidation/CustomValidation';
import { UserResponse } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { ErrorboxComponent } from '../../errorbox/errorbox.component';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { Router } from '../../../../node_modules/@angular/router';

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
  SignUpForm: FormGroup;
  otpForm: FormGroup;
  isLogEditable: boolean = true;
  UserData: UserResponse;
  btnResendOTP=true;

  constructor(private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private loginService: UserLoginService,
    public dialog: MatDialog,private router: Router) { 

  }

  ngOnInit(){
    this.authService.ClearData();
    this.loginService.LoadComonent='registration';
    this.btnResendOTP=false;

    this.SignUpForm = new FormGroup({
      LoginId: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.LoginId)
      ]),
      MobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.MobileNo)
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.Password)
      ])
    });

    this.otpForm = this.formBuilder.group({
      OTP: new FormControl('', [
        Validators.required,
        Validators.pattern(regExps.OTP)
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
          this.stepper.selectedIndex=1;
        }
        else
        {
          this.openDialog('Error in registration !',this.UserData.Message);
        }
      },
    (error) => {
      this.openDialog('Error in registration !',"This user name is not register with us")
    });
  }

  SignUp(){
    if(this.SignUpForm.status=="VALID"){
      const Obj={
         Name:'',
         Email:'',
         UserName: this.SignUpForm.value.LoginId,
         MobileNo: this.SignUpForm.value.MobileNo,
         Password: this.SignUpForm.value.Password,
      }
     this.loginService.SignUp(Obj).subscribe(
      data =>{
        this.UserData= JSON.parse(data.json());
        if(this.UserData.flag.toLowerCase()=='true')
        {
          this.stepper.selectedIndex=1;
        }
        else
        {
          this.openDialog('Error in registration !',this.UserData.Message)
          if(this.UserData.Message=='Your Mobile no verification is pending.')
              this.stepper.selectedIndex=1;
        }
      },
    (error) => {
      this.openDialog('Error in registration !',"This user name is not register with us.");
      }
    );
  }
  }
  
  ValidateOTP(){
    if(this.otpForm.status=="VALID"){
        this.btnResendOTP=false;
      if (this.otpForm.value.OTP != this.UserData.OTP){
        this.btnResendOTP=true;
        this.openDialog('Error in registration !',"OTP is not matched.");
      }
      else{
      const obj = 
       {
        OTPId:this.UserData.OTPId,OTP:this.otpForm.value.userOTP
       }
       this.loginService.ValidateOTP(obj).subscribe(
        data =>{
          this.UserData= JSON.parse(data.json());
          if(this.UserData.flag.toLowerCase()=='true'){
            this.router.navigate(['/login']);
          }
          else
          {
            this.btnResendOTP=true;
            this.openDialog('Error in registration !',this.UserData.Message)
          }
        },
      (error) =>{
        this.openDialog('Error in registration !',"OTP is not matched.");
      }
      );
    }
  }
  }

  stepperSelectionChange($event: StepperSelectionEvent){
    console.log($event.selectedIndex);
    if($event.selectedIndex == 1)
    {
      this.isLogEditable = false;
    }
  }

  openDialog(title,message): void {
    const dialogRef = this.dialog.open(ErrorboxComponent, {
      width: '350px',
      data: {title: title, message: message}
    });
    
  }

}
