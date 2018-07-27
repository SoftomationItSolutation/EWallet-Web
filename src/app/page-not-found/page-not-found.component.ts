import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    //this.RedirecttoWallet();
  }

  RedirecttoWallet(){
    var seconds = 5;
      var dvCountDown = document.getElementById("dvCountDown");
      dvCountDown.style.display = "block";
      var lblCount = document.getElementById("lblCount");
      dvCountDown.style.display = "block";
      lblCount.innerHTML = seconds.toString();
      setInterval(function () {
          seconds--;
          lblCount.innerHTML = seconds.toString();
          if (seconds == 0) {
            dvCountDown.style.display = "none";
            this.endpage();
          }
      }, 1000);
  }

  endpage(){
    this.authService.logout();
  }
}
