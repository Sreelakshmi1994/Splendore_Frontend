export class Fees_Receipt_Application
{
    Fees_Receipt_Application_Id:number;
    Fees_Name:string;
    Fees_Id:number;
    Student_Id:number;
    Entry_date:string;
    User_Id:number;
    Description:string;
    Amount:number;
    RowNo:number
    tp:number;
    Student_Name:string;
    Student_Email:string;
    Currency:String;
    Currency_Id:number;
    To_Account_Id:number;
    To_Account_Name:string;
    Course_Name:string;
    Application_details_Id:number;
    Course_Id:number;

    Refund_Requested:number;
    Refund_Requested_On:Date;
    Refund_Requested_By:number;
    Refund_Request_Status:number;
    Country_Id:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

