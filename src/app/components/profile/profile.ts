import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { Flight } from '../../services/flight/flight';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
    imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  username: string = 'Not logged in';
  role: string = 'N/A';
  email:string='';

  bookings:any=[];

  constructor(
    private auth: Auth,
    private router: Router,
    private flightService:Flight,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      this.username = payload.sub;
      //this.email=payload.email;
      console.log("username",this.username);
      //console.log("mail",this.email);

      if (payload.roles && payload.roles.length > 0) {
        this.role = payload.roles[0].replace('ROLE_', '');
      }else{
        this.role = 'USER';
      }
    }

  }

  


  logout() {
    localStorage.removeItem('token');
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
