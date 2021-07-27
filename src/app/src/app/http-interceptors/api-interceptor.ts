import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/backend.service/auth.service';
import { isArray } from 'rxjs/internal/util/isArray';
import { catchError, first, map } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  // public baseUrl = 'http://127.0.0.1:8000/api/';
  public baseUrl = 'http://192.168.43.36:8000/api/';
  private refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private auth: AuthService, private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // send cloned req with header to the next handler.
    const authReq = this.format(req);
    console.log(req);
    return next.handle(authReq).pipe(
      catchError(
        (error) => {
          // We don't want to refresh token for some reqs like login or refresh token itself
          // So we verify url and we throw an error if it's the case
          if (
            authReq.url.includes('refresh') ||
            authReq.url.includes('api-token-auth') || error.status !== 401
          ) {
            // We do another check to see if refresh token failed
            // In this case we want to logout user and to redirect it to login page

            if (authReq.url.includes('refresh')) {
              this.auth.deleteCredentials();
              this.router.navigate(['/signin']);
            }

            return throwError(error);
          }

          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // – which means the new token is ready and we can retry the authReq again
            return this.refreshTokenSubject
              .pipe(
                first(result => result !== null),
                map(() => next.handle(this.format(authReq)))
              );
          } else {
            this.refreshTokenInProgress = true;

            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);

            // Call auth.refreshAccessToken(this is an Observable that will be returned)
            return this.auth
              .refresh()
              .pipe(
                catchError(
                  (err) => {
                    this.refreshTokenInProgress = false;
                    this.auth.deleteCredentials();
                    this.router.navigate(['/signin']);
                    return throwError(err);
                  }
                ),
                map(
                  (token: any) => {
                    // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                    // for the next time the token needs to be refreshed
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(token);
                    return next.handle(this.format(authReq));
                  }
                )
              );
          }
        }
      )
    ) as Observable<HttpEvent<any>>;
  }

  // tslint:disable-next-line: typedef
  public format(req: HttpRequest<any>) {
    // Get the auth token from the service.
    const authToken = this.auth.authorizationToken;

    // Clone the req and replace the original headers with
    // cloned headers, updated with the authorization.
    let body;
    let file;
    if (
      req.body && !(req.body instanceof FormData) &&
      Object.values(req.body).filter(
        (value) => value instanceof File || isArray(value) && (value[0] || undefined) instanceof File
      ).length) {
      body = new FormData();
      console.log(req.body);
      for (const [key, value] of Object.entries(req.body)) {
        // tslint:disable-next-line: no-conditional-assignment
        if (value instanceof File || (isArray(value) && value.length === 1 && (file = value[0]) instanceof File)) {
          body.append(key, file, file.name);
        } else if (isArray(value)) {
          if ((value[0] || undefined) instanceof File) {
            // tslint:disable-next-line: no-shadowed-variable
            value.forEach(formfile => body.append(key + '[]', formfile, formfile.name));
          } else {
            value.forEach(val => body.append(key + '[]', val));
          }
        } else if (value) {
          body.append(key, value as string);
        }
      }

      // body = req.body;
    } else {
      body = req.body;
    }

    return req.clone({
      url: req.url.includes('http') ? req.url : `${this.baseUrl}${req.url}`,
      headers:
        req.url.includes('api-token-auth') ||
          (req.url.includes('profile') && req.method.toLowerCase().includes('post')) ?
          req.headers :
          req.headers.set('Authorization', `Token ${authToken}`),
      body,
    });

  }

}
