import { Payment_Request_Details } from "./Payment_Request_Details";
import { Purchase_Details } from "./Purchase_Details";

export class Payment_Request
{
Payment_Request_Id:number;
Account_Party_Id:number;
Account_Group_Id:number;
Client_Accounts_Name:string;
Entry_Date:Date;
PaymentDate:Date;
InvoiceNo:string;
Discount:number;
Amount:number;
Roundoff:number;
TotalAmount:number;
TotalDiscount:number;
TaxableAmount:number;
TotalGST:number;
TotalCGST:number;
TotalSGST:number;
Group_Name:string;
TotalIGST:number;
Other_Charges:number;
GrossTotal:number;
NetTotal:number;
BillType:number;
BillType_Name:string;
User_Id:number;
Approved_By:number;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Customer:string;
Mobile:string;
Description:string;
Payment_Request_Details:Payment_Request_Details[];

Transportation_Charge :number;
Handling_Charge :number;
Isgst :boolean;
Transportation_Gst :number;
Handling_Gst :number;
Transportation_Total :number;
Handling_Total :number;
Document_Name:string
File_Name:string
Item_Group_Id:number;
Item_Group_Name:string
Supplier_Id:number;
Supplier_Name:string
Payment_Status_Id:number;
Payment_Status_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

