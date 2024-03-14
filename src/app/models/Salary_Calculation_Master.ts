import { Salary_Calculation_Details } from "./Salary_Calculation_Details";
export class Salary_Calculation_Master
{
Salary_Calculation_Master_Id:number;
Store_Id:number;
Entry_Date:string;
Month_Year:string;
Calculation_No:string;
Users_Id:number;
Remark:string;
Store_Name:string;
Salary_Calculation_Details:Salary_Calculation_Details[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

