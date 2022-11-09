import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CustomerComponent,
    StaffComponent,
    RegistrationComponent,
    ApproverComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Need
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
