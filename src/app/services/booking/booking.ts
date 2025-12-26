import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Booking {
   private BASE_URL = 'http://localhost:8090';

   constructor(private http:HttpClient){}
  
  getTotalSeats(flightId:string){
     const token=localStorage.getItem("token");

  const headers=new HttpHeaders({
    'Authorization':`Bearer ${token}`
  })
    return this.http.get<any>(`${this.BASE_URL}/flights/${flightId}/seats/count`,{headers}) 
  }

  getBookedSeats(flightId:string){
     const token=localStorage.getItem("token");

  const headers=new HttpHeaders({
    'Authorization':`Bearer ${token}`
  })
  return this.http.get<any>(`${this.BASE_URL}/booking/seats/${flightId}`,{headers})
}


}


