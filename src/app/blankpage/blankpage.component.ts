import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-blankpage',
  templateUrl: './blankpage.component.html',
  styleUrls: ['./blankpage.component.css']
})
export class BlankpageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.MasterCompDisplay.emit(false);
  }

}
