import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/User';
import { BackendService } from 'src/app/services/backend.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  credentials = new Credentials();

  constructor(private backend: BackendService, private router: Router, private toaster: ToastNotificationService) { }

  ngOnInit() { }

  signin(e: Event) {
    e.preventDefault();

    this.backend.auth.signIn(this.credentials.phone, this.credentials.password).subscribe(
      () => this.router.navigate(['index']),
      (err) => {
        this.toaster.add(err.message);
      },
    );
  }

}
