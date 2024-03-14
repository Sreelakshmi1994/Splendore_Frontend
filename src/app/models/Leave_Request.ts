import { Leave_Details } from "./Leave_Details";

export class Leave_Request
{
Leave_Request_Id:number;
Client_Accounts_Id:number;
Client_Accounts_Name:string;
Client_Accounts_Code:string;
Entry_Date:Date;
Leave_Type_Name:string;
Store_Name:string;
From_Date:Date;
To_Date:Date;
Leave_Type_Id:number;
Reasonfor:string;
Noof_Leaves:number;
Balance_PL:number;
Balance_CL:number;
Approved_Date:Date;
Leave_Request_Status_Id:number;
Approved_by:number;
Description:string;
Store_Id:number;
Leave_Mode_Id:number;

User_Id:number;

Leave_Mode_Name:string;

Leave_Request_Status_Name:string;

Leave_Details:Leave_Details[]

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}


