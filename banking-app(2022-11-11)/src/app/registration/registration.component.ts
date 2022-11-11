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
  currentC: any;
  userNameExists: any;
  failedRegister: any;
  blankForm: any;
  passwordNoMatch: any;

  constructor(private customerService:CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    pswdConfirm: new FormControl('', [Validators.required])
  });

  get f(){
    return this.profileForm.controls;
  }

  submit() {
    this.failedRegister = false;
    this.userNameExists = false;
    this.passwordNoMatch = false;
    this.blankForm = false;
 
    this.user.userName = this.f['userName'].value;
    this.user.fullName = this.f['fullName'].value;
    this.user.password = this.f['password'].value;
   
    console.log(this.profileForm.value)
    //Post Operationwill be executed here
    if(this.user.fullName!='' && this.user.userName!=''){
      this.customerService.getuserList()
      .subscribe(data=> {this.currentC=data;
        for(let i=0;i<data.length;i++){
          console.log(this.currentC[i])
          if(this.user.userName==this.currentC[i].userName){
            this.userNameExists = true;
          }
        }
        if(this.user.password == this.f['pswdConfirm'].value){
          if(this.userNameExists == false){
            this.addUser();
            this.router.navigate(['/login']); // once finished it will route to login
          }else{
            this.failedRegister = true;
          }
        }else{
          this.failedRegister = true;
          this.passwordNoMatch = true;
        }
      },error=>console.log(error)) ;
    } else{
      this.failedRegister = true;
      this.blankForm = true;
    }

   }
    addUser() {
      this.customerService.createcustomerList(this.user).subscribe(data => console.log(data),error=>console.log(error));
      this.user= new Customer();
      this.ack = "Record added Successfully" // would show if not rerouted
  
    }
}