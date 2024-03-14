export class Journal_Entry
{
Journal_Entry_Id:number;
Date:Date;
Voucher_No:number;
From_Account_Id:number;
Amount:number;
To_Account_Id:number;
PaymentMode:number;
User_Id:number;
Payment_Status:number;
Description:string;
From_Detail:String;
To_Detail:string;
FromAccount_Name:string;
ToAccount_Name:string;
Status:number;
Master_Id:number;
Search_Date:Date;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

