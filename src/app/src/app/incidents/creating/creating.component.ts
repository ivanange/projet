import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { CaptureError, MediaFile } from '@ionic-native/media-capture/ngx';
import { UnregisteredIncident } from 'src/app/models/Incident';
import { MediaService } from 'src/app/services/media.service';
import { App } from '@capacitor/app';
import { Category } from 'src/app/models/Category';
import { BackendService } from 'src/app/services/backend.service';
import { ToastNotificationService } from 'src/app/services/toast-notification.service';
@Component({
  selector: 'app-creating',
  templateUrl: './creating.component.html',
  styleUrls: ['./creating.component.scss'],
})
export class CreatingComponent implements OnInit {


  public incident = new UnregisteredIncident();
  public now: string = new Date().toISOString();
  public photo: Photo = undefined;
  public images: MediaFile[] = [];
  public videos: MediaFile[] = [];
  public audios: MediaFile[] = [];
  public data = {};
  categories: Category[];

  constructor(
    private route: ActivatedRoute,
    private media: MediaService,
    private backend: BackendService,
    private toaster: ToastNotificationService,
    private router: Router
  ) {
    // App.addListener('appStateChange', ({ isActive }) => {
    //   // console.log('App state changed. Is active?', isActive);
    //   this.data = {
    //     ...this.data,
    //     active: isActive
    //   };
    // });

    // App.addListener('appUrlOpen', data => {
    //   this.data = {
    //     ...this.data,
    //     url: data.url
    //   };
    // });

    // App.addListener('appRestoredResult', data => {
    //   this.data = {
    //     ...this.data,
    //     ...data
    //   };
    //   if (data.pluginId === 'MediaCapture') {
    //     //check for errors
    //     switch (data.methodName) {
    //       case 'captureImage':
    //         this.addSnaps(data.data as MediaFile[]);
    //         break;
    //       case 'captureVideo':
    //         this.addCaptures(data.data as MediaFile[]);
    //         break;
    //       case 'captureAudio':
    //         this.addRecordings(data.data as MediaFile[]);
    //         break;
    //       default:
    //         break;
    //     }
    //   }
    //   // alert('Restored state:' + data);
    // });

    // const checkAppLaunchUrl = async () => {
    //   const { url } = await App.getLaunchUrl();

    //   alert('App opened with URL: ' + url);
    // };

    // document.addEventListener('pendingcaptureresult', this.addSnaps as () => any);
  }

  ngOnInit() {
    this.backend.categories.all().subscribe(categories => this.categories = categories);
    this.route.queryParams.subscribe(params => {
      this.incident.title = params.name;
    });

    this.incident.start_date = this.now;
  }

  create() {
    // create incident
    // attach files
    // toast success

    const [address, city] = this.incident.locations.split(/(\s|,|-)+/);
    this.incident.locations = JSON.stringify({
      address,
      city,
    });
    this.backend.incidents.create(this.incident).subscribe(
      (incident) => {
        this.backend.users.currentUser = undefined;
        this.toaster.add('Saved Incident');
        this.router.navigate(['/show', incident.id]);
      }
    );
  }

  save() { }

  async getPhoto() {
    this.photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri
    });
  }

  snap() {
    this.media.captureImage().then(files => {
      this.data = {
        ...this.data,
        files,
      };
      console.log(files);
      this.addSnaps(files as MediaFile[]);
    },
      (err: CaptureError) => {
        this.data = {
          ...this.data,
          err,
        };
        console.error(err);
      });
  }

  addSnaps(files: MediaFile[]) {
    this.images.concat(files);
  }

  capture() {
    this.media.captureVideo().then(files => {
      this.data = {
        ...this.data,
        files,
      };
      console.log(files);
      this.addCaptures(files as MediaFile[]);
    },
      (err: CaptureError) => {
        this.data = {
          ...this.data,
          err,
        };
        console.error(err);
      });
  }

  addCaptures(files: MediaFile[]) {
    this.videos.concat(files);
  }

  record() {
    this.media.captureAudio().then(files => {
      this.data = {
        ...this.data,
        files,
      };
      console.log(files);
      this.addRecordings(files as MediaFile[]);
    },
      (err: CaptureError) => {
        this.data = {
          ...this.data,
          err,
        };
        console.error(err);
      });
  }

  addRecordings(files: MediaFile[]) {
    this.audios.concat(files);
  }

}
