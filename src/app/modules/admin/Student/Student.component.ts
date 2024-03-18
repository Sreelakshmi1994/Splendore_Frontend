import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Student_Service } from "../../../services/Student.service";
import { DialogBox_Component } from "../DialogBox/DialogBox.component";
import { Student } from "../../../models/Student";
import { Student_Followup } from "../../../models/Student_Followup";
import { Course } from "../../../models/Course";
import { Batch } from "../../../models/Batch";
import { Installment_Type } from "../../../models/Installment_Type";
import { Enquiry_Source } from "../../../models/Enquiry_Source";
import { Gender } from "../../../models/Gender";
import { Status } from "../../../models/Status";
import { Users } from "../../../models/Users";
import { Student_Course } from "../../../models/Student_Course";
import { Batch_Service } from "../../../services/Batch.service";
import { Student_Course_Subject } from "../../../models/Student_Course_Subject";
import { Student_Fees_Installment_Master } from "../../../models/Student_Fees_Installment_Master";
import { Student_Fees_Installment_Details } from "../../../models/Student_Fees_Installment_Details";
import { Student_Fees_Installment_Save } from "../../../models/Student_Fees_Installment_Save";
import { Mode } from "../../../models/Mode";
import { Client_Accounts } from "../../../models/Client_Accounts";
import { Receipt_Voucher } from "../../../models/Receipt_Voucher";
import { environment } from "../../../../environments/environment";
import { Course_Subject } from "../../../models/Course_Subject";
import { Exam_Status } from "../../../models/Exam_Status";
import { Company } from "../../../models/Company";
import { State } from "../../../models/State";
import { Laptopdetails } from "../../../models/Laptopdetails";
import { Agent } from "../../../models/Agent";
import { State_District } from "../../../models/State_District";
import { Qualification } from "../../../models/Qualification";
import { Mark_List_Master } from "../../../models/Mark_List_Master";
import { Mark_List } from "../../../models/Mark_List";
import { Exam } from "../../../models/Exam";
import { Exam_Type } from "../../../models/Exam_Type";
import { Exam_Result } from "../../../models/Exam_Result";
import { Mastercourse } from "../../../models/Mastercourse";
import { MarkStatus } from "../../../models/MarkStatus";
import { Attendance_Master } from "../../../models/Attendance_Master";
import { Course_Service } from "../../../services/Course.Service";
import * as io from "socket.io-client";
import {
  ROUTES,
  Get_Page_Permission,
} from "../../../components/sidebar/sidebar.component";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatGridTileHeaderCssMatStyler,
} from "@angular/material";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  DEC,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
import { Hostel_Fees_Master } from "../../../models/Hostel_Fees_Master";
import { Hostel_Fees_details } from "../../../models/Hostel_Fees_details";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Remark_Details } from "../../../models/Remark_Details";
import { Student_Remark } from "../../../models/Student_Remark";
import { Enquiry_For } from "../../../models/Enquiry_For";
import { Applicationdetails } from "../../../models/Applicationdetails";
import { Country } from "../../../models/Country";
import { Applicationdocument } from "../../../models/Applicationdocument";
import { ApplicationStatus } from "../../../models/ApplicationStatus";
import { University } from "../../../models/University";
import { Intake } from "../../../models/Intake";
import { Intake_Year } from "../../../models/Intake_Year";
import { ApplicationdetailsHistory } from "../../../models/ApplicationdetailsHistory";
import { Application_Course } from "../../../models/Application_Course";
import { Application_University } from "../../../models/Application_University";
import { Fees_Receipt } from "../../../models/Fees_Receipt";
import { Fees_Receipt_Application } from "../../../models/Fees_Receipt_Application";
import { Currency } from "../../../models/Currency";
import { Fees } from "../../../models/Fees";
import { Application_Status } from "../../../models/Application_Status";
import { Mode_Of_Study } from "../../../models/Mode_Of_Study";
import { Student_Process } from "app/models/Student_Process";
import { Process_Type } from "app/models/Process_Type";
import { Document_Type } from "app/models/Document_Type";
import { Student_Document_Type } from "app/models/Student_Document_Type";
import { Student_Document_Type_Master } from "app/models/Student_Document_Type_Master";
//import { debug } from 'console';
// import { userInfo } from 'os';
// import { debug } from 'console';
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
  selector: "app-Student",
  templateUrl: "./Student.component.html",
  styleUrls: ["./Student.component.css"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class StudentComponent implements OnInit {
  EditIndex: number;
  Total_Entries: number = 0;
  color = "primary";
  mode = "indeterminate";
  value = 50;
  issLoading: boolean;
  Permissions: any;
  Fees_Receipt_Permissions: any;
  Student_Edit: boolean;
  Student_Save: boolean;
  Student_Delete: boolean;
  myInnerHeight: number;
  myInnerHeightTwo: number;
  myTotalHeight: number;
  Installment_Index: number;
  year: any;
  month: any;
  monthnew: any;
  DOB: string;
  Exam_Date: string;
  day: any;
  Is_Agent:boolean;
  date: any;
  More_Search_Options: boolean = true;
  myInnerHeighttemp: number;
  Entry_View: boolean = true;
  Message: string;

  Button_level: boolean = true;
  tab_view: boolean = true;
  Course_Tab: boolean = true;
  clickview: boolean = true;
  profile_View: boolean = true;
  Documents_View: boolean = true;
  profile_View_followup: boolean = true;
  Fees_View: boolean = false;
  Resumesending_View: boolean = false;
  Interview_View: boolean = false;
  Placement_View: boolean = false;
  Hostel_View: boolean = false;
  ExamResult_View: boolean = false;
  ExamGraph_View: boolean = false;
  ExamLevelGraph_View: boolean = true;
  Course_Details_View: boolean = false;
  Resume_Sending_tab_Permission: any;
  Resume_Sending_View: boolean = false;
  Fees_tab_Permission: any;
  Fees_tab_View: boolean = false;
  Fees_Save_View: boolean = false;
  Fees_tab_Edit: boolean = false;
  Examresult_tab_Edit: boolean = false;
  Student_CourseDetails_Edit: boolean = false;
  Fees_tab_Delete: boolean = false;
  Course_View: boolean = false;
  Course_Tab_Permission: any;
  Profile_Tab_Permission: any;
  Profile_Tab_View: boolean = false;

  Resume_Sending_Tab_View: boolean = false;
  Course_Tab_Edit: boolean = false;
  Course_Tab_Save: boolean = false;
  Course_Tab_Delete: boolean = false;
  Course_Tab_View: boolean = false;
  Resume_Sending_Tab_Edit: boolean = false;
  Profile_Tab_Edit: boolean = false;
  Mark_tab_Permission: any;
  Mark_tab_View: boolean = false;
  Mark_tab_Edit: boolean = false;

  To_Account_Id: number;
  level_tab_view: boolean = false;

  // Applicn_tab_view:boolean=false;

  Mark_View: boolean = true;
  Show_Followup_History: boolean = true;
  View_Follow_: boolean = true;
  View_Student_: boolean = true;
  Show_FollowUp: boolean = true;
  View_History_: boolean = true;

  Flag_Followup: number = 0;
  Flag_Student: number = 0;
  Flag_Course: number = 0;
  Student_Id_Edit: number = 0;
  Registration: boolean = false;
  Student_Id: number = 0;
  Student_Name: string;

  Registration_fees_View: boolean = false;

  Reg: number = 0;
  Student_Data: Student[];
  Student_: Student = new Student();
  Student_Name_Search: string;

  Student_Followup_: Student_Followup = new Student_Followup();
  Student_Followup_Data: Student_Followup[];

  Gender_: Gender = new Gender();
  Gender_Temp: Gender = new Gender();
  Gender_Data: Gender[];
  Missed_Count: number = 0;

  Enquiry_Source_: Enquiry_Source = new Enquiry_Source();
  Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source();
  Enquiry_Source_Data: Enquiry_Source[];



  Enquiry_For_: Enquiry_For = new Enquiry_For()
  Enquiry_For_Temp: Enquiry_For = new Enquiry_For();
  Enquiry_For_Data: Enquiry_For[];



  Associates_Agent_: Client_Accounts = new Client_Accounts()
  Associates_Agent_Temp: Client_Accounts = new Client_Accounts();
  Associates_Agent_Data: Client_Accounts[];

  Processing_Agent_: Client_Accounts = new Client_Accounts()
  Processing_Agent_Temp: Client_Accounts = new Client_Accounts();
  Processing_Agent_Data: Client_Accounts[];





  State_: State = new State();
  State_Temp: State = new State();
  State_Data: State[];

  District_: State_District = new State_District();
  State_District_Temp: State_District = new State_District();
  State_District_Data: State_District[];
  State_District_Data_Filter: State_District[];

  Qualification_: Qualification = new Qualification();
  Qualification_Search: Qualification = new Qualification();
  Qualification_Temp: Qualification = new Qualification();
  Qualification_Data: Qualification[];


  Mastercourse_: Mastercourse = new Mastercourse();
  Mastercourse_Temp: Mastercourse = new Mastercourse();
  Mastercourse_Data: Mastercourse[];

  Student_Attendance_Data: Attendance_Master[];

  Course_Student_Search: Course = new Course();
  Course_Student: Course = new Course();
  Course_: Course = new Course();
  Course_Temp: Course = new Course();
  Course_Data: Course[];
  Course_Data_Filter: Course[];


  // Is_Processing_commision:boolean=false;


  Batch_: Batch = new Batch();
  Batch_Student_Search: Batch = new Batch();
  Batch_Temp: Batch = new Batch();
  Batch_Data: Batch[];
  Batch_Data_Filter: Batch[];
  Next_Batch_Date_Visible: boolean = true;

  Followp_History_Data: Student[];

  Search_Status: Status = new Status();
  Search_Status_Temp: Status = new Status();
  Status_Data: Status[];

  Followup_Status_: Status = new Status();
  Followup_Status_Data: Status[];
  Followup_Status_Temp: Status = new Status();
  Next_FollowUp_Date_Visible: boolean = true;

  Users_Search: Users = new Users();
  Users_Search_Temp: Users = new Users();
  Users_Data: Users[];

  Followup_Users_: Users = new Users();
  Followup_Users_Data: Users[];
  Faculty_Users_Data: Users[];
  Followup_Users_Data_Filter: Users[];
  Faculty_Users_Data_Filter: Users[];
  Followup_Users_Temp: Users = new Users();
  Followup_Users_Temp_c: Users = new Users();
  Faculty_: Users = new Users();
  Faculty_Temp: Users = new Users();

  Save_Call_Status: boolean = false;
  Photo: string;
  Display_Photo_: string;
  ImageFile_Photo: any;
  Login_User: number = 0;
  Is_Registered: any;

  Page_Start: number = 0;
  Page_End: number = 0;
  Page_Length: number = 25;
  Page_Length_: number = 25;
  Black_Start: number = 1;
  Black_Stop: number = 0;
  Red_Start: number = 1;
  Red_Stop: number = 0;
  Total_Rows: number = 0;
  missedfollowup_count: number = 1;
  followup_count: number = 0;
  nextflag: number;
  Search_Name: "";

  Change_Level_Data: boolean = false;


  Look_In_Date: boolean = false;
  Search_FromDate: Date = new Date();
  Search_ToDate: Date = new Date();

  Registration_Visiblility: boolean;
  Remove_Registration_Visibility: boolean;
  Registration_Permissions: any;
  Remove_Registration_Permissions: any;

  Course_Selection_Permission: any;
  Course_Selection_Visibility: boolean;

  Student_EditIndex: number = -1;

  Student_Course_Subject_: Student_Course_Subject =
    new Student_Course_Subject();
  Student_Course_Subject_Temp: Student_Course_Subject =
    new Student_Course_Subject();
  Student_Course_Subject_Data: Student_Course_Subject[];

  Student_Course_: Student_Course = new Student_Course();
  Student_Course_Temp: Student_Course = new Student_Course();
  Student_Course_Data: Student_Course[];
  Branch_Course_Data: any;
  Student_Course_Data_l: Student_Course[];
  Student_Course_Click_Data: Student_Course[];

  Student_Fees_Installment_Master_: Student_Fees_Installment_Master =
    new Student_Fees_Installment_Master();
  Student_Fees_Installment_Master_Temp: Student_Fees_Installment_Master =
    new Student_Fees_Installment_Master();
  Student_Fees_Installment_Master_Data: Student_Fees_Installment_Master[];
  Student_Fees_Installment_Details_: Student_Fees_Installment_Details =
    new Student_Fees_Installment_Details();
  Student_Fees_Installment_Details_Temp: Student_Fees_Installment_Details =
    new Student_Fees_Installment_Details();
  Student_Fees_Installment_Details_Data: Student_Fees_Installment_Details[];

  Fees_Master_Id: number = 0;
  Student_Fees_Installment_Save_: Student_Fees_Installment_Save =
    new Student_Fees_Installment_Save();
  Student_Fees_Installment_Save_Data: Student_Fees_Installment_Save[];
  Student_Fees_Installment_Save_Temp: Student_Fees_Installment_Save =
    new Student_Fees_Installment_Save();

  Course_Click_Status: boolean = false;
  Fees_Click_Status: boolean = false;
  Mark_Click_Status: boolean = false;
  date_Temp: Date = new Date();
  
  Course_Id_Edit: number = 0;
  Student_Course_Id_Edit: number = 0;
  Subject_: Course_Subject = new Course_Subject();
  Course_Subject_Data: Course_Subject[];
  Subject_Temp: Course_Subject = new Course_Subject();

  Exam_Status_: Exam_Status = new Exam_Status();
  Exam_Status_Temp: Exam_Status = new Exam_Status();
  Exam_Status_Data: Exam_Status[];


  Exam_: Exam = new Exam();
  Exam_Temp: Exam = new Exam();
  Exam_Data: Exam[];


  Exam_Type_: Exam_Type = new Exam_Type();
  Exam_Type_Temp: Exam_Type = new Exam_Type();
  Exam_Type_Data: Exam_Type[];


  Mark_List_Master_: Mark_List_Master = new Mark_List_Master();
  Mark_List_Master_Data: Mark_List_Master[];

  Mark_List_: Mark_List = new Mark_List();
  Mark_List_Data: Mark_List[];
  Mark_List_Index: number = -1;

  Receipt_History_View: boolean = false;
  Receipt_View: boolean = false;
  ExamresultView: boolean = false;
  Mode: Mode = new Mode();
  Mode_Temp: Mode = new Mode();
  Mode_Data: Mode[];


  Laptopdetails_: Laptopdetails = new Laptopdetails();
  Laptopdetails_Temp: Laptopdetails = new Laptopdetails();
  Laptopdetails_Data: Laptopdetails[];

  Student_Id_localStorage: string = "";
  User_Mobile: number;

  Installment_Type: Installment_Type = new Installment_Type();
  Installment_Type_Temp: Installment_Type = new Installment_Type();
  Installment_Type_Data: Installment_Type[];



  MarkStatus_Type: MarkStatus = new MarkStatus();
  MarkStatus_Type_Temp: MarkStatus = new MarkStatus();
  MarkStatus_Type_Data: MarkStatus[];




  Receipt_Voucher_: Receipt_Voucher = new Receipt_Voucher();
  Receipt_Voucher_Data: Receipt_Voucher[];

  Exam_Result_Data: Exam_Result[];
  Client_Accounts_: Client_Accounts = new Client_Accounts();
  Client_Accounts_Temp: Client_Accounts = new Client_Accounts();
  Client_Accounts_Data: Client_Accounts[];

  Company_Name: string;
  Address1: string;
  Address2: string;
  Address3: string;
  PinCode: string;
  GSTNo: string;
  Phone: string;

  Old_Course_Id: number;

  course_name: string;

  ImageFile_Photo_view: string;
  Batch_View: boolean = true;
  Start_Date: Date;
  End_Date: Date;
  batch_id: number;
  Resume_Click_Status: boolean = false;

  Transaction_Report_Master_Data: any;
  Is_Date: boolean = true;
  FromDate_: Date = new Date();
  ToDate_: Date = new Date();

  Interview_Report_Master_Data: any;
  Placed_Report_Master_Data: any;

  minDate = new Date();
  Login_User_Name: string;
  Mail_sms_Status: number;
  Status_Id: number;

  User_Id: number;
  print_Agent_Name: string;
  print_Agent_Address1: string;
  print_Agent_Address2: string;
  print_Agent_Address3: string;
  print_Agent_Address4: string;
  print_Agent_pincode: string;
  print_Agent_Phone: string;
  print_Agent_Mobile: string;
  print_Agent_Email: string;

  Companyprint_Data: Company[];
  print_Company_Name: string;
  print_Company_Address1: string;
  print_Company_Address2: string;
  print_Company_Address3: string;
  print_Company_Address4: string;
  print_Company_pincode: string;
  print_Company_Phone: string;
  print_Company_Mobile: string;
  print_Company_Email: string;
  print_Company_Website: string;
  Company_: Company = new Company();
  print_voucher_no: number;
  print_account_name: string;
  print_Paid_date: Date;
  print_Description: string;
  print_amount: number;
  print_paid: string;

  Agentprint_Data: Agent[];
  Fees_edit_permission: any;
  Edit_Student_CourseDetails: any;
  Fees_Amount_Edit: boolean = false;
  coursedetails_Edit: boolean = false;
  Hostel_Fees_Master_: Hostel_Fees_Master = new Hostel_Fees_Master();
  Hostel_Fees_Master_Data: Hostel_Fees_Master[];
  Hostel_Fees_Master_Data_t: Hostel_Fees_Master[];
  Hostel_Fees_Master_Temp: Hostel_Fees_Master = new Hostel_Fees_Master();
  Hostel_Fees_Details_Data: Hostel_Fees_details[];

  Hostel_Fees_Details_Temp_Data: Hostel_Fees_details[];
  Hostel_Fees_details_: Hostel_Fees_details = new Hostel_Fees_details();

  ExamResult_: Exam_Result = new Exam_Result();

  Remark_Details_: Remark_Details = new Remark_Details()
  Remark_Details_Temp: Remark_Details = new Remark_Details();
  Remark_Details_Data: Remark_Details[];
  Remark_View: boolean = false;
  
 Process_View: boolean=false;
  Student_Remark_: Student_Remark = new Student_Remark()
  Student_Remark_Data: Student_Remark[]


  Process_Type_: Process_Type = new Process_Type();
  Process_Type_Temp: Process_Type = new Process_Type();
  Process_Type_Data: Process_Type[];



 Process_Details_:  Process_Type = new Process_Type()
 Process_Details_Temp: Process_Type = new Process_Type();
Process_Details_Data: Process_Type[];



  Student_Process_: Student_Process = new Student_Process()
  Student_Process_Data: Student_Process[]


  Buttons_View: boolean = true
  Document_permission: any;
  Remark_permission: any;
  Process_permission: any;
  Document_View_Permission: boolean = false;
  Remark_Save_Permission: boolean = false;
  Remark_Edit_Permission: boolean = false;
  Remark_View_Permission: boolean = false;
  Remark_Delete_Permission: boolean = false;

  Process_Save_Permission: boolean = false;
  
  Process_Edit_Permission: boolean = false;
  Process_View_Permission: boolean = false;
  Process_Delete_Permission: boolean = false;


  Hostel_permission: any;
  Hostel_Save_Permission: boolean = false;
  Hostel_Edit_Permission: boolean = false;
  Hostel_View_Permission: boolean = false;
  Hostel_Delete_Permission: boolean = false;


  ExamResult_permission: any;
  ExamResult_Edit_Permission: boolean = false;
  ExamResult_View_Permission: boolean = false;
  ExamResult_Delete_Permission: boolean = false;
  ExamResult_Save_Permission: boolean = false;


  ExamGraph_permission: any;
  ExamGraph_Edit_Permission: boolean = false;
  ExamGraph_View_Permission: boolean = false;
  ExamGraph_Delete_Permission: boolean = false;


  ExamLevelsGraph_permission: any;
  ExamLevelsGraph_Edit_Permission: boolean = false;
  ExamLevelsGraph_View_Permission: boolean = false;
  ExamLevelsGraph_Delete_Permission: boolean = false;
  ExamLevelsGraph_Save_Permission: boolean = false;



  // Process_View_Permission: boolean = false;

  Regtn_fees_View: boolean = false;
  reg_fees_save: boolean = false;



  Applicationmodal_View: boolean = false;
  application_details_View: boolean = false;
  Application_Tab_Edit: boolean = false;
  Application_Tab_Save: boolean = false;
  Application_Tab_Delete: boolean = false;
  Application_Tab_View: boolean = false;
  Application_Tab_Permission: any;
  Application_Fees_Tab_Permission: any;
  ApplicationDetails_Temp: Applicationdetails = new Applicationdetails();
  ApplicationDetails_Search_Temp: Applicationdetails = new Applicationdetails();
  ApplicationDetails_: Applicationdetails = new Applicationdetails();
  ApplicationDetails_Data: Applicationdetails[];
  Course_Link_Button: boolean = false;
  Save_Student_Approved_Status: number;
  ApplicationDocument_Array: Applicationdocument[];
  Bph_Approved_Status: number;
  Duration_Id: number = 0;
  ImageFile_Application: any;
  ApplicationDocument_File_Array: any[];
  Application_Country_: Country = new Country();
  Application_Status_Mode_: ApplicationStatus = new ApplicationStatus();
  Application_Status_Mode_Temp: ApplicationStatus = new ApplicationStatus();
  Application_Status_Mode_Data: ApplicationStatus[];
  University_Data_Filter: University[];
  University_: University = new University();
  University_1: University = new University();
  Intake_Mode_: Intake = new Intake();
  Intake_Mode_Temp: Intake = new Intake();
  Intake_Mode_Data: Intake[];
  Intake_Year_Mode_: Intake_Year = new Intake_Year();
  Intake_Year_Mode_Temp: Intake_Year = new Intake_Year();
  Intake_Year_Mode_Data: Intake_Year[];
  Agent_Mode_: Agent = new Agent();
  Agent_Mode_Temp: Agent = new Agent();
  Agent_Mode_Data: Agent[];
  ApplicationDocument_Description: string;
  Display_ApplicationFile_: string;
  Edit_save_button_view: boolean = true;
  Old_Application_Status_Id: number;
  Country_Temp: Country = new Country();
  University_Temp: University = new University();
  Activte_Visiblility: boolean;
  Remove_Activte_Visiblility: boolean;
  Activity_Permissions: any;
  Remove_Activity_Permissions: any;
  History_View: boolean = false;
  Change_Status_View: boolean = false;
  ApplicationdetailsHistory_Data: ApplicationdetailsHistory[];
  Applicationdocument_Data: Applicationdocument[];

  Course_Temp_Data_: Course = new Course();
  Course_Temp_Array: Course[];
  University_Temp_Data_: University = new University();
  University_Temp_Array: University[];
  Country_Temp_Data_: Country = new Country();
  Country_Temp_Array: Country[];

  University_Data: University[];
  Country_Data: Country[];
  Country_Data_Filter: Country[];
  ApplicationDisplay_File_Name_: string;
  Agent_View: boolean;


  Application_Course_: Application_Course = new Application_Course();
  Application_Course_Temp: Application_Course = new Application_Course();
  Application_Course_Data: Application_Course[];
  Application_Course_Data_Filter: Application_Course[];


  Application_University_: Application_University = new Application_University();
  Application_University_Temp: Application_University = new Application_University();
  Application_University_Data: Application_University[];
  Application_University_Data_Filter: Application_University[];

  Fee_Collection_View: boolean = false;
  Feesmodal_View: boolean = true;

  Fees_Receipt_: Fees_Receipt_Application = new Fees_Receipt_Application();
  Fees_Receipt_Data: Fees_Receipt_Application[];
  // ApplicationDocument_Array: Applicationdocument[];
  // FeesreceiptDocument_Array: feesreceiptdocument[];
  FeesreceiptDocument_File_Array: any[];
  ImageFile_Feesreceipt: any;

  To_Account_: Client_Accounts = new Client_Accounts();
  To_Account_Temp: Client_Accounts = new Client_Accounts();
  To_Account_Data: Client_Accounts[];
  Fees_Array: Fees[];


  Application_Status_: Application_Status = new Application_Status();
  Application_Status_Temp: Application_Status = new Application_Status();
  Application_Status_Data: Application_Status[];

  Document_Type_: Document_Type = new Document_Type();
  Document_Type_Temp: Document_Type = new Document_Type();
  Document_Type_Data: Document_Type[];

  // Student_Document_Type_: Student_Document_Type = new Student_Document_Type();
  // Student_Document_Type_Temp: Student_Document_Type = new Student_Document_Type();
  // Student_Document_Type_Data: Student_Document_Type[];
  // Student_Document_Type_Selection_Data_Temp: Student_Document_Type[] = [];


  Student_Document_Type_Selection_Data_Temp: Student_Document_Type[] = [];
  Student_Document_Type_Selection_Data: Student_Document_Type[];
  Student_Document_Type_Master_: Student_Document_Type_Master =new Student_Document_Type_Master();
  Student_Document_Type_Master_Data: Student_Document_Type_Master[];
  Document_Type_Selection_Data: Student_Document_Type[];

  Admission_Branch_: Agent = new Agent();
  Offline_Branch_: Agent = new Agent();
  Branch_Temp: Agent = new Agent();
  Branch_Data: Agent[];


  Mode_Of_Study_: Mode_Of_Study = new Mode_Of_Study();
  Mode_Of_Study_Temp: Mode_Of_Study = new Mode_Of_Study();
  Mode_Of_Study_Data: Mode_Of_Study[];


  Application_Status_Id

  Currency_: Currency = new Currency();
  Currency_Temp: Currency = new Currency();
  Currency_Data: Currency[];

  Fees_Temp: Fees = new Fees();
  Fees_Data_: Fees = new Fees();

  Receipt_data: any;

  Application_Fees_Tab_Edit: boolean = false;
  Application_Fees_Tab_Save: boolean = false;
  Application_Fees_Tab_Delete: boolean = false;
  Application_Fees_Tab_View: boolean = false;

  backbutton_view: boolean = false;

  stu_id_tab = 0;
  stu_course_id_tab = 0;
  course_id_tab = 0;



  ExamResult_title = 'R';
  ExamResult_type = 'ColumnChart';

  ExamResult_Chart = [

  ];
  ExamResult_columnNames = [];
  ExamResult_options = {
    is3D: true,
    colors: ['#fbea55', '#9d9d9d'],
    bar: { groupWidth: "15%" }

  };
  width = 550;
  height = 400;


  Title_Bar = '';
  Type_Bar = '';
  Data_Bar = [

  ];
  columnNames_Bar = [];
  options_Bar = {
    is3D: true,
  };




  ExamResultL_title = 'L';
  ExamResultL_type = 'ColumnChart';

  ExamResultL_Chart = [

  ];
  ExamResultL_columnNames = [];
  ExamResultL_options = {
    is3D: true,
    colors: ['#b8bbbf', '#b8bbbf'],
    bar: { groupWidth: "15%" }

  };
  widthL = 550;
  heightL = 400;


  Title_BarL = '';
  Type_BarL = '';
  Data_BarL = [

  ];
  columnNames_BarL = [];
  options_BarL = {
    is3D: true,
  };



  ExamResultS_title = 'S';
  ExamResultS_type = 'ColumnChart';

  ExamResultS_Chart = [

  ];
  ExamResultS_columnNames = [];
  ExamResultS_options = {
    is3D: true,
    colors: ['#bbe3df', '#bbe3df'],
    bar: { groupWidth: "15%" }

  };
  widthS = 550;
  heightS = 400;


  Title_BarS = '';
  Type_BarS = '';
  Data_BarS = [

  ];
  columnNames_BarS = [];
  options_BarS = {
    is3D: true,
  };


  ExamResultW_title = 'W';
  ExamResultW_type = 'ColumnChart';

  ExamResultW_Chart = [

  ];
  ExamResultW_columnNames = [];
  ExamResultW_options = {
    is3D: true,
    colors: ['#cbe9d1', '#cbe9d1'],
    bar: { groupWidth: "15%" }

  };
  widthW = 550;
  heightW = 400;


  Title_BarW = '';
  Type_BarW = '';
  Data_BarW = [

  ];
  columnNames_BarW = [];
  options_BarW = {
    is3D: true,
  };


  ExamResultG_title = 'G';
  ExamResultG_type = 'ColumnChart';

  ExamResultG_Chart = [

  ];
  ExamResultG_columnNames = [];
  ExamResultG_options = {
    is3D: true,
    colors: ['#f5d0d0', '#f5d0d0'],
    bar: { groupWidth: "15%" }

  };
  widthG = 550;
  heightG = 400;


  Title_BarG = '';
  Type_BarG = '';
  Data_BarG = [

  ];
  columnNames_BarG = [];
  options_BarG = {
    is3D: true,
  };









  ExamResult_titler = 'R';
  ExamResult_typer = 'ColumnChart';

  ExamResult_Chartr = [

  ];
  ExamResult_columnNamesr = [];
  ExamResult_optionsr = {
    is3D: true,
    colors: ['#fbea55', '#9d9d9d'],
    bar: { groupWidth: "15%" }

  };
  widthr = 550;
  heightr = 400;


  Title_Barr = '';
  Type_Barr = '';
  Data_Barr = [

  ];
  columnNames_Barr = [];
  options_Barr = {
    is3D: true,
  };




  ExamResultL_titlel = 'L';
  ExamResultL_typel = 'ColumnChart';

  ExamResultL_Chartl = [

  ];
  ExamResultL_columnNamesl = [];
  ExamResultL_optionsl = {
    is3D: true,
    colors: ['#b8bbbf', '#b8bbbf'],
    bar: { groupWidth: "15%" }

  };
  widthLl = 550;
  heightLl = 400;


  Title_BarLl = '';
  Type_BarLl = '';
  Data_BarLl = [

  ];
  columnNames_BarLl = [];
  options_BarLl = {
    is3D: true,
  };



  ExamResultS_titles = 'S';
  ExamResultS_types = 'ColumnChart';

  ExamResultS_Charts = [

  ];
  ExamResultS_columnNamess = [];
  ExamResultS_optionss = {
    is3D: true,
    colors: ['#bbe3df', '#bbe3df'],
    bar: { groupWidth: "15%" }

  };
  widthSs = 550;
  heightSs = 400;


  Title_BarSs = '';
  Type_BarSs = '';
  Data_BarSs = [

  ];
  columnNames_BarSs = [];
  options_BarSs = {
    is3D: true,
  };


  ExamResultW_titlew = 'W';
  ExamResultW_typew = 'ColumnChart';

  ExamResultW_Chartw = [

  ];
  ExamResultW_columnNamesw = [];
  ExamResultW_optionsw = {
    is3D: true,
    colors: ['#cbe9d1', '#cbe9d1'],
    bar: { groupWidth: "15%" }

  };
  widthWw = 550;
  heightWw = 400;


  Title_BarWw = '';
  Type_BarWw = '';
  Data_BarWw = [

  ];
  columnNames_BarWw = [];
  options_BarWw = {
    is3D: true,
  };


  ExamResultG_titleg = 'G';
  ExamResultG_typeg = 'ColumnChart';

  ExamResultG_Chartg = [

  ];
  ExamResultG_columnNamesg = [];
  ExamResultG_optionsg = {
    is3D: true,
    colors: ['#f5d0d0', '#f5d0d0'],
    bar: { groupWidth: "15%" }

  };
  widthGg = 550;
  heightGg = 400;


  Title_BarGg = '';
  Type_BarGg = '';
  Data_BarGg = [

  ];
  columnNames_BarGg = [];
  options_BarGg = {
    is3D: true,
  };



  StudentcourseIdTemp: number = 0;

  End_Datecheck: boolean = false;


  Attendance_permission: any;
  Attendance_Edit_Permission: boolean = false;
  Attendance_Delete_Permission: boolean = false;
  Attendance_Save_Permission: boolean = false;
  Attendance_View_Permission: boolean = false;
  Attendance_View: boolean = false;

  Fees_Course_: Applicationdetails = new Applicationdetails();
  Fees_Course_Data: Applicationdetails[];
  Course_Fees_Data_Filter: Applicationdetails[];
  Fees_Course_Temp: Applicationdetails = new Applicationdetails();
  Fees_Course_Data_Temp_Array: Applicationdetails[];
  Is_Processing_: boolean;
  // Is_Processing_commision: boolean;

  Associates_Agent_Id_  :number;
  Processing_Agent_Id_  :number;
  Associates_Agent_Commission_  :number;
  Processing_Agent_Commission_  :number;

  German_Course_: Course = new Course();
  German_Course_Temp: Course = new Course();
  German_Course_Data: Course[];


  constructor(
    public Batch_Service_: Batch_Service,
    public Student_Service_: Student_Service,
    public Course_Service_: Course_Service,
    private route: ActivatedRoute,
    private router: Router,
    public dialogBox: MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.Student_Id_localStorage = localStorage.getItem("Student_Id");
    this.User_Mobile = Number(localStorage.getItem("Mobile"));

    if (this.Student_Id_localStorage > "0") {
      this.Student_Id = Number(this.Student_Id_localStorage);
      localStorage.setItem("Student_Id", "0");
    }
    // localStorage.setItem('Student_Id', '0');
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Login_User_Name = localStorage.getItem("uname");

    this.Permissions = Get_Page_Permission(14);
    this.Course_Tab_Permission = Get_Page_Permission(19);



    this.Fees_Receipt_Permissions = Get_Page_Permission(26);


    this.Application_Tab_Permission = Get_Page_Permission(99);
    this.Application_Fees_Tab_Permission = Get_Page_Permission(100);

    this.Registration_Permissions = Get_Page_Permission(17);
    this.Remove_Registration_Permissions = Get_Page_Permission(18);

    this.Fees_tab_Permission = Get_Page_Permission(20);
    this.Mark_tab_Permission = Get_Page_Permission(21);

    this.Course_Selection_Permission = Get_Page_Permission(53);

    this.Resume_Sending_tab_Permission = Get_Page_Permission(55);
    // this.Course_Selection_Permission = Get_Page_Permission(53)
    // this.Course_Selection_Permission = Get_Page_Permission(53)
    this.Fees_edit_permission = Get_Page_Permission(58);

    this.Edit_Student_CourseDetails = Get_Page_Permission(59);

    this.Document_permission = Get_Page_Permission(64);
    this.Remark_permission = Get_Page_Permission(65);
    debugger
    this.Process_permission = Get_Page_Permission(115);
    this.Hostel_permission = Get_Page_Permission(66);
    this.ExamResult_permission = Get_Page_Permission(67);
    this.ExamGraph_permission = Get_Page_Permission(68);
    this.ExamLevelsGraph_permission = Get_Page_Permission(69);
    this.Attendance_permission = Get_Page_Permission(74);
    ;
    if (this.Permissions == undefined || this.Permissions == null) {
      ;
      localStorage.removeItem("token");
      this.router.navigateByUrl("/auth/login");
    } else {
      this.Is_Registered = 1;
      if (this.Student_Id == 0) {
        this.Search_Lead_button();
      }
      this.Student_Edit = this.Permissions.Edit;
      this.Student_Save = this.Permissions.Save;
      this.Student_Delete = this.Permissions.Delete;

      this.Page_Load();
      if (
        this.Edit_Student_CourseDetails != undefined &&
        this.Edit_Student_CourseDetails != null
      ) {
        this.Student_CourseDetails_Edit = this.Edit_Student_CourseDetails.Edit;
      }

      if (
        this.Fees_tab_Permission != undefined &&
        this.Fees_tab_Permission != null
      ) {
        this.Fees_tab_Edit = this.Fees_tab_Permission.Edit;

      }


      if (
        this.Fees_tab_Permission != undefined &&
        this.Fees_tab_Permission != null
      ) {
        this.Fees_tab_Delete = this.Fees_tab_Permission.Delete;
        this.Fees_tab_Edit = this.Fees_tab_Permission.Edit
        this.Fees_tab_View = this.Fees_tab_Permission.View
        this.Fees_Save_View = this.Fees_tab_Permission.Save
      }




      // if (this.Fees_Receipt_Permissions != undefined && this.Fees_Receipt_Permissions != null)
      // {
      // this.Fees_tab_Edit=this.Fees_Receipt_Permissions.Edit
      // this.Fees_tab_View=this.Fees_Receipt_Permissions.View
      // }


      if (this.Fees_edit_permission != undefined && this.Fees_edit_permission != null) {

        this.Fees_Amount_Edit = this.Fees_edit_permission.Edit

      }
       

      if (
        this.Course_Tab_Permission != undefined &&
        this.Course_Tab_Permission != null
      ) {
        this.Course_Tab_View = this.Course_Tab_Permission.View;
        this.Course_Tab_Edit = this.Course_Tab_Permission.Edit;
        this.Course_Tab_Save = this.Course_Tab_Permission.Save;
        this.Course_Tab_Delete = this.Course_Tab_Permission.Delete;

      }


       



      if (
        this.Application_Tab_Permission != undefined &&
        this.Application_Tab_Permission != null
      ) {
        this.Application_Tab_View = this.Application_Tab_Permission.View;
        this.Application_Tab_Edit = this.Application_Tab_Permission.Edit;
        this.Application_Tab_Save = this.Application_Tab_Permission.Save;
        this.Application_Tab_Delete = this.Application_Tab_Permission.Delete;

      }




      if (
        this.Application_Fees_Tab_Permission != undefined &&
        this.Application_Fees_Tab_Permission != null
      ) {
        this.Application_Fees_Tab_View = this.Application_Fees_Tab_Permission.View;
        this.Application_Fees_Tab_Edit = this.Application_Fees_Tab_Permission.Edit;
        this.Application_Fees_Tab_Save = this.Application_Fees_Tab_Permission.Save;
        this.Application_Fees_Tab_Delete = this.Application_Fees_Tab_Permission.Delete;

      }








      if (
        this.Mark_tab_Permission != undefined &&
        this.Mark_tab_Permission != null
      ) {
        this.Mark_tab_View = this.Mark_tab_Permission.View;
        this.Mark_tab_Edit = this.Mark_tab_Permission.Edit;
      }
      if (
        this.Resume_Sending_tab_Permission != undefined &&
        this.Resume_Sending_tab_Permission != null
      ) {
        this.Resume_Sending_Tab_Edit = this.Resume_Sending_tab_Permission.Edit;
        this.Resume_Sending_View = this.Resume_Sending_tab_Permission.View;
      }
      debugger

      if (
        this.Document_permission != undefined &&
        this.Document_permission != null
      ) {
        this.Document_View_Permission = this.Document_permission.View;
      }

      if (
        this.Remark_permission != undefined &&
        this.Remark_permission != null
      ) {
        this.Remark_Save_Permission = this.Remark_permission.Save;
        this.Remark_View_Permission = this.Remark_permission.View;
        this.Remark_Edit_Permission = this.Remark_permission.Edit;
        this.Remark_Delete_Permission = this.Remark_permission.Delete;
      }
      debugger
      if (
        this.Process_permission != undefined &&
        this.Process_permission != null
      ) {
        this.Process_Save_Permission = this.Process_permission.Save;
        this.Process_View_Permission = this.Process_permission.View;
        this.Process_Edit_Permission = this.Process_permission.Edit;
        this.Process_Delete_Permission = this.Process_permission.Delete;
      }

      if (
        this.Hostel_permission != undefined &&
        this.Hostel_permission != null
      ) {
        this.Hostel_View_Permission = this.Hostel_permission.View;
        this.Hostel_Edit_Permission = this.Hostel_permission.Edit;
        this.Hostel_Delete_Permission = this.Hostel_permission.Delete;
        this.Hostel_Save_Permission = this.Hostel_permission.Save;
      }

      if (
        this.ExamResult_permission != undefined &&
        this.ExamResult_permission != null
      ) {
        this.ExamResult_Save_Permission = this.ExamResult_permission.Save;
        this.ExamResult_View_Permission = this.ExamResult_permission.View;
        this.ExamResult_Edit_Permission = this.ExamResult_permission.Edit;
        this.ExamResult_Delete_Permission = this.ExamResult_permission.Delete;
      }


      if (
        this.ExamGraph_permission != undefined &&
        this.ExamGraph_permission != null
      ) {
        this.ExamGraph_View_Permission = this.ExamGraph_permission.View;
        this.ExamGraph_Edit_Permission = this.ExamGraph_permission.Edit;
        this.ExamGraph_Delete_Permission = this.ExamGraph_permission.Delete;
      }





      if (
        this.ExamLevelsGraph_permission != undefined &&
        this.ExamLevelsGraph_permission != null
      ) {
        this.ExamLevelsGraph_Save_Permission = this.ExamLevelsGraph_permission.Save;
        this.ExamLevelsGraph_View_Permission = this.ExamLevelsGraph_permission.View;
        this.ExamLevelsGraph_Edit_Permission = this.ExamLevelsGraph_permission.Edit;
        this.ExamLevelsGraph_Delete_Permission = this.ExamLevelsGraph_permission.Delete;
      }

      if (
        this.Attendance_permission != undefined &&
        this.Attendance_permission != null
      ) {
        this.Attendance_Save_Permission = this.Attendance_permission.Save;
        this.Attendance_View_Permission = this.Attendance_permission.View;
        this.Attendance_Edit_Permission = this.Attendance_permission.Edit;
        this.Attendance_Delete_Permission = this.Attendance_permission.Delete;
      }






      // if (this.Profile_Tab_Permission != undefined && this.Profile_Tab_Permission != null)
      // {
      // this.Profile_Tab_Edit=this.Profile_Tab_Permission.Edit;
      // this.Profile_Tab_View=this.Profile_Tab_Permission.View
      // }
    }
  }
  Page_Load() {

     
    this.myInnerHeight = window.innerHeight;
    this.myTotalHeight = this.myInnerHeight;
    this.myTotalHeight = this.myTotalHeight - 95;
    this.myInnerHeight = this.myInnerHeight - 250;
    this.myInnerHeightTwo = this.myInnerHeight - 200;
    this.myInnerHeighttemp = this.myInnerHeight
    this.Clr_Student();
    this.clr_Remark()
    this.clr_Process();
    this.clr_ExamResult();
    this.Load_Dropdowns();
    this.Load_Document_Type();
    this.Load_Enquiry_Source()
     
    this.Load_Course_DropDowns()
    this.Load_Enquiry_For();
    this.Load_Gender();

    this.Load_Student_Search_Dropdowns();
    this.Load_Exam_Status();
     ;
    this.Load_Mode();
    this.Clr_Receipt_Voucher();
    this.Load_Laptopdetails();
    this.Load_Mastercourse();
    this.Get_Last_Followup();
    this.Load_State();
    this.Load_Qualification();
    this.Load_Installment_Type();
    this.Entry_View = false;
    this.Receipt_History_View = false;
    this.Buttons_View = true;
    this.profile_View = true;
    this.Documents_View = true;
    this.profile_View_followup = true;
    this.tab_view = true;
    this.Fees_View = false;
    this.Remark_View = true
    this.Process_View=false;
    this.ExamLevelGraph_View = true;
    this.Resumesending_View = false;
    this.Placement_View = false;
    this.Interview_View = false;
    this.Course_Details_View = false;
    this.Resume_Sending_View = false;
    this.Course_View = false;
    this.Attendance_View = false;
    // this.Course_View = true;


    this.Feesmodal_View = false;
    this.Fee_Collection_View = false;


    this.Mark_View = true;
    this.Hostel_View = false;
    this.ExamResult_View = false;
    this.ExamGraph_View = false;
    this.application_details_View = false;
    this.Look_In_Date = true;
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    // this.Batch_.Start_Date=new Date();
    // this.Batch_.End_Date=new Date();

    // this.Batch_.Start_Date = this.New_Date(this.Batch_.Start_Date);
    // this.Batch_.End_Date = this.New_Date(this.Batch_.End_Date);

    // this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
    // this.Student_Course_.Join_Date= this.New_Date(this.Student_Course_.Join_Date);
    // this.Student_Course_.End_Date= this.New_Date(this.Student_Course_.End_Date);
    this.date_Temp = this.New_Date(this.date_Temp);
    this.Course_Click_Status = false;
    this.Fees_Click_Status = false;
    this.Mark_Click_Status = false;
    this.Fees_Master_Id = 0;
    this.Black_Stop = this.Page_Length_;
    this.Red_Stop = this.Page_Length_;
    ;
    this.Get_Companydetails();
    this.Load_Exam();
    this.Lod_ExamType();
    this.Student_Course_.End_Date_Check = false;

    //alert("2")
  }

  Tab_Click(Current_tab) {
    this.profile_View = false;
    this.Documents_View = false;
    // this.Documents_View=false;
    this.Fees_View = false;
    
    this.Process_View=false;
    this.Remark_View = false
    this.ExamLevelGraph_View = false;
    this.Resumesending_View = false;
    this.Interview_View = false;
    this.Placement_View = false;
    this.Course_Details_View = false;
    this.Resume_Sending_View = false;
    this.Course_View = false;
    this.Mark_View = false;
    this.Hostel_View = false;
    this.ExamResult_View = false;
    this.ExamGraph_View = false;
    this.Attendance_View = false;
    this.application_details_View = false;
    this.Feesmodal_View = false;
    this.Fee_Collection_View = false;
    this.Show_Followup_History = true;
    // this.application_details_View =false;
    this.Applicationmodal_View = false;
    this.History_View = false;
    this.Change_Status_View = false;
    this.backbutton_view = false;
    this.Clr_Receipt_Voucher();

    if (Current_tab == 1) {
      this.profile_View = true;
      this.Button_level = true;
      this.Documents_View = false;
      // this.profile_View_followup=true;
      this.Course_View = false;
      this.Fees_View = false;
      
    this.Process_View=false;
      this.Remark_View = false
      this.ExamLevelGraph_View = false;
      this.ExamGraph_View = false;
      this.Course_Details_View = false;
      this.Resume_Sending_View = false;

      this.application_details_View = false;
      this.Applicationmodal_View = false;
      this.Feesmodal_View = false;
      this.Fee_Collection_View = false;
      this.History_View = false;
      this.Change_Status_View = false;

    } else if (Current_tab == 2) {
      this.profile_View = false;
      this.Documents_View = false;
      this.Course_View = true;
      this.Fees_View = false;
      this.Remark_View = false
      
    this.Process_View=false;
      this.ExamLevelGraph_View = false;
      this.ExamGraph_View = false;
      this.Course_Details_View = false;
      this.Resume_Sending_View = false;

      this.application_details_View = false;
      this.Applicationmodal_View = false;
      this.Feesmodal_View = false;
      this.Fee_Collection_View = false;
      this.History_View = false;
      this.Change_Status_View = false;

      if (this.Course_Click_Status == false) {
        //this.profile_View=false;
        //this.Get_Student_Course(this.Student_Id)
        this.Course_Click_Status = true;
      }
      //  this.Get_Student_Course(this.Student_Id_Edit)
    }

    else if (Current_tab == 15) {
      this.profile_View = false;
      this.Documents_View = false;
      this.Course_View = false;
      this.Fees_View = false;
      
    this.Process_View=false;
      this.Remark_View = false
      this.ExamLevelGraph_View = false;
      this.ExamGraph_View = false;
      this.Course_Details_View = false;
      this.Resume_Sending_View = false;
      this.Show_Followup_History = true;
      this.Show_FollowUp = true;

      this.application_details_View = true;
      this.Button_level = false;

      this.Applicationmodal_View = false;
      this.Feesmodal_View = false;
      this.Fee_Collection_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.backbutton_view = false;
      this.Get_ApplicationDetails();
    }



    else if (Current_tab == 16) {
      this.profile_View = false;
      this.Documents_View = false;
      this.Course_View = false;
      this.Fees_View = false;
      
    this.Process_View=false;
      this.Remark_View = false
      this.ExamLevelGraph_View = false;
      this.ExamGraph_View = false;
      this.Course_Details_View = false;
      this.Resume_Sending_View = false;
      this.Show_Followup_History = true;

      this.Fee_Collection_View = true;
      this.Button_level = false;
      this.backbutton_view = false;


      this.Feesmodal_View = false;
      this.application_details_View = false;
      this.Applicationmodal_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.Get_Fees_Receipt();
    }






    else if (Current_tab == 3) {
      this.Fees_View = true;
      this.Remark_View = false

      this.Process_View=false;
      this.Receipt_View = false;
      this.Resume_Sending_View = false;

      this.application_details_View = false;
      this.Applicationmodal_View = false;
      this.Feesmodal_View = false;
      this.Fee_Collection_View = false;

      if (this.Fees_Click_Status == false) {
        this.profile_View = false;
        this.Documents_View = false;
        this.ExamLevelGraph_View = false;
        this.ExamGraph_View = false;
        this.Fees_Click_Status = true;
        this.History_View = false;
        this.Change_Status_View = false;
        this.Get_Receipt_History();
      }
    } else if (Current_tab == 4) {
      this.Course_Details_View = true;
      this.Show_Followup_History = true;
    } else if (Current_tab == 5) {
      //
      // if( this.Resume_Click_Status==false)
      // {
      //
      //     this.Resume_Sending_View=true;
      //     this.Resume_Click_Status=true;
      // }
      this.application_details_View = false;
      this.Applicationmodal_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.Resumesending_View = true;
      this.Search_Transaction_Report_Tab();
    } else if (Current_tab == 6) {
      this.Interview_View = true;
      this.application_details_View = false;
      this.Applicationmodal_View = false;
      this.Search_Interview_Report_Tab();
    } else if (Current_tab == 7) {
      this.Placement_View = true;
      this.application_details_View = false;
      this.Applicationmodal_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.Search_Placed_Report_Tab();
    }
    else if (Current_tab == 8) {
      this.Hostel_View = true;
      this.application_details_View = false;
      this.Applicationmodal_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.Get_Hosteldetails();
      this.clr_Hostelfees();
    }

    else if (Current_tab == 9) {
      this.ExamResult_View = true;
      this.Get_ExamResult();
      // this.ExamresultView=false;
    }

    else if (Current_tab == 12) {
      this.ExamGraph_View = true;
      this.application_details_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.Applicationmodal_View = false;
      this.ExamResult_columnNames = [];
      this.ExamResultS_columnNames = [];
      this.ExamResultL_columnNames = [];
      this.ExamResultW_columnNames = [];
      this.ExamResultG_columnNames = [];

      this.Search_ExamResult_Report();


    }





    else if (Current_tab == 10) {
      this.profile_View = false;
      this.Documents_View = true;
      this.Button_level = false;
      this.profile_View_followup = false;
      this.Show_FollowUp = true;
      this.Course_View = false;
      this.Fees_View = false;
      this.Remark_View = false;
      
    this.Process_View=false;
      this.ExamLevelGraph_View = false;
      this.ExamGraph_View = false;
      this.Course_Details_View = false;
      this.Resume_Sending_View = false;
      this.application_details_View = false;
      this.Applicationmodal_View = false;
      this.Feesmodal_View = false;
      this.Fee_Collection_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.Show_Followup_History = true;

      this.Get_Document_Type()
    }

    else if (Current_tab == 11) {
      this.Buttons_View = false;
      this.Remark_View = true
      
    this.Process_View=false;
      this.Button_level = false;
      this.ExamLevelGraph_View = false;
      this.Fees_View = false;
      this.Receipt_View = false;
      this.Resume_Sending_View = false;
      this.profile_View_followup = false;
      this.Show_FollowUp = true;
      this.ExamGraph_View = false;
      this.Course_Details_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.Show_Followup_History = true;
      this.Get_Student_Remark_History();
    }
    else if (Current_tab == 17) {
      this.Buttons_View = false;
      this.Remark_View = false;
      
      this.Process_View = true;
      this.Button_level = false;
      this.ExamLevelGraph_View = false;
      this.Fees_View = false;
      this.Receipt_View = false;
      this.Resume_Sending_View = false;
      this.profile_View_followup = false;
      this.Show_FollowUp = true;
      this.ExamGraph_View = false;
      this.Course_Details_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.Show_Followup_History = true;
      this.clr_Process() ;
      this.Get_Student_Process_History();
    }


    else if (Current_tab == 13) {
      this.ExamLevelGraph_View = true;
      this.Button_level = false;
      this.Buttons_View = false;
      this.Remark_View = false
      
    this.Process_View=false;
      this.Fees_View = false;
      this.Receipt_View = false;
      this.Resume_Sending_View = false;
      this.profile_View_followup = false;
      this.Course_Details_View = false;
      this.profile_View = false;
      this.Documents_View = false;
      this.application_details_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.Applicationmodal_View = false;
      this.Show_Followup_History = true;
      this.Search_ExamResult_GraphReport();
    }

    else if (Current_tab == 14) {
      this.Attendance_View = true;
      this.application_details_View = false;
      this.Show_Followup_History = true;
      this.Applicationmodal_View = false;
      this.History_View = false;
      this.Change_Status_View = false;
      this.Get_AttendanceofStudents();

    }


  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
  isDesktopMenu() {
    if ($(window).width() < 991) {
      return false;
    }
    return true;
  }
  trackByFn(index, item) {
    return index;
  }
  Load_Gender() {
    this.issLoading = true;
    this.Student_Service_.Load_Gender().subscribe(
      (Rows) => {
        if (Rows != null) {
          this.Gender_Data = Rows[0];
          this.Gender_Temp.Gender_Id = 0;
          this.Gender_Temp.Gender_Name = "Select";
          this.Gender_Data.unshift(this.Gender_Temp);
          this.Gender_ = this.Gender_Data[0];
          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }
  Load_State() {
    this.issLoading = true;
    this.Student_Service_.Load_State().subscribe(
      (Rows) => {
        if (Rows != null) {
          this.State_Data = Rows[0];
          this.State_Temp.State_Id = 0;
          this.State_Temp.State_Name = "Select";
          this.State_Data.unshift(this.State_Temp);
          this.State_ = this.State_Data[0];
          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }

  Search_State_District_Typeahead(event: any) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();
    if (this.State_.State_Id == undefined || this.State_.State_Id == 0) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select State", Type: "3" },
      });
      return;
    } else if (
      this.State_District_Data == undefined ||
      this.State_District_Data.length == 0
    ) {
      this.issLoading = true;

      this.Student_Service_.Search_State_District_Typeahead(
        "",
        this.State_.State_Id
      ).subscribe(
        (Rows) => {
          if (Rows != null) {
            this.State_District_Data = Rows[0];
            this.State_District_Data_Filter = [];
            this.issLoading = false;
            for (var i = 0; i < this.State_District_Data.length; i++) {
              if (
                this.State_District_Data[
                  i
                ].District_Name.toLowerCase().includes(Value)
              )
                this.State_District_Data_Filter.push(
                  this.State_District_Data[i]
                );
            }
          }
        },
        (Rows) => {
          this.issLoading = false;
        }
      );
    } else {
      this.State_District_Data_Filter = [];
      for (var i = 0; i < this.State_District_Data.length; i++) {
        if (
          this.State_District_Data[i].District_Name.toLowerCase().includes(
            Value
          )
        )
          this.State_District_Data_Filter.push(this.State_District_Data[i]);
      }
    }
  }
  display_District(State_District: State_District) {
    if (State_District) {
      return State_District.District_Name;
    }
  }
  Load_Qualification() {
    this.issLoading = true;
    this.Student_Service_.Load_Qualification().subscribe(
      (Rows) => {
        if (Rows != null) {
          this.Qualification_Data = Rows[0];
          this.Qualification_Temp.Qualification_Id = 0;
          this.Qualification_Temp.Qualification_Name = "Select";
          this.Qualification_Data.unshift(this.Qualification_Temp);
          this.Qualification_ = this.Qualification_Data[0];
          this.Qualification_Search = this.Qualification_Data[0];
          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }


  Load_Mastercourse() {
    this.issLoading = true;
    this.Course_Service_.Load_Mastercourse().subscribe(
      (Rows) => {
        if (Rows != null) {
          this.Mastercourse_Data = Rows[0];
          this.Mastercourse_Temp.MasterCourse_Id = 0;
          this.Mastercourse_Temp.MasterCourse_Name = "Select";
          this.Mastercourse_Data.unshift(this.Mastercourse_Temp);
          this.Mastercourse_ = this.Mastercourse_Data[0];
          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }





  Load_Enquiry_Source() {
     
    this.issLoading = true;
    this.Student_Service_.Load_Enquiry_Source().subscribe(
      (Rows) => {
         

        console.log(Rows);

        if (Rows != null) {
          this.Enquiry_Source_Data = Rows[0];
          this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
          this.Enquiry_Source_Temp.Enquiry_Source_Name = "Select";
          this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
          this.Enquiry_Source_ = this.Enquiry_Source_Data[0];

           
          // this.Enquiry_For_Data = Rows[1];
          // this.Enquiry_For_Temp.Enquiry_For_Id = 0;
          // this.Enquiry_For_Temp.Enquiry_For_Name = "Select";
          // this.Enquiry_For_Data.unshift(this.Enquiry_For_Temp);
          // this.Enquiry_For_ = this.Enquiry_For_Data[0];

           
          this.Associates_Agent_Data = Rows[2];
          this.Associates_Agent_Temp.Client_Accounts_Id = 0;
          this.Associates_Agent_Temp.Client_Accounts_Name = "Select";
          this.Associates_Agent_Data.unshift(this.Associates_Agent_Temp);
          this.Associates_Agent_ = this.Associates_Agent_Data[0];

           
          this.Processing_Agent_Data = Rows[3];
          this.Processing_Agent_Temp.Client_Accounts_Id = 0;
          this.Processing_Agent_Temp.Client_Accounts_Name = "Select";
          this.Processing_Agent_Data.unshift(this.Processing_Agent_Temp);
          this.Processing_Agent_ = this.Processing_Agent_Data[0];

          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }



  Load_Enquiry_For() {
     
    this.issLoading = true;
    this.Student_Service_.Load_Enquiry_For().subscribe(
      (Rows) => {
         

        console.log(Rows);

        if (Rows != null) {

          this.Enquiry_For_Data = Rows[0];
          this.Enquiry_For_Temp.Enquiry_For_Id = 0;
          this.Enquiry_For_Temp.Enquiry_For_Name = "Select";
          this.Enquiry_For_Data.unshift(this.Enquiry_For_Temp);
          this.Enquiry_For_ = this.Enquiry_For_Data[0];


          // this.Mode_Of_Study_Data = Rows[1].slice();
          // this.Mode_Of_Study_Temp.Mode_Of_Study_Id = 0;
          // this.Mode_Of_Study_Temp.Mode_Of_Study_Name = "Select";
          // this.Mode_Of_Study_Data.unshift(Object.assign({}, this.Mode_Of_Study_Temp));
          // this.Mode_Of_Study_ = this.Mode_Of_Study_Data[0];

          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }
  Load_Student_Search_Dropdowns() {
    this.issLoading = true;
    this.Student_Service_.Load_Student_Search_Dropdowns(3).subscribe(
      (Rows) => {
        if (Rows != null) {
          this.Status_Data = Rows[0];
          this.Search_Status_Temp.Status_Id = 0;
          this.Search_Status_Temp.Status_Name = "Select";
          this.Status_Data.unshift(this.Search_Status_Temp);
          this.Search_Status = this.Status_Data[0];

          this.Users_Data = Rows[1];
          this.Users_Search_Temp.Users_Id = 0;
          this.Users_Search_Temp.Users_Name = "Select";
          this.Users_Data.unshift(this.Users_Search_Temp);
          this.Users_Search = this.Users_Data[0];

          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }
  File_Change_Photo(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile_Photo = file;
    // this.Display_Photo_ = this.ImageFile_Photo[0].name;
    this.Student_.Photo = this.ImageFile_Photo[0].name;
  }
  Download_Student_File(File_Name) {
    var File_Name_Temp;
    if (File_Name == "Photo") File_Name_Temp = this.Student_.Photo;
    var bs = "F:/Teena/Dist/backend/Uploads/";
    var s = bs + File_Name_Temp;
    window.open(s, "_blank");
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

  Add_Date_Hostel(Date_, days) {
    this.date = new Date(Date_);
    //this.date=new Date();
    this.date.setDate(this.date.getDate() + days);
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    // this.monthnew = this.date.getMonth() + days;
    if (this.month < 10) {
      this.month = "0" + this.month;
    }
    this.day = this.date.getDate().toString();
    if (Number.parseInt(this.day) < 10) {
      this.day = "0" + this.day;
    }
    this.date = this.year + "-" + this.month + "-" + this.day;
    return this.date;
    // for(var k=0;k<100;k++)
    // {
    //   console.log(k)
    //   return k;
    // }

  }
  Add_Date(Date_, days) {
    this.date = new Date(Date_);
    //this.date=new Date();  
    this.date.setDate(this.date.getDate() + days);
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

    this.Button_level = true;
    this.Entry_View = true;
    this.View_Student_ = true;
    this.profile_View = true;
    this.Documents_View = false;
    this.ExamLevelGraph_View = false;
    this.profile_View_followup = true;
    this.Course_Tab = false;

    this.Fee_Collection_View = false;
    this.Feesmodal_View = false;
    this.clickview = false;
    this.Fees_View = false;
    this.Remark_View = false
    this.Process_View=false;
    this.Resumesending_View = false;
    this.Placement_View = false;
    this.Interview_View = false;
    this.Resume_Sending_View = false;
    this.Course_View = false;
    this.Course_View = false;
    this.Mark_View = false;
    this.Show_FollowUp = false;
    this.Receipt_History_View = false;
    this.History_View = false;
    this.Change_Status_View = false;
    this.Hostel_View = false;
    this.ExamResult_View = false;
    this.ExamGraph_View = false;
    this.Flag_Followup = 1;
    this.Flag_Student = 1;
    this.Flag_Course = 1;
    this.View_Follow_ = true;
    this.Student_Id = 0;
    this.Student_Id_Edit = 0;
    this.Course_Id_Edit = 0;
    this.Mail_sms_Status = 0;
    this.Attendance_View = false;
    this.application_details_View = false;
    this.Applicationmodal_View = false;
    this.level_tab_view = false;
    // this.Applicn_tab_view =false;
    this.backbutton_view = false;

    this.Mark_List_Data = [];
    this.Clr_Mark_List();
    this.Clr_Mark_List_Master();
    this.Clr_Student();
    this.Clr_Receipt_Voucher();

    // this.Student_Followup_.Next_FollowUp_Date = new Date();
    // this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);

     
    this.Followup_Users_ = Object.assign({}, this.Followup_Users_Temp);
    this.Followup_Status_ = null;
    this.Followup_Status_Data = [];



    // this.Get_Last_Followup();
    this.Student_Followup_.Remark = "";
  }
  Close_Click() {
    let top = document.getElementById("Topdiv");
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
    this.Course_Details_View = false;
    this.Resume_Sending_View = false;
    this.View_Student_ = true;
    this.Student_EditIndex = -1;
    this.Flag_Followup = 0;
    this.Flag_Student = 0;
    this.Flag_Course = 0;
    this.Student_Id = 0;
    this.Student_Id_Edit = 0;
    this.Course_Id_Edit = 0;
    this.Entry_View = false;
    this.View_History_ = true;
    this.ImageFile_Photo_view = "";
    this.Show_Followup_History = true;
    this.View_Follow_ = true;
    this.Button_level = true;
    this.Clr_Student();
    this.Clr_Student_Course();
    this.Clr_Mark_List_Master();
    this.clr_ExamResult();
    this.Mark_List_Data = [];
    this.Clr_Mark_List();
    this.Clr_Receipt_Voucher();
    // this.Search_ExamResult_Report();
    this.Search_ExamResult_GraphReport();
    this.Total_Rows = 0;
    this.Search_Student();
    this.Fees_Master_Id = 0;

    if (
      this.Installment_Type_Data != null &&
      this.Installment_Type_Data != undefined
    )
      this.Installment_Type = this.Installment_Type_Data[0];



    if (
      this.MarkStatus_Type_Data != null &&
      this.MarkStatus_Type_Data != undefined
    )
      this.MarkStatus_Type = this.MarkStatus_Type_Data[0];



    this.Course_Click_Status = false;
    this.Fees_Click_Status = false;
    this.Mark_Click_Status = false;
  }
  course_click() {
    this.issLoading = true;
    this.profile_View = false;
    this.Documents_View = false;
    this.Show_FollowUp = true;
    this.profile_View_followup = false;
    this.Course_View = true;
    this.Hostel_View = true;
    this.Fees_View = true;
    this.ExamResult_View = true;
    this.ExamGraph_View = true;
    this.Attendance_View = true;
    this.Remark_View = false
    
    this.Process_View=false;
    this.application_details_View = true;

     

    
    // if (this.Student_.Enquiry_For == 2) {
    //   this.level_tab_view = false;
    //   this.application_details_View = true;
    //   this.Tab_Click(15);
    //   this.Get_ApplicationDetails();

    //   this.Course_Tab_View = true;
    //   this.Course_Tab = true;
    //   this.clickview = true;

    // }
    // else {
      this.level_tab_view = true
      // }


       
      this.Student_Service_.Get_Course_Details_Student_Check(
        this.Student_.Student_Id,
      ).subscribe(
        (Rows) => {


          this.Student_Course_Click_Data = Rows[0];



          this.issLoading = false;




          // if(this.Student_.Enquiry_For_Id==1){this.Applicn_tab_view =false}
          // else(this.Applicn_tab_view =false)



           
          if (this.Student_Course_Click_Data.length > 0) {

            // this.backbutton_view =true;
            this.Course_Tab_View = true;
            this.Hostel_View_Permission = true;
            this.Fees_tab_View = true;
            this.ExamResult_View_Permission = true;
            this.ExamGraph_View_Permission = true;
            this.Attendance_View_Permission = true;

          } else {
            this.Course_Tab_View = true;
            this.Hostel_View_Permission = false;
            this.Fees_tab_View = false;
            this.ExamResult_View_Permission = false;
            this.ExamGraph_View_Permission = false;
            this.Attendance_View_Permission = false;

          }
          if (this.Student_Course_Click_Data.length == 0) {
            this.coursedetails_Edit = true;
          }
          else {
            if (this.Edit_Student_CourseDetails != undefined && this.Edit_Student_CourseDetails != null) {

              this.coursedetails_Edit = this.Edit_Student_CourseDetails.Edit;
            }
            else
              this.coursedetails_Edit = false;
          }

          if (this.Student_Course_Click_Data.length <= 1) {

            this.Course_Tab = true;
            this.clickview = true;
            this.Tab_Click(2);
            if (this.Student_Course_Click_Data.length == 1)
              this.Get_Student_Course_Click(
                this.Student_Course_Click_Data[0].Student_Id,
                this.Student_Course_Click_Data[0].Student_Course_Id,
                this.Student_Course_Click_Data[0].Course_Id,

              );
          } else {
            this.coursedetails_Edit = true;
            this.Course_Tab = true;
            this.clickview = false;
            this.Tab_Click(4);
          }

          this.issLoading = false;
        },
        (Rows) => {
          this.issLoading = false;
        }
      );
    // }

  }


  // course_clickCD() {
  //   this.issLoading = true;
  //   this.profile_View=false;
  //   this.Documents_View=false;
  //   this.Show_FollowUp=true;
  //   this.profile_View_followup=false;
  //   this.Course_View=true;
  //   this.Hostel_View=true;
  //   this.Fees_View=true;
  //   this.ExamResult_View=true;
  //   this.ExamGraph_View=true;
  //   this.Attendance_View=true;
  //   this.Remark_View = false
  //   this.application_details_View = true;

  //    

  //   if(this.Student_.Enquiry_For_Id==2){this.level_tab_view =false ;
  //     this.application_details_View = true;
  //     this.Tab_Click(15);
  //     this. Get_ApplicationDetails() ;

  //   }
  //   else{this.level_tab_view =true
  //   // }


  //    
  //   this.Student_Service_.Get_Course_Details_Student_Check(
  //   this.Student_.Student_Id,
  //   ).subscribe(
  //   (Rows) => {


  //   this.Student_Course_Click_Data = Rows[0];



  //   this.issLoading = false;




  //   // if(this.Student_.Enquiry_For_Id==1){this.Applicn_tab_view =false}
  //   // else(this.Applicn_tab_view =false)



  //    
  //   if (this.Student_Course_Click_Data.length > 0) {
  //     this.Course_Tab_View=true;
  //     this.Hostel_View_Permission = true;
  //     this.Fees_tab_View=true;
  //     this.ExamResult_View_Permission=true;
  //     this.ExamGraph_View_Permission=true;
  //     this.Attendance_View_Permission=true;

  //   } else {
  //     this.Course_Tab_View=true;
  //     this.Hostel_View_Permission = false;
  //     this.Fees_tab_View=false;
  //     this.ExamResult_View_Permission=false;
  //     this.ExamGraph_View_Permission=false;
  //     this.Attendance_View_Permission=false;

  //   }
  //   if (this.Student_Course_Click_Data.length ==0)
  //    {
  //     this.coursedetails_Edit=true;
  //    }
  //    else
  //    {
  //     if (this.Edit_Student_CourseDetails != undefined && this.Edit_Student_CourseDetails != null)
  //     {

  //     this.coursedetails_Edit=this.Edit_Student_CourseDetails.Edit;  
  //     }
  //     else
  //     this.coursedetails_Edit=false;
  //    }

  //   if (this.Student_Course_Click_Data.length <= 1)
  //    {

  //   this.Course_Tab = true;
  //   this.clickview = true;
  //   this.Tab_Click(2);
  //   if (this.Student_Course_Click_Data.length == 1)
  //   this.Get_Student_Course_Click(
  //     this.Student_Course_Click_Data[0].Student_Id,
  //   this.Student_Course_Click_Data[0].Student_Course_Id,
  //   this.Student_Course_Click_Data[0].Course_Id,

  //   );
  //   } else 
  //   {
  //   this.coursedetails_Edit=true;
  //   this.Course_Tab = true;
  //   this.clickview = false;
  //   this.Tab_Click(4);
  //   }

  //   this.issLoading = false;
  //   },
  //   (Rows) => {
  //   this.issLoading = false;
  //   }
  //   );}

  //   }



  Clr_Student() {
    this.Course_Tab = false;
    this.clickview = false;
    this.Hostel_View = false;
    this.ExamResult_View = false;
    this.ExamGraph_View = false;
    this.Attendance_View = false;
    this.Student_.Student_Id = 0;
    this.Student_.Student_Name = "";
    this.Student_.Address1 = "";
    this.Student_.Address2 = "";
    this.Student_.Address3 = "";
    this.Student_.Address4 = "";
    this.Student_.Pincode = "";
    this.Student_.Phone = "";
    this.Student_.Mobile = "";
    this.Student_.Whatsapp = "";
    this.Student_.DOB = "";
    this.Student_Name = "";
    // this.DOB = new Date();
    // this.DOB = this.New_Date(this.DOB);
    // this.Student_.Gender=0;
    this.Student_.Email = "";
    this.Student_.Alternative_Email = "";
    this.Student_.Passport_No = "";
    this.Student_.Passport_Expiry = "";
    this.Student_.User_Name = "";
    this.Student_.Password = "";
    this.Student_.Role_No = "";
    this.Student_.Registration_No = "";
    this.Student_.Registered = false;
    this.Student_.Photo = "";
    this.Student_.User_Id = 0;
    this.ImageFile_Photo = "";
    this.Display_Photo_ = "";


    this.Student_.Student_Photo = false;
    this.Student_.Aadhar_Photo = false;
    this.Student_.Education_Documents = false;
    this.Student_.Documents_Remark = "";

    this.ImageFile_Photo_view = "";
    this.Remove_Registration_Visibility = false;
    this.Course_Selection_Visibility = false;
    this.Registration_Visiblility = false;
    this.District_ = null;
    this.Course_Student = null;
    this.Student_.College_Name = "";
    this.Student_.Age = 0;
    this.Student_.Registration_Fees = null;
    this.Student_.Father_Name = "";
    this.Student_.Father_Whatsapp = "";
    this.Student_.Father_Email = "";
    this.Student_.Mother_Name = "";
    this.Student_.Mother_Whatsapp = "";
    this.Student_.Mother_Email = "";
    this.Student_.Local_Gurdian_Name = "";
    this.Student_.Local_Gurdian_Whatsapp = "";
    this.Student_.Local_Gurdian_Email = "";
    this.Receipt_Voucher_.Fees_Type_Id = 0;
    if (this.State_Data != null && this.State_Data != undefined)
      this.State_ = this.State_Data[0];
    if (this.Qualification_Data != null && this.Qualification_Data != undefined)
      this.Qualification_ = this.Qualification_Data[0];
    if (this.Gender_Data != null && this.Gender_Data != undefined)
      this.Gender_ = this.Gender_Data[0];
    if (
      this.Enquiry_Source_Data != null &&
      this.Enquiry_Source_Data != undefined
    )
      this.Enquiry_Source_ = this.Enquiry_Source_Data[0];
    this.Hostel_Fees_Details_Data = [];
    this.Hostel_Fees_Master_Data = [];
    this.Hostel_Fees_Master_Data_t = [];
    this.Hostel_Fees_details_.Hostel_Fees_Details_Id = 0;
    this.Hostel_Fees_details_.Date = new Date();
    this.Hostel_Fees_details_.Date = this.New_Date(this.Hostel_Fees_details_.Date);
    this.Hostel_Fees_Master_.From_Date = new Date();
    this.Hostel_Fees_Master_.From_Date = this.New_Date(this.Hostel_Fees_Master_.From_Date);
    this.Hostel_Fees_Master_.To_Date = new Date();
    this.Hostel_Fees_Master_.To_Date = this.New_Date(this.Hostel_Fees_Master_.To_Date);
    this.Hostel_Fees_Master_.Duration = 0;
    this.Hostel_Fees_Master_.Per_Month_Amount = 0;
    this.Hostel_Fees_Master_.Total_Amount = 0;
    this.Hostel_Fees_Master_.Application_Fees = 0;
    this.Hostel_Fees_Master_.Security_Deposit = 0;
    this.Hostel_Fees_Master_.Food_Fees = 0;
    this.Hostel_Fees_Master_.Fees_Type_Id = 0;
    this.Hostel_Fees_Master_.Fees_Type_Name = "";
    this.Hostel_Fees_Master_.Hostel_Fees_Master_Id = 0;
    this.Hostel_Fees_details_.Amount = 0;
    this.Hostel_Fees_details_.Paid_Amount = 0;
    this.Hostel_Fees_details_.Status = 0;
    this.Hostel_Fees_details_.Balance_Amount = 0;

    if (this.Branch_Data != null && this.Branch_Data != undefined)
      this.Admission_Branch_ = this.Branch_Data[0];

    if (this.Branch_Data != null && this.Branch_Data != undefined)
      this.Offline_Branch_ = this.Branch_Data[0];

    if (this.Enquiry_For_Data != null && this.Enquiry_For_Data != undefined)
      this.Enquiry_For_ = this.Enquiry_For_Data[0];


    if (this.Processing_Agent_Data != null && this.Processing_Agent_Data != undefined)
      this.Processing_Agent_ = this.Processing_Agent_Data[0];


    if (this.Associates_Agent_Data != null && this.Associates_Agent_Data != undefined)
      this.Associates_Agent_ = this.Associates_Agent_Data[0];



    if (this.Mode_Of_Study_Data != null && this.Mode_Of_Study_Data != undefined)
      this.Mode_Of_Study_ = this.Mode_Of_Study_Data[0];

    if (this.Mastercourse_Data != null && this.Mastercourse_Data != undefined)
      this.Mastercourse_ = this.Mastercourse_Data[0];

    this.Student_Followup_.Next_FollowUp_Date = null;
  }
  Clr_Student_Followup() {
    this.Student_Followup_.Student_Followup_Id = 0;
    this.Student_Followup_.Student_Id = 0;
    this.Student_Followup_.Entry_Date = new Date();
    this.Student_Followup_.Entry_Date = this.New_Date(
      this.Student_Followup_.Entry_Date
    );
    // this.Student_Followup_.Next_FollowUp_Date = new Date();
    // this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
    this.Student_Followup_.FollowUp_Difference = 0;
    // this.Student_Followup_.Status=0;
    this.Student_Followup_.By_User_Id = 0;
    this.Student_Followup_.Remark = "";
    this.Student_Followup_.Remark_Id = 0;
    this.Student_Followup_.FollowUp_Type = 0;
    this.Student_Followup_.FollowUP_Time = "";
    this.Student_Followup_.Actual_FollowUp_Date = new Date();
    this.Student_Followup_.Actual_FollowUp_Date = this.New_Date(
      this.Student_Followup_.Actual_FollowUp_Date
    );
    this.Followup_Status_ = null;
    this.Followup_Users_ = null;
  }

  Load_Dropdowns() {
     
    this.Student_Service_.Get_Load_Dropdowns_Data().subscribe(
      (Rows) => {
         
        this.Gender_Data = Rows[1];
        this.Gender_Temp.Gender_Id = 0;
        this.Gender_Temp.Gender_Name = "Select";
        this.Gender_Data.unshift(this.Gender_Temp);
        this.Gender_ = this.Gender_Data[0];

        this.Enquiry_Source_Data = Rows[3];
        this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
        this.Enquiry_Source_Temp.Enquiry_Source_Name = "Select";
        this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
        this.Enquiry_Source_ = this.Enquiry_Source_Data[0];

        this.Exam_Status_Data = Rows[5];
        this.Exam_Status_Temp.Exam_Status_Id = 0;
        this.Exam_Status_Temp.Exam_Status_Name = "All";
        this.Exam_Status_Data.unshift(this.Exam_Status_Temp);
        this.Exam_Status_ = this.Exam_Status_Data[0];

        this.State_Data = Rows[0];
        this.State_Temp.State_Id = 0;
        this.State_Temp.State_Name = "Select";
        this.State_Data.unshift(this.State_Temp);
        this.State_ = this.State_Data[0];

        this.Qualification_Data = Rows[2];
        this.Qualification_Temp.Qualification_Id = 0;
        this.Qualification_Temp.Qualification_Name = "Select";
        this.Qualification_Data.unshift(this.Qualification_Temp);
        this.Qualification_ = this.Qualification_Data[0];
        this.Qualification_Search = this.Qualification_Data[0];

        this.Installment_Type_Data = Rows[4];
        this.Installment_Type_Temp.Installment_Type_Id = 0;
        this.Installment_Type_Temp.Installment_Type_Name = "Select";
        this.Installment_Type_Data.unshift(this.Installment_Type_Temp);
        this.Installment_Type = this.Installment_Type_Data[0];

        this.Mode_Data = Rows[6];
        this.Mode_Temp.Mode_Id = 0;
        this.Mode_Temp.Mode_Name = "Select";
        this.Mode_Data.unshift(this.Mode_Temp);
        this.Mode = this.Mode_Data[0];

        this.Client_Accounts_Data = Rows[7].slice();
        this.Client_Accounts_Temp.Client_Accounts_Id = 0;
        this.Client_Accounts_Temp.Client_Accounts_Name = "Select";
        this.Client_Accounts_Data.unshift(Object.assign({}, this.Client_Accounts_Temp));
        this.Client_Accounts_ = this.Client_Accounts_Data[0];



        this.MarkStatus_Type_Data = Rows[8].slice();
        this.MarkStatus_Type_Temp.Markstatus_Id = 0;
        this.MarkStatus_Type_Temp.Markstatus_Name = "Select";
        this.MarkStatus_Type_Data.unshift(Object.assign({}, this.MarkStatus_Type_Temp));
        this.MarkStatus_Type = this.MarkStatus_Type_Data[0];

        this.Remark_Details_Data = Rows[9].slice();
        this.Remark_Details_Temp.Remark_Details_Id = 0;
        this.Remark_Details_Temp.Details = "Select";
        this.Remark_Details_Data.unshift(Object.assign({}, this.Remark_Details_Temp));
        this.Remark_Details_ = this.Remark_Details_Data[0];

         
        // this.Enquiry_For_Data = Rows[10].slice();
        // this.Enquiry_For_Temp.Enquiry_For_Id = 0;
        // this.Enquiry_For_Temp.Enquiry_For_Name = "Select";
        // this.Enquiry_For_Data.unshift(Object.assign({},this.Enquiry_For_Temp));
        // this.Enquiry_For_ = this.Enquiry_For_Data[0];
         
        this.Currency_Data = Rows[11].slice();
        this.Currency_Temp.Currency_Id = 0;
        this.Currency_Temp.Currency_Name = "Select";
        this.Currency_Data.unshift(Object.assign({}, this.Currency_Temp));
        this.Currency_ = this.Currency_Data[0];

        this.To_Account_Data = Rows[12].slice();
        this.To_Account_Temp.Client_Accounts_Id = 0;
        this.To_Account_Temp.Client_Accounts_Name = "Select";
        this.To_Account_Data.unshift(Object.assign({}, this.To_Account_Temp));
        this.To_Account_ = this.To_Account_Data[0];

        this.Fees_Array = Rows[13];
        this.Fees_Temp.Fees_Id = 0;
        this.Fees_Temp.Fees_Name = "Select";
        this.Fees_Array.unshift(this.Fees_Temp);
        this.Fees_Data_ = this.Fees_Array[1];

        this.Application_Status_Data = Rows[14].slice();
        this.Application_Status_Temp.Application_Status_Id = 0;
        this.Application_Status_Temp.Application_Status_Name = "Select";
        this.Application_Status_Data.unshift(Object.assign({}, this.Application_Status_Temp));
        this.Application_Status_ = this.Application_Status_Data[0];

         
        this.Branch_Data = Rows[16].slice();
        this.Branch_Temp.Agent_Id = 0;
        this.Branch_Temp.Agent_Name = "Select";
        this.Branch_Data.unshift(Object.assign({}, this.Branch_Temp));
        this.Admission_Branch_ = this.Branch_Data[0];
        this.Offline_Branch_ = this.Branch_Data[0];

        this.Mode_Of_Study_Data = Rows[17].slice();
        this.Mode_Of_Study_Temp.Mode_Of_Study_Id = 0;
        this.Mode_Of_Study_Temp.Mode_Of_Study_Name = "Select";
        this.Mode_Of_Study_Data.unshift(Object.assign({}, this.Mode_Of_Study_Temp));
        this.Mode_Of_Study_ = this.Mode_Of_Study_Data[0];


        if (this.Student_Id > 0) {
          //alert(this.Student_Id )
          this.Edit_Student(this.Student_Id, 1, 1, 1);
        }
      },
      (Rows) => {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: "2" },
        });
      }
    );
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
    //this.Student_Followup_.Next_FollowUp_Date=new Date();
    //this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
  }
  Batch_Change(Batch_) {
    // this.Batch_= Batch_;
    this.Student_Course_.Start_Date = new Date();
    this.Student_Course_.Start_Date = this.New_Date(
      this.Student_Course_.Start_Date
    );
    // this.Student_Course_.End_Date = new Date();
    // this.Student_Course_.End_Date = this.New_Date(
    // this.Student_Course_.End_Date
    // );

    //this.Get_Batch(this.batch_id);
  }
  Get_Batch(Batch_11) {
    this.batch_id = Batch_11.Batch_Id;
    this.Batch_ = Batch_11;
    this.issLoading = true;
    this.Batch_Service_.Get_Batch(this.batch_id).subscribe(
      (Rows) => {
        //this.Batch_Data=Rows[0];
        // this.Student_Course_.Start_Date = Rows[0][0].Actual_Start_Date;
        // this.Student_Course_.End_Date = Rows[0][0].Actual_End_Date;
        // this.Student_Course_.Join_Date = Rows[0][0].Actual_Start_Date;
        // this.Instalment_Change();
        //this.Total_Entries=this.Batch_Data.length;
        // if(this.Batch_Data.length==0)
        // {
        // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
        // this.issLoading=false;
        // }
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


  Search_User_Typeahead_Faculty(event: any) {

    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value;
    if (
      this.Faculty_Users_Data == undefined ||
      this.Faculty_Users_Data.length == 0
    ) {
      this.issLoading = true;
      this.Student_Service_.Search_Typeahead_Loadfaculty("").subscribe(
        (Rows) => {
          if (Rows != null) {
            this.Faculty_Users_Data = Rows[0];
            this.issLoading = false;

            this.Faculty_Users_Data_Filter = [];

            for (var i = 0; i < this.Faculty_Users_Data.length; i++) {
              if (
                this.Faculty_Users_Data[i].Users_Name.toLowerCase().includes(
                  Value
                )
              )
                this.Faculty_Users_Data_Filter.push(
                  this.Faculty_Users_Data[i]
                );
            }
          }
        },
        (Rows) => {
          this.issLoading = false;
        }
      );
    } else {
      this.Faculty_Users_Data_Filter = [];
      for (var i = 0; i < this.Faculty_Users_Data.length; i++) {
        if (
          this.Faculty_Users_Data[i].Users_Name.toLowerCase().includes(Value)
        )
          this.Faculty_Users_Data_Filter.push(this.Faculty_Users_Data[i]);
      }
    }
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
      this.Student_Service_.Search_Faculty_Typeahead("", 0).subscribe(
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
  Search_More_Options() {
    // if (this.More_Search_Options == true) this.More_Search_Options = false;
    // else this.More_Search_Options = true;
    if (this.More_Search_Options == true) {
      this.myInnerHeight = this.myInnerHeighttemp - 100;
      this.More_Search_Options = false;
    }

    else {
      this.More_Search_Options = true;
      this.myInnerHeight = this.myInnerHeighttemp
    }
  }
  Search_Lead_button() {
    this.Black_Start = 1;
    this.Black_Stop = this.Page_Length_;
    this.Red_Start = 1;
    this.Total_Rows = 0;
    this.Red_Stop = this.Page_Length_;
    this.missedfollowup_count = 0;
     
    this.Search_Student();
  }
  Search_Student() {
    var value = 1,
      Register_Value = 2,
      Status_Id = 0,
      User_Id = 0,
      search_name_ = undefined,
      Qualification_Id = 0,
      look_In_Date_Value = 0,
      Course_Id = 0,
      Enquiry_For_Id = 0,
      batch_Id = 0;

    // this.Total_Rows=0;



    // if (this.Search_By_ != undefined && this.Search_By_ != null)
    //     if (this.Search_By_ != undefined && this.Search_By_ != null && this.Search_By_ != '')
    //         value = this.Search_By_;
    if (this.Is_Registered != undefined && this.Is_Registered != null)
      if (
        this.Is_Registered != undefined &&
        this.Is_Registered != null &&
        this.Is_Registered != ""
      )
        Register_Value = this.Is_Registered;

    if (this.Look_In_Date == true) look_In_Date_Value = 1;

    if (
      this.Search_Name != undefined &&
      this.Search_Name != null &&
      this.Search_Name != ""
    )
      search_name_ = this.Search_Name;

    if (this.Users_Search != undefined && this.Users_Search != null)
      if (
        this.Users_Search.Users_Id != undefined &&
        this.Users_Search.Users_Id != null
      )
        User_Id = this.Users_Search.Users_Id;

    if (
      this.Qualification_Search != undefined &&
      this.Qualification_Search != null
    )
      if (
        this.Qualification_Search.Qualification_Id != undefined &&
        this.Qualification_Search.Qualification_Id != null
      )
        Qualification_Id = this.Qualification_Search.Qualification_Id;

    if (
      this.Course_Student_Search != undefined &&
      this.Course_Student_Search != null
    )
      if (
        this.Course_Student_Search.Course_Id != undefined &&
        this.Course_Student_Search.Course_Id != null
      )
        Course_Id = this.Course_Student_Search.Course_Id;



    if (
      this.Batch_Student_Search != undefined &&
      this.Batch_Student_Search != null
    )
      if (
        this.Batch_Student_Search.Batch_Id != undefined &&
        this.Batch_Student_Search.Batch_Id != null
      )
        batch_Id = this.Batch_Student_Search.Batch_Id;



    if (
      this.Enquiry_For_ != undefined &&
      this.Enquiry_For_ != null
    )
      if (
        this.Enquiry_For_.Enquiry_For_Id != undefined &&
        this.Enquiry_For_.Enquiry_For_Id != null
      )
        Enquiry_For_Id = this.Enquiry_For_.Enquiry_For_Id;



    if (this.Search_Status != undefined && this.Search_Status != null)
      if (
        this.Search_Status.Status_Id != undefined &&
        this.Search_Status.Status_Id != null
      )
        Status_Id = this.Search_Status.Status_Id;
    this.issLoading = true;
     
    this.Student_Service_.Search_Student(
      moment(this.Search_FromDate).format("YYYY-MM-DD"),
      moment(this.Search_ToDate).format("YYYY-MM-DD"),
      search_name_,
      User_Id,
      Status_Id,
      look_In_Date_Value,
      this.Black_Start,
      this.Black_Stop,
      this.Login_User,
      this.Red_Start,
      this.Red_Stop,
      Register_Value,
      Qualification_Id,
      Course_Id,
      batch_Id,
      Enquiry_For_Id
    ).subscribe(
      (Rows) => {
         
        this.Student_Data = Rows.returnvalue.Student;
        // if ( this.Student_Data.length>0)
        // {
        if (this.Student_Data[0].Duplicate_Found_ == -1) {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: {
              Message:
                "The Phone Number Already Exist for " +
                this.Student_Data[0].Duplicate_Student_Name_ +
                " and is handled by " +
                this.Student_Data[0].Duplicate_User_,
              Type: "2",
            },
          });
          return;
        }
        // }
        else {
          this.Total_Entries =
            this.Student_Data[this.Student_Data.length - 1].Student_Id;
          this.Student_Data.splice(this.Student_Data.length - 1);
          this.Missed_Count =
            this.Student_Data[this.Student_Data.length - 1].Student_Id;
          this.Student_Data.splice(this.Student_Data.length - 1);

          this.missedfollowup_count = 0;
          this.followup_count = 0;

          if (this.Student_Data.length > 0) {
            if (this.Student_Data[0].User_Status == 2) {
              localStorage.clear();
              this.router.navigateByUrl("/auth/login");
            }
          }

          for (var i = 0; i < this.Student_Data.length; i++) {
            this.Student_Data[i].RowNo = i + 1 + this.Total_Rows;
            if (this.Student_Data[i].tp == 1)
              this.followup_count = this.followup_count + 1;
            if (this.Student_Data[i].tp == 2)
              this.missedfollowup_count = this.missedfollowup_count + 1;
          }

          if (this.Student_Data.length > 0)
            this.Total_Rows = this.Total_Rows + this.Student_Data.length;
          this.issLoading = false;

        }



        this.issLoading = false;
        if (this.Student_Data.length == 0) {
          this.issLoading = false;
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
  Next_Click() {
    if (this.Student_Data.length == this.Page_Length_) {
      this.Black_Start = this.Black_Start + this.Page_Length_;
      this.Black_Stop = this.Black_Stop + this.Page_Length_;
      if (this.missedfollowup_count > 0) {
        this.Red_Start = this.Red_Start + this.missedfollowup_count;
        this.Red_Stop = this.Red_Start + this.Page_Length_;
      }
      this.nextflag = 1;

      if (this.Student_Data.length > 0) {
        this.Search_Student();
      }
    } else {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "No Other Details", Type: "3" },
      });
    }
  }
  previous_Click() {

    if (this.Black_Start > 1) {
      {
        this.Black_Start = this.Black_Start - this.Page_Length_;
        this.Black_Stop = this.Black_Stop - this.Page_Length_;
      }
      if (this.missedfollowup_count > 0 || this.Red_Start > 1) {
        this.Red_Start = this.Red_Start - this.Page_Length_;
        if (this.Red_Start <= 0) this.Red_Start = 1;
        this.Red_Stop = this.Red_Start + this.Page_Length_;
      }
      this.Total_Rows =
        this.Total_Rows - this.Student_Data.length - this.Page_Length_;
      if (this.Total_Rows < 0) {
        this.Total_Rows = 0;
      }
      this.Search_Student();
    } else {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "No Other Details", Type: "3" },
      });
    }
  }
  // Delete_Student(Student_Id, index) {
  // const dialogRef = this.dialogBox.open(DialogBox_Component, {
  // panelClass: "Dialogbox-Class",
  // data: {
  // Message: "Do you want to delete ?",
  // Type: true,
  // Heading: "Confirm",
  // },
  // });
  // dialogRef.afterClosed().subscribe((result) => {
  // if (result == "Yes") {
  // this.issLoading = true;
  // this.Student_Service_.Delete_Student(Student_Id).subscribe(
  // (Delete_status) => {
  //    
  // // Delete_status = Delete_status[0];
  //   Delete_status = Delete_status[0].DeleteStatus_;

  //     // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
  // if(Delete_status==1)
  // {
  //  this.Student_Data.splice(index, 1);
  //   
  // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
  // this.Close_Click();

  // // this.Search_Student();

  // }
  // else {
  //    
  // this.issLoading = false;
  // const dialogRef = this.dialogBox.open(DialogBox_Component, {
  // panelClass: "Dialogbox-Class",
  // data: { Message: "Error Occured", Type: "2" },
  // });
  // }
  // this.issLoading = false;
  // },
  // (Rows) => {
  // this.issLoading = false;
  // const dialogRef = this.dialogBox.open(DialogBox_Component, {
  // panelClass: "Dialogbox-Class",
  // data: { Message: "Error Occured", Type: "2" },
  // });
  // }
  // );
  // }
  // });
  // }

  Delete_Student(Student_Id, index) {
    // this.Total_Rows=0;
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
      panelClass: "Dialogbox-Class",
      data: {
        Message: "Do you want to delete ?",
        Type: true,
        Heading: "Confirm",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Yes") {
        this.issLoading = true;
         
        this.Student_Service_.Delete_Student(Student_Id).subscribe(
          (Delete_status) => {
             
            Delete_status = Delete_status[0];
            Delete_status = Delete_status[0].DeleteStatus_;

            //  this.Total_Rows = this.Total_Rows - this.Student_Data.length;
            if (Delete_status == 1) {
              //  this.Student_Data.splice(index, 1);
              // 
              const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted', Type: "false" } });
              this.Close_Click();

              // this.Search_Student();

            }
            else {
              this.issLoading = false;
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
  State_Change() {
    this.District_ = null;
  }
  Fill_Student() {
    debugger
     
    if (this.Flag_Student == 1) {
      if (
        this.Student_.DOB == undefined ||
        this.Student_.DOB == null ||
        this.Student_.DOB == "NaN" ||
        this.Student_.DOB == ""
      ) {
        this.Student_.DOB = "";
      } else
        this.Student_.DOB = this.New_Date(
          new Date(moment(this.Student_.DOB).format("YYYY-MM-DD"))
        );

      if (this.Student_.Age == undefined || this.Student_.Age == null)
        this.Student_.Age = 0;
      // this.Student_.Student_Id=0;
      this.Student_.User_Id = this.Login_User;
      // this.Student_.State_Id = this.State_.State_Id;
      this.Student_.Gender = this.Gender_.Gender_Id;
      // this.Student_.District_Id = this.District_.State_District_Id;
      // this.Student_.District_Name = this.District_.District_Name;
      // this.Student_.Course_Id = this.Course_Student.Course_Id;
      // this.Student_.Course_Name = this.Course_Student.Course_Name;
      this.Student_.Qualification_Id = this.Qualification_.Qualification_Id;
      this.Student_.Qualification_Name = this.Qualification_.Qualification_Name;
      this.Student_.Enquiry_Source = this.Enquiry_Source_.Enquiry_Source_Id;
      this.Student_.Enquiry_Source_Name = this.Enquiry_Source_.Enquiry_Source_Name;
      this.Student_.MasterCourse_Id = this.Mastercourse_.MasterCourse_Id;
      this.Student_.MasterCourse_Name = this.Mastercourse_.MasterCourse_Name;


      this.Student_.Enquiry_For = this.Enquiry_For_.Enquiry_For_Id;
      this.Student_.Enquiry_For_Name = this.Enquiry_For_.Enquiry_For_Name;

      this.Student_.Admission_Branch_Id = this.Admission_Branch_.Agent_Id;
      this.Student_.Admission_Branch = this.Admission_Branch_.Agent_Name;
      this.Student_.Mode_Of_Study_Id = this.Mode_Of_Study_.Mode_Of_Study_Id;
      this.Student_.Mode_Of_Study = this.Mode_Of_Study_.Mode_Of_Study_Name;

      this.Student_.Associates_Agent_Id = this.Associates_Agent_.Client_Accounts_Id;
      this.Student_.Processing_Agent_Id = this.Processing_Agent_.Client_Accounts_Id;



      var AadharPhoto = 0;
      if (Boolean(this.Student_.Aadhar_Photo) === true) AadharPhoto = 1;


      var StudentPhoto = 0;
      if (Boolean(this.Student_.Student_Photo) === true) StudentPhoto = 1;


      var EduPhoto = 0;
      if (Boolean(this.Student_.Education_Documents) == true) EduPhoto = 1;



      return this.Student_;
    } else return null;
  }
  Fill_Followup() {
    if (this.Flag_Followup == 1) {
      // if (this.Student_Followup_.Next_FollowUp_Date == undefined || this.Student_Followup_.Next_FollowUp_Date==null)
      // {
      //     this.Student_Followup_.Next_FollowUp_Date=new Date();
      // }
       

      this.Student_Followup_.Student_Id = this.Student_Id;
      if (this.Followup_Status_.FollowUp != false)
        this.Student_Followup_.Next_FollowUp_Date = this.New_Date(
          new Date(
            moment(this.Student_Followup_.Next_FollowUp_Date).format(
              "YYYY-MM-DD"
            )
          )
        );
      else {
        this.Student_Followup_.Next_FollowUp_Date = new Date();
        this.Student_Followup_.Next_FollowUp_Date = this.New_Date(
          new Date(
            moment(this.Student_Followup_.Next_FollowUp_Date).format(
              "YYYY-MM-DD"
            )
          )
        );
      }

      this.Student_Followup_.Status = this.Followup_Status_.Status_Id;
      this.Student_Followup_.FollowUp = this.Followup_Status_.FollowUp;
      this.Student_Followup_.Status_Name = this.Followup_Status_.Status_Name;
      this.Student_Followup_.To_User_Id = this.Followup_Users_.Users_Id;
      this.Student_Followup_.To_User_Name = this.Followup_Users_.Users_Name;
      this.Student_Followup_.By_User_Id = this.Login_User;
      this.Student_Followup_.By_User_Name = this.Login_User_Name;
      this.Student_Followup_.Entry_Date = this.New_Date(
        new Date(moment(this.Student_Followup_.Entry_Date).format("YYYY-MM-DD"))
      );
      this.Student_Followup_.Actual_FollowUp_Date = this.New_Date(
        new Date(
          moment(this.Student_Followup_.Actual_FollowUp_Date).format(
            "YYYY-MM-DD"
          )
        )
      );
      this.Status_Id = this.Followup_Status_.Status_Id;
      return this.Student_Followup_;
    } else return null;
  }
  Save_Student() {
    if (this.Flag_Student == 1) {
      if (
        this.Enquiry_Source_ == undefined ||
        this.Enquiry_Source_ == null ||
        this.Enquiry_Source_.Enquiry_Source_Id == undefined ||
        this.Enquiry_Source_.Enquiry_Source_Id == 0
      ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Select Enquiry Source", Type: "3" },
        });
        return;
      }

       
      if (
        this.Enquiry_For_ == undefined ||
        this.Enquiry_For_ == null ||
        this.Enquiry_For_.Enquiry_For_Id == undefined ||
        this.Enquiry_For_.Enquiry_For_Id == 0
      ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Select Enquired For", Type: "3" },
        });
        return;
      }



      if (
        this.Student_.Student_Name == undefined ||
        this.Student_.Student_Name == null ||
        this.Student_.Student_Name == ""
      ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Enter Student Name", Type: "3" },
        });
        return;
      }

      if (
        this.Mastercourse_ == undefined ||
        this.Mastercourse_ == null ||
        this.Mastercourse_.MasterCourse_Id == undefined ||
        this.Mastercourse_.MasterCourse_Id == 0
      ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Select Master Course", Type: "3" },
        });
        return;
      }
      if (
        this.Student_.Phone == undefined ||
        this.Student_.Phone == null ||
        this.Student_.Phone == ""
      ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Enter Contact No", Type: "3" },
        });
        return;
      }

      if(this.Enquiry_For_.Enquiry_For_Id!=2)
      {
        if (
          this.Mode_Of_Study_.Mode_Of_Study_Id == undefined ||
          this.Mode_Of_Study_.Mode_Of_Study_Id == null ||
          this.Mode_Of_Study_.Mode_Of_Study_Id == 0 || this.Mode_Of_Study_ ==null || this.Mode_Of_Study_ ==undefined
        ) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Select Mode Of Study", Type: "3" },
          });
          return;
        }

      }
      else
      {
        this.Mode_Of_Study_.Mode_Of_Study_Id=0
        this.Mode_Of_Study_.Mode_Of_Study_Name=''
      }

      

      // if (
      // this.Student_.Whatsapp == undefined ||
      // this.Student_.Whatsapp == null ||
      // this.Student_.Whatsapp == ""
      // ) {
      // const dialogRef = this.dialogBox.open(DialogBox_Component, {
      // panelClass: "Dialogbox-Class",
      // data: { Message: "Enter WhatsApp  No", Type: "3" },
      // });
      // return;
      // }

      // if (this.Student_.Whatsapp.toString().length != 10) {
      // const dialogRef = this.dialogBox.open(DialogBox_Component, {
      // panelClass: "Dialogbox-Class",
      // data: { Message: "Enter valid Whatsapp", Type: "3" },
      // });
      // return;
      // }
      // if (
      //   this.Student_.Mobile != "" &&
      //   this.Student_.Mobile != null &&
      //   this.Student_.Mobile != undefined
      // ) {
      //   if (this.Student_.Mobile.toString().length != 10) {
      //     const dialogRef = this.dialogBox.open(DialogBox_Component, {
      //       panelClass: "Dialogbox-Class",
      //       data: { Message: "Enter valid Mobile No", Type: "3" },
      //     });
      //     return;
      //   }
      // }
      // if (
      //   this.Student_.Phone != "" &&
      //   this.Student_.Phone != null &&
      //   this.Student_.Phone != undefined
      // ) {
      //   if (this.Student_.Phone.toString().length != 10) {
      //     const dialogRef = this.dialogBox.open(DialogBox_Component, {
      //       panelClass: "Dialogbox-Class",
      //       data: { Message: "Enter valid Phone", Type: "3" },
      //     });
      //     return;
      //   }
      // }
      // if (
      // this.Student_.Email == undefined ||
      // this.Student_.Email == null ||
      // this.Student_.Email == ""
      // ) {
      // const dialogRef = this.dialogBox.open(DialogBox_Component, {
      // panelClass: "Dialogbox-Class",
      // data: { Message: "Enter Email ID", Type: "3" },
      // });
      // return;
      // }

      // if (
      //   this.Gender_ == undefined ||
      //   this.Gender_ == null ||
      //   this.Gender_.Gender_Id == undefined ||
      //   this.Gender_.Gender_Id == 0
      //   ) {
      //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
      //   panelClass: "Dialogbox-Class",
      //   data: { Message: "Select Gender", Type: "3" },
      //   });
      //   return;
      //   }



      // if (
      //   this.Admission_Branch_ == undefined ||
      //   this.Admission_Branch_ == null ||
      //   this.Admission_Branch_.Agent_Id == undefined ||
      //   this.Admission_Branch_.Agent_Id == 0
      //   ) {
      //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
      //   panelClass: "Dialogbox-Class",
      //   data: { Message: "Select Admission Branch", Type: "3" },
      //   });
      //   return;
      //   }



      // if (
      // this.State_ == undefined ||
      // this.State_ == null ||
      // this.State_.State_Id == undefined ||
      // this.State_.State_Id == 0
      // ) {
      // const dialogRef = this.dialogBox.open(DialogBox_Component, {
      // panelClass: "Dialogbox-Class",
      // data: { Message: "Select State", Type: "3" },
      // });
      // return;
      // }
      // if (
      // this.District_ == undefined ||
      // this.District_ == null ||
      // this.District_.State_District_Id == undefined ||
      // this.District_.State_District_Id == 0
      // ) {
      // const dialogRef = this.dialogBox.open(DialogBox_Component, {
      // panelClass: "Dialogbox-Class",
      // data: { Message: "Select District", Type: "3" },
      // });
      // return;
      // }

      // if (
      // this.Qualification_ == undefined ||
      // this.Qualification_ == null ||
      // this.Qualification_.Qualification_Id == undefined ||
      // this.Qualification_.Qualification_Id == 0
      // ) {
      // const dialogRef = this.dialogBox.open(DialogBox_Component, {
      // panelClass: "Dialogbox-Class",
      // data: { Message: "Select Qualification", Type: "3" },
      // });
      // return;
      // }



    }
    if (this.Flag_Followup == 1) {
      if (
        this.Followup_Status_ == null ||
        this.Followup_Status_ == undefined ||
        this.Followup_Status_.Status_Id == undefined ||
        this.Followup_Status_.Status_Id == null
      ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Select Status", Type: "3" },
        });
        return;
      }
      if (
        this.Followup_Users_ == null ||
        this.Followup_Users_ == undefined ||
        this.Followup_Users_.Users_Id == undefined ||
        this.Followup_Users_.Users_Id == null
      ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Select To Staff", Type: "3" },
        });
        return;
      }



      if (
        this.Student_Followup_.Remark == undefined ||
        this.Student_Followup_.Remark == null ||
        this.Student_Followup_.Remark == ""
      ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Enter First Call Comments", Type: "3" },
        });
        return;
      }

      if (this.Followup_Status_.FollowUp != false) {
        if (
          this.Student_Followup_.Next_FollowUp_Date == undefined ||
          this.Student_Followup_.Next_FollowUp_Date == null
        ) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Choose Next Follow Up Date", Type: "3" },
          });
          return;
        }
      }
    }  
    var Main_Array = {
      Student: this.Fill_Student(),

      Followup: this.Fill_Followup(),
    };
    if (Main_Array.Student == null && Main_Array.Followup == null) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Saved", Type: "false" },
      });
      return;
    }

    if (this.Save_Call_Status == true) return;
    else this.Save_Call_Status = true;
    this.issLoading = true;
     
    this.Student_Service_.Save_Student(
      Main_Array,
      this.ImageFile_Photo
    ).subscribe(
      (Save_status) => {
         
        if (Number(Save_status[0][0].Student_Id_) > 0) {
          if (this.Flag_Student == 1) {
            this.Student_.Student_Id = Number(Save_status[0][0].Student_Id_);

            //  this.Registration_Visiblility=true;


            if (this.Student_.Registered == true) {
              if (
                this.Remove_Registration_Permissions != undefined &&
                this.Remove_Registration_Permissions != null
              )
                if (this.Remove_Registration_Permissions.View == true)
                  this.Remove_Registration_Visibility = true;
            } else {
              if (
                this.Registration_Permissions != undefined &&
                this.Registration_Permissions != null
              )
                if (this.Registration_Permissions.View == true)
                  this.Registration_Visiblility = true;
            }



            this.profile_View_followup = false;
             

            this.View_History_ = false;
            this.View_Follow_ = false;
            this.Student_Id_Edit = Save_status[0][0].Student_Id_;
            this.Student_Id = Save_status[0][0].Student_Id_;

          }
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved", Type: "false" },
          });
          this.Save_Call_Status = false;
          this.Total_Rows = this.Total_Rows - this.Student_Data.length;
          // if(this.Flag_Student==1 && this.Student_Id==0)
          // if (
          // this.Mail_sms_Status == 0 &&
          // !(this.Status_Id == 18 || this.Status_Id == 22)
          // ) {
          // var Student = "";
          // if (Save_status[0][0].Student_Name_ == null)
          // Student = this.Student_Name;
          // else Student = Save_status[0][0].Student_Name_;
          // if (Save_status[0] != undefined && Save_status[0] != "") {
          // var Sms =
          // "Hi, " +
          // Student +
          // " Thank you for Your Enquiry at ONE TEAM. Our Experienced trainers look forward to Train you. Visit oneteamsolutions.in or call " +
          // this.User_Mobile +
          // " ONE TEAM SOLUTIONS";

          // // var Sms='Hello '+Save_status[1][0].Student_Name_+
          // // ' Thank you for Enquiring about Hands on-Training Programs at One Team. Our Experienced Trainers look forward to train you.Visit oneteamsolutions.in or call 9567440597 for any support.';
          // this.Student_Service_.Send_Sms_Email(
          // Save_status[0][0].Phone_,
          // Save_status[0][0].Email_,
          // Sms,
          // Student
          // ).subscribe(
          // (Rows) => {
          // const dialogRef = this.dialogBox.open(DialogBox_Component, {
          // panelClass: "Dialogbox-Class",
          // data: { Message: Sms, Type: "false" },
          // });

          // this.issLoading = false;
          // },
          // (Rows) => {
          // this.issLoading = false;
          // const dialogRef = this.dialogBox.open(DialogBox_Component, {
          // panelClass: "Dialogbox-Class",
          // data: { Message: "Error Occured", Type: "2" },
          // });
          // }
          // );
          // }
          // this.issLoading = false;
          // }

          if (this.profile_View == true) {
            // this.Create_New();
            this.Search_Student();
            // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
            // this.Clr_Student();
            //this.Close_Click();
          } else {
            this.Close_Click();
            // this.Search_Student();
            // this.Total_Rows = this.Total_Rows - this.Student_Data.length;
          }
        } else if (Number(Save_status[0][0].Student_Id_) == -1) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: {
              Message:
                "The Phone Number Already Exist for " +
                Save_status[0][0].Duplicate_Student_Name +
                " and is handled by " +
                Save_status[0][0].Duplicate_User_Name,
              Type: "2",
            },
          });
          this.Save_Call_Status = false;
        } else if (Number(Save_status[0][0].Student_Id_) == -2) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: {
              Message:
                " Email is Already Exist for " +
                Save_status[0][0].Duplicate_Student_Name +
                " and is handled by " +
                Save_status[0][0].Duplicate_User_Name,
              Type: "2",
            },
          });
          this.Save_Call_Status = false;
        } else {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error ", Type: "2" },
          });
          this.Save_Call_Status = false;
        }
        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;

        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: "2" },
        });
        this.Save_Call_Status = false;
      }
    );
  }


  Register_Student() {

     


    // this.Registration_fees_View ==true;
    if (this.Student_.Registration_Fees == undefined || this.Student_.Registration_Fees == null || this.Student_.Registration_Fees == 0)
     { this.Student_.Registration_Fees = 0 };


    if (this.Student_.Enquiry_For == 1) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: {
          Message: "Do you want to Register ?",
          Type: true,
          Heading: "Confirm",
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == "Yes") {
          this.issLoading = true;

           
          this.Student_Service_.Register_Student(
            this.Student_.Student_Id,
            this.Login_User, this.Student_.Registration_Fees, this.Student_.Enquiry_For
          ).subscribe(
            (Save_status) => {
               
              if (Number(Save_status[0][0].Student_Id_) > 0) {

                this.Student_Id_Edit = Number(Save_status[0][0].Student_Id_);
                this.Student_.Registered = true;
                this.Student_.Registration_No =
                  Save_status[0][0].Registration_No_;
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                  panelClass: "Dialogbox-Class",
                  data: { Message: "Registered", Type: "false" },
                });
                debugger
                if (
                  this.Course_Selection_Permission != undefined &&
                  this.Course_Selection_Permission != null
                )
                  if (this.Course_Selection_Permission.View == true)
                    this.Course_Selection_Visibility = true;
                this.Total_Rows = this.Total_Rows - this.Student_Data.length;
                this.Course_Selection_Visibility == true
                Save_status[0][0].Is_registered_ == 1

                this.Remove_Registration_Visibility = false;
                this.Registration_Visiblility = false;

                if (
                  this.Remove_Registration_Permissions != undefined &&
                  this.Remove_Registration_Permissions != null
                )
                  if (this.Remove_Registration_Permissions.View == true)
                    this.Remove_Registration_Visibility = true;


              } else {
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


    if (this.Student_.Enquiry_For == 2) {


      if (this.Student_.Registration_Fees == undefined || this.Student_.Registration_Fees == null || this.Student_.Registration_Fees == 0)
      { this.Student_.Registration_Fees = 0 };
 
      // if (
      //   this.Student_.Registration_Fees == undefined ||
      //   this.Student_.Registration_Fees == null ||
      //   this.Student_.Registration_Fees == 0
      // ) {
      //   this.Message = "Enter Registration Fees";
      //   return;
      // }

      // {
      // const dialogRef = this.dialogBox.open(DialogBox_Component, {
      // panelClass: "Dialogbox-Class",
      // data: { Message: "Enter Registration Fees", Type: "3" },
      // });
      // return;
      // }


      this.issLoading = true;

      debugger;
      this.Student_Service_.Register_Student(
        this.Student_.Student_Id,
        this.Login_User, this.Student_.Registration_Fees, this.Student_.Enquiry_For
      ).subscribe(
        (Save_status) => {
          debugger;
          // if(this.Student_.Enquiry_For_Id==2){
          if ( (Number(Save_status[0][0].Student_Id_) > 0) || Number(Save_status[1][0].Student_Id_) > 0 ) {
            if(Save_status[1][0])
{


            if(Number(Save_status[1][0].Student_Id_) > 0)
            {
              this.Student_Id_Edit = Number(Save_status[1][0].Student_Id_);
            }
          }
            else
            {
              this.Student_Id_Edit = Number(Save_status[0][0].Student_Id_);
            }

            

            this.Student_.Registered = true;


            // const dialogRef = this.dialogBox.open(DialogBox_Component, {
            // panelClass: "Dialogbox-Class",
            // data: { Message: "Registered", Type: "false" },
            // });

            if (this.Student_Id_Edit > 0) {
              this.Message = "Registered";

              this.Student_.Registration_Fees = null;
              // return;
            }




            if (
              this.Course_Selection_Permission != undefined &&
              this.Course_Selection_Permission != null
            )

              if (this.Course_Selection_Permission.View == true)
                this.Course_Selection_Visibility = true;


            this.Total_Rows = this.Total_Rows - this.Student_Data.length;

            this.Course_Selection_Visibility = true


            this.Course_Selection_Visibility == true
            Save_status[0][0].Is_registered_ == 1

            this.Remove_Registration_Visibility = false;
            this.Registration_Visiblility = false;

            if (
              this.Remove_Registration_Permissions != undefined &&
              this.Remove_Registration_Permissions != null
            )
              if (this.Remove_Registration_Permissions.View == true)
                this.Remove_Registration_Visibility = true;


          } else {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: "2" },
            });
          }
          // } 


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










  }

  Reg_change() {
    if (
      this.Student_.Registration_Fees != undefined ||
      this.Student_.Registration_Fees != null ||
      this.Student_.Registration_Fees != 0
    ) {
      this.Message = "";
    }
  }

  // Register_Student() {

  //  

  // if(this.Student_.Registration_Fees ==undefined||this.Student_.Registration_Fees ==null||this.Student_.Registration_Fees ==0)
  // {this.Student_.Registration_Fees=0};

  // const dialogRef = this.dialogBox.open(DialogBox_Component, {
  // panelClass: "Dialogbox-Class",
  // data: {
  // Message: "Do you want to Register ?",
  // Type: true,
  // Heading: "Confirm",
  // },
  // });
  // dialogRef.afterClosed().subscribe((result) => {
  // if (result == "Yes") {
  // this.issLoading = true;
  // // this.Regtn_fees_View =true;


  // // if(this.Student_Course_.End_Date==null)
  // // {
  // //   this.Student_Course_.End_Date_Check=false;
  // // }
  // // else
  // // {
  // //   this.Student_Course_.End_Date_Check=true;
  // // }


  // // if(this.reg_fees_save=true){
  //    
  // this.Student_Service_.Register_Student(
  // this.Student_.Student_Id,
  // this.Login_User,this.Student_.Registration_Fees,this.Student_.Enquiry_For_Id
  // ).subscribe(
  // (Save_status) => {
  //    

  // if(this.Student_.Enquiry_For_Id==2){
  // if (Number(Save_status[1][0].Student_Id_) > 0)
  // {


  // this.Student_Id_Edit = Number(Save_status[1][0].Student_Id_);

  // this.Student_.Registered = true;


  // const dialogRef = this.dialogBox.open(DialogBox_Component, {
  // panelClass: "Dialogbox-Class",
  // data: { Message: "Registered", Type: "false" },
  // });
  // // this.Search_Student();



  // if (
  // this.Course_Selection_Permission != undefined &&
  // this.Course_Selection_Permission != null
  // )

  // if (this.Course_Selection_Permission.View == true)
  // this.Course_Selection_Visibility = true;


  //  this.Total_Rows = this.Total_Rows - this.Student_Data.length;


  // // var Is_Mail_Status_ = 0;var Is_Status_ = 0;
  // // Is_Mail_Status_ = Save_status[0][0].Is_Mail_Status_;
  // // Is_Status_ = Save_status[0][0].Is_Status_;

  // // this.Edit_Student(this.Student_Id_Edit,Is_Mail_Status_,Is_Status_,1);

  // this.Course_Selection_Visibility==true
  // Save_status[0][0].Is_registered_==1

  //   this.Remove_Registration_Visibility = false;
  //   this.Registration_Visiblility = false;

  //   if (
  //   this.Remove_Registration_Permissions != undefined &&
  //   this.Remove_Registration_Permissions != null
  //   )
  //   if (this.Remove_Registration_Permissions.View == true)
  //   this.Remove_Registration_Visibility = true;


  // }else {
  // const dialogRef = this.dialogBox.open(DialogBox_Component, {
  // panelClass: "Dialogbox-Class",
  // data: { Message: "Error Occured", Type: "2" },
  // });
  // }} 

  // else{
  //   if (Number(Save_status[0][0].Student_Id_) > 0)
  //   {

  //   this.Student_Id_Edit = Number(Save_status[0][0].Student_Id_);
  //   this.Student_.Registered = true;
  //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
  //   panelClass: "Dialogbox-Class",
  //   data: { Message: "Registered", Type: "false" },
  //   });
  //   if (
  //   this.Course_Selection_Permission != undefined &&
  //   this.Course_Selection_Permission != null
  //   )
  //   if (this.Course_Selection_Permission.View == true)
  //   this.Course_Selection_Visibility = true;
  //    this.Total_Rows = this.Total_Rows - this.Student_Data.length;
  //   this.Course_Selection_Visibility==true
  //   Save_status[0][0].Is_registered_==1

  //     this.Remove_Registration_Visibility = false;
  //     this.Registration_Visiblility = false;

  //     if (
  //     this.Remove_Registration_Permissions != undefined &&
  //     this.Remove_Registration_Permissions != null
  //     )
  //     if (this.Remove_Registration_Permissions.View == true)
  //     this.Remove_Registration_Visibility = true;


  //   }else {
  //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
  //   panelClass: "Dialogbox-Class",
  //   data: { Message: "Error Occured", Type: "2" },
  //   });
  //   }} 



  // this.issLoading = false;
  // },
  // (Rows) => {
  // this.issLoading = false;
  // const dialogRef = this.dialogBox.open(DialogBox_Component, {
  // panelClass: "Dialogbox-Class",
  // data: { Message: "Error Occured", Type: "2" },
  // });
  // }
  // );

  // }
  // });



  // }








  // Register_Student2() {

  // // dialogRef.afterClosed().subscribe((result) => {
  // // if (result == "Yes") {
  // this.issLoading = true;

  // this.Student_Service_.Register_Student(
  // this.Student_.Student_Id,
  // this.Login_User
  // ).subscribe(
  // (Save_status) => {

  // if (Number(Save_status[0][0].Student_Id_) > 0)
  // {


  // this.Student_Id_Edit = Number(Save_status[0][0].Student_Id_);

  // this.Student_.Registered = true;


  // const dialogRef = this.dialogBox.open(DialogBox_Component, {
  // panelClass: "Dialogbox-Class",
  // data: { Message: "Registered", Type: "false" },
  // });

  // if (
  // this.Course_Selection_Permission != undefined &&
  // this.Course_Selection_Permission != null
  // )

  // if (this.Course_Selection_Permission.View == true)
  // this.Course_Selection_Visibility = true;


  //  this.Total_Rows = this.Total_Rows - this.Student_Data.length;


  // this.Course_Selection_Visibility==true
  // Save_status[0][0].Is_registered_==1

  //   this.Remove_Registration_Visibility = false;
  //   this.Registration_Visiblility = false;

  //   if (
  //   this.Remove_Registration_Permissions != undefined &&
  //   this.Remove_Registration_Permissions != null
  //   )
  //   if (this.Remove_Registration_Permissions.View == true)
  //   this.Remove_Registration_Visibility = true;

  // } else {
  // const dialogRef = this.dialogBox.open(DialogBox_Component, {
  // panelClass: "Dialogbox-Class",
  // data: { Message: "Error Occured", Type: "2" },
  // });
  // }
  // this.issLoading = false;
  // },
  // (Rows) => {
  // this.issLoading = false;
  // const dialogRef = this.dialogBox.open(DialogBox_Component, {
  // panelClass: "Dialogbox-Class",
  // data: { Message: "Error Occured", Type: "2" },
  // });
  // }
  // );
  // // }
  // // }
  // // });


  // }








  Remove_Registration() {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
      panelClass: "Dialogbox-Class",
      data: {
        Message: "Do you want to Remove Registration ?",
        Type: true,
        Heading: "Confirm",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Yes") {
        // this.issLoading=true;
        this.Student_Service_.Remove_Registration(
          this.Student_.Student_Id
        ).subscribe(
          (update_status) => {
             
            if (update_status[0][0].Student_Id_ > 0) {

              this.Student_Id_Edit = Number(update_status[0][0].Student_Id_);

              this.Student_.Registered = false;


              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Registration Removed", Type: "false" },
              });




              if (
                this.Course_Selection_Permission != undefined &&
                this.Course_Selection_Permission != null
              )

                if (this.Course_Selection_Permission.View == false)
                  this.Course_Selection_Visibility = false;



              this.Total_Rows = this.Total_Rows - this.Student_Data.length;

              // var Mail_Status_ = 0;var Status_ = 0;var student_id_;
              // Mail_Status_ = update_status[0][0].Is_Mail_Status_;
              // Status_ = update_status[0][0].Is_Status_;
              //  student_id_ = update_status[0][0].Student_Id_;

              // this.Edit_Student(student_id_,Mail_Status_,Status_,this.Student_EditIndex);
              // this.Student_.Registration_No = "";
              this.Search_Student();

              this.Remove_Registration_Visibility = false;
              this.Registration_Visiblility = false;

              if (
                this.Remove_Registration_Permissions != undefined &&
                this.Remove_Registration_Permissions != null
              )
                if (this.Registration_Permissions.View == true)
                  this.Registration_Visiblility = true;
            } else {
              this.issLoading = false;
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
  View_Follow_Click_() {
    if (this.Fees_View != undefined) {
      this.Fees_View = false;
    }
    this.View_History_ = false;
    this.Fees_View = false;
    this.New_Followup(
      this.Student_Id,
      this.Student_Name,
      this.Status_Id,
      this.Student_EditIndex
    );

    //this.Create_New=true;
  }
  New_Followup(Student_Id, Student_Name, Mail_Status, index) {

     
    this.View_Student_ = false;
    this.View_Follow_ = true;
    this.View_History_ = false;
    this.Fees_View = false;
    this.Remark_View = false
    
    this.Process_View=false;
    this.Resumesending_View = false;
    this.Placement_View = false;
    this.Interview_View = false;
    this.Resume_Sending_View = false;
    this.Show_FollowUp = false;
    this.Entry_View = true;
    this.tab_view = false;
    this.profile_View = false;
    this.ExamLevelGraph_View = false;
    this.Documents_View = false;
    this.profile_View_followup = false;
    this.Course_View = false;
    this.Mark_View = false;
    this.Next_FollowUp_Date_Visible = true;
    this.Mail_sms_Status = Mail_Status;
    this.Student_Id = Student_Id;
    this.Student_Name = Student_Name;

    this.application_details_View = false;
    this.Applicationmodal_View = false;
    this.Feesmodal_View = false;
    this.Fee_Collection_View = false;
    this.History_View = false;
    this.Change_Status_View = false;

    this.Student_EditIndex = index;
    // this.Next_FollowUp_Date_Visible=true;
    this.Get_FollowUp_Details();

    this.Student_Followup_.Student_Id = Student_Id;

    this.Flag_Followup = 1;
    this.Flag_Student = 0;
    // this.Student_Followup_.Next_FollowUp_Date=new Date();
    // this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
  }
  Get_Last_Followup() {
    this.issLoading = true;
    this.Student_Service_.Get_Last_Followup(this.Login_User).subscribe(
      (Rows) => {
        this.Student_Name = '';
        this.Student_Followup_Data = Rows[0];
        if (this.Student_Followup_Data.length > 0) {
          this.issLoading = false;
          this.Student_Followup_ = this.Student_Followup_Data[0];

          this.Followup_Status_Temp.FollowUp = this.Student_Followup_.FollowUp;
          this.Followup_Status_Temp.Status_Id = this.Student_Followup_.Status;
          this.Followup_Status_Temp.Status_Name =
            this.Student_Followup_.Status_Name;
          this.Followup_Status_ = this.Followup_Status_Temp;
           
          this.Followup_Users_Temp.Users_Id = this.Student_Followup_.To_User_Id;
          this.Followup_Users_Temp.Users_Name =
            this.Student_Followup_.To_User_Name;
          this.Followup_Users_ = this.Followup_Users_Temp;

          if (this.Student_Followup_.FollowUp == true)
            this.Next_FollowUp_Date_Visible = false;
          else this.Next_FollowUp_Date_Visible = true;

          // this.Student_Followup_.Next_FollowUp_Date = new Date();
          // this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);

          this.Student_Followup_.Remark = "";
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

  Get_FollowUp_Details() {
    this.issLoading = true;
     
    this.Student_Service_.Get_FollowUp_Details(this.Student_Id).subscribe(
      (Rows) => {
        this.issLoading = false;
         
        this.Student_Followup_ = Rows[0].FollowUp[0];
        if (
          this.Student_Followup_ != null &&
          this.Student_Followup_ != undefined
        ) {
          this.Followup_Status_Temp.FollowUp = this.Student_Followup_.FollowUp;
          this.Followup_Status_Temp.Status_Id = this.Student_Followup_.Status;
          this.Followup_Status_Temp.Status_Name =
            this.Student_Followup_.Status_Name;
          this.Followup_Status_ = Object.assign({}, this.Followup_Status_Temp);

          // this.Followup_Users_Temp.Users_Id = this.Student_Followup_.To_User_Id;
          // this.Followup_Users_Temp.Users_Name =
          // this.Student_Followup_.To_User_Name;
          // this.Followup_Users_ = Object.assign({}, this.Followup_Users_Temp);


          this.Followup_Users_Temp_c.Users_Id = this.Student_Followup_.To_User_Id;
          this.Followup_Users_Temp_c.Users_Name =
            this.Student_Followup_.To_User_Name;
          this.Followup_Users_ = Object.assign({}, this.Followup_Users_Temp_c);


          this.Student_Followup_.Remark = "";

          if (this.Student_Followup_.FollowUp == true) {
            this.Next_FollowUp_Date_Visible = false;
          } else this.Next_FollowUp_Date_Visible = true;

          this.Student_Followup_.Next_FollowUp_Date = null;
          //  this.Student_Followup_.Next_FollowUp_Date=new Date();
          //  this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
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
  Followup_History() {

    let bottom = document.getElementById("show_History");
    if (bottom !== null) {
      bottom.scrollIntoView();
      bottom = null;
    }
    // this.Student_Id=this.Student_Data[this.Student_EditIndex].Student_Id;
    if (this.Show_Followup_History == true) {
      this.Show_Followup_History = false;
      this.issLoading = true;
       
      this.Student_Service_.Followup_History(this.Student_Id).subscribe(
        (Rows) => {
          this.issLoading = false;
           
          if (Rows[0].FollowUp.length > 0)
            this.Followp_History_Data = Rows[0].FollowUp;
        },
        (Rows) => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: false },
          });
        }
      );
    } else this.Show_Followup_History = true;
  }
  View_Student_Click_() {
    this.View_History_ = true;
    this.Show_FollowUp = true;
    this.Show_Followup_History = true;

    this.Edit_Student(
      this.Student_Id,
      this.Mail_sms_Status,
      this.Status_Id,
      this.Student_EditIndex
    );
    // this.Edit_Student(this.Student_Data[0], this.Student_EditIndex);
  }
  numberToEnglish(n, custom_join_character) {
    var string = n.toString(),
      units,
      tens,
      scales,
      start,
      end,
      chunks,
      chunksLen,
      chunk,
      ints,
      i,
      word,
      words;

    var and = custom_join_character || "and";

    /* Is number zero? */
    if (parseInt(string) === 0) {
      return "zero";
    }

    /* Array of units as words */
    units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    /* Array of tens as words */
    tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    /* Array of scales as words */
    scales = ["", "", "Thousand", "Lakh", "Billion"];

    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return "";
    }

    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);

      if (chunk) {
        /* Split chunk into array of individual integers */
        ints = chunks[i].split("").reverse().map(parseFloat);

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
          ints[0] += 10;
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word);
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word);
        }

        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
          words.push(word);
        }

        /* Add 'and' string after units or tens integer if: */
        if (ints[0] || ints[1]) {
          /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
          if (ints[2] || (!i && chunksLen)) {
            words.push(and);
          }
        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
          words.push(word + " hundred");
        }
      }
    }

    return words.reverse().join(" ");
  }
  print_receipt(Receipt_Voucher_e: Receipt_Voucher, index) {



    this.Get_Companydetails();

     
    this.Receipt_Voucher_ = Receipt_Voucher_e;
    this.print_voucher_no = this.Receipt_Voucher_.Voucher_No;
    this.print_Paid_date = this.Receipt_Voucher_.Date;
    this.print_account_name = this.Receipt_Voucher_.FromAccount_Name;
    this.print_amount = this.Receipt_Voucher_.Amount;
    this.print_Description = this.Receipt_Voucher_.Description;

    this.To_Account_Id = this.Receipt_Voucher_.To_Account_Id;

    this.Company_Name = this.Receipt_Voucher_.Company_Name;
    this.Address1 = this.Receipt_Voucher_.Address1;
    this.Address2 = this.Receipt_Voucher_.Address2;
    this.Address3 = this.Receipt_Voucher_.Address3;
    this.PinCode = this.Receipt_Voucher_.PinCode;
    this.GSTNo = this.Receipt_Voucher_.GSTNo;



    this.print_paid = this.numberToEnglish(this.print_amount, "");
    ;
    setTimeout(function () {
      // this.print_Mark()
      let popupWinindow;

      let innerContents = document.getElementById("Print_Div").innerHTML;
      popupWinindow = window.open(
        "",
        "_blank",
        "width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
      );
      popupWinindow.document.open();
      popupWinindow.document.write(
        '<html><head><style>@page { size: auto; margin: 0mm; } </style><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' +
        innerContents +
        "</html>"
      );
      popupWinindow.document.close();
    }, 1000);
  }

  Get_Companydetails() {
    this.issLoading = true;
    this.Student_Service_.Get_Companydetails().subscribe(
      (Rows) => {

         
        this.issLoading = false;
        this.Companyprint_Data = Rows[0];
        this.print_Company_Name = Rows[0][0].Company_Name;
        this.print_Company_Address1 = Rows[0][0].Address1;
        this.print_Company_Address2 = Rows[0][0].Address2;
        this.print_Company_Address3 = Rows[0][0].Address3;
        this.print_Company_Address4 = Rows[0][0].Address4;
        this.print_Company_pincode = Rows[0][0].Pincode;
        this.print_Company_Phone = Rows[0][0].Phone_Number;
        this.print_Company_Mobile = Rows[0][0].Mobile_Number;
        this.print_Company_Email = Rows[0][0].EMail;
        this.print_Company_Website = Rows[0][0].Website;
      },
      (Rows) => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: false },
        });
      }
    );
  }

  // Get_Companydetails()
  // {

  //    
  //     this.issLoading = true;
  //     this.Hotel_Booking_Master_Service_.Get_Companydetails().subscribe(Rows => {

  //         this.issLoading = false;
  //         this.Companyprint_Data = Rows[0];
  //         this.print_Company_Name=Rows[0][0].Company_Name;
  //         this.print_Company_Address1=Rows[0][0].Address1;
  //         this.print_Company_Address2=Rows[0][0].Address2;
  //         this.print_Company_Address3=Rows[0][0].Address3;
  //         this.print_Company_Address4=Rows[0][0].Address4;
  //         this.print_Company_pincode=Rows[0][0].Pincode;
  //         this.print_Company_Phone=Rows[0][0].Phone1;
  //         this.print_Company_Mobile=Rows[0][0].Mobile;
  //         this.print_Company_Email=Rows[0][0].Email;
  //         this.print_Company_Website=Rows[0][0].Website;

  //     },
  //         Rows => {
  //             this.issLoading = false;
  //             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  //         });
  // }

  Edit_Student(Student_Id_Temp, Mail_Status_, Status, index) {

     
    //alert(Mail_Status_)
    // this.Clr_Student();
    this.Student_EditIndex = index;
    this.Flag_Followup = 0;
    this.Flag_Student = 1;
    this.Mail_sms_Status = Mail_Status_;
    this.Status_Id = Status;
    this.Student_Followup_.Remark = "";
    // this.Student_Id = Student_e.Student_Id;
    // this.Student_Id_Edit = Student_e.Student_Id;

    this.Student_Id = Student_Id_Temp;
    this.Student_Id_Edit = Student_Id_Temp;

    this.level_tab_view = false;
    this.application_details_View = false;

    this.Fee_Collection_View = false;
    this.Feesmodal_View = false;

    this.History_View = false;
    this.Change_Status_View = false;
    this.Applicationmodal_View = false;

    this.View_Student_ = true;
    this.Course_Tab = false;
    this.clickview = false;
    this.View_Follow_ = false;
    this.Entry_View = true;
    this.profile_View = true;
    this.Documents_View = false;
    this.profile_View_followup = false;
    this.Receipt_History_View = false;
    this.tab_view = true;
    this.Course_View = false;
    this.ExamLevelGraph_View = false;

    this.View_History_ = false;
    this.Show_FollowUp = true;
    this.Fees_View = false;
    this.Remark_View = false
    
    this.Process_View=false;
    this.Resumesending_View = false;
    this.Placement_View = false;
    this.Interview_View = false;
    this.Resume_Sending_View = false;
    this.Mark_View = false;
    this.Course_Click_Status = false;
    this.Fees_Click_Status = false;
    this.Mark_Click_Status = false;

    this.application_details_View = false;
    this.Applicationmodal_View = false;
    this.Feesmodal_View = false;
    this.Fee_Collection_View = false;

     
    // this.Save_Agent_.Client_Accounts_Name=Student_e.Client_Accounts_Name;
    // this.Save_Agent_.Client_Accounts_Id=Student_e.Agent_Id;
    this.issLoading = true;
    //Student_e.Student_Id
    this.Student_Service_.Get_Student(Student_Id_Temp).subscribe(
      (Rows) => {
         
        this.Student_ = Object.assign({}, Rows[0][0]);
        console.log(Rows[0][0]);

        this.Student_Name = this.Student_.Student_Name;
        this.Registration = this.Student_.Registered;
         
        this.StudentcourseIdTemp = this.Student_.Student_Course_Id;
        this.Remove_Registration_Visibility = false;
        this.Registration_Visiblility = false;
        this.Course_Selection_Visibility = false;

        if (this.Student_.Registered == true) {
          if (
            this.Remove_Registration_Permissions != undefined &&
            this.Remove_Registration_Permissions != null
          )
            if (this.Remove_Registration_Permissions.View == true)
              this.Remove_Registration_Visibility = true;
        } else {
          if (
            this.Registration_Permissions != undefined &&
            this.Registration_Permissions != null
          )
            if (this.Registration_Permissions.View == true)
              this.Registration_Visiblility = true;
        }

        if (
          this.Course_Selection_Permission != undefined &&
          this.Course_Selection_Permission != null
        )
          if (this.Course_Selection_Permission.View == true)
            this.Course_Selection_Visibility = true;

        this.Display_Photo_ = this.Student_.Photo;


         

        this.ImageFile_Photo_view = environment.FilePath + this.Student_.Photo;
        for (var i = 0; i < this.Gender_Data.length; i++) {
          if (this.Student_.Gender == this.Gender_Data[i].Gender_Id)
            this.Gender_ = this.Gender_Data[i];
        }
        for (var i = 0; i < this.Enquiry_Source_Data.length; i++) {
          if (
            this.Student_.Enquiry_Source ==
            this.Enquiry_Source_Data[i].Enquiry_Source_Id
          )
            this.Enquiry_Source_ = this.Enquiry_Source_Data[i];
        }


         
        for (var i = 0; i < this.Enquiry_For_Data.length; i++) {
          if (
            this.Student_.Enquiry_For_Id ==
            this.Enquiry_For_Data[i].Enquiry_For_Id
          )
            this.Enquiry_For_ = this.Enquiry_For_Data[i];
        }




        for (var i = 0; i < this.Qualification_Data.length; i++) {
          if (
            this.Student_.Qualification_Id ==
            this.Qualification_Data[i].Qualification_Id
          )
            this.Qualification_ = this.Qualification_Data[i];
        }



        for (var i = 0; i < this.Mastercourse_Data.length; i++) {
          if (
            this.Student_.MasterCourse_Id ==
            this.Mastercourse_Data[i].MasterCourse_Id
          )
            this.Mastercourse_ = this.Mastercourse_Data[i];
        }



        for (var i = 0; i < this.Branch_Data.length; i++) {
          if (
            this.Student_.Admission_Branch_Id ==
            this.Branch_Data[i].Agent_Id
          )
            this.Admission_Branch_ = this.Branch_Data[i];
        }

        for (var i = 0; i < this.Branch_Data.length; i++) {
          if (
            this.Student_.Offline_Branch_Id ==
            this.Branch_Data[i].Agent_Id
          )
            this.Offline_Branch_ = this.Branch_Data[i];
        }


        for (var i = 0; i < this.Mode_Of_Study_Data.length; i++) {
          if (
            this.Student_.Mode_Of_Study_Id ==
            this.Mode_Of_Study_Data[i].Mode_Of_Study_Id
          )
            this.Mode_Of_Study_ = this.Mode_Of_Study_Data[i];
        }
        for (var i = 0; i < this.Associates_Agent_Data.length; i++) {
          if (
            this.Student_.Associates_Agent_Id ==
            this.Associates_Agent_Data[i].Client_Accounts_Id
          )
            this.Associates_Agent_ = this.Associates_Agent_Data[i];
        }



        for (var i = 0; i < this.Processing_Agent_Data.length; i++) {
          if (
            this.Student_.Processing_Agent_Id ==
            this.Processing_Agent_Data[i].Client_Accounts_Id
          )
            this.Processing_Agent_ = this.Processing_Agent_Data[i];
        }


        for (var i = 0; i < this.State_Data.length; i++) {
          if (this.Student_.State_Id == this.State_Data[i].State_Id)
            this.State_ = this.State_Data[i];
        }


        for (var i = 0; i < this.Enquiry_For_Data.length; i++) {
          if (this.Student_.Enquiry_For == this.Enquiry_For_Data[i].Enquiry_For_Id)
            this.Enquiry_For_ = this.Enquiry_For_Data[i];
        }

        this.State_District_Temp.State_District_Id = this.Student_.District_Id;
        this.State_District_Temp.District_Name = this.Student_.District_Name;
        this.District_ = Object.assign(this.State_District_Temp);

        this.Course_Temp.Course_Id = this.Student_.Course_Id;
        this.Course_Temp.Course_Name = this.Student_.Course_Name;
        this.Course_Student = Object.assign(this.Course_Temp);

         

        if (this.Student_.Aadhar_Photo != null || this.Student_.Aadhar_Photo != undefined) {
          if (this.Student_.Aadhar_Photo.toString() == "1") this.Student_.Aadhar_Photo = true;
          else this.Student_.Aadhar_Photo = false;
        }
        if (this.Student_.Education_Documents != null || this.Student_.Education_Documents != undefined) {
          if (this.Student_.Education_Documents.toString() == "1") this.Student_.Education_Documents = true;
          else this.Student_.Education_Documents = false;
        }

        if (this.Student_.Student_Photo != null || this.Student_.Student_Photo != undefined) {
          if (this.Student_.Student_Photo.toString() == "1") this.Student_.Student_Photo = true;
          else this.Student_.Student_Photo = false;
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


  Clr_Student_Course() { 
    let top = document.getElementById("tab");
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }

    this.Student_Course_.Student_Course_Id = 0;
    this.Student_Course_.Student_Id = 0;
    this.Student_Course_.Entry_Date = new Date();
    this.Student_Course_.Entry_Date = this.New_Date(
      this.Student_Course_.Entry_Date
    );
    this.Student_Course_.Course_Name_Details = "";
    this.Student_Course_.Agent_Amount = 0;
    this.Student_Course_.Total_Fees = 0;
    this.Student_Course_.Course_Type_Id = 0;
    this.Student_Course_.Course_Type_Name = "";

    this.Student_Course_.Start_Date = new Date();
    this.Student_Course_.End_Date = "";
    this.Student_Course_.End_Date_Check = false;
    // this.Student_Course_.Join_Date = null;

    // this.Student_Course_.Start_Date = new Date();
    // this.Student_Course_.Start_Date = this.New_Date(
    // this.Student_Course_.Start_Date
    // );



    // this.Student_Course_.End_Date = new Date();
    // this.Student_Course_.End_Date = this.New_Date(
    // this.Student_Course_.End_Date
    // );
    this.Student_Course_.Exam_Date = "";
    this.Student_Course_.End_Date_L = "";


    // this.Student_Course_.Join_Date = new Date();
    // this.Student_Course_.Join_Date = this.New_Date(
    // this.Student_Course_.Join_Date
    // );

    // this.Student_Course_.Exam_Date = new Date();
    // this.Student_Course_.Exam_Date = this.New_Date(
    // this.Student_Course_.Exam_Date
    // );

    this.Student_Course_.Exam_Date = "";
    this.Student_Course_.Exam_Date_Check = false;

    this.Student_Course_.Is_Processing_commision = false;
    this.Student_Course_.By_User_Id = 0;
    this.Student_Course_.Status = 0;
    this.Student_Course_.Installment_Type_Id = 0;
    this.Student_Course_.No_Of_Installment = 0;
    this.Student_Course_.Duration = "";
    this.Student_Course_.Revision_Duration = 0;
    this.Course_ = null;
    this.Batch_ = new Batch();
    this.Faculty_ = new Users();
    this.Student_Fees_Installment_Master_Data = [];
    this.Student_Fees_Installment_Details_Data = [];
    this.Student_Course_Subject_Data = [];
    this.Student_Course_Id_Edit = 0;
    if (
      this.Installment_Type_Data != undefined &&
      this.Installment_Type_Data != null
    )
      this.Installment_Type = this.Installment_Type_Data[0];



    if (
      this.MarkStatus_Type_Data != undefined &&
      this.MarkStatus_Type_Data != null
    )
      this.MarkStatus_Type = this.MarkStatus_Type_Data[0];


    if (
      this.Branch_Data != undefined &&
      this.Branch_Data != null
    )
      this.Offline_Branch_ = this.Branch_Data[0];




    if (
      this.Laptopdetails_Data != undefined &&
      this.Laptopdetails_Data != null
    )
      this.Laptopdetails_ = this.Laptopdetails_Data[0];
    this.Hostel_Fees_Details_Data = [];
    this.Hostel_Fees_Master_Data = [];
    this.Hostel_Fees_Master_Data_t = [];
    this.Hostel_Fees_details_.Hostel_Fees_Details_Id = 0;
    this.Hostel_Fees_details_.Date = new Date();
    this.Hostel_Fees_details_.Date = this.New_Date(this.Hostel_Fees_details_.Date);
    this.Hostel_Fees_Master_.From_Date = new Date();
    this.Hostel_Fees_Master_.From_Date = this.New_Date(this.Hostel_Fees_Master_.From_Date);
    this.Hostel_Fees_Master_.To_Date = new Date();
    this.Hostel_Fees_Master_.To_Date = this.New_Date(this.Hostel_Fees_Master_.To_Date);
    this.Hostel_Fees_Master_.Duration = 0;
    this.Hostel_Fees_Master_.Per_Month_Amount = 0;
    this.Hostel_Fees_Master_.Total_Amount = 0;
    this.Hostel_Fees_Master_.Fees_Type_Id = 0;
    this.Hostel_Fees_Master_.Application_Fees = 0;
    this.Hostel_Fees_Master_.Security_Deposit = 0;
    this.Hostel_Fees_Master_.Food_Fees = 0;
    this.Hostel_Fees_Master_.Fees_Type_Name = "";
    this.Hostel_Fees_Master_.Hostel_Fees_Master_Id = 0;
    this.Hostel_Fees_details_.Amount = 0;
    this.Hostel_Fees_details_.Paid_Amount = 0;
    this.Hostel_Fees_details_.Status = 0;
    this.Hostel_Fees_details_.Balance_Amount = 0;
    this.Student_Course_.Reading = 0;
    this.Student_Course_.Writing = 0;
    this.Student_Course_.Speaking = 0;
    this.Student_Course_.Listening = 0;
    this.Student_Course_.Grammer = 0;
    this.Student_Course_.TotalMark = 0;
    this.Receipt_Voucher_.Fees_Type_Id = 0;
    this.Student_Course_.Exam_Date_Check = false;
  }




  Change_Course() {
     
    // this.Clr_Student_Course();
    // this.profile_View = false;
    // this.Documents_View=false;
    // this.Course_View = true;
    // this.Fees_View = false;
    // this.Remark_View = false
    // this.ExamLevelGraph_View = false;
    // this.ExamGraph_View=false;
    // this.Course_Details_View = false;
    // this.Resume_Sending_View = false;

    // this.application_details_View =false;
    // this.Applicationmodal_View=false;
    // this.Feesmodal_View = false;
    // this.Fee_Collection_View = false;
    // this.History_View = false;
    this.Change_Level_Data = true;



  }









  Course_Change() {
    // this.Student_Course_.Entry_Date = new Date();
    // this.Student_Course_.Entry_Date = this.New_Date(
    // this.Student_Course_.Entry_Date
    // );
    this.Student_Course_.Course_Name_Details = "";
    this.Student_Course_.Agent_Amount = 0;
    this.Student_Course_.Total_Fees = 0;
    this.Student_Course_.Course_Type_Id = 0;
    this.Student_Course_.Course_Type_Name = "";
    this.Student_Course_.Entry_Date = null;
    this.Student_Course_.Start_Date = null;
    // this.Student_Course_.Start_Date = new Date();
    // this.Student_Course_.Start_Date = this.New_Date(
    // this.Student_Course_.Start_Date
    // );


    // this.Student_Course_.End_Date = new Date();
    // this.Student_Course_.End_Date = this.New_Date(
    // this.Student_Course_.End_Date
    // );

    // this.Student_Course_.Join_Date = null;
    this.Student_Course_.End_Date = null;
    this.Student_Course_.End_Date_L = null;
    // this.Student_Course_.Join_Date = new Date();
    // this.Student_Course_.Join_Date = this.New_Date(
    // this.Student_Course_.Join_Date
    // );


    this.Student_Course_.By_User_Id = 0;
    this.Student_Course_.Status = 0;
    this.Student_Course_.Installment_Type_Id = 0;
    this.Student_Course_.No_Of_Installment = 0;
    // this.Student_Course_.Duration = 0;
    this.Student_Course_.Revision_Duration = 0;
    this.Batch_ = new Batch();
    this.Faculty_ = new Users();
    this.Student_Fees_Installment_Master_Data = [];
    this.Student_Course_Subject_Data = [];
    if (
      this.Installment_Type_Data != undefined &&
      this.Installment_Type_Data != null
    )
      this.Installment_Type = this.Installment_Type_Data[0];
    //  
    // this.Duration_Change();

  }
  Search_Course_Typeahead(event: any) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value;
    if (this.Course_Data == undefined || this.Course_Data.length == 0) {
      this.issLoading = true;
      this.Student_Service_.Search_Course_Typeahead("").subscribe(
        (Rows) => {
          if (Rows != null) {
            this.Course_Data = Rows[0];
            this.issLoading = false;

            this.Course_Data_Filter = [];

            for (var i = 0; i < this.Course_Data.length; i++) {
              if (this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
                this.Course_Data_Filter.push(this.Course_Data[i]);
            }
          }
        },
        (Rows) => {
          this.issLoading = false;
        }
      );
    } else {
      this.Course_Data_Filter = [];
      for (var i = 0; i < this.Course_Data.length; i++) {
        if (this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
          this.Course_Data_Filter.push(this.Course_Data[i]);
      }
    }
  }
  display_Course(Course_: Course) {
    if (Course_) {
      return Course_.Course_Name;
    }
  }

  Search_Batch_Typeahead(event: any) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value;
    if (this.Batch_Data == undefined || this.Batch_Data.length == 0) {
      this.issLoading = true;
      this.Student_Service_.Search_Batch_Typeahead("").subscribe(
        (Rows) => {
          if (Rows != null) {
            this.Batch_Data = Rows[0];
            this.issLoading = false;
            this.Batch_Data_Filter = [];

            for (var i = 0; i < this.Batch_Data.length; i++) {
              if (this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
                this.Batch_Data_Filter.push(this.Batch_Data[i]);
            }
          }
        },
        (Rows) => {
          this.issLoading = false;
        }
      );
    } else {
      this.Batch_Data_Filter = [];
      for (var i = 0; i < this.Batch_Data.length; i++) {
        if (this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
          this.Batch_Data_Filter.push(this.Batch_Data[i]);
      }
    }
  }
  display_Batch(Batch_: Batch) {
    if (Batch_) {
      return Batch_.Batch_Name;
    }
  }
  Get_Course_Student(Course_Temp: Course) {
     
    this.Course_Id_Edit = Course_Temp.Course_Id;
    this.Student_Course_.Duration = (Course_Temp.Duration);
    this.Student_Service_.Get_Course_Student(Course_Temp.Course_Id).subscribe(
      (Rows) => {
        this.Student_Course_Data = Rows[0];
        this.Student_Course_.Agent_Amount =
          this.Student_Course_Data[0].Agent_Amount;
        this.Student_Course_.Total_Fees =
          this.Student_Course_Data[0].Total_Fees;
        this.Student_Course_.Course_Type_Id =
          this.Student_Course_Data[0].Course_Type_Id;
        this.Student_Course_.Course_Type_Name =
          this.Student_Course_Data[0].Course_Type_Name;
        this.Student_Course_.Entry_Date =
          this.Student_Course_Data[0].Entry_Date;
        // this.Student_Course_.Start_Date =this.Student_Course_Data[0].Start_Date;
        // this.Student_Course_.End_Date = this.Student_Course_Data[0].End_Date;
        // this.Student_Course_.Join_Date = this.Student_Course_Data[0].Join_Date;

        if (
          this.Student_Course_.Entry_Date == null ||
          this.Student_Course_.Entry_Date == undefined
        ) {
          this.Student_Course_.Entry_Date = new Date();
          this.Student_Course_.Entry_Date = this.New_Date(
            this.Student_Course_.Entry_Date
          );
        }
        // if (
        // this.Student_Course_.Start_Date == null ||
        // this.Student_Course_.Start_Date == undefined
        // ) {
        // this.Student_Course_.Start_Date = new Date();
        // //this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
        // }
        // if (
        // this.Student_Course_.End_Date == null ||
        // this.Student_Course_.End_Date == undefined
        // ) {
        // this.Student_Course_.End_Date = new Date();
        // this.Student_Course_.End_Date = this.New_Date(
        // this.Student_Course_.End_Date
        // );
        // }
        // if (
        // this.Student_Course_.Join_Date == null ||
        // this.Student_Course_.Join_Date == undefined
        // ) {
        // this.Student_Course_.Join_Date = new Date();
        // this.Student_Course_.Join_Date = this.New_Date(
        // this.Student_Course_.Join_Date
        // );


        // }

        this.Student_Course_Subject_Data = Rows[1];
        this.date_Temp = this.Student_Course_.Start_Date;
        // this.Student_Fees_Installment_Master_Data = Rows[2];
        // for (var i = 0; i < this.Student_Fees_Installment_Master_Data.length;i++)
        // {
        // this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details=[]
        // for (var j = 0; j < this.Student_Course_.No_Of_Installment; j++)
        // {

        //    var A=this.date_Temp.getDate();
        //    this.date_Temp.setDate( A + this.Student_Fees_Installment_Master_Data[i].Instalment_Period );
        //     this.Student_Fees_Installment_Details_ = new Student_Fees_Installment_Details()
        //     this.Student_Fees_Installment_Details_.Fees_Amount=this.Student_Fees_Installment_Master_Data[i].Amount/this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment;
        //     this.Student_Fees_Installment_Details_.Fees_Amount = Number(this.Student_Fees_Installment_Details_.Fees_Amount.toFixed(2));
        //     this.Student_Fees_Installment_Details_.Tax_Percentage =
        //     this.Student_Fees_Installment_Details_.Fees_Amount * this.Student_Fees_Installment_Master_Data[i].Tax/100
        //    // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);

        //    this.Student_Fees_Installment_Details_.Tax_Percentage = Number(this.Student_Fees_Installment_Details_.Tax_Percentage.toFixed(2));
        //    this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(new Date(moment(this.date_Temp).format('YYYY-MM-DD')));

        //     // this.Student_Fees_Installment_Details_.Instalment_Date=new Date();
        //     // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);
        //     this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details.push(Object.assign({}, this.Student_Fees_Installment_Details_));
        // }
        // }
        // for (var j = 0; j < this.Student_Course_.No_Of_Installment; j++)
        // {

        //    var A=this.date_Temp.getDate();
        //    this.date_Temp.setDate( A + this.Student_Course_.Duration );
        //     this.Student_Fees_Installment_Details_ = new Student_Fees_Installment_Details()
        //     this.Student_Fees_Installment_Details_.Fees_Amount=this.Student_Course_.Agent_Amount/this.Student_Course_.No_Of_Installment;
        //     this.Student_Fees_Installment_Details_.Fees_Amount = Number(this.Student_Fees_Installment_Details_.Fees_Amount.toFixed(2));
        //     this.Student_Fees_Installment_Details_.Tax_Percentage =
        //     this.Student_Fees_Installment_Details_.Fees_Amount
        //    // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);

        //    this.Student_Fees_Installment_Details_.Tax_Percentage = Number(this.Student_Fees_Installment_Details_.Tax_Percentage.toFixed(2));
        //    this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(new Date(moment(this.date_Temp).format('YYYY-MM-DD')));

        //     // this.Student_Fees_Installment_Details_.Instalment_Date=new Date();
        //     // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);
        //     this.Student_Fees_Installment_Master_.Student_Fees_Installment_Details.push(Object.assign({}, this.Student_Fees_Installment_Details_));
        // }
        this.Student_Course_.Start_Date = this.New_Date(
          this.Student_Course_.Start_Date
        );
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




  Get_Student_Course_Click(Student_Id, Student_Course_Id, Course_Id) { 
    this.Clr_Student_Course();

     

    this.Old_Course_Id = Course_Id;
    this.Course_Id_Edit = Course_Id;
    this.profile_View = false;
    this.Documents_View = false;
    this.Course_View = true;
    this.Fees_View = false;
    this.Remark_View = false
    
    this.Process_View=false;
    this.Resumesending_View = false;
    this.Interview_View = false;
    this.Placement_View = false;

    this.Course_Details_View = false;
    this.Resume_Sending_View = false;
    this.Course_Tab = true;
    this.clickview = true;
    this.level_tab_view = true;

     
    if (this.Student_Course_Click_Data.length >= 2) { this.backbutton_view = true; }

    this.Student_Course_.End_Date_Check = false;


     
    this.Student_Service_.Get_Student_Course_Click(
      Student_Id,
      Student_Course_Id, Course_Id,

    ).subscribe(
      (Rows) => {
         
        this.Student_Course_Data = Rows[0];
        this.Branch_Course_Data = Rows[3];
        if (this.Student_Course_Data.length > 0) {
          this.Student_Course_ = this.Student_Course_Data[0];

          this.Course_Temp.Course_Id = this.Student_Course_.Course_Id;
          this.Course_Temp.Course_Name = this.Student_Course_.Course_Name;
          this.course_name = this.Student_Course_.Course_Name;
          this.Course_ = Object.assign(this.Course_Temp);

          this.Batch_Temp.Batch_Id = this.Student_Course_.Batch_Id;
          this.Batch_Temp.Batch_Name = this.Student_Course_.Batch_Name;
          this.Batch_ = Object.assign(this.Batch_Temp);

          this.Faculty_Temp.Users_Id = this.Student_Course_.Faculty_Id;
          this.Faculty_Temp.Users_Name = this.Student_Course_.Faculty_Name;
          this.Faculty_ = Object.assign(this.Faculty_Temp);

          for (var i = 0; i < this.Installment_Type_Data.length; i++) {
            if (
              this.Student_Course_.Installment_Type_Id ==
              this.Installment_Type_Data[i].Installment_Type_Id
            )
              this.Installment_Type = this.Installment_Type_Data[i];
          }


          for (var i = 0; i < this.MarkStatus_Type_Data.length; i++) {
            if (
              this.Student_Course_.Markstatus_Id ==
              this.MarkStatus_Type_Data[i].Markstatus_Id
            )
              this.MarkStatus_Type = this.MarkStatus_Type_Data[i];
          }


          for (var i = 0; i < this.Laptopdetails_Data.length; i++) {
            if (
              this.Student_Course_.Laptop_details_Id ==
              this.Laptopdetails_Data[i].Laptop_details_Id
            )
              this.Laptopdetails_ = this.Laptopdetails_Data[i];
          }



          this.Course_Id_Edit = this.Student_Course_.Course_Id;
          this.Student_Course_Id_Edit = this.Student_Course_.Student_Course_Id;
        }

         
        for (var i = 0; i < this.Branch_Data.length; i++) {
          if (
            this.Branch_Course_Data[0].Offline_Branch_Id ==
            this.Branch_Data[i].Agent_Id
          )
            this.Offline_Branch_ = this.Branch_Data[i];
        }



         
        if (this.Student_Course_.End_Date == null) {
          this.Student_Course_.End_Date_Check = false;
        }
        else {
          this.Student_Course_.End_Date_Check = true;
        }

         
        if (this.Student_Course_.Exam_Date == null) {
          this.Student_Course_.Exam_Date_Check = false;
        }
        else {
          this.Student_Course_.Exam_Date_Check = true;
        }
        this.Student_Course_Subject_Data = Rows[1];

        this.Student_Fees_Installment_Save_Data = Rows[2];


        this.Student_Fees_Installment_Details_Data = Rows[2];

         
        // if (this.Student_Fees_Installment_Details_Data[0].Is_Processing==1)
        // {
        // this.Student_Course_.Is_Processing_commision=true;
        // }
        // else
        // {
        // this.Student_Course_.Is_Processing_commision=false;
        // }

        //  

        // if (this.Student_Fees_Installment_Details_Data[0].Is_Associate==1)
        // {
        // this.Student_Course_.Is_Associate_commision=true;
        // }
        // else
        // {
        // this.Student_Course_.Is_Associate_commision=false;
        // }




        this.Hostel_Fees_Master_ = Object.assign({}, Rows[3][0]);
        this.Hostel_Fees_Details_Data = Rows[4];
        var Student_Fees_Installment_Master_Id = 0;
        var Student_Fees_Installment_Master_Id_temp = 0;
        var Student_Fees_Installment_Master_Index = -1;
        this.Student_Fees_Installment_Master_Data = [];
        this.Student_Fees_Installment_Details_Data = [];

        // for ( var i = 0;i < this.Hostel_Fees_Details_Data.length;i++) {

        //   // this.Hostel_Fees_Master_Temp =new Hostel_Fees_Master();
        //   this.Hostel_Fees_details_.Paid_Amount = this.Hostel_Fees_Details_Data[i].Paid_Amount;
        //   this.Hostel_Fees_details_.Balance_Amount = this.Hostel_Fees_Details_Data[i].Balance_Amount;
        //   this.Hostel_Fees_details_.Amount = this.Hostel_Fees_Details_Data[i].Amount;
        //   this.Hostel_Fees_details_.Date = this.Hostel_Fees_Details_Data[i].Date;
        //   }
        for (
          var i = 0;
          i < this.Student_Fees_Installment_Save_Data.length;
          i++
        ) {
          Student_Fees_Installment_Master_Id_temp =
            this.Student_Fees_Installment_Save_Data[i]
              .Student_Fees_Installment_Master_Id;
          if (
            Student_Fees_Installment_Master_Id !=
            Student_Fees_Installment_Master_Id_temp
          ) {
            this.Student_Fees_Installment_Master_ =
              new Student_Fees_Installment_Master();
            this.Student_Fees_Installment_Master_.Amount =
              this.Student_Fees_Installment_Save_Data[i].Amount;
            this.Student_Fees_Installment_Master_.Tax =
              this.Student_Fees_Installment_Save_Data[i].Tax;
            this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id =
              this.Student_Fees_Installment_Save_Data[
                i
              ].Student_Fees_Installment_Master_Id;
            this.Student_Fees_Installment_Master_.Course_Fees_Id =
              this.Student_Fees_Installment_Save_Data[i].Course_Fees_Id;
            this.Student_Fees_Installment_Master_.Fees_Type_Id =
              this.Student_Fees_Installment_Save_Data[i].Fees_Type_Id;
            this.Student_Fees_Installment_Master_.Fees_Type_Name =
              this.Student_Fees_Installment_Save_Data[i].Fees_Type_Name;
            this.Student_Fees_Installment_Master_.No_Of_Instalment =
              this.Student_Fees_Installment_Save_Data[i].No_Of_Instalment;
            this.Student_Fees_Installment_Master_.Instalment_Period =
              this.Student_Fees_Installment_Save_Data[i].Instalment_Period;
              this.Student_Fees_Installment_Details_Temp.Is_Associate =
              this.Student_Fees_Installment_Save_Data[i].Is_Associate;
              this.Student_Fees_Installment_Details_Temp. Is_Agent =
              this.Student_Fees_Installment_Save_Data[i]. Is_Agent;



            this.Fees_Master_Id =
              this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id;
            this.Student_Fees_Installment_Master_Data.push(
              Object.assign({}, this.Student_Fees_Installment_Master_)
            );
            Student_Fees_Installment_Master_Index =
              Student_Fees_Installment_Master_Index + 1;
            this.Student_Fees_Installment_Master_Data[
              Student_Fees_Installment_Master_Index
            ].Student_Fees_Installment_Details =
              this.Student_Fees_Installment_Details_Data;

            this.Student_Fees_Installment_Details_Data = [];
            this.Student_Fees_Installment_Details_Temp =
              new Student_Fees_Installment_Details();
            this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id =
              this.Student_Fees_Installment_Save_Data[
                i
              ].Student_Fees_Installment_Details_Id;
            this.Student_Fees_Installment_Details_Temp.Instalment_Date =
              this.Student_Fees_Installment_Save_Data[i].Instalment_Date;
            this.Student_Fees_Installment_Details_Temp.Fees_Amount =
              this.Student_Fees_Installment_Save_Data[i].Fees_Amount;
              this.Student_Fees_Installment_Details_Temp.Is_Associate =
              this.Student_Fees_Installment_Save_Data[i].Is_Associate;

              this.Student_Fees_Installment_Details_Temp. Is_Agent =
              this.Student_Fees_Installment_Save_Data[i]. Is_Agent;

            this.Student_Fees_Installment_Details_Temp.Balance_Amount =
              this.Student_Fees_Installment_Save_Data[i].Balance_Amount;
            this.Student_Fees_Installment_Details_Temp.Status =
              this.Student_Fees_Installment_Save_Data[i].Status;
            this.Student_Fees_Installment_Details_Temp.Tax_Percentage = 18;
            // this.Student_Fees_Installment_Save_Data[i].Tax_Percentage

            this.Student_Fees_Installment_Details_Data.push(
              Object.assign({}, this.Student_Fees_Installment_Details_Temp)
            );
            this.Student_Fees_Installment_Master_Data[
              Student_Fees_Installment_Master_Index
            ].Student_Fees_Installment_Details =
              this.Student_Fees_Installment_Details_Data;
          } else {
            this.Student_Fees_Installment_Details_Temp =
              new Student_Fees_Installment_Details();
            this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id =
              this.Student_Fees_Installment_Save_Data[
                i
              ].Student_Fees_Installment_Details_Id;
            this.Student_Fees_Installment_Details_Temp.Instalment_Date =
              this.Student_Fees_Installment_Save_Data[i].Instalment_Date;
            this.Student_Fees_Installment_Details_Temp.Fees_Amount =
              this.Student_Fees_Installment_Save_Data[i].Fees_Amount;
            this.Student_Fees_Installment_Details_Temp.Balance_Amount =
              this.Student_Fees_Installment_Save_Data[i].Balance_Amount;
              this.Student_Fees_Installment_Details_Temp.Is_Associate =
              this.Student_Fees_Installment_Save_Data[i].Is_Associate;
              this.Student_Fees_Installment_Details_Temp. Is_Agent =
              this.Student_Fees_Installment_Save_Data[i]. Is_Agent;


            this.Student_Fees_Installment_Details_Temp.Status =
              this.Student_Fees_Installment_Save_Data[i].Status;
            this.Student_Fees_Installment_Details_Temp.Tax_Percentage = 18;
            // this.Student_Fees_Installment_Save_Data[i].Tax_Percentage
            this.Student_Fees_Installment_Details_Data.push(
              Object.assign({}, this.Student_Fees_Installment_Details_Temp)
            );
            this.Student_Fees_Installment_Master_Data[
              Student_Fees_Installment_Master_Index
            ].Student_Fees_Installment_Details =
              this.Student_Fees_Installment_Details_Data;
          }
          Student_Fees_Installment_Master_Id =
            this.Student_Fees_Installment_Save_Data[i]
              .Student_Fees_Installment_Master_Id;
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
  Get_Student_Course(Student_Id) {
    this.profile_View = false;
    this.Documents_View = false;
    this.Remark_View = false;
    
    this.Process_View=false;
    this.Student_Service_.Get_Student_Course(Student_Id).subscribe(
      (Rows) => {

        this.Student_Course_Data = Rows[0];

        if (this.Student_Course_Data.length > 0) {
          this.Student_Course_ = this.Student_Course_Data[0];

          this.Course_Temp.Course_Id = this.Student_Course_.Course_Id;
          this.Course_Temp.Course_Name = this.Student_Course_.Course_Name;
          this.course_name = this.Student_Course_.Course_Name;
          this.Course_ = Object.assign(this.Course_Temp);

          this.Batch_Temp.Batch_Id = this.Student_Course_.Batch_Id;
          this.Batch_Temp.Batch_Name = this.Student_Course_.Batch_Name;
          this.Batch_ = Object.assign(this.Batch_Temp);

          this.Faculty_Temp.Users_Id = this.Student_Course_.Faculty_Id;
          this.Faculty_Temp.Users_Name = this.Student_Course_.Faculty_Name;
          this.Faculty_ = Object.assign(this.Faculty_Temp);

          for (var i = 0; i < this.Installment_Type_Data.length; i++) {
            if (
              this.Student_Course_.Installment_Type_Id ==
              this.Installment_Type_Data[i].Installment_Type_Id
            )
              this.Installment_Type = this.Installment_Type_Data[i];
          }


          for (var i = 0; i < this.MarkStatus_Type_Data.length; i++) {
            if (
              this.Student_Course_.Markstatus_Id ==
              this.MarkStatus_Type_Data[i].Markstatus_Id
            )
              this.MarkStatus_Type = this.MarkStatus_Type_Data[i];
          }

          // this.Student_Course_.Exam_Date = this.New_Date(
          //   new Date(moment(this.Student_Course_.Exam_Date).format("YYYY-MM-DD")));

          this.Course_Id_Edit = this.Student_Course_.Course_Id;
          this.Student_Course_Id_Edit = this.Student_Course_.Student_Course_Id;

          this.Student_Course_Subject_Data = Rows[1];
          this.Student_Fees_Installment_Save_Data = Rows[2];
          var Student_Fees_Installment_Master_Id = 0;
          var Student_Fees_Installment_Master_Id_temp = 0;
          var Student_Fees_Installment_Master_Index = -1;
          this.Student_Fees_Installment_Master_Data = [];
          this.Student_Fees_Installment_Details_Data = [];

          // for(var i=0;i<this.Student_Fees_Installment_Save_Data.length;i++)
          // {
          //     Student_Fees_Installment_Master_Id_temp= this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
          //     if(Student_Fees_Installment_Master_Id!=Student_Fees_Installment_Master_Id_temp)
          //     {
          //         this.Student_Fees_Installment_Master_=new Student_Fees_Installment_Master()
          //         this.Student_Fees_Installment_Master_.Amount=this.Student_Fees_Installment_Save_Data[i].Amount
          //         this.Student_Fees_Installment_Master_.Tax=this.Student_Fees_Installment_Save_Data[i].Tax
          //         this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
          //         this.Student_Fees_Installment_Master_.Course_Fees_Id=this.Student_Fees_Installment_Save_Data[i].Course_Fees_Id
          //         this.Student_Fees_Installment_Master_.Fees_Type_Id=this.Student_Fees_Installment_Save_Data[i].Fees_Type_Id
          //         this.Student_Fees_Installment_Master_.Fees_Type_Name=this.Student_Fees_Installment_Save_Data[i].Fees_Type_Name
          //         this.Student_Fees_Installment_Master_.No_Of_Instalment=this.Student_Fees_Installment_Save_Data[i].No_Of_Instalment
          //         this.Student_Fees_Installment_Master_.Instalment_Period=this.Student_Fees_Installment_Save_Data[i].Instalment_Period
          //        this.Fees_Master_Id=this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id
          //         this.Student_Fees_Installment_Master_Data.push(Object.assign({},this.Student_Fees_Installment_Master_))
          //         Student_Fees_Installment_Master_Index=Student_Fees_Installment_Master_Index+1;
          //         this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;

          //         this.Student_Fees_Installment_Details_Data=[];
          //         this.Student_Fees_Installment_Details_Temp=new Student_Fees_Installment_Details();
          //         this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Details_Id
          //         this.Student_Fees_Installment_Details_Temp.Instalment_Date=this.Student_Fees_Installment_Save_Data[i].Instalment_Date
          //         this.Student_Fees_Installment_Details_Temp.Fees_Amount=this.Student_Fees_Installment_Save_Data[i].Fees_Amount
          //         this.Student_Fees_Installment_Details_Temp.Balance_Amount=this.Student_Fees_Installment_Save_Data[i].Balance_Amount
          //         this.Student_Fees_Installment_Details_Temp.Status=this.Student_Fees_Installment_Save_Data[i].Status
          //         this.Student_Fees_Installment_Details_Temp.Tax_Percentage=18;

          //          this.Student_Fees_Installment_Details_Data.push(Object.assign({},this.Student_Fees_Installment_Details_Temp))
          //         this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;
          //     }
          //     else
          //     {

          //         this.Student_Fees_Installment_Details_Temp=new Student_Fees_Installment_Details();
          //         this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Details_Id
          //         this.Student_Fees_Installment_Details_Temp.Instalment_Date=this.Student_Fees_Installment_Save_Data[i].Instalment_Date
          //         this.Student_Fees_Installment_Details_Temp.Fees_Amount=this.Student_Fees_Installment_Save_Data[i].Fees_Amount
          //         this.Student_Fees_Installment_Details_Temp.Balance_Amount=this.Student_Fees_Installment_Save_Data[i].Balance_Amount

          //         this.Student_Fees_Installment_Details_Temp.Status=this.Student_Fees_Installment_Save_Data[i].Status
          //         this.Student_Fees_Installment_Details_Temp.Tax_Percentage=18;

          //         this.Student_Fees_Installment_Details_Data.push(Object.assign({},this.Student_Fees_Installment_Details_Temp))
          //         this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;
          //     }
          //     Student_Fees_Installment_Master_Id= this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
          // }
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
  Hostel_Fees_Payment_Change() {
    ;

    var from = new Date(this.Hostel_Fees_Master_.From_Date);
    var to = new Date(this.Hostel_Fees_Master_.To_Date);
    var Duration = to.getMonth() - from.getMonth()
      + (12 * (to.getFullYear() - from.getFullYear()));
    // var Days = Time / (1000 * 3600 * 24); 	
    Duration = Duration + 1;

    this.Hostel_Fees_Master_.Duration = Duration;
    //this.date_Temp=this.New_Date(new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD'))) ;
    this.Hostel_Fees_Master_Data = [];
    this.Hostel_Fees_Master_Temp = new Hostel_Fees_Master();
    this.Hostel_Fees_Master_Temp.Fees_Type_Id = 2;
    this.Hostel_Fees_Master_Temp.Hostel_Fees_Details = [];
    this.Hostel_Fees_Master_Data.push(
      Object.assign({}, this.Hostel_Fees_Master_Temp)
    );
    this.date_Temp = this.Hostel_Fees_Master_.From_Date;
    this.Hostel_Fees_Details_Data = []
    this.Hostel_Fees_details_.Paid_Amount = 0;
    this.Hostel_Fees_details_.Status = 1;
    this.Hostel_Fees_details_.Hostel_Fees_Master_Id = this.Hostel_Fees_Master_.Hostel_Fees_Master_Id;
    this.Hostel_Fees_details_.Balance_Amount = this.Hostel_Fees_Master_.Per_Month_Amount;
    this.Hostel_Fees_details_.Amount = this.Hostel_Fees_Master_.Per_Month_Amount;
    this.Hostel_Fees_Master_.Total_Amount = Number(this.Hostel_Fees_Master_.Per_Month_Amount) * Number(Duration);






    for (var j = 0; j < Duration; j++) {

      this.Hostel_Fees_Details_Data.push(Object.assign({}, this.Hostel_Fees_details_));
      var D = this.Hostel_Fees_Master_.From_Date;
      // this.date_Temp = this.Add_Date_Hostel(new Date(moment(this.Hostel_Fees_Master_.From_Date).format("YYYY-MM-DD")),Number(j));

      this.date = new Date(D);
      //this.date=new Date();
      this.date.setDate(this.date.getDate());
      // console.log(this.date.setDate(this.date.getDate() + Number(j)))
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
      this.month = this.month + j + 1;
      // this.monthnew = this.date.getMonth() + days;

      this.day = this.date.getDate().toString();
      if (this.month > 12) {
        this.year = this.year + 1;
        this.month = this.month - 12;
      }
      if (this.month < 10) {
        this.month = "0" + this.month;
      }
      if (Number.parseInt(this.day) < 10) {
        this.day = "0" + this.day;
      }
      this.date = this.year + "-" + this.month + "-" + this.day;
      this.date_Temp = this.date;

      this.Hostel_Fees_Details_Data[j].Date = this.date_Temp;

    }
    // this.Get_Installment_Details();
  }
  Amount_Change() {
    this.Hostel_Fees_Master_.Total_Amount = Number(this.Hostel_Fees_Master_.Per_Month_Amount) * Number(this.Hostel_Fees_Master_.Duration);
  }
  Instalment_Change() {
    
    this.Student_Course_.No_Of_Installment =
      this.Installment_Type.No_Of_Installment;
    // this.Student_Course_.Duration = this.Installment_Type.Duration;
    //this.date_Temp=this.New_Date(new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD'))) ;
    this.Student_Fees_Installment_Master_Data = [];
    this.Student_Fees_Installment_Master_Temp = new Student_Fees_Installment_Master();
    this.Student_Fees_Installment_Master_Temp.Course_Fees_Id = 1;
    this.Student_Fees_Installment_Master_Temp.Fees_Type_Id = 1;
    this.Student_Fees_Installment_Master_Temp.Student_Fees_Installment_Details = [];

 
    
    this.Student_Fees_Installment_Master_Data.push(
      Object.assign({}, this.Student_Fees_Installment_Master_Temp)
    );
    this.date_Temp = this.Student_Course_.Start_Date;
    this.Get_Installment_Details();
    // this.Load_Instalmentfn();
  }

  Get_Installment_Details() {
     
    this.Student_Service_.Get_Installment_Details(
      this.Installment_Type.Installment_Type_Id,
      this.Course_Id_Edit
    ).subscribe(
      (Rows) => {
         
        if (Rows != null) {
          this.Student_Fees_Installment_Details_Data = Rows[0];
          this.date_Temp = new Date(
            moment(this.Student_Course_.Start_Date).format("YYYY-MM-DD")
          );

          for ( var j = 0; j < this.Student_Fees_Installment_Details_Data.length; j++ ) {
            this.date_Temp = this.Add_Date(
              new Date(
                moment(this.Student_Course_.Start_Date).format("YYYY-MM-DD")
              ),
              Number(
                this.Student_Fees_Installment_Details_Data[j].Instalment_Period
              )
            );
            this.Student_Fees_Installment_Details_Data[j].Instalment_Date = this.date_Temp;
         
        // this.Is_Associate= Number( this.Student_Fees_Installment_Details_Data[j].Is_Associate ) 
        
        
        
          }

          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }

  Feesinstallment_change() { }

  Save_Student_Course() {
    debugger
     
    if (this.Course_ == undefined || this.Course_ == null) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Course", Type: "3" },
      });
      return;
    }
    if (
      this.Course_.Course_Id == null ||
      this.Course_.Course_Id == undefined ||
      this.Course_.Course_Id == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Course", Type: "3" },
      });
      return;
    }
    if (this.Batch_ == undefined || this.Batch_ == null ||this.Batch_.Batch_Id == null ||
      this.Batch_.Batch_Id == undefined ||
      this.Batch_.Batch_Id == 0) {
      // const dialogRef = this.dialogBox.open(DialogBox_Component, {
      //   panelClass: "Dialogbox-Class",
      //   data: { Message: "Select Batch", Type: "3" },
      // });
      // return;
      console.log(' this.Batch_: ',  this.Batch_);
      this.Batch_['Batch_Id']=0
      this.Batch_['Batch_Name']=''

    }


    // if (
    //   this.Laptopdetails_.Laptop_details_Id == null ||
    //   this.Laptopdetails_.Laptop_details_Id == undefined ||
    //   this.Laptopdetails_.Laptop_details_Id == 0
    //   ) {
    //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
    //   panelClass: "Dialogbox-Class",
    //   data: { Message: "Select Lapdetails", Type: "3" },
    //   });
    //   return;
    //   }




    // if (
    //   this.Batch_.Batch_Id == null ||
    //   this.Batch_.Batch_Id == undefined ||
    //   this.Batch_.Batch_Id == 0
    // ) {
    //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
    //     panelClass: "Dialogbox-Class",
    //     data: { Message: "Select Batch", Type: "3" },
    //   });
    //   return;
    // }
    if (this.Faculty_ == undefined || this.Faculty_ == null || this.Faculty_.Users_Id == null ||
      this.Faculty_.Users_Id == undefined ||
      this.Faculty_.Users_Id == 0) {
      // const dialogRef = this.dialogBox.open(DialogBox_Component, {
      //   panelClass: "Dialogbox-Class",
      //   data: { Message: "Select Faculty", Type: "3" },
      // });
      // return;
      this.Faculty_['Users_Id']=0
      this.Faculty_['Users_Name']=''
    }
    // if (
    //   this.Faculty_.Users_Id == null ||
    //   this.Faculty_.Users_Id == undefined ||
    //   this.Faculty_.Users_Id == 0
    // ) {
    //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
    //     panelClass: "Dialogbox-Class",
    //     data: { Message: "Select Faculty", Type: "3" },
    //   });
    //   return;
    // }
    if (this.Installment_Type == undefined || this.Installment_Type == null) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Installment Type", Type: "3" },
      });
      return;
    }
    if (
      this.Installment_Type.Installment_Type_Id == null ||
      this.Installment_Type.Installment_Type_Id == undefined ||
      this.Installment_Type.Installment_Type_Id == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Installment Type", Type: "3" },
      });
      return;
    }

    // if(this.Student_Course_.Join_Date==undefined){
    //   const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Join Date', Type: "3" } });
    //   return;
    // }



    if (this.Student_Course_.Start_Date == undefined) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Start Date', Type: "3" } });
      return;
    }

    // if (
    //   this.Offline_Branch_ == undefined ||
    //   this.Offline_Branch_ == null ||
    //   this.Offline_Branch_.Agent_Id == undefined ||
    //   this.Offline_Branch_.Agent_Id == 0
    // ) {
    //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
    //     panelClass: "Dialogbox-Class",
    //     data: { Message: "Select Offline Branch", Type: "3" },
    //   });
    //   return;
    // }

    // if(this.Student_Course_.End_Date==undefined ||  this.Student_Course_.End_Date == null ){
    //   const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose End Date', Type: "3" } });
    //   return;
    // }


    if (
      this.Student_Course_.End_Date_Check == true &&
      this.Student_Course_.End_Date == null

    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Choose End Date", Type: "3" },
      });
      return;
    }




    var Enddate_Status = 0;
    if (Boolean(this.Student_Course_.End_Date_Check) == true)
      Enddate_Status = 1;

    this.Student_Course_.End_Date = this.New_Date(
      new Date(moment(this.Student_Course_.End_Date).format("YYYY-MM-DD"))
    );


    if (
      this.Student_Course_.End_Date == undefined ||
      this.Student_Course_.End_Date == null ||
      this.Student_Course_.End_Date == "NaN-NaN-NaN" ||
      this.Student_Course_.End_Date == ""
    ) {
      this.Student_Course_.End_Date = null;
    }

    else
      this.Student_Course_.End_Date = this.New_Date(
        new Date(moment(this.Student_Course_.End_Date).format("YYYY-MM-DD"))
      );




     
    if (
      this.Student_Course_.Exam_Date_Check == true
      && this.Student_Course_.Exam_Date == null

    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Choose Exam Date", Type: "3" },
      });
      return;
    }
     
    // var  Student_Course_.Is_Processing_=0 ;    

    debugger

    if (this.Student_Course_.Is_Processing_commision == true)
      this.Student_Course_.Is_Processing_ = 1;
    else
      this.Student_Course_.Is_Processing_ = 0;

    if (this.Student_Course_.Is_Associate_commision == true)
      this.Student_Course_.Is_Associate_ = 1;
    else
      this.Student_Course_.Is_Associate_ = 0;

    var Examdate_Status = 0;
    if (Boolean(this.Student_Course_.Exam_Date_Check) == true)
      Examdate_Status = 1;

    this.Student_Course_.Exam_Date = this.New_Date(
      new Date(moment(this.Student_Course_.Exam_Date).format("YYYY-MM-DD"))
    );


    if (
      this.Student_Course_.Exam_Date == undefined ||
      this.Student_Course_.Exam_Date == null ||
      this.Student_Course_.Exam_Date == "NaN-NaN-NaN" ||
      this.Student_Course_.Exam_Date == ""
    ) {
      this.Student_Course_.Exam_Date = null;
    }

    else
      this.Student_Course_.Exam_Date = this.New_Date(
        new Date(moment(this.Student_Course_.Exam_Date).format("YYYY-MM-DD"))
      );






    if (
      this.Student_Course_.No_Of_Installment == null ||
      this.Student_Course_.No_Of_Installment == undefined ||
      this.Student_Course_.No_Of_Installment == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Enter No Of Installment", Type: "3" },
      });
      return;
    }

    var temp_Student_Fees_Installment_Master_Id = 0;
    //  if(this.Student_Fees_Installment_Save_Data==undefined)
    this.Student_Fees_Installment_Save_Data = [];
 
    for (
      var i = 0;
      i < Number(this.Student_Fees_Installment_Master_Data.length);
      i++
    ) {
      this.Student_Fees_Installment_Save_Temp =
        new Student_Fees_Installment_Save();

      this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id =
        i;
      this.Student_Fees_Installment_Save_Temp.Amount =
        this.Student_Fees_Installment_Master_Data[i].Amount;
      this.Student_Fees_Installment_Save_Temp.Tax =
        this.Student_Fees_Installment_Master_Data[i].Tax;
      this.Student_Fees_Installment_Save_Temp.Course_Fees_Id =
        this.Student_Fees_Installment_Master_Data[i].Course_Fees_Id;
      this.Student_Fees_Installment_Save_Temp.Fees_Type_Id =
        this.Student_Fees_Installment_Master_Data[i].Fees_Type_Id;
      this.Student_Fees_Installment_Save_Temp.Fees_Type_Name =
        this.Student_Fees_Installment_Master_Data[i].Fees_Type_Name;
      this.Student_Fees_Installment_Save_Temp.No_Of_Instalment =
        this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment;
      this.Student_Fees_Installment_Save_Temp.Instalment_Period =
        this.Student_Fees_Installment_Master_Data[i].Instalment_Period;

        
      

      // this.Student_Course_.Laptop_details_Id=this.Laptopdetails_.Laptop_details_Id;
      // this.Student_Course_.Laptop_details_Name=this.Laptopdetails_.Laptop_details_Name;



      //   this.Student_Fees_Installment_Save_Temp.Delivery_Date=this.New_Date(new Date(moment(this.Student_Fees_Installment_Master_Data[i].Delivery_Date).format('YYYY-MM-DD')));
      this.Student_Fees_Installment_Save_Data.push(
        Object.assign({}, this.Student_Fees_Installment_Save_Temp)
      );
       
      for (var j = 0; j < Number(this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details.length); j++) {
        this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id = i;
        this.Student_Fees_Installment_Save_Temp.Instalment_Date = this.New_Date(
          new Date(
            moment(
              this.Student_Fees_Installment_Master_Data[i]
                .Student_Fees_Installment_Details[j].Instalment_Date
            ).format("YYYY-MM-DD")
          )
        );
        this.Student_Fees_Installment_Save_Temp.Fees_Amount =
          this.Student_Fees_Installment_Master_Data[
            i
          ].Student_Fees_Installment_Details[j].Fees_Amount;
        this.Student_Fees_Installment_Save_Temp.Tax_Percentage = 18;
        //    this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details[j].Tax_Percentage
        this.Student_Fees_Installment_Save_Data.push(
          Object.assign({}, this.Student_Fees_Installment_Save_Temp)
        );
      }
    }

    if (this.Student_Fees_Installment_Save_Data.length == 0) {
      this.Student_Fees_Installment_Save_Temp =
        new Student_Fees_Installment_Save();
      this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id =
        -1;
      this.Student_Fees_Installment_Save_Data.push(
        Object.assign({}, this.Student_Fees_Installment_Save_Temp)
      );
    }
    debugger
// this.Get_Installment_Details();
    for (var i = 0; i < this.Student_Fees_Installment_Details_Data.length; i++)
    // {
      this.Student_Fees_Installment_Details_Data[i].Instalment_Date =
        this.New_Date(
          new Date(
            moment(
              this.Student_Fees_Installment_Details_Data[i].Instalment_Date
            ).format("YYYY-MM-DD")
          )
        );
        



        debugger
        for (var i = 0; i < this.Student_Fees_Installment_Details_Data.length;i++)
        {
          if(this.Student_Fees_Installment_Details_Data[i].Is_Associate == null||this.Student_Fees_Installment_Details_Data[i].Is_Associate == undefined)
          {
            this.Student_Fees_Installment_Details_Data[i].Is_Associate = 0
          }
        }
        
        
           
        for (var i = 0; i < this.Student_Fees_Installment_Details_Data.length; i++)
        {
          if(this.Student_Fees_Installment_Details_Data[i].Is_Agent == null||this.Student_Fees_Installment_Details_Data[i].Is_Agent == undefined)
          {
            this.Student_Fees_Installment_Details_Data[i].Is_Agent =0
          }
        }




      // this.Student_Fees_Installment_Details_Data[i].Course_Fees_Id =
      // this.Student_Fees_Installment_Details_Data[i].Course_Fees_Id;
      //       }
     
    if (this.MarkStatus_Type.Markstatus_Id == 0 || this.MarkStatus_Type.Markstatus_Id == undefined || this.MarkStatus_Type.Markstatus_Id == null) {
      this.Student_Course_.Markstatus_Id = 0;
      this.Student_Course_.Markstatus_Name = '';
    } else {
      this.Student_Course_.Markstatus_Id = this.MarkStatus_Type.Markstatus_Id;
      this.Student_Course_.Markstatus_Name = this.MarkStatus_Type.Markstatus_Name;
    }
    this.Student_Course_.Student_Fees_Installment_Details =
      this.Student_Fees_Installment_Details_Data;

    // this.Student_Course_.Student_Id = this.Student_Id;

    this.Student_Course_.Student_Id = this.Student_.Student_Id;

    this.Student_Course_.Is_Processing_ = this.Student_Course_.Is_Processing_;
    this.Student_Course_.Is_Associate_ = this.Student_Course_.Is_Associate_;





    //this.Student_Course_.Old_Course_Id = this.Course_.Course_Id;
    this.Student_Course_.Course_Id = this.Course_.Course_Id;
    this.Student_Course_.Course_Name = this.Course_.Course_Name;
    this.Student_Course_.Batch_Id = this.Batch_.Batch_Id;
    this.Student_Course_.Batch_Name = this.Batch_.Batch_Name;
    this.Student_Course_.Faculty_Id = this.Faculty_.Users_Id;

    // this.Student_Course_.Offline_Branch_Id = this.Offline_Branch_.Agent_Id;
    // this.Student_Course_.Offline_Branch = this.Offline_Branch_.Agent_Name;
      this.Student_Course_.Offline_Branch_Id = 0;
    this.Student_Course_.Offline_Branch = '';

    this.Student_Course_.Installment_Type_Id =
      this.Installment_Type.Installment_Type_Id;
    this.Student_Course_.By_User_Id = Number(this.Login_User);
    this.Student_Course_.Student_Course_Subject =
      this.Student_Course_Subject_Data;
    // this.Student_Course_.Student_Fees_Installment_Master = this.Student_Fees_Installment_Master_Data;

    if (this.Save_Call_Status == true) return;
    else this.Save_Call_Status = true;

    this.issLoading = true;
    this.Student_Course_.Entry_Date = this.New_Date(
      new Date(moment(this.Student_Course_.Entry_Date).format("YYYY-MM-DD"))
    );
    this.Student_Course_.Start_Date = this.New_Date(
      new Date(moment(this.Student_Course_.Start_Date).format("YYYY-MM-DD"))
    );
    // this.Student_Course_.Join_Date = this.New_Date(
    // new Date(moment(this.Student_Course_.Join_Date).format("YYYY-MM-DD"))
    // );


    //  
    // this.Student_Course_.End_Date = this.New_Date(
    // new Date(moment(this.Student_Course_.End_Date).format("YYYY-MM-DD"))
    // );




    // if(this.Student_Course_.Exam_Date_Check==true)



    // this.Student_Course_.Exam_Date = this.New_Date(
    //   new Date(moment(this.Student_Course_.Exam_Date).format("YYYY-MM-DD"))
    //   );



    // if (
    //   this.Student_Course_.Exam_Date == undefined ||
    //   this.Student_Course_.Exam_Date == null ||
    //   this.Student_Course_.Exam_Date == "NaN" ||
    //   this.Student_Course_.Exam_Date == ""
    //   ) {
    //   this.Student_Course_.Exam_Date = "";
    //   } else
    //   this.Student_Course_.Exam_Date = this.New_Date(
    //   new Date(moment(this.Student_Course_.Exam_Date).format("YYYY-MM-DD"))
    //   );





    //  else if (this.Student_Course_.Exam_Date_Check==false)
    //  {
    //   this.Student_Course_.Exam_Date = this.New_Date(
    //     new Date(moment(this.Student_Course_.Exam_Date).format("YYYY-MM-DD"))
    //     );
    //  } 


    document.getElementById('Save_Button').hidden = true;
    debugger
    this.Student_Service_.Save_Student_Course(this.Student_Course_).subscribe(
      (Save_status) => {
        debugger
         
        if (Number(Save_status[0].Student_Course_Id_) > 0 || Number(Save_status[0].Master_Id_) > 0) {
          this.Save_Call_Status = false;



          // if (this.Student_Course_Id_Edit == 0) {
          // // if(this.Flag_Course==1 && this.Student_.Course_Id==0)

          // // {
          // //     Hi, {#var#}. Thank you for joining for Python {#var#} at One
          // // Team! We are really happy and excited to have you on board. Feel free to contact us on {#var#} for any support.

          // // var Sms='Hi, '+Save_status[0].Student_Name_+'.'+' Thank you for joining for '+Save_status[0].Course_Name_+
          // // ' at One Team! We are really happy and excited to have you on board. Feel free to contact us on '+this.User_Mobile+' for any support.';
          // // Hi, msg test. Thank you for joining for Software Testing at One Team! We are really happy and excited to have you on board. Feel free to contact us on 9567434151 for any support.

          // // var Sms1='Hi, '+Save_status[0].Student_Name_+'.'+' Thank you for joining for '+Save_status[0].Course_Name_+' at One Team! We are really happy and excited to have you on board. Feel free to contact us on '+this.User_Mobile+' for any support.';
          // // var course = Save_status[0].Course_Name_;

          // var Sms =
          // "Hi, " +
          // Save_status[0].Student_Name_ +
          // "." +
          // " Thank you for joining for " +
          // Save_status[0].Course_Name_ +
          // " at One Team! We are really happy and excited to have you on board. Feel free to contact us on " +
          // this.User_Mobile +
          // " for any support.";
          // //console.log(Sms);
          // // this.Student_Service_.Send_Sms(Save_status[0].Phone_,Sms).subscribe(Rows => {
          // //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Sms,Type:"false"}});
          // //
          // //     this.issLoading=false;
          // //     },
          // //     Rows =>
          // //     {
          // //         this.issLoading=false;
          // //         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
          // //         this.Save_Call_Status = false;
          // //     });
          // ;
          // this.Student_Service_.Send_course_Email(
          // Save_status[0].Phone_,
          // Save_status[0].Email_,
          // Sms,
          // Save_status[0].Student_Name_,
          // Save_status[0].Course_Name_
          // ).subscribe(
          // (Rows) => {


          // ;
          // const dialogRef = this.dialogBox.open(DialogBox_Component, {
          // panelClass: "Dialogbox-Class",
          // data: { Message: Sms, Type: "false" },
          // });

          // this.issLoading = false;
          // },
          // (Rows) => {
          // this.issLoading = false;
          // const dialogRef = this.dialogBox.open(DialogBox_Component, {
          // panelClass: "Dialogbox-Class",
          // data: { Message: "Error Occured", Type: "2" },
          // });
          // this.Save_Call_Status = false;
          // }
          // );

          // this.issLoading = false;
          // }
          // this.Close_Click();
          //this.Get_Student_Course(this.Student_Id);

          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved", Type: "false" },
          });
          //  this.Course_Details_View=false;
          // this.after_course_save();
          this.Search_Student();
          this.Total_Rows = this.Total_Rows - this.Student_Data.length;
          this.course_click();
          document.getElementById('Save_Button').hidden = false;
          // else this.coursedetails_Edit=false;
          this.Save_Call_Status = false;
        } else {
          this.Save_Call_Status = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },

          });
          document.getElementById('Save_Button').hidden = true;
        }

        this.issLoading = false;
      },
      (Rows) => {
        this.Save_Call_Status = false;
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: Rows.error.error, Type: "2" },
        });
      }
    );
  }

  // after_course_save()
  // {
  // 
  // for (var i = 0; i < this.Student_Fees_Installment_Details_Data.length; i++)
  // {
  // if(this.Student_Fees_Installment_Details_Data[i].Balance_Amount >0 )
  // this.Student_Fees_Installment_Details_Data[i].Status =0
  // }


  // }

  Fees_Tab_Click(Fees_Type_Id, Fees_Installment,Is_Associate,Is_Agent: any, index) {
 debugger
// console.log( Is_Associate);

    let top = document.getElementById("Topdiv");
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
debugger
    this.profile_View = false;
    this.Documents_View = false;
    this.Course_View = false;
    this.Mark_View = false;
    this.Fees_View = true;
    this.Remark_View = false
    
    this.Process_View=false;
    this.Hostel_View = false;
    this.ExamResult_View = false;
    this.Attendance_View = false;
    this.ExamGraph_View = false;
    this.Receipt_View = true;
    this.Receipt_Voucher_.Fees_Type_Id = Fees_Type_Id;
    this.Receipt_Voucher_.Student_Fees_Installment_Details_Id =  Fees_Installment.Student_Fees_Installment_Details_Id;

    if (Fees_Installment.Hostel_Fees_Details_Id == null || Fees_Installment.Hostel_Fees_Details_Id == undefined)
      this.Receipt_Voucher_.Hostel_Fees_Details_Id = 0;
    else this.Receipt_Voucher_.Hostel_Fees_Details_Id = Fees_Installment.Hostel_Fees_Details_Id
    this.Receipt_Voucher_.Amount = Fees_Installment.Balance_Amount;
     
    this.Receipt_Voucher_.Is_Associate =  Fees_Installment.Is_Associate;
    
    this.Receipt_Voucher_.Is_Agent =  Fees_Installment.Is_Agent;
debugger
    this.Receipt_Voucher_.Date = new Date();
    this.Receipt_Voucher_.Date = this.New_Date(this.Receipt_Voucher_.Date);

    // this.Receipt_Voucher_.Date ="";

debugger

if(Fees_Installment.Is_Agent==1){


if(this.Associates_Agent_!=null && this.Associates_Agent_!=undefined && this.Associates_Agent_.Client_Accounts_Id!=null  && this.Associates_Agent_.Client_Accounts_Id!=undefined && this.Associates_Agent_.Client_Accounts_Id!=0)
{
  this.Associates_Agent_Id_ =this.Student_.Associates_Agent_Id
  this.Associates_Agent_Commission_ =Number(this.Associates_Agent_.Commission_Percentage);
}
else
{
  this.Associates_Agent_Id_ =0;
  this.Associates_Agent_Commission_ =0;
}
}

else
{
  this.Associates_Agent_Id_ =0;
  this.Associates_Agent_Commission_ =0;
}

if(Fees_Installment.Is_Associate==1){

if(this.Processing_Agent_!=null && this.Processing_Agent_!=undefined && this.Processing_Agent_.Client_Accounts_Id!=null && this.Processing_Agent_.Client_Accounts_Id!=undefined && this.Processing_Agent_.Client_Accounts_Id!=0)
{
  this.Processing_Agent_Id_ =this.Student_.Processing_Agent_Id
  this.Processing_Agent_Commission_ =Number(this.Processing_Agent_.Commission_Percentage);
}
else
{
  this.Processing_Agent_Id_ =0;
  this.Processing_Agent_Commission_ =0;
}
}

else
{
  this.Processing_Agent_Id_ =0;
  this.Processing_Agent_Commission_ =0;
}
   
 

    
   

    this.Receipt_Voucher_.Tax_Percentage = 18;
    this.Installment_Index = index;
    this.Get_Receipt_History();
    //  this.Clr_Receipt_Voucher();
  }
  Search_Subject_Course_Typeahead(event: any) {
    var Value = "";
    if (event.target.value == "") Value = undefined;
    else Value = event.target.value;
    if (
      this.Course_Subject_Data == undefined ||
      this.Course_Subject_Data.length == 0
    ) {
      this.issLoading = true;
      this.Student_Service_.Search_Subject_Course_Typeahead(
        "",
        this.Course_Id_Edit
      ).subscribe(
        (Rows) => {
          if (Rows != null) {
            this.Course_Subject_Data = Rows[0];
            this.issLoading = false;
          }
        },
        (Rows) => {
          this.issLoading = false;
        }
      );
    }
  }
  display_Subject(Course_Subject: Course_Subject) {
    if (Course_Subject) {
      return Course_Subject.Subject_Name;
    }
  }
  Course_Subject_Click(Subject) {
    // this.Mark_List_ = Subject
    this.Mark_List_.Minimum_Mark = Subject.Minimum_Mark;
    this.Mark_List_.Maximum_Mark = Subject.Maximum_Mark;
  }
  Load_Exam_Status() {
    this.issLoading = true;
    this.Student_Service_.Load_Exam_Status().subscribe(
      (Rows) => {
        if (Rows != null) {
          this.Exam_Status_Data = Rows[0];
          this.Exam_Status_Temp.Exam_Status_Id = 0;
          this.Exam_Status_Temp.Exam_Status_Name = "Select";
          this.Exam_Status_Data.unshift(this.Exam_Status_Temp);
          this.Exam_Status_ = this.Exam_Status_Data[0];
          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }



  Load_Exam() {
    this.issLoading = true;
    this.Student_Service_.Load_Exam().subscribe(
      (Rows) => {
        if (Rows != null) {
          this.Exam_Data = Rows[0];
          this.Exam_Temp.Exam_Id = 0;
          this.Exam_Temp.Exam_Name = "Select";
          this.Exam_Data.unshift(this.Exam_Temp);
          this.Exam_ = this.Exam_Data[0];
          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }





  Lod_ExamType() {
    this.issLoading = true;
    this.Student_Service_.Load_ExamType().subscribe(
      (Rows) => {
        if (Rows != null) {
          this.Exam_Type_Data = Rows[0];
          this.Exam_Type_Temp.Exam_Type_Id = 0;
          this.Exam_Type_Temp.Exam_Type_Name = "Select";
          this.Exam_Type_Data.unshift(this.Exam_Type_Temp);
          this.Exam_Type_ = this.Exam_Type_Data[0];
          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }









  Clr_Mark_List_Master() {
    this.Mark_List_Master_.Mark_List_Master_Id = 0;
    this.Mark_List_Master_.Student_Id = 0;
    this.Mark_List_Master_.Course_Id = 0;
    this.Mark_List_Master_.Course_Name = "";
    this.Mark_List_Master_.User_Id = 0;
  }
  Clr_Mark_List() {
    this.Mark_List_.Mark_List_Id = 0;
    // this.Mark_List_.Subject_Id=0;
    // this.Mark_List_.Subject_Name="";
    this.Mark_List_.Minimum_Mark = "";
    this.Mark_List_.Maximum_Mark = "";
    this.Mark_List_.Mark_Obtained = "";
    this.Subject_ = null;

    if (this.Exam_Status_Data != undefined && this.Exam_Status_Data != null)
      this.Exam_Status_ = this.Exam_Status_Data[0];
  }
  Add_Mark_List() {
    if (
      this.Subject_ == null ||
      this.Subject_ == undefined ||
      this.Subject_.Subject_Id == 0 ||
      this.Subject_.Subject_Id == null
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Subject ", Type: "3" },
      });
      return;
    } else if (
      this.Mark_List_.Minimum_Mark == undefined ||
      this.Mark_List_.Minimum_Mark == null ||
      this.Mark_List_.Minimum_Mark == ""
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Enter the Minimum Mark", Type: "3" },
      });
      return;
    } else if (
      this.Mark_List_.Maximum_Mark == undefined ||
      this.Mark_List_.Maximum_Mark == null ||
      this.Mark_List_.Maximum_Mark == ""
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Enter the Maximum Mark", Type: "3" },
      });
      return;
    } else if (
      this.Exam_Status_.Exam_Status_Id == undefined ||
      this.Exam_Status_.Exam_Status_Id == null ||
      this.Exam_Status_.Exam_Status_Id == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Exam Status", Type: "3" },
      });
      return;
    }

    if (this.Mark_List_Data == undefined) this.Mark_List_Data = [];
    this.Mark_List_.Subject_Id = this.Subject_.Subject_Id;
    this.Mark_List_.Subject_Name = this.Subject_.Subject_Name;
    this.Mark_List_.Exam_Status_Id = this.Exam_Status_.Exam_Status_Id;
    this.Mark_List_.Exam_Status_Name = this.Exam_Status_.Exam_Status_Name;

    if (this.Mark_List_Index >= 0) {
      this.Mark_List_Data[this.Mark_List_Index] = Object.assign(
        {},
        this.Mark_List_
      ); // this.Sales_Details_;
    } else {
      this.Mark_List_Data.push(Object.assign({}, this.Mark_List_));
    }
    this.Mark_List_Index = -1;
    this.Clr_Mark_List();
  }
  Edit_Mark_List(Mark_List_e: Mark_List, index) {
    this.Mark_List_Index = index;
    this.Mark_List_ = Object.assign({}, Mark_List_e);

    this.Subject_Temp.Subject_Id = this.Mark_List_.Subject_Id;
    this.Subject_Temp.Subject_Name = this.Mark_List_.Subject_Name;
    this.Subject_ = Object.assign({}, this.Subject_Temp);

    for (var i = 0; i < this.Exam_Status_Data.length; i++) {
      if (
        this.Exam_Status_Data[i].Exam_Status_Id ==
        this.Mark_List_.Exam_Status_Id
      ) {
        this.Exam_Status_ = this.Exam_Status_Data[i];
      }
    }
  }
  Delete_Mark_List(Mark_List: Mark_List, index) {
    this.Mark_List_Data.splice(index, 1);
    this.Clr_Mark_List();
  }

  Save_Mark_List_Master() {
    if (
      this.Mark_List_Data.length === undefined ||
      this.Mark_List_Data.length == null ||
      this.Mark_List_Data.length == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Add Atleast One Mark_List ", Type: "3" },
      });
      return;
    }
    this.issLoading = true;
    this.Mark_List_Master_.User_Id = this.Login_User;
    this.Mark_List_Master_.Course_Id = this.Course_Id_Edit;
    this.Mark_List_Master_.Course_Name = this.Course_.Course_Name;
    this.Mark_List_Master_.Student_Id = this.Student_Id;
    this.Mark_List_Master_.Mark_List = this.Mark_List_Data;
    this.Student_Service_.Save_Mark_List_Master(
      this.Mark_List_Master_
    ).subscribe(
      (Save_status) => {
        // Save_status=Save_status[0];
        if (Number(Save_status[0].Mark_List_Master_Id_) > 0) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved", Type: "false" },
          });
          // this.Close_Click();
        } else {
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
          data: { Message: Rows.error.error, Type: "2" },
        });
      }
    );
  }
  Get_Student_Mark_List(Student_Id) {
    this.Student_Service_.Get_Student_Mark_List(Student_Id).subscribe(
      (Rows) => {
        this.Mark_List_Master_Data = Rows[0];
        if (this.Mark_List_Master_Data.length > 0) {
          this.Mark_List_Master_ = this.Mark_List_Master_Data[0];
        }
        this.Mark_List_Data = Rows[1];
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
  Load_Mode() {
     ;
    this.Student_Service_.Load_Mode().subscribe(
      (Rows) => {
        this.Mode_Data = Rows[0];
        this.Mode_Temp.Mode_Id = 0;
        this.Mode_Temp.Mode_Name = "Select";
        this.Mode_Data.unshift(this.Mode_Temp);
        this.Mode = this.Mode_Data[0];


        this.Process_Type_Data = Rows[1];
        this.Process_Type_Temp.Process_Type_Id = 0;
        this.Process_Type_Temp.Process_Type_Name = "Select";
        this.Process_Type_Data.unshift(this.Process_Type_Temp);
        this.Process_Type_ = this.Process_Type_Data[1];

      },
      (Rows) => {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: "2" },
        });
      }
    );
  }

  Load_Laptopdetails() {
    this.Student_Service_.Load_Laptopdetails().subscribe(
      (Rows) => {

        this.Laptopdetails_Data = Rows[0];
        this.Laptopdetails_Temp.Laptop_details_Id = 0;
        this.Laptopdetails_Temp.Laptop_details_Name = "Select";
        this.Laptopdetails_Data.unshift(this.Laptopdetails_Temp);
        this.Laptopdetails_ = this.Laptopdetails_Data[0];
      },
      (Rows) => {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: "2" },
        });
      }
    );
  }




  Load_Installment_Type() {
    this.Student_Service_.Load_Installment_Type().subscribe(
      (Rows) => {
        this.Installment_Type_Data = Rows[0];
        this.Installment_Type_Temp.Installment_Type_Id = 0;
        this.Installment_Type_Temp.Installment_Type_Name = "Select";
        this.Installment_Type_Data.unshift(this.Installment_Type_Temp);
        this.Installment_Type = this.Installment_Type_Data[0];
      },
      (Rows) => {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: "2" },
        });
      }
    );
  }
  Accounts_Typeahead(event: any) {
    var Value = "";
    if (event.target.value == "") Value = undefined;
    else Value = event.target.value;
    if (
      this.Client_Accounts_Data == undefined ||
      this.Client_Accounts_Data.length == 0
    ) {
      this.issLoading = true;
      this.Student_Service_.Accounts_Typeahead("4,5,11", Value).subscribe(
        (Rows) => {
          if (Rows != null) {
            this.Client_Accounts_Data = Rows[0];
            this.issLoading = false;
          }
        },
        (Rows) => {
          this.issLoading = false;
        }
      );
    }
  }
  display_Accounts(Client_Accounts_: Client_Accounts) {
    if (Client_Accounts_) {
      return Client_Accounts_.Client_Accounts_Name;
    }
  }
  Clr_Receipt_Voucher() {
    this.Receipt_Voucher_.Receipt_Voucher_Id = 0;
    this.Receipt_Voucher_.Date = new Date();
    this.Receipt_Voucher_.Date = this.New_Date(this.Receipt_Voucher_.Date);
    // this.Receipt_Voucher_.Date="";
    this.Receipt_Voucher_.Voucher_No = 0;
    this.Receipt_Voucher_.From_Account_Id = 0;
    this.Receipt_Voucher_.Amount = null;
    this.Receipt_Voucher_.To_Account_Id = 0;
    this.Receipt_Voucher_.Payment_Mode = 0;
    this.Receipt_Voucher_.User_Id = 0;
    this.Receipt_Voucher_.Description = "";
    this.Receipt_Voucher_.Address1 = "";
    this.Receipt_Voucher_.Tax_Percentage = 0;
    this.Client_Accounts_ = null;
    this.Receipt_Voucher_.Fees_Type_Id = 0;
    if (this.Mode_Data != null && this.Mode_Data != undefined)
      this.Mode = this.Mode_Data[0];
    if (this.Client_Accounts_Data != null && this.Client_Accounts_Data != undefined)
      this.Client_Accounts_ = this.Client_Accounts_Data[0];
    this.Receipt_Voucher_.Payment_Status = 0;
  }
  Save_Receipt_Voucher() {
    debugger
    // if (this.Client_Accounts_ == undefined || this.Client_Accounts_ == null || this.Client_Accounts_.Client_Accounts_Id == undefined || this.Client_Accounts_.Client_Accounts_Id == 0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select To Account', Type: "3" } });
    //     }
    //     else

    // if (
    //   this.Receipt_Voucher_.Date == undefined ||
    //   this.Receipt_Voucher_.Date == null ||
    //   this.Receipt_Voucher_.Date == undefined ||
    //   this.Receipt_Voucher_.Date == ""||this.Receipt_Voucher_.Date == "NaN-NaN-NaN"
    //   ) {
    //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
    //   panelClass: "Dialogbox-Class",
    //   data: { Message: "Choose Date", Type: "3" },
    //   });
    //   return;
    // }

    if (
      this.Receipt_Voucher_.Amount == undefined ||
      this.Receipt_Voucher_.Amount == null ||
      this.Receipt_Voucher_.Amount == undefined ||
      this.Receipt_Voucher_.Amount == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Enter the Amount", Type: "3" },
      });
    }

    else if (
      this.Client_Accounts_ == null ||
      this.Client_Accounts_ == undefined ||
      this.Client_Accounts_.Client_Accounts_Id == undefined ||
      this.Client_Accounts_.Client_Accounts_Id == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Collected to Which Account?", Type: "3" },
      });


    }


    else if (
      this.Mode == null ||
      this.Mode == undefined ||
      this.Mode.Mode_Id == undefined ||
      this.Mode.Mode_Id == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Mode", Type: "3" },
      });


    }



    else {
      debugger
      this.Receipt_Voucher_.User_Id = Number(this.Login_User);
      this.Receipt_Voucher_.From_Account_Id = this.Student_.Student_Id;
      this.Receipt_Voucher_.Course_Id = this.Course_.Course_Id;
      this.Receipt_Voucher_.Student_Course_Id = this.Student_Course_Id_Edit;
      this.Receipt_Voucher_.Payment_Status = 0;

debugger

      this.Receipt_Voucher_.To_Account_Id = this.Client_Accounts_.Client_Accounts_Id;
      this.Receipt_Voucher_.To_Account_Name = this.Client_Accounts_.Client_Accounts_Name;
      this.Receipt_Voucher_.Payment_Mode = this.Mode.Mode_Id;
      this.Receipt_Voucher_.Tax_Percentage = 18;

      this.Receipt_Voucher_.Processing_Agent_Commission =  this.Processing_Agent_Commission_ ;
      this.Receipt_Voucher_.Associates_Agent_Commission =  this.Associates_Agent_Commission_ ;

      this.Receipt_Voucher_.Date = this.New_Date(new Date(moment(this.Receipt_Voucher_.Date).format("YYYY-MM-DD")));
      if (this.Save_Call_Status == true) return;
      else this.Save_Call_Status = true;
      this.issLoading = true;
       debugger
      this.Student_Service_.Save_Student_Receipt_Voucher(
        this.Receipt_Voucher_
      ).subscribe(
        (Save_status) => {
          debugger

          this.Get_Receipt_History()
          var fees_data = [];
          //Save_status=Save_status[0];
          //fees_data = Save_status[1];
          debugger
          if (Number(Save_status[0][0].Receipt_Voucher_Id_) > 0 || Number(Save_status[0][0].Master_Id_) > 0) {

            this.Student_Fees_Installment_Save_Data = Save_status[1];
            this.Hostel_Fees_Master_ = Object.assign({}, Save_status[4][0]);

            this.Hostel_Fees_Details_Data = Save_status[5];
            var Student_Fees_Installment_Master_Id = 0;
            var Student_Fees_Installment_Master_Id_temp = 0;
            var Student_Fees_Installment_Master_Index = -1;
            this.Student_Fees_Installment_Master_Data = [];
            this.Student_Fees_Installment_Details_Data = [];

            for (
              var i = 0;
              i < this.Student_Fees_Installment_Save_Data.length;
              i++
            ) {
              Student_Fees_Installment_Master_Id_temp =
                this.Student_Fees_Installment_Save_Data[i]
                  .Student_Fees_Installment_Master_Id;
              if (
                Student_Fees_Installment_Master_Id !=
                Student_Fees_Installment_Master_Id_temp
              ) {
                this.Student_Fees_Installment_Master_ =
                  new Student_Fees_Installment_Master();
                this.Student_Fees_Installment_Master_.Amount =
                  this.Student_Fees_Installment_Save_Data[i].Amount;
                this.Student_Fees_Installment_Master_.Tax =
                  this.Student_Fees_Installment_Save_Data[i].Tax;


                this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id =
                  this.Student_Fees_Installment_Save_Data[
                    i
                  ].Student_Fees_Installment_Master_Id;
                this.Student_Fees_Installment_Master_.Course_Fees_Id =
                  this.Student_Fees_Installment_Save_Data[i].Course_Fees_Id;
                this.Student_Fees_Installment_Master_.Fees_Type_Id =
                  this.Student_Fees_Installment_Save_Data[i].Fees_Type_Id;
                this.Student_Fees_Installment_Master_.Fees_Type_Name =
                  this.Student_Fees_Installment_Save_Data[i].Fees_Type_Name;
                this.Student_Fees_Installment_Master_.No_Of_Instalment =
                  this.Student_Fees_Installment_Save_Data[i].No_Of_Instalment;
                this.Student_Fees_Installment_Master_.Instalment_Period =
                  this.Student_Fees_Installment_Save_Data[i].Instalment_Period;


                  // this.Student_Fees_Installment_Master_.Is_Associate =
                  // this.Student_Fees_Installment_Save_Data[i].Is_Associate;


                this.Fees_Master_Id =
                  this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id;
                this.Student_Fees_Installment_Master_Data.push(
                  Object.assign({}, this.Student_Fees_Installment_Master_)
                );
                Student_Fees_Installment_Master_Index =
                  Student_Fees_Installment_Master_Index + 1;
                this.Student_Fees_Installment_Master_Data[
                  Student_Fees_Installment_Master_Index
                ].Student_Fees_Installment_Details =
                  this.Student_Fees_Installment_Details_Data;

                this.Student_Fees_Installment_Details_Data = [];
                this.Student_Fees_Installment_Details_Temp =
                  new Student_Fees_Installment_Details();
                this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id =
                  this.Student_Fees_Installment_Save_Data[
                    i
                  ].Student_Fees_Installment_Details_Id;
                this.Student_Fees_Installment_Details_Temp.Instalment_Date =
                  this.Student_Fees_Installment_Save_Data[i].Instalment_Date;
                this.Student_Fees_Installment_Details_Temp.Fees_Amount =
                  this.Student_Fees_Installment_Save_Data[i].Fees_Amount;
                this.Student_Fees_Installment_Details_Temp.Balance_Amount =
                  this.Student_Fees_Installment_Save_Data[i].Balance_Amount;


                  this.Student_Fees_Installment_Details_Temp.Is_Associate =
                  this.Student_Fees_Installment_Save_Data[i].Is_Associate;

                  this.Student_Fees_Installment_Details_Temp.Is_Agent =
                  this.Student_Fees_Installment_Save_Data[i].Is_Agent;

                this.Student_Fees_Installment_Details_Temp.Status =
                  this.Student_Fees_Installment_Save_Data[i].Status;
                this.Student_Fees_Installment_Details_Temp.Tax_Percentage = 18;
                // this.Student_Fees_Installment_Save_Data[i].Tax_Percentage

                this.Student_Fees_Installment_Details_Data.push(
                  Object.assign({}, this.Student_Fees_Installment_Details_Temp)
                );
                this.Student_Fees_Installment_Master_Data[
                  Student_Fees_Installment_Master_Index
                ].Student_Fees_Installment_Details =
                  this.Student_Fees_Installment_Details_Data;
              } else {
                this.Student_Fees_Installment_Details_Temp =
                  new Student_Fees_Installment_Details();
                this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id =
                  this.Student_Fees_Installment_Save_Data[
                    i
                  ].Student_Fees_Installment_Details_Id;
                this.Student_Fees_Installment_Details_Temp.Instalment_Date =
                  this.Student_Fees_Installment_Save_Data[i].Instalment_Date;
                this.Student_Fees_Installment_Details_Temp.Fees_Amount =
                  this.Student_Fees_Installment_Save_Data[i].Fees_Amount;
                this.Student_Fees_Installment_Details_Temp.Balance_Amount =
                  this.Student_Fees_Installment_Save_Data[i].Balance_Amount;
                  this.Student_Fees_Installment_Details_Temp.Is_Associate =
                  this.Student_Fees_Installment_Save_Data[i].Is_Associate;

                  this.Student_Fees_Installment_Details_Temp.Is_Agent =
                  this.Student_Fees_Installment_Save_Data[i].Is_Agent;


                this.Student_Fees_Installment_Details_Temp.Status =
                  this.Student_Fees_Installment_Save_Data[i].Status;
                this.Student_Fees_Installment_Details_Temp.Tax_Percentage = 18;
                // this.Student_Fees_Installment_Save_Data[i].Tax_Percentage
                this.Student_Fees_Installment_Details_Data.push(
                  Object.assign({}, this.Student_Fees_Installment_Details_Temp)
                );
                this.Student_Fees_Installment_Master_Data[
                  Student_Fees_Installment_Master_Index
                ].Student_Fees_Installment_Details =
                  this.Student_Fees_Installment_Details_Data;
              }
              Student_Fees_Installment_Master_Id =
                this.Student_Fees_Installment_Save_Data[i]
                  .Student_Fees_Installment_Master_Id;
            }


            this.Save_Call_Status = false;
            this.issLoading = false;

            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Saved", Type: "false" },
            });

            // var Sms =
            // "Hi," +
            // Save_status[0][0].Student_Name_ +
            // ". We have received a Payment of Rs" +
            // Save_status[0][0].Amount_ +
            // ". Thank you for making the payment. Your Pending fee is " +
            // Save_status[0][0].Balance_Amount_ +
            // ". Support-" +
            // this.User_Mobile +
            // ".ONE TEAM SOLUTIONS";

            this.issLoading = true;

            // if (Save_status[3].length == 0) {
            // var Instalment_Date = "Nill";
            // var BalanceAmount = "Nill";
            // } else {
            // var Instalment_Date = Save_status[3][0].Instalment_Date;
            // var BalanceAmount = Save_status[3][0].BalanceAmount;
            // }

            // this.Student_Service_.Send_Receipt_Sms_Email(
            // Save_status[0][0].Phone_,
            // Save_status[0][0].Email_,
            // Sms,
            // Save_status[0][0].Student_Name_,
            // Save_status[0][0].Amount_,
            // Save_status[0][0].Date_,
            // Save_status[2][0].Amount,
            // Instalment_Date,
            // BalanceAmount
            // ).subscribe(
            // (Rows) => {
            // 
            // const dialogRef = this.dialogBox.open(DialogBox_Component, {
            // panelClass: "Dialogbox-Class",
            // data: { Message: Sms, Type: "false" },
            // });
            // this.issLoading = false;
            // },
            // (Rows) => {
            // 
            // this.issLoading = false;
            // const dialogRef = this.dialogBox.open(DialogBox_Component, {
            // panelClass: "Dialogbox-Class",
            // data: { Message: "Error Occured", Type: "2" },
            // });
            // }
            // );
            this.Save_Call_Status = false;
            this.Get_Receipt_History()
            this.Clr_Receipt_Voucher();

            this.Receipt_History_View = false;
            this.Receipt_View = false;
            //this.Get_Receipt_History();
            //  this.Receipt_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
          } else {
            this.Save_Call_Status = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: "2" },
            });
          }
          this.issLoading = false;
        },
        (Rows) => {
          this.Save_Call_Status = false;
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
      );
    }
  }
  Get_Receipt_History() {

    if (this.Receipt_History_View == false) {
      this.Receipt_History_View = true;
      this.issLoading = true;

      this.Student_Service_.Get_Student_Receipt_History(
        this.Student_.Student_Id,
        this.Course_.Course_Id
      ).subscribe(
        (Rows) => {

          this.issLoading = false;
          this.Receipt_Voucher_Data = Rows[0];
        },
        (Rows) => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: false },
          });
        }
      );
    } else this.Receipt_History_View = false;
  }
  Edit_Receipt_Voucher(Receipt_Voucher_e: Receipt_Voucher, index) {


    this.Receipt_View = true;
    this.Receipt_Voucher_ = Receipt_Voucher_e;

    this.Receipt_Voucher_ = Object.assign({}, Receipt_Voucher_e);

    // this.Client_Accounts_Temp.Client_Accounts_Id =
    // Receipt_Voucher_e.To_Account_Id;
    // this.Client_Accounts_Temp.Client_Accounts_Name =
    // Receipt_Voucher_e.ToAccount_Name;
    // this.Client_Accounts_ = this.Client_Accounts_Temp;

    for (var i = 0; i < this.Mode_Data.length; i++) {
      if (Receipt_Voucher_e.Payment_Mode == this.Mode_Data[i].Mode_Id)
        this.Mode = this.Mode_Data[i];
    }

    for (var i = 0; i < this.Client_Accounts_Data.length; i++) {
      if (Receipt_Voucher_e.To_Account_Id == this.Client_Accounts_Data[i].Client_Accounts_Id)
        this.Client_Accounts_ = this.Client_Accounts_Data[i];
    }

  }
  Delete_Receipt_Voucher(Receipt_Voucher_Id, index) {
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
        // this.issLoading=true;

        this.Student_Service_.Delete_Receipt_Voucher(
          Receipt_Voucher_Id
        ).subscribe(
          (Delete_status) => {

            if (Delete_status[0][0].Receipt_Voucher_Id_ > 0) {
              this.Receipt_History_View = false;
              this.Get_Student_Course(this.Student_Id);


              this.Get_Student_Course_Click(this.Student_Course_.Student_Id, this.Student_Course_.Student_Course_Id, this.Student_Course_.Course_Id)
              this.Receipt_Voucher_Data.splice(index, 1);
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Deleted", Type: "false" },
              });
            } else {
              //this.Receipt_Voucher_Data.splice(index, 1);
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Deleted", Type: "false" },
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

  Search_Transaction_Report_Tab() {
    var look_In_Date_Value = 0;

    if (this.Is_Date == true) look_In_Date_Value = 1;
    this.issLoading = true;
    this.Student_Service_.Search_Transaction_Report_Tab(
      look_In_Date_Value,
      moment(this.FromDate_).format("YYYY-MM-DD"),
      moment(this.ToDate_).format("YYYY-MM-DD"),
      this.Login_User,
      this.Student_Id_Edit
    ).subscribe(
      (Rows) => {
        this.Transaction_Report_Master_Data = Rows[0];
        this.issLoading = false;
        if (this.Transaction_Report_Master_Data.length == 0) {
          this.issLoading = false;
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

  Search_Interview_Report_Tab() {
    var look_In_Date_Value = 0;

    if (this.Is_Date == true) look_In_Date_Value = 1;
    this.issLoading = true;
    this.Student_Service_.Search_Interview_Report_Tab(
      look_In_Date_Value,
      moment(this.FromDate_).format("YYYY-MM-DD"),
      moment(this.ToDate_).format("YYYY-MM-DD"),
      this.Login_User,
      this.Student_Id_Edit
    ).subscribe(
      (Rows) => {
        this.Interview_Report_Master_Data = Rows[0];
        this.issLoading = false;
        if (this.Interview_Report_Master_Data.length == 0) {
          this.issLoading = false;
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

  Search_Placed_Report_Tab() {
    var look_In_Date_Value = 0;

    if (this.Is_Date == true) look_In_Date_Value = 1;
    this.issLoading = true;
    this.Student_Service_.Search_Placed_Report_Tab(
      look_In_Date_Value,
      moment(this.FromDate_).format("YYYY-MM-DD"),
      moment(this.ToDate_).format("YYYY-MM-DD"),
      this.Login_User,
      this.Student_Id_Edit
    ).subscribe(
      (Rows) => {
        this.Placed_Report_Master_Data = Rows[0];
        this.issLoading = false;
        if (this.Placed_Report_Master_Data.length == 0) {
          this.issLoading = false;
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
  Age_Calculation() {

    const str = this.Student_.DOB;
    const date = new Date(str);
    let timeDiff = Math.abs(Date.now() - date.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    this.Student_.Age = age;
  }
  Save_Hostel_Fees() {


    if (this.Hostel_Fees_Master_.From_Date == undefined || this.Hostel_Fees_Master_.From_Date == null) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select From Date', Type: "3" } });
      return
    }


    if (this.Hostel_Fees_Master_.To_Date == undefined || this.Hostel_Fees_Master_.To_Date == null) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select To Date', Type: "3" } });
      return
    }


    if (this.Hostel_Fees_Master_.Per_Month_Amount == undefined || this.Hostel_Fees_Master_.Per_Month_Amount == null || this.Hostel_Fees_Master_.Per_Month_Amount == 0) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Per Month Amount', Type: "3" } });
      return
    }




    this.Hostel_Fees_Master_.Student_Id = this.Student_.Student_Id;
    this.Hostel_Fees_Master_.User_Id = Number(this.Login_User);
    this.Hostel_Fees_Master_.Hostel_Fees_Details = this.Hostel_Fees_Details_Data;
    this.Hostel_Fees_Master_.From_Date = this.New_Date(new Date(moment(this.Hostel_Fees_Master_.From_Date).format("YYYY-MM-DD")));
    this.Hostel_Fees_Master_.To_Date = this.New_Date(new Date(moment(this.Hostel_Fees_Master_.To_Date).format("YYYY-MM-DD")));
    this.Hostel_Fees_Master_.Checkout_Date = this.New_Date(
      new Date(moment(this.Hostel_Fees_Master_.Checkout_Date).format("YYYY-MM-DD"))
    );
    if (this.Save_Call_Status == true) return;
    else this.Save_Call_Status = true;

    this.issLoading = true;


    this.Student_Service_.Save_Hostel_Fees(this.Hostel_Fees_Master_).subscribe(
      (Save_status) => {

        if (Number(Save_status[0].Student_Id_) > 0) {
          this.Save_Call_Status = false;

          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved", Type: "false" },
          });


          // this.after_course_save();
          this.clr_Hostelfees();
          this.Get_Hosteldetails();
          // this.course_click();

          // else this.coursedetails_Edit=false;
          this.Save_Call_Status = false;
        } else {
          this.Save_Call_Status = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }

        this.issLoading = false;
      },
      (Rows) => {
        this.Save_Call_Status = false;
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: Rows.error.error, Type: "2" },
        });
      }
    );
  }

  clr_ExamResult() {
    this.ExamResult_.Exam_Result_Id = 0;
    this.ExamResult_.Mark = null;
    this.ExamResult_.Maxmium_Mark = null;
    if (this.Exam_Data != null && this.Exam_Data != undefined)
      this.Exam_ = this.Exam_Data[0];
    if (this.Exam_Type_Data != null && this.Exam_Type_Data != undefined)
      this.Exam_Type_ = this.Exam_Type_Data[0];

 
    this.ExamResult_.Exam_Date = new Date();
    this.ExamResult_.Exam_Date = this.New_Date(this.ExamResult_.Exam_Date);

    if (this.Exam_Status_Data != null && this.Exam_Status_Data != undefined)
    this.Exam_Status_ = this.Exam_Status_Data[0];


  }


  clr_Hostelfees() {
    this.Hostel_Fees_Master_.Per_Month_Amount = 0;
    this.Hostel_Fees_Master_.Total_Amount = 0;
    this.Hostel_Fees_Master_.Application_Fees = 0;
    this.Hostel_Fees_Master_.Security_Deposit = 0;
    this.Hostel_Fees_Master_.Food_Fees = 0;
    this.Hostel_Fees_Details_Data = [];
    this.Hostel_Fees_Master_.From_Date = new Date();
    this.Hostel_Fees_Master_.To_Date = new Date();
    this.Hostel_Fees_Master_.From_Date = this.New_Date(this.Hostel_Fees_Master_.From_Date);
    this.Hostel_Fees_Master_.To_Date = this.New_Date(this.Hostel_Fees_Master_.To_Date);
    this.Hostel_Fees_Master_.Checkout_Date_Check = false;
    this.Hostel_Fees_Master_.Checkout_Date = new Date();
    this.Hostel_Fees_Master_.Checkout_Date = this.New_Date(this.Hostel_Fees_Master_.Checkout_Date);

  }








  Save_ExamResult() {



    // if (this.Exam_==undefined||this.Exam_==null)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam', Type: "3" } });
    //     return
    // }

    if (this.Exam_ == undefined ||
      this.Exam_ == null ||
      this.Exam_.Exam_Id == undefined ||
      this.Exam_.Exam_Id == 0) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam', Type: "3" } });
      return
    }
    if (this.Exam_Type_ == undefined ||
      this.Exam_Type_ == null ||
      this.Exam_Type_.Exam_Type_Id == undefined ||
      this.Exam_Type_.Exam_Type_Id == 0) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select ExamType', Type: "3" } });
      return
    }


    if (this.Exam_Status_ == undefined ||
      this.Exam_Status_ == null ||
      this.Exam_Status_.Exam_Status_Id == undefined ||
      this.Exam_Status_.Exam_Status_Id == 0) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Status', Type: "3" } });
      return
    }


    this.issLoading = true;
    this.ExamResult_.Student_Id = this.Student_.Student_Id;
    this.ExamResult_.Course_Id = this.Course_.Course_Id;
    this.ExamResult_.Exam_Id = this.Exam_.Exam_Id;
    this.ExamResult_.Exam_Type_Id = this.Exam_Type_.Exam_Type_Id;

    this.ExamResult_.Exam_Status_Id = this.Exam_Status_.Exam_Status_Id;
 

    this.ExamResult_.Student_Course_Id = this.Student_Course_.Student_Course_Id;
    this.ExamResult_.User_Id = this.Login_User
    this.ExamResult_.Exam_Date = this.New_Date(new Date(moment(this.ExamResult_.Exam_Date).format("YYYY-MM-DD")));

    debugger
    this.Student_Service_.Save_ExamResult(this.ExamResult_).subscribe(Save_status => {
debugger
      Save_status = Save_status[0];
      if (Number(Save_status[0].Exam_Result_Id_) > 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved', Type: "false" } });
        this.clr_ExamResult();

        this.Get_ExamResult();
      }

      else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      }
      this.issLoading = false;
    },
      Rows => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: Rows.error.error, Type: "2" } });
      });
  }

  Get_ExamResult() {

    // if (this.Receipt_History_View == false) {
    // this.Receipt_History_View = true;

    this.issLoading = true;
     
    this.Student_Service_.Get_ExamResult(this.Student_Course_.Student_Id, this.Student_Course_.Student_Course_Id).subscribe((Rows) => {

      this.issLoading = false;
      this.Exam_Result_Data = Rows[0];



    },
      (Rows) => {
         
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: false },
        });
      }
    );
    // } 
    // else this.Receipt_History_View = false;
  }



  Get_Hosteldetails() {

    // if (this.Receipt_History_View == false) {
    // this.Receipt_History_View = true;

    this.issLoading = true;

    this.Student_Service_.Get_Hosteldetails(this.Student_.Student_Id).subscribe((Rows) => {

      this.issLoading = false;
      // this.Hostel_Fees_Master_Data = Rows[0];
      this.Hostel_Fees_Master_Data_t = Rows[0];

    },
      (Rows) => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: false },
        });
      }
    );
    // } 
    // else this.Receipt_History_View = false;
  }

  Get_Hostelfeesdetails() {

    // if (this.Receipt_History_View == false) {
    // this.Receipt_History_View = true;

    this.issLoading = true;

    this.Student_Service_.Get_Hostelfeesdetails(this.Hostel_Fees_Master_.Hostel_Fees_Master_Id).subscribe((Rows) => {

      this.issLoading = false;
      this.Hostel_Fees_Details_Data = Rows[0];
    },
      (Rows) => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: false },
        });
      }
    );
    // } 
    // else this.Receipt_History_View = false;
  }









  Edit_Exam_Result(Examresult_e: Exam_Result, index) {


     
    this.ExamResult_ = Examresult_e;

    this.ExamResult_ = Object.assign({}, Examresult_e);


    for (var i = 0; i < this.Exam_Data.length; i++) {
      if (Examresult_e.Exam_Id == this.Exam_Data[i].Exam_Id)
        this.Exam_ = this.Exam_Data[i];
    }

    for (var i = 0; i < this.Exam_Type_Data.length; i++) {
      if (Examresult_e.Exam_Type_Id == this.Exam_Type_Data[i].Exam_Type_Id)
        this.Exam_Type_ = this.Exam_Type_Data[i];
    }


    for (var i = 0; i < this.Exam_Status_Data.length; i++) {
      if (Examresult_e.Exam_Status_Id == this.Exam_Status_Data[i].Exam_Status_Id)
        this.Exam_Status_ = this.Exam_Status_Data[i];
    }
     
    this.ExamResult_.Exam_Date = this.New_Date(new Date(moment(this.ExamResult_.Exam_Date1).format("YYYY-MM-DD")));

  }


  Delete_ExamResult(Exam_Result_Id, index) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Do you want to delete ?', Type: true, Heading: 'Confirm' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Yes') {
        this.issLoading = true;
        this.Student_Service_.Delete_ExamResult(Exam_Result_Id).subscribe(Delete_status => {

          Delete_status = Delete_status[0];
          Delete_status = Delete_status[0].DeleteStatus_.data[0];
          if (Delete_status == 1) {
            this.Exam_Result_Data.splice(index, 1);
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted', Type: "false" } });
            this.Get_ExamResult();
          }
          else {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
          }
          this.issLoading = false;
        },
          Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
          });
      }
    });
  }


  Search_Course_Typeahead_Formastercourse(event: any) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value;

    {
      this.issLoading = true;

      this.Student_Service_.Search_Course_Typeahead_Formastercourse(Value, this.Student_.MasterCourse_Id).subscribe(
        (Rows) => {

          if (Rows != null) {
            this.Course_Data = Rows[0];
            this.issLoading = false;

            this.Course_Data_Filter = [];

            for (var i = 0; i < this.Course_Data.length; i++) {
              if (this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
                this.Course_Data_Filter.push(this.Course_Data[i]);
            }
          }
        },
        (Rows) => {
          this.issLoading = false;
        }
      );

      this.Course_Data_Filter = [];
      for (var i = 0; i < this.Course_Data.length; i++) {
        if (this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
          this.Course_Data_Filter.push(this.Course_Data[i]);
      }
    }
  }
  display_MasterCourse(Course_: Course) {
    if (Course_) {
      return Course_.Course_Name;
    }
  }


  Calculate_Total_Mark() {
    var Reading = 0, Writing = 0, Listening = 0, Grammer = 0, Speaking = 0, TotalMark = 0;


    if (this.Student_Course_.TotalMark == undefined || this.Student_Course_.TotalMark == null)
      TotalMark = 0


    if (this.Student_Course_.Reading == undefined || this.Student_Course_.Reading == null)
      Reading = 0;
    else
      Reading = this.Student_Course_.Reading;

    if (this.Student_Course_.Writing == undefined || this.Student_Course_.Writing == null)
      Writing = 0;
    else
      Writing = this.Student_Course_.Writing;



    if (this.Student_Course_.Listening == undefined || this.Student_Course_.Listening == null)
      Listening = 0;
    else
      Listening = this.Student_Course_.Listening;



    if (this.Student_Course_.Grammer == undefined || this.Student_Course_.Grammer == null)
      Grammer = 0;
    else
      Grammer = this.Student_Course_.Grammer;



    if (this.Student_Course_.Speaking == undefined || this.Student_Course_.Speaking == null)
      Speaking = 0;
    else
      Speaking = this.Student_Course_.Speaking;



    TotalMark = Number(Reading) + Number(Writing) + Number(Listening) + Number(Grammer) + Number(Speaking);
    this.Student_Course_.TotalMark = TotalMark;

    // if( Obtained_ >=minmark)
    // {
    //  this.Mark_List_Data[i].Exam_Status_Id=1;
    // this.Mark_List_Data[i].Exam_Status_Name="Passed";
    // }
    // else
    // {
    // this.Mark_List_Data[i].Exam_Status_Id=2;
    // this.Mark_List_Data[i].Exam_Status_Name="Failed";
    // }
  }


  Save_Process() {
    debugger
    if (
      this.Process_Type_ == undefined ||
      this.Process_Type_ == null ||
      this.Process_Type_.Process_Type_Id == undefined ||
      this.Process_Type_.Process_Type_Id == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Process Type ", Type: "3" },
      });
      return;
    }
    if (
      this.Student_Process_.Process_Date == undefined ||
      this.Student_Process_.Process_Date == null ||
      this.Student_Process_.Process_Date == ""
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Date ", Type: "3" },
      });
      return;
    }
    // if (
    //   this.Student_Process_.Remark == undefined ||
    //   this.Student_Process_.Remark == null ||
    //   this.Student_Process_.Remark == ""
    // ) {
    //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
    //     panelClass: "Dialogbox-Class",
    //     data: { Message: "Enter Remark ", Type: "3" },
    //   });
    //   return;
    // }
    this.Student_Process_.Date = this.New_Date(
      new Date(moment(this.Student_Process_.Date).format("DD-MM-YYYY"))
    );
    this.Student_Process_.Process_Date
    this.Student_Process_.Process_Date=this.New_Date(new Date(moment(this.Student_Process_.Process_Date).format('YYYY-MM-DD')));

 

    this.Student_Process_.Process_Type_Id=this.Process_Type_.Process_Type_Id
    this.Student_Process_.Student_Id = this.Student_Id
    this.issLoading = true;
debugger
    this.Student_Service_.Save_Student_Process(this.Student_Process_).subscribe(
      (Save_status) => {

        if (Number(Save_status[0].Student_Process_Id_) > 0) {
          // this.Save_Call_Status = false;
          this.clr_Process()
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved", Type: "false" },
          });
          this.clr_Process();
          this.Get_Student_Process_History();
        } else {
          // this.Save_Call_Status = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
        this.issLoading = false;
      },
      (Rows) => {
        this.Save_Call_Status = false;
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: Rows.error.error, Type: "2" },
        });
      }
    );


  }









  Save_Remark() {
    if (
      this.Student_Remark_.Remark == undefined ||
      this.Student_Remark_.Remark == null ||
      this.Student_Remark_.Remark == ""
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Enter Remark ", Type: "3" },
      });
      return;
    }
    this.Student_Remark_.Eneterd_By = this.Login_User
    this.Student_Remark_.Eneterd_By_Name = this.Login_User_Name
    this.Student_Remark_.Remark_Details_Id = this.Remark_Details_.Remark_Details_Id

    this.Student_Remark_.Student_Id = this.Student_Id
    this.issLoading = true;

    this.Student_Service_.Save_Student_Remark(this.Student_Remark_).subscribe(
      (Save_status) => {

        if (Number(Save_status[0].Student_Remark_Id_) > 0) {
          this.Save_Call_Status = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved", Type: "false" },
          });
          this.clr_Remark();
          this.Get_Student_Remark_History()
        } else {
          this.Save_Call_Status = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Error Occured", Type: "2" },
          });
        }
        this.issLoading = false;
      },
      (Rows) => {
        this.Save_Call_Status = false;
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: Rows.error.error, Type: "2" },
        });
      }
    );


  }
  clr_Process() {
    this.Student_Process_.Student_Process_Id = 0
    if (this.Process_Type_Data != null && this.Process_Type_Data != undefined)
      this.Process_Type_ = this.Process_Type_Data[0];


      this.Student_Process_.Process_Date =  null
    this.Student_Process_.Remark = ''; 
  }



  clr_Remark() {
    this.Student_Remark_.Student_Remark_Id = 0
    this.Student_Remark_.Student_Id = 0
    this.Student_Remark_.Remark_Details_Id = 0
    this.Student_Remark_.Eneterd_By = 0
    this.Student_Remark_.Eneterd_By_Name = '';
    this.Student_Remark_.Remark = '';
    if (this.Remark_Details_Data != null && this.Remark_Details_Data != undefined)
      this.Remark_Details_ = this.Remark_Details_Data[0];
  }



  Get_Student_Process_History() {

    this.issLoading = true;
     
    this.Student_Service_.Get_Student_Process_History(
      this.Student_.Student_Id
    ).subscribe(
      (Rows) => {
         
        this.issLoading = false;
        this.Student_Process_Data = Rows[0];
      },
      (Rows) => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: false },
        });
      }
    );

  }






  Get_Student_Remark_History() {
    this.issLoading = true;
     
    this.Student_Service_.Get_Student_Remark_History(
      this.Student_.Student_Id
    ).subscribe(
      (Rows) => {
         
        this.issLoading = false;
        this.Student_Remark_Data = Rows[0];
      },
      (Rows) => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: false },
        });
      }
    );

  }
  Edit_Student_Remark(Student_Remark_e: Student_Remark, index) {


    this.Receipt_View = true;
    this.Student_Remark_ = Student_Remark_e;

    this.Student_Remark_ = Object.assign({}, Student_Remark_e);

    for (var i = 0; i < this.Remark_Details_Data.length; i++) {
      if (Student_Remark_e.Remark_Details_Id == this.Remark_Details_Data[i].Remark_Details_Id)
        this.Remark_Details_ = this.Remark_Details_Data[i];
    }

  }
  Edit_Student_Process(Student_Process_e: Student_Process, index) {

debugger
    this.Process_View = true;
    this.Student_Process_ = Student_Process_e;

    this.Student_Process_ = Object.assign({}, Student_Process_e);
    // this.Student_Process_.Process_Date=    this.Student_Process_.Process_Date
    for (var i = 0; i < this.Process_Type_Data.length; i++) {
      if (
        this.Student_Process_.Process_Type_Id ==
        this.Process_Type_Data[i].Process_Type_Id
      )
        this.Process_Type_ = this.Process_Type_Data[i];
    }

debugger
  }

  Delete_Student_Process(Student_Process_Id, index) {
    debugger
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
        // this.issLoading=true;
        debugger
        this.Student_Service_.Delete_Student_Process(
          Student_Process_Id
        ).subscribe(
          (Delete_status) => {
            debugger

            if (Delete_status[0][0].Student_Process_Id_ > 0) {
              this.Student_Process_Data.splice(index, 1);
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Deleted", Type: "false" },
              });
            } else {
              //this.Receipt_Voucher_Data.splice(index, 1);
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Deleted", Type: "false" },
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



  Delete_Student_Remark(Student_Remark_Id, index) {
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
        // this.issLoading=true;

        this.Student_Service_.Delete_Student_Remark(
          Student_Remark_Id
        ).subscribe(
          (Delete_status) => {

            if (Delete_status[0][0].Student_Remark_Id_ > 0) {
              this.Student_Remark_Data.splice(index, 1);
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Deleted", Type: "false" },
              });
            } else {
              //this.Receipt_Voucher_Data.splice(index, 1);
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Deleted", Type: "false" },
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



  Search_ExamResult_Report() {
    {
      this.issLoading = true;
       
      this.Student_Service_.Search_ExamResult_Report(this.Student_Course_.Student_Id, this.Exam_Type_.Exam_Type_Id, this.Student_Course_.Student_Course_Id, this.Student_Course_.Course_Id)
        .subscribe(Rows => {

           

          var ExamResult_Data_Temp = Rows[0];
          var result = [];
          this.ExamResult_columnNames = [];
           
          for (var i in ExamResult_Data_Temp) {
            result.push([
              Number(ExamResult_Data_Temp[i].Mark),
              ExamResult_Data_Temp[i].Exam_Type_Name,
              ExamResult_Data_Temp[i].Exam_Date,
              Number(ExamResult_Data_Temp[i].Mark),

            ]);

          }
           

          this.ExamResult_columnNames.push('Mark')
          this.ExamResult_columnNames.push({ type: 'string', role: 'annotation' })
          this.ExamResult_columnNames.push({ type: 'string', role: 'annotation' })
          this.ExamResult_columnNames.push('Mark')
          this.ExamResult_Chart = result;
          this.Data_Bar = result;


          var ExamResultS_Data_Temp = Rows[1];
          var resultS = [];
          this.ExamResultS_columnNames = [];
           
          for (var i in ExamResultS_Data_Temp) {
            resultS.push([
              Number(ExamResultS_Data_Temp[i].Mark),
              ExamResultS_Data_Temp[i].Exam_Type_Name,
              ExamResultS_Data_Temp[i].Exam_Date,
              Number(ExamResultS_Data_Temp[i].Mark),

            ]);

          }
           

          this.ExamResultS_columnNames.push('Mark')
          this.ExamResultS_columnNames.push({ type: 'string', role: 'annotation' })
          this.ExamResultS_columnNames.push({ type: 'string', role: 'annotation' })
          this.ExamResultS_columnNames.push('Mark')
          this.ExamResultS_Chart = resultS;
          this.Data_BarS = resultS;





          var ExamResultL_Data_Temp = Rows[2];
          var resultL = [];
          this.ExamResultL_columnNames = [];
           
          for (var i in ExamResultL_Data_Temp) {
            resultL.push([
              Number(ExamResultL_Data_Temp[i].Mark),
              ExamResultL_Data_Temp[i].Exam_Type_Name,
              ExamResultL_Data_Temp[i].Exam_Date,
              Number(ExamResultL_Data_Temp[i].Mark),

            ]);

          }
           

          this.ExamResultL_columnNames.push('Mark')
          this.ExamResultL_columnNames.push({ type: 'string', role: 'annotation' })
          this.ExamResultL_columnNames.push({ type: 'string', role: 'annotation' })
          this.ExamResultL_columnNames.push('Mark')
          this.ExamResultL_Chart = resultL;
          this.Data_BarL = resultL;





          var ExamResultW_Data_Temp = Rows[3];
          var resultW = [];
          this.ExamResultW_columnNames = [];
           
          for (var i in ExamResultW_Data_Temp) {
            resultW.push([
              Number(ExamResultW_Data_Temp[i].Mark),
              ExamResultW_Data_Temp[i].Exam_Type_Name,
              ExamResultW_Data_Temp[i].Exam_Date,
              Number(ExamResultW_Data_Temp[i].Mark),

            ]);

          }
           

          this.ExamResultW_columnNames.push('Mark')
          this.ExamResultW_columnNames.push({ type: 'string', role: 'annotation' })
          this.ExamResultW_columnNames.push({ type: 'string', role: 'annotation' })
          this.ExamResultW_columnNames.push('Mark')
          this.ExamResultW_Chart = resultW;
          this.Data_BarW = resultW;



          var ExamResultG_Data_Temp = Rows[4];
          var resultG = [];
          this.ExamResultG_columnNames = [];
           
          for (var i in ExamResultG_Data_Temp) {
            resultG.push([
              Number(ExamResultG_Data_Temp[i].Mark),
              ExamResultG_Data_Temp[i].Exam_Type_Name,
              ExamResultG_Data_Temp[i].Exam_Date,
              Number(ExamResultG_Data_Temp[i].Mark),

            ]);

          }
           

          this.ExamResultG_columnNames.push('Mark')
          this.ExamResultG_columnNames.push({ type: 'string', role: 'annotation' })
          this.ExamResultG_columnNames.push({ type: 'string', role: 'annotation' })
          this.ExamResultG_columnNames.push('Mark')
          this.ExamResultG_Chart = resultG;
          this.Data_BarG = resultG;




          this.issLoading = false;
        },
          Rows => {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            this.issLoading = false;
          });
    }
  }




  Edit_Hostel(Hostel_e: Hostel_Fees_Master, index) {
     
    this.Hostel_Fees_Master_ = Hostel_e;
    this.Hostel_Fees_Master_ = Object.assign({}, Hostel_e);

    this.Hostel_Fees_Master_.From_Date = this.New_Date(new Date(moment(this.Hostel_Fees_Master_.From_Date).format("YYYY-MM-DD")));
    this.Hostel_Fees_Master_.To_Date = this.New_Date(new Date(moment(this.Hostel_Fees_Master_.To_Date).format("YYYY-MM-DD")));
    this.Hostel_Fees_Master_.Checkout_Date = this.New_Date(new Date(moment(this.Hostel_Fees_Master_.Checkout_Date).format("YYYY-MM-DD")));

     

    this.Get_Hostelfeesdetails();

  }



  Delete_Hosteldetails(Hostel_Fees_Master_Id, index) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Do you want to delete ?', Type: true, Heading: 'Confirm' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Yes') {
        this.issLoading = true;
        this.Student_Service_.Delete_Hosteldetails(Hostel_Fees_Master_Id).subscribe(Delete_status => {

          Delete_status = Delete_status[0];
          Delete_status = Delete_status[0].DeleteStatus_.data[0];
          if (Delete_status == 1) {
            // this.Hostel_Fees_Master_Data.splice(index, 1);
            this.Hostel_Fees_Master_Data_t.splice(index, 1);

            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted', Type: "false" } });
            this.clr_Hostelfees();
          }
          else {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
          }
          this.issLoading = false;
        },
          Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
          });
      }
    });
  }




  Search_ExamResult_GraphReport() {
    {
      this.issLoading = true;

      this.Student_Service_.Search_ExamResult_GraphReport(this.Student_.Student_Id, this.Exam_Type_.Exam_Type_Id)
        .subscribe(Rows => {
           
          var ExamResult_Data_Tempr = Rows[0];
          var resultr = [];
          this.ExamResult_columnNamesr = [];
           
          for (var i in ExamResult_Data_Tempr) {
            resultr.push([
              Number(ExamResult_Data_Tempr[i].R),
              ExamResult_Data_Tempr[i].Course_Name,
              Number(ExamResult_Data_Tempr[i].R),

            ]);

          }
           

          this.ExamResult_columnNamesr.push('R')
          this.ExamResult_columnNamesr.push({ type: 'string', role: 'annotation' })
          this.ExamResult_columnNamesr.push('R')
          this.ExamResult_Chartr = resultr;
          this.Data_Barr = resultr;


          var ExamResultS_Data_Temps = Rows[1];
          var resultSs = [];
          this.ExamResultS_columnNamess = [];
           
          for (var i in ExamResultS_Data_Temps) {
            resultSs.push([
              Number(ExamResultS_Data_Temps[i].S),
              ExamResultS_Data_Temps[i].Course_Name,
              Number(ExamResultS_Data_Temps[i].S),

            ]);

          }
           

          this.ExamResultS_columnNamess.push('S')
          this.ExamResultS_columnNamess.push({ type: 'string', role: 'annotation' })
          this.ExamResultS_columnNamess.push('S')
          this.ExamResultS_Charts = resultSs;
          this.Data_BarSs = resultSs;





          var ExamResultL_Data_Templ = Rows[2];
          var resultLl = [];
          this.ExamResultL_columnNamesl = [];
           
          for (var i in ExamResultL_Data_Templ) {
            resultLl.push([
              Number(ExamResultL_Data_Templ[i].L),
              ExamResultL_Data_Templ[i].Course_Name,
              Number(ExamResultL_Data_Templ[i].L),

            ]);

          }
           

          this.ExamResultL_columnNamesl.push('L')
          this.ExamResultL_columnNamesl.push({ type: 'string', role: 'annotation' })
          this.ExamResultL_columnNamesl.push('L')
          this.ExamResultL_Chartl = resultLl;
          this.Data_BarLl = resultLl;





          var ExamResultW_Data_Tempw = Rows[3];
          var resultWw = [];
          this.ExamResultW_columnNamesw = [];
           
          for (var i in ExamResultW_Data_Tempw) {
            resultWw.push([
              Number(ExamResultW_Data_Tempw[i].W),
              ExamResultW_Data_Tempw[i].Course_Name,
              Number(ExamResultW_Data_Tempw[i].W),

            ]);

          }
           

          this.ExamResultW_columnNamesw.push('W')
          this.ExamResultW_columnNamesw.push({ type: 'string', role: 'annotation' })
          this.ExamResultW_columnNamesw.push('W')
          this.ExamResultW_Chartw = resultWw;
          this.Data_BarWw = resultWw;



          var ExamResultG_Data_Tempg = Rows[4];
          var resultGg = [];
          this.ExamResultG_columnNamesg = [];
           
          for (var i in ExamResultG_Data_Tempg) {
            resultGg.push([
              Number(ExamResultG_Data_Tempg[i].G),
              ExamResultG_Data_Tempg[i].Course_Name,
              Number(ExamResultG_Data_Tempg[i].G),

            ]);

          }
           

          this.ExamResultG_columnNamesg.push('G')
          this.ExamResultG_columnNamesg.push({ type: 'string', role: 'annotation' })
          this.ExamResultG_columnNamesg.push('G')
          this.ExamResultG_Chartg = resultGg;
          this.Data_BarG = resultGg;




          this.issLoading = false;
        },
          Rows => {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            this.issLoading = false;
          });
    }
  }



  Get_Student_LastCourse_Click(Student_Course_Id, Course_Id, Installment_Type_Id) {
     
    this.Old_Course_Id = Course_Id;
    this.Course_Id_Edit = Course_Id;
    this.profile_View = false;
    this.Documents_View = false;
    this.Course_View = true;
    this.Fees_View = false;
    this.Remark_View = false
    
    this.Process_View=false;
    this.Resumesending_View = false;
    this.Interview_View = false;
    this.Placement_View = false;

    this.Course_Details_View = false;
    this.Resume_Sending_View = false;
    this.Course_Tab = true;
    this.clickview = true;




    this.Student_Service_.Get_Student_LastCourse_Click(
      this.Student_.Student_Id,
      Student_Course_Id,
      Installment_Type_Id
    ).subscribe(
      (Rows) => {
        this.Student_Course_Data = Rows[0];

        if (this.Student_Course_Data.length > 0) {

          this.Student_Course_ = this.Student_Course_Data[0];

          this.Course_Temp.Course_Id = this.Student_Course_.Course_Id;
          this.Course_Temp.Course_Name = this.Student_Course_.Course_Name;
          this.course_name = this.Student_Course_.Course_Name;
          this.Course_ = Object.assign(this.Course_Temp);

          this.Batch_Temp.Batch_Id = this.Student_Course_.Batch_Id;
          this.Batch_Temp.Batch_Name = this.Student_Course_.Batch_Name;
          this.Batch_ = Object.assign(this.Batch_Temp);

          this.Faculty_Temp.Users_Id = this.Student_Course_.Faculty_Id;
          this.Faculty_Temp.Users_Name = this.Student_Course_.Faculty_Name;
          this.Faculty_ = Object.assign(this.Faculty_Temp);

          for (var i = 0; i < this.Installment_Type_Data.length; i++) {
            if (
              this.Student_Course_.Installment_Type_Id ==
              this.Installment_Type_Data[i].Installment_Type_Id
            )
              this.Installment_Type = this.Installment_Type_Data[i];
          }


          for (var i = 0; i < this.MarkStatus_Type_Data.length; i++) {
            if (
              this.Student_Course_.Markstatus_Id ==
              this.MarkStatus_Type_Data[i].Markstatus_Id
            )
              this.MarkStatus_Type = this.MarkStatus_Type_Data[i];
          }


          for (var i = 0; i < this.Laptopdetails_Data.length; i++) {
            if (
              this.Student_Course_.Laptop_details_Id ==
              this.Laptopdetails_Data[i].Laptop_details_Id
            )
              this.Laptopdetails_ = this.Laptopdetails_Data[i];
          }



          this.Course_Id_Edit = this.Student_Course_.Course_Id;
          // this.Student_Course_Id_Edit = this.Student_Course_.Student_Course_Id;
           
          this.Student_Course_.Student_Course_Id = this.StudentcourseIdTemp;
        }




        this.Student_Course_Subject_Data = Rows[1];

        this.Student_Fees_Installment_Save_Data = Rows[2];


        this.Student_Fees_Installment_Details_Data = Rows[2];
        this.Hostel_Fees_Master_ = Object.assign({}, Rows[3][0]);
        this.Hostel_Fees_Details_Data = Rows[4];
        var Student_Fees_Installment_Master_Id = 0;
        var Student_Fees_Installment_Master_Id_temp = 0;
        var Student_Fees_Installment_Master_Index = -1;
        this.Student_Fees_Installment_Master_Data = [];
        this.Student_Fees_Installment_Details_Data = [];

        // for ( var i = 0;i < this.Hostel_Fees_Details_Data.length;i++) {

        //   // this.Hostel_Fees_Master_Temp =new Hostel_Fees_Master();
        //   this.Hostel_Fees_details_.Paid_Amount = this.Hostel_Fees_Details_Data[i].Paid_Amount;
        //   this.Hostel_Fees_details_.Balance_Amount = this.Hostel_Fees_Details_Data[i].Balance_Amount;
        //   this.Hostel_Fees_details_.Amount = this.Hostel_Fees_Details_Data[i].Amount;
        //   this.Hostel_Fees_details_.Date = this.Hostel_Fees_Details_Data[i].Date;
        //   }
        for (
          var i = 0;
          i < this.Student_Fees_Installment_Save_Data.length;
          i++
        ) {
          Student_Fees_Installment_Master_Id_temp =
            this.Student_Fees_Installment_Save_Data[i]
              .Student_Fees_Installment_Master_Id;
          if (
            Student_Fees_Installment_Master_Id !=
            Student_Fees_Installment_Master_Id_temp
          ) {
            this.Student_Fees_Installment_Master_ =
              new Student_Fees_Installment_Master();
            this.Student_Fees_Installment_Master_.Amount =
              this.Student_Fees_Installment_Save_Data[i].Amount;
            this.Student_Fees_Installment_Master_.Tax =
              this.Student_Fees_Installment_Save_Data[i].Tax;
            this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id =
              this.Student_Fees_Installment_Save_Data[
                i
              ].Student_Fees_Installment_Master_Id;
            this.Student_Fees_Installment_Master_.Course_Fees_Id =
              this.Student_Fees_Installment_Save_Data[i].Course_Fees_Id;
            this.Student_Fees_Installment_Master_.Fees_Type_Id =
              this.Student_Fees_Installment_Save_Data[i].Fees_Type_Id;
            this.Student_Fees_Installment_Master_.Fees_Type_Name =
              this.Student_Fees_Installment_Save_Data[i].Fees_Type_Name;
            this.Student_Fees_Installment_Master_.No_Of_Instalment =
              this.Student_Fees_Installment_Save_Data[i].No_Of_Instalment;
            this.Student_Fees_Installment_Master_.Instalment_Period =
              this.Student_Fees_Installment_Save_Data[i].Instalment_Period;
              this.Student_Fees_Installment_Details_Temp.Is_Associate =
              this.Student_Fees_Installment_Save_Data[i].Is_Associate;
              this.Student_Fees_Installment_Details_Temp. Is_Agent =
              this.Student_Fees_Installment_Save_Data[i]. Is_Agent;



            this.Fees_Master_Id =
              this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id;
            this.Student_Fees_Installment_Master_Data.push(
              Object.assign({}, this.Student_Fees_Installment_Master_)
            );
            Student_Fees_Installment_Master_Index =
              Student_Fees_Installment_Master_Index + 1;
            this.Student_Fees_Installment_Master_Data[
              Student_Fees_Installment_Master_Index
            ].Student_Fees_Installment_Details =
              this.Student_Fees_Installment_Details_Data;

            this.Student_Fees_Installment_Details_Data = [];
            this.Student_Fees_Installment_Details_Temp =
              new Student_Fees_Installment_Details();
            this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id =
              this.Student_Fees_Installment_Save_Data[
                i
              ].Student_Fees_Installment_Details_Id;
            this.Student_Fees_Installment_Details_Temp.Instalment_Date =
              this.Student_Fees_Installment_Save_Data[i].Instalment_Date;
            this.Student_Fees_Installment_Details_Temp.Fees_Amount =
              this.Student_Fees_Installment_Save_Data[i].Fees_Amount;
            this.Student_Fees_Installment_Details_Temp.Balance_Amount =
              this.Student_Fees_Installment_Save_Data[i].Balance_Amount;
            this.Student_Fees_Installment_Details_Temp.Status =
              this.Student_Fees_Installment_Save_Data[i].Status;
              this.Student_Fees_Installment_Details_Temp.Is_Associate =
              this.Student_Fees_Installment_Save_Data[i].Is_Associate;

              this.Student_Fees_Installment_Details_Temp. Is_Agent =
              this.Student_Fees_Installment_Save_Data[i]. Is_Agent;

            this.Student_Fees_Installment_Details_Temp.Tax_Percentage = 18;
            // this.Student_Fees_Installment_Save_Data[i].Tax_Percentage

            this.Student_Fees_Installment_Details_Data.push(
              Object.assign({}, this.Student_Fees_Installment_Details_Temp)
            );
            this.Student_Fees_Installment_Master_Data[
              Student_Fees_Installment_Master_Index
            ].Student_Fees_Installment_Details =
              this.Student_Fees_Installment_Details_Data;
          } else {
            this.Student_Fees_Installment_Details_Temp =
              new Student_Fees_Installment_Details();
            this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id =
              this.Student_Fees_Installment_Save_Data[
                i
              ].Student_Fees_Installment_Details_Id;
            this.Student_Fees_Installment_Details_Temp.Instalment_Date =
              this.Student_Fees_Installment_Save_Data[i].Instalment_Date;
            this.Student_Fees_Installment_Details_Temp.Fees_Amount =
              this.Student_Fees_Installment_Save_Data[i].Fees_Amount;
            this.Student_Fees_Installment_Details_Temp.Balance_Amount =
              this.Student_Fees_Installment_Save_Data[i].Balance_Amount;
              this.Student_Fees_Installment_Details_Temp.Is_Associate =
              this.Student_Fees_Installment_Save_Data[i].Is_Associate;
              this.Student_Fees_Installment_Details_Temp. Is_Agent =
              this.Student_Fees_Installment_Save_Data[i]. Is_Agent;


            this.Student_Fees_Installment_Details_Temp.Status =
              this.Student_Fees_Installment_Save_Data[i].Status;
            this.Student_Fees_Installment_Details_Temp.Tax_Percentage = 18;
            // this.Student_Fees_Installment_Save_Data[i].Tax_Percentage
            this.Student_Fees_Installment_Details_Data.push(
              Object.assign({}, this.Student_Fees_Installment_Details_Temp)
            );
            this.Student_Fees_Installment_Master_Data[
              Student_Fees_Installment_Master_Index
            ].Student_Fees_Installment_Details =
              this.Student_Fees_Installment_Details_Data;
          }
          Student_Fees_Installment_Master_Id =
            this.Student_Fees_Installment_Save_Data[i]
              .Student_Fees_Installment_Master_Id;
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

  Last_course_click() {
     
    this.issLoading = true;
    this.profile_View = false;
    this.Documents_View = false;
    // this.Show_FollowUp=false;
    this.profile_View_followup = false;
    this.Course_View = false;
    this.Hostel_View = false;
    this.Fees_View = false;
    this.ExamResult_View = false;
    this.ExamGraph_View = false;
    this.Remark_View = false;
    
    this.Process_View=false;
    this.Attendance_View = false;
    this.Course_Details_View = false;

    this.coursedetails_Edit = true;

    this.Get_Student_LastCourse_Click(
      this.StudentcourseIdTemp,
      this.Course_Id_Edit,
      // this.Student_Course_.Student_Course_Id,
      this.Installment_Type.Installment_Type_Id
    );

    // this.Student_Service_.Get_Course_Details_Student_Check(
    // this.Student_.Student_Id,
    // ).subscribe(
    // (Rows) => {


    // this.Student_Course_Click_Data = Rows[0];



    // this.issLoading = false;


    // if (this.Student_Course_Click_Data.length ==0)
    //  {
    //   this.coursedetails_Edit=true;
    //  }
    //  else
    //  {
    //   if (this.Edit_Student_CourseDetails != undefined && this.Edit_Student_CourseDetails != null)
    //   {

    //   this.coursedetails_Edit=this.Edit_Student_CourseDetails.Edit;  
    //   }
    //   else
    //   this.coursedetails_Edit=false;
    //  }

    // if (this.Student_Course_Click_Data.length <= 1)
    //  {

    // this.Course_Tab = true;
    // this.clickview = true;
    // this.Tab_Click(2);
    // if (this.Student_Course_Click_Data.length == 1)
    // this.Get_Student_LastCourse_Click(
    // this.Student_Course_Click_Data[0].Student_Course_Id,
    // this.Student_Course_Click_Data[0].Course_Id,
    // this.Installment_Type.Installment_Type_Id
    // );
    // } else 
    // {
    // this.coursedetails_Edit=true;
    // this.Course_Tab = true;
    // this.clickview = false;
    // this.Tab_Click(4);
    // }

    // this.issLoading = false;
    // },
    // (Rows) => {
    // this.issLoading = false;
    // }
    // );
  }



  course_click_search(Student_Id, Registered, Student_Name) {
    this.issLoading = true;
    this.profile_View = false;
    this.Documents_View = false;

    this.Show_FollowUp = true;

    this.profile_View_followup = false;
     
    this.Student_Name = Student_Name;

    this.Student_Id_Edit = Student_Id;

    this.Course_View = true;
    this.Hostel_View = true;
    this.Fees_View = true;
    this.ExamResult_View = true;
    this.ExamGraph_View = true;
    this.Attendance_View = true;

    if (Registered == true) {
      this.Registration = true;
    }
    else {
      this.Registration = false;
    }


    this.Remark_View = false;
    this.Entry_View = true;
    
    this.Process_View=false;
    this.Course_View = true;
    this.Course_Tab = true;
    this.clickview = true;
    this.Student_.Student_Id = Student_Id;

     
    this.View_Student_Click_s(Student_Id)
    this.Student_Service_.Get_Course_Details_Student_Check(
      Student_Id
    ).subscribe(
      (Rows) => {

         
        this.Student_Course_Click_Data = Rows[0];
        // if(this.Student_Course_Click_Data[0][0].Registered==1)
        // {
        //   this.Registration=true
        // }


        this.issLoading = false;


        if (this.Student_Course_Click_Data.length == 0) {
          this.coursedetails_Edit = true;
        }
        else {
          if (this.Edit_Student_CourseDetails != undefined && this.Edit_Student_CourseDetails != null) {

            this.coursedetails_Edit = this.Edit_Student_CourseDetails.Edit;
          }
          else
            this.coursedetails_Edit = false;
        }

        if (this.Student_Course_Click_Data.length <= 1) {

          this.Course_Tab = true;
          this.clickview = true;
          this.Tab_Click(2);
          if (this.Student_Course_Click_Data.length == 1)
             

          this.Get_Student_Course_Click(this.Student_Course_Click_Data[0].Student_Id,
            this.Student_Course_Click_Data[0].Student_Course_Id,
            this.Student_Course_Click_Data[0].Course_Id,

          );

        } else {
          this.coursedetails_Edit = true;
          this.Course_Tab = true;
          this.clickview = false;
          this.Tab_Click(4);
        }

        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }

  View_Student_Click_s(Student_Id) {
    this.View_History_ = true;
    this.Show_FollowUp = true;
    this.Show_Followup_History = true;
    this.Course_Details_View = false;

    this.Edit_Student(
      Student_Id,
      this.Mail_sms_Status,
      this.Status_Id,
      this.Student_EditIndex
    );
    // this.Edit_Student(this.Student_Data[0], this.Student_EditIndex);
  }


  Get_AttendanceofStudents() {
    this.issLoading = true;
     
    this.Student_Service_.Get_AttendanceofStudents(this.Student_Course_.Student_Id, this.Student_Course_.Course_Id).subscribe((Rows) => {
       
      this.issLoading = false;
      this.Student_Attendance_Data = Rows[0];
    },
      (Rows) => {
         
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occured", Type: false },
        });
      }
    );

  }



  View_Student_Click_level() {
    this.View_History_ = true;
    this.Show_FollowUp = true;
    this.Show_Followup_History = true;

    this.Edit_Student(
      this.Student_Id,
      this.Mail_sms_Status,
      this.Status_Id,
      this.Student_EditIndex
    );
    // this.Edit_Student(this.Student_Data[0], this.Student_EditIndex);
  }






  Create_Application() {
    this.Applicationmodal_View = true;
    this.application_details_View = false;
    this.ApplicationDetails_.Offer_Received = false;
    this.ApplicationDetails_.Feespaymentcheck = false;

    this.ApplicationDetails_.Duration_Id = 0;
    // Clr_ApplicationDetails() 
    // this.closei();

    // this.Clr_ApplicationDetails();
  }


  Delete_Application_Details(Application_details_Id, index) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
      panelClass: "Dialogbox-Class",
      data: {
        Message: "Do you want to delete ?",
        Type: true,
        Heading: "Confirm",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Yes") {
        this.issLoading = true;
        this.Student_Service_.Delete_Application_Details(
          Application_details_Id
        ).subscribe(
          (Delete_status) => {
            Delete_status = Delete_status[0];
            Delete_status = Delete_status[0].DeleteStatus_;
            if (Delete_status == 1) {
              this.ApplicationDetails_Data.splice(index, 1);
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Deleted", Type: false },
              });
              this.Clr_ApplicationDetails();
              this.Get_ApplicationDetails();
            } else {
              this.issLoading = false;
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Error Occured", Type: 2 },
              });
            }
            this.issLoading = false;
          },
          (Rows) => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: 2 },
            });
          }
        );
      }
    });
  }
  Clr_ApplicationDetails() {

    this.ApplicationDetails_.Application_Details_Id = 0;

    this.ApplicationDetails_.User_Id = 0;
    this.ApplicationDetails_.IELTS_Listening = 0;
    this.ApplicationDetails_.IELTS_Reading = 0;
    this.ApplicationDetails_.IELTS_Speaking = 0;
    this.ApplicationDetails_.IELTS_Writting = 0;
    this.ApplicationDetails_.Student_Id = 0;
    this.ApplicationDetails_.Application_details_Id = 0;
    this.ApplicationDetails_.Date_Of_Applying = new Date();
    this.ApplicationDetails_.Date_Of_Applying = this.New_Date(
      this.ApplicationDetails_.Date_Of_Applying
    );
    this.ApplicationDetails_.Fees_Payment_Last_Date = new Date();
    this.ApplicationDetails_.Fees_Payment_Last_Date = this.New_Date(
      this.ApplicationDetails_.Fees_Payment_Last_Date
    );
    this.ApplicationDetails_.Remark = "";
    this.ApplicationDetails_.Course_Link = "";
    this.Course_Link_Button = false;

    this.ApplicationDetails_.Living_Expense = "";
    this.ApplicationDetails_.Preference = "";
    this.ApplicationDetails_.Course_Fee = "";
    this.Save_Student_Approved_Status = 0;
    this.Bph_Approved_Status = 1;
    this.ApplicationDetails_.Application_Fees = "";

    this.ApplicationDetails_.Feespaymentcheck = false;
    this.ApplicationDetails_.Offer_Received = false;
    this.ApplicationDetails_.Portal_User_Name = "";
    this.ApplicationDetails_.Password = "";
    this.Duration_Id = 0;

    this.ApplicationDetails_.Offer_Student_Id = "";

    this.ApplicationDetails_.Application_No = "";
    this.ApplicationDetails_.Student_Reference_Id = "";
    this.ApplicationDocument_Array = [];
    this.ImageFile_Application = [];
    this.ApplicationDocument_File_Array = [];
    this.Application_Country_ = null;
    this.University_1 = null;
    this.Course_ = null;
    this.Application_Course_ = null;
    this.Application_University_ = null;
    this.Application_Country_ = null;

    if (this.Intake_Mode_Data != null && this.Intake_Mode_Data != undefined)
      this.Intake_Mode_ = this.Intake_Mode_Data[0];
    if (
      this.Intake_Year_Mode_Data != null &&
      this.Intake_Year_Mode_Data != undefined
    )
      this.Intake_Year_Mode_ = this.Intake_Year_Mode_Data[0];
    if (this.Agent_Mode_Data != null && this.Agent_Mode_Data != undefined)
      this.Agent_Mode_ = this.Agent_Mode_Data[0];
    if (
      this.Application_Status_Mode_Data != null &&
      this.Application_Status_Mode_Data != undefined
    )
      this.Application_Status_Mode_ = this.Application_Status_Mode_Data[0];
    this.ApplicationDocument_Description = "";
    this.Display_ApplicationFile_ = "";

    this.Change_Status_View = false;
    this.ApplicationDetails_.Application_Status_Remark = "";

    if (
      this.Application_Status_Data != null &&
      this.Application_Status_Data != undefined
    )
      this.Application_Status_ = this.Application_Status_Data[0];


      this.ApplicationDetails_.Passed = false;
      this.ApplicationDetails_.Failed = false;

      if (
        this.German_Course_Data != null &&
        this.German_Course_Data != undefined
      )
        this.German_Course_ = this.German_Course_Data[0];

  }
  Edit_ApplicationDetails(Applicationdetails_e: any, index) {

     
    let top = document.getElementById("Topdiv");
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
    this.Create_Application();

    // this.Clr_ApplicationDetails();
    // this.ApplicationDetails_=Applicationdetails_e
    // this.ApplicationDetails_ = Object.assign({},Applicationdetails_e);

    // this.Student_Service_.Get_ApplicationDetails(this.Student_.Student_Id).subscribe(Rows =>{
    //  this.ApplicationDetails_= Object.assign({},Rows[0][0]);

    this.ApplicationDetails_ = Applicationdetails_e;
     
    if (this.ApplicationDetails_.To_User_Id != this.Login_User) {
      this.Edit_save_button_view = false;
    }

    this.ApplicationDetails_ = Object.assign({}, Applicationdetails_e);
    this.Save_Student_Approved_Status =
      Applicationdetails_e.Student_Approved_Status;
    this.Bph_Approved_Status = Applicationdetails_e.Bph_Approved_Status;
    // this.Old_Application_Status_Id =
    //   this.ApplicationDetails_.Application_status_Id;

    if (
      this.ApplicationDetails_.Duration_Id == 0 ||
      this.ApplicationDetails_.Duration_Id == null
    ) {
      this.Duration_Id = 0;
    } else this.Duration_Id = this.ApplicationDetails_.Duration_Id;




     

    this.ApplicationDetails_.Application_Fees = String(this.ApplicationDetails_.Fees);
    this.Application_Course_Temp.Application_Course_Id = this.ApplicationDetails_.Course_Id;
    this.Application_Course_Temp.Application_Course_Name = this.ApplicationDetails_.Course_Name;
    this.Application_Course_ = Object.assign({}, this.Application_Course_Temp);

    this.Application_University_Temp.Application_University_Id = this.ApplicationDetails_.University_Id;
    this.Application_University_Temp.Application_University_Name = this.ApplicationDetails_.University_Name;
    this.Application_University_ = Object.assign({}, this.Application_University_Temp);


    this.Country_Temp.Country_Id = this.ApplicationDetails_.Country_Id;
    this.Country_Temp.Country_Name = this.ApplicationDetails_.Country_Name;
    this.Application_Country_ = Object.assign({}, this.Country_Temp);



    for (var i = 0; i < this.Intake_Mode_Data.length; i++) {
      if (
        this.ApplicationDetails_.intake_Id ==
        this.Intake_Mode_Data[i].Intake_Id
      )
        this.Intake_Mode_ = this.Intake_Mode_Data[i];
    }


    for (var i = 0; i < this.Intake_Year_Mode_Data.length; i++) {
      if (
        this.ApplicationDetails_.Intake_Year_Id ==
        this.Intake_Year_Mode_Data[i].Intake_Year_Id
      )
        this.Intake_Year_Mode_ = this.Intake_Year_Mode_Data[i];
    }


    for (var i = 0; i < this.German_Course_Data.length; i++) {
      if (
        this.ApplicationDetails_.German_Course_Id ==
        this.German_Course_Data[i].Course_Id
      )
        this.German_Course_ = this.German_Course_Data[i];
    }


    this.Duration_Id = this.ApplicationDetails_.Duration_Id


    if (this.ApplicationDetails_.Course_Link != "" && this.ApplicationDetails_.Course_Link != null && this.ApplicationDetails_.Course_Link != undefined) {
      this.Course_Link_Button = true;
    }

    if (this.ApplicationDetails_.Application_Source == 0) {
      this.ApplicationDetails_.Course_Id = 0;
      this.ApplicationDetails_.University_Id = 0;
    }

    // if (this.ApplicationDetails_.Feespaymentcheck.toString() == "1")
    //   this.ApplicationDetails_.Feespaymentcheck = true;
    // else this.ApplicationDetails_.Feespaymentcheck = false;
    // if (this.ApplicationDetails_.Fees_Payment_Last_Date == null) {
    //   this.ApplicationDetails_.Fees_Payment_Last_Date = new Date();
    //   this.ApplicationDetails_.Fees_Payment_Last_Date = this.New_Date(
    //     this.ApplicationDetails_.Fees_Payment_Last_Date
    //   );
    // } else
    //   this.ApplicationDetails_.Fees_Payment_Last_Date = this.New_Date(
    //     new Date(
    //       moment(this.ApplicationDetails_.Fees_Payment_Last_Date).format(
    //         "YYYY-MM-DD"
    //       )
    //     )
    //   );

    // if (this.ApplicationDetails_.Offer_Received.toString() == "1")
    //   this.ApplicationDetails_.Offer_Received = true;
    // else this.ApplicationDetails_.Offer_Received = false;

    if (this.ApplicationDetails_.Date_Of_Applying == null) {
      this.ApplicationDetails_.Date_Of_Applying = new Date();
      this.ApplicationDetails_.Date_Of_Applying = this.New_Date(
        this.ApplicationDetails_.Date_Of_Applying
      );
    } else
      this.ApplicationDetails_.Date_Of_Applying = this.New_Date(
        new Date(
          moment(this.ApplicationDetails_.Date_Of_Applying).format("YYYY-MM-DD")
        )
      );

    if (this.ApplicationDetails_.Fees_Payment_Last_Date == null) {
      this.ApplicationDetails_.Fees_Payment_Last_Date = new Date();
      this.ApplicationDetails_.Fees_Payment_Last_Date = this.New_Date(
        this.ApplicationDetails_.Fees_Payment_Last_Date
      );
    } else
      this.ApplicationDetails_.Fees_Payment_Last_Date = this.New_Date(
        new Date(
          moment(this.ApplicationDetails_.Fees_Payment_Last_Date).format(
            "YYYY-MM-DD"
          )
        )
      );

    for (var i = 0; i < this.Agent_Mode_Data.length; i++) {
      if (this.ApplicationDetails_.Agent_Id == this.Agent_Mode_Data[i].Agent_Id)
        this.Agent_Mode_ = this.Agent_Mode_Data[i];
    }

    // for (var i = 0; i < this.Application_Status_Mode_Data.length; i++) {
    // 	if (
    // 		this.ApplicationDetails_.Application_status_Id ==
    // 		this.Application_Status_Mode_Data[i].Application_status_Id
    // 	)
    // 		this.Application_Status_Mode_ = this.Application_Status_Mode_Data[i];
    // }
    for (var i = 0; i < this.Intake_Mode_Data.length; i++) {
      if (
        this.ApplicationDetails_.intake_Id == this.Intake_Mode_Data[i].Intake_Id
      )
        this.Intake_Mode_ = this.Intake_Mode_Data[i];
    }
    for (var i = 0; i < this.Intake_Year_Mode_Data.length; i++) {
      if (
        this.ApplicationDetails_.Intake_Year_Id ==
        this.Intake_Year_Mode_Data[i].Intake_Year_Id
      )
        this.Intake_Year_Mode_ = this.Intake_Year_Mode_Data[i];
    }

    this.Country_Temp.Country_Id = this.ApplicationDetails_.Country_Id;
    this.Country_Temp.Country_Name = this.ApplicationDetails_.Country_Name;
    this.Application_Country_ = Object.assign({}, this.Country_Temp);

    this.University_Temp.University_Id = this.ApplicationDetails_.University_Id;
    this.University_Temp.University_Name =
      this.ApplicationDetails_.University_Name;
    this.University_1 = Object.assign({}, this.University_Temp);

    this.Course_Temp.Course_Id = this.ApplicationDetails_.Course_Id;
    this.Course_Temp.Course_Name = this.ApplicationDetails_.Course_Name;
    this.Course_ = Object.assign({}, this.Course_Temp);




    //
    // this.Document_Array= Rows[1];
    // this.Document_File_Array=[];
    // for(var i=0;i<this.Document_Array.length;i++)
    // this.Document_File_Array.push('')

    this.Get_Application_DocumentList(
      this.ApplicationDetails_.Application_details_Id
    );

    this.Activte_Visiblility = false;
    this.Remove_Activte_Visiblility = false;

    if (this.ApplicationDetails_.Activation_Status == true) {
      if (
        this.Remove_Activity_Permissions != undefined &&
        this.Remove_Activity_Permissions != null
      )
        if (this.Remove_Activity_Permissions.View == true)
          this.Remove_Activte_Visiblility = true;
    } else {
      if (
        this.Activity_Permissions != undefined &&
        this.Activity_Permissions != null
      )
        if (this.Activity_Permissions.View == true)
          this.Activte_Visiblility = true;
    }

    // this.issLoading = false;
    // } ,
    // Rows => {
    // this.issLoading = false;
    // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    // });
    //  this.Get_ApplicationDetails();

    //  this.Get_ApplicationDetailswise_History(this.ApplicationDetails_.Application_details_Id);
  }

  Get_ApplicationDetails() {
    //  this.Clr_ApplicationDetails();
     
    this.issLoading = true;
    this.ApplicationDetails_.Date_Of_Applying = new Date();
    this.ApplicationDetails_.Date_Of_Applying = this.New_Date(
      this.ApplicationDetails_.Date_Of_Applying
    );
    this.ApplicationDetails_.Date_Of_Applying = this.New_Date(
      new Date(
        moment(this.ApplicationDetails_.Date_Of_Applying).format("YYYY-MM-DD")
      )
    );

    this.ApplicationDetails_.Fees_Payment_Last_Date = new Date();
    this.ApplicationDetails_.Fees_Payment_Last_Date = this.New_Date(
      this.ApplicationDetails_.Fees_Payment_Last_Date
    );
    this.ApplicationDetails_.Fees_Payment_Last_Date = this.New_Date(
      new Date(
        moment(this.ApplicationDetails_.Fees_Payment_Last_Date).format(
          "YYYY-MM-DD"
        )
      )
    );
     
    this.Student_Service_.Get_ApplicationDetails(
      this.Student_.Student_Id
    ).subscribe(
      (Rows) => {
         
        this.ApplicationDetails_Data = Rows[0];
        
        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }



  Get_Application_DocumentList(application_details_id) {
    //    this.Clr_ApplicationDetails();
    this.issLoading = true;
    this.Student_Service_.Get_Application_DocumentList(
      application_details_id
    ).subscribe(
      (Rows) => {
        this.ApplicationDocument_Array = Rows[0];
        this.ApplicationDocument_File_Array = [];
        for (var i = 0; i < this.ApplicationDocument_Array.length; i++)
          this.ApplicationDocument_File_Array.push("");
        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }


  Get_ApplicationDetailswise_History(application_details_id_, student_id_) {
    this.History_View = true;
    this.Change_Status_View = false;
    this.application_details_View = false;
    // this.Qualification_details_View = false;
    // this.language_details_View = false;
    // this.FeesId_History = feesdetails_id_;
    this.Clr_ApplicationDetails();
    this.issLoading = true;

     
    this.Student_Service_.Get_ApplicationDetailswise_History(
      application_details_id_,
      student_id_
    ).subscribe(
      (Rows) => {
        // const dialogRef = this.dialogBox.open( StudentComponent);

        this.ApplicationdetailsHistory_Data = Rows[0];
        for (var i = 0; i < this.ApplicationdetailsHistory_Data.length; i++) {
          if (this.ApplicationdetailsHistory_Data[i].Duration_Id == 1) {
            this.ApplicationdetailsHistory_Data[i].Duration_Name = "1 Year"
          }

          if (this.ApplicationdetailsHistory_Data[i].Duration_Id == 2) {
            this.ApplicationdetailsHistory_Data[i].Duration_Name = "2 Year"
          }

          if (this.ApplicationdetailsHistory_Data[i].Duration_Id == 3) {
            this.ApplicationdetailsHistory_Data[i].Duration_Name = "3 Year"
          }

          if (this.ApplicationdetailsHistory_Data[i].Duration_Id == 4) {
            this.ApplicationdetailsHistory_Data[i].Duration_Name = "4 Year"
          }

        }

        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }

  Change_Application_Status_Click(application_details_id_, student_id_) {
     
    this.Change_Status_View = true;
    this.application_details_View = false;
    this.History_View = false;
    // this.Change_Application_Status(application_details_id_, student_id_)

    this.ApplicationDetails_.Application_details_Id = application_details_id_;
    this.ApplicationDetails_.Student_Id = student_id_;
  }


  //                     Change_Application_Status() {
  //  
  //                       if(this.Application_Status_.Application_Status_Id == 0||this.Application_Status_.Application_Status_Id ==null||this.Application_Status_.Application_Status_Id ==undefined)
  //                      {
  //                       const dialogRef = this.dialogBox.open(DialogBox_Component, {
  //                         panelClass: "Dialogbox-Class",
  //                         data: { Message: "Select Application Status", Type: "3" },
  //                       });
  //                       return;
  //                      }

  //                      var status_id=0,remark="";
  //                      status_id = this.Application_Status_.Application_Status_Id;
  //                      remark = this.ApplicationDetails_.Application_Status_Remark
  //                       // this.History_View = true;
  //                       this.Change_Status_View = true;
  //                       this.application_details_View = false;
  //                       this.Clr_ApplicationDetails();
  //                       this.issLoading = true;

  //                        
  //                       this.Student_Service_.Change_Application_Status(
  //                         this.ApplicationDetails_.Application_details_Id,
  //                         this.ApplicationDetails_.Student_Id,status_id,remark
  //                       ).subscribe(
  //                         (Rows) => {
  //                           // const dialogRef = this.dialogBox.open( StudentComponent);

  //                           this.ApplicationdetailsHistory_Data = Rows[0];

  //                           this.issLoading = false;
  //                         },
  //                         (Rows) => {
  //                           this.issLoading = false;
  //                         }
  //                       );
  //                     }






  Change_Application_Status() {
     
    this.ApplicationDetails_.Application_Status_Remark = this.ApplicationDetails_.Remark;


    if (this.Application_Status_.Application_Status_Id == 0 || this.Application_Status_.Application_Status_Id == null || this.Application_Status_.Application_Status_Id == undefined) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Status", Type: "3" },
      });
      return;
    }

     
    if (this.ApplicationDetails_.Remark == "" || this.ApplicationDetails_.Remark == null || this.ApplicationDetails_.Remark == undefined) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Enter Remark", Type: "3" },
      });
      return;
    }

    var status_id = 0, remark = "";
    status_id = this.Application_Status_.Application_Status_Id;
    remark = this.ApplicationDetails_.Application_Status_Remark
    // this.History_View = true;
    this.Change_Status_View = true;
    this.application_details_View = false;

     
    this.issLoading = true;
     
    this.Student_Service_.Change_Application_Status(
      this.ApplicationDetails_.Application_details_Id,
      this.ApplicationDetails_.Student_Id, status_id, remark
    ).subscribe(
      (Save_ApplicationDetails) => {
         
        Save_ApplicationDetails = Save_ApplicationDetails[0];
        console.log('Save_ApplicationDetails: ', Save_ApplicationDetails);

        if (Number(Save_ApplicationDetails[0].Application_details_Id_) > 0) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved", Type: "false" },
          });
          this.Get_ApplicationDetails()
          this.Clr_ApplicationDetails();
          this.Close_Application();
        } else {
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
          data: { Message: Rows.error.error, Type: "2" },
        });
      }
    );
  }


  Close_Application() {
    this.Applicationmodal_View = false;
    this.application_details_View = true;
    this.Edit_save_button_view = true;
    this.Change_Status_View = false;
    this.Clr_ApplicationDetails();
  }


  Fill_Applicationdetails() {

    this.History_View = false;
    this.Change_Status_View = false;
    //    this.Historydata_View=false;

    this.ApplicationDetails_.Date_Of_Applying = this.New_Date(
      new Date(
        moment(this.ApplicationDetails_.Date_Of_Applying).format("YYYY-MM-DD")
      )
    );

    this.ApplicationDetails_.Fees_Payment_Last_Date = this.New_Date(
      new Date(
        moment(this.ApplicationDetails_.Fees_Payment_Last_Date).format(
          "YYYY-MM-DD"
        )
      )
    );

    if (this.ApplicationDetails_.Course_Link == null || this.ApplicationDetails_.Course_Link == undefined) {
      this.ApplicationDetails_.Course_Link = "";

    }

    if (this.ApplicationDetails_.Remark == null || this.ApplicationDetails_.Remark == undefined) {
      this.ApplicationDetails_.Remark = "";

    }

    this.ApplicationDetails_.Intake_Year_Id =
      this.Intake_Year_Mode_.Intake_Year_Id;
    this.ApplicationDetails_.Intake_Year_Name =
      this.Intake_Year_Mode_.Intake_Year_Name;
    this.ApplicationDetails_.intake_Name = this.Intake_Mode_.Intake_Name;
    this.ApplicationDetails_.intake_Id = this.Intake_Mode_.Intake_Id;
    this.ApplicationDetails_.User_Id = Number(this.Login_User);
    //   this.ApplicationDetails_.Agent_Name=this.Agent_Mode_.Agent_Name;
    this.ApplicationDetails_.Application_Status_Name =
      this.Application_Status_Mode_.Application_Status_Name;
    // this.ApplicationDetails_.Application_status_Id =
    //   this.Application_Status_Mode_.Application_status_Id;
    this.ApplicationDetails_.Student_Id = this.Student_.Student_Id;
    this.ApplicationDetails_.Student_Approved_Status =
      this.Save_Student_Approved_Status;
    this.ApplicationDetails_.Bph_Approved_Status = this.Bph_Approved_Status;
    this.ApplicationDetails_.Duration_Id = Number(this.Duration_Id);

    // if (
    // 	this.Old_Application_Status_Id != this.Application_Status_Mode_.Application_status_Id &&
    // 	(this.Application_Status_Mode_.Application_status_Id==9 ||this.Application_Status_Mode_.Application_status_Id==10 ))
    // 	{
    // 	const dialogRef = this.dialogBox.open(DialogBox_Component, {
    // 		panelClass: "Dialogbox-Class",
    // 		data: { Message: "Select not allowed", Type: "3" },
    // 	});
    // 	this.issLoading=false;
    // 	return;
    // }

    if (
      this.University_1.University_Id == undefined ||
      this.University_1.University_Id == null
    ) {
      this.ApplicationDetails_.University_Id = 0;
      this.ApplicationDetails_.University_Name = String(this.University_1);
    } else {
      this.ApplicationDetails_.University_Name =
        this.University_1.University_Name;
      this.ApplicationDetails_.University_Id = this.University_1.University_Id;
    }

    if (this.Course_.Course_Id == undefined || this.Course_.Course_Id == null) {
      this.ApplicationDetails_.Course_Id = 0;
      this.ApplicationDetails_.Course_Name = String(this.Course_);
    } else {
      this.ApplicationDetails_.Course_Name = this.Course_.Course_Name;
      this.ApplicationDetails_.Course_Id = this.Course_.Course_Id;
    }
    if (
      this.Application_Country_.Country_Id == undefined ||
      this.Application_Country_.Country_Id == null
    ) {
      this.ApplicationDetails_.Country_Id = 0;
      this.ApplicationDetails_.Country_Name = String(this.Application_Country_);
    } else {
      this.ApplicationDetails_.Country_Id =
        this.Application_Country_.Country_Id;
      this.ApplicationDetails_.Country_Name =
        this.Application_Country_.Country_Name;
    }
    if (this.Agent_View == false) this.ApplicationDetails_.Agent_Id = 0;
    else this.ApplicationDetails_.Agent_Id = this.Agent_Mode_.Agent_Id;

    if (this.Agent_View == false) this.ApplicationDetails_.Agent_Name = "";
    else this.ApplicationDetails_.Agent_Name = this.Agent_Mode_.Agent_Name;

    return this.ApplicationDetails_;
  }






  Load_Course_DropDowns() {
    this.Course_Service_.Load_Course_DropDowns().subscribe(Rows => {

      if (Rows != null) {

        this.Intake_Mode_Data = Rows[4];
        this.Intake_Mode_Temp.Intake_Id = 0;
        this.Intake_Mode_Temp.Intake_Name = "Select";
        this.Intake_Mode_Data.unshift(this.Intake_Mode_Temp);
        this.Intake_Mode_ = this.Intake_Mode_Data[0]


        this.Intake_Year_Mode_Data = Rows[5];
        this.Intake_Year_Mode_Temp.Intake_Year_Id = 0;
        this.Intake_Year_Mode_Temp.Intake_Year_Name = "Select";
        this.Intake_Year_Mode_Data.unshift(this.Intake_Year_Mode_Temp);
        this.Intake_Year_Mode_ = this.Intake_Year_Mode_Data[0]


        this.German_Course_Data = Rows[6];
        this.German_Course_Temp.Course_Id = 0;
        this.German_Course_Temp.Course_Name = "Select";
        this.German_Course_Data.unshift(this.German_Course_Temp);
        this.German_Course_ = this.German_Course_Data[0]




      }

      this.issLoading = false;
    },
      Rows => {
        this.issLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      });
  }



  Search_Country_Typeahead(event: any) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();

    if (this.Country_Data == undefined || this.Country_Data.length == 0) {
      this.issLoading = true;

      this.Student_Service_.Search_Country_Typeahead(Value).subscribe(
        (Rows) => {
          if (Rows != null) {
            this.Country_Data = Rows[0];
            this.Country_Data_Filter = [];
            for (var i = 0; i < this.Country_Data.length; i++) {
              if (
                this.Country_Data[i].Country_Name.toLowerCase().includes(Value)
              )
                this.Country_Data_Filter.push(this.Country_Data[i]);
            }
          }
          this.issLoading = false;
        },
        (Rows) => {
          this.issLoading = false;
        }
      );
    } else {
      this.Country_Data_Filter = [];
      for (var i = 0; i < this.Country_Data.length; i++) {
        if (this.Country_Data[i].Country_Name.toLowerCase().includes(Value))
          this.Country_Data_Filter.push(this.Country_Data[i]);
      }
    }
  }
  display_Country(Country_e: Country) {
    if (Country_e) {
      return Country_e.Country_Name;
    }
  }



  Search_Application_Course_Typeahead(event: any) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();
    if (this.Application_Course_Data == undefined || this.Application_Course_Data.length == 0) {
      this.issLoading = true;

      this.Student_Service_.Search_Application_Course_Typeahead(Value).subscribe(
        (Rows) => {
          if (Rows != null) {
            this.Application_Course_Data = Rows[0];
            this.Application_Course_Data_Filter = [];
            for (var i = 0; i < this.Application_Course_Data.length; i++) {
              if (this.Application_Course_Data[i].Application_Course_Name.toLowerCase().includes(Value))
                this.Application_Course_Data_Filter.push(this.Application_Course_Data[i]);
            }
          }
          this.issLoading = false;
        },
        (Rows) => {
          this.issLoading = false;
        }
      );
    } else {
      this.Application_Course_Data_Filter = [];
      for (var i = 0; i < this.Application_Course_Data.length; i++) {
        if (this.Application_Course_Data[i].Application_Course_Name.toLowerCase().includes(Value))
          this.Application_Course_Data_Filter.push(this.Application_Course_Data[i]);
      }
    }
  }
  display_Application_Course_1(Application_Course_e: Application_Course) {
    if (Application_Course_e) {
      return Application_Course_e.Application_Course_Name;
    }
  }


  Search_Application_University_Typeahead(event: any) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();
    if (this.Application_University_Data == undefined || this.Application_University_Data.length == 0) {
      this.issLoading = true;

      this.Student_Service_.Search_Application_University_Typeahead(Value).subscribe(
        (Rows) => {
          if (Rows != null) {
            this.Application_University_Data = Rows[0];
            this.Application_University_Data_Filter = [];
            for (var i = 0; i < this.Application_University_Data.length; i++) {
              if (this.Application_University_Data[i].Application_University_Name.toLowerCase().includes(Value))
                this.Application_University_Data_Filter.push(this.Application_University_Data[i]);
            }
          }
          this.issLoading = false;
        },
        (Rows) => {
          this.issLoading = false;
        }
      );
    } else {
      this.Application_University_Data_Filter = [];
      for (var i = 0; i < this.Application_University_Data.length; i++) {
        if (this.Application_University_Data[i].Application_University_Name.toLowerCase().includes(Value))
          this.Application_University_Data_Filter.push(this.Application_University_Data[i]);
      }
    }
  }
  display_Application_University(Application_University_e: Application_University) {
    if (Application_University_e) {
      return Application_University_e.Application_University_Name;
    }
  }

  Save_Application() {


     
    if (this.Application_Country_ == undefined ||
      this.Application_Country_ == null ||
      this.Application_Country_.Country_Id == undefined ||
      this.Application_Country_.Country_Id == null
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Country", Type: "3" },
      });
      return;
    }


    if (
      this.Intake_Mode_.Intake_Id == undefined ||
      this.Intake_Mode_.Intake_Id == null || this.Intake_Mode_.Intake_Id == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Intake", Type: "3" },
      });
      return;
    }


    if (
      this.ApplicationDetails_.Application_Fees == undefined ||
      this.ApplicationDetails_.Application_Fees == null || this.ApplicationDetails_.Application_Fees == "" || this.ApplicationDetails_.Application_Fees == "null"
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Enter Fees", Type: "3" },
      });
      return;
    }

    if (
      this.Application_University_ == undefined || this.Application_University_ == null
      || this.Application_University_.Application_University_Id == 0 || this.Application_University_.Application_University_Id == null || this.Application_University_.Application_University_Id == undefined
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select University", Type: "3" },
      });
      return;
    }


    if (
      this.Intake_Year_Mode_.Intake_Year_Id == undefined ||
      this.Intake_Year_Mode_.Intake_Year_Id == null ||
      this.Intake_Year_Mode_.Intake_Year_Id == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Year", Type: "3" },
      });
      return;
    }


    if (this.Application_Course_ == undefined ||
      this.Application_Course_ == null ||
      this.Application_Course_.Application_Course_Id == undefined ||
      this.Application_Course_.Application_Course_Id == null
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Course", Type: "3" },
      });
      return;
    }

    if (this.ApplicationDetails_.Remark == undefined || this.ApplicationDetails_.Remark == null || this.ApplicationDetails_.Remark == "undefined"
    ) { this.ApplicationDetails_.Remark = "" }

     
    this.ApplicationDetails_.Student_Id = this.Student_.Student_Id;
    this.ApplicationDetails_.User_Id = this.Login_User;
    this.ApplicationDetails_.Country_Id = this.Application_Country_.Country_Id;
    this.ApplicationDetails_.Country_Name = this.Application_Country_.Country_Name;

    this.ApplicationDetails_.Course_Id = this.Application_Course_.Application_Course_Id;
    this.ApplicationDetails_.Course_Name = this.Application_Course_.Application_Course_Name;

    this.ApplicationDetails_.University_Id = this.Application_University_.Application_University_Id;
    this.ApplicationDetails_.University_Name = this.Application_University_.Application_University_Name;

    this.ApplicationDetails_.intake_Id = this.Intake_Mode_.Intake_Id;
    this.ApplicationDetails_.intake_Name = this.Intake_Mode_.Intake_Name;

    this.ApplicationDetails_.Intake_Year_Id = this.Intake_Year_Mode_.Intake_Year_Id;
    this.ApplicationDetails_.Intake_Year_Name = this.Intake_Year_Mode_.Intake_Year_Name;

    this.ApplicationDetails_.Duration_Id = this.Duration_Id;


    if(this.German_Course_ !=null||this.German_Course_ !=undefined||this.German_Course_.Course_Id !=null||this.German_Course_.Course_Id !=undefined)
    {
      this.ApplicationDetails_.German_Course_Id =this.German_Course_.Course_Id;
      this.ApplicationDetails_.German_Course_Name =this.German_Course_.Course_Name;
    }


    this.ApplicationDetails_.Fees = Number(this.ApplicationDetails_.Application_Fees);
    console.log('this.ApplicationDetails_: ', this.ApplicationDetails_);
    this.issLoading = true;
     debugger
    this.Student_Service_.Save_Application(this.ApplicationDetails_).subscribe(
      (Save_ApplicationDetails) => {
        debugger
        // Save_ApplicationDetails = Save_ApplicationDetails[0];
        console.log('Save_ApplicationDetails: ', Save_ApplicationDetails);
        if( (Number(Save_ApplicationDetails[0][0].Application_Details_Id_) > 0) ||(Number(Save_ApplicationDetails[1][0].Application_Details_Id_) > 0)) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved", Type: "false" },
          });
          this.Get_ApplicationDetails()
          this.Clr_ApplicationDetails();
          this.Close_Application();
        } else {
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
          data: { Message: Rows.error.error, Type: "2" },
        });
      }
    );
  }

  Create_Fees() {
    this.Feesmodal_View = true;
    this.Fee_Collection_View = false;

    this.clr_receipt();

    this.Fees_Data_ = this.Fees_Array[1];
  }
  Close_Fees() {
    this.Feesmodal_View = false;
    this.Fee_Collection_View = true;
    this.clr_receipt();
    // this.Search_Receipt();
  }
  clr_receipt() {
    // this.FeesreceiptDocument_Array = [];
    this.ImageFile_Feesreceipt = [];
    this.FeesreceiptDocument_File_Array = [];
    // this.Fees_Receipt_.Fees_Receipt_Id = 0;
    this.Fees_Receipt_.To_Account_Id = null;
    this.Fees_Receipt_.Amount = null;
    this.Fees_Receipt_.Description = "";
    // this.FeesreceiptDocument_Description = "";
    this.Fees_Receipt_.Currency = "";
    this.Fees_Receipt_.Fees_Id = null;
    // this.FeesreceiptDocument_Array = [];
    this.FeesreceiptDocument_File_Array = [];
    this.Fees_Receipt_.Entry_date = "";
    // this.Fees_Receipt_.Entry_date = this.New_Date(this.Fees_Receipt_.Entry_date);

    this.Fees_Receipt_.Fees_Receipt_Application_Id = 0;
    // this.Display_FeesrecepitFile_ = "";

    if (this.To_Account_Data != null && this.To_Account_Data != undefined)
      this.To_Account_ = this.To_Account_Data[0];

    if (this.Fees_Array != null && this.Fees_Array != undefined)
      this.Fees_Data_ = this.Fees_Array[1];

    if (this.Currency_Data != null && this.Currency_Data != undefined)
      this.Currency_ = this.Currency_Data[0];

    if (this.Fees_Data_ != null && this.Fees_Data_ != undefined)
      this.To_Account_ = this.Fees_Data_[0];
    if (this.Fees_Array != null && this.Fees_Array != undefined)
      this.Fees_Data_ = this.Fees_Array[0];
    // this.File='';
    this.Course_Fees_Data_Filter = [];
    this.Fees_Course_ = null;
  }










  Save_FeesReceipt() {



     


    // if (this.Fees_Data_ == undefined ||
    //   this.Fees_Data_ == null||
    //   this.Fees_Data_.Fees_Id == undefined ||
    //   this.Fees_Data_.Fees_Id == null||this.Fees_Data_.Fees_Id == 0
    // ) {
    //   const dialogRef = this.dialogBox.open(DialogBox_Component, {
    //     panelClass: "Dialogbox-Class",
    //     data: { Message: "Select Fees", Type: "3" },
    //   });
    //   return;
    // }

    if (this.Fees_Receipt_.Entry_date == undefined ||
      this.Fees_Receipt_.Entry_date == null ||
      this.Fees_Receipt_.Entry_date == ""
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Choose Date", Type: "3" },
      });
      return;
    }


    if (this.Fees_Data_.Fees_Id == 2) {
      if (
        this.Fees_Course_ == undefined ||
        this.Fees_Course_ == null || this.Fees_Course_.Course_Id == null || this.Fees_Course_.Course_Id == undefined
      ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Select Course", Type: "3" },
        });
        return;
      }

    }



    if (this.Fees_Receipt_.Amount == 0 ||
      this.Fees_Receipt_.Amount == undefined ||
      this.Fees_Receipt_.Amount == null
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Enter Amount", Type: "3" },
      });
      return;
    }


    if (
      this.Currency_.Currency_Id == undefined ||
      this.Currency_.Currency_Id == null || this.Currency_.Currency_Id == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Currency", Type: "3" },
      });
      return;
    }


    if (this.To_Account_ == undefined || this.To_Account_ == null ||
      this.To_Account_.Client_Accounts_Id == undefined ||
      this.To_Account_.Client_Accounts_Id == null || this.To_Account_.Client_Accounts_Id == 0
    ) {
      const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select To Account", Type: "3" },
      });
      return;
    }


    // this.ApplicationDetails_.Student_Id = this.Student_.Student_Id;
    this.Fees_Receipt_.User_Id = this.Login_User;
    this.Fees_Receipt_.Entry_date = this.New_Date(
      new Date(moment(this.Fees_Receipt_.Entry_date).format("YYYY-MM-DD"))
    );
    this.Fees_Receipt_.Fees_Id = this.Fees_Data_.Fees_Id;

    this.Fees_Receipt_.To_Account_Id = this.To_Account_.Client_Accounts_Id;
    this.Fees_Receipt_.To_Account_Name = this.To_Account_.Client_Accounts_Name;

    this.Fees_Receipt_.Currency_Id = this.Currency_.Currency_Id;
    this.Fees_Receipt_.Currency = this.Currency_.Currency_Name;
    this.Fees_Receipt_.Student_Id = this.Student_.Student_Id;



    if (this.Fees_Course_ != null || this.Fees_Course_ != undefined) {
      this.Fees_Receipt_.Course_Name = this.Fees_Course_.Course_Name;
      this.Fees_Receipt_.Course_Id = this.Fees_Course_.Course_Id;
      this.Fees_Receipt_.Country_Id = this.Fees_Course_.Country_Id;
      this.Fees_Receipt_.Application_details_Id = this.Fees_Course_.Application_details_Id;
    }

    this.issLoading = true;
     
    this.Student_Service_.Save_FeesReceipt(this.Fees_Receipt_).subscribe(
      (Save_FeesReceipt) => {
         
        Save_FeesReceipt = Save_FeesReceipt[1];
        if (Number(Save_FeesReceipt[0].Fees_Receipt_Application_Id_) > 0) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "Saved", Type: "false" },
          });
          this.Get_Fees_Receipt();
          this.clr_receipt();
          this.Close_Fees();
        } else {
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
          data: { Message: Rows.error.error, Type: "2" },
        });
      }
    );
  }


  Get_Fees_Receipt() {
    //  this.Clr_ApplicationDetails();
     
    this.issLoading = true;
    // this.ApplicationDetails_.Date_Of_Applying = new Date();
    // this.ApplicationDetails_.Date_Of_Applying = this.New_Date(
    //   this.ApplicationDetails_.Date_Of_Applying
    // );
    // this.ApplicationDetails_.Date_Of_Applying = this.New_Date(
    //   new Date(
    //     moment(this.ApplicationDetails_.Date_Of_Applying).format("YYYY-MM-DD")
    //   )
    // );

    // this.ApplicationDetails_.Fees_Payment_Last_Date = new Date();
    // this.ApplicationDetails_.Fees_Payment_Last_Date = this.New_Date(
    //   this.ApplicationDetails_.Fees_Payment_Last_Date
    // );
    // this.ApplicationDetails_.Fees_Payment_Last_Date = this.New_Date(
    //   new Date(
    //     moment(this.ApplicationDetails_.Fees_Payment_Last_Date).format(
    //       "YYYY-MM-DD"
    //     )
    //   )
    // );
     
    this.Student_Service_.Get_Fees_Receipt(
      this.Student_.Student_Id
    ).subscribe(
      (Rows) => {
         
        this.Receipt_data = Rows[0];
        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }




  Edit_Fees_Receipt(Fees_Receipt_e: Fees_Receipt_Application, index) {
    // this.Entry_View=true;
    // this.Fees_Receipt_=Fees_Receipt_e;

     
    this.Create_Fees();
    this.Fees_Receipt_ = Fees_Receipt_e;
    this.Fees_Receipt_ = Object.assign({}, Fees_Receipt_e);
    if (this.Fees_Receipt_.Entry_date == null) {
      // this.Fees_Receipt_.Entry_date = new Date();
      this.Fees_Receipt_.Entry_date = this.New_Date(
        this.Fees_Receipt_.Entry_date
      );
    } else
      this.Fees_Receipt_.Entry_date = this.New_Date(
        new Date(moment(this.Fees_Receipt_.Entry_date).format("YYYY-MM-DD"))
      );
    // this.feesreceiptdocument_.FeesreceiptDocument_Description =
    //   this.FeesreceiptDocument_Description;

    // this.Get_Feesrecepit_DocumentList(this.Fees_Receipt_.Fees_Receipt_Id);

    // this.Get_Fees_Receipt(this.Receipt_data_.Fees_Receipt_Id);
    for (var i = 0; i < this.Fees_Array.length; i++) {
      if (this.Fees_Receipt_.Fees_Id == this.Fees_Array[i].Fees_Id)
        this.Fees_Data_ = this.Fees_Array[i];
    }

    for (var i = 0; i < this.To_Account_Data.length; i++) {
      if (
        this.Fees_Receipt_.To_Account_Id ==
        this.To_Account_Data[i].Client_Accounts_Id
      )
        this.To_Account_ = this.To_Account_Data[i];
    }

    for (var i = 0; i < this.Currency_Data.length; i++) {
      if (
        this.Fees_Receipt_.Currency_Id ==
        this.Currency_Data[i].Currency_Id
      )
        this.Currency_ = this.Currency_Data[i];
    }

    // this.Fees_Course_Temp.Course_Id = this.ApplicationDetails_.Course_Id;
    this.Fees_Course_Temp.Course_Name = this.Fees_Receipt_.Course_Name;
    this.Fees_Course_Temp.Course_Id = this.Fees_Receipt_.Course_Id;
    this.Fees_Course_Temp.Application_details_Id = this.Fees_Receipt_.Application_details_Id;
    this.Fees_Course_ = Object.assign({}, this.Fees_Course_Temp);
  }

  Delete_Receipt(Fees_Receipt_Id, Application_details_Id, index) {


    if (Application_details_Id == null || Application_details_Id == undefined) { Application_details_Id = 0 }
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
      panelClass: "Dialogbox-Class",
      data: {
        Message: "Do you want to delete ?",
        Type: true,
        Heading: "Confirm",
      },
    });
    this.Get_Fees_Receipt();
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Yes") {
        this.issLoading = true;
        this.Student_Service_.Delete_Receipt(
          Fees_Receipt_Id,
          Application_details_Id
        ).subscribe(
          (Delete_status) => {

             
            // log(Delete_status)
            if (Delete_status[0][0].Fees_Receipt_Id_ > 0) {
              // this.Fees_Receipt_Data.splice(index, 1);
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Deleted", Type: "false" },
              });
              this.Get_Fees_Receipt();
            } else {
              this.issLoading = false;
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



  Search_Courses_Fees_Typeahead(event: any) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();

    // if (this.Fees_Course_Data == undefined || this.Fees_Course_Data.length == 0) {
    this.issLoading = true;

    this.Student_Service_.Search_Courses_Fees_Typeahead(
      Value,
      this.Student_Id
    ).subscribe(
      (Rows) => {
        if (Rows != null) {
           
          this.Fees_Course_Data = Rows[0];
          this.Course_Fees_Data_Filter = [];
          for (var i = 0; i < this.Fees_Course_Data.length; i++) {
            if (
              this.Fees_Course_Data[i].Course_Name.toLowerCase().includes(Value)
            )
              this.Course_Fees_Data_Filter.push(this.Fees_Course_Data[i]);
          }
        }
        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
    // }

    // else {
    //
    //  this.Course_Fees_Data_Filter = [];
    //  for (var i = 0; i < this.Fees_Course_Data.length; i++) {
    //      if (this.Fees_Course_Data[i].Course_Name.toLowerCase().includes(Value))
    //          this.Course_Fees_Data_Filter.push(this.Fees_Course_Data[i]);
    //  }
    // }
  }
  display_Course_Fees(Course_F: Applicationdetails) {
    if (Course_F) {
      return Course_F.Course_Name;
    }
  }




  Delete_Application_History(Application_details_history_Id, index) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
      panelClass: "Dialogbox-Class",
      data: {
        Message: "Do you want to delete ?",
        Type: true,
        Heading: "Confirm",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "Yes") {
        this.issLoading = true;
         
        this.Student_Service_.Delete_Application_History(
          Application_details_history_Id
        ).subscribe(
          (Delete_status) => {
            Delete_status = Delete_status[0];
            Delete_status = Delete_status[0].DeleteStatus_;
            if (Delete_status == 1) {
              this.ApplicationdetailsHistory_Data.splice(index, 1);
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Deleted", Type: false },
              });

            } else {
              this.issLoading = false;
              const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Error Occured", Type: 2 },
              });
            }
            this.issLoading = false;
          },
          (Rows) => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Error Occured", Type: 2 },
            });
          }
        );
      }
    });
  }
  Close_Click_History() {
    this.History_View = false;
    this.Change_Status_View = false;
    this.application_details_View = true;
  }

  Close_Click_Change_Status() {
    this.Change_Status_View = false;
    this.application_details_View = true;
    this.History_View = false;
  }

  CourseLInk() {


    var Course_link_ = this.ApplicationDetails_.Course_Link;
    var temp = Course_link_
    window.open(temp)

  }

  Back_Course_Tab() {

     
    // this.Course_Tab_View=false;
    // this.Course_Tab = false;
    // this.clickview = true;
    // this.Course_View=false;
    this.level_tab_view = false;
    this.Course_Details_View = true;


  }

  Register_Student_popup() {
    this.Message = ""; // Clear the message
    this.Student_.Registration_Fees = null; // Clear the input value
  }

  close_reg_popup() {
    this.Message = ""; // Clear the message
    this.Student_.Registration_Fees = null; // Clear the input value
  }



  print_graph() {



    this.Search_ExamResult_Report();

     


    setTimeout(function () {
      // this.print_Mark()
      let popupWinindow;

      let innerContents = document.getElementById("Print_Graph_Div").innerHTML;
      popupWinindow = window.open(
        "",
        "_blank",
        "width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
      );
      popupWinindow.document.open();
      popupWinindow.document.write(
        '<html><head><style>@page { size: auto; margin: 0mm; } </style><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' +
        innerContents +
        "</html>"
      );
      popupWinindow.document.close();
    }, 1000);
  }

  Load_Document_Type() {

    debugger
    this.issLoading = true;
    this.Student_Service_.Load_Document_Type().subscribe(
      (Rows) => {
        if (Rows != null) {
          debugger
          this.Document_Type_Data = Rows[0];
          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }


  Save_Student_Document() {

    debugger
    this.Student_Document_Type_Master_.Student_Id = this.Student_.Student_Id;
  

    {
      this.Student_Document_Type_Selection_Data_Temp = [];
      for (var i = 0; i < this.Document_Type_Data.length; i++) {
        if (
          Boolean(this.Document_Type_Data[i].Is_Check) == true ||
          Boolean(this.Document_Type_Data[i].Is_Check) == false 
        ) {
          this.Student_Document_Type_Selection_Data_Temp.push(
            this.Document_Type_Data[i]
          );
        }
      }

      debugger
      this.Student_Document_Type_Master_.Student_Document_Type_Data =
        this.Student_Document_Type_Selection_Data_Temp;

      var Menu_Status = false;
      for (
        var i = 0;
        i < this.Student_Document_Type_Selection_Data_Temp.length;
        i++
      ) {
        if (
          this.Student_Document_Type_Selection_Data_Temp[i].Is_Check ==
            true 
        )
          Menu_Status = true;
      }

      if (Menu_Status == false) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Select Atleast One Document", Type: "3" },
        });
        return;
      }

      this.issLoading = true;
debugger
      this.Student_Service_.Save_Student_Document(
        this.Student_Document_Type_Master_
      ).subscribe(
        (Save_status) => {
          debugger
          if (Number(Save_status[0].Student_Document_Type_Id_) > 0) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
              panelClass: "Dialogbox-Class",
              data: { Message: "Saved", Type: "false" },
            });
            // this.Search_User_Details();
          }  else {
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
      // this.Clr_Document_Item_List();

      this.Get_Document_Type();
    }
  }

  Clr_Document_Item_List() {
    this.Student_Document_Type_Master_.Student_Document_Type_Mater_Id = 0;
    this.Student_Document_Type_Master_.Student_Id = 0;
    this.Student_Document_Type_Master_.Remark="";
    

    if (this.Document_Type_Data != undefined) {
      for (var i = 0; i < this.Document_Type_Data.length; i++) {
        this.Document_Type_Data[i].Is_Check = false;
        
      }
    }
  }

  Get_Document_Type()
  {

    debugger
    this.issLoading = true;

    this.Student_Service_.Get_Document_Type(
      this.Student_.Student_Id
    ).subscribe(
      (Rows) => {

        debugger
if(Rows[0].length>0)
{



        this.Document_Type_Data = Rows[0];

        this.Student_Document_Type_Master_.Remark =Rows[0][0].Remark;
        this.Student_Document_Type_Master_.Student_Document_Type_Mater_Id =Rows[0][0].Student_Document_Type_Mater_Id;

        for (
          var j = 0;
          j < this.Document_Type_Data.length;
          j++
        ) {
          if (
            this.Document_Type_Data[j].Is_Check.toString() == "1"
          )
            this.Document_Type_Data[j].Is_Check = true;
          else this.Document_Type_Data[j].Is_Check = false;
         
        }
      }


      else
      {
       
        this.Load_Document_Type();
        this.Clr_Document_Item_List();
      }

        this.issLoading = false;
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
  }


}