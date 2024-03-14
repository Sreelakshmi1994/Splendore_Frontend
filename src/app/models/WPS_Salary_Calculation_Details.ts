export class WPS_Salary_Calculation_Details
{
    WPS_Salary_Calculation_Details_Id :number;
    WPS_Salary_Calculation_Master_Id :number; 
    Client_Accounts_Id :number; 
    Total_Working_Days :number;
    Salary_Per_Day :number;
    Total_Attendance :number;
    Total_Leaves :number;
    LOP :number;
    Noof_Weekly_Leaves :number;
    Noof_Leaves_Granted :number;
    Basic_Salary :number;
    DA :number;
    HRA :number;
    CCA :number;
    Gross_Monthly_Wages :number;
    Overtime_Wages :number;
    Leave_Wages :number;
    Holiday_Wages :number;
    Arrears :number;
    Bonus :number;
    Maternity_Benefit :number;
    Other_Allowance :number;
    Advance :number;
    Total_Amount :number;
    EPF_Percentage :number;
    EPF_Amount :number;
    ESI_Percentage :number;
    ESI_Amount :number;
    Advances :number;
    TDS_Percentage :number;
    TDS_Amount :number;
    Welfare_Fund :number;
    Profession_Tax_Percentage :number;
    Profession_Tax_Amount :number;
    Advance_Repayment :number;
    Deduction_Fine :number;
    Loss_Damages :number;
    Other_Deductions :number;
    Total_Deduction :number;
    Net_Pay :number;
    Remark :string;
    Salary_Status_Id:number;

    Present_Days:number;
    Absent_Days:number;
    Client_Accounts_Code:string;
    Client_Accounts_Name:string;
    Mobile:string;
    Email:string;
    Genderd:number;
    Gender_Name:string;
    Designation_Id:number;
    Designation_Code:string;
    Designation_Name:string;
    DateOfBirth:Date;
    DateOfJoin:Date;
    Bank_Name:string;
    Account_No:string;
    IFSC_Code:string;
    Request_Amount:number;
    Advance_Amount:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

