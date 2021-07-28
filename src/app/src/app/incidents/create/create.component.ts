import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Incident } from 'src/app/models/Incident';
import { BackendService } from 'src/app/services/backend.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, AfterViewInit {

  @ViewChild('input') input: ElementRef;
  public query: string;
  incidents: Incident[] = [];
  name: string;
  constructor(private router: Router, private backend: BackendService, private toaster: ToastNotificationService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap((e: Event) => {
          this.query = this.input.nativeElement.value;
          this.search();
          console.log(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }

  next() {
    this.router.navigate(['/creating'], { queryParams: { name: this.name } });
  }

  search() {
    const query = {} as any;
    console.log(query);

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
