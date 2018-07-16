import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  apiurl: string = environment.api_Url;
  constructor(private objHttp: Http) { }

  AvailableBalance(objBalance: {}) {
    return this.objHttp.post(this.apiurl+'GetAvailableBalance', objBalance);
  }

  NotificationDetails(objBalance: {}) {
    return this.objHttp.post(this.apiurl+'GetNotification', objBalance);
  }

  TranscationDetails(objBalance: {}) {
    return this.objHttp.post(this.apiurl+'GetTranscationDetails', objBalance);
  }
  AddReword(objRewardAdd: {}) {
    return this.objHttp.post(this.apiurl+'RewardManagementInsertUpdate', objRewardAdd);
  }

  GetRewardManagement(objRewardAdd: {}) {
    return this.objHttp.post(this.apiurl+'GetRewardManagement', objRewardAdd);
  }

  ValidateRewardCode(objRewardCode: {}) {
    return this.objHttp.post(this.apiurl+'ValidateRewardCode', objRewardCode);
  }

  TranscationManagement(objTranscation: {}) {
    return this.objHttp.post(this.apiurl+'TranscationManagement', objTranscation);
  }
  TranscationManagementRequestMoney(objTranscation: {}) {
    return this.objHttp.post(this.apiurl+'RequestMoney', objTranscation);
  }
  
  
}