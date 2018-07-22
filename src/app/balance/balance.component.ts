import { Component, OnInit } from '@angular/core';
import { ILoginData } from '../models/user.model';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  accountbalance:number
  UserDetails: ILoginData;
  rewardbalance: number;
  transferMoney: number;
  reciverMoney: number;
  constructor(private spinner: NgxSpinnerService,private dbService: DatabaseService,
    private authService: AuthService,) { }

  ngOnInit() {
    this.UserDetails= JSON.parse(this.authService.getUserDetails());
    this.GetAvailabeBalance(this.UserDetails.UserId);
  }

  GetAvailabeBalance(UserId){
    this.spinner.show();
    this.dbService.AvailableBalance({UserId:UserId}).subscribe(
      data => {
        if(JSON.parse(data.json()).flag.toLowerCase()=='true')
        {

          this.accountbalance=JSON.parse(data.json()).AvailableBalance;
          this.rewardbalance=JSON.parse(data.json()).RewardBalance;
          this.transferMoney=JSON.parse(data.json()).transferMoney;
          this.reciverMoney=JSON.parse(data.json()).reciverMoney;
        }
        this.spinner.hide();
      },
      err => console.error(err.message),
      () => {
        this.spinner.hide();
    });
  }
 
}
