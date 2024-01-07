import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { authGuard, reclamationGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate : [authGuard],
  }, 
  {
    path: 'reclamations',
    component: DataTableComponent,
    canActivate : [reclamationGuard]
  },
  {
    path: 'reclamations/:param',
    component: DataTableComponent,
    canActivate : [reclamationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
