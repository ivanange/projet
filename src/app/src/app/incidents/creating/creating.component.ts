import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { UnregisteredIncident } from 'src/app/models/Incident';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-creating',
  templateUrl: './creating.component.html',
  styleUrls: ['./creating.component.scss'],
})
export class CreatingComponent implements OnInit {

  public incident = new UnregisteredIncident();
  public now: string = new Date().toISOString();
  public images: Photo[] = [];

  constructor(private route: ActivatedRoute, private media: MediaService) { }

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

  addPhotoToGallery() {
    this.media.getImage();
  }

  record() {
    // this.media.record();
  }

}
