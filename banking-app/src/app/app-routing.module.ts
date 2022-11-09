import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproverComponent } from './approver/approver.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'customer', component: CustomerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'approver', component: ApproverComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
]; //routes for routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
