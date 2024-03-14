import { Student_Course_Subject } from './Student_Course_Subject'
import { Student } from './Student'
import { Student_Fees_Installment_Details } from './Student_Fees_Installment_Details'
export class Student_Course
{
Student_Course_Id:number;
Student_Id:number;
Entry_Date:Date;
Course_Name_Details:string;
Course_Id:number;
Course_Name:string;
Is_Processing_commision:boolean;
Start_Date:Date;
Is_Processing_:number;
Is_Associate_:number;
Is_Associate_commision:boolean;
End_Date:string;
End_Date_L:string;
Join_Date:Date;
By_User_Id:number;
Status:number;
Course_Type_Name:string;
Agent_Amount:number
Course_Type_Id:number;
Total_Fees:number;
Batch_Id:number;
Batch_Name:string;
Faculty_Id:number;
Faculty_Name:string;
Installment_Type_Id :number;
Installment_Type_Name :string;

Fees_Type_Id :number;
Fees_Type_Name :string;
Laptop_details_Id:number;
Laptop_details_Name:string;

No_Of_Installment :number;
// Duration :number;
Duration :string;
Old_Course_Id:number;
Student_Course_Subject:Student_Course_Subject[];
Student_Fees_Installment_Details:Student_Fees_Installment_Details[];

Reading :number;
Speaking:number;
Listening :number;
Writing:number;
Grammer:number;
TotalMark:number;
Markstatus_Id:number;
Markstatus_Name:string;

Revision_Duration:number;
Duration_Completed:number;
Revision_Duration_Completed:number;

Exam_Date_Check:boolean;
Exam_Date:string;

Duration_By_Faculty:number;
Revision_Duration_By_Faculty:number;
Registered:number;

End_Date_Check:boolean;

Offline_Branch :string;
Offline_Branch_Id :number;

Student_Selected_Details:Student[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

