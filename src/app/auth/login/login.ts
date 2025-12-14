import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username:string='';
  password:string='';

  onSignin(){
    console.log('Username:', this.username);
    console.log('Password:', this.password);

  }
}
