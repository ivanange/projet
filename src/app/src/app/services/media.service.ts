import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';

export interface Photo {
  filepath: string;
  webviewPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  public photos: Photo[] = [];
  public videoCaptureOptions = {
    limit: 1,
    highquality: true,
  };

  public imageCaptureOptions = {
    limit: 1,
    highquality: true,
  };

  public audioCaptureOptions = {
    limit: 1,
    highquality: true,
  };

  constructor(private media: MediaCapture) { }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photos.unshift({
      filepath: 'soon...',
      webviewPath: capturedPhoto.webPath
    });
  }

  public async getImage() {
    // Take a photo
    return await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      direction: CameraDirection.Rear,
      quality: 100
    });
  }

  public async captureImage(limit = 1) {
    const files = await this.media.captureImage({
      ...this.imageCaptureOptions,
      limit,
    });
    return files;
  }

  public async captureVideo(limit = 1) {
    const files = await this.media.captureVideo({
      ...this.videoCaptureOptions,
      limit,
    });
    return files;
  }

  public async captureAudio(limit = 1) {
    const files = await this.media.captureAudio({
      ...this.audioCaptureOptions,
      limit,
    });
    return files;
  }


}
