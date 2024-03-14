export class Student_Document_Type
{
   

    Student_Document_Type_Id :number; 
    Student_Document_Type_Mater_Id:number;
    // Student_Id :number; 
    Document_Type_Id :number; 
    Document_Type_Name :string;
    Is_Check:boolean;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

