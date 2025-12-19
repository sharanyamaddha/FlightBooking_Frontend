import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  username: string = 'Not logged in';
  role: string = 'N/A';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      this.username = payload.sub;


      if (payload.roles && payload.roles.length > 0) {
        this.role = payload.roles[0].replace('ROLE_', '');
      }else{
        this.role = 'USER';
      }
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
