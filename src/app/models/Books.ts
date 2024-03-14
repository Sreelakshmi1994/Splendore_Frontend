export class Books
{
    Books_Id:number;
    Book_Count:number;
    Books_Name:string;
    Authors:string;
    Description:string;
    Books_No:string;
    Rack_No:string;
    Phone:string;
    Users_Name:string;
    Student_Name:string;
    Books_Issued_EntryDate:Date;
    Book_Status:boolean;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}