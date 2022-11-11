import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproverComponent } from './approver/approver.component';
import { BeneficiariesComponent } from './customer/beneficiaries/beneficiaries.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { TransfersComponent } from './customer/transfers/transfers.component';
import { AccountsComponent } from './customer/accounts/accounts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StaffComponent } from './staff/staff.component';
import { StatementsComponent } from './statements/statements.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'customer', component: CustomerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'approver', component: ApproverComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  // ------------------------------------
  { path: 'profile', component:ProfileComponent },
  { path: 'transfers', component:TransfersComponent},
  { path: 'beneficiaries', component:BeneficiariesComponent},
  { path: 'accounts', component:AccountsComponent},
  { path: 'statements', component:StatementsComponent}
]; //routes for routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
