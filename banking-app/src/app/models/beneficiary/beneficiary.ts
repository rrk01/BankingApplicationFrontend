export class Beneficiary {
    beneficiaryAcNo:any; // Id in the table
    accountNumber:any; // Links to the ACCOUNT ENTITY
	customerId:any; // LINKS TO THE CUSTOMER ENTITY
	accountType:any;// SB OR CA
	beneficiaryName:any; // bene Name
	approved:any; // false as Default (Done by Staff)
	active:any; // (Yes/No) (Done by Customer)
	beneficiaryAddedDate:any;
}
