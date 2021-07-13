import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  Category,
  CategoryAllResponse,
  CategoryResponse,
} from '../../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  create(project: Category): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`categories`, project);
  }

  all(params?): Observable<CategoryAllResponse> {
    return this.http
      .get<CategoryAllResponse>(
        'categories',
        params
          ? {
              params,
            }
          : {}
      )
      .pipe(retry(3));
  }

  get(id): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`categories/${id}`);
  }

  update(project: Category): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`categories/${project.id}`, project);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`categories/${id}`);
  }
}
