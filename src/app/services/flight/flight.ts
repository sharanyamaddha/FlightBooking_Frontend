import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Flight {
  
 private BASE_URL = 'http://localhost:8090';

   private searchResults: any[] = []; 
   private selectedFight:any;  


  constructor(private http: HttpClient) {}

  searchFlights(data: any) {
    return this.http.post(
      `${this.BASE_URL}/flights/search`,
      data
    );
  }

   // Save results
  setResults(results: any[]) {
    this.searchResults = results;
  }

  // Get results
  getResults(): any[] {
    return this.searchResults;
  }

  setSelectedFlight(flight:any){
    this.selectedFight=flight;
  }

  getSelectedFlight(){
    return this.selectedFight;
  }

bookFlight(flightId:string,payload:any):Observable<any>{
  return this.http.post(
    `${this.BASE_URL}/booking/${flightId}`,
    payload,{responseType: 'text' as 'json'});
}

getUserBookings(email:string){
  return this.http.get<any[]>(
    `${this.BASE_URL}/booking/history/${email}`
  );
}

cancelBooking(pnr:string){
  return this.http.delete(
    `${this.BASE_URL}/booking/cancel/${pnr}`,
    {responseType: 'text' as 'json'}
  )
}

addFlight(flight:any){
  return this.http.post(`${this.BASE_URL}/flights`,flight,
    {responseType:'text' as 'json'})
  
}

getSources(){
  return this.http.get<string[]>(`${this.BASE_URL}/flights/sources`);
}

getDestinations(){
  return this.http.get<string[]>(`${this.BASE_URL}/flights/destinations`);
}

}
