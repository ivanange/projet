import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { HideBarGuard } from '../guards/hide-bar.guard';
import { HideTabsGuard } from '../guards/hide-tabs.guard';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [HideBarGuard, HideTabsGuard],
    children: [
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'reset',
        component: PasswordResetComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
