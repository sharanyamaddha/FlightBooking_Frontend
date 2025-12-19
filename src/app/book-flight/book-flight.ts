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

   flightId: string | null = null;

  booking :any={
    
    bookerEmailId:'',
    tripType:'ONE_WAY',
    passenger:
      {
        name:'',
        age:null,
        gender:'',
        seatNo:'',
        mealType:''
      }
    
  };

  constructor(
    private flightService:Flight,
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(){
    this.flightId=this.route.snapshot.paramMap.get('flightId');
    

  }

  // addPassenger(){
  //   this.booking.passengers.push({
  //     name:'',
  //     age:null,
  //     gender: '',
  //     seatNo: '',
  //     mealType: ''
  //   })
  // }
submitBooking() {

  console.log("BOOKING TS OBJECT = ", this.booking);

   if (!this.flightId) {
      alert("Flight Id missing!");
      return;
    }
  const bookingRequest = {
    bookerEmailId: this.booking.bookerEmailId,
    tripType: this.booking.tripType,
    passengers: [
      this.booking.passenger  
    ]
  };

  console.log("BOOKING REQUEST SENT TO BACKEND = ", bookingRequest);
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



  

