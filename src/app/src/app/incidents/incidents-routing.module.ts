import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { CreatingComponent } from './creating/creating.component';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'creating',
    component: CreatingComponent,
  },
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'show',
    component: ShowComponent,
  },
  // {
  //   path: 'reset',
  //   component: PasswordResetComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule { }
