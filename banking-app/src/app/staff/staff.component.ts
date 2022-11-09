import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../models/account/account';
import { AccountService } from '../models/account/account.service';
import { Beneficiary } from '../models/beneficiary/beneficiary';
import { BeneficiaryService } from '../models/beneficiary/beneficiary.service';
import { Customer } from '../models/customer/customer';
import { CustomerService } from '../models/customer/customer.service';

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

  constructor(private accountService: AccountService, private beneficiaryService: BeneficiaryService, private customerService: CustomerService) { }

  ngOnInit(): void {

  }

  div1: boolean = false;
  div2: boolean = false;
  div3: boolean = false;
  div4: boolean = false;

  div1Function() {
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
  }
  div2Function() {
    this.div2 = true;
    this.div1 = false;
    this.div3 = false;
    this.div4 = false;
  }
  div3Function() {
    this.div3 = true;
    this.div1 = false;
    this.div2 = false;
    this.div4 = false;
  }
  div4Function() {
    this.div4 = true;
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

}
