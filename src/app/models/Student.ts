export class Student
{
Student_Id:number;
Student_Name:string;
Address1:string;
Address2:string;
Address3:string;
Address4:string;
Pincode:string;
Phone:string;
Mobile:string;
Whatsapp:string;
DOB:string;
Gender:number;
State_Id:number;
District_Id:number;
Course_details:string;
District_Name:string;
Course_Id:number;
Course_Name:string;
Qualification_Id:number;
Email:string;
Alternative_Email:string;
Passport_No:string;
Passport_Expiry:string;
User_Name:string;
Password:string;
Photo:string;
User_Id:number;
Registration_No:string;
Role_No:string;
Enquiry_Source:number;
Enquiry_Source_Name:string;

Enquiry_For_Id:number;

Student_Followup_Id:number;
Entry_Date:Date;
Next_FollowUp_Date:Date;
// Next_FollowUp_Date:string;
FollowUp_Difference:number;
Status:number;
Status_Name:string;
By_User_Id:number;
To_User_Id:number;
By_User_Name:string;
To_User_Name:string;
Remark:string;
Remark_Id:number;
FollowUp_Type:number;
FollowUP_Time:string;
Actual_FollowUp_Date:Date;
Qualification_Name:string;
tp:number;
RowNo:number;
Count: number;
User_Status:number;
Registered_By :number;
Registered_On:Date;
Registered:boolean;
Duplicate_Found_:number;
Duplicate_Student_Name_:string;
Duplicate_User_:string;
College_Name:string;
Age:number;
Father_Name:string;
Father_Whatsapp:string;
Father_Email:string;
Mother_Name:string;
Mother_Whatsapp:string;
Mother_Email:string;
Local_Gurdian_Name:string;
Local_Gurdian_Whatsapp:string;
Local_Gurdian_Email:string;

Aadhar_Photo:boolean;
Education_Documents:boolean;
Student_Photo:boolean;

MasterCourse_Id:number;
MasterCourse_Name:string;
Check_Box_View:boolean;
Gender_Name:string;
Student_Course_Id:number;



Books_Issued_EntryDate:Date;
Books_Name:string;
Books_No:string;
Users_Name:string;

Enquiry_For :number; 
Enquiry_For_Name :string;

Registration_Fees :number; 

Admission_Branch :string;
Offline_Branch :string;
Offline_Branch_Id :number;

Admission_Branch_Id :number; 

Mode_Of_Study_Id :number;
Mode_Of_Study :string;

Mode_Of_Study_Name:string
Associates_Agent_Id:number;
Processing_Agent_Id:number;

Documents_Remark :string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

