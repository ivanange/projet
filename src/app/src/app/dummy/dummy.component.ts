import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
})
export class LightWithIconsAtBottomComponent implements OnInit {
  isList: number;
  isMenu = false;
  isSearch = false;
  constructor() { }
  ngOnInit(): void { }
}
