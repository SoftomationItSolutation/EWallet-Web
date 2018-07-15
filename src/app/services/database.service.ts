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
}
