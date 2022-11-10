import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
 private baseUrl='http://localhost:9090';

  constructor(private http: HttpClient) { }

  getStaffList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/api/staff/getstaff'); 
  }
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
