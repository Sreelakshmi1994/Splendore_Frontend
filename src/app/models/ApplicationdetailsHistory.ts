export class ApplicationdetailsHistory
{

    Application_details_history_Id:number;
    Application_details_Id:number;
   Student_Id:number;
   Country_Id:number;
   Country_Name:string;
   University_Id:number;
   University_Name:string;
   Course_Id:number;
   Course_Name:string;
   intake_Id:number;
   intake_Name:string;
   Intake_Year_Id:number;
   Intake_Year_Name:string;
   Date_Of_Applying:Date;
   Remark:string;
   Application_status_Id:number;
   Application_Status_Name:string;
   Agent_Id:number;
   Agent_Name:string;
   Activation_Status:number;
   Course_Fee:String;
   Living_Expense:String;
   Duration_Id:number;
   Duration_Name:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}
