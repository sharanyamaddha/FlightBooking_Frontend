import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  role='';
  constructor(
    private router:Router,
    public auth:Auth
  ){}

  ngOnInit(){
    this.role=this.auth.getRole();
    
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
   

  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
