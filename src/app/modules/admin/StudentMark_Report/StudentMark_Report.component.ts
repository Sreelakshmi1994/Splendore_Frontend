import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { Agent_Service } from '../../../services/Agent.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Users } from '../../../models/Users';
import { Batch } from '../../../models/Batch';
import { Course } from '../../../models/Course';
import { MarkStatus } from '../../../models/MarkStatus';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Student } from '../../../models/Student';
import { Exam_Result } from '../../../models/Exam_Result';
import { Exam } from 'app/models/Exam';
import { Exam_Type } from 'app/models/Exam_Type';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-StudentMark_Report',
templateUrl: './StudentMark_Report.component.html',
styleUrls: ['./StudentMark_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class StudentMark_ReportComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;
    Total_Amount:number=0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Admission_Report_Edit:boolean;
    Admission_Report_Save:boolean;
    Admission_Report_Delete:boolean;
    myInnerHeight: number;
    myInnerHeightTwo: number;
    myTotalHeight:number;
    Export_Permission:any;
    Export_View :boolean =false;
    Edit_Page_Permission: any;


    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Login_User: number = 0;
    Admission_Report_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Is_Date:boolean=true;   

    User_Data: Users[];
    User_Data_Filter: Users[] 
    User_:Users=new Users;
    User_Temp: Users = new Users;
    
    StudentMark_Report_Data:any;

   

    Batch_Data: Batch[];
    Batch_:Batch=new Batch;
    Batch_Temp: Batch = new Batch;
    Batch_Data_Filter: Batch[]

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  


    MarkStatus_Type: MarkStatus = new MarkStatus();
    MarkStatus_Type_Temp: MarkStatus = new MarkStatus();
    MarkStatus_Type_Data: MarkStatus[];
    
    markvalue:number;
    markfrom:number;
    markto:number;


    Studentdetails_View:boolean=false;

    Studentdetailsstudent_Report_Data:any;
    Student_: Student = new Student();


    StudentdetailsInternal_Report_Data:any;

    StudentdetailsFinal_Report_Data:any;
    StudentdetailsLeaves_Report_Data:any;
    StudentdetailsRemark_Report_Data:any;
    StudentdetailsBooksissued_Report_Data:any;


     Exam_Result_: Exam_Result = new Exam_Result();

     
  Exam_: Exam = new Exam();
  Exam_Temp: Exam = new Exam();
  Exam_Data: Exam[];


  Exam_Type_: Exam_Type = new Exam_Type();
  Exam_Type_Temp: Exam_Type = new Exam_Type();
  Exam_Type_Data: Exam_Type[];

constructor(public Student_Service_:Student_Service,
    private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(45);
    this.Export_Permission=Get_Page_Permission(50);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Admission_Report_Edit=this.Permissions.Edit;
    this.Admission_Report_Save=this.Permissions.Save;
    this.Admission_Report_Delete=this.Permissions.Delete;
    this.Page_Load()
    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    }
     
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = true;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Load_Markstatus();
    this.Load_Exam()
    this.Lod_ExamType()
    this.Search_StudentMark_Report();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -  200;
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 290;
    this.myInnerHeightTwo= this.myInnerHeight - -200;

}

Export()
{
    
        this.Student_Service_.exportExcel(this.StudentMark_Report_Data,'Student Mark Report')
       
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

Edit_Admission(Student_Id, i) {
    
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

Search_User_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value ="";
    else
        Value = event.target.value;       
     if(this.User_Data==undefined || this.User_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Users_Typeahead('').subscribe(Rows => {
        if (Rows != null) {
            this.User_Data = Rows[0];
            this.issLoading = false;

            this.User_Data_Filter=[];

            for (var i=0;i<this.User_Data.length;i++)
            {
                if(this.User_Data[i].Users_Name.toLowerCase().includes(Value))
                    this.User_Data_Filter.push(this.User_Data[i])
            }

        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 
    else
    {
        
        this.User_Data_Filter=[];
        for (var i=0;i<this.User_Data.length;i++)
        {
            if(this.User_Data[i].Users_Name.toLowerCase().includes(Value))
                this.User_Data_Filter.push(this.User_Data[i])
        }
    }
}
display_Faculty(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}


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


display_Course(Course_: Course)
{     
    if (Course_) { return Course_.Course_Name; }
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
    },
        Rows => {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}


Search_StudentMark_Report()
{

    debugger
    var  User_Id = 0,look_In_Date_Value=0,Batch_Id=0,Course_Id=0,Markstatus_Id=0,markfrom_=0,markto_=0;
    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    var Exam_Id =0,Exam_Type_Id =0;
    // search_name_ = this.Search_Name;
    if (this.Is_Date == true)
    look_In_Date_Value = 1;
    if (this.User_ != undefined && this.User_ != null)
        if (this.User_.Users_Id != undefined && this.User_.Users_Id != null)
        User_Id = this.User_.Users_Id;


        if (this.Batch_ != undefined && this.Batch_ != null)
        if (this.Batch_.Batch_Id != undefined && this.Batch_.Batch_Id != null)
        Batch_Id = this.Batch_.Batch_Id;
        
        if (this.Course_ != undefined && this.Course_ != null)
        if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
            Course_Id = this.Course_.Course_Id;   

            
        if (this.MarkStatus_Type != undefined && this.MarkStatus_Type!=null)
        if (this.MarkStatus_Type.Markstatus_Id != undefined && this.MarkStatus_Type.Markstatus_Id != null)
        Markstatus_Id = this.MarkStatus_Type.Markstatus_Id;

        if (this.Exam_ != undefined && this.Exam_!=null)
        if (this.Exam_.Exam_Id != undefined && this.Exam_.Exam_Id != null)
        Exam_Id = this.Exam_.Exam_Id;

        if (this.Exam_Type_ != undefined && this.Exam_Type_!=null)
        if (this.Exam_Type_.Exam_Type_Id != undefined && this.Exam_Type_.Exam_Type_Id != null)
        Exam_Type_Id = this.Exam_Type_.Exam_Type_Id;
         
        this.markvalue=1

        if (this.markfrom != undefined && this.markfrom != null &&this.markfrom != 0)
        markfrom_ = this.markfrom;

        else
        this.markvalue=0

        if (this.markto != undefined &&this.markto != null &&this.markto != 0 )
         markto_ = this.markto;

         else
         this.markvalue=0


    this.issLoading = true;
    debugger
    this.Student_Service_.Search_StudentMark_Report(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),User_Id,this.Login_User,Batch_Id,Course_Id,Markstatus_Id,this.markvalue,markfrom_,markto_,Exam_Id,Exam_Type_Id).subscribe(Rows =>{
        debugger
    this.StudentMark_Report_Data = Rows[0];
    this.Total_Entries = this.StudentMark_Report_Data.length;
    this.issLoading = false;
    if(this.StudentMark_Report_Data.length==0)
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

// Get_Marklistreport_Studentdetails()
// {
//     this.Studentdetails_View=true;
//     this.Entry_View=false;
// }

Close_Studentdetails()
{
    this.Studentdetails_View=false;
    this.Entry_View=true;
}


Get_Marklistreport_Studentdetails(Student_Id,Student_Course_Id,Course_Id) {
    this.Studentdetails_View=true;
    this.Entry_View=false;
    debugger
    this.Student_Service_.Get_Marklistreport_Studentdetails(Student_Id,Student_Course_Id,Course_Id).subscribe(
    (Rows) => {
    
        debugger
    this.Studentdetailsstudent_Report_Data = Rows[0];
    
    if (this.Studentdetailsstudent_Report_Data.length > 0) {
        this.Student_ = Object.assign({}, Rows[0][0]);
        this.Student_.Books_Issued_EntryDate=this.New_Date(new Date(moment(this.Student_.Books_Issued_EntryDate).format("YYYY-MM-DD")));

  
    }

    this.StudentdetailsInternal_Report_Data = Rows[1];
    this.StudentdetailsFinal_Report_Data = Rows[2];
    this.StudentdetailsLeaves_Report_Data =  Rows[3];
    this.StudentdetailsRemark_Report_Data = Rows[4];
    this.StudentdetailsBooksissued_Report_Data= Rows[5];




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



    
  Load_Exam() {
    this.issLoading = true;
    debugger
    this.Student_Service_.Load_Exam().subscribe(
      (Rows) => {
        debugger
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
    debugger
    this.Student_Service_.Load_ExamType().subscribe(
      (Rows) => {

        debugger
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


}

