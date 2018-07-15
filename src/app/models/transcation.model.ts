import { DataSource } from "../../../node_modules/@angular/cdk/table";
import { MatPaginator, MatSort } from "../../../node_modules/@angular/material";
import { Observable, of as observableOf, merge } from 'rxjs';
import { map } from "../../../node_modules/rxjs/operators";


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

  export class DataTableDataSource extends DataSource<ITranscationDetails>  {
    constructor(private apiService, private paginator: MatPaginator, private sort: MatSort) {
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
        return this.getPagedData(this.getSortedData([...this.data]));
      }));
    }
  
   
    disconnect() {}
    private getPagedData(data: ITranscationDetails[]) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    }

    private getSortedData(data: ITranscationDetails[]) {
        return data;
    //   if (!this.sort.active || this.sort.direction === '') {
    //     return data;
    //   }
  
    //   return data.sort((a, b) => {
    //     const isAsc = this.sort.direction === 'asc';
    //     switch (this.sort.active) {
    //       case 'firstName': return compare(a.firstName, b.firstName, isAsc);
    //       case 'lastName': return compare(a.lastName, b.lastName, isAsc);
    //       case 'email': return compare(a.email, b.email, isAsc);
    //       case 'id': return compare(+a.id, +b.id, isAsc);
    //       default: return 0;
    //     }
    //   });
     }
    
  }

