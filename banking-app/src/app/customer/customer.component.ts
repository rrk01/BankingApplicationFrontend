import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Customer } from '../models/customer/customer';
import { CustomerService } from '../models/customer/customer.service';
import { Staff } from '../models/staff/staff';

@Component({
  selector: 'app-profile',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  
  check:boolean=false;
  Chicken:string="Food";
  htmlString: string;
  viewCreateStaff:boolean = true;
  viewViewStaff:boolean = false;
  boxchecked:boolean = true;
  myDefaultValue: string = "DISABLED";
  customer : Customer= new Customer();
  customers: any;
  ack: any;
  makeChanges:boolean=false;
  constructor(private customerService:CustomerService, private router:Router, public sanitizer: DomSanitizer) { }
  
  ngOnInit(): void {
    //this.check=!this.check;
    
  }
  profileForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password1: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    /*status: new FormControl('', [Validators.required]),*/
   
   });

   get f(){
    return this.profileForm.controls;
   }
   checkmethod(){
    this.check=!this.check;
   }
   create() {
         //Angular
    this.customer.id=this.f['id'].value;
    this.customer.fullName=this.f['fullName'].value;
    this.customer.userName=this.f['userName'].value;
    this.customer.password=this.f['password'].value;
    this.customer.status=this.f['status'].value;
  
   
   
   console.log("Charlie",this.customer.fullName);
    console.log(this.profileForm.value)
    //Post Operationwill be executed here
    if(this.customer.fullName!='' && this.customer.fullName!=null && this.customer.fullName.length>=4&&this.customer.password==this.f['password1'].value){
      this.createStaffMember();
    //this.router.navigate(['/home']);
    }
    
   }
  createStaffMember() {
    this.customer.status="DISABLED";
    this.customerService.createcustomerlist(this.customer).subscribe(data => console.log(data),error=>console.log(error));
    this.customer= new Customer();
    this.ack="Record added successfully"
  }

}
