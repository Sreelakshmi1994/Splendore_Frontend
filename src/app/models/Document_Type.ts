export class Document_Type
{
    Document_Type_Id:number;
    Document_Type_Name:string;
    Is_Check : boolean;
    Student_Document_Type_Id :number; 
    Student_Document_Type_Mater_Id:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

