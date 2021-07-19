import { Component, OnInit, ViewChild } from '@angular/core';
import Stepper from 'bs-stepper';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { UnregisteredProject } from '../../models/Incident';
import { Category } from '../../models/Category';
import { Project } from 'src/app/models/Incident';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  @ViewChild('f') projectForm: NgForm;
  public projet: UnregisteredProject =
    {
      name: '',
      duration: 0,
      interest_rate: 0,
      min_amount: 0,
      max_amount: 0,
      description: '',
      category_id: '',
      funding_deadline: '',
      reimbursement_deadline: '',
      documents: undefined,
    };
  categories;

  constructor(
    private notificationService: NotificationService,
    private backendService: BackendService,
    private router: Router
  ) { }

  private stepper: Stepper;

  // tslint:disable-next-line: typedef
  next() {
    this.stepper.next();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.projet.reimbursement_deadline = this.projectForm.value.reimbursement_deadline;
    this.projet.funding_deadline = this.projectForm.value.funding_deadline;
    this.projet.category_id = this.projectForm.value.category_id;
    this.projet.name = this.projectForm.value.project_name;
    this.projet.duration = this.projectForm.value.duree;
    this.projet.interest_rate = this.projectForm.value.interest_rate;
    this.projet.min_amount = this.projectForm.value.min_amount;
    this.projet.max_amount = this.projectForm.value.max_amount;
    this.projet.description = this.projectForm.value.description;
    this.backendService.projects.create(this.projet).subscribe
      ((res) => {
        this.router.navigate(['/projects', res.data.id]);
        console.log('Projet envoyéé avec success !!');
        // tslint:disable-next-line: max-line-length
        //      this.notificationService.add( {title: 'Success', message: 'Votre projet nous est parvenu avec success. Nous vous contacterons d\'ici peu !'});
      }, (error) => {
        this.notificationService.add({ title: 'Erreur', message: 'Vos informations sont non concordantes !' });
      });

    console.log(this.projet);
  }

  ngOnInit(): void {
    this.backendService.categories.all().subscribe(
      (res) => {
        this.categories = res.data;
      }, (error) => {
        // tslint:disable-next-line: quotemark
        console.log("erreur coté categorie");
      }
    );

    /*
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });*/
  }

}
