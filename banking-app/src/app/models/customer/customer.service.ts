import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Greg 
  getuserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/api/customer/getcustomer');
  }

  createcustomerList(user: object): Observable<object> {
    console.log("success");
    return this.http.post(`${this.baseUrl}` + '/api/customer/register', user);
  }
  // -----------------------------

  //Read Operation
  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/api/staff/customer`);  //will change
  }

  updateCustomerEnable(customer_id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/api/staff/customer/enable/` + `${customer_id}`, { responseType: 'text' });  //will change
  }

  updateCustomerDisable(customer_id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/api/staff/customer/disable/` + `${customer_id}`, { responseType: 'text' });  //will change
  }
// --------------------------------------------
  updateCustomer(customer:object, customerId:any): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/api/customer/` + `${customerId}`, customer);
  }
  

}
