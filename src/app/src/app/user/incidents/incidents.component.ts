import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss'],
})
export class IncidentsComponent implements OnInit {

  public declarations = true;
  constructor() { }

  ngOnInit() { }

  switch(e) {
    // console.log('Segment changed', e);
    this.declarations = (e.detail.value as string) === 'declarations';
  }

}
