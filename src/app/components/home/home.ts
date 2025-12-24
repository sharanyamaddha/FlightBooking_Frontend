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
    }, 3000); // ⏱ 3 seconds per slide
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
