import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Flight {
  
 private BASE_URL = 'http://localhost:8090';

   private searchResults: any[] = [];   


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
}
