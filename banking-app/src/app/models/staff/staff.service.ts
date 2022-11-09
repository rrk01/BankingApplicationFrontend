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

  //Read Operation
  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/account/{}');  //will change
  }
}
