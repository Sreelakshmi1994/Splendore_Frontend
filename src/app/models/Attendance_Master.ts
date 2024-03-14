import { Attendance_Details } from './Attendance_Details';
import {Attendance_Student} from './Attendance_Student'
import {Attendance_Subject} from './Attendance_Subject'
export class Attendance_Master
{
Attendance_Master_Id :number;
Course_Id :number; 
Batch_Id :number; 
Faculty_Id :number;
Duration:number;
Date:Date;
Course_Name :string; 
Batch_Name :string; 
Faculty_Name :string; 
Percentage : number;
Attendance_Student:Attendance_Student[]
Attendance_Subject:Attendance_Subject[];
Absent_Student:Attendance_Student[];
Attendance_Status:boolean;
Absent_Value:number;
Attendance_Student_Value:number;
Attendance_Subject_Value:number;
Session_Id:number;
Session_Name:string;
Description:string;
Total_Duration:number;
Revision_Duration:number;
Timing:string;


Entry_Date:string;
Branch_Id:number;
Users_Id:number;
Upload_File:string;
Store_Id:number;
From_Date:Date;
To_Date:Date;
Attendance_Details:Attendance_Details[];
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

