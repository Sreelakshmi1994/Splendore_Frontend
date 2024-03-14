export class Batch
{
Batch_Id:number;
Batch_Name:string;
User_Id:number;
Start_Date:Date;
End_Date:Date;
BatchFollowUp:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

