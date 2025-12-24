import { Component,ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule,Toast],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   @ViewChild('toast') toast!: Toast;

  username = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  onSignin(form: NgForm) {

    // FORM VALIDATION CHECK
    if (form.invalid) {
      this.toast.showToast('Please follow proper validations');
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
        localStorage.setItem("email", res.email);
        
      this.toast.showAndClose('Login successful', 1200, () => {
        this.router.navigate(['/']);
      });

      },
      error: () => {
        this.toast.showToast('Invalid username or password');
      }
    });
  }
}
