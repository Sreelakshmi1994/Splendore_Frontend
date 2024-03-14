export class Employee_Details_Sub

{
    Users_Id:number;



    Employee_Details_Id:number;
    CL_No:string;
    Employee_Details_Name:string;
    Employee_Code:string;
    Client_Accounts_Name:string;
    Pl_No:string;
    Gender_Id:number;
    Gender_Name:string;
    Designation_Id:number;
    Designation_Name:string;
    User_Role_Id:string;
    User_Role_Name:string;
    DateOfJoin:string;
    ESI_No:string;

    Basic_Salary:string;
    HRA:string;
    DA:string;
    ESI:string;
    PF_Percentage:string;
    Account_Type_Id:number;
    Account_Type_Name:string;
    Opening_Balance:string;
    Bank_Name:string;
    Account_No:String;
    Branch_Name:string;
    IFSC_Code:string;
    ICSC_Code:string;
    Client_Accounts_Id:number;
    Address1:string;
    Address2:string;
    Address3:string;
    Address4:string;
    User_Id:number;

    PF_No :string; 
    Allowance :string;
    DateOfBirth: string;
    

    CL_Count :number; 
    PL_Count :number;
    Check_Box : boolean;

   

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}