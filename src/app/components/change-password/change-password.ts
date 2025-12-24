import { Component,ViewChild } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule,FormsModule,Toast],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
   @ViewChild('toast') toast!: Toast;

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
      this.toast.showToast(res.message);
      this.password = { old: '', new: '', confirm: '' };
      this.showEdit = false;
    },
    error: (err) => {
      this.toast.showToast(err.error?.message || 'Failed to change password');
    }
  });
}
}
