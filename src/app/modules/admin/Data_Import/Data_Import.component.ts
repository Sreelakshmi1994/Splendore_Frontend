import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// import { Course_Import_Service } from "../../../services/Course_Import.service";
import { Student_Import } from "../../../models/Student_Import";
import { Import_Master } from "../../../models/Import_Master";
import { Student_Import_Details } from "../../../models/Student_Import_Details";
import { Course } from "../../../models/Course";
import {
	ROUTES,
	Get_Page_Permission,
} from "../../../components/sidebar/sidebar.component";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
import * as XLSX from "ts-xlsx";
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
	parse: {
		dateInput: "DD/MM/YYYY",
	},
	display: {
		dateInput: "DD/MM/YYYY",
		monthYearLabel: "MMM YYYY",
		dateA11yLabel: "DD/MM/YYYY",
		monthYearA11yLabel: "MMMM YYYY",
	},
};
import {
	MatDialog,
	MatDialogRef,
	MAT_DIALOG_DATA,
	MatDialogConfig,
} from "@angular/material";
import { DialogBox_Component } from "../DialogBox/DialogBox.component";
// import { Branch } from "../../../models/Branch";
// import { Department } from "../../../models/Departmen";
// import { Department_Status } from "../../../models/Department_Status";
import { Users } from "../../../models/Users";
import { Student_Service } from "../../../services/Student.service";
import { Enquiry_Source } from "../../../models/Enquiry_Source";
import { Enquiry_Source_Service } from "../../../services/Enquiry_Source.service";
import { Student_Import_Service } from "../../../services/Student_Import.Service";
import {  Student_Followup } from "../../../models/Student_Followup";
import { Student } from "../../../models/Student";
import { User_Sub } from "app/models/User_Sub";
import { Status } from "app/models/Status";

@Component({
	selector: "app-Data_Import",
	templateUrl: "./Data_Import.component.html",
	styleUrls: ["./Data_Import.component.css"],
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class Data_ImportComponent implements OnInit {
	Enquiry_Source_Name_Search: string;

	Student_Import: Student_Import = new Student_Import();
	Course_Import_Name_Search = "";
	Entry_View: boolean = true;
	Duplicate_View: boolean = true;
	Search_view: boolean = true;
	myInnerHeight: number;
	myHeight: number;

	Total_Import_Entries: number;
	Total_Duplicate_Data: number;
	Total_Imports: number;

	EditIndex: number;
	Total_Entries: number = 0;
	Data: string;
	color = "primary";
	mode = "indeterminate";
	value = 50;
	issLoading: boolean;
	Permissions: any;
	Course_Import_Edit: boolean;
	Course_Import_Save: boolean;
	Course_Import_Delete: boolean;
	year: any;
	month: any;
	day: any;
	date: any;
	isLoading = false;
	Login_Id: string;
	Search_FromDate: Date = new Date();
	Search_ToDate: Date = new Date();
	Is_Expiry_Show: boolean = true;
	Look_In_Date: Boolean = true;
	Employee_Edit: boolean = false;
	Employee_Name: string;
	Employee_Id: number;
	arrayBuffer: any;
	file: File;
	Key_Value_Name: string = "";
	Store_Id: number;
	Store_Name: string;
	Store_Edit: boolean = false;
	User_Type: number;
	Course_Import_Details_Data: Course[];
	Student_Import_Details_Data: Student_Import_Details[];
	ImageFile: any;
	Display_File_Name_: string;
	Next_FollowUp_Date_Visible: boolean = true;

	Excel_File: [];

	Course_Import_Index: number;
	Student_Import_: Student_Import = new Student_Import();
	Course_Import_Data: any;
	Import_Master_: Import_Master;
	Search_Student_Import_Details_Data: any;

	
	User_Sub_Data_Temp:User_Sub[]=[];
	User_Sub_Data:User_Sub[];
	User_Sub_:User_Sub=new User_Sub;

	Enquiry_Source_Data: Enquiry_Source[];
	Enquiry_Source_Search_: Enquiry_Source = new Enquiry_Source();
	Enquiry_Source_: Enquiry_Source = new Enquiry_Source();
	Enquiry_Source_Search_Data: Enquiry_Source[];
	Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source();
	Enquiry_Source_Search_Temp: Enquiry_Source = new Enquiry_Source();

	FollowUp_: Student_Followup = new Student_Followup();
	Student_Duplicate_Array: Student[];
	Login_User: string = "0";
	Branch_Id: number;
	checkbox: boolean = false;


	Student_Followup_: Student_Followup = new Student_Followup()
	Followup_Status_: Status = new Status()
	Followup_Status_Data: Status[];
	Followup_Status_Temp: Status = new Status();

	Followup_Users_: Users = new Users()
	Followup_Users_Data: Users[];
	Faculty_Users_Data: Users[];
	Followup_Users_Data_Filter: Users[];
	

	constructor(
		public Enquiry_Source_Service_: Enquiry_Source_Service,
		public Student_Service_: Student_Service,
		public Student_Import_Service_: Student_Import_Service,
		private router: Router,
		public dialogBox: MatDialog
	) {}
	ngOnInit() {
		debugger
		this.User_Type = Number(localStorage.getItem("User_Type"));

		this.Login_Id = localStorage.getItem("Login_User");
		this.Branch_Id = Number(localStorage.getItem("Branch"));
		
			this.Page_Load();
		
	}	

	trackByFn(index, item) {
		return index;
	}
	
	
	Search_Student_Import() {
		var look_In_Date_Value = 0;
		if (this.Look_In_Date == true) look_In_Date_Value = 1;
		this.issLoading = true;

		this.Student_Import_Service_.Search_Student_Import(
			moment(this.Search_FromDate).format("YYYY-MM-DD"),
			moment(this.Search_ToDate).format("YYYY-MM-DD"),
			look_In_Date_Value
		).subscribe(
			(Rows) => {
				this.Search_Student_Import_Details_Data = Rows[0];
				this.issLoading = false;

				if (this.Search_Student_Import_Details_Data.length == 0) {
					const dialogRef = this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "No Details Found", Type: "3" },
					});
				}
				this.issLoading = false;
			},
			(Rows) => {
				this.issLoading = false;
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
			}
		);
	}

	

	Delete_Student_Import(Student_Import_Id, index) {
		this.Student_Import_Details_Data.splice(index, 1);
	}
	Focus_It() {
		setTimeout("$('[name=Followup_Status]').focus();", 0);
	}

	

	New_Date(Date_) {
		this.date = Date_;
		this.year = this.date.getFullYear();
		this.month = this.date.getMonth() + 1;
		if (this.month < 10) {
			this.month = "0" + this.month;
		}
		this.day = this.date.getDate().toString();
		if (Number.parseInt(this.day) < 10) {
			this.day = "0" + this.day;
		}
		this.date = this.year + "-" + this.month + "-" + this.day;
		return this.date;
	}
	
	



	
	Create_New() {
		this.Entry_View = true;
		this.Search_view = false;
		this.Duplicate_View = false;
		this.Clr_Student_Import();
	}
	Close_Click() {
		this.Search_view = true;
		this.Entry_View = false;
		this.Duplicate_View = false;
		this.Is_Expiry_Show = true
		this.Followup_Status_ = null;
		this.Followup_Users_ = null;
		this.Student_Followup_.Next_FollowUp_Date = new Date();
		this.Student_Followup_.Next_FollowUp_Date = this.New_Date(
			this.Student_Followup_.Next_FollowUp_Date
		);
		this.Search_FromDate = new Date();
		this.Search_FromDate = this.New_Date(this.Search_FromDate);
		this.Search_ToDate = new Date();
		this.Search_ToDate = this.New_Date(this.Search_ToDate);
	}

	Clr_Student_Import() {
		this.Student_Import_Details_Data = [];
		this.Display_File_Name_ = "";
		this.Student_Followup_.Next_FollowUp_Date = new Date();
		this.Student_Followup_.Next_FollowUp_Date = this.New_Date(
			this.Student_Followup_.Next_FollowUp_Date
		);

		this.Followup_Status_ = null;
		this.Followup_Users_ = null;
		this.Enquiry_Source_Data =[];
		this.Followup_Status_Data =[];
		this.Followup_Users_Data =[];
	}

	Page_Load() {
		this.myInnerHeight = window.innerHeight;
		this.myInnerHeight = this.myInnerHeight - 530;
		this.myHeight = window.innerHeight;
		this.myHeight = this.myHeight - 400;
		this.Search_view = false;
		this.Entry_View = true;
		this.Duplicate_View = false;
		if (this.User_Type == 2) {
			this.Store_Edit = true;
			this.Student_Followup_.Next_FollowUp_Date = new Date();
			this.Student_Followup_.Next_FollowUp_Date = this.New_Date(
				this.Student_Followup_.Next_FollowUp_Date
			);

			this.Clr_Student_Import();
			
			this.Get_Menu_Status(106, this.Login_Id);

			}
	}

	Get_Menu_Status(Menu_id, Login_user_id) {
		this.issLoading = false;
		this.Student_Service_.Get_Menu_Status(Menu_id, Login_user_id).subscribe(
			(Rows) => {
				debugger
				if (Rows[0][0] == undefined) {
					if (Menu_id == 106) {
						localStorage.removeItem("token");
						this.router.navigateByUrl("Home_Page");
					}
				} else if (Rows[0][0].View > 0) {
					if (Menu_id == 106) {
						this.Permissions = Rows[0][0];
						if (this.Permissions == undefined || this.Permissions == null) {
							localStorage.removeItem("token");
							this.router.navigateByUrl("Home_Page");
						}
						this.Course_Import_Edit = this.Permissions.Edit;
						this.Course_Import_Save = this.Permissions.Save;
						this.Course_Import_Delete = this.Permissions.Delete;
					}
				}
			},
			(Rows) => {
				this.issLoading = false;
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
			}
		);
	}

	


	incomingfile(event) {
		this.file = event.target.files[0];
		this.Display_File_Name_ = this.file.name;
		this.Upload();
	}


	Upload() {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i)
                arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, { type: "binary" });
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            this.Student_Import_Details_Data = XLSX.utils.sheet_to_json(worksheet, {
                raw: true,
            });
            var Date_Temp,Date_Tempc;
			debugger
            for (var j=2;j-1<=this.Student_Import_Details_Data.length;j++) 
            {
				debugger
                      this.Student_Import_Details_Data[j-2].Sl_No=(worksheet['A'+j]!=undefined) ? worksheet['A'+j].v :''
					  this.Student_Import_Details_Data[j-2].Student_Name=(worksheet['B'+j]!=undefined) ? worksheet['B'+j].v :''
                      this.Student_Import_Details_Data[j-2].Mobile=(worksheet['C'+j]!=undefined) ? worksheet['C'+j].v :''
					  this.Student_Import_Details_Data[j-2].Reference=(worksheet['D'+j]!=undefined) ? worksheet['D'+j].v :''
                      this.Student_Import_Details_Data[j-2].Admission_Branch=(worksheet['E'+j]!=undefined) ? worksheet['E'+j].v :''
					  this.Student_Import_Details_Data[j-2].Course=(worksheet['F'+j]!=undefined) ? worksheet['F'+j].v :0
                      this.Student_Import_Details_Data[j-2].Mode_of_Study=(worksheet['G'+j]!=undefined) ? worksheet['G'+j].v :''
                      this.Student_Import_Details_Data[j-2].Offline_Branch=(worksheet['H'+j]!=undefined) ? worksheet['H'+j].v :''
					//   this.Student_Import_Details_Data[j-2].Admission_Date=(worksheet['I'+j]!=undefined) ? worksheet['I'+j].v :toString().replace(/./g, '-');
					this.Student_Import_Details_Data[j-2].Admission_Date=(worksheet['I'+j]!=undefined) ? worksheet['I'+j].v :'';
					  this.Student_Import_Details_Data[j-2].Total_Fees=(worksheet['J'+j]!=undefined) ? worksheet['J'+j].v :0
					  this.Student_Import_Details_Data[j-2].First_Installment_Amount=(worksheet['K'+j]!=undefined) ? worksheet['K'+j].v :0
					  this.Student_Import_Details_Data[j-2].First_Installment_Date=(worksheet['L'+j]!=undefined) ? worksheet['L'+j].v :''	
					  this.Student_Import_Details_Data[j-2].First_Installment_To_Account=(worksheet['M'+j]!=undefined) ? worksheet['M'+j].v :''
					  this.Student_Import_Details_Data[j-2].Second_Installment_Amount=(worksheet['N'+j]!=undefined) ? worksheet['N'+j].v :0
					  this.Student_Import_Details_Data[j-2].Second_Installment_Date=(worksheet['O'+j]!=undefined) ? worksheet['O'+j].v :''
					  this.Student_Import_Details_Data[j-2].Second_Installment_To_Account=(worksheet['P'+j]!=undefined) ? worksheet['P'+j].v :''
					  this.Student_Import_Details_Data[j-2].Third_Installment_Amount=(worksheet['Q'+j]!=undefined) ? worksheet['Q'+j].v :0
					  this.Student_Import_Details_Data[j-2].Third_Installment_Date=(worksheet['R'+j]!=undefined) ? worksheet['R'+j].v :''
					  this.Student_Import_Details_Data[j-2].Third_Installment_To_Account=(worksheet['S'+j]!=undefined) ? worksheet['S'+j].v :''
					  this.Student_Import_Details_Data[j-2].Fourth_Installment_Amount=(worksheet['T'+j]!=undefined) ? worksheet['T'+j].v :0
					  this.Student_Import_Details_Data[j-2].Fourth_Installment_Date=(worksheet['U'+j]!=undefined) ? worksheet['U'+j].v :''
					  this.Student_Import_Details_Data[j-2].Fourth_Installment_To_Account=(worksheet['V'+j]!=undefined) ? worksheet['V'+j].v :''
					  this.Student_Import_Details_Data[j-2].Fifth_Installment_Amount=(worksheet['W'+j]!=undefined) ? worksheet['W'+j].v :0
					  this.Student_Import_Details_Data[j-2].Fifth_Installment_Date=(worksheet['X'+j]!=undefined) ? worksheet['X'+j].v :''
					  this.Student_Import_Details_Data[j-2].Fifth_Installment_To_Account=(worksheet['Y'+j]!=undefined) ? worksheet['Y'+j].v :''
					  this.Student_Import_Details_Data[j-2].Sixth_Installment_Amount=(worksheet['Z'+j]!=undefined) ? worksheet['Z'+j].v :0
					  this.Student_Import_Details_Data[j-2].Sixth_Installment_Date=(worksheet['AA'+j]!=undefined) ? worksheet['AA'+j].v :''
					  this.Student_Import_Details_Data[j-2].Sixth_Installment_To_Account=(worksheet['AB'+j]!=undefined) ? worksheet['AB'+j].v :''
					  this.Student_Import_Details_Data[j-2].Seventh_Installment_Amount=(worksheet['AC'+j]!=undefined) ? worksheet['AC'+j].v :0
					  this.Student_Import_Details_Data[j-2].Seventh_Installment_Date=(worksheet['AD'+j]!=undefined) ? worksheet['AD'+j].v :''
					  this.Student_Import_Details_Data[j-2].Seventh_Installment_To_Account=(worksheet['AE'+j]!=undefined) ? worksheet['AE'+j].v :''
					  this.Student_Import_Details_Data[j-2].Balance=(worksheet['AF'+j]!=undefined) ? worksheet['AF'+j].v :0
             debugger       
              Date_Tempc = new Date("January 1, 1900");
              Date_Tempc.setDate(Date_Tempc.getDate() + parseInt( this.Student_Import_Details_Data[j-2].Admission_Date.toString())-2);
              this.Student_Import_Details_Data[j-2].Admission_Date=this.New_Date(new Date(moment(Date_Tempc).format('YYYY-MM-DD')));
debugger

				if( this.Student_Import_Details_Data[j-2].First_Installment_Date.toString()!=null ||  this.Student_Import_Details_Data[j-2].First_Installment_Date.toString()!='')
				{
			  Date_Tempc.setDate(Date_Tempc.getDate() + parseInt( this.Student_Import_Details_Data[j-2].First_Installment_Date.toString())-2);
              this.Student_Import_Details_Data[j-2].First_Installment_Date=this.New_Date(new Date(moment(Date_Tempc).format('YYYY-MM-DD')));
				}
				if( this.Student_Import_Details_Data[j-2].Second_Installment_Date.toString()!=null ||  this.Student_Import_Details_Data[j-2].Second_Installment_Date.toString()!='')
				{
			  Date_Tempc.setDate(Date_Tempc.getDate() + parseInt( this.Student_Import_Details_Data[j-2].Second_Installment_Date.toString())-2);
              this.Student_Import_Details_Data[j-2].Second_Installment_Date=this.New_Date(new Date(moment(Date_Tempc).format('YYYY-MM-DD')));
				}
				if( this.Student_Import_Details_Data[j-2].Third_Installment_Date.toString()!=null ||  this.Student_Import_Details_Data[j-2].Third_Installment_Date.toString()!='')
				{
			  Date_Tempc.setDate(Date_Tempc.getDate() + parseInt( this.Student_Import_Details_Data[j-2].Third_Installment_Date.toString())-2);
              this.Student_Import_Details_Data[j-2].Third_Installment_Date=this.New_Date(new Date(moment(Date_Tempc).format('YYYY-MM-DD')));
				}
				if( this.Student_Import_Details_Data[j-2].Fourth_Installment_Date.toString()!=null ||  this.Student_Import_Details_Data[j-2].Fourth_Installment_Date.toString()!='')
				{
			  Date_Tempc.setDate(Date_Tempc.getDate() + parseInt( this.Student_Import_Details_Data[j-2].Fourth_Installment_Date.toString())-2);
              this.Student_Import_Details_Data[j-2].Fourth_Installment_Date=this.New_Date(new Date(moment(Date_Tempc).format('YYYY-MM-DD')));
				}
				if( this.Student_Import_Details_Data[j-2].Fifth_Installment_Date.toString()!=null ||  this.Student_Import_Details_Data[j-2].Fifth_Installment_Date.toString()!='')
				{
			  Date_Tempc.setDate(Date_Tempc.getDate() + parseInt( this.Student_Import_Details_Data[j-2].Fifth_Installment_Date.toString())-2);
              this.Student_Import_Details_Data[j-2].Fifth_Installment_Date=this.New_Date(new Date(moment(Date_Tempc).format('YYYY-MM-DD')));
				}
				if( this.Student_Import_Details_Data[j-2].Sixth_Installment_Date.toString()!=null ||  this.Student_Import_Details_Data[j-2].Sixth_Installment_Date.toString()!='')
				{
			  Date_Tempc.setDate(Date_Tempc.getDate() + parseInt( this.Student_Import_Details_Data[j-2].Sixth_Installment_Date.toString())-2);
              this.Student_Import_Details_Data[j-2].Sixth_Installment_Date=this.New_Date(new Date(moment(Date_Tempc).format('YYYY-MM-DD')));
				}
				if( this.Student_Import_Details_Data[j-2].Seventh_Installment_Date.toString()!=null ||  this.Student_Import_Details_Data[j-2].Seventh_Installment_Date.toString()!='')
				{
			  Date_Tempc.setDate(Date_Tempc.getDate() + parseInt( this.Student_Import_Details_Data[j-2].Seventh_Installment_Date.toString())-2);
              this.Student_Import_Details_Data[j-2].Seventh_Installment_Date=this.New_Date(new Date(moment(Date_Tempc).format('YYYY-MM-DD')));
				}
        };
        };

        fileReader.readAsArrayBuffer(this.file);
    }



	Save_Data_Migration() {
		debugger
		if (
			this.Student_Import_Details_Data == undefined ||
			this.Student_Import_Details_Data == null ||
			this.Student_Import_Details_Data == undefined
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Please Choose File", Type: "3" },
			});
			return;
		}
	

		var Check_Status=false;
	
		var j = 0;
		for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {
			j = i + 1;
	
			//console.log(this.Student_Import_Details_Data[i].Student_Name,j)
			if (undefined == this.Student_Import_Details_Data[i].Student_Name) {
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Student Client name is blank at row " + j, Type: "3" },
				});
				i = this.Student_Import_Details_Data.length;
				return;
			}
			if ("" == this.Student_Import_Details_Data[i].Student_Name.toString().trim()) {
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Student Client name is blank at row " + j, Type: "3" },
				});
				i = this.Student_Import_Details_Data.length;
				return;
			}
			
			else if (undefined == this.Student_Import_Details_Data[i].Mobile) {
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Mobile is blank at row " + j, Type: "3" },
				});
				i = this.Student_Import_Details_Data.length;
				return;
			} else if (
				"" == this.Student_Import_Details_Data[i].Mobile.toString().trim()
			) {
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Mobile number is blank at row " + j, Type: "3" },
				});
				i = this.Student_Import_Details_Data.length;
				return;
			}

			
			else if (undefined == this.Student_Import_Details_Data[i].Admission_Date) {
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: "Dialogbox-Class",
                    data: { Message: "Enquiry Date is blank at row " + j, Type: "3" },
                });
                i = this.Student_Import_Details_Data.length;
                return;
            } else if (
                "" == this.Student_Import_Details_Data[i].Admission_Date.toString().trim()
            ) {
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: "Dialogbox-Class",
                    data: { Message: "Enquiry Date is blank at row " + j, Type: "3" },
                });
                i = this.Student_Import_Details_Data.length;
                return;
            }
			
		}
		{



debugger

// 			var  Date_Tempc;
// Date_Tempc = new Date();
//  Date_Tempc.setDate(Date_Tempc, 'YYYY-MM-DD');

// for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {
//     Date_Tempc.setDate(parseInt(this.Student_Import_Details_Data[i].Admission_Date.toString()));
  
//     var year = Date_Tempc.getFullYear();
//     var month = String(Date_Tempc.getMonth() + 1);
//     var day = String(Date_Tempc.getDate());
//     var hours = String(Date_Tempc.getHours());
//     var minutes = String(Date_Tempc.getMinutes());
//     var seconds = String(Date_Tempc.getSeconds());
//     if (month.length < 2) {
//       month = '0' + month;
//     }
//     if (day.length < 2) {
//       day = '0' + day;
//     }
//     if (hours.length < 2) {
//       hours = '0' + hours;
//     }
//     if (minutes.length < 2) {
//       minutes = '0' + minutes;
//     }
//     if (seconds.length < 2) {
//       seconds = '0' + seconds;
//     }
  
//     var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
//     this.Student_Import_Details_Data[i].Admission_Date = formattedDateTime;
//   }

debugger


// for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

	
// 		let inputString = (this.Student_Import_Details_Data[i].Admission_Date);
// 		if (typeof inputString === 'string') {
// let thirdDotIndex = inputString.indexOf(".", inputString.indexOf(".") + 1);
// if (thirdDotIndex !== -1) {
// let outputString =   inputString.replace(/\./g, '-');
// console.log(outputString);

// this.Student_Import_Details_Data[i].Admission_Date = outputString;
// }
// } 

// }

// for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

// var inputString = this.Student_Import_Details_Data[i].First_Installment_Date;
// if (typeof inputString === 'string') {
// var thirdDotIndex = inputString.indexOf(".", inputString.indexOf(".") + 1);
// if (thirdDotIndex !== -1) {
// var outputString =   inputString.replace(/\./g, '-');
// console.log(outputString);

// this.Student_Import_Details_Data[i].First_Installment_Date = outputString;
// }
// } 

// }

// for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

// var inputString = this.Student_Import_Details_Data[i].Second_Installment_Date;
// if (typeof inputString === 'string') {
// var thirdDotIndex = inputString.indexOf(".", inputString.indexOf(".") + 1);
// if (thirdDotIndex !== -1) {
// var outputString =   inputString.replace(/\./g, '-');
// console.log(outputString);

// this.Student_Import_Details_Data[i].Second_Installment_Date = outputString;
// }
// } 

// }

// for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

// var inputString = this.Student_Import_Details_Data[i].Third_Installment_Date;
// if (typeof inputString === 'string') {
// var thirdDotIndex = inputString.indexOf(".", inputString.indexOf(".") + 1);
// if (thirdDotIndex !== -1) {
// var outputString =   inputString.replace(/\./g, '-');
// console.log(outputString);

// this.Student_Import_Details_Data[i].Third_Installment_Date = outputString;
// }
// } 

// }


// for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

	
// 	let inputString = (this.Student_Import_Details_Data[i].Fourth_Installment_Date);
// 	if (typeof inputString === 'string') {
// let thirdDotIndex = inputString.indexOf(".", inputString.indexOf(".") + 1);
// if (thirdDotIndex !== -1) {
// let outputString =   inputString.replace(/\./g, '-');
// console.log(outputString);

// this.Student_Import_Details_Data[i].Fourth_Installment_Date = outputString;
// }
// } 

// }

// for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

	
// 	let inputString = (this.Student_Import_Details_Data[i].Fifth_Installment_Date);
// 	if (typeof inputString === 'string') {
// let thirdDotIndex = inputString.indexOf(".", inputString.indexOf(".") + 1);
// if (thirdDotIndex !== -1) {
// let outputString =   inputString.replace(/\./g, '-');
// console.log(outputString);

// this.Student_Import_Details_Data[i].Fifth_Installment_Date = outputString;
// }
// } 

// }


// for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

	
// 	let inputString = (this.Student_Import_Details_Data[i].Sixth_Installment_Date);
// 	if (typeof inputString === 'string') {
// let thirdDotIndex = inputString.indexOf(".", inputString.indexOf(".") + 1);
// if (thirdDotIndex !== -1) {
// let outputString =   inputString.replace(/\./g, '-');
// console.log(outputString);

// this.Student_Import_Details_Data[i].Sixth_Installment_Date = outputString;
// }
// } 

// }


// for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

	
// 	let inputString = (this.Student_Import_Details_Data[i].Seventh_Installment_Date);
// 	if (typeof inputString === 'string') {
// let thirdDotIndex = inputString.indexOf(".", inputString.indexOf(".") + 1);
// if (thirdDotIndex !== -1) {
// let outputString =   inputString.replace(/\./g, '-');
// console.log(outputString);

// this.Student_Import_Details_Data[i].Seventh_Installment_Date = outputString;
// }
// } 

// }

//   for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

// 	const dateComponents = this.Student_Import_Details_Data[i].Admission_Date.split('.');
//     const formattedDate = `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`;

// 	this.Student_Import_Details_Data[i].Admission_Date = formattedDate;}


/*
  for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

	if(this.Student_Import_Details_Data[i].First_Installment_Date != null||this.Student_Import_Details_Data[i].First_Installment_Date != undefined||this.Student_Import_Details_Data[i].First_Installment_Date != '')
    
	{
		Date_Tempc.setDate(parseInt(this.Student_Import_Details_Data[i].First_Installment_Date.toString()));
  
    var year = Date_Tempc.getFullYear();
    var month = String(Date_Tempc.getMonth() + 1);
    var day = String(Date_Tempc.getDate());
    var hours = String(Date_Tempc.getHours());
    var minutes = String(Date_Tempc.getMinutes());
    var seconds = String(Date_Tempc.getSeconds());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    } 
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
  
    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    this.Student_Import_Details_Data[i].First_Installment_Date = formattedDateTime;
}

  }*/
/*
  for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

	if(this.Student_Import_Details_Data[i].Second_Installment_Date != null||this.Student_Import_Details_Data[i].Second_Installment_Date != undefined||this.Student_Import_Details_Data[i].Second_Installment_Date != '')
  {
    Date_Tempc.setDate(parseInt(this.Student_Import_Details_Data[i].Second_Installment_Date.toString()));
  
    var year = Date_Tempc.getFullYear();
    var month = String(Date_Tempc.getMonth() + 1);
    var day = String(Date_Tempc.getDate());
    var hours = String(Date_Tempc.getHours());
    var minutes = String(Date_Tempc.getMinutes());
    var seconds = String(Date_Tempc.getSeconds());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
  
    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    this.Student_Import_Details_Data[i].Second_Installment_Date = formattedDateTime;
  }}*/

/*
  debugger
  for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

	if(this.Student_Import_Details_Data[i].Third_Installment_Date != null||this.Student_Import_Details_Data[i].Third_Installment_Date != undefined||this.Student_Import_Details_Data[i].Third_Installment_Date != '')
  {
    Date_Tempc.setDate(parseInt(this.Student_Import_Details_Data[i].Third_Installment_Date.toString()));
  
    var year = Date_Tempc.getFullYear();
    var month = String(Date_Tempc.getMonth() + 1);
    var day = String(Date_Tempc.getDate());
    var hours = String(Date_Tempc.getHours());
    var minutes = String(Date_Tempc.getMinutes());
    var seconds = String(Date_Tempc.getSeconds());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
  
    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    this.Student_Import_Details_Data[i].Third_Installment_Date = formattedDateTime;
  }}*/
/*
  for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

	if(this.Student_Import_Details_Data[i].Fourth_Installment_Date != null||this.Student_Import_Details_Data[i].Fourth_Installment_Date != undefined||this.Student_Import_Details_Data[i].Fourth_Installment_Date != '')
  {

    Date_Tempc.setDate(parseInt(this.Student_Import_Details_Data[i].Fourth_Installment_Date.toString()));
  
    var year = Date_Tempc.getFullYear();
    var month = String(Date_Tempc.getMonth() + 1);
    var day = String(Date_Tempc.getDate());
    var hours = String(Date_Tempc.getHours());
    var minutes = String(Date_Tempc.getMinutes());
    var seconds = String(Date_Tempc.getSeconds());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
  
    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    this.Student_Import_Details_Data[i].Fourth_Installment_Date = formattedDateTime;
  }}*/

/*
  for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {
	if(this.Student_Import_Details_Data[i].Fifth_Installment_Date != null||this.Student_Import_Details_Data[i].Fifth_Installment_Date != undefined||this.Student_Import_Details_Data[i].Fifth_Installment_Date != '')
  {
    Date_Tempc.setDate(parseInt(this.Student_Import_Details_Data[i].Fifth_Installment_Date.toString()));
  
    var year = Date_Tempc.getFullYear();
    var month = String(Date_Tempc.getMonth() + 1);
    var day = String(Date_Tempc.getDate());
    var hours = String(Date_Tempc.getHours());
    var minutes = String(Date_Tempc.getMinutes());
    var seconds = String(Date_Tempc.getSeconds());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
  
    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    this.Student_Import_Details_Data[i].Fifth_Installment_Date = formattedDateTime;
  }}
  */
/*
  for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {
	if(this.Student_Import_Details_Data[i].Sixth_Installment_Date != null||this.Student_Import_Details_Data[i].Sixth_Installment_Date != undefined||this.Student_Import_Details_Data[i].Sixth_Installment_Date != '')
  {
    Date_Tempc.setDate(parseInt(this.Student_Import_Details_Data[i].Sixth_Installment_Date.toString()));
  
    var year = Date_Tempc.getFullYear();
    var month = String(Date_Tempc.getMonth() + 1);
    var day = String(Date_Tempc.getDate());
    var hours = String(Date_Tempc.getHours());
    var minutes = String(Date_Tempc.getMinutes());
    var seconds = String(Date_Tempc.getSeconds());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
  
    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    this.Student_Import_Details_Data[i].Sixth_Installment_Date = formattedDateTime;
  }}*/
/*
  for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {

	if(this.Student_Import_Details_Data[i].Seventh_Installment_Date != null||this.Student_Import_Details_Data[i].Seventh_Installment_Date != undefined||this.Student_Import_Details_Data[i].Seventh_Installment_Date != '')
  {

    Date_Tempc.setDate(parseInt(this.Student_Import_Details_Data[i].Seventh_Installment_Date.toString()));
  
    var year = Date_Tempc.getFullYear();
    var month = String(Date_Tempc.getMonth() + 1);
    var day = String(Date_Tempc.getDate());
    var hours = String(Date_Tempc.getHours());
    var minutes = String(Date_Tempc.getMinutes());
    var seconds = String(Date_Tempc.getSeconds());
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
  
    var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    this.Student_Import_Details_Data[i].Seventh_Installment_Date = formattedDateTime;
  }}*/

debugger

//   for (var i = 0; i < this.Student_Import_Details_Data.length; i++) {
//     if(this.Student_Import_Details_Data[i].First_Installment_Amount=="")
// 	{this.Student_Import_Details_Data[i].First_Installment_Amount="0"}
//   }

			
			debugger
			this.Student_Import_.Status = this.Followup_Status_.Status_Id
			this.Student_Import_.Status_Name = this.Followup_Status_.Status_Name
			this.Student_Import_.To_User = this.Followup_Users_.Users_Id
			this.Student_Import_.To_User_Name = this.Followup_Users_.Users_Name
		
			this.Student_Import_.Next_FollowUp_Date = this.New_Date(
				new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format("YYYY-MM-DD"))
			);
		
			this.Student_Import_.By_User_Id = parseInt(this.Login_Id);
			

			this.Student_Import_.Student_Import_Details =
				this.Student_Import_Details_Data;

			document.getElementById("Save_Button").hidden = true;




			this.issLoading = true;
			debugger
			this.Student_Import_Service_.Save_Data_Migration(
				this.Student_Import_
			).subscribe(
				(Save_status) => {
					debugger
					
					this.issLoading = false;
					if (Number(Save_status[0] == undefined)) {
						this.issLoading = false;
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Error Occured", Type: "2" },
						});

						document.getElementById("Save_Button").hidden = false;
						
					}

					
					if (Number(Save_status[44][0].import_master_id) > 0) {
						this.Student_Duplicate_Array = Save_status[1];
						this.Total_Duplicate_Data = this.Student_Duplicate_Array.length;
						this.Total_Import_Entries = this.Student_Import_Details_Data.length;
						this.Total_Imports =
							this.Student_Import_Details_Data.length -
							this.Student_Duplicate_Array.length;

						this.Duplicate_View = true;
						this.Entry_View = false;
						this.Search_view = false;
						this.Search_Student_Import();
						this.Clr_Student_Import();
						const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Imported',Type:"false"}});
						document.getElementById("Save_Button").hidden = true;
					}

					else if(Save_status[0][0].import_master_id ==null||Save_status[0][0].import_master_id ==undefined){
					if (Number(Save_status[49][0].import_master_id) > 0) {
						this.Student_Duplicate_Array = Save_status[1];
						this.Total_Duplicate_Data = this.Student_Duplicate_Array.length;
						this.Total_Import_Entries = this.Student_Import_Details_Data.length;
						this.Total_Imports =
							this.Student_Import_Details_Data.length -
							this.Student_Duplicate_Array.length;

						this.Duplicate_View = true;
						this.Entry_View = false;
						this.Search_view = false;
						this.Search_Student_Import();
						this.Clr_Student_Import();

						

						document.getElementById("Save_Button").hidden = true;
					}
				}
					else {
						this.issLoading = false;
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Error Occured", Type: "2" },
						});
						document.getElementById("Save_Button").hidden = true;
					}
				},
				(Rows) => {
					this.issLoading = false;
					document.getElementById("Save_Button").hidden = true;
					const dialogRef = this.dialogBox.open(DialogBox_Component, {
						panelClass: "Dialogbox-Class",
						data: { Message: "Error Occured", Type: "2" },
					});
				}
			);
		}
	}

	Search_Status_Typeahead(event: any) {
		var Value = "";
		if (event.target.value == "") Value = undefined;
		else Value = event.target.value;
		if (
		this.Followup_Status_Data == undefined ||
		this.Followup_Status_Data.length == 0
		) {
		this.issLoading = true;
		this.Student_Service_.Search_Status_Typeahead("", 3).subscribe(
		(Rows) => {
		if (Rows != null) {
		this.Followup_Status_Data = Rows[0];
		this.issLoading = false;
		}
		},
		(Rows) => {
		this.issLoading = false;
		}
		);
		}
		}
		display_Followup_Status(Status_: Status) {
		if (Status_) {
		return Status_.Status_Name;
		}
		}
		Status_Change(Status) {
		this.Followup_Status_ = Status;
		if (this.Followup_Status_.FollowUp == true)
		this.Next_FollowUp_Date_Visible = false;
		else this.Next_FollowUp_Date_Visible = true;
		}

		Search_User_Typeahead(event: any) {
			var Value = "";
			if (event.target.value == "") Value = "";
			else Value = event.target.value;
			if (
			this.Followup_Users_Data == undefined ||
			this.Followup_Users_Data.length == 0
			) {
			this.issLoading = true;
			this.Student_Service_.Search_Faculty_Typeahead("",0).subscribe(
			(Rows) => {
			if (Rows != null) {
			this.Followup_Users_Data = Rows[0];
			this.issLoading = false;
			
			this.Followup_Users_Data_Filter = [];
			
			for (var i = 0; i < this.Followup_Users_Data.length; i++) {
			if (
			this.Followup_Users_Data[i].Users_Name.toLowerCase().includes(
			Value
			)
			)
			this.Followup_Users_Data_Filter.push(
			this.Followup_Users_Data[i]
			);
			}
			}
			},
			(Rows) => {
			this.issLoading = false;
			}
			);
			} else {
			this.Followup_Users_Data_Filter = [];
			for (var i = 0; i < this.Followup_Users_Data.length; i++) {
			if (
			this.Followup_Users_Data[i].Users_Name.toLowerCase().includes(Value)
			)
			this.Followup_Users_Data_Filter.push(this.Followup_Users_Data[i]);
			}
			}
			}
			display_Followup_Users(Users_: Users) {
			if (Users_) {
			return Users_.Users_Name;
			}
			}





}
