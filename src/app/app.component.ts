import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  loginstatus: boolean = false;
  showNavText: boolean = false;
  title = 'Flipper Wallet';
  
  constructor(private authService: AuthService,private bottomSheet: MatBottomSheet){
   if(this.authService.loggedInStatus){
    this.authService.MasterCompDisplay.emit(true);
   }
  }

  onMenuBtnClick(){
    let myDiv = document.getElementById('sidecontain');
    this.showNavText = !this.showNavText; 
    if(this.showNavText)
      myDiv.style.marginLeft = '200px';
    else
      myDiv.style.marginLeft = '50px';
  } 
  openBottomSheet(): void {
    this.bottomSheet.open(NotificationSheet);
  }
}

@Component({
  selector: 'notification-sheet',
  templateUrl: './notification-sheet.html',
})
export class NotificationSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<NotificationSheet>) {}
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
