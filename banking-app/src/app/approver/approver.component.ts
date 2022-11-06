import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Staff } from '../staff';
import { StaffService } from '../staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {
  user : Staff= new Staff();
  users: any;
  ack: any;
  constructor(private staffService:StaffService, private router:Router) { }

  ngOnInit(): void {
  }
  profileForm = new FormGroup({
 
    name: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
   
   });

   get f(){
    return this.profileForm.controls;
   }

   create() {
         //Angular
    this.user.name=this.f['name'].value;
    this.user.userName=this.f['userName'].value;
    this.user.password=this.f['password'].value;
    this.user.status=this.f['status'].value;
   
   console.log("Charlie",this.user.name);
   
    console.log(this.profileForm.value)
    //Post Operationwill be executed here
    if(this.user.name!='' && this.user.name!=null && this.user.name.length>=4){
    this.createStaffMember();
    this.router.navigate(['/home']);
    }
    //this.signupService.createuserlist(this.user)
    //Here logic will be there Develop your application can add logic here to call API Hit
   
   }
    createStaffMember() {
      this.staffService.createstafflist(this.user).subscribe(data => console.log(data),error=>console.log(error));
      this.user= new Staff();
      this.ack="Record added successfully"
    }
}
