import { Component,ViewChild} from '@angular/core';
import { Flight } from '../../services/flight/flight';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-add-flights',
  imports: [CommonModule,FormsModule,Toast],
  templateUrl: './add-flights.html',
  styleUrl: './add-flights.css',
})
export class AddFlights {

  minDateTime!: string;
@ViewChild('toast') toast!: Toast;

  sources: string[]=[];
  destinations: string[]=[];
  showFromList=false;
  showToList=false;

  flight={
    airlineName:"",
    source:"",
    destination: "",
    departureDateTime: "",
    arrivalDateTime: "",
    totalSeats: null,
    tripType: "",
    price: null
  };

  constructor(
    private flightService:Flight
  ){}

  ngOnInit():void{
    const now=new Date();
    now.setMinutes(now.getMinutes()-now.getTimezoneOffset())
    this.minDateTime=now.toISOString().slice(0, 16);
    this.flightService.getSources().subscribe((res:any) => {
  this.sources = res["Sources"] || res["sources"] || [];
});

this.flightService.getDestinations().subscribe((res:any) => {
  this.destinations = res["Destinations"] || res["destinations"] || [];
});
  }

  submit(){
    this.flightService.addFlight(this.flight).subscribe({
      next:(data)=>{
          console.log("Flight added :",data);
        this.toast.showToast("Flight added succesfully");

         setTimeout(() => {
  
  }, 2000);

      },
      error:()=>{
        this.toast.showToast("Error adding flight");
      }
    })

  }

  selectFrom(val:string){
  this.flight.source=val;
  this.showFromList=false;
}

selectTo(val:string){
  this.flight.destination=val;
  this.showToList=false;
}

hideFrom(){
  setTimeout(()=>this.showFromList=false,200);
}
hideTo(){
  setTimeout(()=>this.showToList=false,200);
}
}
