import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' // need
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { StaffComponent } from './staff/staff.component';
import { RegistrationComponent } from './registration/registration.component';
import { ApproverComponent } from './approver/approver.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransfersComponent } from './customer/transfers/transfers.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { BeneficiariesComponent } from './customer/beneficiaries/beneficiaries.component';
import { AccountsComponent } from './customer/accounts/accounts.component';
import { StatementsComponent } from './statements/statements.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CustomerComponent,
    StaffComponent,
    RegistrationComponent,
    ApproverComponent,
    // ---------------------
    TransfersComponent,
    ProfileComponent,
    BeneficiariesComponent,
    AccountsComponent,
    StatementsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule, // Need
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
