import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../services/flight';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  imports: [FormsModule,CommonModule],
  templateUrl: './flight-search.html',
  styleUrl: './flight-search.css',
})
export class FlightSearch implements OnInit {

  flights: any[] = [];

  constructor(private flightService: Flight,
    private router: Router
  ) {}

  ngOnInit() {
    this.flights = this.flightService.getResults();   
  }

  BookFlight(flight:any){
    this.flightService.setSelectedFlight(flight);
    this.router.navigate(['/book-flight',flight.flightId]);
    console.log("Flight record:", flight);

  }
}
