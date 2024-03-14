//import {Sales_Receipt} from './Sales_Receipt';
export class Receipt_Voucher
{
Receipt_Voucher_Id:number;
Date:Date;
Is_Associate:boolean;
// Date:string;
Voucher_No:number;
From_Account_Id:number;
Amount:number;
To_Account_Id:number;
Sales_Master_Id:number;
Payment_Mode:number;
User_Id:number;
Fees_Status:number;
Address1:string;
Description:string;
Payment_Status:number;
FromAccount_Name:string;
ToAccount_Name: string;
//Employee_Id:number;
//Employee_Name:string;
Tax_Percentage:number;
Student_Course_Id:number;
Course_Id:number;
Fees_Type_Id:number;
Company_Name:string;
Address2:string;
Address3:string;
PinCode:string;
GSTNo:string;
Master_Id:number=0;

Is_Agent:boolean
Student_Id:number;
Bill_No:string;

To_Account_Name:string;

Student_Fees_Installment_Details_Id:number;

Center_Code: string;
Tax:number;

Search_Date:Date;


Hostel_Fees_Details_Id:number;

  Associates_Agent_Id  :number;
  Processing_Agent_Id  :number;
  Associates_Agent_Commission  :number;
  Processing_Agent_Commission  :number;


//Sales_Receipt:Sales_Receipt[];

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

