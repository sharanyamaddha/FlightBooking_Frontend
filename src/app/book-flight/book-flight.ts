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

   if (!this.flightId) {
      alert("Flight Id missing!");
      return;
    }
  const bookingRequest = {
    bookerEmailId: this.booking.bookerEmailId,
    tripType: this.booking.tripType,
    passenger: this.booking.passenger
  };

  this.flightService.bookFlight(this.flightId, bookingRequest).subscribe({
    next: () => alert("Success"),
    error: () => alert("Failed")
  });
}

  }



  

