export class Student_Process
{
    Student_Process_Id:number;
    Student_Id:number
    Process_Type_Id:number 
    Process_Date:string ;
    Date:string 
    Remark:string
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

