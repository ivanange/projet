import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { HideBarGuard } from '../guards/hide-bar.guard';
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
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'creating',
        canActivate: [HideBarGuard],
        component: CreatingComponent,
      },
      {
        path: 'index',
        component: IndexComponent,
      },
      {
        path: 'show',
        canActivate: [HideBarGuard],
        component: ShowComponent,
      },
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule { }
