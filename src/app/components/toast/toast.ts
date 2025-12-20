import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  template:
  `<div class="toast-msg" *ngIf="show">
      {{ message }}
    </div>`,
  styleUrl: './toast.css',
})
export class Toast {

   @Input() message = '';
  show = false;

  showToast(msg: string) {
    this.message = msg;
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, 2500);
  }
}
