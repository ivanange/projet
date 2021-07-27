import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Category } from 'src/app/models/Category';
import { Settings, User, UserDetail } from 'src/app/models/User';
import { BackendService } from 'src/app/services/backend.service';
import { MediaService } from 'src/app/services/media.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  user: UserDetail;
  config: Settings;
  categories: Category[] = [];

  constructor(
    private http: HttpClient,
    private toaster: ToastNotificationService,
    private route: ActivatedRoute,
    private menu: MenuController,
    private backend: BackendService,
    public media: MediaService) {

  }

  ngOnInit() {
    this.menu.close();
    this.user = this.route.snapshot.data.user;
    this.backend.categories.all().subscribe(categories => this.categories = categories);
    this.config = this.user.config;
  }

  saveData($event: Event) {
    $event.preventDefault();
    this.backend.users.update(this.user).subscribe(
      () => this.toaster.add('Informations saved'),
      (err) => this.toaster.add('Something went wrong'),
    );
  }

  saveConfig($event: Event) {
    $event.preventDefault();

    this.user.config = this.config;
    this.backend.users.update(this.user).subscribe(
      () => this.toaster.add('Settings saved'),
      (err) => this.toaster.add('Something went wrong'),
    );
  }

  saveFile() {
    // $event.preventDefault();
    this.media.getImage().then(async (file) => {
      this.user.avatar = file.dataUrl;
      const res = await fetch(file.dataUrl);
      const image = await res.blob();
      const form = new FormData();
      form.append('avatar', image);
      // this.http.put().subscribe(
      //   () => {
      //     this.user.avatar = file.dataUrl;
      //     this.toaster.add('Photo updated');
      //   },
      //   (err) => this.toaster.add('Something went wrong'),
      // );

    });

  }


}
