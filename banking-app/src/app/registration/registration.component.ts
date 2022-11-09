import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../models/customer/customer';
import { CustomerService } from '../models/customer/customer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user : Customer= new Customer();
  ack: any;

  constructor(private customerService:CustomerService, private router: Router) { }

  ngOnInit(): void {
  }


  profileForm = new FormGroup({
 
    id: new FormControl('', [Validators.required, Validators.minLength(4)]),
    ssn: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    secretQuestion: new FormControl('', [Validators.required]),
    secretAnswer: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
   
   
  });

  get f(){
    return this.profileForm.controls;
  }

  submit() {
 
   
    this.user.id=this.f['id'].value;         //Angular
    this.user.ssn=this.f['ssn'].value;
    this.user.userName=this.f['userName'].value;
    this.user.fullName=this.f['fullName'].value;
    this.user.password=this.f['password'].value;
    this.user.phone=this.f['phone'].value;
    this.user.secretQuestion=this.f['secretQuestion'].value;
    this.user.secretAnswer=this.f['secretAnswer'].value;
    this.user.status=this.f['status'].value;
   
   
    console.log(this.profileForm.value)
    //Post Operationwill be executed here
    if(this.user.fullName!='' && this.user.userName!=''){
    this.addUser();
    this.router.navigate(['/login']); // one finished it will route to login
    }

   }
    addUser() {
      this.customerService.createcustomerList(this.user).subscribe(data => console.log(data),error=>console.log(error));
      this.user= new Customer();
      this.ack = "Record added Successfully" // would show if not rerouted
  
    }
}
