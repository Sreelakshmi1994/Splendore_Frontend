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
import { Attendance_Master_Service } from 'app/services/Attendance_Master.Service';
import { Employee_Attendance_Master } from 'app/models/Employee_Attendance_Master';
import { Employee_Attendance_Details } from 'app/models/Employee_Attendance_Details';
import { Employee_Details } from 'app/models/Employee_Details';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Employee_Attendance_Report',
templateUrl: './Employee_Attendance_Report.component.html',
styleUrls: ['./Employee_Attendance_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
 
export class Employee_Attendance_ReportComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;
    Total_Amount:number=0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Employee_Attendance_Report_Edit:boolean;
    Employee_Attendance_Report_Save:boolean;
    Employee_Attendance_Report_Delete:boolean;
    myInnerHeight: number;
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
    Employee_Attendance_Report_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();

    Employee_Attendance_Master_:Employee_Attendance_Master = new Employee_Attendance_Master()
    Employee_Attendance_Master_Temp:Employee_Attendance_Master=new Employee_Attendance_Master();
    Employee_Attendance_Master_Data:Employee_Attendance_Master[];

    Employee_Attendance_Details_:Employee_Attendance_Details = new Employee_Attendance_Details()
    Employee_Attendance_Details_Temp:Employee_Attendance_Details=new Employee_Attendance_Details();
    Employee_Attendance_Details_Data:Employee_Attendance_Details[];
    

    
Employee_Details_: Employee_Details = new Employee_Details()
Employee_Details_Temp: Employee_Details = new Employee_Details();
Employee_Details_Data: Employee_Details[];

    Is_Date:boolean=true;   

    User_Data: Users[];
    User_Data_Filter: Users[] 
    User_:Users=new Users;
    User_Temp: Users = new Users;
    
    Employee_Attendance_Report_Data:any;
constructor(public Attendance_Master_Service_:Attendance_Master_Service,
    public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{debugger
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
    this.Employee_Attendance_Report_Edit=this.Permissions.Edit;
    this.Employee_Attendance_Report_Save=this.Permissions.Save;
    this.Employee_Attendance_Report_Delete=this.Permissions.Delete;
    debugger
    this.Page_Load()
    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    }
     
}
Page_Load()
{
    debugger
     // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    // this.Search_Employee_Attendance_Report();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -  200;
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 250;
    debugger
    this.Search_Employee_Attendance_Report();
    this.Load_Employee() ;

}

Export()
{
    
        this.Student_Service_.exportExcel(this.Employee_Attendance_Report_Data,'Admission Report')
       
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



Search_Employee_Attendance_Report()
{
    var  User_Id = 0,look_In_Date_Value=0;
    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    // search_name_ = this.Search_Name;
    if (this.Is_Date == true)
    look_In_Date_Value = 1;
    if (this.Employee_Details_ != undefined && this.Employee_Details_ != null)
        if (this.Employee_Details_.Employee_Details_Id != undefined && this.Employee_Details_.Employee_Details_Id != null)
        User_Id = this.Employee_Details_.Employee_Details_Id;

    this.issLoading = true;
    debugger
    this.Student_Service_.Search_Employee_Attendance_Report(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),User_Id).subscribe(Rows =>{
        debugger
    this.Employee_Attendance_Report_Data = Rows[0];
    this.Total_Entries = this.Employee_Attendance_Report_Data.length;
    this.issLoading = false;
    if(this.Employee_Attendance_Report_Data.length==0)
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


Load_Employee() {
    debugger
    this.issLoading = true;debugger
    this.Attendance_Master_Service_.Load_Employee().subscribe(
    (Rows) => {
        debugger
    if (Rows != null) {
    this.Employee_Details_Data = Rows[1];
    
    console.log(this.Employee_Details_Data);
    this.Employee_Details_Temp.Employee_Details_Id = 0;
    this.Employee_Details_Temp.Employee_Details_Name = "Select";
    this.Employee_Details_Data.unshift(this.Employee_Details_Temp);
    this.Employee_Details_ = this.Employee_Details_Data[0];

 
    
//     this.Employee_Details_Data = Rows[0];
// this.Employee_Details_Temp.Employee_Details_Id = 0;
// this.Employee_Details_Temp.Employee_Details_Name = "Select";
// this.Employee_Details_Data.unshift(this.Employee_Details_Temp);
// this.Employee_Details_ = this.Employee_Details_Data[0];


    this.issLoading = false;
    }
    },
    (Rows) => {
    this.issLoading = false;
    }
    );
    }
}

