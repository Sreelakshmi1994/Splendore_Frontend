import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Import } from '../../../models/Student_Import';
import { Student_Import_Details } from '../../../models/Student_Import_Details';
import { Course } from '../../../models/Course';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import * as XLSX from 'ts-xlsx';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: {
     dateInput: 'DD/MM/YYYY',
    },
  display: {dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY',  dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',},
};
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Status } from '../../../models/Status';
import { Users } from '../../../models/Users';
import { Student_Service } from '../../../services/Student.service';
import { Enquiry_Source } from '../../../models/Enquiry_Source';
import { Enquiry_Source_Service } from '../../../services/Enquiry_Source.service';
import { Student_Import_Service } from '../../../services/Student_Import.Service';
import { Student } from '../../../models/Student';
import { Student_Followup } from '../../../models/Student_Followup';
import { Batch } from '../../../models/Batch';
import { MarkStatus } from '../../../models/MarkStatus';
import { Student_Course } from '../../../models/Student_Course';
import { Laptopdetails } from "../../../models/Laptopdetails";
import { Installment_Type } from "../../../models/Installment_Type";
import { Course_Subject } from '../../../models/Course_Subject';
import { Student_Course_Subject } from '../../../models/Student_Course_Subject';
import { Student_Fees_Installment_Master } from '../../../models/Student_Fees_Installment_Master';
import { Student_Fees_Installment_Details } from '../../../models/Student_Fees_Installment_Details';
import {Student_Fees_Installment_Save} from '../../../models/Student_Fees_Installment_Save';
import { Batch_Service } from "../../../services/Batch.service";
import { Agent_Service } from '../../../services/Agent.service';
import { Mastercourse } from "../../../models/Mastercourse";
import { Course_Service } from "../../../services/Course.service";



@Component({
selector: 'app-Level_Import_New',
templateUrl: './Level_Import_New.component.html',
styleUrls: ['./Level_Import_New.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})
export class Level_Import_NewComponent implements OnInit {
    Enquiry_Source_Name_Search:string;

    Student_Import:Student_Import=new Student_Import()
Course_Import_Name_Search="";
Entry_View:boolean=true;
Duplicate_View:boolean=true;
Search_view:boolean=true;
myInnerHeight: number;
myHeight: number;

Total_Import_Entries:number
Total_Duplicate_Data:number
Total_Imports:number

EditIndex: number;
 Total_Entries: number=0;
Data:string;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Course_Import_Edit:boolean;
Course_Import_Save:boolean;
Course_Import_Delete:boolean;
year:any;
month:any;
day:any;
date:any;
isLoading=false; 
Login_Id:string;
Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();
Is_Expiry_Show:boolean=true;
Look_In_Date:Boolean=true;
Employee_Edit:boolean=false;
Employee_Name:string;
Employee_Id:number;
arrayBuffer:any;
file:File;
Key_Value_Name:string="";
Store_Id:number;
Store_Name:string;
Store_Edit:boolean=false;
User_Type:number;
Course_Import_Details_Data:Course[]
Student_Import_Details_Data:Student_Import_Details[]
ImageFile:any
Display_File_Name_:string
Next_FollowUp_Date_Visible:boolean=true;
Followup_Users_Data_Filter: Users[] 

Status_: Status
//Followup_Status_:Status=new Status;


Excel_File:[]

Course_Import_Index:number;
Student_Import_: Student_Import=new Student_Import();
    Course_Import_Data: any;
    // Import_Master_: Import_Master;
    Search_Student_Import_Details_Data: any;

    // FollowUp_Branch_:Branch=new Branch();
    // Search_Branch: Branch = new Branch();
    // Followup_Branch_Data:Branch[]

    

    // FollowUp_Department_:Department=new Department()
    // Followup_Department_Data:Department[]
    // Followup_Department_Data_Check:Department[]

    FollowUp_Status_:Status=new Status()
    Status_Temp:Status= new Status();
    Followup_Status_Data:Status[]

    Followup_Users_Data:Users[]
    Followup_Users_:Users=new Users()
    Users_Temp:Users= new Users();

    Enquiry_Source_Data:Enquiry_Source[]
    Enquiry_Source_Search_:Enquiry_Source=new Enquiry_Source();
    Enquiry_Source_:Enquiry_Source=new Enquiry_Source();
    Enquiry_Source_Search_Data:Enquiry_Source[];
    Enquiry_Source_Temp:Enquiry_Source=new Enquiry_Source();
    Enquiry_Source_Search_Temp:Enquiry_Source=new Enquiry_Source();

    Student_Followup_:Student_Followup= new Student_Followup;
    Student_Duplicate_Array:Student[];
    Login_User:string="0";
    Login_User_Name:string;


    Total_Amount:number=0;

    Lead_Report_Edit:boolean;
    Lead_Report_Save:boolean;
    Lead_Report_Delete:boolean;
 
    myTotalHeight:number;
    Export_Permission:any;
    Export_View :boolean =false;

    User_Search: Users = new Users();
    Users_Data: Users[]


    Enquiry_Status_Search: Status=new Status();
    Enquiry_Status_Data: Status[]
    Enquiry_Status_Temp: Status=new Status();

    // Search_Status: Status = new Status;
    // Search_Status_Temp: Status = new Status;
    // Status_Data: Status[];


    Mastercourse_: Mastercourse = new Mastercourse();
Mastercourse_Temp: Mastercourse = new Mastercourse();
Mastercourse_Data: Mastercourse[];




    profile_View:boolean=true;
    

    Lead_Report_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Is_Date:boolean=true;   

    Course_Data: Course[];
    Course_:Course=new Course;
    CourseSearch_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  
    Course_Data_Search: Course[];
    Course_Data_Filter_Search: Course[] 

    Lead_Report_Data:Student[];



    Select_Student:boolean=false;
    Select_View:boolean=false;

    Edit_Page_Permission: any;


    Batch_Data: Batch[];
    Batch_:Batch=new Batch;
    BatchSearch_:Batch=new Batch;
    Batch_Temp: Batch = new Batch;
    Batch_Data_Filter: Batch[]

    Search_Reading=0;
    Search_Speaking=0;
    Search_Listening=0;
    Search_Writing=0;
    Search_Grammer=0;
    Course_View:boolean=true;

    Student_: Student = new Student();
    Student_Course_: Student_Course = new Student_Course();


Faculty_Users_Data: Users[];

Faculty_Users_Data_Filter: Users[];
Followup_Users_Temp: Users = new Users();
Faculty_: Users = new Users();
Faculty_Temp: Users = new Users();

Laptopdetails_: Laptopdetails = new Laptopdetails();
Laptopdetails_Temp: Laptopdetails = new Laptopdetails();
Laptopdetails_Data: Laptopdetails[];

Installment_Type: Installment_Type = new Installment_Type();
Installment_Type_Temp: Installment_Type = new Installment_Type();
Installment_Type_Data: Installment_Type[];

Course_Id_Edit: number = 0;
Student_Course_Id_Edit: number = 0;
Subject_: Course_Subject = new Course_Subject();
Course_Subject_Data: Course_Subject[];


Student_Course_Temp: Student_Course = new Student_Course();
Student_Course_Data: Student_Course[];
Student_Course_Click_Data: Student_Course[];

Student_Course_Subject_Data: Student_Course_Subject[];

date_Temp: Date = new Date();
batch_id: number;
Student_Fees_Installment_Master_Data: Student_Fees_Installment_Master[];
Student_Fees_Installment_Master_: Student_Fees_Installment_Master =
new Student_Fees_Installment_Master();
Student_Fees_Installment_Master_Temp: Student_Fees_Installment_Master =
new Student_Fees_Installment_Master();
Student_Fees_Installment_Details_: Student_Fees_Installment_Details =
new Student_Fees_Installment_Details();
Student_Fees_Installment_Details_Temp: Student_Fees_Installment_Details =
new Student_Fees_Installment_Details();
Student_Fees_Installment_Details_Data: Student_Fees_Installment_Details[];

Fees_Amount_Edit: boolean = false;

Fees_edit_permission:any;


Student_Fees_Installment_Save_: Student_Fees_Installment_Save =
new Student_Fees_Installment_Save();
Student_Fees_Installment_Save_Data: Student_Fees_Installment_Save[];
Student_Fees_Installment_Save_Temp: Student_Fees_Installment_Save =
new Student_Fees_Installment_Save();

Save_Call_Status: boolean = false;

Student_Data_Search: Student[]
Student_Selected_Details:Student[]


MarkStatus_Type: MarkStatus = new MarkStatus();
MarkStatus_Type_Search: MarkStatus = new MarkStatus();
MarkStatus_Type_Temp: MarkStatus = new MarkStatus();
MarkStatus_Type_Data: MarkStatus[];

markvalue:number;
markfrom:number;
markto:number;

End_Datecheck:boolean = false;

constructor(public Enquiry_Source_Service_:Enquiry_Source_Service,
    public Student_Service_:Student_Service,
    public Student_Import_Service_:Student_Import_Service, 
    public Batch_Service_: Batch_Service,
    public Agent_Service_: Agent_Service,
    public Course_Service_:Course_Service,
    private route: ActivatedRoute,
    private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{     

    this.User_Type=Number(localStorage.getItem('User_Type'));

        this.Login_Id=localStorage.getItem('Login_User');
        this.Login_User_Name=localStorage.getItem('uname');
        // this.Permissions = Get_Page_Permission(27);
         
        // if(this.Permissions==undefined || this.Permissions==null)
        // {
        // localStorage.removeItem('token');
        // this.router.navigateByUrl('Home_Page');
        // }
        // else
        {
        // this.Course_Import_Edit=this.Permissions.Edit;
        // this.Course_Import_Save=this.Permissions.Save;
        // this.Course_Import_Delete=this.Permissions.Delete;
        this.Page_Load();
        }
}
trackByFn(index, item) 
{

    return index;
}
// Download_Excel()
// {
//         this.Student_Service_.exportExcel(,'Excel_File')

// }

Create_New()
{
    this.Entry_View = true;
    this.Search_view = false;
    this.Duplicate_View=false;
    this.Clr_Student_Course();
    this.Clr_Student_Followup();
    
}
Close_Click()
{
    this.Search_view=true;
    this.Entry_View=false;
    this.Duplicate_View=false;
    this.Is_Expiry_Show=true;
    this.FollowUp_Status_=null;
    this.Followup_Users_=null;
    this.Enquiry_Source_ = null;
    this.Student_Followup_.Next_FollowUp_Date = new Date();
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
    this.Search_FromDate=new Date();
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=new Date();
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
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


    if (
        this.Enquiry_Source_Data != undefined &&
        this.Enquiry_Source_Data != null
        )
        this.Enquiry_Source_ = this.Enquiry_Source_Data[0];


     this.FollowUp_Status_ = null;
    this.Followup_Users_ = null;
    }
Clr_Student_Import()
{
    this.Student_Import_Details_Data =[];
    this.Display_File_Name_=null;
    this.Student_Followup_.Next_FollowUp_Date = new Date();
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);

}

Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 400;
    this.myHeight = (window.innerHeight);
    this.myHeight = this.myHeight - 400;
    this.Search_view=false;
    this.Entry_View=true;
    this.Duplicate_View=false;
    this.Load_Enquiry_Source()
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
  
    this.Get_Lead_Load_Data();
   this.Load_Markstatus();
  
    // this.Search_CandidateList();
    this.Load_Laptopdetails();
    this.Load_Installment_Type();
    this.Load_Mastercourse();
    if (this.User_Type==2){
    this.Store_Edit=true;
    //this.Course_Import_Details_Data()
        this.Student_Followup_.Next_FollowUp_Date = new Date();
        this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);

        this.Clr_Student_Import();
        
        this.Get_Menu_Status(63,this.Login_Id)
       // this.Load_Enquiry_Source()


this.Student_Course_.End_Date_Check=false;

     
     

    //this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
    }
}

Get_Menu_Status(Menu_id, Login_user_id)
{
    debugger
this.issLoading = false;
this.Student_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            

    debugger
    if (Rows[0][0]==undefined)
    {
        if(Menu_id==63)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==63)
        {
            
          

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.Course_Import_Edit=this.Permissions.Edit;
                this.Course_Import_Save=this.Permissions.Save;
                this.Course_Import_Delete=this.Permissions.Delete;

        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}

Search_Student_Import()
{
    var look_In_Date_Value=0;
    if (this.Look_In_Date == true )
    look_In_Date_Value = 1;
this.issLoading=true;

this.Student_Import_Service_.Search_Student_Import(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),look_In_Date_Value).subscribe(Rows => {
     
this.Search_Student_Import_Details_Data=Rows[0];
 
//this.Total_Entries=this.Search_Student_Import_Details_Data.length;

 this.issLoading=false;
 
if(this.Search_Student_Import_Details_Data.length==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
 this.issLoading=false;
},
Rows => { 
        this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}



// Delete_Course_Import(User_Id,index)
// {
     
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
// this.Search_Student_Import();
// dialogRef.afterClosed().subscribe(result =>
// {
     
// if(result=='Yes')
// {

// this.Course_Import_Details_Data.splice(index, 1);
 
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});


// }
// });
// }

Delete_Student_Import(Student_Import_Id,index)
{
     

this.Student_Import_Details_Data.splice(index, 1);
 

}
Focus_It()
{  
    setTimeout("$('[name=Followup_Status]').focus();", 0)
}

incomingfile(event) {

    this.file=event.target.files[0];
   // this.ImageFile = this.file;
     this.Display_File_Name_ = this.file.name;
     //const file = (event.target as HTMLInputElement).files
     this.Upload();
  }
  

  Branch_Change()
  { 
      
      this.Followup_Users_=null;
      this.FollowUp_Status_=null;
      this.Followup_Users_Data=[];
      this.Followup_Status_Data=[];
  }
  Department_Change()
{    
    //  document.getElementById("Followup_Status").focus(); 
        $('[name=Followup_Status]').focus();
    this.Focus_It();
    this.Followup_Users_=null;
    this.FollowUp_Status_=null;
    this.Followup_Users_Data=[];
    this.Followup_Status_Data=[];
    // this.Followup_Department_Data=[];
    // if(this.FollowUp_Department_.Department_FollowUp==true)
    // this.Next_FollowUp_Date_Visible=false;
    // else
    // this.Next_FollowUp_Date_Visible=true;
    this.Student_Followup_.Next_FollowUp_Date=new Date();
    this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
    
}

 Upload1() {
    
     
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
         
            this.Student_Import_Details_Data=(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
            
            this.Student_Import_Details_Data.sort();
            
        }
     
        fileReader.readAsArrayBuffer(this.file);
}
// Search_Enquiry_Source()
// {
// this.issLoading=true;
// this.Enquiry_Source_Service_.Search_Enquiry_Source(this.Enquiry_Source_Name_Search).subscribe(Rows => {
//  this.Enquiry_Source_Data=Rows[0];
// this.Total_Entries=this.Enquiry_Source_Data.length;
// if(this.Enquiry_Source_Data.length==0)
// {
// this.issLoading=false;
// const dialogRef = this.dialogBox.open
// ( DialogBox_Component, {panelClass:'Dialogbox-Class'
// ,data:{Message:'No Details Found',Type:"3"}});
// }
// this.issLoading=false;
//  },
//  Rows => { 
// this.issLoading=false;
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//  });
// }

// Search_Enquiry_Source_Typeahead(event: any)
// {   
//     var Value = "";
//    if(this.Enquiry_Source_Data==undefined)
//    this.Enquiry_Source_Data=[];
//     if(this.Enquiry_Source_Data.length==0 )
//     {
//     if (event.target.value == "")
//         Value = undefined;
//     else
//         Value = event.target.value;
         
//             if(this.Enquiry_Source_Data==undefined || this.Enquiry_Source_Data.length==0)
//             {
//         this.issLoading = true;
//     this.Enquiry_Source_Service_.Search_Enquiry_Source_Typeahead('').subscribe(Rows => {
 
//         if (Rows != null) {
//             this.Enquiry_Source_Data = Rows[0];
//             this.issLoading = false;
//         }
//     },
//         Rows => {
//             this.issLoading = false;
           
//         });
//     }

// } 
// }
// display_Enquiry_Source(Enquiry_Source_: Enquiry_Source) 
// {
//     if (Enquiry_Source_) { return Enquiry_Source_.Enquiry_Source_Name; }
// }



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

Search_User_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;       
     if(this.Followup_Users_Data==undefined || this.Followup_Users_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Users_Typeahead('').subscribe(Rows => {
        if (Rows != null) {
            this.Followup_Users_Data = Rows[0];
            this.issLoading = false;

            
        this.Followup_Users_Data_Filter=[];

        for (var i=0;i<this.Followup_Users_Data.length;i++)
        {
            if(this.Followup_Users_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Followup_Users_Data_Filter.push(this.Followup_Users_Data[i])
        }
    }
    },
        Rows => {
            this.issLoading = false;
          });
    } 
    else
    {
       
        this.Followup_Users_Data_Filter=[];
        for (var i=0;i<this.Followup_Users_Data.length;i++)
        {
            if(this.Followup_Users_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Followup_Users_Data_Filter.push(this.Followup_Users_Data[i])
        }
    }

}
display_Followup_Users(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}
Status_Change(Status)
{
    
   this.FollowUp_Status_= Status;
    if(this.FollowUp_Status_.FollowUp==true)
    this.Next_FollowUp_Date_Visible=false;
    else
    this.Next_FollowUp_Date_Visible=true;
    //this.Student_Followup_.Next_FollowUp_Date=new Date();
    //this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
}

Save_Student_Import()
 { 
    if(this.FollowUp_Status_.FollowUp!=false)
    this.Student_Followup_.Next_FollowUp_Date = this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
else
{
    this.Student_Followup_.Next_FollowUp_Date = new Date();
    this.Student_Followup_.Next_FollowUp_Date=this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
}
    if (this.Student_Import_Details_Data== undefined || this.Student_Import_Details_Data == null || this.Student_Import_Details_Data== undefined ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Choose File', Type: "3" } });
       return;
    }
  
    if(this.FollowUp_Status_==null||this.FollowUp_Status_.Status_Id==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Status', Type: "3" } });
        return;
    }
    if(this.Followup_Users_==null||this.Followup_Users_.Users_Id==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter User', Type: "3" } });
        return;
    }
    if(this.Enquiry_Source_==null||this.Enquiry_Source_.Enquiry_Source_Id==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Enquiry Source', Type: "3" } });
        return;
    }
    if(this.Student_Followup_.Next_FollowUp_Date==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Date', Type: "3" } });
        return;
    }
//delete this.Course_Import_Details_Data['Category']
 
if(this.Student_Import_Details_Data.length==0)
{
     
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Please Add Details',Type: "3" }});    

return 
}
var j=0;
for(var i=0; i<this.Student_Import_Details_Data.length;i++)
{  j=i+1
    
    if (undefined == this.Student_Import_Details_Data[i].Name)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Student name is blank at row ' +j ,Type: "3" }});    
        i= this.Student_Import_Details_Data.length
        return;
    }
    if ("" == this.Student_Import_Details_Data[i].Name.trim())
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Student name is blank at row ' + j ,Type: "3" }});    
        i= this.Student_Import_Details_Data.length
        return;
    }
    else if (undefined == this.Student_Import_Details_Data[i].Mobile)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Mobile is blank at row ' + j ,Type: "3" }});    
        i= this.Student_Import_Details_Data.length
        return;
    }
    else if (""== this.Student_Import_Details_Data[i].Mobile.toString().trim())
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Mobile number is blank at row ' +j ,Type: "3" }});    
        i= this.Student_Import_Details_Data.length
        return;
    }
 
    // else if (this.Student_Import_Details_Data[i].Visa_Submission_Date=='MM-DD-YYYY')
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Incorrect Date format' +j ,Type: "3" }});    
    //     i= this.Student_Import_Details_Data.length
    //     return;
    // }
}
{
     
// this.Student_Import_.Branch= this.FollowUp_Branch_.Branch_Id;
// this.Student_Import_.Department= this.FollowUp_Department_.Department_Id;

this.Student_Import_.Status=this.FollowUp_Status_.Status_Id;
this.Student_Import_.Status_Name=this.FollowUp_Status_.Status_Name;
this.Student_Import_.Status_FollowUp=this.FollowUp_Status_.FollowUp;
this.Student_Import_.Remark=this.Student_Followup_.Remark;
this.Student_Import_.Enquiry_Source= this.Enquiry_Source_.Enquiry_Source_Id;
this.Student_Import_.Enquiry_Source_Name=this.Enquiry_Source_.Enquiry_Source_Name;
this.Student_Import_.Next_FollowUp_Date= this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
this.Student_Import_.To_User= this.Followup_Users_.Users_Id;
this.Student_Import_.To_User_Name=this.Followup_Users_.Users_Name;

this.Student_Import_.By_User_Id=parseInt( this.Login_Id);
this.Student_Import_.By_User_Name=this.Login_User_Name;


debugger
if(this.MarkStatus_Type.Markstatus_Id==0 || this.MarkStatus_Type.Markstatus_Id==undefined || this.MarkStatus_Type.Markstatus_Id==null){
  this.Student_Import_.Markstatus_Id=0;
  this.Student_Import_.Markstatus_Name='';
}else{
  this.Student_Import_.Markstatus_Id=this.MarkStatus_Type.Markstatus_Id;
  this.Student_Import_.Markstatus_Name=this.MarkStatus_Type.Markstatus_Name;
}



 
 this.Student_Import_.Student_Import_Details =this.Student_Import_Details_Data;

document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
 

this.Student_Import_Service_.Save_Student_Import(this.Student_Import_).subscribe(Save_status => {
    
    ;
        this.issLoading=false;
                
   // log(Save_status[0][0])
   if(Number(Save_status[0]==undefined)){
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  
    document.getElementById('Save_Button').hidden=false;
    //this.Clr_Student_Import();
   }
if(Number(Save_status[0][0].import_master_id)>0)
{
    this.Student_Duplicate_Array = Save_status[1];
    this.Total_Duplicate_Data=this.Student_Duplicate_Array.length;
    this.Total_Import_Entries=this.Student_Import_Details_Data.length;
    this.Total_Imports=(this.Student_Import_Details_Data.length)-(this.Student_Duplicate_Array.length);

//const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:' Imported',Type:"false"}});
        this.Duplicate_View=true;
        this.Entry_View=false;
        this.Search_view=false;
        this.Search_Student_Import();
        this.Clr_Student_Import();
        //this.Close_Click();
document.getElementById('Save_Button').hidden=true;
}
// else if(Number(Save_status[0][0].Student_Id_)==-1)
//         {  
//             this.Duplicate_View=true;
//             //const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'The Phone Number Already Exist for '+Save_status[0][0].Duplicate_Student_Name+' and is handled by '+Save_status[0][0].Duplicate_User_Name,Type:"2"}});
//         }
else{
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
document.getElementById('Save_Button').hidden=true;
}

},
Rows => { 
        this.issLoading=false;
document.getElementById('Save_Button').hidden=true;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}
} 

// Edit_Course_Import(Import_Master_e:Import_Master,index)
// {
   
// this.Course_Import_Index=index;
// this.Student_Import_Service_.Get_Student_Import(Import_Master_e.Import_Master_Id).subscribe(Rows => {
     
// if (Rows != null) {
// this.Course_Import_Details_Data = Rows[0];

// this.issLoading = false;
// }

// },
// Rows => {
 
// this.issLoading = false;
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
// });
// this.Entry_View=true;
// this.Import_Master_=Import_Master_e;
// this.Import_Master_=Object.assign({},Import_Master_e);
// }



Export()
{
    
        this.Student_Service_.exportExcel(this.Lead_Report_Data,'Lead Report')
       
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
    this.Student_Course_.Start_Date = this.New_Date(
    this.Student_Course_.Start_Date
    );


    // y  this.Student_Course_.End_Date = new Date();
    // this.Student_Course_.End_Date = this.New_Date(
    // this.Student_Course_.End_Date
    // );

    this.Student_Course_.End_Date_Check=false;
    this.Student_Course_.End_Date_L ="";


    
    // this.Student_Course_.Join_Date = new Date();
    // this.Student_Course_.Join_Date = this.New_Date(
    // this.Student_Course_.Join_Date
    // );
    this.Student_Course_.By_User_Id = 0;
    this.Student_Course_.Status = 0;
    this.Student_Course_.Installment_Type_Id = 0;
    this.Student_Course_.No_Of_Installment = 0;
    this.Student_Course_.Duration = "";
    this.Student_Course_.Revision_Duration=0;
    this.Course_ = null;
    this.Batch_ = null;
    this.Faculty_ = null;
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
        this.MarkStatus_Type_Data != null &&
        this.MarkStatus_Type_Data != undefined
        )
        this.MarkStatus_Type = this.MarkStatus_Type_Data[0];



    if (
      this.Mastercourse_Data != undefined &&
      this.Mastercourse_Data != null
      )
      this.Mastercourse_ = this.Mastercourse_Data[0];




      if (
        this.Laptopdetails_Data != undefined &&
        this.Laptopdetails_Data != null
        )
        this.Laptopdetails_ = this.Laptopdetails_Data[0];
     
   
    this.Student_Course_.Reading=0;
    this.Student_Course_.Writing=0;
    this.Student_Course_.Speaking=0;
    this.Student_Course_.Listening=0;
    this.Student_Course_.Grammer=0;
    this.Student_Course_.TotalMark=0;

    this.Student_Course_.End_Date_Check=false;
    // this.Receipt_Voucher_.Fees_Type_Id = 0;
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
            // this.Installment_Type_Temp.Installment_Type_Id = 0;
            // this.Installment_Type_Temp.Installment_Type_Name = "Select";
            // this.Installment_Type_Data.unshift(this.Installment_Type_Temp);
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


    Load_Markstatus()
    {
        this.Student_Service_.Load_Markstatus().subscribe(Rows =>
    {
    this.MarkStatus_Type_Data= Rows[0];        
    this.MarkStatus_Type_Temp.Markstatus_Id = 0;
    this.MarkStatus_Type_Temp.Markstatus_Name = "Select";
    this.MarkStatus_Type_Data.unshift(this.MarkStatus_Type_Temp);
    this.MarkStatus_Type=this.MarkStatus_Type_Data[0]; 
    this.MarkStatus_Type_Search=this.MarkStatus_Type_Data[0]; 
    },
        Rows => {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}

Get_Lead_Load_Data()
{
this.issLoading = true;
this.Student_Service_.Get_Lead_Load_Data().subscribe(Rows => {
   
    if (Rows != undefined)
    {
        
        this.issLoading = false;
        // this.Department_Data = Rows.returnvalue.Department;
         this.Users_Data = Rows.returnvalue.Users;
         this.Enquiry_Status_Data = Rows.returnvalue.Status;
        
        this.Users_Temp.Users_Id = 0;
        this.Users_Temp.Users_Name = "All";
        this.Users_Data.unshift(Object.assign({},this.Users_Temp));
        this.User_Search = this.Users_Data[0];

        this.Enquiry_Status_Temp.Status_Id = 0;
        this.Enquiry_Status_Temp.Status_Name = "All";
        this.Enquiry_Status_Data.unshift(Object.assign({},this.Enquiry_Status_Temp));
        this.Enquiry_Status_Search = this.Enquiry_Status_Data[0];

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
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

Search_Course_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
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

        this.Course_Data_Filter=[];

        for (var i=0;i<this.Course_Data.length;i++)
        {
            if(this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
                this.Course_Data_Filter.push(this.Course_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Course_Data_Filter=[];
        for (var i=0;i<this.Course_Data.length;i++)
        {
            if(this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
                this.Course_Data_Filter.push(this.Course_Data[i])
        }
    }
}
Edit_Lead(Student_Id, i) {

    localStorage.setItem('Student_Id', Student_Id);
    console.log(Student_Id)
    this.Edit_Page_Permission = Get_Page_Permission(14);
    if (this.Edit_Page_Permission == undefined ||this.Edit_Page_Permission.Edit == undefined || this.Edit_Page_Permission.Edit ==0 || this.Edit_Page_Permission.Edit ==null) {
        ;
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }    
    else if (this.Edit_Page_Permission.View == true)    
    {
        ;
        this.router.navigateByUrl('/Student');
       // this.router.navigateByUrl('/Stu');
      // window.open('/Student')      
    //   this.goToLink();  
    }
    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }
}
goToLink() {
    
    return;
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/Student'])
    );
    // window.open('/Student');
    window.open(url, '_blank');
  }
display_Course(Course_: Course)
{     
    if (Course_) { return Course_.Course_Name; }
}


Search_Course_Typeahead_Forcandidatelist(event: any) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value;
    if (this.Course_Data_Search == undefined || this.Course_Data_Search.length == 0) {
    this.issLoading = true;
    
    this.Student_Service_.Search_Course_Typeahead_Forcandidatelist("").subscribe(
    (Rows) => {
      
    if (Rows != null) {
    this.Course_Data_Search = Rows[0];
    this.issLoading = false;
    
    this.Course_Data_Filter_Search = [];
    
    for (var i = 0; i < this.Course_Data_Search.length; i++) {
    if (this.Course_Data_Search[i].Course_Name.toLowerCase().includes(Value))
    this.Course_Data_Filter_Search.push(this.Course_Data_Search[i]);
    }
    }
    },
    (Rows) => {
    this.issLoading = false;
    }
    );
    } else {
    this.Course_Data_Filter_Search = [];
    for (var i = 0; i < this.Course_Data_Search.length; i++) {
    if (this.Course_Data_Search[i].Course_Name.toLowerCase().includes(Value))
    this.Course_Data_Filter_Search.push(this.Course_Data_Search[i]);
    }
    }
    }


display_CourseSearch(CourseSearch_: Course)
{     
    if (CourseSearch_) { return CourseSearch_.Course_Name; }
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
// Search_CandidateList()
// {
   
//     if (
//         this.CourseSearch_ == undefined ||
//         this.CourseSearch_ == null ||
//         this.CourseSearch_.Course_Id == undefined ||
//         this.CourseSearch_.Course_Id == 0
//         ) {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, {
//         panelClass: "Dialogbox-Class",
//         data: { Message: "Select Level", Type: "3" },
//         });
//         return;
//         }
   
   
   
   
//     var  look_In_Date_Value=0
//     var User_Id=0,Course_Id=0,Batch_Id=0,
//     ReadingSearch=0,SpeakingSearch=0,
//     ListeningSearch=0,
//     WritingSearch=0,GrammerSearch=0,Markstatus_Id=0,
//     Markstatus_Id=0,markfrom_=0,markto_=0;
//     if (this.Is_Date == true)
//          look_In_Date_Value = 1;
    
//     if (this.User_Search != undefined && this.User_Search!=null)
//         if (this.User_Search.Users_Id != undefined && this.User_Search.Users_Id != null)
//             User_Id = this.User_Search.Users_Id;
 

//     if (this.CourseSearch_ != undefined && this.CourseSearch_ != null)
//         if (this.CourseSearch_.Course_Id != undefined && this.CourseSearch_.Course_Id != null)
//             Course_Id = this.CourseSearch_.Course_Id;   

//      if (this.BatchSearch_ != undefined && this.BatchSearch_ != null)
//             if (this.BatchSearch_.Batch_Id != undefined && this.BatchSearch_.Batch_Id != null)
//             Batch_Id = this.BatchSearch_.Batch_Id;   



//             if (this.MarkStatus_Type_Search != undefined && this.MarkStatus_Type_Search!=null)
//             if (this.MarkStatus_Type_Search.Markstatus_Id != undefined && this.MarkStatus_Type_Search.Markstatus_Id != null)
//             Markstatus_Id = this.MarkStatus_Type_Search.Markstatus_Id;

            
//             this.markvalue=1

//             if (this.markfrom != undefined && this.markfrom != null &&this.markfrom != 0)
//             markfrom_ = this.markfrom;
    
//             else
//             this.markvalue=0
    
//             if (this.markto != undefined &&this.markto != null &&this.markto != 0 )
//              markto_ = this.markto;
    
//              else
//              this.markvalue=0


// 
//                 ReadingSearch=this.Search_Reading;
//                 SpeakingSearch=this.Search_Speaking;
//                 ListeningSearch=this.Search_Listening; 
//                 WritingSearch=this.Search_Writing;
//                 GrammerSearch=this.Search_Grammer;

//     this.issLoading = true;
//     this.Student_Service_.Search_CandidateList(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),this.Login_User,User_Id,Course_Id,Batch_Id,ReadingSearch,SpeakingSearch,ListeningSearch,WritingSearch,GrammerSearch,Markstatus_Id,this.markvalue,markfrom_,markto_).subscribe(Rows =>{

//     this.Lead_Report_Data = Rows[0];
//     this.Total_Entries = this.Lead_Report_Data.length;
//     this.issLoading = false;
//     if(this.Lead_Report_Data.length==0)
//     { 
//     this.issLoading=false;
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
//     }
//     this.issLoading=false;
//     },
//     Rows => 
//     { 
//     this.issLoading=false;
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//     });
// }

Search_Batch_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
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

        this.Batch_Data_Filter=[];

        for (var i=0;i<this.Batch_Data.length;i++)
        {
            if(this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
                this.Batch_Data_Filter.push(this.Batch_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Batch_Data_Filter=[];
        for (var i=0;i<this.Batch_Data.length;i++)
        {
            if(this.Batch_Data[i].Batch_Name.toLowerCase().includes(Value))
                this.Batch_Data_Filter.push(this.Batch_Data[i])
        }
    }
}
display_Batch(Batch_: Batch)
{     
    if (Batch_) { return Batch_.Batch_Name; }
}
display_BatchSearch(BatchSearch_: Batch)
{     
    if (BatchSearch_) { return BatchSearch_.Batch_Name; }
}
Student_View_Click()
{
 for(var i=0;i<this.Lead_Report_Data.length;i++)
{
    if(this.Select_Student==false)
        this.Lead_Report_Data[i].Check_Box_View=true;
    else
        this.Lead_Report_Data[i].Check_Box_View=false;
}
}
New_Transfer()
{
    var Status=false
    for (var m = 0; m < this.Lead_Report_Data.length; m++)
    {
        if (Boolean(this.Lead_Report_Data[m].Check_Box_View) == true)
            Status=true
    }
    if(Status==false){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Student to Transfer', Type: "3" } });
        return;
    }
  
    this.Course_View=true;
    this.Entry_View=true;
}


Search_Course_Typeahead_Formastercourse(event: any) {
    var Value = "";
    if (event.target.value == "") Value = "";
    else Value = event.target.value;
   /* if (this.Course_Data == undefined || this.Course_Data.length == 0) {
    } */
    this.issLoading = true;
    debugger
    this.Student_Service_.Search_Course_Typeahead_Formastercourse(Value,this.Mastercourse_.MasterCourse_Id).subscribe(
    (Rows) => {
        debugger
    if (Rows != null) {
    this.Course_Data = Rows[0];
    this.issLoading = false;
    
    // this.Course_Data_Filter = [];
    
    // for (var i = 0; i < this.Course_Data.length; i++) {
    // if (this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
    // this.Course_Data_Filter.push(this.Course_Data[i]);
    // }
    }
    },
    (Rows) => {
    this.issLoading = false;
    }
    );
   
    /*else {
    this.Course_Data_Filter = [];
    for (var i = 0; i < this.Course_Data.length; i++) {
    if (this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
    this.Course_Data_Filter.push(this.Course_Data[i]);
    }
    }*/
    }
    display_MasterCourse(Course_: Course) {
    if (Course_) {
    return Course_.Course_Name;
    }
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

        display_Followup_Users_Excel(Users_: Users) {
            if (Users_) {
            return Users_.Users_Name;
            }
            }




            Get_Course_Student(Course_Temp: Course) {
                debugger
                this.Course_Id_Edit = Course_Temp.Course_Id;
                this.Student_Course_.Duration=(Course_Temp.Duration);
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
                //  this.Student_Course_.Join_Date = this.Student_Course_Data[0].Join_Date;
               
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




                // this.Student_Course_.Start_Date = this.New_Date(
                // this.Student_Course_.Start_Date
                // );




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
                Instalment_Change() {
                    ;
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
                        
                        for (
                        var j = 0;
                        j < this.Student_Fees_Installment_Details_Data.length;
                        j++
                        ) {
                        this.date_Temp = this.Add_Date(
                        new Date(
                        moment(this.Student_Course_.Start_Date).format("YYYY-MM-DD")
                        ),
                        Number(
                        this.Student_Fees_Installment_Details_Data[j].Instalment_Period
                        )
                        );
                        this.Student_Fees_Installment_Details_Data[j].Instalment_Date =
                        this.date_Temp;
                        }
                        this.issLoading = false;
                        }
                        },
                        (Rows) => {
                        this.issLoading = false;
                        }
                        );
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

                
                    Save_Student_Course() {




                        var Student_Deatils=[];

                        
                        for (var m = 0; m < this.Lead_Report_Data.length; m++)
                        {
                            if (Boolean(this.Lead_Report_Data[m].Check_Box_View) == true)
                            {
                                //Status=true
                                //this.Student_Selection_Data_Temp.push(this.Student_Data[m]);
                                Student_Deatils.push({'Student_Id':this.Lead_Report_Data[m].Student_Id} )
                            }
                        }




                        
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
                        if (this.Batch_ == undefined || this.Batch_ == null) {
                        const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: "Dialogbox-Class",
                        data: { Message: "Select Batch", Type: "3" },
                        });
                        return;
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
                        
                        
                        
                        
                        if (
                        this.Batch_.Batch_Id == null ||
                        this.Batch_.Batch_Id == undefined ||
                        this.Batch_.Batch_Id == 0
                        ) {
                        const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: "Dialogbox-Class",
                        data: { Message: "Select Batch", Type: "3" },
                        });
                        return;
                        }
                        if (this.Faculty_ == undefined || this.Faculty_ == null) {
                        const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: "Dialogbox-Class",
                        data: { Message: "Select Faculty", Type: "3" },
                        });
                        return;
                        }
                        if (
                        this.Faculty_.Users_Id == null ||
                        this.Faculty_.Users_Id == undefined ||
                        this.Faculty_.Users_Id == 0
                        ) {
                        const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: "Dialogbox-Class",
                        data: { Message: "Select Faculty", Type: "3" },
                        });
                        return;
                        }
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
                        
                        this.Student_Course_.Laptop_details_Id=this.Laptopdetails_.Laptop_details_Id;
                        this.Student_Course_.Laptop_details_Name=this.Laptopdetails_.Laptop_details_Name;


                        this.Student_Course_.Markstatus_Id=this.MarkStatus_Type.Markstatus_Id;
                        this.Student_Course_.Markstatus_Name=this.MarkStatus_Type.Markstatus_Name;

                        //   this.Student_Fees_Installment_Save_Temp.Delivery_Date=this.New_Date(new Date(moment(this.Student_Fees_Installment_Master_Data[i].Delivery_Date).format('YYYY-MM-DD')));
                        this.Student_Fees_Installment_Save_Data.push(
                        Object.assign({}, this.Student_Fees_Installment_Save_Temp)
                        );
                        for (var j = 0;j <Number(this.Student_Fees_Installment_Master_Data[i].Student_Fees_Installment_Details.length);j++)
                        {
                        this.Student_Fees_Installment_Save_Temp.Student_Fees_Installment_Master_Id =i;
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
                        
                        for (var i = 0; i < this.Student_Fees_Installment_Details_Data.length; i++)
                        this.Student_Fees_Installment_Details_Data[i].Instalment_Date =
                        this.New_Date(
                        new Date(
                        moment(
                        this.Student_Fees_Installment_Details_Data[i].Instalment_Date
                        ).format("YYYY-MM-DD")
                        )
                        );
                        
                        
                        this.Student_Course_.Student_Fees_Installment_Details =
                        this.Student_Fees_Installment_Details_Data;

                        this.Student_Course_.Student_Selected_Details =Student_Deatils;

                        
                        // this.Student_Course_.Student_Id = this.Student_Id;
                        // this.Student_Course_.Student_Id = this.Student_.Student_Id;
                        //this.Student_Course_.Old_Course_Id = this.Course_.Course_Id;
                        this.Student_Course_.Course_Id = this.Course_.Course_Id;
                        this.Student_Course_.Course_Name = this.Course_.Course_Name;
                        this.Student_Course_.Batch_Id = this.Batch_.Batch_Id;
                        this.Student_Course_.Batch_Name = this.Batch_.Batch_Name;
                        this.Student_Course_.Faculty_Id = this.Faculty_.Users_Id;
                        this.Student_Course_.Installment_Type_Id =
                        this.Installment_Type.Installment_Type_Id;
                        this.Student_Course_.By_User_Id = Number(this.Login_User);
                        this.Student_Course_.Student_Course_Subject =
                        this.Student_Course_Subject_Data;

                        this.Student_Course_.Markstatus_Id = this.MarkStatus_Type.Markstatus_Id;
                        this.Student_Course_.Markstatus_Name = this.MarkStatus_Type.Markstatus_Name;
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
                        this.Student_Course_.End_Date = this.New_Date(
                        new Date(moment(this.Student_Course_.End_Date).format("YYYY-MM-DD"))
                        );
                        
                        document.getElementById('Save_Button').hidden=true;
                        
                        this.Student_Service_.Save_Student_Course_Candidatelist(this.Student_Course_).subscribe(
                        (Save_status) => {
                            
                        if (Number(Save_status[0].Student_Course_Id_) > 0) {
                        this.Save_Call_Status = false;
                        
                     
                        
                        const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: "Dialogbox-Class",
                        data: { Message: "Saved", Type: "false" },
                        });
                        
                        // this.course_click();
                      this.Clr_Student_Course();;
                        document.getElementById('Save_Button').hidden=false;
                     
                        this.Save_Call_Status = false;
                        } else {
                        this.Save_Call_Status = false;
                        const dialogRef = this.dialogBox.open(DialogBox_Component, {
                        panelClass: "Dialogbox-Class",
                        data: { Message: "Error Occured", Type: "2" },
                        
                        });
                        document.getElementById('Save_Button').hidden=true;
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
                            this.Batch_ = null;
                            this.Faculty_ = null;
                            this.Student_Fees_Installment_Master_Data = [];
                            this.Student_Course_Subject_Data = [];
                            if (
                            this.Installment_Type_Data != undefined &&
                            this.Installment_Type_Data != null
                            )
                            this.Installment_Type = this.Installment_Type_Data[0];



                            if (
                                this.MarkStatus_Type_Data != null &&
                                this.MarkStatus_Type_Data != undefined
                                )
                                this.MarkStatus_Type = this.MarkStatus_Type_Data[0];



                            }


                            Calculate_Total_Mark()
                            {
                                var Reading=0,Writing=0,Listening=0,Grammer=0,Speaking=0,TotalMark=0;
                               
                               
                                if(this.Student_Course_.TotalMark ==undefined||this.Student_Course_.TotalMark  ==null)
                                TotalMark =0
                      
                      
                                if(this.Student_Course_.Reading ==undefined||this.Student_Course_.Reading ==null)
                                Reading=0;
                                else
                                Reading= this.Student_Course_.Reading ; 
                              
                                if(this.Student_Course_.Writing ==undefined||this.Student_Course_.Writing  ==null)
                                Writing=0;
                                else
                                Writing= this.Student_Course_.Writing;
                      
                               
                      
                                if(this.Student_Course_.Listening ==undefined||this.Student_Course_.Listening  ==null)
                                Listening=0;
                                else
                                Listening= this.Student_Course_.Listening;
                      
                      
                      
                                if(this.Student_Course_.Grammer ==undefined||this.Student_Course_.Grammer  ==null)
                                Grammer=0;
                                else
                                Grammer= this.Student_Course_.Grammer;
                      
                      
                      
                                if(this.Student_Course_.Speaking ==undefined||this.Student_Course_.Speaking  ==null)
                                Speaking=0;
                                else
                                Speaking= this.Student_Course_.Speaking;
                      
                      
                            
                                TotalMark = Reading + Writing + Listening + Grammer +Speaking;
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

                                        debugger
                                        var Date_Temp,Date_Tempc;
                                        for (var j=2;j-1<=this.Student_Import_Details_Data.length;j++) 
                                        {
                                                 // this.Student_Import_Details_Data[j-2].Slno=(worksheet['A'+j]!=undefined) ? worksheet['A'+j].v :''
                                                //   var s = worksheet['B'+j].v;
                                                  this.Student_Import_Details_Data[j-2].Student_Name=(worksheet['B'+j]!=undefined) ? worksheet['B'+j].v :''
                                                  this.Student_Import_Details_Data[j-2].Gender_Name=(worksheet['C'+j]!=undefined) ? worksheet['C'+j].v :''
                                                  this.Student_Import_Details_Data[j-2].Mobile=(worksheet['D'+j]!=undefined) ? worksheet['D'+j].v :''
                                                  this.Student_Import_Details_Data[j-2].Father_Whatsapp=(worksheet['E'+j]!=undefined) ? worksheet['E'+j].v :''
                                                  this.Student_Import_Details_Data[j-2].Email=(worksheet['F'+j]!=undefined) ? worksheet['F'+j].v :''
                                                  this.Student_Import_Details_Data[j-2].Address1=(worksheet['G'+j]!=undefined) ? worksheet['G'+j].v :''
                                        } 
                                    };
                            
                                    fileReader.readAsArrayBuffer(this.file);
                                }                           

                                
                                Save_Level_Import()
                                { 

                                    debugger
                                   if(this.FollowUp_Status_.FollowUp!=false)
                                   this.Student_Followup_.Next_FollowUp_Date = this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
                               else
                               {
                                   this.Student_Followup_.Next_FollowUp_Date = new Date();
                                   this.Student_Followup_.Next_FollowUp_Date=this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
                               }
                                   if (this.Student_Import_Details_Data== undefined || this.Student_Import_Details_Data == null || this.Student_Import_Details_Data== undefined ) {
                                       const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Choose File', Type: "3" } });
                                      return;
                                   }
                                 
                                   if(this.FollowUp_Status_==null||this.FollowUp_Status_.Status_Id==undefined){
                                       const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Status', Type: "3" } });
                                       return;
                                   }
                                   if(this.Followup_Users_==null||this.Followup_Users_.Users_Id==undefined){
                                       const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter To Staff', Type: "3" } });
                                       return;
                                   }

                                   if(this.Enquiry_Source_ == undefined ||
                                    this.Enquiry_Source_ == null ||
                                    this.Enquiry_Source_.Enquiry_Source_Id == undefined ||
                                    this.Enquiry_Source_.Enquiry_Source_Id == 0){
                                    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Enquiry Source', Type: "3" } });
                                    return;
                                }
                                  
                                if(this.Student_Followup_.Next_FollowUp_Date==undefined){
                                    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Next FollowUp Date', Type: "3" } });
                                    return;
                                }


                                


                                if(this.Student_Followup_.Remark==null||this.Student_Followup_.Remark==undefined){
                                    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Followup Call Comments', Type: "3" } });
                                    return;
                                }




                                   if(this.Enquiry_Source_==null||this.Enquiry_Source_.Enquiry_Source_Id==undefined){
                                       const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Enquiry Source', Type: "3" } });
                                       return;
                                   }
                                   if(this.Student_Followup_.Next_FollowUp_Date==undefined){
                                       const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Date', Type: "3" } });
                                       return;
                                   }
                               //delete this.Course_Import_Details_Data['Category']
                                
                               if(this.Student_Import_Details_Data.length==0)
                               {
                                    
                                   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Please Add Details',Type: "3" }});    
                               
                               return 
                               }

                               debugger

                               var j=0;
                               for(var i=0; i<this.Student_Import_Details_Data.length;i++)
                               {  j=i+1
                                   
                                   if (undefined == this.Student_Import_Details_Data[i].Name
                                 )
                                   {
                                       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Student name is blank at row ' +j ,Type: "3" }});    
                                       i= this.Student_Import_Details_Data.length
                                       return;
                                   }
                                   if ("" == this.Student_Import_Details_Data[i].Name.trim())
                                   {
                                       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Student name is blank at row ' + j ,Type: "3" }});    
                                       i= this.Student_Import_Details_Data.length
                                       return;
                                   }
                                   else if (undefined == this.Student_Import_Details_Data[i].Mobile)
                                   {
                                       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Mobile is blank at row ' + j ,Type: "3" }});    
                                       i= this.Student_Import_Details_Data.length
                                       return;
                                   }
                                   else if (""== this.Student_Import_Details_Data[i].Mobile.toString().trim())
                                   {
                                       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Mobile number is blank at row ' +j ,Type: "3" }});    
                                       i= this.Student_Import_Details_Data.length
                                       return;
                                   }
                                debugger


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


                                   if (this.Course_ == undefined || this.Course_ == null) {
                                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                    panelClass: "Dialogbox-Class",
                                    data: { Message: "Select Level", Type: "3" },
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
                                    data: { Message: "Select Level", Type: "3" },
                                    });
                                    return;
                                    }
                                    if (this.Batch_ == undefined || this.Batch_ == null) {
                                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                    panelClass: "Dialogbox-Class",
                                    data: { Message: "Select Batch", Type: "3" },
                                    });
                                    return;
                                    }
                                    
                                    // if(this.Student_Course_.Join_Date==undefined){
                                    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Join Date', Type: "3" } });
                                    //     return;
                                    // }



                                    if(this.Student_Course_.Start_Date==undefined){
                                        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Start Date', Type: "3" } });
                                        return;
                                    }

                                    var Enddate_Status = 0;
                                    if (Boolean(this.Student_Course_.End_Date_Check) == true) Enddate_Status = 1;


                                    debugger
                                    if (
                                        this.Student_Course_.End_Date_L == undefined ||
                                        this.Student_Course_.End_Date_L == null ||
                                        this.Student_Course_.End_Date_L == "NaN" ||
                                        this.Student_Course_.End_Date_L == ""
                                        ) {
                                        this.Student_Import_.End_Date = null;
                                        }
                                        
                                        else
                                        this.Student_Import_.End_Date = this.New_Date(
                                        new Date(moment(this.Student_Course_.End_Date_L).format("YYYY-MM-DD"))
                                        );


                                    // if(this.Student_Course_.End_Date==undefined){
                                    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose End Date', Type: "3" } });
                                    //     return;
                                    // }



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
                                    
                                    
                                    
                                    
                                    if (
                                    this.Batch_.Batch_Id == null ||
                                    this.Batch_.Batch_Id == undefined ||
                                    this.Batch_.Batch_Id == 0
                                    ) {
                                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                    panelClass: "Dialogbox-Class",
                                    data: { Message: "Select Batch", Type: "3" },
                                    });
                                    return;
                                    }
                                    if (this.Faculty_ == undefined || this.Faculty_ == null) {
                                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                    panelClass: "Dialogbox-Class",
                                    data: { Message: "Select Faculty", Type: "3" },
                                    });
                                    return;
                                    }
                                    if (
                                    this.Faculty_.Users_Id == null ||
                                    this.Faculty_.Users_Id == undefined ||
                                    this.Faculty_.Users_Id == 0
                                    ) {
                                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                                    panelClass: "Dialogbox-Class",
                                    data: { Message: "Select Faculty", Type: "3" },
                                    });
                                    return;
                                    }
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



                                   // else if (this.Student_Import_Details_Data[i].Visa_Submission_Date=='MM-DD-YYYY')
                                   // {
                                   //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Incorrect Date format' +j ,Type: "3" }});    
                                   //     i= this.Student_Import_Details_Data.length
                                   //     return;
                                   // }
                               }
                               {
                                    
                               // this.Student_Import_.Branch= this.FollowUp_Branch_.Branch_Id;
                               // this.Student_Import_.Department= this.FollowUp_Department_.Department_Id;
                               debugger
                               this.Student_Import_.Status=this.FollowUp_Status_.Status_Id;
                               this.Student_Import_.Status_Name=this.FollowUp_Status_.Status_Name;
                            //    this.Student_Import_.Status_FollowUp=this.FollowUp_Status_.FollowUp;
                            this.Student_Import_.Status_FollowUp=true;
                               this.Student_Import_.Remark=this.Student_Followup_.Remark;
                               this.Student_Import_.Enquiry_Source= this.Enquiry_Source_.Enquiry_Source_Id;
                               this.Student_Import_.Enquiry_Source_Name=this.Enquiry_Source_.Enquiry_Source_Name;
                               this.Student_Import_.Next_FollowUp_Date= this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
                               this.Student_Import_.To_User= this.Followup_Users_.Users_Id;
                               this.Student_Import_.To_User_Name=this.Followup_Users_.Users_Name;

                               this.Student_Import_.MasterCourse_Id=this.Mastercourse_.MasterCourse_Id;
                               this.Student_Import_.MasterCourse_Name=this.Mastercourse_.MasterCourse_Name;
                               this.Student_Import_.Course_Id=this.Course_.Course_Id;
                               this.Student_Import_.Course_Name=this.Course_.Course_Name;
                               this.Student_Import_.Batch_Id=this.Batch_.Batch_Id;
                               this.Student_Import_.Batch_Name=this.Batch_.Batch_Name;
                               this.Student_Import_.To_User_Name=this.Followup_Users_.Users_Name;
                               this.Student_Import_.Faculty_Id=this.Faculty_.Users_Id;
                            //    this.Student_Import_.Faculty_Name=this.Faculty_.Users_Name;
                               this.Student_Import_.Laptop_details_Id=this.Laptopdetails_.Laptop_details_Id;
                               this.Student_Import_.Laptop_details_Name=this.Laptopdetails_.Laptop_details_Name;
                               this.Student_Import_.Installment_Type_Id=this.Installment_Type.Installment_Type_Id;
                               this.Student_Import_.Installment_Type_Name=this.Installment_Type.Installment_Type_Name;
                               this.Student_Import_.Markstatus_Id=this.MarkStatus_Type.Markstatus_Id;
                               this.Student_Import_.Markstatus_Name=this.MarkStatus_Type.Markstatus_Name;


                               this.Student_Import_.Start_Date= this.New_Date(new Date(moment(this.Student_Course_.Start_Date).format('YYYY-MM-DD')));
                            //    this.Student_Import_.End_Date= this.New_Date(new Date(moment( this.Student_Course_.End_Date).format('YYYY-MM-DD')));
                            //    this.Student_Import_.Join_Date= this.New_Date(new Date(moment(this.Student_Course_.Join_Date).format('YYYY-MM-DD')));
                            //    debugger
                            //    this.Student_Course_.End_Date_L = this.New_Date(new Date(moment(this.Student_Course_.End_Date_L).format("YYYY-MM-DD")));
                               this.Student_Import_.Course_Name_Details=this.Student_Course_.Course_Name_Details;
                               this.Student_Import_.Course_Type_Id=this.Course_.Course_Type_Id;
                               this.Student_Import_.Course_Type_Name=this.Course_.Course_Type_Name;


                            //    this.Student_Import_.Reading=this.Student_Course_.Reading;
                            //    this.Student_Import_.Writing=this.Student_Course_.Course_Type_Id;
                            //    this.Student_Import_.Speaking=this.Student_Course_.Speaking;
                            //    this.Student_Import_.Listening=this.Student_Course_.Listening;
                            //    this.Student_Import_.Grammer=this.Student_Course_.Grammer;
                            //    this.Student_Import_.TotalMark=this.Student_Course_.TotalMark;


                               this.Student_Import_.Duration=this.Student_Course_.Duration;
                               this.Student_Import_.Revision_Duration=this.Student_Course_.Revision_Duration;

                               

                               this.Student_Import_.By_User_Id=parseInt( this.Login_Id);
                               this.Student_Import_.By_User_Name=this.Login_User_Name;
                                
                                this.Student_Import_.Student_Import_Details =this.Student_Import_Details_Data;
                               
                               
    //const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'The Phone Number Already Exist for '+Save_status[0][0].Duplicate_Student_Name+' and is handled by '+Save_status[0][0].Duplicate_User_Name,Type:"2"}});



    // document.getElementById('Save_Button').hidden=true;
    // // this.issLoading=true;
    //  debugger



                                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Level Name is '+this.Student_Import_.Course_Name +' '+ ' ,Batch is'+' '+ this.Student_Import_.Batch_Name +' '+  ' and  To staff'+' '+ this.Student_Import_.To_User_Name +' '+'Do you want to save ?',Type:"true",Heading:'Confirm'}});
                                dialogRef.afterClosed().subscribe(result =>
                                {
                                if(result=='Yes')
                                {

                                     this.issLoading=true;


                                     debugger
                               this.Student_Import_Service_.Save_Level_Import(this.Student_Import_).subscribe(Save_status => {
                               
                                   ;
                                   debugger
                                       this.issLoading=false;
                                               
                                  // log(Save_status[0][0])
                                  if(Number(Save_status[0]==undefined)){
                                   this.issLoading=false;
                                   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                                 
                                   document.getElementById('Save_Button').hidden=false;
                                   //this.Clr_Student_Import();
                                  }
                                
                               if(Number(Save_status[0][0].import_master_id)>0)
                               {
                                   this.Student_Duplicate_Array = Save_status[1];
                                   this.Total_Duplicate_Data=this.Student_Duplicate_Array.length;
                                   this.Total_Import_Entries=this.Student_Import_Details_Data.length;
                                   this.Total_Imports=(this.Student_Import_Details_Data.length)-(this.Student_Duplicate_Array.length);
                               
                               //const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:' Imported',Type:"false"}});
                                       this.Duplicate_View=true;
                                       this.Entry_View=false;
                                       this.Search_view=false;
                                       this.Search_Student_Import();
                                       this.Clr_Student_Import();
                                       //this.Close_Click();
                               document.getElementById('Save_Button').hidden=true;
                               }
                               // else if(Number(Save_status[0][0].Student_Id_)==-1)
                               //         {  
                               //             this.Duplicate_View=true;
                               //             //const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'The Phone Number Already Exist for '+Save_status[0][0].Duplicate_Student_Name+' and is handled by '+Save_status[0][0].Duplicate_User_Name,Type:"2"}});
                               //         }
                               else{
                                   this.issLoading=false;
                               const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                               document.getElementById('Save_Button').hidden=true;
                               }
                               
                               },
                               Rows => { 
                                       this.issLoading=false;
                               document.getElementById('Save_Button').hidden=true;
                               const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                               });
                            }
                        });
                               }
                               } 

                            


                            }












