import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserDetail } from 'src/app/models/User';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: UserDetail;

  constructor(private route: ActivatedRoute, private menu: MenuController, public media: MediaService) {
  }

  ngOnInit() {
    this.menu.close();
    this.user = this.route.snapshot.data.user;
  }


}
