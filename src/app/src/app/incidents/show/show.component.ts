import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incident } from 'src/app/models/Incident';
import { HistoryService } from 'src/app/services/history.service';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit, AfterViewInit {

  public slideOptions = {
    autoHeight: true,
    on: {
      slideChange: () => this.pauseClips()
    }
  };

  videoRefs: HTMLVideoElement[] = [];

  public incident: Incident;

  constructor(private route: ActivatedRoute, public history: HistoryService) {
    this.incident = this.route.snapshot.data.incident;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.videoRefs = Array.from(document.querySelectorAll('video')) as HTMLVideoElement[];
    this.videoRefs.forEach(video => {
      video.addEventListener('click', (e) => video.paused ? video.play() : video.pause());
    });
  }

  pauseClips() {
    // console.log('yeah !');
    this.videoRefs.forEach(video => video.pause());
  }

}
