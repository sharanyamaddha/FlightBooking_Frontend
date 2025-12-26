    import { Injectable } from '@angular/core';
    import { HttpClient,HttpHeaders } from '@angular/common/http';
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

    getRole():string{
      const token=localStorage.getItem('token');
      if(!token) return ''; 

      const payload=JSON.parse(atob(token.split('.')[1]));
      console.log("Role:", payload.roles[0]);

      if(payload.roles && payload.roles.length>0){
        return payload.roles[0];
      }
      return '';

    }
    
changePassword(data: { oldPassword: string; newPassword: string }) {

  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post<{ message: string }>(
    `${this.BASE_URL}/change-password`,
    data,
    { headers }
  );
}

    }
