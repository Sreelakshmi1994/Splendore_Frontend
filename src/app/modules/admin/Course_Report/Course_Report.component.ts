import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Users } from '../../../models/Users';
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
selector: 'app-Course_Report',
templateUrl: './Course_Report.component.html',
styleUrls: ['./Course_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Course_ReportComponent implements OnInit {
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
    myTotalHeight:number;
    Export_Permission:any;
    Export_View :boolean =false;
    Edit_Page_Permission: any;
    Faculty_Users_Data: Users[];
    Followup_Users_Data_Filter: Users[];
    Faculty_Users_Data_Filter: Users[];
    Followup_Users_Temp: Users = new Users();
    Faculty_: Users = new Users();
    Faculty_Temp: Users = new Users();
    

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
    
    Course_Report_Data:any;
constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
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
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Search_Course_Report();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -  200;
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 320;

}

Export()
{
    
        this.Student_Service_.exportExcel(this.Course_Report_Data,'Course Report')
       
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
Search_Course_Report()
{
    var  User_Id = 0,look_In_Date_Value=0;
    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    // search_name_ = this.Search_Name;
    if (this.Is_Date == true)
    look_In_Date_Value = 1;
    if (this.Faculty_ != undefined && this.Faculty_ != null)
        if (this.Faculty_.Users_Id != undefined && this.Faculty_.Users_Id != null)
        User_Id = this.Faculty_.Users_Id;

    this.issLoading = true;
    this.Student_Service_.Search_Course_Report(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),User_Id,this.Login_User).subscribe(Rows =>{

    this.Course_Report_Data = Rows[0];
    this.Total_Entries = this.Course_Report_Data.length;
    this.issLoading = false;
    if(this.Course_Report_Data.length==0)
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
    display_Followup_Users(Users_: Users) {
        if (Users_) {
        return Users_.Users_Name;
        }
        }
}

