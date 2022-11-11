import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Beneficiary } from 'src/app/models/beneficiary/beneficiary';
import { BeneficiaryService } from 'src/app/models/beneficiary/beneficiary.service';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css']
})
export class BeneficiariesComponent implements OnInit {
  currentCustomer = sessionStorage.getItem('customer-fullName');
  // 
  beneficiary : Beneficiary = new Beneficiary();
  customerId = sessionStorage.getItem('customer-id');
  ack:any;
  // --------------------------------------------
  beneficiary_2 : Beneficiary = new Beneficiary();
  beneficiaries_2:any;
  // --------------------------------------------
  deleteMessage:any;


  constructor(private beneficiaryService: BeneficiaryService) { }

  ngOnInit(): void {

  }

  profileForm = new FormGroup({ 
    beneficiaryAcNo: new FormControl('', [Validators.required]),
    accountNumber: new FormControl('', [Validators.required]),
    customerId: new FormControl('', [Validators.required]),
    accountType: new FormControl('', [Validators.required]),
    beneficiaryName: new FormControl('', [Validators.required]),
    approved: new FormControl('', [Validators.required]),
    active: new FormControl('', [Validators.required]),
    beneficiaryAddedDate: new FormControl('', [Validators.required]),
  });

  get f(){
    return this.profileForm.controls;
  }

  createBeneficiary() {
    let dateTime = new Date()
    this.beneficiary.beneficiaryAcNo = this.f['beneficiaryAcNo'].value;
    this.beneficiary.accountNumber = this.f['accountNumber'].value;
    this.beneficiary.customerId = this.customerId;
    this.beneficiary.accountType = this.f['accountType'].value;
    this.beneficiary.beneficiaryName = this.f['beneficiaryName'].value;
    this.beneficiary.approved = false;
    this.beneficiary.active = true;
    this.beneficiary.beneficiaryAddedDate = dateTime;

    this.beneficiaryService.createBeneficiary(this.beneficiary, this.customerId)
      .subscribe(data => console.log(data),error=>console.log(error));
      this.ack="Added successfully";
      this.profileForm.reset();
  }

  getBeneficiary() {
    this.beneficiaryService.getBeneficiary(this.customerId)
      .subscribe(data => {this.beneficiaries_2 = data; console.log(this.beneficiaries_2)}, error => console.log(error));
  }

  deleteBeneficiary(beneficiaryAcNo:any) {
    this.beneficiaryService.deleteBeneficiary(this.customerId, beneficiaryAcNo)
      .subscribe( (data:any) =>{
      console.log(data);
      this.deleteMessage = true;
      this.beneficiaryService.getBeneficiary(this.customerId).subscribe(
        data => {
          this.beneficiaries_2 = data; 
          console.log(this.beneficiaries_2);
        })
      },(error:any) => console.log(error));
  }

}
