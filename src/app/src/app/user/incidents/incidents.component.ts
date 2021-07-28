import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserDetail } from 'src/app/models/User';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss'],
})
export class IncidentsComponent implements OnInit, AfterViewInit {

  public declarations = true;
  user: UserDetail;

  constructor(private route: ActivatedRoute, private menu: MenuController) {
  }
  ngOnInit() {
    this.menu.close();
    this.user = this.route.snapshot.data.user;
  }

  ngAfterViewInit() {
    this.menu.close();
  }

  switch(e) {
    // console.log('Segment changed', e);
    this.declarations = (e.detail.value as string) === 'declarations';
  }

}
