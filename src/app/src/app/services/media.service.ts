import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { VideoCapturePlusOptions, VideoCapturePlus } from '@ionic-native/video-capture-plus/ngx';

export interface Photo {
  filepath: string;
  webviewPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  public photos: Photo[] = [];
  public videoCaptureOptions: VideoCapturePlusOptions = {
    limit: 1,
    highquality: true,
  };

  constructor(private videoRecorder: VideoCapturePlus) { }

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

  public async capture(limit = 1) {
    return await this.videoRecorder.captureVideo({
      ...this.videoCaptureOptions,
      limit,
    });
  }
}
