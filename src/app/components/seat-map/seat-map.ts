import { Component, Input,Output,EventEmitter } from '@angular/core';
import { Booking } from '../../services/booking/booking';
import { Flight } from '../../services/flight/flight';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-seat-map',
  imports: [CommonModule],
  templateUrl: './seat-map.html',
  styleUrl: './seat-map.css',
})
export class SeatMap {

  @Input() flightId!: string;
  @Input() maxSeats!: number;
@Output() seatSelectionChanged = new EventEmitter<string[]>();

  totalSeats=0;
  totalRows=0;
  cols=['A','B','C','D','E','F','G','H'];
  seats='';
  seatMap:any[][]=[];
  bookedSeats:string[]=[];
  selectedSeats:string[]=[];
  maxReached = false;

  constructor(
    private bookingService:Booking,
    private flightService:Flight,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){
    //const flightId=this.route.snapshot.paramMap.get('flightId')!;
     this.bookingService.getTotalSeats(this.flightId).subscribe(res => {
        console.log("SeatMap received flightId:", this.flightId);

    this.totalSeats = res.totalSeats;
    this.totalRows = Math.ceil(this.totalSeats / 6);

    this.bookingService.getBookedSeats(this.flightId).subscribe((seats: any[]) => {
       console.log("Booked seats API response:", seats);
      this.bookedSeats = seats.map(s => s.seatNo);
      this.generateSeatMap();
      this.cd.detectChanges(); 
        //console.log("Generated seatMap:", this.seatMap);

    });

  });

  }

  generateSeatMap(){
    this.seatMap=[];
    let seatCount=0;
    for(let row=1;row<=this.totalRows;row++){
      const rowSeats:any[]=[];

      for(let col of this.cols){
        if(seatCount>=this.totalSeats)
          break;

        const seatNo=row + col;

        rowSeats.push({
          seatNo,
          isBooked:this.bookedSeats.includes(seatNo),
          isSelected:false
        });
        seatCount++;

      }
      this.seatMap.push(rowSeats);
    }

  }

selectSeat(seat: any) {

  if (seat.isBooked) return;

  // If user already selected max seats and trying to select another → block
  if (!seat.isSelected && this.selectedSeats.length >= this.maxSeats) {
    this.maxReached = true;
    return;
  }

  // Toggle selection
  seat.isSelected = !seat.isSelected;

  if (seat.isSelected) {
    this.selectedSeats.push(seat.seatNo);
  } else {
    this.selectedSeats = this.selectedSeats.filter(s => s !== seat.seatNo);
  }

  // Reset maxReached properly
  this.maxReached = this.selectedSeats.length >= this.maxSeats;

  this.seatSelectionChanged.emit(this.selectedSeats);
}



}
