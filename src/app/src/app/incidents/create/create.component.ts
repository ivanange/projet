import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from 'src/app/models/Incident';
import { BackendService } from 'src/app/services/backend.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  public query: string;
  incidents: Incident[] = [];
  name: string;
  constructor(private router: Router, private backend: BackendService, private toaster: ToastNotificationService) { }

  ngOnInit() { }

  next() {
    this.router.navigate(['/creating'], { queryParams: { name: this.name } });
  }

  search() {
    const query = {} as any;
    if (this.query) {
      // query.title = this.query;
      query.category = this.query;
    }

    this.backend.incidents.all(query).subscribe(
      (res) => {
        this.incidents = res.results;
        // this.next = res.next;
      },
      (err) => {
        this.toaster.add(err.message);
      },
    );

  }

}
