import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../models/account/account';
import { AccountService } from '../models/account/account.service';
import { Transaction } from '../models/transaction/transaction';
import { TransactionService } from '../models/transaction/transaction.service';
import { Transfer } from '../models/transfer/transfer';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css']
})
export class StatementsComponent implements OnInit {
  currentCustomer = sessionStorage.getItem('customer-fullName');
  // 
  customerId= sessionStorage.getItem('customer-id'); 
  customerAccount: Account = new Account();
  customerAccounts:any;
  // --------------------------
  fromAccount:any;
  transfer : Transfer = new Transfer();
  transfers:any;
  //--------------------------- 
  transaction : Transaction = new Transaction();
  transactions:any;
  ack:any;


  constructor(private accountService: AccountService, private transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {
  }

  redirectToLogin() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  readCustomerId() { 
    this.ack="";
    let transactions_ =  Array(Transaction);
    console.log("HERE-1 " + this.customerId);
    this.accountService.getCustomerAccounts(this.customerId)
      .subscribe(data => { this.customerAccounts = data;
        console.log(data.transactions);
        for(let i = 0; i < this.customerAccounts.length; i++){
          console.log(this.customerAccounts[i].transactions);
          if(this.customerAccounts[i].transactions != "") {
            transactions_.push(this.customerAccounts[i].transactions);
          }
        }
        this.transactions = transactions_;
        console.log(this.transactions);
      }, error => console.log(error));
  }

}
