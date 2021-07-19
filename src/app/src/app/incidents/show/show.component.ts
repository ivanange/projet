import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {

  public slideOptions = {
    autoHeight: true,
  };

  public images = [
    'https://www.journalducameroun.com/en/wp-content/uploads/2021/07/Tenor-erica-780x440.jpg',
    'https://www.journalducameroun.com/en/wp-content/uploads/2021/07/Tenor-erica-780x440.jpg'
  ];

  constructor(private locator: Location) { }

  ngOnInit() { }

  back() {
    this.locator.back();
  }

}
