import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { SessionStorageService } from '../../../node_modules/ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); 
  public loggedInStatus=JSON.parse(localStorage.getItem('loggedIn') || 'false')
  public NotificationCount:number;
  
  setLoggedIn(value:boolean){
    this.loggedInStatus=value;
    if(value)
      localStorage.setItem('loggedIn','true');
    else 
      localStorage.setItem('loggedIn','false');
  }
  get isLoggedId(){
    return JSON.parse(localStorage.getItem('loggedIn') || 'false');
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  constructor(private router: Router,private sessionData:SessionStorageService) {}

  login(user: User){
    if (user.userName !== '' && user.password !== '' ) { 
      this.loggedIn.next(true);
      this.router.navigate(['/dashborad']);
    }
  }
  getUserDetails(){
    return this.sessionData.retrieve("userdetsils");
  } 
  removeUserDetails(){
    this.sessionData.clear("userdetsils");
  }
  Alogin(pagename:string,data:any){
    this.sessionData.store("userdetsils",data)
    this.setLoggedIn(true);
    this.loggedIn.next(true);
    this.router.navigate(['/'+pagename]);
  }

  logout() {
    this.sessionData.clear("userdetsils");
    this.setLoggedIn(false);                           
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
}
