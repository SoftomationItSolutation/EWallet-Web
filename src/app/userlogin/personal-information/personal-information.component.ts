import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { regExps, ConfirmValidParentMatcher, errorMessages } from '../../CustomValidation/CustomValidation';
import { ILoginData } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { UserLoginService } from '../../services/user-login.service';
import { ErrorbarComponent } from '../../errorbar/errorbar.component';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { environment } from '../../../environments/environment';
declare var $:any;

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  DefaultImg='../../../assets/images/users/avatar.png';
  profileImage='';
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  SelectedFile:File=null;
  urls = new Array<string>();
  ProfileForm:FormGroup;
  UserDetails: ILoginData;
  constructor(private authService: AuthService,private spinner: NgxSpinnerService,
    private loginService: UserLoginService,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.UserDetails= JSON.parse(this.authService.getUserDetails());
    if(this.UserDetails.ProfilePicPath=='')
      this.profileImage=this.DefaultImg;
    else
      this.profileImage=environment.api_ImageUrl+this.UserDetails.ProfilePicPath;
    this.ProfileForm = new FormGroup({
      LoginId: new FormControl(this.UserDetails.UserName, [
        Validators.required,
        Validators.pattern(regExps.LoginId)
      ]),
      FirstName: new FormControl(this.UserDetails.FirstName, [
        Validators.required,
      ]),
      LastName: new FormControl(this.UserDetails.LastName, [
        Validators.required,
      ]),
      MobileNo: new FormControl(this.UserDetails.MobileNo, [
        Validators.required,
        Validators.pattern(regExps.MobileNo)
      ]),
      EmailId: new FormControl(this.UserDetails.EmailId, [
        Validators.required,
        Validators.pattern(regExps.EmailId)
      ])
    });
  }

  readURL(event) {
    this.urls = [];
    this.SelectedFile= event.target.files[0];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
          reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.profileImage=e.target.result;
        }
        reader.readAsDataURL(file);
        
      }
      // if(this.urls.length===0){
      //   this.SelectedFile=null;
      //   this.profileImage=this.DefaultImg;
      // }
    }
    else{
      this.profileImage=this.DefaultImg;
    }
  }

  UpdateProfile(){
    if (this.ProfileForm.valid) {
      const fd=new FormData();
      fd.append('ProfilePicPath',this.SelectedFile);
      fd.append('FirstName',this.ProfileForm.value.FirstName);
      fd.append('LastName',this.ProfileForm.value.LastName);
      fd.append('EmailId',this.ProfileForm.value.EmailId);
      fd.append('MobileNo',this.ProfileForm.value.MobileNo);
      fd.append('LoginId',this.ProfileForm.value.LoginId);
      fd.append('UserId',this.UserDetails.UserId);
      this.spinner.show();
      this.loginService.UpdateProfile(fd).subscribe(
        data =>{
          if(JSON.parse(data.json()).flag.toLowerCase()=='true'){
            this.spinner.hide();
              this.openSnackBar("Profile updated successfully",true);
              this.authService.setUserDetails(JSON.parse(data.json()));
            }
            else{
              this.spinner.hide();
              this.openSnackBar(JSON.parse(data.json()).Message,false);
            }
        },
      (error) =>{
        this.spinner.hide();
        this.openSnackBar("Unable to process",false);
        
      },
      () => {
        this.spinner.hide();
      });
   }
  }

  openSnackBar(message:string,success:boolean) {
    this.snackBar.openFromComponent(ErrorbarComponent, {
      duration: 3000,
      data: {success: success, message: message}
    });
  }
  
}
