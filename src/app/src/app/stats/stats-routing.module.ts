import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { StatsComponent } from './stats.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: 'stats',
        component: StatsComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StatsRoutingModule { }
