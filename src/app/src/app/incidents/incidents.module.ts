import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { IncidentsRoutingModule } from './incidents-routing.module';
import { CreatingComponent } from './creating/creating.component';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';
import { TruncatePipe } from '../pipes/truncate.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentsRoutingModule,
  ],
  declarations: [CreateComponent, CreatingComponent, IndexComponent, ShowComponent, TruncatePipe]
})
export class IncidentsModule {

}
