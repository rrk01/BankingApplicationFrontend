import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  //Read Operation
  getAccountTransactions(accountNumber: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/api/staff/account/` + `${accountNumber}`);  //will change
  }

  getAllAccounts(): Observable<any> { // Getting accounts that aren't approved
    return this.http.get(`${this.baseUrl}` + `/api/staff/accounts/approved`);
  }

  approveAccount(accountNumber_:number, customer_id:number): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/api/staff/accounts/approved/`+`${accountNumber_}` + `/` + `${customer_id}`, {responseType: 'text'});  //will change
  }

  // ------------------------------------------------------
  getCustomerAccounts(newCustomerNo:any): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/api/customer/` + `${newCustomerNo}` + `/account`);
  }

  // -------------------------------------------------------
  createATransaction(fromAccount:number,transfer: object): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/api/customer/addTransferToTransaction/`+ `${fromAccount}`, transfer);  //will change
  }

  // -------------------------------------------------------
  createCustomerAccount(customer_id: any, newAccount: object): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/api/customer/` + `${customer_id}` + `/account`, newAccount);
  }

  
}
