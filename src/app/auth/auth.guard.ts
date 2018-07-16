import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  loggedInStatus=false;
  constructor(private authService: AuthService,private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):Observable<boolean>| boolean {
        this.loggedInStatus = this.authService.loggedInStatus;
        if(!this.loggedInStatus){
            this.router.navigate(['/loginpage'])
            return false;
        }
    return true;
  }

}