import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { UserLoginService } from '../../services/user-login.service';
import { ConfirmValidParentMatcher, errorMessages, regExps } from '../../CustomValidation/CustomValidation';
import { UserResponse } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { MatDialog, MatSnackBar } from '../../../../node_modules/@angular/material';
import { Router } from '../../../../node_modules/@angular/router';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { ErrorbarComponent } from '../../errorbar/errorbar.component';

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
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
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
    this.spinner.show();
    this.loginService.ResendOTP({ OTPId:this.UserData.OTPId}).subscribe(
      data =>{
        this.UserData= JSON.parse(data.json());
        if(this.UserData.flag.toLowerCase()=='true')
        {
          this.openSnackBar("OTP send successfully.",true);
          this.btnResendOTP=false;
          this.stepper.selectedIndex=1;
        }
        else
        {
          this.openSnackBar(this.UserData.Message,false);
        }
        this.spinner.hide();
      },
    (error) => {
      this.spinner.hide();
      this.openSnackBar("This user name is not register with us",false);
    });
  }

  SignUp(){
    if(this.SignUpForm.status=="VALID"){
      this.spinner.show();
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
          this.openSnackBar(this.UserData.Message,false);
          if(this.UserData.Message=='Your Mobile no verification is pending.')
              this.stepper.selectedIndex=1;
        }
        this.spinner.hide();
      },
    (error) => {
      this.spinner.hide();
      this.openSnackBar("This user name is not register with us.",false);
      }
    );
  }
  }
  
  ValidateOTP(){
    if(this.otpForm.status=="VALID"){
      this.spinner.show();
        this.btnResendOTP=false;
      if (this.otpForm.value.OTP != this.UserData.OTP){
        this.btnResendOTP=true;
        this.openSnackBar("OTP is not matched.",false);
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
            this.openSnackBar(this.UserData.Message,false);
          }
          this.spinner.hide();
        },
      (error) =>{
        this.spinner.hide();
        this.openSnackBar("OTP is not matched.",false);
      }
      );
    }
  }
  }

  stepperSelectionChange($event: StepperSelectionEvent){
    //console.log($event.selectedIndex);
    if($event.selectedIndex == 1)
    {
      this.isLogEditable = false;
    }
  }

 

  openSnackBar(message:string,success:boolean) {
    this.snackBar.openFromComponent(ErrorbarComponent, {
      duration: 3000,
      data: {success: success, message: message}
    });
  }
}
