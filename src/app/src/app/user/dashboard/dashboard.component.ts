import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetail } from 'src/app/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  user: UserDetail;

  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.user = this.route.snapshot.data.user;
  }

}
