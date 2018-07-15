import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

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

  constructor(private router: Router) {}

  login(user: User){
    if (user.userName !== '' && user.password !== '' ) { 
      this.loggedIn.next(true);
      this.router.navigate(['/dashborad']);
    }
  }

  Alogin(pagename){
    this.setLoggedIn(true);
    this.loggedIn.next(true);
    this.router.navigate(['/'+pagename]);
  }

  logout() {
    this.setLoggedIn(false);                           
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
}
