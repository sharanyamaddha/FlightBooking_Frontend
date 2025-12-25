import { Component,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Toast } from '../toast/toast';
@Component({
  selector: 'app-signup',
  imports: [FormsModule,CommonModule,Toast],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
     @ViewChild('toast') toast!: Toast;

    constructor(private auth: Auth,
    private router: Router
    ) {}

  username:string='';
  email:string='';
  password:string='';
  role:string='';

  showFormError = false;


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

  onSignup(form:NgForm) {
  if (form.invalid) {
    this.showFormError = true;
     form.control.markAllAsTouched();
      this.toast.showToast('Please follow proper validations before submitting the form');
    return; 
  }
   this.showFormError = false;


  const payload = {
    username: this.username,
    email: this.email,
    password: this.password,
    role: this.role
  };

  this.auth.register(payload).subscribe({
    next: (res) => {
      console.log('Registration success:', res);
      this.toast.showToast('User registered successfully');

      this.router.navigate(['/']);
    },
    error: (err) => {
      console.error('Registration failed:', err);
      this.toast.showToast('Registration failed');
    }
  });
}

}
