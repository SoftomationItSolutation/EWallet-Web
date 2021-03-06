import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UserLogin, ILoginData } from '../../models/user.model';
import { UserLoginService } from '../../services/user-login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { ErrorboxComponent } from '../../errorbox/errorbox.component';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  LoginForm: FormGroup;
  loginReposnse: ILoginData;
  loginInput: UserLogin;
  private formSubmitAttempt: boolean;
  dNotificationCount:any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private loginService: UserLoginService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,private dbService: DatabaseService) {
     
    }

  ngOnInit() {
    this.authService.ClearData();
    this.loginService.LoadComonent='login'
    this.LoginForm = this.fb.group({     
      LoginId: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { 
    return (
      (!this.LoginForm.get(field).valid && this.LoginForm.get(field).touched) ||
      (this.LoginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onLogin() {
    if (this.LoginForm.valid) {
      this.spinner.show();
      this.loginInput = this.LoginForm.value;
        this.loginService.loginUser(this.loginInput).subscribe(
          data => {
            this.loginReposnse= JSON.parse(data.json());
            if(this.loginReposnse.flag.toLowerCase()=='true')
            {
              this.NotificationDetails(this.loginReposnse.UserId);
              this.formSubmitAttempt = true;  
              this.authService.Alogin('dashborad',data.json());
              this.authService.MasterCompDisplay.emit(true);
            }
            else
            {
              this.openDialog('Error in login !',this.loginReposnse.Message)
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

  openDialog(title,message): void {
    const dialogRef = this.dialog.open(ErrorboxComponent, {
      width: '250px',
      data: {title: title, message: message}
    });
  }
  
  NotificationDetails(UserId){
    this.dbService.NotificationDetails({UserId:UserId}).subscribe(
      data => {
        if(JSON.parse(data.json()).flag.toLowerCase()=='true'){
          this.dNotificationCount=JSON.parse(data.json());
          this.authService.NotificationMaster.emit(this.dNotificationCount);
        }
      },
      err => console.error(err.message),
      () => {
      });
  }
}
