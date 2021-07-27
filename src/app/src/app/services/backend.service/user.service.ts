import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnregisteredUser, User, UserDetail } from '../../models/User';
import { LoginResponse } from '../../models/Response';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastNotificationService } from '../toast-notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: UserDetail;

  constructor(private http: HttpClient, private auth: AuthService, private toaster: ToastNotificationService) { }

  create(user: UnregisteredUser): Observable<LoginResponse> {

    return this.http.post<User>('profile/', { ...user, name: user.name, phone: user.phone }).pipe(
      retry(1),
      take(1),
      switchMap((response: User) => this.auth.signIn(user.phone, user.password))
    );
  }

  all(params?): Observable<User[]> {
    return this.http
      .get<User[]>(
        `profile/`,
        {
          params,
        }
      )
      .pipe(retry(3));
  }

  user(): Observable<UserDetail> {
    return this.currentUser ? of(this.currentUser) : this.http
      .get<UserDetail>('user/detail/').pipe(
        retry(3),
        map((user) => Object.assign(new UserDetail(), user)),
        tap(user => this.currentUser = user)
      );
  }

  update(user: User): Observable<User> {
    console.log(user);
    return this.http.put<User>(`profile/${user.id}/`,
      { ...user, name: user.name, phone: user.phone, avatar: user.avatar ? user.avatar : undefined });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`profile/${id}/`);
  }
}
