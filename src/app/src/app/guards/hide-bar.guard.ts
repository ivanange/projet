import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToolbarService } from '../services/toolbar.service';

@Injectable({
  providedIn: 'root'
})
export class HideBarGuard implements CanActivate {
  constructor(private toolbar: ToolbarService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.toolbar.hide();
    return true;
  }

}
