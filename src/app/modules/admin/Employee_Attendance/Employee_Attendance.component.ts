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
import { Attendance_Subject } from '../../../models/Attendance_Subject';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Session } from  '../../../models/Session';import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Attendance_Master_Service } from 'app/services/Attendance_Master.Service';
import { Employee_Details } from 'app/models/Employee_Details';
import { Employee_Details_Sub } from 'app/models/Employee_Details_Sub';
import { Employee_Attendance_Master } from 'app/models/Employee_Attendance_Master';
import { Employee_Attendance_Details } from 'app/models/Employee_Attendance_Details';
;
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Employee_Attendance',
templateUrl: './Employee_Attendance.component.html',
styleUrls: ['./Employee_Attendance.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Employee_AttendanceComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    select_User: boolean = false;
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
    Attendance_Subject_:Attendance_Subject=new Attendance_Subject;
    Attendance_Subject_Temp:Attendance_Subject=new Attendance_Subject;
    Attendance_Subject_Data:Attendance_Subject[];
    Attendance_Subject_Data_saved_syllabus:Attendance_Subject[];
    Attendance_Subject_Data_Temp:Attendance_Subject[];

    Session_:Session = new Session()
    Session_Temp:Session=new Session();
    Session_Data:Session[];

    Employee_Details_:Employee_Details = new Employee_Details()
    Employee_Details_Temp:Employee_Details=new Employee_Details();
    Employee_Details_Data:Employee_Details[];


    Register_Whatsapp_:Register_Whatsapp=new Register_Whatsapp();

    Save_Whatsapp_:Register_Whatsapp=new Register_Whatsapp();

    Attendance_Employee_Data_Temp:Employee_Attendance_Details[];
    // Employee_Attendance_Details_Data:Employee_Details_Sub[];


    Employee_Attendance_Master_:Employee_Attendance_Master = new Employee_Attendance_Master()
    Employee_Attendance_Master_Temp:Employee_Attendance_Master=new Employee_Attendance_Master();
    Employee_Attendance_Master_Data:Employee_Attendance_Master[];

    Employee_Attendance_Details_:Employee_Attendance_Details = new Employee_Attendance_Details()
    Employee_Attendance_Details_Temp:Employee_Attendance_Details=new Employee_Attendance_Details();
    Employee_Attendance_Details_Data:Employee_Attendance_Details[];
    

    Is_Date:boolean=true;    
    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    TotalDuration:number=0
constructor(public Student_Service_:Student_Service,public Attendance_Master_Service_:Attendance_Master_Service,
     private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{

    

    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(110);
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
    this.Clr_Employee_Attendance_Master();
    this.Search_Employee_Attendance();
    this.Load_Employee() ;
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





    Create_New()
    {
        this.Entry_View = true;
        this.Clr_Employee_Attendance_Master()
        this.Load_Employee() ;
    }


    Load_Employee() {
        this.issLoading = true;
        this.Attendance_Master_Service_.Load_Employee().subscribe(
        (Rows) => {
            debugger
        if (Rows != null) {
        this.Employee_Attendance_Details_Data = Rows[0];
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



        Save_Employee_Attendance()
        {
            var Menu_Employee=false; var Menu_Subject=false; 
       
        debugger
        
            for (var i = 0; i < this.Employee_Attendance_Details_Data.length; i++)
            {
                if(this.Employee_Attendance_Details_Data[i].Check_Box== true)
                
                {
                    Menu_Employee=true
                    i=this.Employee_Attendance_Details_Data.length
                    }
            } 
           
            if (Menu_Employee==false)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast One Employee', Type: "3" } });
                return
            }
           
           
            this.Attendance_Employee_Data_Temp=[]; 
            this.Absent_Student_Data_Temp = [];
        
        
            for (var i = 0; i< this.Employee_Attendance_Details_Data.length; i++) 
            {
             if (Boolean(this.Employee_Attendance_Details_Data[i].Check_Box) == true) 
                {
                    
                    this.Employee_Attendance_Details_Data[i].Attendance_Status_Id=1;
                }

                else
                {
                    
                    this.Employee_Attendance_Details_Data[i].Attendance_Status_Id=0;
                }
            }
        
          
        
        debugger
        for (var i = 0; i< this.Employee_Attendance_Details_Data.length; i++) 
            {
             if (Boolean(this.Employee_Attendance_Details_Data[i].Check_Box) == true) 
                {
                    
                    this.Attendance_Employee_Data_Temp.push(this.Employee_Attendance_Details_Data[i]);
                }
            }
        
        
            this.Employee_Attendance_Master_.Employee_Attendance_Details_ = this.Employee_Attendance_Details_Data;
           
        debugger
       this.Employee_Attendance_Master_.Users_Id=Number( this.Login_User);
       this.Employee_Attendance_Master_.From_Date = this.New_Date(new Date(moment(this.Employee_Attendance_Master_.From_Date).format('YYYY-MM-DD')));
       this.Employee_Attendance_Master_.To_Date = this.New_Date(new Date(moment(this.Employee_Attendance_Master_.To_Date).format('YYYY-MM-DD')));
    
        
            this.issLoading=true;
        debugger
            this.Student_Service_.Save_Employee_Attendance(this.Employee_Attendance_Master_).subscribe(Save_status => {
                
                this.issLoading=false;
                debugger

                if(Save_status[0].Attendance_Master_Id_==-5)
                {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Todays Attendance Already Marked', Type: "3" } });
                    return
                }
               


            if(Number(Save_status[0].Attendance_Master_Id_)>0)
            {
                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
       
                this.Close_Click()
                this.Clr_Employee_Attendance_Master();
            }


           
            else if(Save_status[0].Attendance_Master_Id_=-2)
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Edit Not allowed', Type: "3" } });
            return
        }


      
        
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
        



        Clr_Employee_Attendance_Master()
        {
    
        this.Employee_Attendance_Master_.Attendance_Master_Id =0;
        this.Employee_Attendance_Master_.Users_Id =0;  
        this.Employee_Attendance_Master_.From_Date= new Date();  
        this.Employee_Attendance_Master_.From_Date= this.New_Date(this.Employee_Attendance_Master_.From_Date); 
        this.Employee_Attendance_Master_.To_Date = new Date;   
        this.Employee_Attendance_Master_.To_Date= this.New_Date(this.Employee_Attendance_Master_.To_Date); 
     
        this.Employee_Attendance_Master_.Store_Id =0;  

        this.Employee_Attendance_Master_.Employee_Attendance_Details_=[];
        }

 Close_Click()
{
  this.Entry_View=false;
  this.Clr_Employee_Attendance_Master()
  this.Search_Employee_Attendance();
}


Edit_Employee_Attendance(Employee_Attendance_Master_e:Employee_Attendance_Master,index)
{
    debugger
    this.Entry_View=true;
    this.Employee_Attendance_Master_=Employee_Attendance_Master_e;
    this.Employee_Attendance_Master_=Object.assign({},Employee_Attendance_Master_e);

    
    this.Employee_Attendance_Master_.From_Date=this.New_Date(new Date(moment(this.Employee_Attendance_Master_.From_Date1).format("YYYY-MM-DD")));
    this.Employee_Attendance_Master_.To_Date=this.New_Date(new Date(moment(this.Employee_Attendance_Master_.To_Date1).format("YYYY-MM-DD")));
    


    this.issLoading = true;
    this.Student_Service_.Get_Employee_Attendance(this.Employee_Attendance_Master_.Attendance_Master_Id,this.Login_User).subscribe(Rows => {
         debugger
        this.Employee_Attendance_Details_Data = Rows[0];

        for (var i = 0; i< this.Employee_Attendance_Details_Data.length; i++) 
        {
         if ((this.Employee_Attendance_Details_Data[i].Attendance_Status_Id) == 1) 
            {
                
                this.Employee_Attendance_Details_Data[i].Check_Box=true;
            }

            else
            {
                
                this.Employee_Attendance_Details_Data[i].Check_Box=false;
            }
        }

    
        this.issLoading = false;
    },

        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}




    Delete_Employee_Attendance(Attendance_Master_Id,index)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
        dialogRef.afterClosed().subscribe(result =>
        {
        if(result=='Yes')
            {
            //this.issLoading=true;
            
            this.Student_Service_.Delete_Employee_Attendance(Attendance_Master_Id).subscribe(Delete_Attendance => {
            
                Delete_Attendance = Delete_Attendance[0];
                Delete_Attendance = Delete_Attendance[0].DeleteStatus_.data[0];
            if(Delete_Attendance==1){
            this.Employee_Attendance_Master_Data.splice(index, 1);
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
            this.Search_Employee_Attendance();
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
    
    Search_Employee_Attendance()
    {
        var look_In_Date_Value=0, Course_Id = 0, Batch_Id = 0;
    
        if (this.Is_Date == true)
            look_In_Date_Value = 1;
        
        this.issLoading = true;
        this.Student_Service_.Search_Employee_Attendance(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),this.Login_User).subscribe(Rows =>{
             this.Employee_Attendance_Master_Data=Rows[0];
        this.issLoading = false;
        if(this.Employee_Attendance_Master_Data.length==0 )
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

    User_Click() {
		for (var i = 0; i < this.Employee_Attendance_Details_Data.length; i++) {
			if (this.select_User == false) 
            this.Employee_Attendance_Details_Data[i].Check_Box = true;
			else this.Employee_Attendance_Details_Data[i].Check_Box = false;
		}
	}

    // View_Click() {
	// 	for (var i = 0; i < this.User_Menu_Selection_Data.length; i++) {
	// 		if (this.Select_View == false)
	// 			this.User_Menu_Selection_Data[i].IsView = true;
	// 		else this.User_Menu_Selection_Data[i].IsView = false;
	// 	}
	// }

}

