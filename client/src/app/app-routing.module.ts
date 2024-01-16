import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { authGuard, reclamationGuard } from './auth.guard';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate : [authGuard],
  }, 
  {
    path: 'reclamations',
    component: BodyComponent,
    children: [
      {path: '', component: DataTableComponent},
      {path: 'in-progress', component: DataTableComponent},
      {path: 'accepted', component: DataTableComponent},
      {path: 'rejected', component: DataTableComponent},
    ],
    canActivate : [reclamationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
