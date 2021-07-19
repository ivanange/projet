import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Project } from '../models/Incident';
import { BackendService } from '../services/backend.service';
import { NotificationService } from '../services/notification.service';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<Project> {
  constructor(
    private backend: BackendService,
    private notifications: NotificationService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project> | Promise<Project> | Project {
    return this.backend.projects.get(route.paramMap.get('id')).pipe(
      retry(3),
      catchError((err, cuaght) => {
        this.notifications.add({
          title: 'Impossible de trouver ce projet',
          message: 'Verifiez votre connexion internet et réessayer',
        });
        this.router.navigate(['/projects']);
        return of(err);
      }),
      map((res) => Object.assign(new Project(), res.data))
    );
  }
}
