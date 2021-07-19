import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
// import { DataTablesModule } from 'angular-datatables';
import {
  Router
} from '@angular/router';
import {
  BackendService
} from '../services/backend.service';
import {
  AuthService
} from '../services/auth.service';
import {
  NotificationService
} from '../services//notification.service';
import {
  Project
} from '../models/Incident';
import {
  ActivatedRoute
} from '@angular/router';
import { Meta } from '../models/Response';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, AfterViewInit {
  public projects: Project[] = [];
  public meta: Meta;

  constructor(
    private router: Router,
    private backend: BackendService,
    public auth: AuthService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) { }


  // tslint:disable-next-line: typedef
  ngOnInit() { }

  ngAfterViewInit(): void {

    this.route.queryParams.subscribe(params => {
      this.getAll({
        ...params,
        search: params.search + ';status:active'
      });
    });

  }


  // tslint:disable-next-line: typedef
  getAll(params) {
    return this.backend.projects.all(params).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(
      (res) => {
        this.projects = res.data.map((project) =>
          Object.assign(new Project(), project)
        );
        this.meta = res.meta;
      },
      (err) => {
        console.log(err);
        // notify of error to notification service
        this.notificationService.add({
          title: 'Oops',
          message: 'Nous n\'avons pas pu recupérer la liste des projets, vérifiez votre connexion internet',
          // date: 'now',
        });
      }
    );
  }

  // tslint:disable-next-line: typedef
  onSelect(project) {
    this.router.navigate(['/projects', project.id]);
  }

  get metas(): number[] {
    return this.meta ? (new Array(this.meta.pagination.total_pages)).fill(0).map((val, i) => i + 1) : [];
  }

  // tslint:disable-next-line: typedef
  search(q: string) {
    return this.getAll({ search: q });
  }
}
