import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Staff } from '../models/staff/staff';
import { StaffService } from '../models/staff/staff.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {
  check:boolean=false;
  Chicken:string="Food";
  viewCreateStaff:boolean = true;
  viewViewStaff:boolean = false;
  boxchecked:boolean = true;
  myDefaultValue: string = "DISABLED";
  staff : Staff= new Staff();
  staffs: any;
  ack: any;
  makeChanges:boolean=false;
  constructor(private staffService:StaffService, private router:Router, public sanitizer: DomSanitizer) { }
  
  ngOnInit(): void {
    this.toggleChecked(5);
    this.getStaff();
    console.log("User Test: "+this.f['id'].value);
    //this.check=!this.check;
    
  }
  ngOnChanges(makeChanges:boolean) {
    this.getStaff();
  }
  profileForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
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
    this.staff.id=this.f['id'].value;
    this.staff.name=this.f['name'].value;
    this.staff.userName=this.f['userName'].value;
    this.staff.password=this.f['password'].value;
    this.staff.status=this.f['status'].value;
  
   
   
   console.log("Charlie",this.staff.name);
    console.log(this.profileForm.value)
    //Post Operationwill be executed here
    if(this.staff.name!='' && this.staff.name!=null && this.staff.name.length>=4&&this.staff.password==this.f['password1'].value){
      this.createStaffMember();
    //this.router.navigate(['/home']);
    }
    
   }
   disableOrEnableStaff(id:number) {
      this.staffService.disableorenablestaff(id).subscribe(data => console.log(data),error=>console.log(error));
      console.log("user id: "+id);
      //this.toggleChecked(id);
      this.staff= new Staff();
    }
  getStaff(){ 
    this.staffService.listallstaff().subscribe((data: any) => {
      console.log(data);
      console.log(this.staff.name);
      // this.checkedButton(this.staff).status
      this.staffs = data;
      for(let i=0;i<data.length;i++){
        if(this.checkedButton(this.staffs[i]).status=='ENABLED'){
            console.log(this.checkedButton(this.staffs[i]).status);
            this.checkedButton(this.staffs[i]).checked=true;
        }
      }   
    });
  }
  createStaffMember() {
    this.staff.status="DISABLED";
    this.staffService.createstafflist(this.staff).subscribe(data => console.log(data),error=>console.log(error));
    this.getStaff();
    this.staff= new Staff();
    this.ack="Record added successfully"
  }
  toggleCreateStaff() {
    this.viewCreateStaff = !this.viewCreateStaff;
    this.viewViewStaff = !this.viewViewStaff;
  }
  toggleViewStaff() {
    this.viewViewStaff = !this.viewViewStaff;
    this.viewCreateStaff = !this.viewCreateStaff;
    this.getStaff();
  }
  toggleChecked(id:any){
    id=!id;
  }
  ischecked(event:any){
    if(event.checked){
      event=!event;
    }
  }
  checkedButton(user: Staff){
    return user;
  }

  redirectToLogin(){
    sessionStorage.clear();
    this.router.navigate(['./login']);
  }
  
}