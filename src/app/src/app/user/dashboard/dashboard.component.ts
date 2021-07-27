import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserDetail } from 'src/app/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  user: UserDetail;

  constructor(private route: ActivatedRoute, private menu: MenuController) {
  }
  ngOnInit() {
    this.menu.close();
    this.user = this.route.snapshot.data.user;
  }

}
