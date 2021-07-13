import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../models/User';
import { BackendService } from '../services/backend.service';
import { NotificationService } from '../services/notification.service';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(
    private backend: BackendService,
    private notifications: NotificationService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Promise<User> | User {
    return this.backend.users.user().pipe(
      catchError((err, cuaght) => {
        this.notifications.add({
          title: 'Impossible recupérer vos infos',
          message: 'Verifiez votre connexion internet et réessayer',
        });
        return of(err);
      }),
      map((user) => {
        return Object.assign(new User(), user);
      })
    );
  }
}
