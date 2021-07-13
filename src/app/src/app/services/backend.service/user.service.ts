import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnregisteredUser, User, UserAllResponse, UserResponse } from '../../models/User';
import { LoginResponse } from '../../models/Response';
import { Observable, of } from 'rxjs';
import { map, retry, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: User;

  constructor(private http: HttpClient, private auth: AuthService) { }

  create(user: UnregisteredUser): Observable<LoginResponse> {

    return this.http.post<LoginResponse>('register', user).pipe(
      retry(1),
      tap((response: LoginResponse): void => {
        this.auth.response = response;
      })
    );
  }

  all(params?): Observable<UserAllResponse> {
    return this.http
      .get<UserAllResponse>(
        `users`,
        {
          params,
        }
      )
      .pipe(retry(3));
  }
  user(): Observable<User> {
    // cache user
    return this.currentUser
      ? of(this.currentUser)
      : this.http
        .get<UserResponse>('user/profile')
        .pipe(map((res) => res.data));
  }

  update(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(`users/${user.id}`, user);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`users/${id}`);
  }
}
