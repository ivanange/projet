import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Incident, UnregisteredIncident } from '../../models/Incident';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {
  constructor(private http: HttpClient) { }

  create(incident: UnregisteredIncident): Observable<Incident> {
    return this.http.post<Incident>('incident/', incident);
  }

  all(params?): Observable<Incident[]> {
    return this.http
      .get<Incident[]>(
        `incident/`,
        {
          params,
        }
      )
      .pipe(
        retry(3),
        map(objects => objects.map(object => Object.assign(new Incident(), object)))
      );
  }

  get(id): Observable<Incident> {
    return this.http.get<Incident>(`incident/${id}`);
  }

  update(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(`incident/${incident.id}`, incident);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`incident/${id}`);
  }
}