import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { MenuController } from '@ionic/angular';
import { ToolbarService } from './services/toolbar.service';
import { HistoryService } from './services/history.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public data = {};
  constructor(private menu: MenuController, private router: Router, public history: HistoryService, public toolbar: ToolbarService,) {

    App.addListener('appStateChange', ({ isActive }) => {
      // console.log('App state changed. Is active?', isActive);
      this.data = {
        ...this.data,
        active: isActive
      };
    });

    App.addListener('appUrlOpen', data => {
      console.log(data);
      this.data = {
        ...this.data,
        url: data.url
      };
    });

    App.addListener('appRestoredResult', data => {
      console.log(data);
      this.data = {
        ...this.data,
        ...data
      };
    });



    App.addListener('appUrlOpen', data => {
      console.log(data);
      router.navigate([data.url]);
    });

    App.addListener('backButton', () => {
      history.back();
    });

    router.navigate(['/creating']);
  }

  async openMenu() {
    return await this.menu.open();
  }


}
