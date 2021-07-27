import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Incident } from '../models/Incident';
import { BackendService } from '../services/backend.service';
import { ToastNotificationService } from '../services/toast-notification.service';
import { map, retry, catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IncidentResolver implements Resolve<Incident> {
  constructor(
    private backend: BackendService,
    private toaster: ToastNotificationService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Incident> | Promise<Incident> | Incident {
    return this.backend.incidents.get(route.paramMap.get('id')).pipe(
      retry(3),
      catchError((err, cuaght) => {
        this.toaster.add('Impossible de l\'incidents, Verifiez votre connexion internet et réessayer');
        this.router.navigate(['/index']);
        return of(err);
      }),
      map((res) => Object.assign(new Incident(), res)),
    );
  }
}
