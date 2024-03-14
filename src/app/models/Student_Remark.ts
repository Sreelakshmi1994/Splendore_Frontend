export class Student_Remark
{
    Student_Remark_Id:number;
    Student_Id:number
    Remark_Details_Id:number
    Eneterd_By:number
    Entered_Date:Date
    Eneterd_By_Name:string;
    Remark:string
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

