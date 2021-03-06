import { DataSource } from "../../../node_modules/@angular/cdk/table";
import { MatPaginator, MatSort } from "../../../node_modules/@angular/material";
import { Observable, of as observableOf, merge } from 'rxjs';
import { map } from "../../../node_modules/rxjs/operators";

export interface ITranscationDetailsCol{
  PartnerUserId : Number;
  UserId : Number;
  TranscationSourceId: Number;
  UserLoginId :string;
  EmailId :string;
  MobileNo :string;
  TranscationId :string;
  TranscationSource :string;
  TranscationDetail :string;
  PartnerLoginId :string;
  PartnerEmailId :string;
  PartnerMobileNo :string;
  Ldate :string;
  LTime :string;
  flag :string;
  Message:string;
  AvailableBalance:Number;
  Amount:Number;
}
export interface IRewardsDetails{
  RewardCode :string;
  ValidFrom :string;
  ValidTill :string;
  RewardAmount:Number;
}
export interface IRewardsValidate{
  flag :string;
  Message :string;
  RewardId :Number;
  RewardAmount:Number;
}
export interface DialogData {
  title: string;
  message: string;
}
export interface INotificationCount{
  NotiCount:Number
  RequestMoneyNotificationCount:Number;
}
export interface IRequestMoneyData {
  RequestId: Number;
  Amount: Number;
  Ldate:string;
  LTime:string;
  UserName:string;
  MobileNo:string;
  PartnerId:Number;
}
export interface ITranscationDetails{
    PartnerUserId : Number;
    UserId : Number;
    TranscationSourceId: Number;
    UserLoginId :string;
    EmailId :string;
    MobileNo :string;
    TranscationId :string;
    TranscationSource :string;
    TranscationDetail :string;
    PartnerLoginId :string;
    PartnerEmailId :string;
    PartnerMobileNo :string;
    Ldate :string;
    LTime :string;
    flag :string;
    Message:string;
    AvailableBalance:Number;
    Amount:Number;
  }

  function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  export class TranscationDetailsSource extends DataSource<ITranscationDetails>  {
    constructor(private apiService, private paginator: MatPaginator) {
      super();
    }
    data: ITranscationDetails[] =  this.apiService;

    connect(): Observable<ITranscationDetails[]> {
      const dataMutations = [
        observableOf(this.data),
        this.paginator.page
      ];
  
      this.paginator.length = this.data.length;
  
      return merge(...dataMutations).pipe(map(() => {
        return this.getPagedData([...this.data]);
      }));
    }
  
   
    disconnect() {}
    private getPagedData(data: ITranscationDetails[]) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    }
  }

