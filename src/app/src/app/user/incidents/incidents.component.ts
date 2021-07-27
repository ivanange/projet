import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss'],
})
export class IncidentsComponent implements OnInit {

  public declarations = true;

  constructor(private menu: MenuController) {
  }

  ngOnInit() {
    this.menu.close();

  }

  switch(e) {
    // console.log('Segment changed', e);
    this.declarations = (e.detail.value as string) === 'declarations';
  }

}
