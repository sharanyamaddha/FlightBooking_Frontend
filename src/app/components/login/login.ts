import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  onSignin(form: NgForm) {

    // FORM VALIDATION CHECK
    if (form.invalid) {
      alert('Please follow proper validations');
      return;
    }

    const payload = {
      username: this.username,
      password: this.password
    };

    this.auth.login(payload).subscribe({
      next: (res: any) => {
        console.log('Login success', res);

        localStorage.setItem('token', res.token);
        alert('Login successful');

        this.router.navigate(['/']);
      },
      error: () => {
        alert('Invalid username or password');
      }
    });
  }
}
