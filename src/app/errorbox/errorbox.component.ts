import { Component,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { DialogData } from '../models/transcation.model';

@Component({
  selector: 'app-errorbox',
  templateUrl: './errorbox.component.html',
  styleUrls: ['./errorbox.component.css']
})
export class ErrorboxComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
