import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../node_modules/ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  MasterCompDisplay = new EventEmitter<boolean>();
  public loggedInStatus=JSON.parse(localStorage.getItem('loggedIn') || 'false')
  public NotificationCount:number;
  public NotificationMaster = new EventEmitter<{}>();
  public RequestMoneyMaster = new EventEmitter<{}>();
  public PaymentRequest = new EventEmitter<{}>();
  
  setLoggedIn(value:boolean){
    this.loggedInStatus=value;
    if(value)
      localStorage.setItem('loggedIn','true');
    else 
      localStorage.setItem('loggedIn','false');
  }
  
  constructor(private router: Router,private sessionData:SessionStorageService) {}

  
  getUserDetails(){
    return this.sessionData.retrieve("userdetsils");
  } 

  setUserDetails(data){
    this.sessionData.store("userdetsils", data)
  } 
  removeUserDetails(){
    this.sessionData.clear("userdetsils");
  }
  Alogin(pagename:string,data:any){
    this.MasterCompDisplay.emit(true);
    this.sessionData.store("userdetsils", data)
    this.setLoggedIn(true);
    this.router.navigate(['/'+pagename]);
  }

  logout() {
    this.MasterCompDisplay.emit(false);
    this.sessionData.clear("userdetsils");
    this.setLoggedIn(false);                           
    this.router.navigate(['/login']);
  }
  ClearData() {
    this.MasterCompDisplay.emit(false);
    this.sessionData.clear("userdetsils");
    this.setLoggedIn(false);                                 
  }
}
