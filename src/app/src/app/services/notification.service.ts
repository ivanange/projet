import { Injectable } from '@angular/core';

interface Notification {
  title: string;
  message: string;
  date?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications: Notification[] = [];

  constructor() {}

  add(notification: Notification): void {
    this.notifications.push({
      ...notification,
      date: notification.date ? notification.date : Date(),
    });
  }

  clear(): void {
    this.notifications = [];
  }

  remove(index: number): void {
    this.notifications.splice(index, 1);
  }
}
