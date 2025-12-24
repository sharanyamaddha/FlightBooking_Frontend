import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class Toast {

  message = '';
  show = false;
  isConfirm = false;
private onConfirm?: () => void;


  private afterClose: (() => void) | null = null;

showToast(msg: string, cb?: () => void) {
    this.isConfirm = false;       
  this.message = msg;
  this.afterClose = cb || null;
  this.show = true;
}

showConfirm(msg: string, action: () => void) {
  this.isConfirm = true;
  this.message = msg;
  this.onConfirm = action;
  this.show = true;
}

showAuto(msg: string, delay: number, callback?: () => void) {
  this.isConfirm = false;
  this.message = msg;
  this.show = true;

  setTimeout(() => {
    this.close();
    if (callback) callback();
  }, delay);
}

showAndClose(msg: string, delay: number, after?: () => void) {
  this.isConfirm = false; 
  this.message = msg;
  this.show = true;

  setTimeout(() => {
    this.show = false;
    if (after) after();
  }, delay);
}



confirm() {
  if (this.onConfirm) this.onConfirm();
  this.close();
}

close() {
  this.show = false;
  if (this.afterClose) {
    this.afterClose();
    this.afterClose = null;
  }
}

}
