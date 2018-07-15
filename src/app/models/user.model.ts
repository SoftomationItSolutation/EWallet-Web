export interface IForgetPassword {
    LoginId: string;
  }
export interface IGenerateUser{
  userPass: string
  mobile: string
  LoginId: string
}
 
export interface UserResponse{
    Message: string;
    OTP:string;
    OTPId:string;
    UserId:string;
    flag:string;
  }

export interface ILoginData{
  flag: string;
  Message:string;
  EmailId:string;
  MobileNo:string;
  Name:string;
  UserName:string;
  UserId:string;
  }
export interface ChnagePasswordRequest {
    userOTP: string;
    userPass: string;
  }

  export interface otpFormDataIF {
    userOTP: string;
    userPass: string;
  }

  export interface UserLogin{
    LoginId:string;
    Password: string;
}