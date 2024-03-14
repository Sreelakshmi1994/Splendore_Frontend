import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Users } from '../../../models/Users';
import { Attendance_Status } from '../../../models/Attendance_Status';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';

import { Attendance_Master } from '../../../models/Attendance_Master';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Attendance_Report',
templateUrl: './Attendance_Report.component.html',
styleUrls: ['./Attendance_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Attendance_ReportComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;
    Total_Duration:number=0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Attendance_Report_Edit:boolean;
    Attendance_Report_Save:boolean;
    Attendance_Report_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;
    Edit_Page_Permission: any;

    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    Export_Permission:any;
    Export_View :boolean =false;


    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  

    Batch_Data: Batch[];
    Batch_:Batch=new Batch;
    Batch_Temp: Batch = new Batch;
    Batch_Data_Filter: Batch[]

    Login_User: number = 0;
    Attendance_Report_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();

    Faculty_Data: Users[];
    Faculty_Data_Filter: Users[];
    Faculty_:Users=new Users;
    Faculty_Temp: Users = new Users;


    Attendance_Status_Data: Attendance_Status[]
    Attendance_Status: Attendance_Status = new Attendance_Status();
    Attendance_Status_Search: string;
   
    
    Attendance_Master_:Attendance_Master=new Attendance_Master;
    Attendance_Master_Temp:Attendance_Master=new Attendance_Master;
    Attendance_Master_Data:Attendance_Master[];

    Search_Name: "";
constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(34);
    this.Export_Permission=Get_Page_Permission(50);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Attendance_Report_Edit=this.Permissions.Edit;
    this.Attendance_Report_Save=this.Permissions.Save;
    this.Attendance_Report_Delete=this.Permissions.Delete;
    this.Page_Load()

    this.Attendance_Status_Data=[];
    this.Attendance_Status_Data.push({'Attendance_Status_Id':0,'Attendance_Status_Name':'All'});
    this.Attendance_Status_Data.push({'Attendance_Status_Id':1,'Attendance_Status_Name':'Present'});
    this.Attendance_Status_Data.push({'Attendance_Status_Id':2,'Attendance_Status_Name':'Absent'});


    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    }
     
}
Export()
{
    
        this.Student_Service_.exportExcel(this.Attendance_Master_Data,'Attendance Report')
       
}

Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight-350;
    this.myTotalHeight=this.myTotalHeight-100;
    this.myInnerHeight = this.myInnerHeight - 300;
    // this.Load_Attendance_Status();
    this.Search_Attendance_Report();
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

// Load_Attendance_Status()
// {
//     
//     this.issLoading = true;
//     this.Student_Service_.Load_Attendance_Status().subscribe(Rows => {
//         if (Rows != null) {
//             this.Attendance_Status_Data = Rows[0];
//             this.Attendance_Status_Temp.Attendance_Status_Id = 0;
//             this.Attendance_Status_Temp.Attendance_Status_Name = "Select";
//             this.Attendance_Status_Data.unshift(this.Attendance_Status_Temp);
//             this.Attendance_Status = this.Attendance_Status_Data[0];
//             this.issLoading = false;
//         }
//     },
//         Rows => {
//             this.issLoading = false;
//         });
// }

// Fill_Student()
// {
//     this.Attendance_Master_.Attendance_Status=this.Attendance_Status.Attendance_Status_Id;
// }


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

Edit_Attendance(Student_Id, i) {
    ;
        localStorage.setItem('Student_Id', Student_Id);
        console.log(Student_Id)
        this.Edit_Page_Permission = Get_Page_Permission(14);
        
        if (this.Edit_Page_Permission == undefined ||this.Edit_Page_Permission == undefined ||this.Edit_Page_Permission.Edit == undefined || this.Edit_Page_Permission.Edit ==0 || this.Edit_Page_Permission.Edit ==null) {
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



Search_User_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;       
     if(this.Faculty_Data==undefined || this.Faculty_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Users_Typeahead('').subscribe(Rows => {
        if (Rows != null) {
            this.Faculty_Data = Rows[0];
            this.issLoading = false;

            this.Faculty_Data_Filter=[];

            for (var i=0;i<this.Faculty_Data.length;i++)
            {
                if(this.Faculty_Data[i].Users_Name.toLowerCase().includes(Value))
                    this.Faculty_Data_Filter.push(this.Faculty_Data[i])
            }
        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 

    else
    {
        
        this.Faculty_Data_Filter=[];
        for (var i=0;i<this.Faculty_Data.length;i++)
        {
            if(this.Faculty_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Faculty_Data_Filter.push(this.Faculty_Data[i])
        }
    }
}



Search_Faculty_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;       
     if(this.Faculty_Data==undefined || this.Faculty_Data.length==0)
           {
            this.issLoading = true;
         this.Student_Service_.Search_Typeahead_Loadfaculty('').subscribe(Rows => {
        if (Rows != null) {
            this.Faculty_Data = Rows[0];
            this.issLoading = false;

            this.Faculty_Data_Filter=[];

            for (var i=0;i<this.Faculty_Data.length;i++)
            {
                if(this.Faculty_Data[i].Users_Name.toLowerCase().includes(Value))
                    this.Faculty_Data_Filter.push(this.Faculty_Data[i])
            }
        }
    },
        Rows => {
            this.issLoading = false;
          });
    } 

    else
    {
        
        this.Faculty_Data_Filter=[];
        for (var i=0;i<this.Faculty_Data.length;i++)
        {
            if(this.Faculty_Data[i].Users_Name.toLowerCase().includes(Value))
                this.Faculty_Data_Filter.push(this.Faculty_Data[i])
        }
    }
}


display_Faculty(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}
Search_Attendance_Report()
{
    var  Course_Id = 0, Batch_Id = 0, Faculty_Id = 0; 
    var Attendance_Status_Id=0,search_name_ = '';
    

    this.Total_Duration=0;
    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    // search_name_ = this.Search_Name;
    
    if (this.Faculty_ != undefined && this.Faculty_ != null)
        if (this.Faculty_.Users_Id != undefined && this.Faculty_.Users_Id != null)
        Faculty_Id = this.Faculty_.Users_Id;


        if (this.Course_ != undefined && this.Course_ != null)
        if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
        Course_Id = this.Course_.Course_Id;
    
    if (this.Batch_ != undefined && this.Batch_ != null)
        if (this.Batch_.Batch_Id != undefined && this.Batch_.Batch_Id != null)
        Batch_Id = this.Batch_.Batch_Id;

        
       var t= this.Attendance_Status.Attendance_Status_Name
        if (this.Attendance_Status != undefined && this.Attendance_Status != null)
        if (this.Attendance_Status.Attendance_Status_Id != undefined && this.Attendance_Status.Attendance_Status_Id != null)
         Attendance_Status_Id = this.Attendance_Status.Attendance_Status_Id;

         debugger
         if (
            this.Search_Name != undefined &&
            this.Search_Name != null &&
            this.Search_Name != ""
            )
            search_name_ = this.Search_Name;

    this.issLoading = true;
    debugger
    this.Student_Service_.Search_Attendance_Report(moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),Faculty_Id,Course_Id,Batch_Id,Attendance_Status_Id,this.Login_User,search_name_).subscribe(Rows =>{
        
    this.Attendance_Master_Data = Rows[0];
    
    this.Total_Entries = this.Attendance_Master_Data.length;
    for(var i=0;i<this.Attendance_Master_Data.length;i++)
    {
        this.Total_Duration=Number(this.Total_Duration)+Number(this.Attendance_Master_Data[i].Duration);
    }
    this.issLoading = false;
    if(this.Attendance_Master_Data.length==0)
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




}

