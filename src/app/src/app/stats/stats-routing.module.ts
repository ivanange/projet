import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { ShowBarGuard } from '../guards/show-bar.guard';
import { StatsComponent } from './stats.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard, ShowBarGuard],
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
  declarations: [],
})
export class StatsRoutingModule { }
