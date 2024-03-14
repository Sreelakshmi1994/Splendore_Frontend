import { Purchase_Details } from "./Purchase_Details";

export class Purchase_Master
{
Purchase_Master_Id:number;
Account_Party_Id:number;
Account_Group_Id:number;
Client_Accounts_Name:string;
Entry_Date:Date;
PurchaseDate:Date;
InvoiceNo:string;
Discount:number;
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
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Customer:string;
Mobile:string;
Description:string;
Purchase_Details:Purchase_Details[];
Purchase_Status_Id:number;
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
Item_Group_Name:string;
Approved_By:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

