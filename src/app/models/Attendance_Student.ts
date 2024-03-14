export class Attendance_Student
{
    Attendance_Student_Id :number;
    Attendance_Master_Id :number;
    Student_Id :number;
    Student_Name :String;
    Check_Box:boolean;
    Father_Name:string;
    Father_Whatsapp:string;
    Date:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

