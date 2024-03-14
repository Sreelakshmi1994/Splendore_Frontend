export class Applicationdocument
{


    New_Entry:number;
    Application_Document_Id:number;
    Application_details_Id:number;
   Student_Id:number;
   Entry_date:Date;
   ApplicationFile_Name:string;
   ApplicationDocument_Id:number;
   ApplicationDocument_Name:string;
   ApplicationDocument_File_Name:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}
