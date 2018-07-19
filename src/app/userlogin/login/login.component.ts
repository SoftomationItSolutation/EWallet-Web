import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UserLogin, ILoginData } from '../../models/user.model';
import { UserLoginService } from '../../services/user-login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { ErrorboxComponent } from '../../errorbox/errorbox.component';

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
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private loginService: UserLoginService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog) {
     
    }

  ngOnInit() {
    this.authService.MasterCompDisplay.emit(false);
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
              this.formSubmitAttempt = true;  
              this.authService.Alogin('dashborad',data.json());
              this.authService.MasterCompDisplay.emit(true);
            }
            else
            {
              this.openDialog('Error in login!',this.loginReposnse.Message)
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
  
}
