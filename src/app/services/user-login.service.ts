import {Injectable, EventEmitter, OnInit} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class UserLoginService {
  public LoadComonent='';
  apiurl: string = environment.api_Url;
 
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

  ValidateProfile(objValidateProfile: {}) {
    return this.objHttp.post(this.apiurl+'GetProfileByLogin', objValidateProfile);
  }

  UpdateProfile(objUpdateProfile: {}) {
    return this.objHttp.post(this.apiurl+'UpdatePersonalDetails', objUpdateProfile);
  }
}
