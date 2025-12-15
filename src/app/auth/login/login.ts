import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username:string='';
  password:string='';
  constructor(private auth: Auth,  private router: Router
) {}


  onSignin() {


  if (!this.username || !this.password) {
    alert('Please enter username and password');
    return;
  }

  const payload = {
    username: this.username,
    password: this.password
  };

  this.auth.login(payload).subscribe({
    next: (res: any) => {
      console.log('Login success:', res);

      // Store JWT
      localStorage.setItem('token', res.token);

      alert('Login successful');

      // Optional: navigate to home/dashboard
      this.router.navigate(['/']);
    },
    error: (err) => {
      console.error('Login failed:', err);
      alert('Invalid username or password');
    }
  });
}

}
