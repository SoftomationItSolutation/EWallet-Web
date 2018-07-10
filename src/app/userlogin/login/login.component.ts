import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UserLogin, ILoginData } from '../../../models/user.model';
import { UserLoginService } from '../../../services/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  loginReposnse: ILoginData;
  loginInput: UserLogin;
  private formSubmitAttempt: boolean;
  UserError_flag=false;
  UserError_Message='';
  constructor(private fb: FormBuilder,private authService: AuthService, private loginService: UserLoginService) {}

  ngOnInit() {
    this.form = this.fb.group({     
      LoginId: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { 
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    
    if (this.form.valid) {
      this.loginInput = this.form.value;
        this.loginService.loginUser(this.loginInput).subscribe(
          data => {
            this.loginReposnse= JSON.parse(data.json());
            if(this.loginReposnse.flag.toLowerCase()=='true')
            {
              this.formSubmitAttempt = true;  
              this.authService.Alogin('dashborad');
              this.UserError_flag=false;
            }
            else
            {
              this.UserError_flag=true;
              this.UserError_Message=this.loginReposnse.Message;
            }
          },
          err => console.error(err.message),
          () => {
        }
        );
    }
             
  }

}
