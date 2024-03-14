export class Hostel_Fees_details
{
    Hostel_Fees_Details_Id :number;
    Hostel_Fees_Master_Id :number;
    Date :Date;
    Amount :number;
    Status :number;
    Paid_Amount :number;
    Balance_Amount :number;
    From_Date :Date;
    To_Date :Date;
    Duration :number;
    Per_Month_Amount :number; 
    Total_Amount :number;
    Fees_Type_Id :number;
    Fees_Type_Name :string;
    User_Id : number;
    
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

