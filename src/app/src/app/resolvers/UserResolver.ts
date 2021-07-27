import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { UserDetail } from '../models/User';
import { BackendService } from '../services/backend.service';
import { ToastNotificationService } from '../services/toast-notification.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<UserDetail> {
  constructor(
    private backend: BackendService,
    private toaster: ToastNotificationService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserDetail> | Promise<UserDetail> | UserDetail {
    return this.backend.users.user().pipe(
      catchError((err, cuaght) => {
        this.toaster.add('Impossible to retrieve your information, check your internet connection');
        return of(err);
      }),
    );
  }
}
