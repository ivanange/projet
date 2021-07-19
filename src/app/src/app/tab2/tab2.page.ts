import { Component } from '@angular/core';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  constructor(public photoService: MediaService) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
