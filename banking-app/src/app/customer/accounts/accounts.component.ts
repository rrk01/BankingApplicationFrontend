import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account/account';
import { AccountService } from 'src/app/models/account/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  currentCustomer = sessionStorage.getItem('customer-fullName');
  currentCustomerID = sessionStorage.getItem('customer-id');
  user: Account = new Account();
  account: any;
  customerAccounts: any;
  showAdded: any;

  constructor(private accountService:AccountService, private router: Router) {}

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    accountType: new FormControl('', [Validators.required]),
  });

  get f(){
    return this.profileForm.controls;
  }

  addAccount(){
    let dateTime = new Date()
    this.user.accountType = this.f['accountType'].value;
    this.user.accountBalance = 0
    this.user.dateOfCreation = dateTime;

    console.log(this.profileForm.value)
    //Post Operationwill be executed here

    if(this.user.accountType!=''){
      this.accountService.createCustomerAccount(this.currentCustomerID, this.user).subscribe(data => console.log(data),error=>console.log(error));
      this.showAdded = true;
    }

  }

  getAllCustomerAccounts() {
    console.log(this.currentCustomerID);
    this.accountService.getCustomerAccounts(this.currentCustomerID)
        .subscribe(data => { this.customerAccounts = data;
          console.log(data);
        }, error => console.log(error));
  } 

}