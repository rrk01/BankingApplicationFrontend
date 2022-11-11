import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl='http://localhost:8080';

  constructor(private http: HttpClient) { }
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
}