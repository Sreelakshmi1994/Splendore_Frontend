import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course_Service } from '../../../services/Course.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Course } from '../../../models/Course';
import { Course_Fees } from '../../../models/Course_Fees';
import { Course_Subject } from '../../../models/Course_Subject';
import { Study_Materials } from '../../../models/Study_Materials';
import { Fees_Type } from '../../../models/Fees_Type';
import { Course_Type } from '../../../models/Course_Type';
import { Part } from '../../../models/Part';
import { Online_Exam_Status } from '../../../models/Online_Exam_Status';
import { Subject } from '../../../models/Subject';
import {MatDialog} from '@angular/material';
import { Mastercourse } from "../../../models/Mastercourse";
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
    selector: 'app-Course',
    templateUrl: './Course.component.html',
    styleUrls: ['./Course.component.css']
})
export class CourseComponent implements OnInit {
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Course_Edit:boolean;
    Course_Save:boolean;
    Course_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;
    myInnerHeightTwo: number;

    Course_: Course = new Course();
    Course_Data: Course[]
    Course_Name_Search: string;

    Is_Check:boolean=true;  

    Is_Associate:boolean=false;
    
    Is_Agent:boolean=false;
    Course_Subject: Course_Subject = new Course_Subject();
    Course_Subject_Data: Course_Subject[]

    Course_Fees: Course_Fees = new Course_Fees();
    Course_Fees_Data: Course_Fees[]

    // Mastercourse_Data: Mastercourse[]

    Study_Materials: Study_Materials=new Study_Materials;
    Study_Materials_Data: Study_Materials[];

    Course_Type: Course_Type = new Course_Type;
    Course_Type_Search: Course_Type = new Course_Type;
    Course_Type_Temp: Course_Type = new Course_Type;
    Course_Type_Data: Course_Type[]

    Fees_Type: Fees_Type = new Fees_Type;
    Fees_Type_Temp: Fees_Type = new Fees_Type;
    Fees_Type_Data: Fees_Type[]

    Part: Part = new Part;
    Part_Material: Part = new Part;
    Part_Temp: Part = new Part;
    Part_Data: Part[]

    Subject: Subject = new Subject;
    Subject_Materials: Subject = new Subject;
    Subject_Temp: Subject = new Subject;
    Subject_Data: Subject[]
    Subject_Data_Filter: Subject[]

    Online_Exam_Status: Online_Exam_Status = new Online_Exam_Status;
    Online_Exam_Status_Temp: Online_Exam_Status = new Online_Exam_Status;
    Online_Exam_Status_Data: Online_Exam_Status[]

    Login_User_Id:number=0;

    Course_Fees_Index: number = -1;
    Course_Subject_Index: number = -1;
    Study_Materials_Index: number = -1;

Mastercourse_: Mastercourse = new Mastercourse();
Mastercourse_Temp: Mastercourse = new Mastercourse();
Mastercourse_Data: Mastercourse[];

constructor(public Course_Service_:Course_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(12);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Course_Edit=this.Permissions.Edit;
    this.Course_Save=this.Permissions.Save;
    this.Course_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    // this.Get_Menu_Status(32,this.Login_User);
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 20;
    this.Clr_Course();
    this.Search_Course();
    this.Load_Mastercourse();
    this.Load_Course_DropDowns();
    this.Entry_View=false;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-230;
    this.myInnerHeight = this.myInnerHeight - 250;
}
// Page_Load()
// {
//     this.myInnerHeight = (window.innerHeight);
//     this.myInnerHeight = this.myInnerHeight - 90;
//     this.Clr_Course();
//     this.Search_Course();
//     this.Entry_View=false;
//     this.Load_Mastercourse() 
//     this.Load_Course_DropDowns(); 
//     this.Load_Fees_Type();

//     this.myInnerHeight = (window.innerHeight);
//     this.myTotalHeight=this.myInnerHeight - 90;
//     this.myTotalHeight=this.myTotalHeight-150;
//     this.myInnerHeight = this.myInnerHeight - 90;
//     this.myInnerHeightTwo = this.myInnerHeight - 730;
// }
trackByFn(index, item) 
{
return index;
}
Load_Course_DropDowns()
{
    this.Course_Service_.Load_Course_DropDowns().subscribe(Rows => {

        if (Rows != null) {

            this.Course_Type_Data = Rows[0];
            this.Course_Type_Temp.Course_Type_Id = 0;
            this.Course_Type_Temp.Course_Type_Name = "Select";
            this.Course_Type_Data.unshift(this.Course_Type_Temp);
            this.Course_Type = this.Course_Type_Data[0]
            this.Course_Type_Search = this.Course_Type_Data[0]

            this.Fees_Type_Data = Rows[1];
            this.Fees_Type_Temp.Fees_Type_Id = 0;
            this.Fees_Type_Temp.Fees_Type_Name = "Select";
            this.Fees_Type_Data.unshift(this.Fees_Type_Temp);
            this.Fees_Type = this.Fees_Type_Data[0]

            this.Part_Data = Rows[2];
            this.Part_Temp.Part_Id = 0;
            this.Part_Temp.Part_Name = "Select";
            this.Part_Data.unshift(this.Part_Temp);
            this.Part = this.Part_Data[0]

            this.Online_Exam_Status_Data = Rows[3];
            this.Online_Exam_Status_Temp.Online_Exam_Status_Id = 0;
            this.Online_Exam_Status_Temp.Online_Exam_Status_Name = "Select";
            this.Online_Exam_Status_Data.unshift(this.Online_Exam_Status_Temp);
            this.Online_Exam_Status = this.Online_Exam_Status_Data[0]
    }

        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}


Load_Fees_Type()
{
    this.issLoading = true;
    this.Course_Service_.Load_Fees_Type().subscribe(Rows => {
        if (Rows != null) {
            this.Fees_Type_Data = Rows[0];
            this.Fees_Type_Temp.Fees_Type_Id = 0;
            this.Fees_Type_Temp.Fees_Type_Name = "Select";
            this.Fees_Type_Data.unshift(this.Fees_Type_Temp);
            this.Fees_Type = this.Fees_Type_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
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
  

Create_New()
{
    this.Entry_View = true;
    this.Clr_Course();
    this.Clr_Course_Fees();
    this.Clr_Course_Subject();
    this.Course_Fees_Data=[];
    this.Course_Subject_Data=[]
    this.Course_.Agent_Amount = null;
    this.Course_.Total_Fees= null;
    this.Course_.Noof_Installment= null;
    
}
Close_Click()
{
    
 
        let top = document.getElementById('Topdiv');
        if (top !== null) {
        top.scrollIntoView();
        top = null;
        }
    this.Search_Course();
    this.Clr_Course();
    this.Clr_Course_Fees();
    this.Clr_Course_Subject();
    this.Course_Fees_Data = [];
    this.Course_Subject_Data = [];
    this.Entry_View = false;
}


Clr_Course()
{
    this.Course_.Course_Id=0;
    this.Course_.Course_Name="";
    this.Course_.User_Id = 0;
    this.Course_.Course_Type_Name = '';
    this.Course_.Duration='';
    this.Course_.Agent_Amount= 0;
    this.Course_.User_Id = 0;
    this.Course_.Total_Fees=0;
    this.Course_.Total_Fees= null;
    this.Course_Fees_Data = [];
    this.Course_Subject_Data = [];
    if (this.Course_Type_Data != undefined && this.Course_Type_Data != null)
        this.Course_Type = this.Course_Type_Data[0];

    if (this.Mastercourse_Data != undefined && this.Mastercourse_Data != null)
    this.Mastercourse_ = this.Mastercourse_Data[0];

}
Search_Course()
{
   var Course_Type_Id=0
    if (this.Course_Type_Search != undefined && this.Course_Type_Search != null)
        if (this.Course_Type_Search.Course_Type_Id != undefined && this.Course_Type_Search.Course_Type_Id != null)
            Course_Type_Id = this.Course_Type_Search.Course_Type_Id;

    this.issLoading=true;
    this.Course_Service_.Search_Course(this.Course_Name_Search, Course_Type_Id).subscribe(Rows => {
    this.Course_Data=Rows[0];
    this.Total_Entries=this.Course_Data.length;
    if(this.Course_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    this.issLoading=false;
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Delete_Course(Course_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Course_Service_.Delete_Course(Course_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.Course_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
        }
        else
        {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Can not be deleted because its already Used',Type:"2"}});
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
Search_Subject_Typeahead(event: any) 
{
    
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value.toLowerCase();
    if (this.Subject_Data == undefined || this.Subject_Data.length == 0)
    {
        this.issLoading = true;
        this.Course_Service_.Search_Subject_Typeahead(Value).subscribe(Rows => {
        if (Rows != null) {
        
            this.Subject_Data = Rows[0];
            this.Subject_Data_Filter=[];
            for (var i=0;i<this.Subject_Data.length;i++)
            {
                if(this.Subject_Data[i].Subject_Name.toLowerCase().includes(Value))
                    this.Subject_Data_Filter.push(this.Subject_Data[i])
            }

        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
        });
    }
    else
    {
        this.Subject_Data_Filter=[];
        for (var i=0;i<this.Subject_Data.length;i++)
        {
            if(this.Subject_Data[i].Subject_Name.toLowerCase().includes(Value))
                this.Subject_Data_Filter.push(this.Subject_Data[i])
        }
    }
}
display_Subject(Subject_e: Subject) 
{    
    if (Subject_e) { return Subject_e.Subject_Name; }
}

Clr_Course_Fees()
 {
this.Course_Fees.Course_Fees_Id=0;
this.Course_Fees.Course_Id=0;
this.Course_Fees.Amount=0;
// this.Course_Fees.Is_Associat
this.Course_Fees.Tax=0;
this.Course_Fees.Is_Agent=false;

this.Course_Fees.Is_Associate=false;
this.Course_Fees.No_Of_Instalment="";
this.Course_Fees.Instalment_Period=0;

if (this.Fees_Type_Data != undefined && this.Fees_Type_Data != null)
    this.Fees_Type = this.Fees_Type_Data[0];

}
Delete_Course_Fees(Course_Fees:Course_Fees,index)
{
    this.Course_Fees_Data.splice(index, 1);
 this.Clr_Course_Fees();
}
Plus_Course_Fees(event)
{

    debugger
    if (this.Fees_Type.Fees_Type_Id == undefined || this.Fees_Type.Fees_Type_Id == null || this.Fees_Type.Fees_Type_Id == 0 || this.Fees_Type==null )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Fees ',Type:"3"}});
        return
    }
    else if (this.Course_Fees.Amount == undefined || this.Course_Fees.Amount == null || this.Course_Fees.Amount==0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Amount',Type:"3"}});
        return
    } 
    // else if (this.Course_Fees.Tax == undefined || this.Course_Fees.Tax == null)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Tax',Type:"3"}});
    //     return
    // } 
    // else if (this.Course_Fees.No_Of_Instalment == undefined || this.Course_Fees.No_Of_Instalment == null || this.Course_Fees.No_Of_Instalment=="" )
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the No Of Instalment',Type:"3"}});
    //     return
    // } 
    
    else if (this.Course_Fees.Instalment_Period == undefined || this.Course_Fees.Instalment_Period == null  )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Instalment Period',Type:"3"}});
        return
    } 

    if (this.Course_Fees_Data == undefined)
        this.Course_Fees_Data = [];
    this.Course_Fees.Fees_Type_Id = this.Fees_Type.Fees_Type_Id
    this.Course_Fees.Fees_Type_Name = this.Fees_Type.Fees_Type_Name
    this.Course_Fees.Tax=0
   
if(this.Course_Fees.Is_Associate==true)
{
this.Course_Fees.Is_Associate_ =1}
else{
this.Course_Fees.Is_Associate_ =0}
 



if(this.Course_Fees.Is_Agent==true)
{
this.Course_Fees.Is_Agent_ =1}
else{
this.Course_Fees.Is_Agent_ =0}
 


    if (this.Course_Fees_Index >= 0) {
        this.Course_Fees_Data[this.Course_Fees_Index] = Object.assign({}, this.Course_Fees)// this.Sales_Details_;
        }
        else {
        this.Course_Fees_Data.push(Object.assign({}, this.Course_Fees));
        }
    this.Course_Fees_Index=-1;
    this.Clr_Course_Fees();
}

Clr_Course_Subject()
{
this.Course_Subject.Course_Subject_Id=0;
this.Course_Subject.Course_Id=0;
// this.Course_Subject.Part_Id=0;
// this.Course_Subject.Subject_Id=0;
// this.Course_Subject.Subject_Name="";
this.Course_Subject.Minimum_Mark="";
this.Course_Subject.Maximum_Mark="";
// this.Course_Subject.Online_Exam_Status="";
this.Course_Subject.No_of_Question="";
this.Course_Subject.Exam_Duration="";

    if (this.Part_Data != undefined && this.Part_Data != null)
        this.Part = this.Part_Data[0];

    this.Subject = null;

    if (this.Online_Exam_Status_Data != undefined && this.Online_Exam_Status_Data != null)
        this.Online_Exam_Status = this.Online_Exam_Status_Data[0];
}
Delete_Course_Subject(Course_Subject:Course_Subject,index)
{
    this.Course_Subject_Data.splice(index, 1);
    this.Clr_Course_Subject();
}
Plus_Course_Subject(event)
{
    // if (this.Part.Part_Id == undefined || this.Part.Part_Id == null || this.Part.Part_Id == 0 || this.Part==null )
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Part ',Type:"3"}});
    //     return
    // }
    // else
     if (this.Subject == null || this.Subject == undefined ) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Syllabus ', Type: "3" } });
        return
    }
    else if (this.Course_Subject.Minimum_Mark == undefined || this.Course_Subject.Minimum_Mark == null || this.Course_Subject.Minimum_Mark=="" )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Attendance Percentage',Type:"3"}});
        return
    }
    // else if (this.Course_Subject.Maximum_Mark == undefined || this.Course_Subject.Maximum_Mark == null || this.Course_Subject.Maximum_Mark == "")
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Maximum Mark',Type:"3"}});
    //     return
    // }
    // else if (this.Online_Exam_Status.Online_Exam_Status_Id == undefined || this.Online_Exam_Status.Online_Exam_Status_Id == null || this.Online_Exam_Status.Online_Exam_Status_Id == 0 || this.Online_Exam_Status == null) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Exam Status ', Type: "3" } });
    //     return
    // }
    // else if (this.Course_Subject.No_of_Question == undefined || this.Course_Subject.No_of_Question == null || this.Course_Subject.No_of_Question == "") {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the No Of Question', Type: "3" } });
    //     return
    // }
    // else if (this.Course_Subject.Exam_Duration == undefined || this.Course_Subject.Exam_Duration == null || this.Course_Subject.Exam_Duration == "") {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Exam Duration', Type: "3" } });
    //     return
    // }

    if (this.Course_Subject_Data == undefined)
        this.Course_Subject_Data = [];
    this.Course_Subject.Part_Id = 1
    // this.Course_Subject.Part_Name = this.Part.Part_Name
    if(this.Subject.Subject_Id==undefined||this.Subject.Subject_Id==null)
    {
        this.Course_Subject.Subject_Id=0
        this.Course_Subject.Subject_Name=String(this.Subject);
    }
    else
    {
        this.Course_Subject.Subject_Id = this.Subject.Subject_Id
        this.Course_Subject.Subject_Name = this.Subject.Subject_Name
    }
    this.Course_Subject.Online_Exam_Status = 1
    // this.Course_Subject.Online_Exam_Status_Name = this.Online_Exam_Status.Online_Exam_Status_Name

    if (this.Course_Subject_Index >= 0) {
        this.Course_Subject_Data[this.Course_Subject_Index] = Object.assign({}, this.Course_Subject)// this.Sales_Details_;
        }
        else {
        this.Course_Subject_Data.push(Object.assign({}, this.Course_Subject));
        }
    this.Course_Subject_Index=-1;
    this.Clr_Course_Subject();
}



Save_Course()
{debugger
    if(this.Course_.Course_Name===undefined || this.Course_.Course_Name==null || this.Course_.Course_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Course Name ',Type: "3" }});
    return  
    }

    if(this.Mastercourse_.MasterCourse_Id == undefined || this.Mastercourse_.MasterCourse_Id == null || this.Mastercourse_.MasterCourse_Id == 0 || this.Mastercourse_==null )
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Master Course Name ',Type: "3" }});
    return  
    }

    if(this.Course_.Duration == undefined || this.Course_.Duration == null || this.Course_.Duration == ""  )
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Duration ',Type: "3" }});
    return  
    }

   
    // else if (this.Course_Type.Course_Type_Id == undefined || this.Course_Type.Course_Type_Id == null || this.Course_Type.Course_Type_Id == 0 || this.Course_Type==null )
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Course Type ',Type:"3"}});
    //     return
    // }
    // else if (this.Course_.Agent_Amount === undefined || this.Course_.Agent_Amount == null || this.Course_.Agent_Amount==0)
    // {
    // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter One Time  Amount ',Type: "3" }});
    // return  
    // }
    // else if (this.Course_.Total_Fees === undefined || this.Course_.Total_Fees == null || this.Course_.Total_Fees==0)
    // {
    // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Installment Amount ',Type: "3" }});
    // return  
    // }

    // if (this.Fees_Type == undefined || this.Fees_Type == null || this.Fees_Type.Fees_Type_Id == undefined || this.Fees_Type.Fees_Type_Id==0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Fees_Type', Type: "3" } });
    //     return;
    // }
   else if (this.Course_Fees_Data.length === undefined || this.Course_Fees_Data.length == null || this.Course_Fees_Data.length == 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Add Atleast One Course Fees ', Type: "3" } });
        return
    }
    // else if (this.Course_Subject_Data.length === undefined || this.Course_Subject_Data.length == null || this.Course_Subject_Data.length == 0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Add Atleast One Course Syllabus ', Type: "3" } });
    //     return
    // }
   
    var  Is_Check_Value=0
    if (this.Is_Check == true)
    
        Is_Check_Value=1;
    
    else
        Is_Check_Value=0 ;
    
  
    this.issLoading=true;
    this.Course_.User_Id = this.Login_User_Id;
    this.Course_.Course_Type_Id = 1;
    this.Course_.Course_Type_Name = '';
    this.Course_.Fees_Type_Id = this.Fees_Type.Fees_Type_Id;


    // for (var i = 0; i < this.Course_Fees_Data.length;i++)
    // {
    //   if(this.Course_Fees_Data[i].Is_Associate == null||this.Course_Fees_Data[i].Is_Associate == undefined)
    //   {
    //     this.Course_Fees_Data[i].Is_Associate = false
    //     this.Course_Fees_Data[i].Is_Associate_ = 0
    //   }
    //   else if(this.Course_Fees_Data[i].Is_Associate == true)
    //   {
    //     // this.Course_Fees_Data[i].Is_Associate = false
    //     this.Course_Fees_Data[i].Is_Associate_ = 1
    //   }
    // }

    // for (var i = 0; i < this.Course_Fees_Data.length;i++)
    // {
    //   if(this.Course_Fees_Data[i].Is_Agent == null||this.Course_Fees_Data[i].Is_Agent == undefined)
    //   {
    //     this.Course_Fees_Data[i].Is_Agent = false
    //     this.Course_Fees_Data[i].Is_Agent_ = 0
    //   }

    //   else if(this.Course_Fees_Data[i].Is_Agent == true)
    //   {
    //     // this.Course_Fees_Data[i].Is_Associate = false
    //     this.Course_Fees_Data[i].Is_Agent_ = 1
    //   }

    // }



     this.Course_.Course_Fees = this.Course_Fees_Data;
    this.Course_.Course_Subject = [];
    this.Course_.Is_Check=Is_Check_Value;
    this.Course_.MasterCourse_Id=this.Mastercourse_.MasterCourse_Id;
    this.Course_.MasterCourse_Name=this.Mastercourse_.MasterCourse_Name;
    debugger
    // this.Course_.Study_Materials = this.Study_Materials_Data;
    this.Course_Service_.Save_Course(this.Course_).subscribe(Save_status => {
        debugger
    // Save_status=Save_status[0];
    if(Number(Save_status[0].Course_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
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
Edit_Course(Course_e:Course,index)
{
    debugger
    this.Entry_View=true;
    this.Course_=Course_e;
    this.Course_=Object.assign({},Course_e);

    for (var i = 0; i < this.Course_Type_Data.length; i++) {
        if (this.Course_Type_Data[i].Course_Type_Id == this.Course_.Course_Type_Id) {
            this.Course_Type = this.Course_Type_Data[i];
        }
    }
    for (var i = 0; i < this.Fees_Type_Data.length; i++) {
        if (this.Fees_Type_Data[i].Fees_Type_Id == this.Course_.Fees_Type_Id) {
            this.Fees_Type = this.Fees_Type_Data[i];
        }
     
        
        for (var i = 0; i < this.Mastercourse_Data.length; i++) {
            if (this.Mastercourse_Data[i].MasterCourse_Id == this.Course_.MasterCourse_Id) {
                this.Mastercourse_ = this.Mastercourse_Data[i];
            }
        }
    }
    this.issLoading = true;
    debugger
    this.Course_Service_.Get_Course(this.Course_.Course_Id).subscribe(Rows => {
        debugger
         this.Course_Fees_Data = Rows[0]
        this.Course_Subject_Data = Rows[1]
        // this.Mastercourse_Data=Rows[2]
      
        this.issLoading = false;

    },

        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });

        
    


}

Edit_Course_Fees(Course_Fees_e:Course_Fees,index)
{   debugger
    this.Course_Fees_Index=index;
    this.Course_Fees = Object.assign({}, Course_Fees_e); 

    // if (this.Fees_Type_Data != undefined && this.Fees_Type_Data != null)
    //     this.Fees_Type = this.Fees_Type_Data[0];

    for (var i = 0; i < this.Fees_Type_Data.length; i++) {
        if (this.Fees_Type_Data[i].Fees_Type_Id == this.Course_Fees.Fees_Type_Id) {
            this.Fees_Type = this.Fees_Type_Data[i];
        }
    }


    // if(this.)


}

Edit_Course_Subject(Course_Subject_e:Course_Subject,index)
{   
   
        this.Course_Subject_Index=index;
    this.Course_Subject = Object.assign({}, Course_Subject_e); 

    this.Subject_Temp.Subject_Id = this.Course_Subject.Subject_Id;
    this.Subject_Temp.Subject_Name = this.Course_Subject.Subject_Name;
    this.Subject = Object.assign({}, this.Subject_Temp);


    for (var i = 0; i < this.Part_Data.length;i++)
    {
        if (this.Part_Data[i].Part_Id == this.Course_Subject.Part_Id)
        {
            this.Part = this.Part_Data[i];
        }
    }
     for (var i = 0; i < this.Online_Exam_Status_Data.length;i++)
    {
         if (this.Online_Exam_Status_Data[i].Online_Exam_Status_Id == this.Course_Subject.Online_Exam_Status)
        {
            this.Online_Exam_Status = this.Online_Exam_Status_Data[i];
        }
    }
}

Edit_Study_Materials(Study_Materials_e:Study_Materials,index)
{   
   
        this.Study_Materials_Index=index;
    this.Study_Materials = Object.assign({}, Study_Materials_e);

    this.Subject_Temp.Subject_Id = this.Study_Materials.Subject_Id;
    this.Subject_Temp.Subject_Name = this.Study_Materials.Subject_Name;
    this.Subject_Materials = Object.assign({}, this.Subject_Temp);

    for (var i = 0; i < this.Part_Data.length;i++)
    {
        if (this.Part_Data[i].Part_Id == this.Study_Materials.Part_Id)
        {
            this.Part_Material = this.Part_Data[i];
        }
    }
}


  


//  Clr_Study_Materials()
//  {
// this.Study_Materials.Study_Materials_Id=0;
// this.Study_Materials.Course_Id=0;
// // this.Study_Materials.Part_Id=0;
// // this.Study_Materials.Subject_Id=0;
// this.Study_Materials.Course_Subject_Id=0;
// this.Study_Materials.Study_Materials_Name="";
// this.Study_Materials.File_Name="";


//      if (this.Part_Data != undefined && this.Part_Data != null)
//          this.Part_Material = this.Part_Data[0];

//      this.Subject_Materials = null;

// }
// Delete_Study_Materials(Study_Materials:Study_Materials,index)
// {
//     this.Study_Materials_Data.splice(index, 1);
//     this.Clr_Study_Materials();
// }
// Plus_Study_Materials(event)
// {
//     if (this.Part_Material.Part_Id == undefined || this.Part_Material.Part_Id == null || this.Part_Material.Part_Id == 0 || this.Part_Material==null )
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select Part ',Type:"3"}});
//         return
//     }
//     else if (this.Subject_Materials == null || this.Subject_Materials == undefined || this.Subject_Materials.Subject_Id == 0 || this.Subject_Materials.Subject_Id == null) {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Subject ', Type: "3" } });
//         return
//     }
//     else if (this.Study_Materials.Study_Materials_Name == undefined || this.Study_Materials.Study_Materials_Name == null || this.Study_Materials.Study_Materials_Name=="" )
//     {
//         const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter the Study Materials',Type:"3"}});
//         return
//     }

//     if (this.Study_Materials_Data == undefined)
//         this.Study_Materials_Data = [];
//     this.Study_Materials.Part_Id = this.Part_Material.Part_Id
//     this.Study_Materials.Subject_Id = this.Subject_Materials.Subject_Id

//     if (this.Study_Materials_Index >= 0) {
//         this.Study_Materials_Data[this.Study_Materials_Index] = Object.assign({}, this.Study_Materials)// this.Sales_Details_;
//         }
//         else {
//         this.Study_Materials_Data.push(Object.assign({}, this.Study_Materials));
//         }
//     this.Study_Materials_Index=-1;
//     this.Clr_Study_Materials();
// }
}

