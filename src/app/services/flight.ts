import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Flight {
  
  private BASE_URL = 'http://localhost:8090/api/flights/search';

  constructor(private http:HttpClient){}
  //   searchFlights(from:String,to:String,departureDate:String,returnDate:String,tripType:String):Observable<any>{
  //     const params=new HttpParams()
  //     .set('from',from)
  //     .set('to',to)
  //     .set('departureDate',departureDate)
  //     .set('returnDate',returnDate)
  //     .set('tripType',tripType);

  //     return this.http.get(`${this.BASE_URL}/search`,{params});

  // }
}
