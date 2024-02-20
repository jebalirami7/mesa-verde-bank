import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { authGuard, reclamationGuard } from './auth.guard';
import { BodyComponent } from './body/body.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate : [authGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate : [authGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'reclamations',
    component: BodyComponent,
    children: [
      {path: 'all', component: DataTableComponent},
      {path: 'in-progress', component: DataTableComponent},
      {path: 'accepted', component: DataTableComponent},
      {path: 'rejected', component: DataTableComponent},
    ],
    canActivate : [reclamationGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
