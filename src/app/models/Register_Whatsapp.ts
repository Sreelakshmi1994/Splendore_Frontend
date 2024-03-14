export class Register_Whatsapp
{
    // Mode_Id:number;
    // Mode_Name:string;


     whatsAppBusinessId:string;
    phoneNumberId:string;
    from:string;
    to:string;
    type:string;
    templateName:string;
    templateId:string;
    language:string;
    header:[];
    body:any;
    button:string;
    student:String;
    tostaff:string;
    date:string;
    Absent_Data : any []= []
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}
