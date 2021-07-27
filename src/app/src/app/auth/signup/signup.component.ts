import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnregisteredUser } from 'src/app/models/User';
import { BackendService } from 'src/app/services/backend.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  user = new UnregisteredUser();
  password_confirm: string;
  agree: boolean;
  errors = {
    confirmation: false,
    agreement: false,
  };


  constructor(private backend: BackendService, private router: Router, private toaster: ToastNotificationService) { }

  ngOnInit() { }

  validate(): boolean {

    this.errors.confirmation = this.user.password === this.password_confirm;

    this.errors.agreement = this.agree;

    return Object.values(this.errors).reduce((acc, error) => acc && error, true);
  }

  signup(e: Event) {
    e.preventDefault();

    if (this.validate()) {
      this.backend.users.create(this.user).subscribe(
        () => this.router.navigate(['index']),
        (err) => {
          this.toaster.add(err.message);
        },
      );
    }
  }
}
