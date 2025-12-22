import { ChangeDetectorRef, Component } from '@angular/core';
import { Flight } from '../../services/flight/flight';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings-history',
  imports: [CommonModule],
  templateUrl: './bookings-history.html',
  styleUrl: './bookings-history.css',
})
export class BookingsHistory {

  email:string='';
  bookings:any=[];

  constructor(
    private flightService:Flight,
    private cdr:ChangeDetectorRef
  ){}

  ngOnInit():void{

    const token=localStorage.getItem('token');
    this.loadBookings();
  }

  loadBookings(){
    const emailid= localStorage.getItem("email")!;
    console.log("mail",emailid);
    this.flightService.getUserBookings(emailid).subscribe({
      next:(data)=>{
        this.bookings=data;
          console.log ("Bookings Data = ", this.bookings);
          this.cdr.detectChanges(); 
      },
      error:(err)=> console.log(err)
    })
  }
   cancelBooking(pnr:string){
   this.flightService.cancelBooking(pnr).subscribe({
    next:(data)=>{
      alert("Ticket cancelled!");
      this.loadBookings();
      console.log("Booking cancelled");
      console.log("Updated booking status",this.bookings.status);
    },
    error:(err)=>{
      console.log(err)
    }
   })
  }

}
