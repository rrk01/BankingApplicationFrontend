import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApproverService {
  
  private baseUrl = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  getadminList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/api/admin/getadmin'); 
  }
  
}