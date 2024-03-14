import { Component, OnInit, Input, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.js";
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { AnimationKeyframesSequenceMetadata } from "@angular/animations";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

@Injectable({
	providedIn: "root",
})
export class Student_Service {
	constructor(private http: HttpClient) {
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/json",
			}),
		};
	}
	AnimationKeyframesSequenceMetadata;
	// Save_Student(Student_)
	// {
	// return this.http.post(environment.BasePath +'Student/Save_Student/',Student_);
	// }
	private extractData(res: Response) {
		let body = res;
		return body || {};
	}
	fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

	fileExtension = ".xlsx";
	public exportExcel(jsonData: any[], fileName: string): void {
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
		const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer: any = XLSX.write(wb, {
			bookType: "xlsx",
			type: "array",
		});
		this.saveExcelFile(excelBuffer, fileName);
	}
	private saveExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], { type: this.fileType });
		FileSaver.saveAs(data, fileName + this.fileExtension);
	}
	Save_Student(Main_Array, ImageFile_Photo: File[]) {
		const postData = new FormData();
debugger
		if (Main_Array.Student != null) {
			postData.append("Student_Id_Student", Main_Array.Student.Student_Id);
			postData.append("Student_Name", Main_Array.Student.Student_Name);
			postData.append("Address1", Main_Array.Student.Address1);
			postData.append("Address2", Main_Array.Student.Address2);
			postData.append("Address3", Main_Array.Student.Address3);
			postData.append("Address4", Main_Array.Student.Address4);
			postData.append("Pincode", Main_Array.Student.Pincode);
			postData.append("Phone", Main_Array.Student.Phone);
			postData.append("Mobile", Main_Array.Student.Mobile);
			postData.append("Whatsapp", Main_Array.Student.Whatsapp);
			postData.append("DOB", Main_Array.Student.DOB);
			postData.append("Gender", Main_Array.Student.Gender);
			postData.append("Email", Main_Array.Student.Email);
			// postData.append(
			// 	"Alternative_Email",
			// 	Main_Array.Student.Alternative_Email
			// );
			postData.append("Passport_No", Main_Array.Student.Passport_No);
			postData.append("Passport_Expiry", Main_Array.Student.Passport_Expiry);
			postData.append("User_Name", Main_Array.Student.User_Name);
			postData.append("Password", Main_Array.Student.Password);
			postData.append("Photo", Main_Array.Student.Photo);
			postData.append("User_Id", Main_Array.Student.User_Id);
			postData.append("Registration_No", Main_Array.Student.Registration_No);
			postData.append("Role_No", Main_Array.Student.Role_No);
			postData.append("Resume", Main_Array.Student.Resume);
			postData.append("Enquiry_Source", Main_Array.Student.Enquiry_Source);
			// postData.append("State_Id", Main_Array.Student.State_Id);
			postData.append("District_Id", Main_Array.Student.District_Id);
			// postData.append("Course_Id", Main_Array.Student.Course_Id);
			postData.append("Qualification_Id", Main_Array.Student.Qualification_Id);
			// postData.append("District_Name", Main_Array.Student.District_Name);
			postData.append("Course_Name", Main_Array.Student.Course_Name);
			// postData.append("Course_Name", Main_Array.Student.Course_Name);
			postData.append(
				"Qualification_Name",
				Main_Array.Student.Qualification_Name
			);
			// postData.append("College_Name", Main_Array.Student.College_Name);
			postData.append("Age", Main_Array.Student.Age);
			postData.append("Father_Name", Main_Array.Student.Father_Name);
			postData.append("Father_Whatsapp", Main_Array.Student.Father_Whatsapp);
			postData.append("Father_Email", Main_Array.Student.Father_Email);
			postData.append("Mother_Name", Main_Array.Student.Mother_Name);
			postData.append("Mother_Whatsapp", Main_Array.Student.Mother_Whatsapp);
			postData.append("Mother_Email", Main_Array.Student.Mother_Email);
			postData.append("Local_Gurdian_Name", Main_Array.Student.Local_Gurdian_Name);
			postData.append("Local_Gurdian_Whatsapp", Main_Array.Student.Local_Gurdian_Whatsapp);
			postData.append("Local_Gurdian_Email", Main_Array.Student.Local_Gurdian_Email);
			postData.append("Enquiry_Source_Name", Main_Array.Student.Enquiry_Source_Name);

			postData.append("Aadhar_Photo", Main_Array.Student.Aadhar_Photo);
			postData.append("Education_Documents", Main_Array.Student.Education_Documents);
			postData.append("Student_Photo", Main_Array.Student.Student_Photo);

			postData.append("MasterCourse_Id", Main_Array.Student.MasterCourse_Id);
			postData.append("MasterCourse_Name", Main_Array.Student.MasterCourse_Name);

			postData.append("Enquiry_For_Id", Main_Array.Student.Enquiry_For);
			postData.append("Enquiry_For_Name", Main_Array.Student.Enquiry_For_Name);

			postData.append("Admission_Branch_Id", Main_Array.Student.Admission_Branch_Id);
			postData.append("Admission_Branch", Main_Array.Student.Admission_Branch);

			postData.append("Mode_Of_Study_Id", Main_Array.Student.Mode_Of_Study_Id);
			postData.append("Mode_Of_Study", Main_Array.Student.Mode_Of_Study);



			postData.append("Associates_Agent_Id", Main_Array.Student.Associates_Agent_Id);
			
			postData.append("Processing_Agent_Id", Main_Array.Student.Processing_Agent_Id);

			postData.append("Documents_Remark", Main_Array.Student.Documents_Remark);


		}

		if (Main_Array.Followup != null) {
			postData.append(
				"Student_Followup_Id",
				Main_Array.Followup.Student_Followup_Id
			);
			postData.append("Student_Id", Main_Array.Followup.Student_Id);
			postData.append("Entry_Date", Main_Array.Followup.Entry_Date);
			postData.append(
				"Next_FollowUp_Date",
				Main_Array.Followup.Next_FollowUp_Date
			);
			postData.append(
				"FollowUp_Difference",
				Main_Array.Followup.FollowUp_Difference
			);
			postData.append("Status", Main_Array.Followup.Status);
			postData.append("By_User_Id", Main_Array.Followup.By_User_Id);
			postData.append("To_User_Id", Main_Array.Followup.To_User_Id);
			postData.append("Remark", Main_Array.Followup.Remark);
			postData.append("Remark_Id", Main_Array.Followup.Remark_Id);
			postData.append("FollowUp_Type", Main_Array.Followup.FollowUp_Type);
			postData.append("FollowUP_Time", Main_Array.Followup.FollowUP_Time);
			postData.append(
				"Actual_FollowUp_Date",
				Main_Array.Followup.Actual_FollowUp_Date
			);
			postData.append("FollowUp", Main_Array.Followup.FollowUp);
			postData.append("Status_Name", Main_Array.Followup.Status_Name);
			postData.append("To_User_Name", Main_Array.Followup.To_User_Name);
			postData.append("By_User_Name", Main_Array.Followup.By_User_Name);
		}
		var i = 0;
		if (ImageFile_Photo != undefined) {
			for (const img of ImageFile_Photo) {
				postData.append("myFile", img);
				postData.append("ImageFile_Photo", i.toString());
				i = i + 1;
			}
		}
		return this.http.post(
			environment.BasePath + "Student/Save_Student",
			postData
		);
	}
	Search_Student(
		Search_FromDate,
		Search_ToDate,
		Search_Name,
		By_User_,
		Status_Id_,
		Look_In_Date,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount_,
		RowCount2_,
		Register_Value,
		Qualification_Id,
		Course_Id,
		Batch_Id,
		Enquiry_For_Id,
	): Observable<any> {
		var Search_Data = {
			From_Date_: Search_FromDate,
			To_Date_: Search_ToDate,
			SearchbyName_: Search_Name,
			By_User_: By_User_,
			Status_Id_: Status_Id_,
			Is_Date_Check_: Look_In_Date,
			Page_Index1_: Page_Index1_,
			Page_Index2_: Page_Index2_,
			Login_User_Id_: Login_User_Id_,
			RowCount: RowCount_,
			RowCount2: RowCount2_,
			Register_Value: Register_Value,
			Qualification_Id: Qualification_Id,
			Course_Id: Course_Id,
			Batch_Id:Batch_Id,
			Enquiry_For_Id:Enquiry_For_Id,
		};
		return this.http.get(environment.BasePath + "Student/Search_Student/", {
			params: Search_Data,
		});
	}
	
	Delete_Student(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Delete_Student/" + Student_Id
		);
	}
	Get_Student(Student_Id) {
		debugger
		return this.http.get(
			environment.BasePath + "Student/Get_Student/" + Student_Id
		);
	}


	Search_Batch_Report(
        Is_Date_,
        From_Date_,
        To_Date_,
        Batch_,
        Faculty_,
        User_Id_
    ): Observable<any> {
        var Search_Data = {
            Is_Date_: Is_Date_,
            From_Date_: From_Date_,
            To_Date_: To_Date_,
            Batch_: Batch_,
            Faculty_: Faculty_,
            User_Id_: User_Id_,
        };
        return this.http.get(
            environment.BasePath + "Student/Search_Batch_Report/",
            { params: Search_Data }
        );
    }

	Search_Status_Typeahead(Status_Name, Group_Id): Observable<any> {
		var Search_Data = { Status_Name: Status_Name, Group_Id: Group_Id };
		return this.http.get(
			environment.BasePath + "Student/Search_Status_Typeahead/",
			{ params: Search_Data }
		);
	}
	Search_Users_Typeahead(Users_Name): Observable<any> {
		var Search_Data = { Users_Name: Users_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_Users_Typeahead/",
			{ params: Search_Data }
		);
	}

	Search_Faculty_Typeahead(Users_Name,Role_Type): Observable<any> {
		var Search_Data = { Users_Name: Users_Name,Role_Type:Role_Type };
		return this.http.get(
			environment.BasePath + "Student/Search_Faculty_Typeahead/",
			{ params: Search_Data }
		);
	}
	Search_Typeahead_Loadfaculty(Users_Name): Observable<any> {
		var Search_Data = { Users_Name: Users_Name};
		return this.http.get(
			environment.BasePath + "Student/Search_Typeahead_Loadfaculty/",
			{ params: Search_Data }
		);
	}
	Search_Application_Outstanding_Report(
	
		From_Date_,
		To_Date_,
	
	): Observable<any> {
		var Search_Data = {
			From_Date_: From_Date_,
			To_Date_: To_Date_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Application_Outstanding_Report/",
			{ params: Search_Data }
		);
	}


	Search_Employee_Attendance_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Employee_Attendance_Report/",
			{ params: Search_Data }
		);
	}



	Search_Employees_List(
		Is_Date_,
		From_Date_,
		To_Date_,User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_:User_Id_
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Employees_List/",
			{ params: Search_Data }
		);
	}



	Load_Gender(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Gender/");
	}


	Load_Document_Type(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Document_Type/");
	}


	Load_Attendance_Status(): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Load_Attendance_Status/"
		);
	}
 
	Load_Enquiry_Source(): Observable<any> {
		debugger
		
		return this.http.get(environment.BasePath + "Student/Load_Enquiry_Source/");
	}
	
	Load_Enquiry_For(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Enquiry_For/");
	}
	Load_State(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_State/");
	}
	Load_Qualification(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Qualification/");
	}
	Search_State_District_Typeahead(District_Name, State_Id): Observable<any> {
		var Search_Data = { District_Name: District_Name, State_Id: State_Id };
		return this.http.get(
			environment.BasePath + "Student/Search_State_District_Typeahead/",
			{ params: Search_Data }
		);
	}
	Load_Student_Search_Dropdowns(Group_Id) {
		return this.http.get(
			environment.BasePath + "Student/Load_Student_Search_Dropdowns/" + Group_Id
		);
		
	}
	Get_Last_Followup(Users_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_Last_Followup/" + Users_Id
		);
	}
	Get_FollowUp_Details(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_FollowUp_Details/" + Student_Id
		);
	}
	Followup_History(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_FollowUp_History/" + Student_Id
		);
	}
	Register_Student(Student_Id, User_Id,Registration_Fees,Enquiry_For_Id) {
		debugger;
		return this.http.get(			
			environment.BasePath +
				"Student/Register_Student/" +
				Student_Id +
				"/" +
				User_Id +
				"/" +
				Registration_Fees +
				"/" +
				Enquiry_For_Id
		);
	}
	Remove_Registration(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Remove_Registration/" + Student_Id
		);
	}
	Send_Sms(Mobile_, Sms) {
		return this.http.get(
			environment.BasePath + "Student/Send_Sms/" + Mobile_ + "/" + Sms
		);
	}

	Send_course_Email(Mobile_, Email_, Sms, Student_Name, Course_Name) {
		return this.http.get(
			environment.BasePath +
				"Student/Send_course_Email/" +
				Mobile_ +
				"/" +
				Email_ +
				"/" +
				Sms +
				"/" +
				Student_Name +
				"/" +
				Course_Name
		);
	}

	Send_Receipt_Sms_Email(
		Mobile_,
		Email_,
		Sms,
		Student_Name,
		Amount_,
		Date_,
		Total_Amount_,
		Instalment_Date_,
		BalanceAmount_
	) {
		
		return this.http.get(
			environment.BasePath +
				"Student/Send_Receipt_Sms_Email/" +
				Mobile_ +
				"/" +
				Email_ +
				"/" +
				Sms +
				"/" +
				Student_Name +
				"/" +
				Amount_ +
				"/" +
				Date_ +
				"/" +
				Total_Amount_ +
				"/" +
				Instalment_Date_ +
				"/" +
				BalanceAmount_
		);
	}
	Send_Sms_Email(Mobile_, Email_, Sms, Student_Name) {
		return this.http.get(
			environment.BasePath +
				"Student/Send_Sms_Email/" +
				Mobile_ +
				"/" +
				Email_ +
				"/" +
				Sms +
				"/" +
				Student_Name
		);
	}
	
	Search_Course_Typeahead(Course_Name): Observable<any> {
		var Search_Data = { Course_Name: Course_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_Course_Typeahead/",
			{ params: Search_Data }
		);
	}
	Search_Company_Typeahead(Company_Name): Observable<any> {
		var Search_Data = { Company_Name: Company_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_Company_Typeahead/",
			{ params: Search_Data }
		);
	}

	Search_District_Typeahead(District_Name): Observable<any> {
		var Search_Data = { District_Name: District_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_District_Typeahead/",
			{ params: Search_Data }
		);
	}

	Search_Batch_Typeahead(Batch_Name): Observable<any> {
		debugger
		var Search_Data = { Batch_Name: Batch_Name };
		return this.http.get(
			environment.BasePath + "Student/Search_Batch_Typeahead/",
			{ params: Search_Data }
		);
	}

	Search_Batch_Typeahead_1(Batch_Name, Course_Id): Observable<any> {
		var Search_Data = { Batch_Name: Batch_Name, Course_Id: Course_Id };
		return this.http.get(
			environment.BasePath + "Student/Search_Batch_Typeahead_1/",
			{ params: Search_Data }
		);
	}
	Get_Course_Student(Course_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_Course_Student/" + Course_Id
		);
	}
	Get_Student_Course(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_Student_Course/" + Student_Id
		);
	}
	Get_Student_Course_Click(Student_Id,Student_Course_Id, Course_Id) {
		return this.http.get(
			environment.BasePath +
				"Student/Get_Student_Course_Click/" +
				Student_Id +
				"/" +
				Student_Course_Id +
				"/" +
				Course_Id 
		);
	}


	Get_Student_LastCourse_Click(Student_Id, Course_Id, Fees_Type_Id) {
		return this.http.get(
			environment.BasePath +
				"Student/Get_Student_LastCourse_Click/" +
				Student_Id +
				"/" +
				Course_Id +
				"/" +
				Fees_Type_Id
		);
	}






	Save_Student_Course(Student_Course_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Student_Course/",
			Student_Course_
		);
	}
	Search_Subject_Course_Typeahead(Subject_Name, Course_Id): Observable<any> {
		var Search_Data = { Subject_Name: Subject_Name, Course_Id: Course_Id };
		return this.http.get(
			environment.BasePath + "Student/Search_Subject_Course_Typeahead/",
			{ params: Search_Data }
		);
	}

	Get_Installment_Details(Installment_Type_Id, Course_Id): Observable<any> {debugger
		var Search_Data = {
			Installment_Type_Id: Installment_Type_Id,
			Course_Id: Course_Id,
		};
		return this.http.get(
			environment.BasePath + "Student/Get_Installment_Details/",
			{ params: Search_Data }
		);
	}

	Load_Exam_Status() {
		return this.http.get(environment.BasePath + "Student/Load_Exam_Status/");
	}
	Save_Mark_List_Master(Mark_List_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Mark_List_Master/",
			Mark_List_Master_
		);
	}
	Get_Student_Mark_List(Student_Id) {
		return this.http.get(
			environment.BasePath + "Student/Get_Student_Mark_List/" + Student_Id
		);
	}
	Load_Mode(): Observable<any> {
		return this.http.get(environment.BasePath + "Agent/Load_Mode/");
	}

	Load_Markstatus(): Observable<any> {
		return this.http.get(environment.BasePath + "Agent/Load_Markstatus/");
	}

	Load_Laptopdetails(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Load_Laptopdetails/");
	}


	Load_Installment_Type(): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Load_Installment_Type/"
		);
	}
	Accounts_Typeahead(
		Account_Group_Id_,
		Client_Accounts_Name_
	): Observable<any> {
		var Search_Data = {
			Account_Group_Id_: Account_Group_Id_,
			Client_Accounts_Name_: Client_Accounts_Name_,
		};
		return this.http.get(environment.BasePath + "Agent/Accounts_Typeahead/", {
			params: Search_Data,
		});
	}
	Save_Student_Receipt_Voucher(Receipt_Voucher_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Student_Receipt_Voucher/",
			Receipt_Voucher_
		);
	}
	Get_Student_Receipt_History(Student_Id_, Course_Id_) {
		return this.http.get(
			environment.BasePath +
				"Student/Get_Student_Receipt_History/" +
				Student_Id_ +
				"/" +
				Course_Id_
		);
	}
	Delete_Receipt_Voucher(Receipt_Voucher_Id) {
		return this.http.get(
			environment.BasePath +
				"Student/Delete_Student_Receipt_Voucher/" +
				Receipt_Voucher_Id
		);
	}

	Save_Attendance(Attendance_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Attendance/",
			Attendance_Master_
		);
	}

	Save_Employee_Attendance(Employee_Attendance_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Employee_Attendance/",
			Employee_Attendance_Master_
		);
	}


	Search_Attendance(Batch_, Faculty_): Observable<any> {
		debugger
		var Search_Data = { Batch_: Batch_, Faculty_: Faculty_ };
		return this.http.get(environment.BasePath + "Student/Search_Attendance/", {
			params: Search_Data,
		});
	}
	Search_Attendance_Report(
		From_Date_,
		To_Date_,
		Faculty_Id_,
		Course_,
		Batch_,
		Attendance_Status_Id,
		User_Id_,
		SearchbyName_,
	): Observable<any> {
		var Search_Data = {
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Faculty_Id_: Faculty_Id_,
			Course_: Course_,
			Batch_: Batch_,
			Attendance_Status_Id: Attendance_Status_Id,
			User_Id_: User_Id_,
			SearchbyName_:SearchbyName_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Attendance_Report/",
			{ params: Search_Data }
		);
	}
	Search_Fees_Outstanding_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Batch_,
		Search_Name,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Batch_: Batch_,
			SearchbyName_: Search_Name,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Fees_Outstanding_Report/",
			{ params: Search_Data }
		);
	}
	Search_Fees_Collection_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Login_User_,
		Mode_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Login_User_: Login_User_,
			Mode_: Mode_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Fees_Collection_Report/",
			{ params: Search_Data }
		);
	}
	Search_Admission_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Login_User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Login_User_Id_: Login_User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Admission_Report/",
			{ params: Search_Data }
		);
	}
	Search_Lead_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Enquiry_Source_,
		Login_User_,
		User_Id_,
		status_,
		Course_Id_,
		Enquiry_For_Id_
	): Observable<any> {
		debugger
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Enquiry_Source_: Enquiry_Source_,
			Login_User_: Login_User_,
			User_Id_: User_Id_,
			status_: status_,
			Course_Id_: Course_Id_,
			Enquiry_For_Id_:Enquiry_For_Id_,
		};
		return this.http.get(environment.BasePath + "Student/Search_Lead_Report/", {
			params: Search_Data,
		});
	}
	Save_Transaction(Transaction_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Transaction/",
			Transaction_Master_
		);
	}
	Search_Transaction(Course_, Portion_Covered_): Observable<any> {
		var Search_Data = { Course_: Course_, Portion_Covered_: Portion_Covered_ };
		return this.http.get(environment.BasePath + "Student/Search_Transaction/", {
			params: Search_Data,
		});
	}
	Save_Interview(Interview_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Interview/",
			Interview_Master_
		);
	}
	Search_Interview(Is_Date_, From_Date_, To_Date_, Course_): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
		};
		return this.http.get(environment.BasePath + "Student/Search_Interview/", {
			params: Search_Data,
		});
	}
	Save_Placed(Placed_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Placed/",
			Placed_Master_
		);
	}
	Search_Placed(Is_Date_, From_Date_, To_Date_, Course_): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
		};
		return this.http.get(environment.BasePath + "Student/Search_Placed/", {
			params: Search_Data,
		});
	}
	Search_Placed_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Company_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Company_: Company_,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Placed_Report/",
			{ params: Search_Data }
		);
	}
	Search_Interview_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Company_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Company_: Company_,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Interview_Report/",
			{ params: Search_Data }
		);
	}
	Search_Transaction_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Company_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Company_: Company_,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Transaction_Report/",
			{ params: Search_Data }
		);
	}
	Get_Dashboard_Count(Login_User_Id_,From_Date_,
		To_Date_,): Observable<any> {debugger
			
		return this.http.get(
			environment.BasePath + "Student/Get_Dashboard_Count/" + Login_User_Id_ 	+ "/" + From_Date_  +	"/" + To_Date_
		);
	}
	Search_Registration_Report(
		Search_FromDate,
		Search_ToDate,
		value,
		Search_Name,
		Status_Id,
		User_Id,
		Look_In_Date,
		Page_Index1_,
		Page_Index2_,
		Login_User_Id_,
		RowCount_,
		RowCount2_,
		Enquiry_For_Id_
	): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/Search_Registration_Report/" +
				Search_FromDate +
				"/" +
				Search_ToDate +
				"/" +
				value +
				"/" +
				Search_Name +
				"/" +
				Status_Id +
				"/" +
				User_Id +
				"/" +
				Look_In_Date +
				"/" +
				Page_Index1_ +
				"/" +
				Page_Index2_ +
				"/" +
				Login_User_Id_ +
				"/" +
				RowCount_ +
				"/" +
				RowCount2_+
				"/" +
				Enquiry_For_Id_
		);
	}
	Search_Attendance_Student(
		Is_Date_,
		From_Date_,
		To_Date_,
		 
		Batch_,
		Faculty_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			 
			Batch_: Batch_,
			Faculty_: Faculty_,
		};
		debugger
		return this.http.get(
			environment.BasePath + "Student/Search_Attendance_Student/",
			{ params: Search_Data }
		);
	}





	Search_Employee_Attendance(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Employee_Attendance/",
			{ params: Search_Data }
		);
	}






	Get_Attendance(
		Attendance_Master_Id_,
 
		Batch_,
		Faculty_Id_
	): Observable<any> {
		var Search_Data = {
			Attendance_Master_Id_: Attendance_Master_Id_,
		 
			Batch_: Batch_,
			Faculty_: Faculty_Id_,
		};
		debugger
		return this.http.get(environment.BasePath + "Student/Get_Attendance/", {
			params: Search_Data,
		});
	}


	
	Get_Employee_Attendance(
		Attendance_Master_Id_,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Attendance_Master_Id_: Attendance_Master_Id_,
			User_Id_: User_Id_,
		};
		return this.http.get(environment.BasePath + "Student/Get_Employee_Attendance/", {
			params: Search_Data,
		});
	}



	Search_Transaction_Student(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Faculty_,
		Employer_Details_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Faculty_: Faculty_,
			Employer_Details_Id_: Employer_Details_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Transaction_Student/",
			{ params: Search_Data }
		);
	}
	Get_Transaction(Transaction_Master_Id_, Course_): Observable<any> {
		var Search_Data = {
			Transaction_Master_Id_: Transaction_Master_Id_,
			Course_: Course_,
		};
		return this.http.get(environment.BasePath + "Student/Get_Transaction/", {
			params: Search_Data,
		});
	}
	Search_Interview_Student(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Faculty_,
		Employer_Details_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Faculty_: Faculty_,
			Employer_Details_Id_: Employer_Details_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Interview_Student/",
			{ params: Search_Data }
		);
	}
	Get_Interview(Interview_Master_Id_, Course_): Observable<any> {
		var Search_Data = {
			Interview_Master_Id_: Interview_Master_Id_,
			Course_: Course_,
		};
		return this.http.get(environment.BasePath + "Student/Get_Interview/", {
			params: Search_Data,
		});
	}
	Search_Placed_Student(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Faculty_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Faculty_: Faculty_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Placed_Student/",
			{ params: Search_Data }
		);
	}
	Get_Placed(Placed_Master_Id_, Course_): Observable<any> {
		var Search_Data = {
			Placed_Master_Id_: Placed_Master_Id_,
			Course_: Course_,
		};
		return this.http.get(environment.BasePath + "Student/Get_Placed/", {
			params: Search_Data,
		});
	}
	Load_Employer_Details(): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Load_Employer_Details/"
		);
	}
	Pending_FollowUp(User_Id, Login_User): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/Pending_FollowUp/" +
				User_Id +
				"/" +
				Login_User
		);
	}
	FollowUp_Summary(User_Id, Login_User_): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/FollowUp_Summary/" +
				User_Id +
				"/" +
				Login_User_
		);
	}
	Get_Lead_Load_Data(): Observable<any> {
		return this.http.get(environment.BasePath + "Student/Get_Lead_Load_Data1/");
	}

	Get_Menu_Status(Menu_Id_, Login_User_) {
		return this.http.get(
			environment.BasePath +
				"Users/Get_Menu_Status/" +
				Menu_Id_ +
				"/" +
				Login_User_
		);
	}
	Get_Lead_Load_Data_ByUser(Login_User): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Get_Lead_Load_Data_ByUser/" + Login_User
		);
	}
	Get_Course_Details_Student_Check(Student_Id_): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/Get_Course_Details_Student_Check/" +
				Student_Id_
		);
	}
	Search_Fees_Due_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		Course_,
		Batch_,
		Search_Name,
		User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			Course_: Course_,
			Batch_: Batch_,
			SearchbyName_: Search_Name,
			User_Id_: User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Fees_Due_Report/",
			{ params: Search_Data }
		);
	}
	Load_Interview_Student(Transaction_Master_id_): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/Load_Interview_Student/" +
				Transaction_Master_id_
		);
	}
	Load_Placement_Student(Interview_Master_Id_): Observable<any> {
		return this.http.get(
			environment.BasePath +
				"Student/Load_Placement_Student/" +
				Interview_Master_Id_
		);
	}
	Get_Load_Dropdowns_Data(): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Get_Load_Dropdowns_Data/"
		);
	}

	Search_Transaction_Report_Tab(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Student_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Student_Id_: Student_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Transaction_Report_Tab/",
			{ params: Search_Data }
		);
	}

	Search_Interview_Report_Tab(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Student_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Student_Id_: Student_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Interview_Report_Tab/",
			{ params: Search_Data }
		);
	}

	Search_Placed_Report_Tab(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Student_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Student_Id_: Student_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Placed_Report_Tab/",
			{ params: Search_Data }
		);
	}

	Save_Student_Report_FollowUp(Student_Followup_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Student_Report_FollowUp/",
			Student_Followup_
		);
	}
	Get_Agentdetails_print(User_Id_) {
		return this.http.get(
			environment.BasePath + "Agent/Get_Agentdetails_print/" + User_Id_
		);
	}

	Get_Companydetails() {
		return this.http.get(environment.BasePath + "Company/Get_Companydetails/");
	}
	Search_Course_Report(
		Is_Date_,
		From_Date_,
		To_Date_,
		User_Id_,
		Login_User_Id_
	): Observable<any> {
		var Search_Data = {
			Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
			User_Id_: User_Id_,
			Login_User_Id_: Login_User_Id_,
		};
		return this.http.get(
			environment.BasePath + "Student/Search_Course_Report/",
			{ params: Search_Data }
		);
	}
	Save_Hostel_Fees(Hostel_Fees_Master_) {
		return this.http.post(
			environment.BasePath + "Student/Save_Hostel_Fees/",
			Hostel_Fees_Master_
		);
	}

	Get_Totalportioncovered(Course_Id_, Batch_Id_,Login_User_Id_): Observable<any> {
		var Search_Data = {
			Course_Id_: Course_Id_,
			Batch_Id_: Batch_Id_,
			Login_User_Id_:Login_User_Id_,
		};
		return this.http.get(environment.BasePath + "Student/Get_Totalportioncovered/", {
			params: Search_Data,
		});
	}

	Load_Exam(): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Load_Exam/"
		);
	}
	Load_ExamType(): Observable<any> {
		return this.http.get(
			environment.BasePath + "Student/Load_ExamType/"
		);
	}

	Save_ExamResult(ExamResult_)
{
return this.http.post(environment.BasePath +'Student/Save_ExamResult/',ExamResult_);}


Get_ExamResult(Student_Id,Student_Course_Id)
{
 return this.http.get(environment.BasePath +'Student/Get_ExamResult/'+Student_Id + "/" + Student_Course_Id);}


 Get_Hosteldetails(Student_Id)
{
 return this.http.get(environment.BasePath +'Student/Get_Hosteldetails/'+Student_Id);}



 Get_Hostelfeesdetails(Hostel_Fees_Master_Id)
 {
  return this.http.get(environment.BasePath +'Student/Get_Hostelfeesdetails/'+Hostel_Fees_Master_Id);}
 

 Delete_ExamResult(Exam_Result_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_ExamResult/'+Exam_Result_Id);}


 Delete_Hosteldetails(Hostel_Fees_Master_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_Hosteldetails/'+Hostel_Fees_Master_Id);}


 Search_Course_Typeahead_Formastercourse(Course_Name,MasterCourse_Id): Observable<any> {
	var Search_Data = { Course_Name: Course_Name,MasterCourse_Id:MasterCourse_Id};
	return this.http.get(
		environment.BasePath + "Student/Search_Course_Typeahead_Formastercourse/",
		{ params: Search_Data }
	);
}
Search_Course_Typeahead_Forcandidatelist(Course_Name): Observable<any> {
	var Search_Data = { Course_Name: Course_Name};
	return this.http.get(
		environment.BasePath + "Student/Search_Course_Typeahead_Forcandidatelist/",
		{ params: Search_Data }
	);
}

Search_CandidateList(
	Is_Date_,
	From_Date_,
	To_Date_,
	Login_User_,
	User_Id_,
	Course_Id_,
	Batch_Id_,
	ReadingSearch_,
	SpeakingSearch_,
	ListeningSearch_,
	WritingSearch_,
	GrammerSearch_,
	Markstatus_Id_,
	Markvalue_,
	Markfrom_,
	Markto_,

): Observable<any> {
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		Login_User_: Login_User_,
		User_Id_: User_Id_,
		Course_Id_: Course_Id_,
		Batch_Id_:Batch_Id_,
		ReadingSearch_:ReadingSearch_,
		SpeakingSearch_:SpeakingSearch_,
		ListeningSearch_:ListeningSearch_,
		WritingSearch_:WritingSearch_,
		GrammerSearch_:GrammerSearch_,
		Markstatus_Id_:Markstatus_Id_,
		Markvalue_:Markvalue_,
		Markfrom_:Markfrom_,
		Markto_:Markto_

	};
	return this.http.get(environment.BasePath + "Student/Search_CandidateList/", {
		params: Search_Data,
	});
}

Save_Student_Course_Candidatelist(Student_Course_) {
	return this.http.post(
		environment.BasePath + "Student/Save_Student_Course_Candidatelist/",
		Student_Course_
	);
}



Search_StudentMark_Report(
	Is_Date_,
	From_Date_,
	To_Date_,
	User_Id_,
	Login_User_Id_,
	Batch_Id_,
	Course_Id_,
	Markstatus_Id_,
	Markvalue_,
	Markfrom_,
	Markto_,Exam_Id_,Exam_Type_Id_,
): Observable<any> {
	debugger
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		User_Id_: User_Id_,
		Login_User_Id_: Login_User_Id_,
		Batch_Id_: Batch_Id_,
		Course_Id_: Course_Id_,
		Markstatus_Id_:Markstatus_Id_,
		Markvalue_:Markvalue_,
		Markfrom_:Markfrom_,
		Markto_:Markto_,
		Exam_Id_:Exam_Id_,
		Exam_Type_Id_:Exam_Type_Id_


	};
	return this.http.get(
		environment.BasePath + "Student/Search_StudentMark_Report/",
		{ params: Search_Data }
	);
}

Delete_Attendancereportdata(Attendance_Master_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_Attendancereportdata/'+Attendance_Master_Id);}
 Save_Student_Remark(Student_Remark_) {
	return this.http.post(
		environment.BasePath + "Student/Save_Student_Remark/",
		Student_Remark_
	);
}
Save_Student_Process(Student_Process_) {
	return this.http.post(
		environment.BasePath + "Student/Save_Student_Process/",
		Student_Process_
	);
}
Delete_Employee_Attendance(Attendance_Master_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_Employee_Attendance/'+Attendance_Master_Id);}


 Get_Student_Process_History(Student_Id_) {
	return this.http.get(
		environment.BasePath +
			"Student/Get_Student_Process_History/" +
			Student_Id_ 
	);
}
Get_Student_Remark_History(Student_Id_) {
	return this.http.get(
		environment.BasePath +
			"Student/Get_Student_Remark_History/" +
			Student_Id_ 
	);
}
Delete_Student_Remark(Student_Remark_Id_) {
	return this.http.get(
		environment.BasePath +
			"Student/Delete_Student_Remark/" +
			Student_Remark_Id_
	);
}
Delete_Student_Process(Student_Process_Id_) {
	debugger
	return this.http.get(
		environment.BasePath +
			"Student/Delete_Student_Process/" +
			Student_Process_Id_
	);
}

// Search_ExamResult_Report(Student_Id_,Exam_Type_Id_): Observable<any> {
// 	return this.http.get(

// 		environment.BasePath +
// 			"Student/Search_ExamResult_Report/" +
// 			Student_Id_ + "/" + Exam_Type_Id_
// 	);
// }

Search_ExamResult_Report(Student_Id_,Exam_Type_Id_,Student_Course_Id_,Course_Id_):Observable<any>
{
var Search_Data={'Student_Id_':Student_Id_,'Exam_Type_Id_':Exam_Type_Id_,'Student_Course_Id_':Student_Course_Id_,'Course_Id_':Course_Id_}
 return this.http.get(environment.BasePath +'Student/Search_ExamResult_Report/',{params:Search_Data});}


 Search_ExamResult_GraphReport(Student_Id_,Exam_Type_Id_):Observable<any>
{
var Search_Data={'Student_Id_':Student_Id_,'Exam_Type_Id_':Exam_Type_Id_}
 return this.http.get(environment.BasePath +'Student/Search_ExamResult_GraphReport/',{params:Search_Data});}


 Get_Marklistreport_Studentdetails(Student_Id,Student_Course_Id,Course_Id)
 {
  return this.http.get(environment.BasePath +'Student/Get_Marklistreport_Studentdetails/'+Student_Id +"/"+Student_Course_Id+"/"+Course_Id);}
 
//   Save_Books(Books_)
//   {
//   return this.http.post(environment.BasePath +'Books/Save_Books/',Books_);
//   }

//   Get_Books(Books_Id)
// {
//  return this.http.get(environment.BasePath +'Books/Get_Books/'+Books_Id);}


//  Get_Books_IssuedDetails(Books_Id)
//  {
//   return this.http.get(environment.BasePath +'Books/Get_Books_IssuedDetails/'+Books_Id);}
 
//  Search_Books_Report(

// 	Books_Id_,
// 	Books_No_,
// ): Observable<any> {
// 	var Search_Data = {
	
// 		Books_Id_: Books_Id_,
// 		Books_No_: Books_No_,
// 	};
// 	return this.http.get(environment.BasePath + "Books/Search_Books_Report/", {
// 		params: Search_Data,
// 	});
// }

// Search_BooksViewdetails_Report(

// 	Books_Id_,

// ): Observable<any> {
// 	var Search_Data = {
	
// 		Books_Id_: Books_Id_,
		
// 	};
// 	return this.http.get(environment.BasePath + "Books/Search_BooksViewdetails_Report/", {
// 		params: Search_Data,
// 	});
// }


// Search_BooksIssued_Report(

// 	Books_Id_,
// 	Books_No_,
// 	Phone_,
// ): Observable<any> {
// 	var Search_Data = {
	
// 		Books_Id_: Books_Id_,
// 		Books_No_: Books_No_,
// 		Phone_:Phone_,
// 	};
// 	return this.http.get(environment.BasePath + "Books/Search_BooksIssued_Report/", {
// 		params: Search_Data,
// 	});
// }

// Search_Books_Typeahead(Books_Name): Observable<any> {
// 	var Search_Data = { Books_Name: Books_Name };
// 	return this.http.get(
// 		environment.BasePath + "Books/Search_Books_Typeahead/",
// 		{ params: Search_Data }
// 	);
// }


// Search_Books_Issued_Typeahead(Books_Name): Observable<any> {
// 	var Search_Data = { Books_Name: Books_Name };
// 	return this.http.get(
// 		environment.BasePath + "Books/Search_Books_Issued_Typeahead/",
// 		{ params: Search_Data }
// 	);
// }




// Search_BooksNo_Typeahead(Books_No): Observable<any> {
// 	var Search_Data = { Books_No: Books_No };
// 	return this.http.get(
// 		environment.BasePath + "Books/Search_BooksNo_Typeahead/",
// 		{ params: Search_Data }
// 	);
// }

// Search_BooksNo_Issued_Typeahead(Books_No): Observable<any> {
// 	var Search_Data = { Books_No: Books_No };
// 	return this.http.get(
// 		environment.BasePath + "Books/Search_BooksNo_Issued_Typeahead/",
// 		{ params: Search_Data }
// 	);
// }



// Search_Booksissued_Typeahead(Books_Id,Books_Name,Books_No): Observable<any> {
// 	var Search_Data = {Books_Id: Books_Id,Books_Name: Books_Name, Books_No: Books_No };
// 	return this.http.get(
// 		environment.BasePath + "Books/Search_Booksissued_Typeahead/",
// 		{ params: Search_Data }
// 	);
// }






// Search_Student_Phonenumber_Typeahead(Phone): Observable<any> {
// 	var Search_Data = { Phone: Phone };
// 	return this.http.get(
// 		environment.BasePath + "Books/Search_Student_Phonenumber_Typeahead/",
// 		{ params: Search_Data }
// 	);
// }



// Delete_Books(Books_Id)
// {
//  return this.http.get(environment.BasePath +'Books/Delete_Books/'+Books_Id);}
 

//  Delete_BooksIssued(Books_Id)
//  {
//   return this.http.get(environment.BasePath +'Books/Delete_BooksIssued/'+Books_Id);}


//  Save_Books_Issued(Books_Issued_)
//   {
//   return this.http.post(environment.BasePath +'Books/Save_Books_Issued/',Books_Issued_);
//   }


//   BookIssued_Return(Books_Issued_Id)
// {
//  return this.http.get(environment.BasePath +'Books/BookIssued_Return/'+Books_Issued_Id);}
 


 Register_Whatsapp(Register_Whatsapp_)
 {
 
	 debugger
 return this.http.post(environment.BasePath +'Student/Register_Whatsapp/',Register_Whatsapp_);
 }
 

 Save_Student_Whatsapp(Save_Whatsapp_)
 {
 return this.http.post(environment.BasePath +'Student/Save_Student_Whatsapp/',Save_Whatsapp_);
 }

 
 Update_EndDate(Student_Course_) {
	return this.http.post(
		environment.BasePath + "Student/Update_EndDate/",
		Student_Course_
	);
}
Save_Exam(Exam_)
{
return this.http.post(environment.BasePath +'Student/Save_Exam/',Exam_);}

Search_Exam(Exam_Name):Observable<any>
{
var Search_Data={'Exam_Name':Exam_Name}
 return this.http.get(environment.BasePath +'Student/Search_Exam/',{params:Search_Data});}

 Delete_Exam(Exam_Id)
 {
  return this.http.get(environment.BasePath +'Student/Delete_Exam/'+Exam_Id);}

  Get_AttendanceofStudents(Student_Id,Course_Id)
{
    return this.http.get(environment.BasePath +'Student/Get_AttendanceofStudents/'+Student_Id +"/"+ Course_Id);
}

Search_ExamResult_Interanal(Batch_, Faculty_): Observable<any> {
	debugger
	var Search_Data = {   Batch_: Batch_, Faculty_: Faculty_ };
	return this.http.get(environment.BasePath + "Student/Search_ExamResult_Interanal/", {
		params: Search_Data,
	});
}

Search_ExamResult_Final( Batch_, Faculty_): Observable<any> {
	var Search_Data = {  Batch_: Batch_, Faculty_: Faculty_ };
	debugger
	return this.http.get(environment.BasePath + "Student/Search_ExamResult_Final/", {
		params: Search_Data,
	});
}

Save_Exam_Result_Internal(Exam_Result_) {
	return this.http.post(
		environment.BasePath + "Student/Save_Exam_Result_Internal/",
		Exam_Result_
	);
}

Search_Examdetails_Internal(
	Is_Date_,
	From_Date_,
	To_Date_,
	 
	Batch_,
	Faculty_
): Observable<any> {
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
	 
		Batch_: Batch_,
		Faculty_: Faculty_,
	};
	return this.http.get(
		environment.BasePath + "Student/Search_Examdetails_Internal/",
		{ params: Search_Data }
	);
}


Get_ExamresultdetailsInternal(
	Exam_Result_Id_,
	 
	Batch_,
	Faculty_Id_
): Observable<any> {
	var Search_Data = {
		Exam_Result_Id_: Exam_Result_Id_,
		 
		Batch_: Batch_,
		Faculty_: Faculty_Id_,
	};
	return this.http.get(environment.BasePath + "Student/Get_ExamresultdetailsInternal/", {
		params: Search_Data,
	});
}

Delete_ExamResultInternal(Exam_Result_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_ExamResultInternal/'+Exam_Result_Id);}

 Save_Exam_Result_Final(Final_Exam_Master_) {
	return this.http.post(
		environment.BasePath + "Student/Save_Exam_Result_Final/",
		Final_Exam_Master_
	);
}
Search_Examdetails_Final(
	Is_Date_,
	From_Date_,
	To_Date_,
	// Course_,
	Batch_,
	Faculty_
): Observable<any> {
	debugger
	var Search_Data = {
		Is_Date_: Is_Date_,
		From_Date_: From_Date_,
		To_Date_: To_Date_,
		// Course_: Course_,
		Batch_: Batch_,
		Faculty_: Faculty_,
	};
	return this.http.get(
		environment.BasePath + "Student/Search_Examdetails_Final/",
		{ params: Search_Data }
	);
}


Get_ExamresultdetailsFinal(
	Final_Exam_Master_Id_,
	// Course_,
	Batch_,
	Faculty_Id_
): Observable<any> {
	debugger
	var Search_Data = {
		Final_Exam_Master_Id_: Final_Exam_Master_Id_,
		// Course_: Course_,
		Batch_: Batch_,
		Faculty_: Faculty_Id_,
	};
	return this.http.get(environment.BasePath + "Student/Get_ExamresultdetailsFinal/", {
		params: Search_Data,
	});
}

Delete_ExamResultFinal(Final_Exam_Master_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_ExamResultFinal/'+Final_Exam_Master_Id);}



 Delete_Application_Details(Application_details_Id) {
	return this.http.get(
		environment.BasePath +
			"Student/Delete_Application_Details/" +
			Application_details_Id
	);
}

Get_ApplicationDetails(Student_Id) {
	return this.http.get(
		environment.BasePath + "Student/Get_ApplicationDetails/" + Student_Id
	);
}


Get_Fees_Receipt(Student_Id) {
	return this.http.get(
		environment.BasePath + "Student/Get_Fees_Receipt_Application/" + Student_Id
	);
}

Get_Application_DocumentList(Application_details_Id) {
	return this.http.get(
		environment.BasePath +
			"Student/Get_Application_DocumentList/" +
			Application_details_Id
	);
}

Save_ApplicationDetails(ApplicationDetails_) {
	return this.http.post(
		environment.BasePath + "Student/Save_ApplicationDetails/",
		ApplicationDetails_
	);
}

Get_ApplicationDetailswise_History(Application_details_Id,Feesdetails_Id) {
	return this.http.get(
		environment.BasePath +
			"Student/Get_ApplicationDetailswise_History/" + Application_details_Id + "/" + Feesdetails_Id
	);
}

Change_Application_Status(Application_details_Id,Feesdetails_Id,status_id,remark) {
	return this.http.get(
		environment.BasePath +
			"Student/Change_Application_Status/" + Application_details_Id + "/" + Feesdetails_Id+ "/" + status_id+ "/" + remark
	);
}



Search_Country_Typeahead(Country_Name): Observable<any> {
	var Search_Data = { Country_Name: Country_Name };
	return this.http.get(
		environment.BasePath + "Student/Search_Country_Typeahead/",
		{ params: Search_Data }
	);
}

Search_Application_Course_Typeahead(Application_Course_Name): Observable<any> {
	var Search_Data = { Application_Course_Name: Application_Course_Name };
	return this.http.get(
		environment.BasePath + "Student/Search_Application_Course_Typeahead/",
		{ params: Search_Data }
	);
}


Search_Application_University_Typeahead(Application_University_Name): Observable<any> {
	var Search_Data = { Application_University_Name: Application_University_Name };
	return this.http.get(
		environment.BasePath + "Student/Search_Application_University_Typeahead/",
		{ params: Search_Data }
	);
}

Save_Application(ApplicationDetails_)
{
	debugger
return this.http.post(environment.BasePath +'Student/Save_Application/',ApplicationDetails_);
}

Save_FeesReceipt(Fees_Receipt_)
{
	debugger
return this.http.post(environment.BasePath +'Student/Save_FeesReceipt/',Fees_Receipt_);
}

Delete_Receipt(Fees_Receipt_Id,Application_details_Id) {
	return this.http.get(
		environment.BasePath + "Student/Delete_Receipt/" + Fees_Receipt_Id +
		"/" +
		Application_details_Id
	);
}
Search_Courses_Fees_Typeahead(Course_Name,Student_Id): Observable<any> {
	var Search_Data = { 'Course_Name': Course_Name,'Student_Id':Student_Id}
	return this.http.get(environment.BasePath + 'Student/Search_Courses_Fees_Typeahead/', { params: Search_Data });
  }
  
  Delete_Application_History(Application_details_history_Id_) {
	return this.http.get(
		environment.BasePath +
			"Student/Delete_Application_History/" +
			Application_details_history_Id_
	);
}



Search_Application_Report(
    
	Search_FromDate,
	Search_ToDate,
	By_User_,
	Look_In_Date,
	Login_User_Id_,
	Application_status_Id_,
	Intake_Id_,
	Intake_Year_Id_,
	Country_Id_,
	University_Id_
): Observable<any> {
	
	var Search_Data = {
		Fromdate_: Search_FromDate,
		Todate_: Search_ToDate,
		By_User_: By_User_,
		Is_Date_Check_: Look_In_Date,
		Login_User_Id_: Login_User_Id_,
		Application_status_Id_: Application_status_Id_,
		Intake_Id_: Intake_Id_,
		Intake_Year_Id_: Intake_Year_Id_,
		Country_Id_: Country_Id_,
		University_Id_:University_Id_
	};
	return this.http.get(
		environment.BasePath + "Student/Search_Application_Report/",
		{ params: Search_Data }
	);
}

Search_Fees_Receipt_Report(
		
	Search_FromDate,
	Search_ToDate,
	
	To_Account_Id,
	
	User_Id,
	Look_In_Date,
	Page_Index1_,
	Page_Index2_,
	Login_User_Id_,
	RowCount_,
	RowCount2_,
	Fees_id
): Observable<any> {
	debugger
	return this.http.get(
		environment.BasePath +
			"Student/Search_Fees_Receipt_Report/" +
			Search_FromDate +
			"/" +
			Search_ToDate +
			"/" +
			
			To_Account_Id +
			"/" +
			User_Id +
			"/" +
			Look_In_Date +
			"/" +
			Page_Index1_ +
			"/" +
			Page_Index2_ +
			"/" +
			Login_User_Id_ +
			"/" +
			RowCount_ +
			"/" +
			RowCount2_ +
			"/" +
			Fees_id
	);
}






Search_Registration_Fees_Report(
		
	Search_FromDate,
	Search_ToDate,
	Search_Name,
	User_Id,
	Look_In_Date,
	Login_User_Id_
	
): Observable<any> {
	debugger
	return this.http.get(
		environment.BasePath +
			"Student/Search_Registration_Fees_Report/" +
			Search_FromDate +
			"/" +
			Search_ToDate +
			"/" +
			Search_Name +
			"/" +
			User_Id +
			"/" +
			Look_In_Date +
			"/" +
			Login_User_Id_
			
	);
}




Save_Books(Books_)
  {
  return this.http.post(environment.BasePath +'Books/Save_Books/',Books_);
  }

  Get_Books(Books_Id)
{
 return this.http.get(environment.BasePath +'Books/Get_Books/'+Books_Id);}


 Get_Books_IssuedDetails(Books_Id)
 {
  return this.http.get(environment.BasePath +'Books/Get_Books_IssuedDetails/'+Books_Id);}
 
 Search_Books_Report(

	search_name_,
	Books_No_,
): Observable<any> {
	var Search_Data = {
	
		search_name_: search_name_,
		Books_No_: Books_No_,
	};
	return this.http.get(environment.BasePath + "Books/Search_Books_Report/", {
		params: Search_Data,
	});
}




Search_BooksViewdetails_Report(

	Books_Id_,

): Observable<any> {
	var Search_Data = {
	
		Books_Id_: Books_Id_,
		
	};
	return this.http.get(environment.BasePath + "Books/Search_BooksViewdetails_Report/", {
		params: Search_Data,
	});
}

Search_BooksIssued_Report(

	Books_No_,
	Registration_No_,
	Search_By_
	
): Observable<any> {
	var Search_Data = {
	
		
		Books_No_: Books_No_,
		Registration_No_:Registration_No_,
		Search_By_:Search_By_
	
	};
	return this.http.get(environment.BasePath + "Books/Search_BooksIssued_Report/", {
		params: Search_Data,
	});
}

Search_Books_Issued_Report(

	Is_Date_,
	From_Date_,
	To_Date_,
	Books_No_,
	Registration_No_,

	
	
	
): Observable<any> {
	var Search_Data = {
	
		Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
		Books_No_: Books_No_,
		Registration_No_:Registration_No_,
		
	};
	return this.http.get(environment.BasePath + "Books/Search_Books_Issued_Report/", {
		params: Search_Data,
	});
}
Search_Books_Return_Report(

	Is_Date_,
		From_Date_,
		To_Date_,
	Books_No_,
	Registration_No_,

	
	
	
): Observable<any> {
	var Search_Data = {
	
		Is_Date_: Is_Date_,
			From_Date_: From_Date_,
			To_Date_: To_Date_,
		Books_No_: Books_No_,
		Registration_No_:Registration_No_,
		
	};
	return this.http.get(environment.BasePath + "Books/Search_Books_Return_Report/", {
		params: Search_Data,
	});
}



Search_Books_Typeahead(Books_No): Observable<any> {
	var Search_Data = { Books_No: Books_No };
	return this.http.get(
		environment.BasePath + "Books/Search_Books_Typeahead/",
		{ params: Search_Data }
	);
}


Search_Books_Issued_Typeahead(Books_Name): Observable<any> {
	var Search_Data = { Books_Name: Books_Name };
	return this.http.get(
		environment.BasePath + "Books/Search_Books_Issued_Typeahead/",
		{ params: Search_Data }
	);
}




Search_BooksNo_Typeahead(Books_No): Observable<any> {
	var Search_Data = { Books_No: Books_No };
	return this.http.get(
		environment.BasePath + "Books/Search_BooksNo_Typeahead/",
		{ params: Search_Data }
	);
}

Search_BooksNo_Issued_Typeahead(Books_No): Observable<any> {
	debugger
	var Search_Data = { Books_No: Books_No };
	return this.http.get(
		environment.BasePath + "Books/Search_BooksNo_Issued_Typeahead/",
		{ params: Search_Data }
	);
}



Search_Booksissued_Typeahead(Books_Id,Books_Name,Books_No): Observable<any> {
	var Search_Data = {Books_Id: Books_Id,Books_Name: Books_Name, Books_No: Books_No };
	return this.http.get(
		environment.BasePath + "Books/Search_Booksissued_Typeahead/",
		{ params: Search_Data }
	);
}






Search_Student_Phonenumber_Typeahead(Phone): Observable<any> {
	var Search_Data = { Phone: Phone };
	return this.http.get(
		environment.BasePath + "Books/Search_Student_Phonenumber_Typeahead/",
		{ params: Search_Data }
	);
}
Search_Student_Reg_Typeahead(Registration_No_): Observable<any> {
	var Search_Data = { Registration_No_: Registration_No_ };
	return this.http.get(
		environment.BasePath + "Books/Search_Student_Reg_Typeahead/",
		{ params: Search_Data }
	);
}




Delete_Books(Books_Id)
{
 return this.http.get(environment.BasePath +'Books/Delete_Books/'+Books_Id);}
 

 Delete_BooksIssued(Books_Id)
 {
  return this.http.get(environment.BasePath +'Books/Delete_BooksIssued/'+Books_Id);}


 Save_Books_Issued(Books_Issued_)
  {
  return this.http.post(environment.BasePath +'Books/Save_Books_Issued/',Books_Issued_);
  }


  BookIssued_Return(Books_Issued_Id)
{
 return this.http.get(environment.BasePath +'Books/BookIssued_Return/'+Books_Issued_Id);}
 
 BookIssued_Cancel(Books_Issued_Id)
{
 return this.http.get(environment.BasePath +'Books/BookIssued_Cancel/'+Books_Issued_Id);}




 Save_Document_Type(Document_Type_)
{
return this.http.post(environment.BasePath +'Student/Save_Document_Type/',Document_Type_);}

Search_Document_Type(Document_Type_Name):Observable<any>
{
var Search_Data={'Document_Type_Name':Document_Type_Name}
 return this.http.get(environment.BasePath +'Student/Search_Document_Type/',{params:Search_Data});}

 Delete_Document_Type(Document_Type_Id)
 {
  return this.http.get(environment.BasePath +'Student/Delete_Document_Type/'+Document_Type_Id);}



  Save_Process_Type(Process_Type_)
{
return this.http.post(environment.BasePath +'Student/Save_Process_Type/',Process_Type_);}

Search_Process_Type(Process_Type_Name):Observable<any>
{
var Search_Data={'Process_Type_Name':Process_Type_Name}
 return this.http.get(environment.BasePath +'Student/Search_Process_Type/',{params:Search_Data});}

 Delete_Process_Type(Process_Type_Id)
 {
  return this.http.get(environment.BasePath +'Student/Delete_Process_Type/'+Process_Type_Id);}



  Save_Student_Document(Student_Document_Type_Master_) {
    return this.http.post(
      environment.BasePath + "Student/Save_Student_Document/",
      Student_Document_Type_Master_
    );
  }


  Get_Document_Type(Student_Id) {
    return this.http.get(
      environment.BasePath + "Student/Get_Document_Type/" + Student_Id
    );
  }

}
