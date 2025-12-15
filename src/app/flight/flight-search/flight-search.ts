import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../services/flight';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  imports: [FormsModule,CommonModule],
  templateUrl: './flight-search.html',
  styleUrl: './flight-search.css',
})
export class FlightSearch implements OnInit {

  flights: any[] = [];

  constructor(private flightService: Flight) {}

  ngOnInit() {
    this.flights = this.flightService.getResults();
  }
}
