import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerService } from 'src/app/models/customer/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // Current Value in SessionStorage
  currentCustomerId = sessionStorage.getItem('customer-id');
  currentStatus = sessionStorage.getItem('customer-status');
  currentCustomerUserName = sessionStorage.getItem('customer-userName');
  currentCustomer = sessionStorage.getItem('customer-fullName');
  currentSSN = sessionStorage.getItem('customer-ssn');
  currentPhone = sessionStorage.getItem('customer-phone');
  currentPassword = sessionStorage.getItem('customer-password');
  // -------------------------------------------------------
  customer: Customer = new Customer();
  ack:any;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    ssn:new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    phone:new FormControl('', [Validators.required]),
    secretQuestion:new FormControl('', [Validators.required]),
    secretAnswer:new FormControl('', [Validators.required]),
  });

  get f(){
    return this.profileForm.controls;
  }
  
  submit(){
    this.customer.id = this.currentCustomerId;
    this.customer.userName = this.f['userName'].value;
    this.customer.fullName = this.f['fullName'].value;
    this.customer.ssn = this.f['ssn'].value;
    this.customer.phone = this.f['phone'].value;
    this.customer.password = this.f['password'].value;
    this.customer.secretQuestion = this.f['secretQuestion'].value;
    this.customer.secretAnswer = this.f['secretAnswer'].value;
    this.customer.status = this.currentStatus;

    this.customerService.updateCustomer(this.customer, this.currentCustomerId)
      .subscribe(data => console.log(data),error=>console.log(error));
    this.ack="Profile Updated!";

    sessionStorage.setItem('customer-id', this.customer.id);
    sessionStorage.setItem('customer-userName', this.customer.userName);
    sessionStorage.setItem('customer-fullName', this.customer.fullName);
    sessionStorage.setItem('customer-ssn', this.customer.ssn);
    sessionStorage.setItem('customer-phone',  this.customer.phone);
    sessionStorage.setItem('customer-password',  this.customer.password);
    sessionStorage.setItem('customer-secretQuestion',  this.customer.secretQuestion);
    sessionStorage.setItem('customer-secretAnswer',  this.customer.secretAnswer);
    sessionStorage.setItem('customer-status',  this.customer.status);

  }

}
