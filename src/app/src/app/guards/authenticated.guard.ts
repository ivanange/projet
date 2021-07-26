import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { ToolbarService } from '../services/toolbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private toolbar: ToolbarService, private backend: BackendService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.toolbar.open(); // display appbar
    this.toolbar.add(); // display tabs

    // return true
    if (this.backend.auth.connected) {
      this.backend.categories.all().subscribe(categories => this.backend.categories.categories = categories);
      return true;
    }
    else {
      return this.router.parseUrl('/signin');
    }
  }

}
