import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private menu: MenuController, private router: Router, public history: HistoryService, public toolbar: ToolbarService,) {

    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active?', isActive);
    });

    App.addListener('appUrlOpen', data => {
      router.navigate([data.url]);
    });

    App.addListener('appRestoredResult', data => {
      console.log('Restored state:', data);
    });

    const checkAppLaunchUrl = async () => {
      const { url } = await App.getLaunchUrl();

      alert('App opened with URL: ' + url);
    };

    App.addListener('backButton', () => {
      history.back();
    });

    router.navigate(['/creating']);
  }

  async openMenu() {
    return await this.menu.open();
  }


}
