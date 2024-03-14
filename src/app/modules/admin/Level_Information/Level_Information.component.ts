import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Status_Service } from '../../../services/Status.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Status } from '../../../models/Status';
import {MatDialog} from '@angular/material';
import { Student_Course } from '../../../models/Student_Course';
import { Batch } from '../../../models/Batch';
import { Course } from '../../../models/Course';
import { Student_Service } from '../../../services/Student.service';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
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
    selector: 'app-Level_Information',
    templateUrl: './Level_Information.component.html',
    styleUrls: ['./Level_Information.component.css'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Level_InformationComponent implements OnInit {
    Status_Data:Status[]
    Status_:Status= new Status();
    Status_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;

    LevelInformation_Edit:boolean;
    LevelInformation_Save:boolean;
    LevelInformation_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    year: any;
    month: any;
    day: any;
    date: any;

    Login_User_Id:number=0;
    Login_User:string="0";
    array:any;
Save_Call_Status: boolean = false;
Student_Course_: Student_Course = new Student_Course();
Batch_Data: Batch[];
Batch_:Batch=new Batch;
BatchSearch_:Batch=new Batch;
Batch_Temp: Batch = new Batch;
Batch_Data_Filter: Batch[]

Course_Data: Course[];
Course_:Course=new Course;
CourseSearch_:Course=new Course;
Course_Temp: Course = new Course;
Course_Data_Filter: Course[]  
Course_Data_Search: Course[];
Course_Data_Filter_Search: Course[] 

constructor(public Status_Service_:Status_Service, 
    private route: ActivatedRoute, private router: Router,
    public Student_Service_:Student_Service, 
    public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    // this.Permissions = Get_Page_Permission(9);
    // if(this.Permissions==undefined || this.Permissions==null)
    // {
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('/auth/login');
    // }
    // else
    {
    // this.Status_Edit=this.Permissions.Edit;
    // this.Status_Save=this.Permissions.Save;
    // this.Status_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.Get_Menu_Status(9,this.Login_User);
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_UpdateDatedata();
    // this.Search_Status();
    this.Entry_View=true;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-300;
    this.myInnerHeight = this.myInnerHeight - 250;
   
}
Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Status_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
  this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==9)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==9)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.LevelInformation_Edit= this.array.Edit;
                this.LevelInformation_Save= this.array.Save;
                this.LevelInformation_Delete= this.array.Delete;
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}


Course_Change() {
   
    this.Student_Course_.Course_Name_Details = "";
    this.Student_Course_.Agent_Amount = 0;
    this.Student_Course_.Total_Fees = 0;
    this.Student_Course_.Course_Type_Id = 0;
    this.Student_Course_.Course_Type_Name = "";
    this.Student_Course_.Entry_Date = null;
    this.Student_Course_.Start_Date = null;
    this.Student_Course_.Join_Date = null;
    this.Student_Course_.End_Date = null;
    this.Student_Course_.End_Date_L = null;

    this.Student_Course_.By_User_Id = 0;
    this.Student_Course_.Status = 0;
    this.Student_Course_.Installment_Type_Id = 0;
    this.Student_Course_.No_Of_Installment = 0;
    this.Batch_ = null;




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
    
        display_MasterCourse(Course_: Course) {
            if (Course_) {
            return Course_.Course_Name;
            }
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
    




            Update_EndDate() {
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



                if (
                    this.Student_Course_.End_Date_Check == null ||
                    this.Student_Course_.End_Date_Check == undefined ||
                    this.Student_Course_.End_Date == null ||
                    this.Student_Course_.End_Date == undefined
                    ) {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: "Dialogbox-Class",
                    data: { Message: "Choose End Date", Type: "3" },
                    });
                    return;
                    }







                debugger
             
                
                var Enddate_Status = 0;
                if (Boolean(this.Student_Course_.End_Date_Check) == true) Enddate_Status = 1;
                
                
                debugger
                if (
                    this.Student_Course_.End_Date == undefined ||
                    this.Student_Course_.End_Date == null 
                    ) {
                    this.Student_Course_.End_Date = null;
                    }
                    
                    else
                    this.Student_Course_.End_Date = this.New_Date(
                    new Date(moment(this.Student_Course_.End_Date).format("YYYY-MM-DD"))
                    );
                
                
                this.Student_Course_.Course_Id = this.Course_.Course_Id;
                this.Student_Course_.Course_Name = this.Course_.Course_Name;
                this.Student_Course_.Batch_Id = this.Batch_.Batch_Id;
                this.Student_Course_.Batch_Name = this.Batch_.Batch_Name;
                this.Student_Course_.By_User_Id = Number(this.Login_User);
               
                if (this.Save_Call_Status == true) return;
                else this.Save_Call_Status = true;
                
                this.issLoading = true;
        
                
                // document.getElementById('Save_Button').hidden=true;
                debugger
                this.Student_Service_.Update_EndDate(this.Student_Course_).subscribe(
                (Save_status) => {
                    debugger
                if (Number(Save_status[0][0].Student_Course_Id_) > 0) {
                this.Save_Call_Status = false;
                
                
              
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Saved", Type: "false" },
                });
             
               this.   Clr_UpdateDatedata();
                this.Save_Call_Status = false;
                } 
                else {
                this.Save_Call_Status = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Error Occured", Type: "2" },
                
                });
                // document.getElementById('Save_Button').hidden=true;
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
                




                Clr_UpdateDatedata()
                {
                    this.Student_Course_.End_Date = null;
                    this.Student_Course_.End_Date_Check=false;
                   this.Batch_=null;
                   this.Course_=null;

                }











}

