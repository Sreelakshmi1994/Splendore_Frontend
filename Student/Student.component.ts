import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Student } from '../../../models/Student';
import { Student_Followup } from '../../../models/Student_Followup';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';
import { Installment_Type } from '../../../models/Installment_Type';
import { Enquiry_Source } from '../../../models/Enquiry_Source';
import { Gender } from '../../../models/Gender';
import { Status } from '../../../models/Status';
import { Users } from '../../../models/Users';
import { Student_Course } from '../../../models/Student_Course';
import { Student_Course_Subject } from '../../../models/Student_Course_Subject';
import { Student_Fees_Installment_Master } from '../../../models/Student_Fees_Installment_Master';
import { Student_Fees_Installment_Details } from '../../../models/Student_Fees_Installment_Details';
import { Student_Fees_Installment_Save } from '../../../models/Student_Fees_Installment_Save';
import { Mode } from '../../../models/Mode';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Receipt_Voucher } from '../../../models/Receipt_Voucher';
import { environment } from '../../../../environments/environment';
import { Course_Subject } from '../../../models/Course_Subject';
import { Exam_Status } from '../../../models/Exam_Status';
import { Mark_List_Master } from '../../../models/Mark_List_Master';
import { Mark_List } from '../../../models/Mark_List';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Ielts } from 'app/models/Ielts';
import { ApplicationStatus } from 'app/models/ApplicationStatus';
import { Agent } from 'http';
import { Intake_Year } from 'app/models/Intake_Year';
import { Fees } from 'app/models/Fees';
import { ApplicationdetailsHistory } from 'app/models/ApplicationdetailsHistory';
import { Applicationdocument } from 'app/models/Applicationdocument';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { Currency } from 'app/models/Currency';
import { Intake } from 'app/models/Intake';
import { Enquiry_For } from 'app/models/Enquiry_For';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Student',
templateUrl: './Student.component.html',
styleUrls: ['./Student.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class StudentComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Student_Edit:boolean;
    Student_Save:boolean;
    Student_Delete:boolean;
    myInnerHeight: number;
    Installment_Index:number;
    year: any;
    month: any;
    day: any;
    date: any;
    More_Search_Options: boolean = true;
    Entry_View: boolean = true;
    tab_view:boolean=true;
    Course_Tab:boolean=true;
    profile_View:boolean=true;
    Fees_View:boolean=false;
    Fees_tab_Permission: any;
    Fees_tab_View: boolean = false;
    Fees_tab_Edit: boolean = false;
    Course_View: boolean = false;
    Course_Tab_Permission: any;
    Profile_Tab_Permission: any;
    Profile_Tab_View: boolean = false;
    Course_Tab_View: boolean = false;
    Course_Tab_Edit: boolean = false;
    Profile_Tab_Edit: boolean = false;
    Mark_tab_Permission: any;
    Mark_tab_View: boolean = false;
    Mark_tab_Edit: boolean = false;
    Mark_View:boolean=true;
    Show_Followup_History: boolean = true;
    View_Follow_: boolean = true;
    View_Student_: boolean = true;
    Show_FollowUp: boolean = true;
    View_History_: boolean = true;

    Flag_Followup: number = 0;
    Flag_Student: number = 0;
    Student_Id_Edit: number = 0;
    Registration: boolean = false;
    Student_Id: number = 0;
    Student_Name:string;

    Student_Data: Student[]
    Student_: Student = new Student();
    Student_Name_Search: string;

    Student_Followup_: Student_Followup = new Student_Followup;
    Student_Followup_Data: Student_Followup[]

    Gender_: Gender = new Gender;
    Gender_Temp: Gender = new Gender;
    Gender_Data: Gender[]
    
    Enquiry_Source_: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Data: Enquiry_Source[]    

    Course_: Course = new Course;
    Course_Temp: Course = new Course;
    Course_Data: Course[];

    Batch_: Batch = new Batch;
    Batch_Temp: Batch = new Batch;
    Batch_Data: Batch[];
    
    Followp_History_Data: Student[];

    Search_Status: Status = new Status;
    Search_Status_Temp: Status = new Status;
    Status_Data: Status[];

    Followup_Status_:Status=new Status;
    Followup_Status_Data:Status[];
    Followup_Status_Temp: Status = new Status;
    Next_FollowUp_Date_Visible:boolean=true;

    Users_Search: Users = new Users;
    Users_Search_Temp: Users = new Users;
    Users_Data: Users[];

    Followup_Users_: Users = new Users;
    Followup_Users_Data: Users[];
    Followup_Users_Temp: Users = new Users;
    Faculty_: Users = new Users;
    Faculty_Temp: Users = new Users;

    Save_Call_Status: boolean = false;
    Photo: string;
    Display_Photo_: string;
    ImageFile_Photo: any;
    Login_User: number = 0;
    Is_Registered: any


    Page_Start: number = 0;
    Page_End: number = 0;
    Navbar_Leads_View:number;
	Navbar_Leads_View_Menus:number

    Page_Length: number = 10;
    Page_Length_: number = 10;
    Black_Start: number = 1;
    Black_Stop: number = 0;
    Red_Start: number = 1;
    Red_Stop: number = 0;
    Total_Rows: number = 0; 
    missedfollowup_count: number = 1;
    followup_count: number = 0;
    nextflag: number;
    Search_Name: "";

    Look_In_Date: boolean = true;
    Search_FromDate: Date = new Date();
    Search_ToDate: Date = new Date();

    Registration_Visiblility: boolean
    Remove_Registration_Visibility: boolean
    Registration_Permissions: any;
    Remove_Registration_Permissions: any;

    Student_EditIndex: number = -1;

    Student_Course_Subject_: Student_Course_Subject = new Student_Course_Subject;
    Student_Course_Subject_Temp: Student_Course_Subject = new Student_Course_Subject;
    Student_Course_Subject_Data: Student_Course_Subject[];

    Student_Course_: Student_Course = new Student_Course;
    Student_Course_Temp: Student_Course = new Student_Course;
    Student_Course_Data: Student_Course[];
    
    Student_Fees_Installment_Master_: Student_Fees_Installment_Master = new Student_Fees_Installment_Master;
    Student_Fees_Installment_Master_Temp: Student_Fees_Installment_Master = new Student_Fees_Installment_Master;
    Student_Fees_Installment_Master_Data: Student_Fees_Installment_Master[];
    Student_Fees_Installment_Details_: Student_Fees_Installment_Details = new Student_Fees_Installment_Details
    Student_Fees_Installment_Details_Temp: Student_Fees_Installment_Details = new Student_Fees_Installment_Details
    Student_Fees_Installment_Details_Data: Student_Fees_Installment_Details[]

    Fees_Master_Id:number=0;
    Student_Fees_Installment_Save_:Student_Fees_Installment_Save=new Student_Fees_Installment_Save;
    Student_Fees_Installment_Save_Data:Student_Fees_Installment_Save[];
    Student_Fees_Installment_Save_Temp:Student_Fees_Installment_Save=new Student_Fees_Installment_Save;

    Course_Click_Status:boolean = false;
    Fees_Click_Status:boolean = false;
    Mark_Click_Status:boolean = false;
    date_Temp:Date=new Date();
    Enquiry_For_Search: Enquiry_For = new Enquiry_For();

    Course_Id_Edit: number = 0;
    Student_Course_Id_Edit :number = 0;
    Subject_:Course_Subject=new Course_Subject;
    Course_Subject_Data:Course_Subject[];
    Subject_Temp:Course_Subject=new Course_Subject;

    Exam_Status_:Exam_Status=new Exam_Status;
    Exam_Status_Temp:Exam_Status=new Exam_Status;
    Exam_Status_Data:Exam_Status[];

    Mark_List_Master_:Mark_List_Master=new Mark_List_Master;
    Mark_List_Master_Data:Mark_List_Master[];

    Mark_List_:Mark_List=new Mark_List;
    Mark_List_Data:Mark_List[]
    Mark_List_Index:number=-1;

    Receipt_History_View:boolean=false;
    Receipt_View:boolean=false;
    Mode:Mode=new Mode();
    Mode_Temp:Mode=new Mode();
    Mode_Data:Mode[]
    Enquiry_For_: Enquiry_For = new Enquiry_For();
	Enquiry_For_Temp: Enquiry_For = new Enquiry_For();
	Enquiry_For_Data: Enquiry_For[];
 
	Intake_Mode_: Intake = new Intake();
	Intake_Mode_Temp: Intake = new Intake();
	Intake_Mode_Data: Intake[];

	Currency_: Currency = new Currency();
	Currency_Temp: Currency = new Currency();
	Currency_Data: Currency[];
    Name_Show:string;
 
	FeesrecepitDetails_Data: Fees[];
	ApplicationdetailsHistory_Data: ApplicationdetailsHistory[];
	Applicationdocument_Data: Applicationdocument[];

 
	Intake_Year_Mode_: Intake_Year = new Intake_Year();
	Intake_Year_Mode_Temp: Intake_Year = new Intake_Year();
	Intake_Year_Mode_Data: Intake_Year[];

	Agent_Mode_: Agent = new Agent();
	Agent_Mode_Temp: Agent = new Agent();
	Agent_Mode_Data: Agent[];

	Application_Status_Mode_: ApplicationStatus = new ApplicationStatus();
	Application_Status_Mode_Temp: ApplicationStatus = new ApplicationStatus();
	Application_Status_Mode_Data: ApplicationStatus[];
 
	 
	Ielts_: Ielts = new Ielts();
	Ielts_Temp: Ielts = new Ielts();
	Ielts_Data: Ielts[];

	Ielts_Mode_: Ielts = new Ielts();
	Ielts_Mode_Temp: Ielts = new Ielts();
	Ielts_Mode_Data: Ielts[];


    Installment_Type:Installment_Type=new Installment_Type;
    Installment_Type_Temp:Installment_Type=new Installment_Type;
    Installment_Type_Data:Installment_Type[];

    Receipt_Voucher_:Receipt_Voucher=new Receipt_Voucher;
    Receipt_Voucher_Data:Receipt_Voucher[]

    Client_Accounts_:Client_Accounts=new Client_Accounts;
    Client_Accounts_Temp:Client_Accounts=new Client_Accounts;
    Client_Accounts_Data:Client_Accounts[]

    ImageFile_Photo_view:string;
constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    
		this.Navbar_Leads_View = Number(localStorage.getItem("Navbar_Leads_View"));
		// this.Navbar_Leads_View_t = Number(localStorage.getItem("Navbar_Leads_View"));
		localStorage.getItem('Nav_Title')
		this.Navbar_Leads_View_Menus= Number(localStorage.getItem('Navbar_Leads_View_Menus'));

		this.Navbar_Leads_View = Number(localStorage.getItem("Navbar_Leads_View"));
		debugger
		if (this.Navbar_Leads_View_Menus == 1) {
			this.Name_Show = 'Study';
			// this.Nav_Title_Show = true;
			localStorage.setItem('Navbar_Leads_View', '1');
		} else if (this.Navbar_Leads_View_Menus == 2) {
			this.Name_Show = 'Job';
			// this.Nav_Title_Show = true;
			localStorage.setItem('Navbar_Leads_View', '2');
		}  

// alert(this.Navbar_Leads_View)

		if(this.Navbar_Leads_View==1)
		{this.Name_Show='Student'}
		else if(this.Navbar_Leads_View==2)
		{this.Name_Show='Student'}
		 
    this.Permissions = Get_Page_Permission(14);
    this.Registration_Permissions = Get_Page_Permission(17);
    this.Remove_Registration_Permissions = Get_Page_Permission(18);
    this.Course_Tab_Permission = Get_Page_Permission(19)
    this.Fees_tab_Permission = Get_Page_Permission(20)
    this.Mark_tab_Permission = Get_Page_Permission(21)
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Search_Lead_button();
    this.Student_Edit=this.Permissions.Edit;
    this.Student_Save=this.Permissions.Save;
    this.Student_Delete=this.Permissions.Delete;
    this.Page_Load()
    if (this.Fees_tab_Permission != undefined && this.Fees_tab_Permission != null)
        {
        this.Fees_tab_Edit=this.Fees_tab_Permission.Edit
        this.Fees_tab_View=this.Fees_tab_Permission.View
        }
        if (this.Course_Tab_Permission != undefined && this.Course_Tab_Permission != null)
        {
        this.Course_Tab_Edit=this.Course_Tab_Permission.Edit;
        this.Course_Tab_View=this.Course_Tab_Permission.View
        }
        
        if (this.Profile_Tab_Permission != undefined && this.Profile_Tab_Permission != null)
        {
        this.Profile_Tab_Edit=this.Profile_Tab_Permission.Edit;
        this.Profile_Tab_View=this.Profile_Tab_Permission.View
        }
        if (this.Mark_tab_Permission != undefined && this.Mark_tab_Permission != null)
        {
        this.Mark_tab_View=this.Mark_tab_Permission.View
        this.Mark_tab_Edit=this.Mark_tab_Permission.Edit
        }
    }
     
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Student();
    this.Load_Gender();
    this.Load_Enquiry_Source();
    this.Load_Student_Search_Dropdowns();
    this.Load_Exam_Status();
    this.Load_Mode();
    this.Clr_Receipt_Voucher();
    this.Load_Installment_Type();
    
		this.Get_Student_PageLoadData_Dropdowns();
    this.Entry_View = false;
    this.Receipt_History_View=false;
    this.profile_View = true;
    this.tab_view = true;
    this.Fees_View = false;
    this.Course_View = false;
    this.Course_View = true;
    this.Mark_View=true;
    this.Is_Registered = 1;
    this.Look_In_Date = true;
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    this.date_Temp=this.New_Date(this.date_Temp)
    this.Course_Click_Status=false;
    this.Fees_Click_Status=false;
    this.Mark_Click_Status=false;
    this.Fees_Master_Id=0;
}
Tab_Click(Current_tab)
{       
    this.profile_View=false;
    this.Fees_View=false;
    this.Course_View=false;
    this.Mark_View=false;

    if(Current_tab==1)
       {
        this.profile_View=true;
        this.Course_View=false;
       this.Fees_View=false;
       }
        

    else if(Current_tab==2)
    {
        this.profile_View=false;      
        this.Course_View=true;
        this.Fees_View=false;
        
        if( this.Course_Click_Status==false)
        {      
            //this.profile_View=false;      
            this.Get_Student_Course(this.Student_Id)
            this.Course_Click_Status=true;
        }
      //  this.Get_Student_Course(this.Student_Id_Edit)
    }
    else if(Current_tab==3)
    {
    this.Fees_View=true;
    this.Receipt_View=false;
    if( this.Fees_Click_Status==false)
    {
        this.profile_View=false;   
        this.Fees_Click_Status=true;
        this.Get_Receipt_History();
    }              
    }
    else if(Current_tab==4)
    {
    this.Mark_View=true; 
    if( this.Mark_Click_Status==false)
    {            
        this.Get_Student_Mark_List(this.Student_Id)
        this.Mark_Click_Status=true;
    }
    }
}
isMobileMenu() {
    if ($(window).width() > 991)
    {
        return false;
    }
    return true;
};
isDesktopMenu() 
{
    if ($(window).width() < 991)
    {
        return false;
    }
    return true;
};
trackByFn(index, item) 
{
    return index;
}
Load_Gender()
{
    this.issLoading = true;
    this.Student_Service_.Load_Gender().subscribe(Rows => {
        if (Rows != null) {
            this.Gender_Data = Rows[0];
            this.Gender_Temp.Gender_Id = 0;
            this.Gender_Temp.Gender_Name = "All";
            this.Gender_Data.unshift(this.Gender_Temp);
            this.Gender_ = this.Gender_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
Load_Enquiry_Source()
{
    this.issLoading = true;
    this.Student_Service_.Load_Enquiry_Source().subscribe(Rows => {
        if (Rows != null) {
            this.Enquiry_Source_Data = Rows[0];
            this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
            this.Enquiry_Source_Temp.Enquiry_Source_Name = "All";
            this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
            this.Enquiry_Source_ = this.Enquiry_Source_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
Load_Student_Search_Dropdowns()
{
    this.issLoading = true;
    this.Student_Service_.Load_Student_Search_Dropdowns(3).subscribe(Rows => {
    if (Rows != null) {
        this.Status_Data = Rows[0];
        this.Search_Status_Temp.Status_Id = 0;
        this.Search_Status_Temp.Status_Name = "All";
        this.Status_Data.unshift(this.Search_Status_Temp);
        this.Search_Status = this.Status_Data[0];

        this.Users_Data = Rows[1];
        this.Users_Search_Temp.Users_Id = 0;
        this.Users_Search_Temp.Users_Name = "All";
        this.Users_Data.unshift(this.Users_Search_Temp);
        this.Users_Search = this.Users_Data[0];

        this.issLoading = false;
    }
},
    Rows => {
        this.issLoading = false;
    });
}
File_Change_Photo(event: Event) 
{    
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile_Photo = file;
    // this.Display_Photo_ = this.ImageFile_Photo[0].name;
    this.Student_.Photo = this.ImageFile_Photo[0].name;
}
Download_Student_File(File_Name)
{
    var File_Name_Temp;
    if(File_Name=='Photo')
    File_Name_Temp=this.Student_.Photo;
    var bs='F:/Teena/Dist/backend/Uploads/'
    var s=bs+File_Name_Temp;            
    window.open(s,'_blank');
}
New_Date(Date_)
{
         this.date=Date_;
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        if (this.month < 10) {
        this.month = "0" + this.month;
    }
        this.day = this.date.getDate().toString();
        if (Number.parseInt(this.day) <10) {
        this.day = "0" + this.day;
    }
        this.date = this.year + "-" + this.month + "-" + this.day;
      //  this.date = this.day + "-"+ this.month + "-" + this.year ;
        return this.date;
}

Add_Date(Date_,days)
{
        this.date=new Date(Date_);
        //this.date=new Date();
        debugger
        this.date.setDate( this.date.getDate() + days );         
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        if (this.month < 10) {
        this.month = "0" + this.month;
    }
        this.day = this.date.getDate().toString();
       

        if (Number.parseInt(this.day) <10) {
        this.day = "0" + this.day;
    }
        this.date = this.year + "-" + this.month + "-" + this.day;
      
        return this.date;
}

Create_New()
{
    this.Entry_View = true;
    this.View_Student_ = true;
    this.profile_View = true;
    this.Course_Tab = false;
    this.Fees_View = false;
    this.Course_View = false;
    this.Course_View = false;
    this.Mark_View = false;
    this.Show_FollowUp = false;
    this.Receipt_History_View=false;
    this.Flag_Followup = 1;
    this.Flag_Student = 1;
    this.View_Follow_ = true;
    this.Student_Id = 0
    this.Student_Id_Edit=0;
    this.Course_Id_Edit=0;
    this.Mark_List_Data=[];
    this.Clr_Mark_List();
    this.Clr_Mark_List_Master();
    this.Clr_Student();
    this.Clr_Receipt_Voucher();
    this.Student_Followup_.Next_FollowUp_Date = new Date();
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);    
    this.Get_Last_Followup();
    this.Student_Followup_.Remark="";
}
Close_Click()
{
    this.View_Student_ = true;
    this.Student_EditIndex = -1;
    this.Flag_Followup = 0;
    this.Flag_Student = 0;
    this.Student_Id = 0
    this.Student_Id_Edit=0;
    this.Course_Id_Edit=0;
    this.Entry_View = false;
    this.View_History_ = true;
    this.Show_Followup_History = true;
    this.View_Follow_ = true;
    this.Clr_Student();
    this.Clr_Student_Course();
    this.Clr_Mark_List_Master();
    this.Mark_List_Data=[];
    this.Clr_Mark_List();
    this.Clr_Receipt_Voucher();
    this.Search_Student();
    this.Fees_Master_Id=0;

    if(this.Installment_Type_Data!=null && this.Installment_Type_Data != undefined)
    this.Installment_Type=this.Installment_Type_Data[0];

    this.Course_Click_Status=false;
    this.Fees_Click_Status=false;
    this.Mark_Click_Status=false;
}
course_click()
{
    this.Course_Tab=true;
    this.Tab_Click(2);
    
}
Clr_Student()
{
    this.Course_Tab=false;
    this.Student_.Student_Id=0;
    this.Student_.Student_Name="";
    this.Student_.Address1="";
    this.Student_.Address2="";
    this.Student_.Address3="";
    this.Student_.Address4="";
    this.Student_.Pincode="";
    this.Student_.Phone="";
    this.Student_.Mobile="";
    this.Student_.Whatsapp="";
    // this.Student_.DOB = "";
    this.Student_.DOB = new Date();
    this.Student_.DOB = this.New_Date(this.Student_.DOB);
    // this.Student_.Gender=0;
    this.Student_.Email="";
    this.Student_.Alternative_Email="";
    this.Student_.Passport_No="";
    this.Student_.Passport_Expiry="";
    this.Student_.User_Name="";
    this.Student_.Password = "";
    this.Student_.Role_No = "";
    this.Student_.Registration_No = "";
    this.Student_.Photo="";
    this.Student_.User_Id=0;    
    this.ImageFile_Photo='';
    this.Display_Photo_='';

    this.Remove_Registration_Visibility = false
    this.Registration_Visiblility = false

    if(this.Gender_Data!=null && this.Gender_Data != undefined)
    this.Gender_=this.Gender_Data[0];
    if(this.Enquiry_Source_Data!=null && this.Enquiry_Source_Data != undefined)
    this.Enquiry_Source_=this.Enquiry_Source_Data[0];
}
Clr_Student_Followup()
 {
    this.Student_Followup_.Student_Followup_Id=0;
    this.Student_Followup_.Student_Id=0;
    this.Student_Followup_.Entry_Date = new Date();
    this.Student_Followup_.Entry_Date = this.New_Date(this.Student_Followup_.Entry_Date);
    this.Student_Followup_.Next_FollowUp_Date = new Date();
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
    this.Student_Followup_.FollowUp_Difference=0;
    // this.Student_Followup_.Status=0;
    this.Student_Followup_.By_User_Id=0;
    this.Student_Followup_.Remark="";
    this.Student_Followup_.Remark_Id=0;
    this.Student_Followup_.FollowUp_Type=0;
    this.Student_Followup_.FollowUP_Time="";
    this.Student_Followup_.Actual_FollowUp_Date = new Date();
    this.Student_Followup_.Actual_FollowUp_Date = this.New_Date(this.Student_Followup_.Actual_FollowUp_Date);
    this.Followup_Status_=null;
    this.Followup_Users_=null;
}
Search_Status_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    if (this.Followup_Status_Data == undefined || this.Followup_Status_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Status_Typeahead('',3).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Followup_Status_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Followup_Status(Status_: Status)
{     
    if (Status_) { return Status_.Status_Name; }
}
Status_Change(Status)
{
   this.Followup_Status_= Status;
    if(this.Followup_Status_.FollowUp==true)
    this.Next_FollowUp_Date_Visible=false;
    else
    this.Next_FollowUp_Date_Visible=true;
    this.Student_Followup_.Next_FollowUp_Date=new Date();
    this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
}
Search_User_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;       
     if(this.Followup_Users_Data==undefined || this.Followup_Users_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Users_Typeahead('').subscribe(Rows => {
        if (Rows != null) {
            this.Followup_Users_Data = Rows[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 
}
display_Followup_Users(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}
Search_More_Options()
{
    if (this.More_Search_Options == true)
    this.More_Search_Options = false;
    else
    this.More_Search_Options = true;
}
Search_Lead_button() 
{
    this.Black_Start =1;
    this.Black_Stop = this.Page_Length_;
    this.Red_Start = 1;
    this.Total_Rows=0;
    this.Red_Stop = this.Page_Length_;
    this.Search_Student();
}
Search_Student()
{
    var value = 1, Register_Value = 1, Status_Id = 0, User_Id = 0, search_name_ = undefined,
        look_In_Date_Value = 0;

    // if (this.Search_By_ != undefined && this.Search_By_ != null)
    //     if (this.Search_By_ != undefined && this.Search_By_ != null && this.Search_By_ != '')
    //         value = this.Search_By_;
    if (this.Is_Registered != undefined && this.Is_Registered != null)
        if (this.Is_Registered != undefined && this.Is_Registered != null && this.Is_Registered != '')
            Register_Value = this.Is_Registered;

    if (this.Look_In_Date == true)
        look_In_Date_Value = 1;

    if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
        search_name_ = this.Search_Name;

    if (this.Users_Search != undefined && this.Users_Search != null)
        if (this.Users_Search.Users_Id != undefined && this.Users_Search.Users_Id != null)
            User_Id = this.Users_Search.Users_Id;

    if (this.Search_Status != undefined && this.Search_Status != null)
        if (this.Search_Status.Status_Id != undefined && this.Search_Status.Status_Id != null)
            Status_Id = this.Search_Status.Status_Id;
     this.issLoading = true;
    this.Student_Service_.Search_Student(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),  search_name_, 
     User_Id, Status_Id, look_In_Date_Value, this.Black_Start, this.Black_Stop, this.Login_User, this.Red_Start, this.Red_Stop, Register_Value).subscribe(Rows =>{
            
  this.Student_Data = Rows.returnvalue.Student;
            this.Total_Entries = this.Student_Data.length;
            //this.missedfollowup_count = 0;
            //this.followup_count = 0;
            if ( this.Student_Data.length>0)
            {
                if(this.Student_Data[0].User_Status==2){
                    localStorage.clear();
                    this.router.navigateByUrl('/auth/login');
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
                if(this.Student_Data.length==0)
                { 
                    this.issLoading=false;
                    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
                }
                this.issLoading=false;
            },
        Rows => 
        { 
            
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });
        }
Next_Click ()
 {     
    if (this.Student_Data.length == this.Page_Length_)
    {
    this.Black_Start = this.Black_Start + this.Page_Length_;
    this.Black_Stop = this.Black_Stop + this.Page_Length_;
    if (this.missedfollowup_count > 0)
    {
        this.Red_Start = this.Red_Start + this.missedfollowup_count ;
        this.Red_Stop = this.Red_Start + this.Page_Length_;   
    }
    this.nextflag = 1;
   
        if (this.Student_Data.length > 0)
            {
                this.Search_Student();
            }
    }
 }
previous_Click  () 
{         
    if (this.Black_Start > 1) {
        {
            this.Black_Start = this.Black_Start - this.Page_Length_;
            this.Black_Stop = this.Black_Stop - this.Page_Length_;
        }
        if (this.missedfollowup_count > 0 || this.Red_Start > 1) {
            this.Red_Start = this.Red_Start - this.Page_Length_;
            if (this.Red_Start <= 0)
                this.Red_Start = 1;
            this.Red_Stop = this.Red_Start + this.Page_Length_;
        }
        this.Total_Rows = this.Total_Rows - this.Student_Data.length - this.Page_Length_;
        this.Search_Student();
    }
}
Delete_Student(Student_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
   this.issLoading=true;
    this.Student_Service_.Delete_Student(Student_Id).subscribe(Delete_status => {
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_;
    if(Delete_status==1)
    {
    this.Student_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    this.Close_Click();
    }
    else
    {
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
    });
}
Fill_Student()
{    
    if(this.Flag_Student==1)
    {
        this.Student_.DOB = this.New_Date(new Date(moment(this.Student_.DOB).format('YYYY-MM-DD')));
    // this.Student_.Student_Id=0;
    this.Student_.User_Id=this.Login_User;
    this.Student_.Gender=this.Gender_.Gender_Id;
    this.Student_.Enquiry_Source=this.Enquiry_Source_.Enquiry_Source_Id;
    return this.Student_;
}
else
return null;
}
Fill_Followup()
{  
if(this.Flag_Followup==1)
{    
    if (this.Student_Followup_.Next_FollowUp_Date == undefined || this.Student_Followup_.Next_FollowUp_Date==null)
    {
        this.Student_Followup_.Next_FollowUp_Date=new Date();
    } 
    
    this.Student_Followup_.Student_Id=this.Student_Id;
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
    this.Student_Followup_.Status=this.Followup_Status_.Status_Id;
    this.Student_Followup_.To_User_Id = this.Followup_Users_.Users_Id;
    this.Student_Followup_.By_User_Id=this.Login_User;
    this.Student_Followup_.Entry_Date = this.New_Date(new Date(moment(this.Student_Followup_.Entry_Date).format('YYYY-MM-DD')));
    this.Student_Followup_.Actual_FollowUp_Date = this.New_Date(new Date(moment(this.Student_Followup_.Actual_FollowUp_Date).format('YYYY-MM-DD')));

    return this.Student_Followup_;
}
else
return null;
}
Save_Student()
{
    
    if(this.Flag_Student==1)
    {
    if (this.Student_.Student_Name== undefined || this.Student_.Student_Name == null || this.Student_.Student_Name == "" ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Name', Type: "3" } });
        return;
    }
    if (this.Enquiry_Source_ == undefined || this.Enquiry_Source_ == null || this.Enquiry_Source_.Enquiry_Source_Id == undefined || this.Enquiry_Source_.Enquiry_Source_Id==0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Enquiry Source', Type: "3" } });
        return;
    }    
    if (this.Gender_ == undefined || this.Gender_ == null || this.Gender_.Gender_Id == undefined || this.Gender_.Gender_Id==0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Gender', Type: "3" } });
        return;
    }    
        if (this.Student_.Phone == undefined || this.Student_.Phone == null || this.Student_.Phone == "" ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Phone', Type: "3" } });
        return;
    }
    
}
if(this.Flag_Followup==1)
{
     if(this.Followup_Status_==null || this.Followup_Status_== undefined || this.Followup_Status_.Status_Id==undefined ||  this.Followup_Status_.Status_Id==null)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Status',Type:"3"}});   
        return;
    }  
    if (this.Followup_Users_ == null || this.Followup_Users_ == undefined || this.Followup_Users_.Users_Id==undefined ||  this.Followup_Users_.Users_Id==null)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select To Staff',Type:"3"}});   
        return;
    }  
    if (this.Student_Followup_.Remark == undefined || this.Student_Followup_.Remark == null || this.Student_Followup_.Remark == "") {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Remark', Type: "3" } });
        return;
    }
}
    var Main_Array={
        "Student":this.Fill_Student(),
        "Followup":this.Fill_Followup()
    }
    if (Main_Array.Student == null && Main_Array.Followup == null   )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved', Type: "false" } });
        return;
    }


    if (this.Save_Call_Status == true)
        return;
    else
        this.Save_Call_Status = true;
 this.issLoading = true;
 
    this.Student_Service_.Save_Student(Main_Array, this.ImageFile_Photo).subscribe(Save_status => {
    
    if(Number(Save_status[0][0].Student_Id_)>0)
    {       
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        this.Save_Call_Status = false;
       
        if(this.Flag_Student==1 && this.Student_Id==0)
        {
            if(Save_status[1]!= undefined && Save_status[1]!='')
             {
                var Sms='Hi,'+Save_status[1][0].Student_Name_+' Thank you for Your Enquiry at ONE TEAM. Our Experienced trainers look forward to Train you. Visit oneteamsolutions.in or call 9567440597 ONE TEAM SOLUTIONS';

            // var Sms='Hello '+Save_status[1][0].Student_Name_+
            // ' Thank you for Enquiring about Hands on-Training Programs at One Team. Our Experienced Trainers look forward to train you.Visit oneteamsolutions.in or call 9567440597 for any support.';
            this.Student_Service_.Send_Sms(Save_status[1][0].Phone_,Sms).subscribe(Rows => {
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Sms,Type:"false"}});
            
            this.issLoading=false;
            },
            Rows => 
            { 
                this.issLoading=false;
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });
        }
            this.issLoading=false;
        }
            if( this.profile_View==true)
            {
                this.Create_New();
                this.Search_Student();
                this.Clr_Student();
            }
            else
            {
                this.Close_Click()
                this.Search_Student()
            }
        }
    else if(Number(Save_status[0][0].Student_Id_)==-1)
    {  
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'The Phone Number Already Exist for '+Save_status[0][0].Duplicate_Student_Name+' and is handled by '+Save_status[0][0].Duplicate_User_Name,Type:"2"}});
        this.Save_Call_Status = false;
    }
    else if(Number(Save_status[0][0].Student_Id_)==-2)
    {  
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:' Email is Already Exist for '+Save_status[0][0].Duplicate_Student_Name+' and is handled by '+Save_status[0][0].Duplicate_User_Name,Type:"2"}});
            this.Save_Call_Status = false;
    }
    else 
    {          
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error ',Type:"2"}});
        this.Save_Call_Status = false;
    }
        this.issLoading=false;
        },
        Rows => { 
            
        this.issLoading=false;
        
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            this.Save_Call_Status = false;
    });
}

Register_Student()
{         
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to Register ?',Type:true,Heading:'Confirm'}});
            dialogRef.afterClosed().subscribe(result =>
        {
        if(result=='Yes')
        {
            this.issLoading = true;
     
                this.Student_Service_.Register_Student(this.Student_.Student_Id,this.Login_User).subscribe(Save_status => {

        if(Number(Save_status[0][0].Student_Id_)>0)
        { 
            this.Remove_Registration_Visibility=false
            this.Registration_Visiblility=false
            if(this.Remove_Registration_Permissions!=undefined &&this.Remove_Registration_Permissions!=null)
                if(this.Remove_Registration_Permissions.View==true)
                     this.Remove_Registration_Visibility=true;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Registered',Type:"false"}});
         this.Search_Student();
        }
        else{  
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        }
        this.issLoading=false;
        },
        Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
        }
    });
}
Remove_Registration()
{    
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to Remove Registration ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
    // this.issLoading=true;
        this.Student_Service_.Remove_Registration(this.Student_.Student_Id).subscribe(update_status => {  
        if(update_status[0][0].Student_Id_>0)
        {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Registration Removed',Type: "false"}});
        this.Search_Student();
        this.Remove_Registration_Visibility=false
        this.Registration_Visiblility=false
        
        if(this.Remove_Registration_Permissions!=undefined &&this.Remove_Registration_Permissions!=null)
            if(this.Registration_Permissions.View==true)
                this.Registration_Visiblility=true;
        }
        else
        {
            this.issLoading=false;
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            
        }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
    });
}
View_Follow_Click_()
{     
    if (this.Fees_View!=undefined)
    {
        this.Fees_View=false;
    }
    this.View_History_=false;
    this.Fees_View=false;   
    this.New_Followup(this.Student_Id,this.Student_.Student_Name,this.Student_EditIndex);
   
    //this.Create_New=true;
}
New_Followup(Student_Id,Student_Name,index)
{
    
    this.View_Student_=false;
    this.View_Follow_=true;  
    this.View_History_=false;
    this.Fees_View = false;
    this.Show_FollowUp = false;
    this.Entry_View = true;
    this.tab_view = false;
    this.profile_View = false;
    this.Course_View = false;
    this.Mark_View = false;
    this.Next_FollowUp_Date_Visible=true;

    this.Student_Id = Student_Id;
    this.Student_EditIndex = index;
    // this.Next_FollowUp_Date_Visible=true;
    this.Get_FollowUp_Details();
    this.Student_Name=Student_Name

    this.Student_Followup_.Student_Id=Student_Id;
    this.Flag_Followup=1;
    this.Flag_Student=0;
    this.Student_Followup_.Next_FollowUp_Date=new Date();
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
}
Get_Last_Followup()
{
        this.issLoading = true;
    this.Student_Service_.Get_Last_Followup( this.Login_User).subscribe(Rows => {
         
        this.Student_Followup_Data=Rows[0];
        if(this.Student_Followup_Data.length>0)
        {
            this.issLoading = false;
            this.Student_Followup_=this.Student_Followup_Data[0];


            this.Followup_Status_Temp.Status_Id = this.Student_Followup_.Status;
            this.Followup_Status_Temp.Status_Name = this.Student_Followup_.Status_Name;
            this.Followup_Status_ = this.Followup_Status_Temp;

            this.Followup_Users_Temp.Users_Id = this.Student_Followup_.To_User_Id;
            this.Followup_Users_Temp.Users_Name = this.Student_Followup_.To_User_Name;
            this.Followup_Users_ = this.Followup_Users_Temp;

            if (this.Student_Followup_.FollowUp == true)
                this.Next_FollowUp_Date_Visible = false;
            else
                this.Next_FollowUp_Date_Visible = true;

            this.Student_Followup_.Next_FollowUp_Date = new Date();
            this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);


            this.Student_Followup_.Remark="";
        }
        this.issLoading = false;
     },
     Rows => {
        this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
     });  
}

Get_FollowUp_Details()
{
    this.issLoading = true;
    
    this.Student_Service_.Get_FollowUp_Details(this.Student_Id).subscribe(Rows => {
        
        this.issLoading = false; 
        this.Student_Followup_=Rows[0].FollowUp[0];
        if (this.Student_Followup_ != null && this.Student_Followup_!=undefined)
         {
             this.Followup_Status_Temp.Status_Id = this.Student_Followup_.Status;
             this.Followup_Status_Temp.Status_Name = this.Student_Followup_.Status_Name;
             this.Followup_Status_ = Object.assign({}, this.Followup_Status_Temp);

             this.Followup_Users_Temp.Users_Id = this.Student_Followup_.To_User_Id;
            this.Followup_Users_Temp.Users_Name = this.Student_Followup_.To_User_Name;
            this.Followup_Users_ = Object.assign({}, this.Followup_Users_Temp);

            this.Student_Followup_.Remark="";
            
            if(this.Student_Followup_.FollowUp==true)
            {
                this.Next_FollowUp_Date_Visible=false;
            }
            else
                this.Next_FollowUp_Date_Visible=true;

             this.Student_Followup_.Next_FollowUp_Date=new Date();
             this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
        }
         },
       
         Rows => {
              this.issLoading = false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
  
}
Followup_History()
{
     this.Student_Id=this.Student_Data[this.Student_EditIndex].Student_Id;
    if(this.Show_Followup_History==true)
    {
        this.Show_Followup_History = false;
        this.issLoading = true;

        this.Student_Service_.Followup_History(this.Student_Id).subscribe(Rows =>
             {                               
            this.issLoading = false;
            if (Rows[0].FollowUp.length > 0)
                this.Followp_History_Data = Rows[0].FollowUp;
                

        },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: false } });
            });
    }
   
    else
    this.Show_Followup_History=true

}
View_Student_Click_()
{
    
    this.View_History_=true;
    this.Show_FollowUp=true;
    this.Show_Followup_History=true;
    
    this.Edit_Student(this.Student_Data[this.Student_EditIndex],this.Student_EditIndex);
    // this.Edit_Student(this.Student_Data[0], this.Student_EditIndex);
}
Edit_Student(Student_e:any,index)
{
     this.Clr_Student();
    this.Student_EditIndex = index
    this.Flag_Followup = 0;
    this.Flag_Student = 1

    this.Student_Followup_.Remark = "";
    this.Student_Id = Student_e.Student_Id;
    this.Student_Id_Edit = Student_e.Student_Id;

    this.View_Student_=true;
    this.Course_Tab=false;
    this.View_Follow_=false;  
    this.Entry_View=true;
    this.profile_View=true;
    this.Receipt_History_View=false;
    this.tab_view=true;
     this.Course_View=false;
 
    this.View_History_=false;
    this.Show_FollowUp = true;
     this.Fees_View = false;
  
    this.Mark_View = false;
    this.Course_Click_Status=false;
    this.Fees_Click_Status=false;
    this.Mark_Click_Status=false;
    // this.Save_Agent_.Client_Accounts_Name=Student_e.Client_Accounts_Name;
    // this.Save_Agent_.Client_Accounts_Id=Student_e.Agent_Id;    

    this.issLoading = true;
    this.Student_Service_.Get_Student(Student_e.Student_Id).subscribe(Rows =>{
        
    this.Student_= Object.assign({},Rows[0][0]);
    this.Registration=this.Student_.Registered;
    this.Remove_Registration_Visibility=false
    this.Registration_Visiblility=false

    if (this.Student_.Registered==true)
    {
        if(this.Remove_Registration_Permissions!=undefined && this.Remove_Registration_Permissions!=null)
            if(this.Remove_Registration_Permissions.View==true)
                this.Remove_Registration_Visibility=true;
    }
    else
    {
        if(this.Registration_Permissions!=undefined &&this.Registration_Permissions!=null)
            if(this.Registration_Permissions.View==true)
                this.Registration_Visiblility=true;
    }
    this.Display_Photo_=this.Student_.Photo;

    this.ImageFile_Photo_view=environment.FilePath+ this.Student_.Photo
        for (var i = 0; i < this.Gender_Data.length; i++)
        {
        if (this.Student_.Gender == this.Gender_Data[i].Gender_Id)
        this.Gender_=this.Gender_Data[i];
        } 
        for (var i = 0; i < this.Enquiry_Source_Data.length; i++)
        {
        if (this.Student_.Enquiry_Source == this.Enquiry_Source_Data[i].Enquiry_Source_Id)
        this.Enquiry_Source_=this.Enquiry_Source_Data[i];
        } 
    this.issLoading = false;
    } ,
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Clr_Student_Course()
{
    this.Student_Course_.Student_Course_Id=0;
    this.Student_Course_.Student_Id=0;
    this.Student_Course_.Entry_Date = new Date;
    this.Student_Course_.Entry_Date = this.New_Date(this.Student_Course_.Entry_Date);
    this.Student_Course_.Course_Name_Details="";
    this.Student_Course_.Agent_Amount=0;
    this.Student_Course_.Total_Fees=0;
     this.Student_Course_.Course_Type_Id=0;
     this.Student_Course_.Course_Type_Name = "";
    this.Student_Course_.Start_Date = new Date;
    this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
    this.Student_Course_.End_Date = new Date;
    this.Student_Course_.End_Date = this.New_Date(this.Student_Course_.End_Date);
    this.Student_Course_.Join_Date = new Date;
    this.Student_Course_.Join_Date = this.New_Date(this.Student_Course_.Join_Date);
    this.Student_Course_.By_User_Id=0;
    this.Student_Course_.Status=0;
    this.Student_Course_.Installment_Type_Id=0;
    this.Student_Course_.No_Of_Installment=0;
    this.Student_Course_.Duration=0;
    this.Course_=null;
    this.Batch_=null;
    this.Faculty_=null;
    this.Student_Fees_Installment_Master_Data=[];
    this.Student_Course_Subject_Data=[];
}
Search_Course_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    if (this.Course_Data == undefined || this.Course_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Course_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        this.Course_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Course(Course_: Course)
{     
    if (Course_) { return Course_.Course_Name; }
}
Search_Batch_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    if (this.Batch_Data == undefined || this.Batch_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Batch_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        this.Batch_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Batch(Batch_: Batch)
{     
    if (Batch_) { return Batch_.Batch_Name; }
}
Get_Course_Student(Course_Id)
{
    this.Student_Service_.Get_Course_Student(Course_Id).subscribe(Rows => {
        debugger
        this.Student_Course_Data = Rows[0];
        this.Student_Course_.Agent_Amount = this.Student_Course_Data[0].Agent_Amount;
        this.Student_Course_.Total_Fees = this.Student_Course_Data[0].Total_Fees;
        this.Student_Course_.Course_Type_Id = this.Student_Course_Data[0].Course_Type_Id;
        this.Student_Course_.Course_Type_Name = this.Student_Course_Data[0].Course_Type_Name;
        this.Student_Course_.Entry_Date = this.Student_Course_Data[0].Entry_Date;
        this.Student_Course_.Start_Date = this.Student_Course_Data[0].Start_Date;
        this.Student_Course_.End_Date = this.Student_Course_Data[0].End_Date;
        this.Student_Course_.Join_Date = this.Student_Course_Data[0].Join_Date;
        
        if(this.Student_Course_.Entry_Date==null||this.Student_Course_.Entry_Date==undefined)
          {                
            this.Student_Course_.Entry_Date = new Date;
            this.Student_Course_.Entry_Date = this.New_Date(this.Student_Course_.Entry_Date);
          }
          if(this.Student_Course_.Start_Date==null||this.Student_Course_.Start_Date==undefined)
          {                
            this.Student_Course_.Start_Date = new Date;
            //this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
          }
          if(this.Student_Course_.End_Date==null||this.Student_Course_.End_Date==undefined)
          {                
            this.Student_Course_.End_Date = new Date;
            this.Student_Course_.End_Date = this.New_Date(this.Student_Course_.End_Date);
          }
          if(this.Student_Course_.Join_Date==null||this.Student_Course_.Join_Date==undefined)
          {                
            this.Student_Course_.Join_Date = new Date;
            this.Student_Course_.Join_Date = this.New_Date(this.Student_Course_.Join_Date);
          }

        this.Student_Course_Subject_Data = Rows[1];
        this.date_Temp=this.Student_Course_.Start_Date;
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
        this.Student_Course_.Start_Date = this.New_Date(this.Student_Course_.Start_Date);
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Get_Student_PageLoadData_Dropdowns() {
    debugger
    this.Student_Service_.Get_Student_PageLoadData_Dropdowns().subscribe(
        (Rows) => {
            debugger
            
            // this.Passport_Mode_Data = Rows[0].slice();
            // this.Passport_Mode_Temp.Passport_Id = 0;
            // this.Passport_Mode_Temp.Passport_Name = "Select";
            // this.Passport_Mode_Data.unshift(
            //     Object.assign({}, this.Passport_Mode_Temp)
            // );
            // this.Passport_Mode_ = this.Passport_Mode_Data[0];

            this.Ielts_Mode_Data = Rows[1].slice();
            this.Ielts_Mode_Temp.Ielts_Id = 0;
            this.Ielts_Mode_Temp.Ielts_Name = "Select";
            this.Ielts_Mode_Data.unshift(Object.assign({}, this.Ielts_Mode_Temp));
            this.Ielts_Mode_ = this.Ielts_Mode_Data[0];

            // this.Intake_Mode_Data = Rows[2].slice();
            // this.Intake_Mode_Temp.Intake_Id = 0;
            // this.Intake_Mode_Temp.Intake_Name = "Select";
            // this.Intake_Mode_Data.unshift(Object.assign({}, this.Intake_Mode_Temp));
            // this.Intake_Mode_ = this.Intake_Mode_Data[0];
            // this.Intake_Search = this.Intake_Mode_Data[0];

            this.Enquiry_For_Data = Rows[3].slice();
            this.Enquiry_For_Temp.Enquiry_For_Id = 0;
            this.Enquiry_For_Temp.Enquiry_For_Name = "Select";
            this.Enquiry_For_Data.unshift(Object.assign({}, this.Enquiry_For_Temp));

            
if (this.Navbar_Leads_View ==1)
{
this.Enquiry_For_ = this.Enquiry_For_Data[3];
}

else if (this.Navbar_Leads_View ==2)
{
    this.Enquiry_For_ = this.Enquiry_For_Data[2];
}			


if (this.Navbar_Leads_View ==1)
{
this.Enquiry_For_Search = this.Enquiry_For_Data[3];
}

else if (this.Navbar_Leads_View ==2)
{
    this.Enquiry_For_Search = this.Enquiry_For_Data[2];
}			
 

            // this.Enquiry_For_Search = this.Enquiry_For_Data[0];




 
            // this.Intake_Year_Mode_Data = Rows[5].slice();
            // this.Intake_Year_Mode_Temp.Intake_Year_Id = 0;
            // this.Intake_Year_Mode_Temp.Intake_Year_Name = "Select";
            // this.Intake_Year_Mode_Data.unshift(
            //     Object.assign({}, this.Intake_Year_Mode_Temp)
            // );
            // this.Intake_Year_Mode_ = this.Intake_Year_Mode_Data[0];
            // // this.Intake_Year_Search = this.Intake_Year_Mode_Data[0];

            // // this.Agent_Mode_Data = Rows[6].slice();
            // // this.Agent_Mode_Temp.Agent_Id = 0;
            // // this.Agent_Mode_Temp.Agent_Name = "Select";
            // // this.Agent_Mode_Data.unshift(Object.assign({}, this.Agent_Mode_Temp));
            // // this.Agent_Mode_ = this.Agent_Mode_Data[0];
            // // this.Agent_Search = this.Agent_Mode_Data[0];

            // this.Application_Status_Mode_Data = Rows[7].slice();
            // this.Application_Status_Mode_Temp.Application_status_Id = 0;
            // this.Application_Status_Mode_Temp.Application_Status_Name = "Select";
            // this.Application_Status_Mode_Data.unshift(
            //     Object.assign({}, this.Application_Status_Mode_Temp)
            // );
            // this.Application_Status_Mode_ = this.Application_Status_Mode_Data[0];

            // this.Marital_Status_Data = Rows[8].slice();
            // this.Marital_Status_Temp.Marital_Status_Id = 0;
            // this.Marital_Status_Temp.Marital_Status_Name = "Select";
            // this.Marital_Status_Data.unshift(
            //     Object.assign({}, this.Marital_Status_Temp)
            // );
            // this.Marital_Status_ = this.Marital_Status_Data[0];

            // this.Visa_Type_Data = Rows[9].slice();
            // this.Visa_Type_Temp.Visa_Type_Id = 0;
            // this.Visa_Type_Temp.Visa_Type_Name = "Select";
            // this.Visa_Type_Data.unshift(Object.assign({}, this.Visa_Type_Temp));
            // this.Visa_Type_ = this.Visa_Type_Data[0];

            // this.IELTS_Type_Data = Rows[10].slice();
            // this.IELTS_Type_Temp.Ielts_Type = 0;
            // this.IELTS_Type_Temp.Ielts_Type_Name = "Select";
            // this.IELTS_Type_Data.unshift(Object.assign({}, this.IELTS_Type_Temp));
            // this.IELTS_Type_ = this.IELTS_Type_Data[0];

            // this.enquiry_mode_Data = Rows[11].slice();
            // this.enquiry_mode_Temp.Enquiry_Mode_Id = 0;
            // this.enquiry_mode_Temp.Enquiry_Mode_Name = "Select";
            // this.enquiry_mode_Data.unshift(
            //     Object.assign({}, this.enquiry_mode_Temp)
            // );
            // this.enquiry_mode_ = this.enquiry_mode_Data[0];

            // this.To_Account_Data = Rows[12].slice();
            // this.To_Account_Temp.Client_Accounts_Id = 0;
            // this.To_Account_Temp.Client_Accounts_Name = "Select";
            // this.To_Account_Data.unshift(Object.assign({}, this.To_Account_Temp));
            // this.To_Account_ = this.To_Account_Data[0];

            // this.Bph_Status_Data = Rows[13].slice();
            // this.Bph_Status_Temp.Bph_Status_Id = 0;
            // this.Bph_Status_Temp.Bph_Status_Name = "Select";
            // this.Bph_Status_Data.unshift(Object.assign({}, this.Bph_Status_Temp));
            // this.Bph_Status_ = this.Bph_Status_Data[0];

            // this.class_Data = Rows[14].slice();
            // this.class_Temp.Class_Id = 0;
            // this.class_Temp.Class_Name = "Select";
            // this.class_Data.unshift(Object.assign({}, this.class_Temp));
            // this.class_ = this.class_Data[0];
            // this.Class_Search = this.class_Data[0];

            // this.Sort_By_Data = Rows[15].slice();
            // this.Sort_By_Temp.Sort_By_Id = 0;
            // this.Sort_By_Temp.Sort_By_Name = "Select";
            // this.Sort_By_Data.unshift(Object.assign({}, this.Sort_By_Temp));
            // this.Sort_By_Search = this.Sort_By_Data[0];

            // this.Task_Status_Data = Rows[16].slice();
            // this.Task_Status_Temp.Task_Status_Id = 0;
            // this.Task_Status_Temp.Status_Name = "Select";
            // this.Task_Status_Data.unshift(Object.assign({}, this.Task_Status_Temp));
            // this.Task_Status_ = this.Task_Status_Data[0];

            // this.Currency_Data = Rows[17].slice();
            // this.Currency_Temp.Currency_Id = 0;
            // this.Currency_Temp.Currency_Name = "Select";
            // this.Currency_Data.unshift(Object.assign({}, this.Currency_Temp));
            // this.Currency_ = this.Currency_Data[0];

            // this.Reference_Data = Rows[19].slice();
            // this.Reference_Temp.Reference_Id = 0;
            // this.Reference_Temp.Reference_Name = "Select";
            // this.Reference_Data.unshift(this.Reference_Temp);
            // this.Reference_Search = Object.assign({}, this.Reference_Temp);
            // this.Reference_Search = this.Reference_Data[0];

            // this.Job_Posting_Data = Rows[20].slice();
            // this.Job_Posting_Temp.Job_Posting_Id = 0;
            // this.Job_Posting_Temp.Job_Name = "Select";
            // this.Job_Posting_Data.unshift(Object.assign({}, this.Job_Posting_Temp));
            // this.Job_Posting_ = this.Job_Posting_Data[0];



            // this.Requirement_Data = Rows[21].slice();
            // this.Requirement_Temp.Requirement_Id = 0;
            // this.Requirement_Temp.Requirement_Name = "Select";
            // this.Requirement_Data.unshift(Object.assign({}, this.Requirement_Temp));
            // this.Requirement_ = this.Requirement_Data[0];

            



            // this.Visa_Category_Data = Rows[26].slice();
            // this.Visa_Category_Data_Temp.Visa_Category_Id = 0;
            // this.Visa_Category_Data_Temp.Visa_Category_Name = "Select";
            // this.Visa_Category_Data.unshift(Object.assign({}, this.Visa_Category_Data_Temp));
            // this.Visa_category_ = this.Visa_Category_Data[0];


            // this.Interview_Status_Data = Rows[28].slice();
            // this.Interview_Status_Temp.Interview_Status_Id = 0;
            // this.Interview_Status_Temp.Interview_Status_Name = "Select";
            // this.Interview_Status_Data.unshift(Object.assign({}, this.Interview_Status_Temp));
            // this.Interview_Status_ = this.Interview_Status_Data[0];

            
            // this.Country_Type_Data = Rows[30].slice();
            // this.Country_Type_Temp.Country_Type_Id = 0;
            // this.Country_Type_Temp.Country_Type_Name = "Select";
            // this.Country_Type_Data.unshift(Object.assign({}, this.Country_Type_Temp));
            // this.Country_Type_ = this.Country_Type_Data[0];


            // this.Visa_questionaire_Data = Rows[31].slice();
            // this.Visa_questionaire_Temp.Visa_questionaire_Id = 0;
            // this.Visa_questionaire_Temp.Visa_questionaire_Name = "Select";
            // this.Visa_questionaire_Data.unshift(Object.assign({}, this.Visa_questionaire_Temp));
            // this.Visa_questionaire_ = this.Visa_questionaire_Data[0];



            // this.Search_Lead_button();

            // this.Reference_Data.unshift(Object.assign({}, this.Reference_Temp));
            // this.Reference_ = this.Reference_Data[0];

            
            // this.Enquiry_Source_Data = Rows[6].slice();
            // this.Enquiry_Source_Data_Temp.Enquiry_Source_Id = 0;
            // this.Enquiry_Source_Data_Temp.Enquiry_Source_Name = "All";

            // this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Data_Temp);
            // this.Search_Enquiry_Source_ = Object.assign({}, this.Enquiry_Source_Data_Temp);
            // this.Search_Enquiry_Source_ = this.Enquiry_Source_Data[0];



            // if (this.Student_Id_localStorage > "0") {
            //     this.Edit_Student({ Student_Id: this.Student_Id_localStorage }, 1, 1);
            // }
        },
        (Rows) => {
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Error Occured", Type: "2" },
            });
        }
    );
}
Get_Student_Course(Student_Id)
{
    this.profile_View=false
    this.Student_Service_.Get_Student_Course(Student_Id).subscribe(Rows => {
        this.Student_Course_Data = Rows[0];
        debugger
        if(this.Student_Course_Data.length>0)
        {
          this.Student_Course_ = this.Student_Course_Data[0];

          this.Course_Temp.Course_Id=this.Student_Course_.Course_Id
          this.Course_Temp.Course_Name=this.Student_Course_.Course_Name
          this.Course_=Object.assign(this.Course_Temp)

          this.Batch_Temp.Batch_Id=this.Student_Course_.Batch_Id
          this.Batch_Temp.Batch_Name=this.Student_Course_.Batch_Name
          this.Batch_=Object.assign(this.Batch_Temp)

          this.Faculty_Temp.Users_Id=this.Student_Course_.Faculty_Id
          this.Faculty_Temp.Users_Name=this.Student_Course_.Faculty_Name
          this.Faculty_=Object.assign(this.Faculty_Temp)

          for (var i = 0; i < this.Installment_Type_Data.length; i++)
          {
          if (this.Student_Course_.Installment_Type_Id == this.Installment_Type_Data[i].Installment_Type_Id)
          this.Installment_Type=this.Installment_Type_Data[i];
          } 

           this.Course_Id_Edit=this.Student_Course_.Course_Id
           this.Student_Course_Id_Edit=this.Student_Course_.Student_Course_Id

        }
        this.Student_Course_Subject_Data = Rows[1];
        this.Student_Fees_Installment_Save_Data = Rows[2];
        var Student_Fees_Installment_Master_Id =0
        var Student_Fees_Installment_Master_Id_temp =0
        var Student_Fees_Installment_Master_Index =-1
        this.Student_Fees_Installment_Master_Data=[];
        this.Student_Fees_Installment_Details_Data=[];
        for(var i=0;i<this.Student_Fees_Installment_Save_Data.length;i++)
        {
            Student_Fees_Installment_Master_Id_temp= this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
            if(Student_Fees_Installment_Master_Id!=Student_Fees_Installment_Master_Id_temp)
            {
                this.Student_Fees_Installment_Master_=new Student_Fees_Installment_Master()
                this.Student_Fees_Installment_Master_.Amount=this.Student_Fees_Installment_Save_Data[i].Amount
                this.Student_Fees_Installment_Master_.Tax=this.Student_Fees_Installment_Save_Data[i].Tax
                this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
                this.Student_Fees_Installment_Master_.Course_Fees_Id=this.Student_Fees_Installment_Save_Data[i].Course_Fees_Id
                this.Student_Fees_Installment_Master_.Fees_Type_Id=this.Student_Fees_Installment_Save_Data[i].Fees_Type_Id
                this.Student_Fees_Installment_Master_.Fees_Type_Name=this.Student_Fees_Installment_Save_Data[i].Fees_Type_Name
                this.Student_Fees_Installment_Master_.No_Of_Instalment=this.Student_Fees_Installment_Save_Data[i].No_Of_Instalment
                this.Student_Fees_Installment_Master_.Instalment_Period=this.Student_Fees_Installment_Save_Data[i].Instalment_Period
               this.Fees_Master_Id=this.Student_Fees_Installment_Master_.Student_Fees_Installment_Master_Id
                this.Student_Fees_Installment_Master_Data.push(Object.assign({},this.Student_Fees_Installment_Master_))
                Student_Fees_Installment_Master_Index=Student_Fees_Installment_Master_Index+1;
                this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;
                
                this.Student_Fees_Installment_Details_Data=[];
                this.Student_Fees_Installment_Details_Temp=new Student_Fees_Installment_Details();  
                this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Details_Id
                this.Student_Fees_Installment_Details_Temp.Instalment_Date=this.Student_Fees_Installment_Save_Data[i].Instalment_Date
                this.Student_Fees_Installment_Details_Temp.Fees_Amount=this.Student_Fees_Installment_Save_Data[i].Fees_Amount
                this.Student_Fees_Installment_Details_Temp.Balance_Amount=this.Student_Fees_Installment_Save_Data[i].Balance_Amount
                this.Student_Fees_Installment_Details_Temp.Status=this.Student_Fees_Installment_Save_Data[i].Status
                this.Student_Fees_Installment_Details_Temp.Tax_Percentage=this.Student_Fees_Installment_Save_Data[i].Tax_Percentage

                 this.Student_Fees_Installment_Details_Data.push(Object.assign({},this.Student_Fees_Installment_Details_Temp))
                this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;
            }
            else
            {
                this.Student_Fees_Installment_Details_Temp=new Student_Fees_Installment_Details();
                this.Student_Fees_Installment_Details_Temp.Student_Fees_Installment_Details_Id=this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Details_Id
                this.Student_Fees_Installment_Details_Temp.Instalment_Date=this.Student_Fees_Installment_Save_Data[i].Instalment_Date
                this.Student_Fees_Installment_Details_Temp.Fees_Amount=this.Student_Fees_Installment_Save_Data[i].Fees_Amount
                this.Student_Fees_Installment_Details_Temp.Balance_Amount=this.Student_Fees_Installment_Save_Data[i].Balance_Amount

                this.Student_Fees_Installment_Details_Temp.Status=this.Student_Fees_Installment_Save_Data[i].Status
                this.Student_Fees_Installment_Details_Temp.Tax_Percentage=this.Student_Fees_Installment_Save_Data[i].Tax_Percentage
                this.Student_Fees_Installment_Details_Data.push(Object.assign({},this.Student_Fees_Installment_Details_Temp))
                this.Student_Fees_Installment_Master_Data[Student_Fees_Installment_Master_Index].Student_Fees_Installment_Details=this.Student_Fees_Installment_Details_Data;
            }
            Student_Fees_Installment_Master_Id= this.Student_Fees_Installment_Save_Data[i].Student_Fees_Installment_Master_Id
        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Instalment_Change()
{
    
    this.Student_Course_.No_Of_Installment=this.Installment_Type.No_Of_Installment;
    this.Student_Course_.Duration=this.Installment_Type.Duration;
    
    //this.date_Temp=this.New_Date(new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD'))) ;
    
    
    this.Student_Fees_Installment_Master_Data = [];
    this.Student_Fees_Installment_Master_Temp=new Student_Fees_Installment_Master()
    this.Student_Fees_Installment_Master_Temp.Course_Fees_Id=1
    this.Student_Fees_Installment_Master_Temp.Fees_Type_Id=1
    this.Student_Fees_Installment_Master_Temp.Student_Fees_Installment_Details=[]
    this.Student_Fees_Installment_Master_Data.push(Object.assign({}, this.Student_Fees_Installment_Master_Temp));
    this.date_Temp=this.Student_Course_.Start_Date;   
    var course_amount 
    if(this.Student_Course_.No_Of_Installment==1)
        course_amount=this.Student_Course_.Agent_Amount
    else
        course_amount=this.Student_Course_.Total_Fees
    for (var j = 0; j < this.Student_Course_.No_Of_Installment; j++)
    {
        debugger
         
       // this.date_Temp.setDate( this.date_Temp.getDate() + this.Student_Course_.Duration ); 
       //var A=this.date_Temp.getDate();
      // this.date_Temp.setDate( A + this.Student_Course_.Duration );
       
        this.Student_Fees_Installment_Details_ = new Student_Fees_Installment_Details()
        this.Student_Fees_Installment_Details_.Fees_Amount=course_amount/this.Student_Course_.No_Of_Installment;
        this.Student_Fees_Installment_Details_.Fees_Amount = Number(this.Student_Fees_Installment_Details_.Fees_Amount.toFixed(2));
        this.Student_Fees_Installment_Details_.Tax_Percentage =  this.Student_Fees_Installment_Details_.Fees_Amount 
       // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);  
        
       this.Student_Fees_Installment_Details_.Tax_Percentage = Number(this.Student_Fees_Installment_Details_.Tax_Percentage.toFixed(2));
       this.Student_Fees_Installment_Details_.Instalment_Date=this.date_Temp;//this.New_Date(new Date(moment(this.date_Temp).format('YYYY-MM-DD')));  
 
        // this.Student_Fees_Installment_Details_.Instalment_Date=new Date();
        // this.Student_Fees_Installment_Details_.Instalment_Date=this.New_Date(this.date_Temp);
        this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details.push(Object.assign({}, this.Student_Fees_Installment_Details_));
        this.date_Temp=this.Add_Date(new Date(moment(this.date_Temp).format('YYYY-MM-DD')),this.Student_Course_.Duration) ;
    }
}
Save_Student_Course()
{ 
    if (this.Course_ == undefined || this.Course_==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Course',Type:"3"}});
        return;
        }
    if (this.Course_.Course_Id == null || this.Course_.Course_Id == undefined || this.Course_.Course_Id ==0) {
        
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Course',Type:"3"}});
        return;
    }
    if (this.Batch_ == undefined || this.Batch_==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Batch',Type:"3"}});
        return;
        }
    if (this.Batch_.Batch_Id == null || this.Batch_.Batch_Id == undefined || this.Batch_.Batch_Id ==0) {
        
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Batch',Type:"3"}});
        return;
    }
    if (this.Faculty_ == undefined || this.Faculty_==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Faculty',Type:"3"}});
        return;
        }
    if (this.Faculty_.Users_Id == null || this.Faculty_.Users_Id == undefined || this.Faculty_.Users_Id ==0) {
        
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Faculty',Type:"3"}});
        return;
    }
    if (this.Installment_Type == undefined || this.Installment_Type==null)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Installment Type',Type:"3"}});
        return;
        }
    if (this.Installment_Type.Installment_Type_Id == null || this.Installment_Type.Installment_Type_Id == undefined || this.Installment_Type.Installment_Type_Id ==0) {
        
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Installment Type',Type:"3"}});
        return;
    }
    if (this.Student_Course_.No_Of_Installment == null || this.Student_Course_.No_Of_Installment == undefined || this.Student_Course_.No_Of_Installment ==0) {
        
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter No Of Installment',Type:"3"}});
        return;
    }
    var temp_Student_Fees_Installment_Master_Id=0;
    //  if(this.Student_Fees_Installment_Save_Data==undefined)
      this.Student_Fees_Installment_Save_Data=[];

      for(var i=0;i<Number(this.Student_Fees_Installment_Master_Data.length);i++)
      {
          this.Student_Fees_Installment_Save_Temp=new Student_Fees_Installment_Save();

          this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id=i  
          this.Student_Fees_Installment_Save_Temp.Amount = this.Student_Fees_Installment_Master_Data[i].Amount;
          this.Student_Fees_Installment_Save_Temp.Tax = this.Student_Fees_Installment_Master_Data[i].Tax;
          this.Student_Fees_Installment_Save_Temp.Course_Fees_Id = this.Student_Fees_Installment_Master_Data[i].Course_Fees_Id;
          this.Student_Fees_Installment_Save_Temp.Fees_Type_Id = this.Student_Fees_Installment_Master_Data[i].Fees_Type_Id;
          this.Student_Fees_Installment_Save_Temp.Fees_Type_Name = this.Student_Fees_Installment_Master_Data[i].Fees_Type_Name;
          this.Student_Fees_Installment_Save_Temp.No_Of_Instalment = this.Student_Fees_Installment_Master_Data[i].No_Of_Instalment;
          this.Student_Fees_Installment_Save_Temp.Instalment_Period = this.Student_Fees_Installment_Master_Data[i].Instalment_Period;
             
        //   this.Student_Fees_Installment_Save_Temp.Delivery_Date=this.New_Date(new Date(moment(this.Student_Fees_Installment_Master_Data[i].Delivery_Date).format('YYYY-MM-DD')));  
          this.Student_Fees_Installment_Save_Data.push(Object.assign({}, this.Student_Fees_Installment_Save_Temp))
          for(var j=0;j<Number(this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details.length);j++)
          {
              this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id=i
              this.Student_Fees_Installment_Save_Temp.Instalment_Date=this.New_Date(new Date(moment(this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details[j].Instalment_Date).format('YYYY-MM-DD')));  
               this.Student_Fees_Installment_Save_Temp.Fees_Amount = this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details[j].Fees_Amount
               this.Student_Fees_Installment_Save_Temp.Tax_Percentage = this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details[j].Tax_Percentage
              this.Student_Fees_Installment_Save_Data.push(Object.assign({}, this.Student_Fees_Installment_Save_Temp))
          }
      }
     
      if(this.Student_Fees_Installment_Save_Data.length==0)
      {
          this.Student_Fees_Installment_Save_Temp=new Student_Fees_Installment_Save();
          this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id=-1
          this.Student_Fees_Installment_Save_Data.push(Object.assign({}, this.Student_Fees_Installment_Save_Temp))
      }
      
  this.Student_Course_.Student_Fees_Installment_Save=this.Student_Fees_Installment_Save_Data;
  debugger
    this.Student_Course_.Student_Id = this.Student_Id;
    this.Student_Course_.Course_Id = this.Course_.Course_Id;
    this.Student_Course_.Course_Name = this.Course_.Course_Name;
    this.Student_Course_.Batch_Id = this.Batch_.Batch_Id;
    this.Student_Course_.Batch_Name = this.Batch_.Batch_Name;
    this.Student_Course_.Faculty_Id = this.Faculty_.Users_Id;
    this.Student_Course_.Installment_Type_Id = this.Installment_Type.Installment_Type_Id;
    this.Student_Course_.By_User_Id = Number(this.Login_User);
    this.Student_Course_.Student_Course_Subject = this.Student_Course_Subject_Data;
    // this.Student_Course_.Student_Fees_Installment_Master = this.Student_Fees_Installment_Master_Data;
    this.issLoading=true;
    this.Student_Course_.Entry_Date = this.New_Date(new Date(moment(this.Student_Course_.Entry_Date).format('YYYY-MM-DD')));;
    this.Student_Course_.Start_Date = this.New_Date(new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD')));;
    this.Student_Course_.Join_Date = this.New_Date(new Date(moment(this.Student_Course_.Join_Date).format('YYYY-MM-DD')));;
    this.Student_Course_.End_Date = this.New_Date(new Date(moment(this.Student_Course_.End_Date).format('YYYY-MM-DD')));;
    this.Student_Service_.Save_Student_Course(this.Student_Course_).subscribe(Save_status => {

    if (Number(Save_status[0].Student_Course_Id_)>0)
    {
        if( this.Course_Id_Edit==0)
        {
            var Sms='Thank you for joining for '+Save_status[0].Course_Name_+
            '  at One Team ! We are really happy and excited to have you on board.Feel free to contact us on 9567434151 for any support.';
            this.Student_Service_.Send_Sms(Save_status[0].Phone_,Sms).subscribe(Rows => {
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Sms,Type:"false"}});
            
            this.issLoading=false;
            },
            Rows => 
            { 
                this.issLoading=false;
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });
            this.issLoading=false;
        }
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
   }
    else
        {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
    });
}
Fees_Tab_Click(Fees_Type_Id,Fees_Installment:any,index)
{
    this.profile_View=false;
    this.Course_View=false;
    this.Mark_View=false;
    this.Fees_View=true;
    this.Receipt_View=true;
    this.Receipt_Voucher_.Fees_Type_Id=Fees_Type_Id;
    this.Receipt_Voucher_.Student_Fees_Installment_Details_Id=Fees_Installment.Student_Fees_Installment_Details_Id;
    this.Receipt_Voucher_.Amount=Fees_Installment.Balance_Amount;
    this.Receipt_Voucher_.Date=new Date();
    this.Receipt_Voucher_.Date = this.New_Date(this.Receipt_Voucher_.Date);
    this.Receipt_Voucher_.Tax_Percentage=Fees_Installment.Tax_Percentage;
    this.Installment_Index=index;
    this.Get_Receipt_History();
}
Search_Subject_Course_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    if (this.Course_Subject_Data == undefined || this.Course_Subject_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Subject_Course_Typeahead('',this.Course_Id_Edit).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Course_Subject_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Subject(Course_Subject: Course_Subject)
{     
    if (Course_Subject) { return Course_Subject.Subject_Name; }
}
Course_Subject_Click(Subject)
{
    // this.Mark_List_ = Subject
    this.Mark_List_.Minimum_Mark=Subject.Minimum_Mark;
    this.Mark_List_.Maximum_Mark=Subject.Maximum_Mark;
}
Load_Exam_Status()
{
    this.issLoading = true;
    this.Student_Service_.Load_Exam_Status().subscribe(Rows => {
        if (Rows != null) {
            this.Exam_Status_Data = Rows[0];
            this.Exam_Status_Temp.Exam_Status_Id = 0;
            this.Exam_Status_Temp.Exam_Status_Name = "All";
            this.Exam_Status_Data.unshift(this.Exam_Status_Temp);
            this.Exam_Status_ = this.Exam_Status_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}

Clr_Mark_List_Master()
{
    this.Mark_List_Master_.Mark_List_Master_Id=0;
    this.Mark_List_Master_.Student_Id=0;
    this.Mark_List_Master_.Course_Id=0;
    this.Mark_List_Master_.Course_Name="";
    this.Mark_List_Master_.User_Id=0;
}
Clr_Mark_List()
{
    this.Mark_List_.Mark_List_Id=0;
    // this.Mark_List_.Subject_Id=0;
    // this.Mark_List_.Subject_Name="";
    this.Mark_List_.Minimum_Mark="";
    this.Mark_List_.Maximum_Mark="";
    this.Mark_List_.Mark_Obtained="";
    this.Subject_=null;

    if (this.Exam_Status_Data != undefined && this.Exam_Status_Data != null)
    this.Exam_Status_ = this.Exam_Status_Data[0];
}
Add_Mark_List()
{
    if (this.Subject_ == null || this.Subject_ == undefined || this.Subject_.Subject_Id == 0 || this.Subject_.Subject_Id == null) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Subject ', Type: "3" } });
        return
    }
    else if (this.Mark_List_.Minimum_Mark == undefined || this.Mark_List_.Minimum_Mark == null || this.Mark_List_.Minimum_Mark == "")
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Minimum Mark',Type:"3"}});
        return
    }
    else if (this.Mark_List_.Maximum_Mark == undefined || this.Mark_List_.Maximum_Mark == null || this.Mark_List_.Maximum_Mark == "")
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Maximum Mark',Type:"3"}});
        return
    }
    else if (this.Exam_Status_.Exam_Status_Id == undefined || this.Exam_Status_.Exam_Status_Id == null || this.Exam_Status_.Exam_Status_Id == 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Status', Type: "3" } });
        return
    }

    if (this.Mark_List_Data == undefined)
        this.Mark_List_Data = [];
    this.Mark_List_.Subject_Id = this.Subject_.Subject_Id
    this.Mark_List_.Subject_Name = this.Subject_.Subject_Name
    this.Mark_List_.Exam_Status_Id = this.Exam_Status_.Exam_Status_Id
    this.Mark_List_.Exam_Status_Name = this.Exam_Status_.Exam_Status_Name

    if (this.Mark_List_Index >= 0) {
        this.Mark_List_Data[this.Mark_List_Index] = Object.assign({}, this.Mark_List_)// this.Sales_Details_;
        }
        else {
        this.Mark_List_Data.push(Object.assign({}, this.Mark_List_));
        }
    this.Mark_List_Index=-1;
    this.Clr_Mark_List();
}
Edit_Mark_List(Mark_List_e:Mark_List,index)
{   
    this.Mark_List_Index=index;
    this.Mark_List_ = Object.assign({}, Mark_List_e); 

    this.Subject_Temp.Subject_Id = this.Mark_List_.Subject_Id;
    this.Subject_Temp.Subject_Name = this.Mark_List_.Subject_Name;
    this.Subject_ = Object.assign({}, this.Subject_Temp);

    for (var i = 0; i < this.Exam_Status_Data.length; i++) 
    {
        if (this.Exam_Status_Data[i].Exam_Status_Id == this.Mark_List_.Exam_Status_Id) 
        {
            this.Exam_Status_ = this.Exam_Status_Data[i];
        }
    }
}
Delete_Mark_List(Mark_List:Mark_List,index)
{
    this.Mark_List_Data.splice(index, 1);
    this.Clr_Mark_List();
}

Save_Mark_List_Master()
{
    if (this.Mark_List_Data.length === undefined || this.Mark_List_Data.length == null || this.Mark_List_Data.length == 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Add Atleast One Mark_List ', Type: "3" } });
        return
    }
    this.issLoading=true;
    this.Mark_List_Master_.User_Id = this.Login_User;
    this.Mark_List_Master_.Course_Id = this.Course_Id_Edit;
    this.Mark_List_Master_.Course_Name = this.Course_.Course_Name;
    this.Mark_List_Master_.Student_Id = this.Student_Id;
    this.Mark_List_Master_.Mark_List = this.Mark_List_Data;
    this.Student_Service_.Save_Mark_List_Master(this.Mark_List_Master_).subscribe(Save_status => {
   // Save_status=Save_status[0];
    if(Number(Save_status[0].Mark_List_Master_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
   // this.Close_Click();
    }
    else{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
    });
}
Get_Student_Mark_List(Student_Id)
{
    this.Student_Service_.Get_Student_Mark_List(Student_Id).subscribe(Rows => {
        this.Mark_List_Master_Data = Rows[0];
        if(this.Mark_List_Master_Data.length>0)
        {
          this.Mark_List_Master_ = this.Mark_List_Master_Data[0];
        }
        this.Mark_List_Data = Rows[1];
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Load_Mode()
    {
        this.Student_Service_.Load_Mode().subscribe(Rows =>
    {
    this.Mode_Data= Rows[0];        
    this.Mode_Temp.Mode_Id = 0;
    this.Mode_Temp.Mode_Name = "Select";
    this.Mode_Data.unshift(this.Mode_Temp);
    this.Mode=this.Mode_Data[0]; 
    },
        Rows => {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}
Load_Installment_Type()
{
    this.Student_Service_.Load_Installment_Type().subscribe(Rows =>
        {
        this.Installment_Type_Data= Rows[0];        
        this.Installment_Type_Temp.Installment_Type_Id = 0;
        this.Installment_Type_Temp.Installment_Type_Name = "Select";
        this.Installment_Type_Data.unshift(this.Installment_Type_Temp);
        this.Installment_Type=this.Installment_Type_Data[0]; 
        },
            Rows => {
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
    
}
Accounts_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    if (this.Client_Accounts_Data == undefined || this.Client_Accounts_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Accounts_Typeahead('4,5,11',Value).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Client_Accounts_Data = Rows[0];
        this.issLoading = false;
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 
}
display_Accounts(Client_Accounts_: Client_Accounts)
{     
    if (Client_Accounts_) { return Client_Accounts_.Client_Accounts_Name; }
}
Clr_Receipt_Voucher()
{
   this.Receipt_Voucher_.Receipt_Voucher_Id=0;
   this.Receipt_Voucher_.Date=new Date();
   this.Receipt_Voucher_.Date=this.New_Date(this.Receipt_Voucher_.Date);
   this.Receipt_Voucher_.Voucher_No=null;
   this.Receipt_Voucher_.From_Account_Id=0;
   this.Receipt_Voucher_.Amount=null;
   this.Receipt_Voucher_.To_Account_Id=0;
   this.Receipt_Voucher_.Payment_Mode=0;
   this.Receipt_Voucher_.User_Id=0;
   this.Receipt_Voucher_.Description="";
   this.Receipt_Voucher_.Address1="";
   this.Receipt_Voucher_.Tax_Percentage=0;
   this.Client_Accounts_=null;
   if(this.Mode_Data!=null && this.Mode_Data != undefined)
   this.Mode=this.Mode_Data[0];
   this.Receipt_Voucher_.Payment_Status=0;
}
Save_Receipt_Voucher()
{
    // if (this.Client_Accounts_ == undefined || this.Client_Accounts_ == null || this.Client_Accounts_.Client_Accounts_Id == undefined || this.Client_Accounts_.Client_Accounts_Id == 0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select To Account', Type: "3" } });
    //     }
    //     else
        if(this.Receipt_Voucher_.Amount==undefined||this.Receipt_Voucher_.Amount==null||this.Receipt_Voucher_.Amount==undefined||this.Receipt_Voucher_.Amount==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        }       
        else if (this.Mode == null || this.Mode == undefined || this.Mode.Mode_Id == undefined || this.Mode.Mode_Id == 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Mode', Type: "3" } });
        }
else
{
    
        this.Receipt_Voucher_.User_Id=Number(this.Login_User);
        this.Receipt_Voucher_.From_Account_Id=this.Student_Id;
        this.Receipt_Voucher_.Student_Course_Id=this.Student_Course_Id_Edit;
        this.Receipt_Voucher_.Payment_Status=0;
        this.Receipt_Voucher_.To_Account_Id=1;;
        this.Receipt_Voucher_.Payment_Mode=this.Mode.Mode_Id;
        
        this.Receipt_Voucher_.Date=this.New_Date(new Date(moment(this.Receipt_Voucher_.Date).format('YYYY-MM-DD')));
    //this.issLoading=true;
    this.Student_Service_.Save_Student_Receipt_Voucher(this.Receipt_Voucher_).subscribe(Save_status => {
        
    Save_status=Save_status[0];
    if(Number(Save_status[0].Receipt_Voucher_Id_)>0)
    {
        debugger;
        if(Number.parseFloat( this.Receipt_Voucher_.Amount.toString())>=Number.parseFloat( this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount.toString()))
            this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Status=1;
        this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount=this.Student_Fees_Installment_Master_Data[0].Student_Fees_Installment_Details[this.Installment_Index].Balance_Amount-this.Receipt_Voucher_.Amount;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    // var Sms=' We have received a Payment of Rs. '+Save_status[0].Amount_+' Thank you for making the payment.Your Pending fee at One Team is'
    // +Save_status[0].Balance_Amount_+'. Support-9567434151'
    
    var Sms='Hi,'+Save_status[0].Amount_+' Thank you for Your Enquiry at ONE TEAM. Our Experienced trainers look forward to Train you. Visit oneteamsolutions.in or call 9567440597 ONE TEAM SOLUTIONS';

            this.Student_Service_.Send_Sms(Save_status[0].Phone_,Sms).subscribe(Rows => {
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Sms,Type:"false"}});
            this.issLoading=false;
            },
            Rows => 
            { 
                this.issLoading=false;
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });
    this.Clr_Receipt_Voucher();
    this.Receipt_History_View=false;
    this.Receipt_View=false;
    this.Get_Receipt_History();
    //  this.Receipt_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
    }
    else
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });

    }
}
Get_Receipt_History()
{
    if(this.Receipt_History_View==false)
    {
        this.Receipt_History_View = true;
        this.issLoading = true;

        this.Student_Service_.Get_Student_Receipt_History(this.Student_Id).subscribe(Rows =>
             {                               
            this.issLoading = false;
                this.Receipt_Voucher_Data = Rows[0];

        },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: false } });
            });
    }
   
    else
    this.Receipt_History_View=false
}
Edit_Receipt_Voucher(Receipt_Voucher_e:Receipt_Voucher,index)
{
    this.Receipt_View=true;
this.Receipt_Voucher_=Receipt_Voucher_e;

this.Receipt_Voucher_=Object.assign({},Receipt_Voucher_e);

this.Client_Accounts_Temp.Client_Accounts_Id=Receipt_Voucher_e.To_Account_Id;
this.Client_Accounts_Temp.Client_Accounts_Name=Receipt_Voucher_e.ToAccount_Name;
this.Client_Accounts_=this.Client_Accounts_Temp;
 
 
for (var i = 0; i < this.Mode_Data.length; i++) {
    if (Receipt_Voucher_e.Payment_Mode == this.Mode_Data[i].Mode_Id)
    this.Mode = this.Mode_Data[i];
}
}
Delete_Receipt_Voucher(Receipt_Voucher_Id,index)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    // this.issLoading=true;
    
    this.Student_Service_.Delete_Receipt_Voucher(Receipt_Voucher_Id).subscribe(Delete_status => {
         
    if(Delete_status[0][0].Receipt_Voucher_Id_>0){
        this.Receipt_History_View=false;
    this.Receipt_Voucher_Data.splice(index, 1);
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    
    }
    else
    {
    //this.Receipt_Voucher_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
    }
 });
}
}

