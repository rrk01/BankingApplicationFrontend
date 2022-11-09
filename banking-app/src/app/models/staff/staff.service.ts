import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

   // REST API
  // constructor() { }
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Greg
  getStaffList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/api/staff/getstaff'); 
  }
  // -------------------------------------------
  // Charlie
  listallstaff(): Observable<any> {
    console.log("success");
    return this.http.get(`${this.baseUrl}` + '/api/admin/staff/listAllStaff');
  }
  disableorenablestaff(id:number): Observable<any> {
    console.log("success");
    return this.http.put(`${this.baseUrl}` + '/api/admin/staff/'+ `${id}`, {responseType: 'text'});
  }
  createstafflist(user: object): Observable<object> {
    console.log("success");
    return this.http.post(`${this.baseUrl}` + '/api/admin/staff', user);
  }
  // ------------------------------------------ 

  //Read Operation
  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/account/{}');  //will change
  }
}
