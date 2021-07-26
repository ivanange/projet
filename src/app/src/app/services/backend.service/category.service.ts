import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { Category } from '../../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: Category[];
  constructor(private http: HttpClient) {
  }

  all(params?): Observable<Category[]> {
    return this.categories ? from([this.categories]) : this.http
      .get<Category[]>(
        'category/',
        params
          ? {
            params,
          }
          : {}
      )
      .pipe(retry(3));
  }

  get(id): Observable<Category> {
    return this.http.get<Category>(`category/${id}`);
  }

}
