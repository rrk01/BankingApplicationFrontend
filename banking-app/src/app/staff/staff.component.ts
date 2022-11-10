import { Component, Input, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../models/account/account';
import { AccountService } from '../models/account/account.service';
import { Beneficiary } from '../models/beneficiary/beneficiary';
import { BeneficiaryService } from '../models/beneficiary/beneficiary.service';
import { Customer } from '../models/customer/customer';
import { CustomerService } from '../models/customer/customer.service';
import { Transfer } from '../models/transfer/transfer';
import { TransferService } from '../models/transfer/transfer.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
  providers: [AccountService]
})
export class StaffComponent implements OnInit {
  // CURRENT STAFF
  currentStaff = sessionStorage.getItem('staff-name');
  // For Button 1
  tempCustomer: any;
  accountNumber: any;
  account: Account = new Account();
  accounts: any;
  // --------------------------------
  beneficiary: Beneficiary = new Beneficiary();
  beneficiaries: any;
  approvedMessage: any;
  // ---------------------------------
  customer: Customer = new Customer();
  customers: any;
  // ----------------------------------
  account_1: Account = new Account();
  accounts_1: any;
  approveMessage_: any;
  // -------------------------------
  disableMessage:any;
  enableMessage:any;
  //--------------------------------
  // FOR TRANSFER (need to find customer to do the transfer for)
  customerId:any; 
  customerAccount: Account = new Account();
  customerAccounts:any;

  transfer: Transfer = new Transfer();
  fromAccount:any;
  toAccount:any;
  transferMessage:any;
  // --------------------------------------------
  ack:any;

  constructor(private accountService: AccountService, private beneficiaryService: BeneficiaryService, private customerService: CustomerService, private transferService: TransferService, private router: Router) { }

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

  div1: boolean = false;
  div2: boolean = false;
  div3: boolean = false;
  div4: boolean = false;
  div5: boolean = false;

  div1Function() {
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
    this.div5 = false;
  }
  div2Function() {
    this.div2 = true;
    this.div1 = false;
    this.div3 = false;
    this.div4 = false;
    this.div5 = false;
  }
  div3Function() {
    this.div3 = true;
    this.div1 = false;
    this.div2 = false;
    this.div4 = false;
    this.div5 = false;
  }
  div4Function() {
    this.div4 = true;
    this.div5 = false;
    this.div3 = false;
    this.div2 = false;
    this.div1 = false;
  }
  div5Function() {
    this.div5 = true;
    this.div4 = false;
    this.div3 = false;
    this.div2 = false;
    this.div1 = false;
  }

  readAccountTransactions(newAccountNo: any) {
    this.accountNumber = newAccountNo;
    console.log("HERE-1 " + this.accountNumber);
    this.accountService.getAccountTransactions(newAccountNo)
      .subscribe(data => { this.accounts = data }, error => console.log(error));
  }
  // --------------------------------------------
  readBeneficiary() {
    this.beneficiaryService.getAllBeneficiary()
      .subscribe(data => { this.beneficiaries = data }, error => console.log(error));
  }

  approveBeneficiary(beneficiaryAcNo: any) {
    this.beneficiaryService.approveBeneficiary(beneficiaryAcNo)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.approvedMessage = true;
          this.beneficiaryService.getAllBeneficiary().subscribe(data => {
            this.beneficiaries = data
          })
        },
        (error: any) => console.log(error));
  }
  // ---------------------------------------------
  readAllAccount() {
    this.accountService.getAllAccounts()
      .subscribe(data => { this.accounts_1 = data }, error => console.log(error));
  }

  approveAccount(accountNumber_: any, customer_id: any) {
    this.accountService.approveAccount(accountNumber_, customer_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.approvedMessage = true;
          this.accountService.getAllAccounts().subscribe(data => {
            this.accounts_1 = data
          })
        },
        (error: any) => console.log(error));
  }
  // ---------------------------------------------
  // element:any;
  isActive_Account: any;

  readAllCustomers() {
    // console.log(this.isApproved);
    this.customerService.getAllCustomers()
      .subscribe(data => {
        this.customers = data; // Important part
      }, error => console.log(error));
  }

  updateActiveState(customer_id: any) {
    const checkbox = document.getElementById(customer_id,) as HTMLInputElement | null;
    for (let i = 0; i < this.customers.length; i++) {
      if (checkbox != null && this.customers[i].id == customer_id) {
        if (checkbox.checked && this.customers[i].id == customer_id) {
          console.log("ON"); //Testing purpose
          this.customerService.updateCustomerEnable(customer_id)
          .subscribe(
            (data: any) => {
              this.enableMessage = true;
              this.customerService.getAllCustomers().subscribe(data => {
              this.customers = data
              })
            },(error: any) => console.log(error));;
          console.log(this.customers[i].status);
          break;
        } else {
          console.log("off");
          this.customerService.updateCustomerDisable(customer_id)
          .subscribe(
            (data: any) => {
              this.disableMessage = true;
              this.customerService.getAllCustomers().subscribe(data => {
                this.customers = data
              })
            },(error: any) => console.log(error));
          console.log(this.customers[i].status);
          break;
        }
      }
    }
  }
  // ----------------------------------------------------------
  redirectToLogin() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  // -----------------------------------------------------------
  readCustomerId(newCustomerNo: any) { 
    this.ack="";
    this.customerId = newCustomerNo;
    console.log("HERE-1 " + this.customerId);
    this.accountService.getCustomerAccounts(newCustomerNo)
      .subscribe(data => { this.customerAccounts = data }, error => console.log(error));
  }
// ----------------------------------------------------------------
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
  }
// ----------------------------------------------------


}
