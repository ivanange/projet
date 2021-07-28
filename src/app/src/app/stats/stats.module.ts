import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { StatsRoutingModule } from './stats-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [StatsComponent],
  imports: [
    CommonModule, StatsRoutingModule, IonicModule
  ]
})
export class StatsModule { }
