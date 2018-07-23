import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MatSnackBar, MAT_SNACK_BAR_DATA } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-errorbar',
  templateUrl: './errorbar.component.html',
  styleUrls: ['./errorbar.component.css']
})
export class ErrorbarComponent implements OnInit {
  message
  constructor(public snackBarRef: MatSnackBarRef<ErrorbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit() {
  }

}
