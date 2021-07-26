import { Component, OnInit } from '@angular/core';
import { ToastNotificationService } from '../services/toast-notification.service';

@Component({
  selector: 'app-service-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor(public notificationService: ToastNotificationService) { }

  ngOnInit(): void { }
}
