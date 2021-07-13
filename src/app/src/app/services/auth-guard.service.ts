import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.connected) {
      return true;
    } else {
      this.router.navigate(['../', 'connexion']);
      return false;
    }
  }
}
