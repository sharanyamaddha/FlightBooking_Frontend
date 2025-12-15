import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  username:string='';
  email:string='';
  password:string='';
  role:string='user';

    isValidEmail(): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    }

    isFormValid(): boolean {
      return (
        this.username.length >= 3 &&
        this.isValidEmail() &&
        this.password.length >= 6 &&
        this.role !== ''
      );
    }

  onSignup(){
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Role:', this.role);
  }




}
