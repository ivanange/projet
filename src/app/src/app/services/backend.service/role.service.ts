import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnregisteredRole, Role, RoleAllResponse, RoleResponse, Assign } from '../../models/Role';
import { Observable, of } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private currentRole: Role;

  constructor(private http: HttpClient) { }

  create(role: UnregisteredRole): Observable<RoleResponse> {

    return this.http.post<RoleResponse>('roles', role);
  }

  all(params?): Observable<RoleAllResponse> {
    return this.http
      .get<RoleAllResponse>(
        `roles`,
        {
          params,
        }
      )
      .pipe(retry(3));
  }

  assign(data: Assign) {
    return this.http.post('roles/assign', data).pipe(retry(3));
  }

  role(id: string): Observable<Role> {
    // cache role
    return this.currentRole
      ? of(this.currentRole)
      : this.http
        .get<RoleResponse>(`roles/${id}`)
        .pipe(map((res) => res.data));
  }

  update(role: Role): Observable<RoleResponse> {
    return this.http.post<RoleResponse>(`roles/${role.id}`, role);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`roles/${id}`);
  }
}

