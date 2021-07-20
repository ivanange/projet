import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  public show = true;
  public showTabs = true;

  constructor() { }

  hide() {
    this.show = false;
  }

  remove() {
    this.showTabs = false;
  }

  open() {
    this.show = true;
  }

  add() {
    this.showTabs = true;
  }
}
