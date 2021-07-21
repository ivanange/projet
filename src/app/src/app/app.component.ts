import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToolbarService } from './services/toolbar.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, public toolbar: ToolbarService, private route: ActivatedRoute, private router: Router) {
    router.navigate(['/index']);
  }

  public async openMenu() {
    return await this.menu.open();
  }
}
