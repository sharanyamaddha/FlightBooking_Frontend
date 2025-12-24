import { ChangeDetectorRef, Component } from '@angular/core';
import { Flight } from '../../services/flight/flight';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-bookings-history',
  imports: [CommonModule,Toast],
  templateUrl: './bookings-history.html',
  styleUrl: './bookings-history.css',
})
export class BookingsHistory {

     @ViewChild('toast') toast!: Toast;

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

  
cancelBooking(pnr: string) {

  this.toast.showConfirm(
    'Are you sure you want to cancel this ticket?',
    () => {
      this.flightService.cancelBooking(pnr).subscribe({
        next: () => {
          this.toast.showToast('Ticket cancelled successfully');
          this.loadBookings();
        },
        error: () => {
          this.toast.showToast('Failed to cancel ticket');
        }
      });
    }
  );

}


  getCancelReason(booking: any): string {

  if (booking.status === 'CANCELLED') {
    return 'Already cancelled';
  }

  const bookingTime = new Date(booking.bookingDateTime);
  const now = new Date();

  const diffHours =
    (now.getTime() - bookingTime.getTime()) / (1000 * 60 * 60);

  if (diffHours > 24) {
    return 'Cancellation window closed (24 hrs passed)';
  }

  return '';
}


}
