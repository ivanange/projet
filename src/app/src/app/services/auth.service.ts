import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/Response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private responseData: LoginResponse;

  constructor(private http: HttpClient, private router: Router) { }


  get connected(): boolean {
    return this.authorizationToken ? true : false;
  }

  // tslint:disable-next-line: typedef
  signIn(email: string, password: string) {
    return this.http
      .post<LoginResponse>('clients/web/admin/login', {
        email,
        password,
      })
      .pipe(
        retry(1),
        tap((response: LoginResponse): void => {
          this.response = response;
        })
      );
  }

  logout(): void {
    this.signOut().subscribe(() => this.router.navigate(['/']));
  }

  // tslint:disable-next-line: typedef
  signOut() {
    return this.http.delete('logout').pipe(
      retry(1),
      tap((res) => {
        this.deleteCredentials();
      })
    );
  }


  deleteCredentials(): void {
    this.response = undefined;
    window.localStorage.removeItem('credentials');
  }

  get authorizationToken(): string {
    // console.log(this.response);
    return this.response ? this.response.access_token : null;
  }

  refresh(): Observable<LoginResponse> {
    return this.response ? this.http
      .post<LoginResponse>('clients/web/admin/refresh', {
        refresh_token: this.response.refresh_token
      })
      .pipe(
        retry(1),
        tap((response: LoginResponse): void => {
          this.response = response;
        })
      ) : throwError(new Error('Not Authenticated'));
  }

  get response(): LoginResponse | null | undefined {
    return (
      this.responseData ||
      (this.responseData = JSON.parse(
        window.localStorage.getItem('credentials')
      ))
    );
  }

  set response(response: LoginResponse) {
    this.responseData = response;
    window.localStorage.setItem('credentials', JSON.stringify(response));
  }
}
