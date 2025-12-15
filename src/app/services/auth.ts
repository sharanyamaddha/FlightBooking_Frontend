import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private BASE_URL = 'http://localhost:8090/api/auth';
  constructor(private http:HttpClient){}

  register(data:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/signup`,data);
  }

  login(data:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/signin`,data);
  }

  getToken(): string | null {
  return localStorage.getItem('token');
}

logout() {
  localStorage.removeItem('token');
}

}
