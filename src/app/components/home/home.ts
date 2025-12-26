import { CommonModule} from '@angular/common';
import { Component ,ViewChild } from '@angular/core';
import { Toast } from '../toast/toast';
import { FormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { Flight } from '../../services/flight/flight';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [RouterModule,FormsModule,CommonModule,Toast],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  @ViewChild('toast') toast!: Toast;
  today!: string;

  sources: string[]=[];
  destinations: string[]=[];
  showFromList=false;
  showToList=false;

  tripType: 'One Way' | 'Round Trip' = 'One Way';
  from = '';
  to = '';
  date!: string;
  returnDate!: string;
  travellers=1;

  constructor(private flightService: Flight,
    private router: Router,
      private cdr: ChangeDetectorRef

  ) {}

 currentIndex = 0;


  ngOnInit(): void {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % 3;
      this.cdr.detectChanges();
    }, 3000); 

   this.flightService.getSources().subscribe((res:any) => {
  this.sources = res["Sources"] || res["sources"] || [];
});

this.flightService.getDestinations().subscribe((res:any) => {
  this.destinations = res["Destinations"] || res["destinations"] || [];
});

  }

  convertToDisplay(date: string): string {
  const [y, m, d] = date.split('-');
  return `${d}-${m}-${y}`;
}


  searchFlights() {
  if (!this.from && !this.to) {
    this.toast.showToast('Please enter source and destination');
    return;
  }

   if ( !this.from) {
    this.toast.showToast('Please enter  destination');
    return;
  }

     if ( !this.to) {
    this.toast.showToast('Please enter  destination');
    return;
  }

  if(this.from==this.to){
    this.toast.showToast("please enter different source and destination");
    return;
  }

  if(!this.date){
    this.toast.showToast("please select a departure date");
    return;
  }

  const payload = {
source: this.from.trim(),
destination: this.to.trim(),
    date: this.date,
    travellers: this.travellers
  };

  this.flightService.searchFlights(payload).subscribe({
    next: (res:any) => {
      console.log('Flights from backend:', res);
      this.flightService.setResults(res);
      this.router.navigate(['/flight-search']);
    },
    error: () => {
      this.toast.showToast('No flights found');
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
  const match = value.match(/\(([^)]+)\)/);
  if (match) {
    return match[1];
  }
  // Case 2: "Bangalore" or "Mumbai"
  const key = value.trim().toLowerCase();
  return this.airportMap[key] || value;
}

selectFrom(val:string){
  this.from=val;
  this.showFromList=false;
}

selectTo(val:string){
  this.to=val;
  this.showToList=false;
}

hideFrom(){
  setTimeout(()=>this.showFromList=false,200);
}
hideTo(){
  setTimeout(()=>this.showToList=false,200);
}

}
