import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Incident } from 'src/app/models/Incident';
import { BackendService } from 'src/app/services/backend.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, AfterViewInit {

  @ViewChild('input') input: ElementRef;
  public query: string;
  incidents: Incident[] = [];
  next: number;

  constructor(private backend: BackendService, private toaster: ToastNotificationService) {
    this.search();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          console.log(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }
  trigger() {
    this.next = null;
    this.search();
  }

  search() {
    const query = {} as any;
    if (this.query) {
      query.title = this.query;
      query.category = this.query;
    }

    if (this.next) {
      query.next = this.next ? this.next++ : undefined;
    }

    this.backend.incidents.all(query).subscribe(
      (res) => {
        this.incidents = res.results;
        this.next = res.next;
      },
      (err) => {
        this.toaster.add(err.message);
      },
    );
  }
}
