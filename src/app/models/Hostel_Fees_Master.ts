import {Hostel_Fees_details} from './Hostel_Fees_details'
export class Hostel_Fees_Master
{
    Hostel_Fees_Master_Id :number;
    Student_Id :number;
    From_Date :Date;
    To_Date :Date;
    Duration :number;
    Per_Month_Amount :number; 
    Total_Amount :number;
    Fees_Type_Id :number;
    Fees_Type_Name :string;
    User_Id : number;
    Application_Fees:number;
    Food_Fees:number;
    Security_Deposit:number;
    Checkout_Date:Date;
    Checkout_Date_Check:boolean;
   
    Hostel_Fees_Details:Hostel_Fees_details[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

