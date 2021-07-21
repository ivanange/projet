import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  name = '';
  constructor(private router: Router) { }

  ngOnInit() { }

  next() {
    this.router.navigate(['/creating'], { queryParams: { name: this.name } });
  }

}
