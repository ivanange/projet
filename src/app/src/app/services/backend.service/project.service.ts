import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {
  Project,
  ProjectAllResponse,
  ProjectResponse,
  UnregisteredProject,
} from '../../models/Incident';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  create(project: UnregisteredProject): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>('projects', project);
  }

  all(params?): Observable<ProjectAllResponse> {
    params = { ...params, search: `${params.search ? params.search + '' : 'status:active'}` };
    // delete params.search;
    return this.http
      .get<ProjectAllResponse>(
        `projects`,
        {
          params,
        }
      )
      .pipe(retry(3));
  }

  get(id): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`projects/${id}`);
  }

  update(project: Project): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(`projects/${project.id}`, project);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`projects/${id}`);
  }
}
