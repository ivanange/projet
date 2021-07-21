import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CommonModule,],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MediaCapture
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
