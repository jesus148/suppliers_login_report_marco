
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SupliersComponent } from './pages/supliers/supliers.component';
import { isLogedGuard } from './services/guards/is-loged.guard';

export const routes: Routes = [


  {path:'' , redirectTo:'login' , pathMatch : 'full'},

  {path:'login' , component: LoginComponent} ,
  {path:'SupliersList' , component: SupliersComponent , canActivate :[isLogedGuard]} ,

  {path:'**' , redirectTo:'login' , pathMatch : 'full'}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes { }
