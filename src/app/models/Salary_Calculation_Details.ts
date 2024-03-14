export class Salary_Calculation_Details
{
    Salary_Calculation_Details_Id : number ; 
    Salary_Calculation_Master_Id : number ; 
    Client_Accounts_Id : number ; 
    Basic_Salary : number ;
    Total_Working_Days : number ;
    Salary_Per_Day : number ;
    Total_Attendance : number ;
    Total_Leaves : number ;
    LOP : number ;
    Leave_Amount : number ;
    Mediclaim : number ;
    Excess_Deduction : number ;
    Advance_Amount : number ;
    Loan_Amount : number ;
    ESI_Salary : number ;
    ESI_Percentage : number ;
    ESI_Amount : number ;
    PF_Salary : number ;
    PF_Percentage : number ;
    PF_Amount : number ;
    Total_Amount : number ;
    CL_Count:number;
    PL_Count:number;
    Present_Days:number;
    Absent_Days:number;
    Client_Accounts_Code:string;
    Client_Accounts_Name:string;
    Mobile:string;
    Email:string;
    Genderd:number;
    Gender_Name:string;
    Department_Id:number;
    Department_Name:string;
    DateOfBirth:Date;
    DateOfJoin:Date;
    Bank_Name:string;
    Parent_Name:string;
    Account_No:string;
    IFSC_Code:string;
    Search_DateOfBirth:Date;
    UAN_No:string;
    Search_DateOfJoin:Date;
    ESI_No:string;
    Designation_Name:string;
    Remarks:string;
    Bank_Id:number;

    Attendance_Status_Id:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}