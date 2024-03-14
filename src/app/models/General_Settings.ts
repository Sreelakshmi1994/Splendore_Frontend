export class General_Settings
{
General_Settings_Id:string;
Receipt_Voucher_No:string;
Payment_Voucher_No:string;
Contra_Voucher_No:string;
Journal_Voucher_No:string;
Salary_Slip_No:string;
Barcode:number;
Transportation_Percentage :number; 
Franchise_Percentage :number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

