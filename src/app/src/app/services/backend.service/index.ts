import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { IncidentService } from './incident.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    public auth: AuthService,
    public users: UserService,
    public incidents: IncidentService,
    public categories: CategoryService,
  ) { }
}
