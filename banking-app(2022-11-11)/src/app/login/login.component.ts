import { r3JitTypeSourceSpan } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApproverService } from '../models/approver/approver.service';
import { Customer } from '../models/customer/customer';
import { CustomerService } from '../models/customer/customer.service';
import { Staff } from '../models/staff/staff';
import { StaffService } from '../models/staff/staff.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : Customer= new Customer();
  users: any;
  staffpage: any;
  customerpage: any;
  custorStaff: any;
  forgot: any;
  secretQ: any;
  inList: any;
  tempUser: any;
  pass: any;
  uRight: any;
  wrongUsername: any;
  wrongPassword: any;
  failedLogin: any;
  wrongAnswer: any;
  blankLogin:any;
  InactiveUser: any;
  
  ngOnInit(): void {
  }

  constructor(private customerService:CustomerService, private staffService: StaffService, private approverService: ApproverService, private router: Router) { }

  profileForm = new FormGroup({

    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,Validators.minLength(4)])
  });

  forgotForm = new FormGroup({

    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    secretAnswer: new FormControl('',[Validators.required, Validators.minLength(2)])
  });

  get f(){
    return this.profileForm.controls;
  }

  get f2(){
    return this.forgotForm.controls;
  }

  goToRegister(){
    this.router.navigate(['/registration'])
  }

  clogin() {
    this.forgot = false;
    this.inList = false;
    this.uRight = false;
    this.failedLogin = false;
    this.wrongUsername = false;
    this.wrongPassword = false;
    this.InactiveUser = false;
    this.blankLogin = false;

    this.user.userName=this.f['userName'].value;         //Angular
    this.user.password=this.f['password'].value;


    console.log(this.profileForm.value)

      this.customerService.getuserList()
      .subscribe(data=>
        {this.users=data;
        console.log(this.users)
        for(let i=0;i<data.length;i++){
          console.log(this.users[i].id);//use i instead of 0
          if(this.user.userName == this.users[i].userName && this.users[i].status == 'ENABLE'){
            if(this.user.password == this.users[i].password ){
              sessionStorage.clear();                   // clears session storage before filling it
              sessionStorage.setItem('userObject', this.users[i]);
              sessionStorage.setItem('customer-id',this.users[i].id);
              sessionStorage.setItem('customer-ssn',this.users[i].ssn);
              sessionStorage.setItem('customer-fullName',this.users[i].fullName);
              sessionStorage.setItem('customer-userName',this.users[i].userName);
              sessionStorage.setItem('customer-password',this.users[i].password);
              sessionStorage.setItem('customer-phone',this.users[i].phone);
              sessionStorage.setItem('customer-status',this.users[i].status);
              this.router.navigate(['/profile']);
              break; //braks out of loop once finished it will route to home
            } else{
              this.router.navigate(['']);
              this.failedLogin = true;
              this.wrongPassword = true;
              break;
            }
          } 
          else if(this.user.userName == this.users[i].userName && this.users[i].status != 'ENABLE'){
            this.failedLogin = true;
            this.InactiveUser = true;
            break;
          }
          else if(this.user.userName!='' && i == (data.length-1)){
            this.router.navigate(['']);
            this.failedLogin = true;
            this.wrongUsername = true;
          }
        }
      },error=>console.log(error)) ;

  }


slogin() {
  this.forgot = false;
  this.inList= false;
  this.uRight = false;
  this.failedLogin = false;
  this.wrongUsername = false;
  this.wrongPassword = false;

  this.user.userName=this.f['userName'].value;         //Angular
  this.user.password=this.f['password'].value;

  console.log(this.profileForm.value)

  this.staffService.getStaffList()
  .subscribe(data=>
    {this.users=data;
    console.log(this.users)
    for(let i=0;i<data.length;i++){
      console.log(this.users[i].id);//use i instead of 0
      if(this.user.userName == this.users[i].userName && this.users[i].status == 'ENABLED'){
        if(this.user.password == this.users[i].password ){
          sessionStorage.clear();                   // clears session storage before filling it
          sessionStorage.setItem('userObject', this.users[i]);
          sessionStorage.setItem('staff-id',this.users[i].id);
          sessionStorage.setItem('staff-name',this.users[i].name);
          sessionStorage.setItem('staff-userName',this.users[i].userName);
          sessionStorage.setItem('staff-password',this.users[i].password);
          sessionStorage.setItem('staff-status',this.users[i].status);
          this.router.navigate(['/staff']);
          break; //braks out of loop once finished it will route to home
        } else{
          this.router.navigate(['']);
          this.failedLogin = true;
          this.wrongPassword = true;
          break;
        }
      }
      else if(this.user.userName == this.users[i].userName && this.users[i].status != 'ENABLED'){
        this.failedLogin = true;
        this.InactiveUser = true;
        break;
      }
      else if(this.user.userName == 'admin@admin.com'){
        this.alogin();
        break;
      }
      else if(this.user.userName!='' && i == (data.length-1)){
        this.router.navigate(['']);
        this.failedLogin = true;
        this.wrongUsername = true;
      }
    }
  },error=>console.log(error)) ;

}

alogin(){
  this.forgot = false;
  this.inList= false;
  this.uRight = false;
  this.failedLogin = false;
  this.wrongUsername = false;
  this.wrongPassword = false;

  this.approverService.getadminList()
  .subscribe(data=>
    {this.users=data;
    console.log(this.users)
    for(let i=0;i<data.length;i++){
      if(this.user.userName == this.users[i].fullName
        && this.user.password == this.users[i].passWord ){
          sessionStorage.clear();                   // clears session storage before filling it
          sessionStorage.setItem('userObject', this.users[i]);
          sessionStorage.setItem('approver-id',this.users[i].id);
          sessionStorage.setItem('approver-fullName',this.users[i].fullName);
          sessionStorage.setItem('approver-passWord',this.users[i].passWord);
          this.router.navigate(['/approver']);
          break; //braks out of loop once finished it will route to home
      }else{
        this.router.navigate(['']);
        this.router.navigate(['']);
        this.failedLogin = true;
        this.wrongPassword = true;
      }
    }
  },error=>console.log(error)) ;

}

customerInList(){
  this.inList = false;
  this.uRight = false;


  this.user.userName=this.f2['userName'].value;

  this.customerService.getuserList()
  .subscribe(data=>
    {this.users=data;
    for(let i=0; i< data.length; i++){
      if(this.user.userName == this.users[i].userName){
        this.tempUser = this.users[i];
        this.secretQ = this.users[i].secretQuestion;
        this.forgot = false;
        this.inList = true;
        break;
      } else{
        this.wrongUsername = true;
      }
    }
  },error=>console.log(error));



}

answerIsRight(){
   this.uRight = false;

  this.user.secretAnswer=this.f2['secretAnswer'].value;
  if(this.user.secretAnswer == this.tempUser.secretAnswer){
    this.pass = this.tempUser.password;
    this.inList = false;
    this.uRight = true;
  } else{
    this.wrongAnswer = true;
  }
}

//   }


isStaff(){
  this.staffpage = true;
  this.failedLogin = false;
  this.wrongUsername = false;
  this.wrongPassword = false;
  this.customerpage = false;
  this.forgot = false;
  this.inList= false;
  this.uRight = false;
}

isCustomer(){
  this.customerpage = true;
  this.failedLogin = false;
  this.wrongUsername = false;
  this.wrongPassword = false;
  this.staffpage = false;
  this.forgot = false;
  this.inList= false;
  this.uRight = false;
}

isForgot(){
  this.forgot = true;
  this.uRight = false;
  this.wrongUsername = false;
  this.wrongPassword = false; 
  this.failedLogin = false;
  this.inList= false;
  this.uRight = false;
}


loggedIn = true;
loggedOut = false;
 
}