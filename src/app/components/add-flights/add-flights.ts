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

@ViewChild('toast', { static: true }) toast!: Toast;

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

  submit(){
    this.flightService.addFlight(this.flight).subscribe({
      next:(data)=>{
          console.log("Flight added :",data);
        alert("Flight added succesfully");

         setTimeout(() => {
    // do navigation or reload later
  }, 2000);

      },
      error:()=>{
        alert("Error adding flight");
      }
    })

  }
}
