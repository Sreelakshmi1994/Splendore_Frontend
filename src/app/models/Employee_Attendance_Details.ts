
export class Employee_Attendance_Details

{
    
    Attendance_Details_Id :number;
    Attendance_Master_Id :number;
    Client_Accounts_Id :number;
    Attendance_Status_Id :number;
    Store_Id :number;
    Slno :number;
    Employee_Name :string; 
    Employee_Code :string; 
    Present_Days :number; 
    Absent_Days :number;
    Check_Box : boolean;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}