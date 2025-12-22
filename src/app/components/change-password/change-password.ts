import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule,FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {

  

  // NEW
  showEdit: boolean = false;

  password = {
    old: '',
    new: '',
    confirm: ''
  };

constructor(
    private auth: Auth,
    private router: Router,
    //private cdr: ChangeDetectorRef
  ) {}

  changePassword() {
  if (this.password.new !== this.password.confirm) {
    alert('Passwords do not match');
    return;
  }

  const req = {
    oldPassword: this.password.old,
    newPassword: this.password.new
  };

  this.auth.changePassword(req).subscribe({
    next: (res: any) => {
      alert(res.message);
      this.password = { old: '', new: '', confirm: '' };
      this.showEdit = false;
    },
    error: (err) => {
      alert(err.error?.message || 'Failed to change password');
    }
  });
}
}
