import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Users_Service } from "../../../services/Users.Service";
import { DialogBox_Component } from "../DialogBox/DialogBox.component";
import { Users } from "../../../models/Users";
import { User_Sub } from "../../../models/User_Sub";
import { Employer_Details } from "../../../models/Employer_Details";
import { User_Menu_Selection } from "../../../models/User_Menu_Selection";
import { User_Type } from "../../../models/User_Type";
import { User_Status } from "../../../models/User_Status";
import { Agent } from "../../../models/Agent";
import { User_Role } from "../../../models/User_Role";
import { MatDialog } from "@angular/material";
import {
	ROUTES,
	Get_Page_Permission,
} from "../../../components/sidebar/sidebar.component";
import { Employee_Details } from "app/models/Employee_Details";
import { Designation } from "app/models/Designation";
import { Gender } from "app/models/Gender";
import { Account_Type } from "app/models/Account_Type";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";

import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
DateAdapter,
  DEC,
MAT_DATE_FORMATS,
MAT_DATE_LOCALE,
} from "@angular/material/core";

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
	parse: { dateInput: "DD/MM/YYYY" },
	display: {
	dateInput: "DD/MM/YYYY",
	monthYearLabel: "MMM YYYY",
	dateA11yLabel: "DD/MM/YYYY",
	monthYearA11yLabel: "MMMM YYYY",
	},
	};

@Component({
	selector: "app-Users",
	templateUrl: "./Users.component.html",
	styleUrls: ["./Users.component.css"],
	providers: [
		{
		provide: DateAdapter,
		useClass: MomentDateAdapter,
		deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
		],
})
export class UsersComponent implements OnInit {
	Users_Data: Users[];
	Search_User_Name_: string;

	Search_Agent_: Agent = new Agent();

	User_Menu_Selection_Data_Temp: User_Menu_Selection[] = [];
	User_Menu_Selection_Data: User_Menu_Selection[];
	User_Menu_Selection_: User_Menu_Selection = new User_Menu_Selection();

	User_Sub_Data_Temp: User_Sub[] = [];
	User_Sub_Data: User_Sub[];
	Employee_Details_Data: Employee_Details[];
	User_Sub_: User_Sub = new User_Sub();

	Users_: Users = new Users();
	Employee_Details_: Employee_Details = new Employee_Details();
	User_Type_: User_Type = new User_Type();
	User_Type_Temp: User_Type = new User_Type();
	User_Type_Data: User_Type[];

	Users_Name_Search: string;

	User_Role_Temp: User_Role = new User_Role();
	User_Role_Data: User_Role[];
	User_Role_: User_Role = new User_Role();
	User_Role_Emp_: User_Role = new User_Role();


	Designation_Temp: Designation = new Designation();
	Designation_Data: Designation[];
	Designation_: Designation = new Designation();

	Gender_Temp: Gender = new Gender();
	Gender_Data: Gender[];
	Gender_: Gender = new Gender();

	day: any;
date: any;
month: any;

	Account_Type_Temp: Account_Type = new Account_Type();
	Account_Type_Data: Account_Type[];
	Account_Type_: Account_Type = new Account_Type();

	User_Status_Data: User_Status[];
	User_Status_Temp: User_Status = new User_Status();
	User_Status_: User_Status = new User_Status();

	Agent_Data: Agent[];
	Agent_: Agent = new Agent();

	Entry_View: boolean = true;
	myInnerHeight: number;
	myTotalHeight: number;
	myInnerHeighta: number;
	EditIndex: number;
	Total_Entries: number = 0;
	color = "primary";
	mode = "indeterminate";
	value = 50;
	issLoading: boolean;
	Permissions: any;
	User_Id: number;

	Registration_Target: number;
	FollowUp_Target: number;

	Users_Edit: boolean;
	Select_View: boolean = false;
	Select_View_Department: boolean = false;
	Select_View_All_Department: boolean = false;
	Select_Save: boolean = false;
	Select_Edit: boolean = false;
	select_User: boolean = false;
	Select_Delete: boolean = false;
	Users_Save: boolean;
	Users_Delete: boolean;
	Login_User: string = "0";
	array: any;

	year: any;

	View_Password: string;
	Agent_Temp: Agent = new Agent();
	tab_view: boolean = true;
	profile_View: boolean = true;
	Employee_Tab_View: boolean = false;
	Employee_View: boolean = false;
	constructor(
		public Users_Service_: Users_Service,
		private route: ActivatedRoute,
		private router: Router,
		public dialogBox: MatDialog
	) {}
	ngOnInit() {
		this.Login_User = localStorage.getItem("Login_User");
		// this.Permissions = Get_Page_Permission(1);
		// if(this.Permissions==undefined || this.Permissions==null)
		// {
		// localStorage.removeItem('token');
		// this.router.navigateByUrl('Home_Page');
		// }
		// else
		{
			// this.Users_Edit=this.Permissions.Edit;
			// this.Users_Save=this.Permissions.Save;
			// this.Users_Delete=this.Permissions.Delete;
			this.Page_Load();
		}
	}
	Page_Load() {
		this.Get_Menu_Status(1, this.Login_User);
		this.myInnerHeight = window.innerHeight;
		this.myInnerHeight = this.myInnerHeight - 250;
		this.Search_User_Role();
		this.Search_Designation();
		this.Search_Gender();
		this.Search_Account_Type();
		this.Load_Dropdowns();
		this.Search_Users();
		this.Entry_View = false;
		this.Employee_Tab_View = false;

		this.myInnerHeight = window.innerHeight;
		this.myTotalHeight = this.myInnerHeight - 250;
		// this.myTotalHeight = this.myTotalHeight - 280;
		this.myInnerHeight = this.myInnerHeight - 350;
		this.myInnerHeighta = this.myInnerHeight - -230;
	}

	Get_Menu_Status(Menu_id, Login_user_id) {
		this.issLoading = false;
		this.Users_Service_.Get_Menu_Status(Menu_id, Login_user_id).subscribe(
			(Rows) => {
				this.array = Rows[0][0];

				if (Rows[0][0] == undefined) {
					if (Menu_id == 1) {
						localStorage.removeItem("token");
						this.router.navigateByUrl("Home_Page");
					}
				} else if (Rows[0][0].View > 0) {
					if (Menu_id == 1) {
						this.Permissions = Rows[0][0];
						if (this.Permissions == undefined || this.Permissions == null) {
							localStorage.removeItem("token");
							this.router.navigateByUrl("Home_Page");
						}
						this.Users_Edit = this.array.Edit;
						this.Users_Save = this.array.Save;
						this.Users_Delete = this.array.Delete;
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

	Create_New() {
		this.Entry_View = true;
		this.profile_View = true;
		this.Employee_View = false;
		this.Employee_Tab_View = false;
		this.Clr_Users();
		this.Clr_Employee_Details();
	}
	Close_Click() {
		let top = document.getElementById("Topdiv");
		if (top !== null) {
			top.scrollIntoView();
			top = null;
		}
		this.Clr_Users();
		this.Entry_View = false;
		this.profile_View = true;
		this.Employee_Tab_View = false;
		this.Employee_View = false;
	}
	Password_View_Click() {
		this.View_Password = this.Users_.Password;
	}
	trackByFn(index, item) {
		return index;
	}
	Clr_Users() {
		this.Select_View = false;
		this.Select_View_Department = false;
		this.Select_View_All_Department = false;
		this.Select_Edit = false;
		this.Select_Save = false;
		this.select_User = false;
		this.Select_Delete = false;
		this.View_Password = "";
		this.Users_.Users_Id = 0;
		this.Users_.Users_Name = "";
		this.Users_.Password = "";
		this.Users_.User_Type = 0;
		this.Users_.Role_Id = 0;
		this.Users_.Address1 = "";
		this.Users_.Address2 = "";
		this.Users_.Address3 = "";
		this.Users_.Address4 = "";
		this.Users_.Pincode = "";
		this.Users_.Mobile = "";
		this.Users_.Email = "";
		this.Users_.Registration_Target = 0;
		this.Users_.FollowUp_Target = 0;
		

		if (this.User_Type_Data != null && this.User_Type_Data != undefined)
			this.User_Type_ = this.User_Type_Data[0];

		if (this.User_Status_Data != null && this.User_Status_Data != undefined)
			this.User_Status_ = this.User_Status_Data[0];

		if (this.User_Role_Data != null && this.User_Role_Data != undefined)
			this.User_Role_ = this.User_Role_Data[0];

		if (this.Agent_Data != null && this.Agent_Data != undefined)
			this.Agent_ = this.Agent_Data[0];

		if (this.User_Menu_Selection_Data != undefined) {
			//&& this.User_Menu_Selection_Data!=null&&this.User_Menu_Selection_Data!=""
			for (var i = 0; i < this.User_Menu_Selection_Data.length; i++) {
				this.User_Menu_Selection_Data[i].IsDelete = false;
				this.User_Menu_Selection_Data[i].IsEdit = false;
				this.User_Menu_Selection_Data[i].IsSave = false;
				this.User_Menu_Selection_Data[i].IsView = false;
			}
		}

		if (this.User_Sub_Data != undefined) {
			//&& this.User_Menu_Selection_Data!=null&&this.User_Menu_Selection_Data!=""
			for (var i = 0; i < this.User_Sub_Data.length; i++) {
				this.User_Sub_Data[i].Check_Box = false;
			}
		}
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
		//  this.date = this.day + "-"+ this.month + "-" + this.year ;
		return this.date;
		}


	Clr_Employee_Details() {
		this.Employee_Details_.Users_Id=0;
		this.Employee_Details_.Employee_Details_Id=0;
		this.Employee_Details_.CL_No="";
		this.Employee_Details_.Employee_Code="";
		this.Employee_Details_.Client_Accounts_Name="";
		this.Employee_Details_.Pl_No="";
		
		this.Employee_Details_.DateOfJoin = "";

		this.Employee_Details_.ESI_No="";
		this.Employee_Details_.Basic_Salary="";
		this.Employee_Details_.HRA="";
		this.Employee_Details_.DA="";
		this.Employee_Details_.ESI="";
		this.Employee_Details_.PF_Percentage="";

		this.Employee_Details_.Address1="";
		this.Employee_Details_.Address2="";
		this.Employee_Details_.Address3="";
		this.Employee_Details_.Address4="";



		this.Employee_Details_.Opening_Balance="";
		this.Employee_Details_.Bank_Name="";
		this.Employee_Details_.Account_No="";
		this.Employee_Details_.Branch_Name="";
		this.Employee_Details_.IFSC_Code="";
		this.Employee_Details_.ICSC_Code="";

		this.Employee_Details_.DateOfBirth="";
		this.Employee_Details_.PF_No="";
		this.Employee_Details_.Allowance="";

		this.Employee_Details_.CL_Count=0;
		this.Employee_Details_.PL_Count=0;

		if (this.Account_Type_Data != null && this.Account_Type_Data != undefined)
			this.Account_Type_ = this.Account_Type_Data[0];

		if (this.Gender_Data != null && this.Gender_Data != undefined)
			this.Gender_ = this.Gender_Data[0];

		if (this.Designation_Data != null && this.Designation_Data != undefined)
			this.Designation_ = this.Designation_Data[0];

		
	
	}


	User_Click() {
		for (var i = 0; i < this.User_Sub_Data.length; i++) {
			if (this.select_User == false) this.User_Sub_Data[i].Check_Box = true;
			else this.User_Sub_Data[i].Check_Box = false;
		}
	}
	View_Click() {
		for (var i = 0; i < this.User_Menu_Selection_Data.length; i++) {
			if (this.Select_View == false)
				this.User_Menu_Selection_Data[i].IsView = true;
			else this.User_Menu_Selection_Data[i].IsView = false;
		}
	}
	Save_Click() {
		for (var i = 0; i < this.User_Menu_Selection_Data.length; i++) {
			if (this.Select_Save == false)
				this.User_Menu_Selection_Data[i].IsSave = true;
			else this.User_Menu_Selection_Data[i].IsSave = false;
		}
	}
	Edit_Click() {
		for (var i = 0; i < this.User_Menu_Selection_Data.length; i++) {
			if (this.Select_Edit == false)
				this.User_Menu_Selection_Data[i].IsEdit = true;
			else this.User_Menu_Selection_Data[i].IsEdit = false;
		}
	}
	Delete_Click() {
		for (var i = 0; i < this.User_Menu_Selection_Data.length; i++) {
			if (this.Select_Delete == false)
				this.User_Menu_Selection_Data[i].IsDelete = true;
			else this.User_Menu_Selection_Data[i].IsDelete = false;
		}
	}
	Search_User_Role() {
		this.Users_Service_.Search_User_Role("").subscribe(
			(Rows) => {
				this.User_Role_Data = Rows[0];
				this.User_Role_Temp.User_Role_Id = 0;
				this.User_Role_Temp.User_Role_Name = "Select";
				this.User_Role_Data.unshift(this.User_Role_Temp);
				this.User_Role_ = this.User_Role_Data[0];
			},
			(Rows) => {
				//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
			}
		);
	}


	Search_Designation() {
		this.Users_Service_.Search_Designation().subscribe(
			(Rows) => {
				debugger
				this.Designation_Data = Rows[0];
				this.Designation_Temp.Designation_Id = 0;
				this.Designation_Temp.Designation_Name = "Select";
				this.Designation_Data.unshift(this.Designation_Temp);
				this.Designation_ = this.Designation_Data[0];
			},
			(Rows) => {
				//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
			}
		);
	}

	Search_Gender() {
		this.Users_Service_.Search_Gender().subscribe(
			(Rows) => {
				debugger
				this.Gender_Data = Rows[0];
				this.Gender_Temp.Gender_Id = 0;
				this.Gender_Temp.Gender_Name = "Select";
				this.Gender_Data.unshift(this.Gender_Temp);
				this.Gender_ = this.Gender_Data[0];
			},
			(Rows) => {
				//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
			}
		);
	}

	Search_Account_Type() {
		this.Users_Service_.Search_Account_Type().subscribe(
			(Rows) => {
				debugger
				this.Account_Type_Data = Rows[0];
				this.Account_Type_Temp.Account_Type_Id = 0;
				this.Account_Type_Temp.Account_Type_Name = "Select";
				this.Account_Type_Data.unshift(this.Account_Type_Temp);
				this.Account_Type_ = this.Account_Type_Data[0];
			},
			(Rows) => {
				//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
			}
		);
	}





	Load_Dropdowns() {
		this.Users_Service_.Get_Users_Load_Data().subscribe(
			(Rows) => {
				this.User_Type_Data = Rows.User_Type;
				this.User_Menu_Selection_Data = Rows.User_Menu_Selection;
				this.User_Status_Data = Rows.User_Status;
				this.Agent_Data = Rows.Agent;
				this.User_Sub_Data = Rows.Users;

				this.User_Type_Temp.User_Type_Id = 0;
				this.User_Type_Temp.User_Type_Name = "Select";
				this.User_Type_Data.unshift(this.User_Type_Temp);
				this.User_Type_ = this.User_Type_Data[0];

				this.Agent_Temp.Agent_Id = 0;
				this.Agent_Temp.Agent_Name = "Select";
				this.Agent_Data.unshift(this.Agent_Temp);
				this.Agent_ = this.Agent_Data[0];
				this.Search_Agent_ = this.Agent_Data[0];

				this.User_Status_Temp.User_Status_Id = 0;
				this.User_Status_Temp.User_Status_Name = "Select";
				this.User_Status_Data.unshift(this.User_Status_Temp);
				this.User_Status_ = this.User_Status_Data[0];

				//    this.Users_Save_Temp.Users_Id=0;
				//    this.Users_Save_Temp.Users_Name="Select";
				//    this.Users_Save_Data.unshift(this.Users_Save_Temp);
				//    this.Users_Save = this.Users_Save_Data[0];
			},
			(Rows) => {
				const dialogRef = this.dialogBox.open(DialogBox_Component, {
					panelClass: "Dialogbox-Class",
					data: { Message: "Error Occured", Type: "2" },
				});
			}
		);
	}

	Search_Users() {
		var Search_Agent_Id = 0;

		this.issLoading = true;
		if (this.Search_User_Name_ == undefined) this.Search_User_Name_ = "";
		if (this.Search_Agent_ != undefined && this.Search_Agent_ != null)
			Search_Agent_Id = this.Search_Agent_.Agent_Id;

		this.Users_Service_.Search_Users(
			this.Search_User_Name_,
			Search_Agent_Id
		).subscribe(
			(Rows) => {
				this.Users_Data = Rows.returnvalue.Leads;
				this.Total_Entries = this.Users_Data.length;
				if (this.Users_Data.length == 0) {
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

	Delete_Users(Users_Id, index) {
		const dialogRef = this.dialogBox.open(DialogBox_Component, {
			panelClass: "Dialogbox-Class",
			data: {
				Message: "Do you want to delete ?",
				Type: "true",
				Heading: "Confirm",
			},
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result == "Yes") {
				this.issLoading = true;

				this.Users_Service_.Delete_Users(Users_Id).subscribe(
					(Delete_status) => {
						Delete_status = Delete_status[0];
						// Delete_status = Delete_status[0].DeleteStatus_;

						debugger;
						if (Delete_status[0].Users_Id_ == -2) {
							const dialogRef = this.dialogBox.open(DialogBox_Component, {
								panelClass: "Dialogbox-Class",
								data: { Message: " Cannot be Deleted", Type: "2" },
							});
						} else if (Delete_status[0].Users_Id_ > 0) {
							this.Users_Data.splice(index, 1);
							const dialogRef = this.dialogBox.open(DialogBox_Component, {
								panelClass: "Dialogbox-Class",
								data: { Message: "Deleted", Type: "false" },
							});
						} else {
							//this.Users_Data.splice(index, 1);
							const dialogRef = this.dialogBox.open(DialogBox_Component, {
								panelClass: "Dialogbox-Class",
								data: { Message: "Error Occured", Type: "2" },
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
		});
	}
	Save_Duplicate_User() {
		this.Users_.Users_Id = 0;
		this.Users_.Users_Name = null;
		this.Users_.Password = null;
		this.Save_Users();
	}

	Save_Users() {
		var Menu_Status = false;
		var User_Status = false;
		for (var i = 0; i < this.User_Menu_Selection_Data.length; i++) {
			if (this.User_Menu_Selection_Data[i].IsView == true) Menu_Status = true;
		}
		for (var i = 0; i < this.User_Sub_Data.length; i++) {
			if (this.User_Sub_Data[i].Check_Box == true) User_Status = true;
		}
		if (User_Status == false) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Atleast One User", Type: "3" },
			});
			return;
		} else if (Menu_Status == false) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Atleast One Menu", Type: "3" },
			});
			return;
		} else if (
			this.Users_.Users_Name == undefined ||
			this.Users_.Users_Name == null ||
			this.Users_.Users_Name == ""
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter the User Name", Type: "3" },
			});
			return;
		} else if (
			this.Users_.Password == undefined ||
			this.Users_.Password == null ||
			this.Users_.Password == ""
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter the Password", Type: "3" },
			});
			return;
		} else if (
			this.User_Type_ == undefined ||
			this.User_Type_ == null ||
			this.User_Type_.User_Type_Id == undefined ||
			this.User_Type_.User_Type_Id == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select User Type", Type: "3" },
			});
			return;
		} else if (
			this.User_Status_.User_Status_Id == 0 ||
			this.User_Status_.User_Status_Id == undefined ||
			this.User_Status_.User_Status_Id == null
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Status", Type: "3" },
			});
			return;
		} else if (
			this.Agent_.Agent_Id == 0 ||
			this.Agent_.Agent_Id == undefined ||
			this.Agent_.Agent_Id == null
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Branch", Type: "3" },
			});
			return;
		} else if (
			this.User_Role_.User_Role_Id == 0 ||
			this.User_Role_.User_Role_Id == undefined ||
			this.User_Role_.User_Role_Id == null
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select User Role", Type: "3" },
			});
			return;
		}

		if (
			this.Users_.Mobile == undefined ||
			this.Users_.Mobile == null ||
			this.Users_.Mobile == ""
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter Mobile Number", Type: "3" },
			});
			return;
		}

		if (this.Users_.Mobile.toString().length != 10) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter Valid Mobile Number", Type: "3" },
			});
			return;
		} else {
			this.Users_.User_Type = this.User_Type_.User_Type_Id;
			this.Users_.Working_Status = this.User_Status_.User_Status_Id;
			this.Users_.User_Type = this.User_Type_.User_Type_Id;
			this.Users_.Agent_Id = this.Agent_.Agent_Id;
			this.Users_.Role_Id = this.User_Role_.User_Role_Id;

			this.User_Menu_Selection_Data_Temp = [];
			for (var i = 0; i < this.User_Menu_Selection_Data.length; i++) {
				if (
					Boolean(this.User_Menu_Selection_Data[i].IsView) == true ||
					Boolean(this.User_Menu_Selection_Data[i].IsSave) == true ||
					Boolean(this.User_Menu_Selection_Data[i].IsEdit) == true ||
					Boolean(this.User_Menu_Selection_Data[i].IsDelete) == true
				) {
					this.User_Menu_Selection_Data_Temp.push(
						this.User_Menu_Selection_Data[i]
					);
				}
			}
			this.Users_.User_Menu_Selection_Data = this.User_Menu_Selection_Data_Temp;

			this.User_Sub_Data_Temp = [];
			for (var i = 0; i < this.User_Sub_Data.length; i++) {
				if (Boolean(this.User_Sub_Data[i].Check_Box) == true) {
					this.User_Sub_Data_Temp.push(this.User_Sub_Data[i]);
				}
			}
			this.Users_.User_Sub_Data = this.User_Sub_Data_Temp;

			this.issLoading = true;

			this.Users_Service_.Save_Users(this.Users_).subscribe(
				(Save_status) => {
					if (Number(Save_status[0].Users_Id_) > 0) {
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Saved", Type: "false" },
						});
						this.Search_Users();
					}
					// else if(Number(Save_status[0].Users_Id_)==-1){
					//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'User Limit Exceeded',Type:"2"}});
					// }
					else {
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Error Occured", Type: "2" },
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
			this.Clr_Users();
		}
	}


	Save_Employee_Details() {
		



		if (
			this.Employee_Details_.Employee_Code == undefined ||
			this.Employee_Details_.Employee_Code == null ||
			this.Employee_Details_.Employee_Code == ""
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter Employee Code", Type: "3" },
			});
			return;
		} 


		if (
			this.Employee_Details_.Client_Accounts_Name == undefined ||
			this.Employee_Details_.Client_Accounts_Name == null ||
			this.Employee_Details_.Client_Accounts_Name == ""
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter Employee Name", Type: "3" },
			});
			return;
		} 


		if (
			this.Gender_ == undefined ||
			this.Gender_ == null ||
			this.Gender_.Gender_Id == undefined ||
			this.Gender_.Gender_Id == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Gender", Type: "3" },
			});
			return;
		}

		if (
			this.Designation_ == undefined ||
			this.Designation_ == null ||
			this.Designation_.Designation_Id == undefined ||
			this.Designation_.Designation_Id == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Designation", Type: "3" },
			});
			return;
		}

		if (
			this.Employee_Details_.Basic_Salary == undefined ||
			this.Employee_Details_.Basic_Salary == null ||
			this.Employee_Details_.Basic_Salary == ""
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter Basic Salary", Type: "3" },
			});
			return;
		} 
		if (
			this.Employee_Details_.CL_Count == undefined ||
			this.Employee_Details_.CL_Count == null ||
			this.Employee_Details_.CL_Count == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter Cl Count", Type: "3" },
			});
			return;
		} 
		if (
			this.Employee_Details_.PL_Count == undefined ||
			this.Employee_Details_.PL_Count == null ||
			this.Employee_Details_.PL_Count == 0
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Enter Pl Count", Type: "3" },
			});
			return;
		} 
		debugger
		if (
			this.Employee_Details_.DateOfJoin == undefined ||
			this.Employee_Details_.DateOfJoin == null 	||
			this.Employee_Details_.DateOfJoin == "NaN-NaN-NaN" 	|| this.Employee_Details_.DateOfJoin == "" 
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Date of Join", Type: "3" },
			});
			return;
		} 


		if (
			this.Employee_Details_.DateOfBirth == undefined ||
			this.Employee_Details_.DateOfBirth == null 	||
			this.Employee_Details_.DateOfBirth == "NaN-NaN-NaN" 	|| this.Employee_Details_.DateOfBirth == "" 
		) {
			const dialogRef = this.dialogBox.open(DialogBox_Component, {
				panelClass: "Dialogbox-Class",
				data: { Message: "Select Date Of Birth", Type: "3" },
			});
			return;
		} 

		

			this.issLoading = true;
			this.Employee_Details_.User_Id=this.User_Id;

			this.Employee_Details_.Gender_Id=this.Gender_.Gender_Id;
			this.Employee_Details_.Gender_Name=this.Gender_.Gender_Name;

			this.Employee_Details_.Account_Type_Id=this.Account_Type_.Account_Type_Id;
			this.Employee_Details_.Account_Type_Name=this.Account_Type_.Account_Type_Name;

			this.Employee_Details_.Designation_Id=this.Designation_.Designation_Id;
			this.Employee_Details_.Designation_Name=this.Designation_.Designation_Name;

			this.Employee_Details_.DateOfJoin = this.New_Date(new Date(moment(this.Employee_Details_.DateOfJoin).format("YYYY-MM-DD")));
			this.Employee_Details_.DateOfBirth = this.New_Date(new Date(moment(this.Employee_Details_.DateOfBirth).format("YYYY-MM-DD")));
debugger
			this.Users_Service_.Save_Employee_Details(this.Employee_Details_).subscribe(
				(Save_status) => {
					debugger
					if (Number(Save_status[0].Employee_Details_Id_) > 0) {
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Saved", Type: "false" },
						});
						this.Search_Users();
					}
					else {
						const dialogRef = this.dialogBox.open(DialogBox_Component, {
							panelClass: "Dialogbox-Class",
							data: { Message: "Error Occured", Type: "2" },
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
			this.Clr_Employee_Details();
		}
	




	Get_Users_Edit(Users_Id) {
		this.issLoading = true;
		this.Users_Service_.Get_Users_Edit(Users_Id).subscribe(
			(Rows) => {
				debugger
				this.User_Menu_Selection_Data = Rows[0].Menu;
				this.User_Sub_Data = Rows[0].User_Sub;
				this.Employee_Details_Data=Rows[0].Employee;

				

				this.Employee_Details_ = Object.assign({}, this.Employee_Details_Data[0]);

				for (var i = 0; i < this.Gender_Data.length; i++) {
					if (this.Employee_Details_.Gender_Id == this.Gender_Data[i].Gender_Id)
						this.Gender_ = this.Gender_Data[i];
				}
						for (var i = 0; i < this.Designation_Data.length; i++) {
							if (this.Employee_Details_.Designation_Id == this.Designation_Data[i].Designation_Id)
								this.Designation_ = this.Designation_Data[i];
						}

								for (var i = 0; i < this.Account_Type_Data.length; i++) {
									if (this.Employee_Details_.Account_Type_Id == this.Account_Type_Data[i].Account_Type_Id)
										this.Account_Type_ = this.Account_Type_Data[i];	
								}			
debugger
				this.Employee_Details_.DateOfJoin = this.New_Date(
							new Date(moment(this.Employee_Details_.DateOfJoin).format("YYYY-MM-DD")));
				this.Employee_Details_.DateOfBirth = this.New_Date(
					new Date(moment(this.Employee_Details_.DateOfBirth).format("YYYY-MM-DD")));


				for (var i = 0; i < this.User_Sub_Data.length; i++) {
					if (this.User_Sub_Data[i].Check_Box.toString() == "1") {
						this.User_Sub_Data[i].Check_Box = true;
					} else {
						this.User_Sub_Data[i].Check_Box = false;
					}
				}

				for (var j = 0; j < this.User_Menu_Selection_Data.length; j++) {
					if (this.User_Menu_Selection_Data[j].IsView.toString() == "1")
						this.User_Menu_Selection_Data[j].IsView = true;
					else this.User_Menu_Selection_Data[j].IsView = false;
					if (this.User_Menu_Selection_Data[j].IsEdit.toString() == "1")
						this.User_Menu_Selection_Data[j].IsEdit = true;
					else this.User_Menu_Selection_Data[j].IsEdit = false;
					if (this.User_Menu_Selection_Data[j].IsSave.toString() == "1")
						this.User_Menu_Selection_Data[j].IsSave = true;
					else this.User_Menu_Selection_Data[j].IsSave = false;
					if (this.User_Menu_Selection_Data[j].IsDelete.toString() == "1")
						this.User_Menu_Selection_Data[j].IsDelete = true;
					else this.User_Menu_Selection_Data[j].IsDelete = false;
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


	Edit_Users(Users_e: Users, index) {
		debugger;
		this.Entry_View = true;
		this.Entry_View = true;
		this.profile_View = true;
		this.Employee_Tab_View = true;
		this.Users_ = Users_e;
		this.User_Id = Users_e.Users_Id;
		this.Users_ = Object.assign({}, Users_e);
debugger;
		this.Get_Users_Edit(this.Users_.Users_Id);
		debugger;
		for (var i = 0; i < this.User_Type_Data.length; i++) {
			if (this.Users_.User_Type == this.User_Type_Data[i].User_Type_Id)
				this.User_Type_ = this.User_Type_Data[i];
		}
		for (var i = 0; i < this.User_Status_Data.length; i++) {
			if (this.Users_.Working_Status == this.User_Status_Data[i].User_Status_Id)
				this.User_Status_ = this.User_Status_Data[i];
		}
		for (var i = 0; i < this.Agent_Data.length; i++) {
			if (this.Users_.Agent_Id == this.Agent_Data[i].Agent_Id)
				this.Agent_ = this.Agent_Data[i];
		}
		for (var i = 0; i < this.User_Role_Data.length; i++) {
			if (this.Users_.Role_Id == this.User_Role_Data[i].User_Role_Id)
				this.User_Role_ = this.User_Role_Data[i];
		}
		debugger;
	}
	Tab_Click(Current_tab) {
		this.profile_View = false;
		this.Employee_View = false;
		
		if (Current_tab == 1) {
			this.profile_View = true;
		} else if (Current_tab == 2) {
			debugger;
			
			this.Employee_View = true;
			// this.Employee_View=true;
			this.profile_View = false;
		}
	}
}
