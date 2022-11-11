import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  //Read Operation
  getAllBeneficiary(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/api/staff/beneficiary`);  //will change
  }

  approveBeneficiary(beneficiaryAcNo:number): Observable<any>  {
    return this.http.put(`${this.baseUrl}` + `/api/staff/beneficiary/`+`${beneficiaryAcNo}`, {responseType: 'text'});  //will change
  }

  // Ryan
  createuserlist(transfers: object): Observable<object> {
    console.log("success");
    return this.http.post(`${this.baseUrl}` + '/api/customer/beneficiaries', transfers);
  }

  // ----------------------------------
  createBeneficiary(beneficiary:object, customerId:any): Observable<object> {
    console.log("success");
    return this.http.post(`${this.baseUrl}` + `/api/customer/` + `${customerId}` + `/beneficiary`, beneficiary);
  }

  getBeneficiary(customerId:any): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/api/customer/`+ `${customerId}` + `/beneficiary`); 
  }

  deleteBeneficiary(customerId: any, beneficiaryAcNo:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/api/customer/`+ `${customerId}` + `/beneficiary/`+ `${beneficiaryAcNo}`, {responseType: 'text'});
  }

}
