import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  tripType: 'One Way' | 'Round Trip' = 'One Way';
  from = '';
  to = '';
  departureDate!: string;
  returnDate!: string;
  travellers=1;

  ngOnInit(){
    const today=new Date().toISOString().split('T')[0];
    this.departureDate=today;
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

  airports = [
  { code: 'BLR', city: 'Bengaluru', airport: 'Kempegowda International Airport' },
  { code: 'BOM', city: 'Mumbai', airport: 'Chhatrapati Shivaji Airport' },
  { code: 'DEL', city: 'New Delhi', airport: 'Indira Gandhi Airport' },
  { code: 'HYD', city: 'Hyderabad', airport: 'Rajiv Gandhi International Airport' },
  { code: 'MAA', city: 'Chennai', airport: 'Chennai International Airport' }
];

  filteredFromAirports:any[]=[];
  filteredToAirports:any[]=[];

  filterFrom(){
    const value = this.from.trim().toLowerCase();
    if (!value) {
      this.filteredFromAirports = [];
      return;
    }
    this.filteredFromAirports=this.airports.filter(a=>
      a.city.toLowerCase().includes(this.from.toLowerCase()) ||
      a.code.toLowerCase().includes(this.from.toLowerCase())  
    );
  }

    filterTo(){
      const value = this.to.trim().toLowerCase();
      if (!value) {
        this.filteredToAirports = [];
        return;
      }
    this.filteredToAirports=this.airports.filter(a=>
      a.city.toLowerCase().includes(this.to.toLowerCase()) ||
      a.code.toLowerCase().includes(this.to.toLowerCase())  
    );
  }

  selectFrom(a:any){
    this.from=`${a.city} (${a.code})`;
    this.filteredFromAirports=[];
  }

  selectTo(a:any){
    if (this.from.includes(a.code)) return;
    this.to=`${a.city} (${a.code})`;
    this.filteredToAirports=[];
  }

  searchFlights() {
  console.log({
    tripType: this.tripType,
    from: this.from,
    to: this.to,
    departureDate: this.departureDate,
    returnDate: this.returnDate
  });
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
