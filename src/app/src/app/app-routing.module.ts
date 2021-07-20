import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { IncidentsModule } from './incidents/incidents.module';
import { StatsModule } from './stats/stats.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    AuthModule,
    IncidentsModule,
    StatsModule,
    UserModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
