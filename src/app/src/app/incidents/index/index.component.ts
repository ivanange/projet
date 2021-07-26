import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/models/Incident';
import { BackendService } from 'src/app/services/backend.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  public name = '';
  incidents: Incident[] = [];

  constructor(private backend: BackendService, private toaster: ToastNotificationService) {
    backend.incidents.all().subscribe(
      (incidents) => this.incidents = incidents,
      (err) => {
        this.toaster.add(err.message);
      },
    );
  }

  ngOnInit() { }

  search() { }
}
