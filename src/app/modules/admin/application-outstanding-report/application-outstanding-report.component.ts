










import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Batch } from '../../../models/Batch';
import { Users } from '../../../models/Users';
import { Status } from '../../../models/Status';
import { Attendance_Master } from '../../../models/Attendance_Master';
import { Remarks} from '../../../models/Remarks';
import { Student_Followup } from '../../../models/Student_Followup';
import { Attendance_Student } from '../../../models/Attendance_Student';
import { Attendance_Subject } from '../../../models/Attendance_Subject';
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
  selector: 'app-application-outstanding-report',
  templateUrl: './application-outstanding-report.component.html',
  styleUrls: ['./application-outstanding-report.component.scss'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class ApplicationOutstandingReportComponent implements OnInit {
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
    Export_Permission:any;
    Export_View :boolean =false;

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
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  


    Batch_Data: Batch[];
    Batch_:Batch=new Batch;
    Batch_Temp: Batch = new Batch;
    
    Faculty_Data: Users[];
    Faculty_:Users=new Users;
    Faculty_Temp: Users = new Users;

    Save_Call_Status: boolean = false;
    Logo: string;
    Display_Logo_: string;
    ImageFile_Logo: any;

    Login_User: number = 0;
    Login_User_Name :string;
    Attendance_EditIndex: number = -1;

    Edit_Page_Permission:any;
    Edit_Job_Permission:any;

    Attendance_Master_:Attendance_Master=new Attendance_Master;
    Attendance_Master_Temp:Attendance_Master=new Attendance_Master;
    Attendance_Master_Data:Attendance_Master[];

    Total_Amount:number=0;

    Search_Name: "";

    Fees_Report_Data:any;
    Is_Date:boolean=true;    
    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    


    Show_FollowUp: boolean = true;
    profile_View_followup:boolean=true;
    Next_FollowUp_Date_Visible:boolean=true;
    Student_Id: number = 0;
    Student_Name:string;
    Student_EditIndex: number = -1;
    Student_Followup_: Student_Followup = new Student_Followup;
    Student_Followup_Data: Student_Followup[]

    Followup_Status_:Status=new Status;
    Followup_Status_Data:Status[];
    Followup_Status_Temp: Status = new Status;

    Followup_Users_: Users = new Users;
    Followup_Users_Data: Users[];
    Followup_Users_Data_Filter: Users[] 
    Followup_Users_Temp: Users = new Users;

    Remarks_:Remarks= new Remarks();
    Remarks_Data:Remarks[]
    Remarks_Data_Filter:Remarks[]
    Remarks_Temp:Remarks= new Remarks();
    

constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Login_User_Name = localStorage.getItem("uname");
    this.Permissions = Get_Page_Permission(35);
    this.Export_Permission=Get_Page_Permission(50);
    var currentDate = new Date();

    this.FromDate_=new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Set ToDate_ to the end of the current month
     this.ToDate_ =new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
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
    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    }
     
}
Export()
{
    
        this.Student_Service_.exportExcel(this.Fees_Report_Data,'Fees Outstanding Report')
       
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
  
    // this.FromDate_=this.New_Date(this.FromDate_)
    // this.ToDate_=this.New_Date(this.ToDate_)
    this.Is_Date=true;
    this.Search_Application_Outstanding_Report();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -210;
    // this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 250;
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
Close_Click()
{
  this.Entry_View=false;
}
Close_Click_Followup()
{
  this.Entry_View=false;
  this.Show_FollowUp = true;
}



Edit_Fees_Outstanding(Student_Id, i) {
    
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

Search_Application_Outstanding_Report()
{
    var  Course_Id = 0, Batch_Id = 0,search_name_ = undefined,look_In_Date_Value=0;
    this.Total_Amount =0,this.Total_Entries =0;
    if (this.Is_Date == true)
        look_In_Date_Value = 1;
    if (this.Course_ != undefined && this.Course_ != null)
        if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
        Course_Id = this.Course_.Course_Id;
    
    if (this.Batch_ != undefined && this.Batch_ != null)
        if (this.Batch_.Batch_Id != undefined && this.Batch_.Batch_Id != null)
        Batch_Id = this.Batch_.Batch_Id;
        

        if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
        search_name_ = this.Search_Name;
        
    this.issLoading = true;
    
    this.Student_Service_.Search_Application_Outstanding_Report(moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD')).subscribe(Rows =>{
       debugger
        this.Fees_Report_Data=Rows[0];
      
        this.Total_Entries =  this.Fees_Report_Data.length;
        var  Outstanding_Data = Rows[0];
        for(var i=0;i<Outstanding_Data.length;i++)
        {
            this.Total_Amount =  this.Total_Amount+ parseFloat(Outstanding_Data[i].Total_Fees)
        }
    this.issLoading = false;
    this.Total_Amount =  parseFloat(this.Total_Amount.toFixed(2))
    if(this.Fees_Report_Data.length==0)
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




New_Followup(Student_Id,Student_Name,Mail_Status,index)
{
   
    this.Show_FollowUp = false;
    this.Entry_View = true;
   
    this.profile_View = false;
    this.profile_View_followup=false;
  
 
    this.Next_FollowUp_Date_Visible=true;
   
    this.Student_Id = Student_Id;
    this.Student_Name=Student_Name;

    this.Student_EditIndex = index;
    // this.Next_FollowUp_Date_Visible=true;
    this.Get_FollowUp_Details();
 

 this.Student_Followup_.Student_Id=Student_Id;
 
 
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

            this.Followup_Status_Temp.FollowUp = this.Student_Followup_.FollowUp;
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

            // this.Student_Followup_.Next_FollowUp_Date = new Date();
            // this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);


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
       ;
        this.issLoading = false; 
        this.Student_Followup_=Rows[0].FollowUp[0];
        if (this.Student_Followup_ != null && this.Student_Followup_!=undefined)
         {
            this.Followup_Status_Temp.FollowUp = this.Student_Followup_.FollowUp;
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

this.Student_Followup_.Next_FollowUp_Date=null;
            //  this.Student_Followup_.Next_FollowUp_Date=new Date();
            //  this.Student_Followup_.Next_FollowUp_Date = this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
        }
         },
       
         Rows => {
              this.issLoading = false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
  
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
    //this.Student_Followup_.Next_FollowUp_Date=new Date();
    //this.Student_Followup_.Next_FollowUp_Date=this.New_Date(this.Student_Followup_.Next_FollowUp_Date);
}


display_Followup_Users(Users_: Users)
{     
    if (Users_) { return Users_.Users_Name; }
}



Save_Student_Report_FollowUp()
 { 
     
   
  
    if(this.Followup_Status_==null||this.Followup_Status_.Status_Id==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Status', Type: "3" } });
        return;
    }
    if(this.Followup_Users_==null||this.Followup_Users_.Users_Id==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter User', Type: "3" } });
        return;
    }
   
    // if(this.Student_Followup_.Next_FollowUp_Date==undefined){
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Date', Type: "3" } });
    //     return;
    // }

  
 
{     

this.Student_Followup_.Student_Id = this.Student_Id;
this.Student_Followup_.Status=this.Followup_Status_.Status_Id;
this.Student_Followup_.Status_Name = this.Followup_Status_.Status_Name;
this.Student_Followup_.To_User_Name = this.Followup_Users_.Users_Name;
this.Student_Followup_.By_User_Name=this.Login_User_Name;
this.Student_Followup_.Next_FollowUp_Date= new Date();
this.Student_Followup_.Next_FollowUp_Date= this.New_Date(new Date(moment(this.Student_Followup_.Next_FollowUp_Date).format('YYYY-MM-DD')));
this.Student_Followup_.To_User_Id= this.Followup_Users_.Users_Id;
this.Student_Followup_.By_User_Id=Number(this.Login_User)
this.issLoading=true; 

this.Student_Service_.Save_Student_Report_FollowUp(this.Student_Followup_).subscribe(Save_status => {
     this.issLoading=false;             
   
   //log(Save_status[0][0])
if(Number(Save_status[0][0].Student_Id_)>0)
{  
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});  
this.Close_Click_Followup();
this.Search_Application_Outstanding_Report();
}

else{
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
document.getElementById('Save_Button').hidden=false;
}

},
Rows => { 
        this.issLoading=false;
document.getElementById('Save_Button').hidden=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}
} 



}

