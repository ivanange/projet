import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnregisteredUser, User, UserDetail } from '../../models/User';
import { LoginResponse } from '../../models/Response';
import { Observable, of } from 'rxjs';
import { retry, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: User;

  constructor(private http: HttpClient, private auth: AuthService) { }

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

  user(): Observable<User> {
    return this.http
      .get<UserDetail>('user/detail/');
  }

  update(user: User): Observable<User> {
    return this.http.post<User>(`profile/${user.id}`, { ...user, name: user.name, phone: user.phone });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`profile/${id}`);
  }
}
