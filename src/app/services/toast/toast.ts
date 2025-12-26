import { Injectable } from '@angular/core';
import { Toast } from '../../components/toast/toast';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastComp!: Toast;

  register(toast: Toast) {
    this.toastComp = toast;
  }

  show(message: string) {
    this.toastComp?.showToast(message);
  }
}
