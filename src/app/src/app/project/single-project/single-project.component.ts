import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Incident';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.scss'],
})
export class SingleProjectComponent implements OnInit {
  public project: Project;

  etatFinance = 'LE PROJET A ÉTÉ FINANCÉ !';
  constructor(private route: ActivatedRoute, public auth: AuthService) { }

  ngOnInit(): void {
    this.project = this.route.snapshot.data.project as Project;
  }
}
