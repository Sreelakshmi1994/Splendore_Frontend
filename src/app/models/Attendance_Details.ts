export class Attendance_Details
{
Attendance_Details_Id:number;
Attendance_Master_Id:number;
Client_Accounts_Id:number;
Attendance_Date:string;
Start_Time:string;
End_Time:string;
Attendance_Status_Id:number;
Users_Id:number;
Store_Id:number;
Slno:number;
Upload_File:string;
Employee_Code:string;
Employee_Name:string;
Present_Days:Date;
Absent_Days:Date;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

