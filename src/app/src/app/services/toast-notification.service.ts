import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';


@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  static timeout = 2050;
  notifications: string[] = [];

  constructor() { }

  add(message: string): void {
    this.notifications.push(message);
    if (this.notifications.length === 0) {
      Toast.show({
        text: this.notifications.pop(),
        duration: 'short'
      });

    } else {
      setTimeout(() => {
        Toast.show({
          text: this.notifications.pop(),
          duration: 'short'
        });
      }, this.notifications.length * ToastNotificationService.timeout);
    }
  }

  clear(): void {
    this.notifications = [];
  }

  remove(index: number): void {
    this.notifications.splice(index, 1);
  }
}
