import { Student_Document_Type } from "./Student_Document_Type";

export class Student_Document_Type_Master
{
   

    // Student_Document_Type_Id :number; 
    Student_Id :number; 
    // Document_Type_Id :number; 
    // Document_Type_Name :string;
    // Is_Check:boolean;
    Student_Document_Type_Mater_Id:number;
    Remark :string;
    Student_Document_Type_Data:Student_Document_Type[];

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

