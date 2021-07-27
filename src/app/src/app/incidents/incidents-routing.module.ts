import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { HideBarGuard } from '../guards/hide-bar.guard';
import { ShowBarGuard } from '../guards/show-bar.guard';
import { IncidentResolver } from '../resolvers/IncidentResolver';
import { CreateComponent } from './create/create.component';
import { CreatingComponent } from './creating/creating.component';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    children: [
      {
        canActivate: [HideBarGuard],
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'creating',
        canActivate: [ShowBarGuard],
        component: CreatingComponent,
      },
      {
        path: 'index',
        canActivate: [ShowBarGuard],
        component: IndexComponent,
      },
      {
        path: 'show/:id',
        resolve: {
          incident: IncidentResolver
        },
        canActivate: [HideBarGuard],
        component: ShowComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule { }
