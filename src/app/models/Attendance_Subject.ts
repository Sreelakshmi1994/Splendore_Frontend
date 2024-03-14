export class Attendance_Subject
{
    Attendance_Subject_Id :number;
    Attendance_Master_Id :number;
    Subject_Id :number;
    Subject_Name :String;
    Checkbox:boolean;
    Minimum_Mark : number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

