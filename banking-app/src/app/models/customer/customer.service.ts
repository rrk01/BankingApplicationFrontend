import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Account } from '../account/account';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:9090';

  constructor(private http: HttpClient) { }

  // Greg 
  
  // -----------------------------
  createcustomerlist(customer: object): Observable<object> {
    console.log("success");
    return this.http.post(`${this.baseUrl}` + '/api/customer/register', customer);
  }
  //Read Operation
  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/api/staff/customer`);  //will change
  }
  getCustomer(id:number){
    return this.http.get(`${this.baseUrl}` + `/customer`+ `${id}`, {responseType: 'text'});  //will change
  }
  updateCustomer(id:number){
      console.log("success");
      return this.http.put(`${this.baseUrl}` + '/customer/'+ `${id}`, {responseType: 'text'});
  }
  updateCustomerEnable(customer_id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/api/staff/customer/enable/` + `${customer_id}`, { responseType: 'text' });  //will change
  }

  updateCustomerDisable(customer_id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/api/staff/customer/disable/` + `${customer_id}`, { responseType: 'text' });  //will change
  }
  getuserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/api/customer/getcustomer');
  }
  createcustomeraccount(account:Account){
    return this.http.post(`${this.baseUrl}` + '/api/customer/'+`${account.customerId}`+'/account', account);
  }

}
