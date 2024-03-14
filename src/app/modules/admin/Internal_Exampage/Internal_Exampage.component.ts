import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';
import { Users } from '../../../models/Users';
import {Register_Whatsapp} from '../../../models/Register_Whatsapp';
import { Attendance_Master } from '../../../models/Attendance_Master';
import { Attendance_Student } from '../../../models/Attendance_Student';
import { Exam_Result } from '../../../models/Exam_Result';
import { Exam_ResultDetails } from '../../../models/Exam_ResultDetails';
import { Attendance_Subject } from '../../../models/Attendance_Subject';
import { Exam_Type } from '../../../models/Exam_Type';
import { Exam } from '../../../models/Exam';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Session } from  '../../../models/Session';import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
;
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Internal_Exampage',
templateUrl: './Internal_Exampage.component.html',
styleUrls: ['./Internal_Exampage.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Internal_ExampageComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Attendance_Edit:boolean;
    Attendance_Save:boolean;
    Attendance_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Attendance_Id: number = 0;
    Attendance_Data: []
    Job_Code_Search:string;
    Student_Search:string;
    Job_Location_Search:string;

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Search:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[] 

    Batch_Data: Batch[];
    Batch_:Batch=new Batch;
    Batch_Search:Batch=new Batch;
    Batch_Temp: Batch = new Batch;
    Batch_Data_Filter: Batch[]
    
    Faculty_Data: Users[];
    Faculty_:Users=new Users;
    Faculty_Temp: Users = new Users;

    Save_Call_Status: boolean = false;
    Logo: string;
    Display_Logo_: string;
    ImageFile_Logo: any;

    Login_User: number = 0;
    Attendance_EditIndex: number = -1;

    Edit_Page_Permission:any;
    Edit_Job_Permission:any;

    Attendance_Master_:Attendance_Master=new Attendance_Master;
    Attendance_Master_Temp:Attendance_Master=new Attendance_Master;
    Attendance_Master_Data:Attendance_Master[];

   
    Attendance_Student_:Attendance_Student=new Attendance_Student;
    Attendance_Student_Temp:Attendance_Student=new Attendance_Student;
    Attendance_Student_Data:Attendance_Student[];
    Attendance_Student_Data_Temp:Attendance_Student[];
    Absent_Student_Temp:Attendance_Student=new Attendance_Student;
    Absent_Student_Data_Temp:Attendance_Student[];
    Absent_Student_Data:Attendance_Student[];


    Exam_Result_:Exam_Result=new Exam_Result;
    Exam_Result_Temp:Exam_Result=new Exam_Result;
    Exam_Result_Data:Exam_Result[];

    Exam_ResultDetails_:Exam_ResultDetails=new Exam_ResultDetails();
    Exam_ResultDetails_Temp:Exam_ResultDetails=new Exam_ResultDetails;
    Exam_ResultDetails_Data:Exam_ResultDetails[];
    Exam_ResultDetails_Data_Temp:Exam_ResultDetails[];





    Attendance_Subject_:Attendance_Subject=new Attendance_Subject;
    Attendance_Subject_Temp:Attendance_Subject=new Attendance_Subject;
    Attendance_Subject_Data:Attendance_Subject[];
    Attendance_Subject_Data_saved_syllabus:Attendance_Subject[];
    Attendance_Subject_Data_Temp:Attendance_Subject[];

    Session_:Session = new Session()
    Session_Temp:Session=new Session();
    Session_Data:Session[];

    Register_Whatsapp_:Register_Whatsapp=new Register_Whatsapp();

    Save_Whatsapp_:Register_Whatsapp=new Register_Whatsapp();

    Is_Date:boolean=true;    
    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    TotalDuration:number=0

Exam_Type_: Exam_Type = new Exam_Type();
Exam_Type_Temp: Exam_Type = new Exam_Type();
Exam_Type_Data: Exam_Type[];

Exam_: Exam = new Exam();
Exam_Temp: Exam = new Exam();
Exam_Data: Exam[];

constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(33);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Attendance_Edit=this.Permissions.Edit;
    this.Attendance_Save=this.Permissions.Save;
    this.Attendance_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
     
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Is_Date=true;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 250;
    this.Load_Session()
    this.Lod_ExamType();
    this.Load_Exam();
     this.Search_Examdetails_Internal();
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
Course_change()
{
    
    // this.Batch_.Batch_Id=0;
    // this.Batch_.Batch_Name="";
    this.Batch_Data=[];
    this.Batch_Data_Filter=[];
}
Search_Batch_change()
{
    // this.Batch_Search.Batch_Id=0;
    // this.Batch_Search.Batch_Name="";
    this.Batch_Data=[];
    this.Batch_Data_Filter=[];
}
Close_Click()
{
  this.Entry_View=false;
  this.clr_Exam_ResultInternal()
  this.Search_Examdetails_Internal();
}
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
        this.Course_Data_Filter=[];
        this.issLoading = false;

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
display_Course(Course_: Course)
{     
    if (Course_) { return Course_.Course_Name; }
}
Batch_Typeahead_Service(Value,Course_Id)
{
    if (this.Batch_Data == undefined || this.Batch_Data.length==0)
    {
        this.issLoading = true;
        
        // this.Student_Service_.Search_Batch_Typeahead_1('',this.Course_Search.Course_Id).subscribe(Rows =>
        this.Student_Service_.Search_Batch_Typeahead_1('',Course_Id).subscribe(Rows => {
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
    })
    // );
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
Search_Batch_Typeahead_New(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    // if (this.Course_Search.Course_Id == undefined ||this.Course_Search.Course_Id == null || this.Course_Search.Course_Id==0)
    if (this.Course_.Course_Id == undefined ||this.Course_.Course_Id == null || this.Course_.Course_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Level', Type: "3" } });
        return
    }
   
    this.Batch_Typeahead_Service(Value,this.Course_.Course_Id);
}




Search_Batch_Typeahead(event: any)
{     

    debugger
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Batch_Data == undefined || this.Batch_Data.length==0)
    {
        this.issLoading = true;
        debugger
        this.Student_Service_.Search_Batch_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        debugger
        this.Batch_Data = Rows[0];
        this.Batch_Data_Filter=[];
        this.issLoading = false;

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
//  display_Batch(Batch_: Batch)
// {   
//     debugger  
//     if (Batch_) { return Batch_.Batch_Name; }
// }





Search_Batch_Typeahead_Search(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    // if (this.Course_Search.Course_Id == undefined ||this.Course_Search.Course_Id == null || this.Course_Search.Course_Id==0)
    if (this.Course_Search.Course_Id == undefined ||this.Course_Search.Course_Id == null || this.Course_Search.Course_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Level', Type: "3" } });
        return
    }
   
    this.Batch_Typeahead_Service(Value,this.Course_Search.Course_Id);
}
display_Batch(Batch_: Batch)
{     
    if (Batch_) { return Batch_.Batch_Name; }
}
Search_User_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;       
     if(this.Faculty_Data==undefined || this.Faculty_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Users_Typeahead('').subscribe(Rows => {
        if (Rows != null) {
            this.Faculty_Data = Rows[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 
}
display_Faculty(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}
Search_ExamResult_Interanal()
{
    debugger
    var    Batch_Id = 0;

    // if (this.Course_ == undefined || this.Course_ == null ) 
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Level', Type: "3" } });
    //     return
    // }
    // if (this.Course_.Course_Id == undefined ||this.Course_.Course_Id == null || this.Course_.Course_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Level', Type: "3" } });
    //     return
    // }
    // if (this.Batch_ == undefined || this.Batch_ == null ) 
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
    //     return
    // }
    // if (this.Batch_.Batch_Id == undefined ||this.Batch_.Batch_Id == null || this.Batch_.Batch_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
    //     return
    // }

    // if (this.Course_ != undefined && this.Course_ != null)
    //     if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
    //     Course_Id = this.Course_.Course_Id;
    
    if (this.Batch_ != undefined && this.Batch_ != null)
        if (this.Batch_.Batch_Id != undefined && this.Batch_.Batch_Id != null)
        Batch_Id = this.Batch_.Batch_Id;

        
    this.issLoading = true;
    debugger
    this.Student_Service_.Search_ExamResult_Interanal(Batch_Id,this.Login_User).subscribe(Rows =>{
        debugger
        this.Exam_ResultDetails_Data=Rows[0];
        // this.Attendance_Subject_Data=Rows[2];
        // this.Attendance_Subject_Data_saved_syllabus=Rows[3];
        // for(var i=0;i<this.Attendance_Subject_Data.length;i++ )
        //     for(var j=0;j<this.Attendance_Subject_Data_saved_syllabus.length;j++ )
        //         if(this.Attendance_Subject_Data[i].Subject_Id==this.Attendance_Subject_Data_saved_syllabus[j].Subject_Id)
        //             this.Attendance_Subject_Data[i].Checkbox=true;
                 
        //             // this.Attendance_Master_Data = Rows[4];
        //             this.TotalDuration=Rows[4][0].Total_Duration;
          
        //             for (var i = 0; i < this.Attendance_Subject_Data.length; i++) {
        //                 this.Attendance_Subject_Data[i].Checkbox = false;
                   
        //         }
            

    this.issLoading = false;
    //  && this.Attendance_Subject_Data.length==0
    if(this.Exam_ResultDetails_Data.length==0)
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
clr_Exam_ResultInternal()
{
    this.Exam_Result_.Exam_Result_Id=0;
    this.Course_=null;
    this.Batch_=null;
    this.Exam_ResultDetails_Data=[];

    if (this.Exam_Data != null && this.Exam_Data != undefined)
    this.Exam_ = this.Exam_Data[0];

    if (this.Exam_Type_Data != null && this.Exam_Type_Data != undefined)
    this.Exam_Type_ = this.Exam_Type_Data[0];
    // this.Attendance_Student_.Attendance_Status = false;
}
Save_Exam_Result_Internal()
{
    var Menu_Student=false; var Menu_Subject=false; 
//  var Attendance_Status_value=false;
    
    // if (this.Course_ == undefined || this.Course_ == null ) 
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Level', Type: "3" } });
    //     return
    // }
    // if (this.Course_.Course_Id == undefined ||this.Course_.Course_Id == null || this.Course_.Course_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Level', Type: "3" } });
    //     return
    // }
    // if (this.Batch_ == undefined || this.Batch_ == null ) 
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
    //     return
    // }
    // if (this.Batch_.Batch_Id == undefined ||this.Batch_.Batch_Id == null || this.Batch_.Batch_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Batch', Type: "3" } });
    //     return
    // }    

    if (this.Exam_ == undefined || this.Exam_ == null ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam', Type: "3" } });
        return
    }
    if (this.Exam_.Exam_Id == undefined ||this.Exam_.Exam_Id == null || this.Exam_.Exam_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam', Type: "3" } });
        return
    }


    if (this.Exam_Type_ == undefined || this.Exam_Type_ == null ) 
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Type', Type: "3" } });
        return
    }
    if (this.Exam_Type_.Exam_Type_Id == undefined ||this.Exam_Type_.Exam_Type_Id == null || this.Exam_Type_.Exam_Type_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Type', Type: "3" } });
        return
    }

    if (this.Exam_Type_.Exam_Type_Id == undefined ||this.Exam_Type_.Exam_Type_Id == null || this.Exam_Type_.Exam_Type_Id==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Type', Type: "3" } });
        return
    }

     debugger

     for (var i = 0; i < this.Exam_ResultDetails_Data.length; i++)
     {
         if(this.Exam_ResultDetails_Data[i].Check_Box== true)
         
         {
    if (this.Exam_ResultDetails_Data[i].Mark==undefined||this.Exam_ResultDetails_Data[i].Mark==0||this.Exam_ResultDetails_Data[i].Mark==null)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Mark', Type: "3" } });
        return
    }
 
    if (this.Exam_ResultDetails_Data[i].Maxmium_Mark==undefined||this.Exam_ResultDetails_Data[i].Maxmium_Mark==0||this.Exam_ResultDetails_Data[i].Maxmium_Mark==null)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Maximum Mark', Type: "3" } });
        return
    }
}
}

    // if (this.Exam_ResultDetails_Data==undefined||this.Exam_ResultDetails_Data.length==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No Data in Student', Type: "3" } });
    //     return
    // }

debugger

    for (var i = 0; i < this.Exam_ResultDetails_Data.length; i++)
    {
        if(this.Exam_ResultDetails_Data[i].Check_Box== true)
        
        {
            Menu_Student=true
            i=this.Exam_ResultDetails_Data.length
            }
    } 
  
    if (Menu_Student==false)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast One Student', Type: "3" } });
        return
    }
    debugger
    // this.Exam_Result_.Course_Id=this.Course_.Course_Id;
    this.Exam_Result_.Batch_Id=this.Batch_.Batch_Id;
    this.Exam_Result_.Exam_Id=this.Exam_.Exam_Id;
    this.Exam_Result_.Exam_Type_Id=this.Exam_Type_.Exam_Type_Id;
    this.Exam_Result_.User_Id=this.Login_User;
  

    this.Exam_ResultDetails_Data_Temp=[]; 
   

    debugger

    for (var i = 0; i< this.Exam_ResultDetails_Data.length; i++) 
    {
        if (Boolean(this.Exam_ResultDetails_Data[i].Check_Box) == true) 
        {
            debugger       
        this.Exam_ResultDetails_Data_Temp.push(this.Exam_ResultDetails_Data[i]);
        }
        // if (Boolean(this.Exam_ResultDetails_Data[i].Check_Box) == false) 
        // {
        //     this.Absent_Student_Data_Temp.push(this.Exam_ResultDetails_Data[i]);
        // }
             
    }

// debugger
// for (var i = 0; i< this.Exam_ResultDetails_Data.length; i++) 
//     {
//      if (Boolean(this.Exam_ResultDetails_Data[i].Check_Box) == false) 
//         {
//             this.Absent_Student_Data_Temp.push(this.Exam_ResultDetails_Data[i]);
//         }
//     }

debugger
     this.Exam_Result_.Exam_ResultDetails = this.Exam_ResultDetails_Data_Temp;
   
 
  
    this.Exam_Result_.Exam_Result_Details_Value=1;
    this.Exam_Result_.Check_Box = Menu_Student;


if(this.Exam_Result_.Exam_ResultDetails.length==0)
{
    this.Exam_Result_.Exam_Result_Details_Value=0;
    this.Exam_ResultDetails_Temp.Exam_Result_Id=0;
    this.Exam_ResultDetails_Data_Temp.push( this.Exam_ResultDetails_Temp);
    this.Exam_Result_.Exam_ResultDetails = this.Exam_ResultDetails_Data_Temp;
}



    this.issLoading=true;
debugger
    this.Student_Service_.Save_Exam_Result_Internal(this.Exam_Result_).subscribe(Save_status => {
        
        this.issLoading=false;
    if(Number(Save_status[0].Exam_Result_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});

// this. Save_Student_Whatsapp(Save_status[0].Date_);
        this.Close_Click()
    }
   
//     else if(Save_status[0].Attendance_Master_Id_=-2)
// {
//     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Edit Not allowed', Type: "3" } });
//     return
// }

    else 
    {        
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
       
    },
    Rows => { 
        this.issLoading=false;  
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}

Search_Examdetails_Internal()
{
    var look_In_Date_Value=0, Batch_Id = 0;

    if (this.Is_Date == true)
        look_In_Date_Value = 1;
    // if (this.Course_Search!= undefined && this.Course_Search != null)
    //     if (this.Course_Search.Course_Id != undefined && this.Course_Search.Course_Id != null)
    //         Course_Id = this.Course_Search.Course_Id;
    
    if (this.Batch_Search != undefined && this.Batch_Search != null)
        if (this.Batch_Search.Batch_Id != undefined && this.Batch_Search.Batch_Id != null)
            Batch_Id = this.Batch_Search.Batch_Id;
        
    this.issLoading = true;
    debugger
    this.Student_Service_.Search_Examdetails_Internal(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Batch_Id,this.Login_User).subscribe(Rows =>{
         this.Exam_Result_Data=Rows[0];
         debugger
    this.issLoading = false;
    if(this.Exam_Result_Data.length==0 )
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
Create_New()
{
    this.Entry_View = true;
    this.clr_Exam_ResultInternal()
}
Edit_ExamresultInternal(Exam_Result_e:Exam_Result,index)
{
    
    this.Entry_View=true;
    this.Exam_Result_=Exam_Result_e;
    this.Exam_Result_=Object.assign({},Exam_Result_e);
 
    // this.Course_Temp.Course_Id = this.Exam_Result_.Course_Id;
    // this.Course_Temp.Course_Name = this.Exam_Result_.Course_Name;
    // this.Course_ = Object.assign({}, this.Course_Temp);
    

    this.Batch_Temp.Batch_Id = this.Exam_Result_.Batch_Id;
    this.Batch_Temp.Batch_Name = this.Exam_Result_.Batch_Name;
    this.Batch_ = Object.assign({}, this.Batch_Temp);

    for (var i = 0; i < this.Exam_Data.length; i++) {
        if (this.Exam_Result_.Exam_Id == this.Exam_Data[i].Exam_Id)
        this.Exam_ = this.Exam_Data[i];
        }

        for (var i = 0; i < this.Exam_Type_Data.length; i++) {
            if (this.Exam_Result_.Exam_Type_Id == this.Exam_Type_Data[i].Exam_Type_Id)
            this.Exam_Type_ = this.Exam_Type_Data[i];
            }



            


    this.issLoading = true;
    this.Student_Service_.Get_ExamresultdetailsInternal(this.Exam_Result_.Exam_Result_Id, this.Exam_Result_.Batch_Id,this.Login_User).subscribe(Rows => {
         
        this.Exam_ResultDetails_Data = Rows[0];

        debugger
        for(var i=0;i<this.Exam_ResultDetails_Data.length;i++)
        {
        if (this.Exam_ResultDetails_Data[i].Check_Box.toString()=='1')
        {
        this.Exam_ResultDetails_Data[i].Check_Box=true
        }
        else 
        {
        this.Exam_ResultDetails_Data[i].Check_Box=false
        }
        }

       
        this.issLoading = false;
    },

        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
Load_Session() {
    this.issLoading = true;
    this.Student_Service_.Load_Enquiry_Source().subscribe(
    (Rows) => {
    if (Rows != null) {
    this.Session_Data = Rows[1];
    this.Session_Temp.Session_Id = 0;
    this.Session_Temp.Session_Name = "Select";
    this.Session_Data.unshift(this.Session_Temp);
    this.Session_ = this.Session_Data[0];
    this.issLoading = false;
    }
    },
    (Rows) => {
    this.issLoading = false;
    }
    );
    }


    // Get_Totalportioncovered()
    // {
    
    
    //     this.issLoading = true;
    //     
    //     this.Student_Service_.Get_Totalportioncovered(this.Attendance_Master_.Course_Id,this.Attendance_Master_.Batch_Id,this.Login_User).subscribe(Rows => {
    //          
    //         this.Attendance_Master_Data = Rows[0];
    //         this.Total_Duration =Rows[0].Duration;
    //         this.issLoading = false;
    
    //     },
    
    //         Rows => {
    //             this.issLoading = false;
    //             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    //         });
    // }

    Delete_ExamResultInternal(Exam_Result_Id,index)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
        dialogRef.afterClosed().subscribe(result =>
        {
        if(result=='Yes')
            {
            this.issLoading=true;
            this.Student_Service_.Delete_ExamResultInternal(Exam_Result_Id).subscribe(Delete_status => {
            
            Delete_status = Delete_status[0];
            Delete_status = Delete_status[0].DeleteStatus_.data[0];
            if(Delete_status==1){
            this.Exam_Result_Data.splice(index, 1);
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
            this.Search_Examdetails_Internal();
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



    // Delete_Attendancedata(Attendance_Master_Id,index)
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    //     dialogRef.afterClosed().subscribe(result =>
    //     {
    //     if(result=='Yes')
    //         {
          
            
    //         this.Student_Service_.Delete_Attendancereportdata(Attendance_Master_Id).subscribe(Delete_Attendance => {
            
    //             Delete_Attendance = Delete_Attendance[0];
    //             Delete_Attendance = Delete_Attendance[0].DeleteStatus_.data[0];
    //         if(Delete_Attendance==1){
    //         this.Attendance_Master_Data.splice(index, 1);
    //         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
    //         this.Search_Examdetails_Internal();
    //         }
    //         else
    //         {
    //         this.issLoading=false;
    //         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    //         }
    //         this.issLoading=false;
    //         },
    //         Rows => { 
    //         this.issLoading=false;
    //         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    //         });
    //     }
    //     });
    // }
    


    Register_Whatsapp()
    {
        var std_data : any [] =[]
      debugger
    for (var j=0;j<this.Absent_Student_Data_Temp.length;j++){
        this.Register_Whatsapp_.whatsAppBusinessId = "108714478695876";
        this.Register_Whatsapp_.phoneNumberId = "103915675851161";
        this.Register_Whatsapp_.from = "919562813713";
        
        // var Phone = this.Student_.Phone
        this.Register_Whatsapp_.to = this.Absent_Student_Data_Temp[j].Father_Whatsapp;
        this.Register_Whatsapp_.type = "waba_templates";
        this.Register_Whatsapp_.templateName = "thank_you_message_to_customers";
        this.Register_Whatsapp_.templateId = "798731017902760";
        this.Register_Whatsapp_.language = "en";
        this.Register_Whatsapp_.header = null;
        this.Register_Whatsapp_.body = null;
        this.Register_Whatsapp_.button = null;
        
        std_data.push(Object.assign({},this.Register_Whatsapp_));
    }
    debugger

//   this.Register_Whatsapp_.Absent_Data = std_data

    
    this.Student_Service_.Register_Whatsapp(std_data).subscribe(Save_status => {
    debugger
    
     var msg =Save_status[0];
    
        return;
    
    },
    );}





    Save_Student_Whatsapp(Date)

    {
      var std_data : any [] =[]
      debugger
    // var user_id =this.followup_user_id_;
    // this.Get_ToStaff_Mobile(user_id)

      for (var j=0;j<this.Absent_Student_Data_Temp.length;j++){

    this.Save_Whatsapp_.whatsAppBusinessId = "108714478695876";
    this.Save_Whatsapp_.phoneNumberId = "103915675851161";
    this.Save_Whatsapp_.from = "919562813713";
    this.Save_Whatsapp_.to =  this.Absent_Student_Data_Temp[j].Father_Whatsapp;
    this.Save_Whatsapp_.student =  this.Absent_Student_Data_Temp[j].Student_Name;
    this.Save_Whatsapp_.date = Date;
    this.Save_Whatsapp_.type = "template";
    this.Save_Whatsapp_.templateName = "api_enquiry_arjun_19thjan2023";
    this.Save_Whatsapp_.templateId = "677119067230818";
    this.Save_Whatsapp_.language = "en";
    this.Save_Whatsapp_.header = null;

        std_data.push(Object.assign({},this.Save_Whatsapp_));
    }
    this.Save_Whatsapp_.body={
      parameters: [
      {
      "type": "text",
      "text": ""
      },
      {
      "type": "text",
      "text": ""
      }
      ]
      },
      this.Save_Whatsapp_.button=null
    
    
    this.Student_Service_.Save_Student_Whatsapp(std_data).subscribe(Save_status => {
    debugger
    
     var msg =Save_status[0];
    
        return;
    
    },
    );}



    Lod_ExamType() {
        this.issLoading = true;
        this.Student_Service_.Load_ExamType().subscribe(
        (Rows) => {
        if (Rows != null) {
        this.Exam_Type_Data = Rows[0];
        this.Exam_Type_Temp.Exam_Type_Id = 0;
        this.Exam_Type_Temp.Exam_Type_Name = "Select";
        this.Exam_Type_Data.unshift(this.Exam_Type_Temp);
        this.Exam_Type_= this.Exam_Type_Data[0];
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
            this.Exam_= this.Exam_Data[0];
            this.issLoading = false;
            }
            },
            (Rows) => {
            this.issLoading = false;
            }
            );
            }

}

