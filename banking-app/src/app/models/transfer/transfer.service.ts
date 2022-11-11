import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
   // REST API
  // constructor() { }
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // ------------------------------------------
  getSpecificTransfer(fromAccount:number, toAccount:number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/api/staff/transfer/`+ `${fromAccount}` + `${toAccount}`);
  }

  createTransfer(transfer:object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + `/api/staff/transfer`, transfer);
  }

  updateAccountsBalance(transfer:object){
    return this.http.put(`${this.baseUrl}` + `/api/staff/transfers`, transfer);
  }
  // ------------------------------------------
  getAllTransfers(): Observable<object> {
    return this.http.get(`${this.baseUrl}` + `/api/staff/transfer/`);
  }
}
