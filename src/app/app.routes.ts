
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpdateComponent } from './sign-update/sign-update.component';
import { SupliersComponent } from './pages/supliers/supliers.component';

export const routes: Routes = [




  {path:'' , redirectTo:'login' , pathMatch : 'full'},

  {path:'login' , component: LoginComponent} ,
  {path:'loginUpdate' , component: SignUpdateComponent} ,
  {path:'SupliersList' , component: SupliersComponent} ,

  {path:'**' , redirectTo:'login' , pathMatch : 'full'}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes { }
