import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { Flight } from '../../services/flight/flight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  tripType: 'One Way' | 'Round Trip' = 'One Way';
  from = '';
  to = '';
  date!: string;
  returnDate!: string;
  travellers=1;

  constructor(private flightService: Flight,
    private router: Router
  ) {}


  ngOnInit(){
    const today=new Date().toISOString().split('T')[0];
    this.date=today;
  }

  formatDate(dateStr:string): string{
    if(!dateStr) return 'Select date';
    const date=new Date(dateStr);
    return date.toLocaleDateString('en-IN',{
      weekday:'short',
      day:'numeric',
      month:'short',
    })

  }


//   filteredFromAirports:any[]=[];
//   filteredToAirports:any[]=[];

// filterFrom() {
//   if (!this.from || this.from.trim().length < 1) {
//     this.filteredFromAirports = [];
//     return;
//   }

//   this.flightService.getAirportSuggestions(this.from)
//     .subscribe({
//       next: (res) => {
//         this.filteredFromAirports = res;
//       },
//       error: () => {
//         this.filteredFromAirports = [];
//       }
//     });
// }


//     filterTo() {
//   if (!this.to || this.to.trim().length < 1) {
//     this.filteredToAirports = [];
//     return;
//   }

//   this.flightService.getAirportSuggestions(this.to)
//     .subscribe({
//       next: (res) => {
//         this.filteredToAirports = res;
//       },
//       error: () => {
//         this.filteredToAirports = [];
//       }
//     });
// }

  // selectFrom(a:any){
  //   this.from=`${a.city} (${a.code})`;
  //   this.filteredFromAirports=[];
  // }

  // selectTo(a:any){
  //   if (this.from.includes(a.code)) return;
  //   this.to=`${a.city} (${a.code})`;
  //   this.filteredToAirports=[];
  // }

  searchFlights() {
  if (!this.from || !this.to) {
    alert('Please enter source and destination');
    return;
  }

  if(!this.date){
    alert("please select a departure date");
    return;
  }

  const payload = {
    source: this.extractCode(this.from),
    destination: this.extractCode(this.to),
    date: this.date,
    travellers: this.travellers
  };

  this.flightService.searchFlights(payload).subscribe({
    next: (res:any) => {
      console.log('Flights from backend:', res);

      //  SAVE RESULTS
      this.flightService.setResults(res);

      //  NAVIGATE
      this.router.navigate(['/flight-search']);
    },
    error: () => {
      alert('No flights found');
    }
  });
}

airportMap: Record<string, string> = {
  bengaluru: 'BLR',
  bangalore: 'BLR',
  mumbai: 'MUM',
  delhi: 'DEL',
  chennai: 'MAA',
  hyderabad: 'HYD',
  bombay:'BOM'
};


extractCode(value: string): string {
  // Case 1: "Bengaluru (BLR)"
  const match = value.match(/\(([^)]+)\)/);
  if (match) {
    return match[1];
  }

  // Case 2: "Bangalore" or "Mumbai"
  const key = value.trim().toLowerCase();
  return this.airportMap[key] || value;
}




showTravellerDropdown = false;

increaseTravellers() {
  if (this.travellers < 9) {
    this.travellers++;
  }
}

decreaseTravellers() {
  if (this.travellers > 1) {
    this.travellers--;
  }
}

toggleTravellerDropdown() {
  this.showTravellerDropdown = !this.showTravellerDropdown;
}


}
