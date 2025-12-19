import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../services/flight';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-flight',
  imports: [FormsModule,CommonModule],
  templateUrl: './book-flight.html',
  styleUrl: './book-flight.css',
})
export class BookFlight {
   passengerCount:number=1

   flightId: string | null = null;

  booking :any={
    
    bookerEmailId:'',
    tripType:'ONE_WAY',
    passengers:[
      {
        name:'',
        age:null,
        gender:'',
        seatNo:'',
        mealType:''
      }
    ]
  };

  constructor(
    private flightService:Flight,
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(){
    this.flightId=this.route.snapshot.paramMap.get('flightId');
    

  }

  addPassenger(){
    this.booking.passengers.push({
      name:'',
      age:null,
      gender: '',
      seatNo: '',
      mealType: ''
    })
  }

  updatePassengerForms(){
    while(this.passengerCount>this.booking.passengers.length){
      this.addPassenger();
    }
      while (this.passengerCount < this.booking.passengers.length) {
    this.booking.passengers.pop();
  }
  console.log("Passengers:", this.booking.passengers.length);

  }

submitBooking() {

  console.log("Booking TS object = ", this.booking);

   if (!this.flightId) {
      alert("Flight Id missing!");
      return;
    }
    if (this.booking.passengers.length!=this.passengerCount){
      alert("Passenger Count and Form Count mismatch");
      return;

    }
  const bookingRequest = {
    bookerEmailId: this.booking.bookerEmailId,
    tripType: this.booking.tripType,
    passengers: [
      this.booking.passengers 
    ]
  };

  console.log("booking request sent to backend = ", bookingRequest);
  this.flightService.bookFlight(this.flightId, bookingRequest).subscribe({
    next: (pnr: string) => {
    alert("Booking Successful, PNR: " + pnr);
    console.log("PNR RECEIVED:", pnr);
  },
   error: (err) => {
    console.log(err);
    alert("Booking Failed");
  }
  });
}

}



  

