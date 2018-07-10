import {Injectable, EventEmitter, OnInit} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  //apiurl='http://localhost:63720/api/user/';
  apiurl='http://api.softomation.in/api/user/';
  constructor(private objHttp: Http) { }


  loginUser(objLogin: {}) {
    return this.objHttp.post(this.apiurl+'LoginMaster', objLogin);
  }

  ForgotPasswordmaster(objForgot: {}) {
    return this.objHttp.post(this.apiurl+'ForgetPassword', objForgot);
  }

  ChnagePasswordmaster(objChange: {}) {
    return this.objHttp.post(this.apiurl+'ChangePassword', objChange);
  }
  
  SignUp(objSignUp: {}) {
    return this.objHttp.post(this.apiurl+'GenerateUser', objSignUp);
  }

  ResendOTP(objResend: {}) {
    return this.objHttp.post(this.apiurl+'ResendOTP', objResend);
  }

  ValidateOTP(objValidate: {}) {
    return this.objHttp.post(this.apiurl+'ValidateOTP', objValidate);
  }
  
}
