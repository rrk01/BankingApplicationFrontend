import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account/account';
import { AccountService } from 'src/app/models/account/account.service';
import { Transfer } from 'src/app/models/transfer/transfer';
import { TransferService } from 'src/app/models/transfer/transfer.service';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent implements OnInit {
  currentCustomer = sessionStorage.getItem('customer-fullName');
  // transfers
  day = ["monday","tuesday","wednesday","thursday","friday"];

   // FOR TRANSFER (need to find customer to do the transfer for)
   customerId = sessionStorage.getItem('customer-id'); 
   customerAccount: Account = new Account();
   customerAccounts:any;
 
   transfer: Transfer = new Transfer();
   fromAccount:any;
   toAccount:any;
   transferMessage:any;
   transactionAdded:any;
  // ---------------------------------------------------
  ack:any;

  constructor(private accountService: AccountService, private transferService: TransferService, private router: Router) { }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    fromAccount:new FormControl('', [Validators.required]),
    toAccount:new FormControl('', [Validators.required]),
    amount:new FormControl('', [Validators.required]),
    t_reason:new FormControl('', [Validators.required]),
    transfer_by:new FormControl('', [Validators.required]),
  });

  get f(){
    return this.profileForm.controls; 
  }

// ---------------------
getAllCustomerAccounts() {
  console.log(this.customerId);
  this.accountService.getCustomerAccounts(this.customerId)
      .subscribe(data => { this.customerAccounts = data;
        console.log(data);
      }, error => console.log(error));
} 

// --------------------- 
  setFromAccount(selected:any) {
    this.fromAccount = selected;
    console.log(this.fromAccount);
  }

  setToAccount(selected:any) {
    this.toAccount = selected;
    console.log(this.toAccount);
  }

  createTransfer() {
    this.transfer.id=this.f['id'].value;
    this.transfer.fromAccount=this.fromAccount;
    this.transfer.toAccount=this.toAccount;
    this.transfer.amount=this.f['amount'].value;
    this.transfer.t_reason=this.f['t_reason'].value;
    this.transfer.transfer_by=sessionStorage.getItem('staff-name');

    this.transferService.createTransfer(this.transfer)
      .subscribe(data => console.log(data),error=>console.log(error));
    this.ack="Transfer successfully";
    this.profileForm.reset();
    this.transferService.updateAccountsBalance(this.transfer)
    .subscribe(
      (data: any) => {
        this.transferMessage = true;
        this.accountService.getCustomerAccounts(this.customerId)
        .subscribe(data => { this.customerAccounts = data })
      },(error: any) => console.log(error));
    this.accountService.createATransaction(this.fromAccount, this.transfer)
      .subscribe(
        (data : any) => {
          this.transactionAdded = true;
        },(error: any) => console.log(error));
  }
// -----------------------------------------
  redirectToLogin() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
