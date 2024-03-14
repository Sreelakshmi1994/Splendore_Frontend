export class Leave_Details
{
Leave_Mode_Id:number;
Leave_Mode_Name:string;
Leave_Type_Id:number;
Leave_Type_Name:string; 
From_Date:Date;
To_Date:Date;
No_Of_Leaves:number;
Balance_Pl:number;
Balance_Cl:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

