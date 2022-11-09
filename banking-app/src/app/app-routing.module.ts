import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'staff', component: StaffComponent}
]; //routes for routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
