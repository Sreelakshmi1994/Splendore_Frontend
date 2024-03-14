import { Student_Import_Details } from './Student_Import_Details';
export class Student_Import
{
    By_User_Id:number;
    By_User_Name:string;
    Branch:number
    Department:number
    Status:number
    Status_Name:String
    To_User:number
    To_User_Name:string
    Enquiry_Source:number
    Enquiry_Source_Name:string
    Next_FollowUp_Date:Date
    Status_FollowUp:boolean;
    Remark:string
    
    Student_Name:string;
    Gender_Name:string;
    // Mobile:string;
    Father_Whatsapp:string;
    // Email:string;
    // Address1:string;
    MasterCourse_Id:number;
    MasterCourse_Name:string;
    Course_Id:number;
    Course_Name:string;
    Start_Date:string;
    End_Date:string;
    Join_Date:string;
    // By_User_Id:number;
    // Status:number;
    Course_Type_Id:number;
    Course_Type_Name:string;
    Agent_Amount:number;
    Total_Fees:number;
    Batch_Id :number;
    Batch_Name:string;
    Faculty_Id :number;
    Fee_Paid :number;
    Installment_Type_Id :number;
    Installment_Type_Name :string;
    Fees_Type_Id :number;
    No_Of_Installment :number;
    Duration:string; 
    Laptop_details_Id:number;
    Laptop_details_Name:string;
    Reading:number;
    Speaking :number; 
    Listening :number;
    Writing :number;
    Grammer:number;
    TotalMark :number;
    Markstatus_Id:number;
    Markstatus_Name:string;
    Revision_Duration :number;
    Duration_Completed :number;
    Revision_Duration_Completed:number;
    Course_Name_Details:string;

    Faculty_Name:string;
  
    Fees_Type_Name :string;
   
  


    Student_Import_Details: Student_Import_Details[];
    constructor(values: Object = {})  
        {
          Object.assign(this, values) 
        }
}

