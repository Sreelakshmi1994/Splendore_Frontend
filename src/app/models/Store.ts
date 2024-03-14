import { Store_Partners } from './Store_Partners'; 
export class Store
{
Store_Id:number;
Store_Code:string;
Store_Name:string;
Store_Amount :string;
Commision_Percentage:number;
GST_Percentage:number;
TDS_Percentage:number;
Transporation_Percentage:number;
Store_Status:number;
Users_Id:number;
Company_Id:number;
Bank_Id:number;
Cochin_Share_Percentage:number;
OtherBranch_Share_Percentage:number;
Opening_Balance:number;
Opening_Nominal:number;
Opening_Cess:number;
Store_Partners:Store_Partners[];
Cochin_Share:number;
Transporation_Amount:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}