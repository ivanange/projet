import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from './user.service';
import { ProjectService } from './project.service';
import { CategoryService } from './category.service';
import { PaymentService } from './payment.service';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    public auth: AuthService,
    public users: UserService,
    public projects: ProjectService,
    public categories: CategoryService,
    public payments: PaymentService,
    public roles: RoleService
  ) { }
}
