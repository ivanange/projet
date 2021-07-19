import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [ProfileComponent, NotificationsComponent, IncidentsComponent, DashboardComponent],
  imports: [UserRoutingModule, CommonModule],
  exports: [RouterModule]
})
export class UserModule { }
