import { CommonModule } from '@angular/common';
import { Component,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../services/flight/flight';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-book-flight',
  imports: [FormsModule,CommonModule,Toast,RouterModule],
  templateUrl: './book-flight.html',
  styleUrl: './book-flight.css',
})
export class BookFlight {

   @ViewChild('toast') toast!: Toast;
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
      this.toast.showToast("Flight Id missing!");
      return;
    }
    if (this.passengerCount!=this.booking.passengers.length){
      this.toast.showToast("Passenger Count and Form Count mismatch");
      return;

    }
  const bookingRequest = {
    bookerEmailId: this.booking.bookerEmailId,
    tripType: this.booking.tripType,
    passengers: this.booking.passengers 
    
  };

  console.log("booking request sent to backend = ", bookingRequest);
  this.flightService.bookFlight(this.flightId, bookingRequest).subscribe({
    next: (pnr: string) => {
 
      this.toast.showToast(
      ' Booking Confirmed! Your PNR is ' + pnr,
      () => this.router.navigate(['/bookings-history'])
    );
  },
   error: (err) => {
    console.log(err);
      this.toast.showToast("Booking Failed");
  }
  });
}

}



  

