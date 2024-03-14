export class Books_Issued
{
    Books_Issued_Id:number;
    Books_Id:number;
    Student_Id:number;
    Users_Id:number;
    Books_Issued_EntryDate:Date;
    Actual_Return_Date:Date;
    Return_Status:boolean;
    Return_Promise_Date:Date;
    Books_Name:string;
    Books_No:string;
    Phone:string;
    Users_Name:string;
    Registration_No:string;
   
    Student_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}