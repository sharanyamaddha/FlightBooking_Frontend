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

  onSignup(){
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Role:', this.role);
  }

}
