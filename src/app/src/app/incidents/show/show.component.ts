import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incident } from 'src/app/models/Incident';
import { HistoryService } from 'src/app/services/history.service';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {

  public slideOptions = {
    autoHeight: true,
  };

  public incident: Incident;

  constructor(private route: ActivatedRoute, public history: HistoryService) {
    this.incident = this.route.snapshot.data.incident;
  }

  ngOnInit() { }

}
