import { Employee_Attendance_Details } from "./Employee_Attendance_Details";

export class Employee_Attendance_Master

{
Attendance_Master_Id :number; 
Users_Id :number;  
From_Date :Date;  
To_Date :Date;  
From_Date1 :Date;  
To_Date1:Date;  
Store_Id :number;  

Employee_Attendance_Details_:Employee_Attendance_Details[];

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}