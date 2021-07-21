import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { MediaFile } from '@ionic-native/media-capture/ngx';
import { UnregisteredIncident } from 'src/app/models/Incident';
import { MediaService } from 'src/app/services/media.service';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-creating',
  templateUrl: './creating.component.html',
  styleUrls: ['./creating.component.scss'],
})
export class CreatingComponent implements OnInit {

  public incident = new UnregisteredIncident();
  public now: string = new Date().toISOString();
  public photos: Photo[] = [];
  public images: MediaFile[] = [];
  public videos: MediaFile[] = [];
  public audios: MediaFile[] = [];

  constructor(private route: ActivatedRoute, private media: MediaService) {
    App.addListener('appStateChange', ({ isActive }) => {
      console.log('App state changed. Is active?', isActive);
    });

    App.addListener('appUrlOpen', data => {
      console.log('App opened with URL:', data);
    });

    App.addListener('appRestoredResult', data => {
      console.log('Restored state:', data);
    });

    const checkAppLaunchUrl = async () => {
      const { url } = await App.getLaunchUrl();

      alert('App opened with URL: ' + url);
    };
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.incident.title = params.name;
    });

    this.incident.date = this.now;
  }

  create() {
    // create incident
    // attach files
    // toast success
  }

  next() { }

  snap() {
    this.media.captureImage();
  }

  addSnaps(files: MediaFile[]) {
    this.images.concat(files);
  }

  capture() {
    this.media.captureVideo();
  }

  addCaptures(files: MediaFile[]) {
    this.videos.concat(files);
  }

  record() {
    this.media.captureAudio();
  }

  addRecordings(files: MediaFile[]) {
    this.audios.concat(files);
  }

}
