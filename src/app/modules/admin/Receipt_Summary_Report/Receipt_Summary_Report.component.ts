import { Component, OnInit,Input,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Student } from '../../../models/Student';
// import { Branch } from '../../../models/Branch';
import { Users } from '../../../models/Users';
// import { Department } from '../../../models/Department';
// import { Department_Status } from '../../../models/Department_Status';
import { Gender } from '../../../models/Gender';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Remarks } from '../../../models/Remarks';
import { Student_Followup } from '../../../models/Student_Followup';
// import { Fees_Receipt_ReportComponent } from '../Fees_Receipt_Report/Fees_Receipt_Report.component';
import { Fees } from '../../../models/Fees';
import { Fees_Receipt } from '../../../models/Fees_Receipt';
import { Client_Accounts } from "../../../models/Client_Accounts";


const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: {
dateInput: 'DD/MM/YYYY',
},
display: {
dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
},
};

@Component({
selector: 'app-Receipt_Summary_Report',
templateUrl: './Receipt_Summary_Report.component.html',
styleUrls: ['./Receipt_Summary_Report.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})

export class Receipt_Summary_ReportComponent implements OnInit {
    // Status_Search: Department_Status = new Department_Status();
    User_Search: Users = new Users();
    Search_Name = "";
    Fees_Search: Fees = new Fees()
    // Department_Search: Department = new Department()
    // Search_Branch: Branch = new Branch();
    Search_ToAccount:Client_Accounts=new Client_Accounts();
    Search_FromDate: Date = new Date();
    Search_ToDate: Date = new Date();
    Look_In_Date: Boolean = true;
    More_Search_Options: boolean = true;
    // Fees:Fees_Receipt_ReportComponent

    Fees_Data: Fees[]
    // Department_Data: Department[]
    Users_Data: Users[]
    // Branch_Data: Branch[]
    // Status_Data: Department_Status[]
    Gender_Data: Gender[]
    Fees_Temp: Fees = new Fees();
    // Branch_Temp1: Branch = new Branch();
    Users_Temp: Users = new Users();
    // Department_Temp: Department = new Department();
    // Status_Temp: Department_Status = new Department_Status();
    missedfollowup_count: number = 1;
    followup_count: number = 1;
    FollowUp_:Student_Followup=new Student_Followup()

    Fees_Name_Search:Fees=new Fees()
    Fees_Receipt_Temp:Fees_Receipt=new Fees_Receipt();
    Fees_Receipt_Data:Fees_Receipt[]
    Fees_Description_Search:Fees_Receipt=new Fees_Receipt()
    Fees_Amount_Search:Fees_Receipt=new Fees_Receipt();
    Fees_Receipt_Search:Fees_Receipt[]

    Lead_Data: Student[]
    Student_Data_Search: Student[]
    Student_Data:Student[]
    Student_Data_Item:Student=new Student()
    Lead_: Student = new Student();
    Search_Div: boolean = false;
    array: any;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
myInnerHeight: number;
    issLoading: boolean;

    Show_FollowUp:boolean=false
    main_View:boolean=false
    Report_View:boolean=false
    Student_Selected_Data:Student[]

    Black: boolean = false;
    Red: boolean = false;
    pagePointer: number = 0;
    pageindex2: number = 0;
    pageindex: number = 0;
    Total_Rows: number = 0;
    isLoading = false;
    Search_By_: any;
    Registered_By_: any;
    year: any;
    month: any;
    day: any;
    date: any;
    Login_User: string = "0";
    Menu_Id: number = 102;

    Select_Student:boolean=false;
    Select_View:boolean=false;
    Student_Id:number=0;
    Student_:Student =new Student()



    RowCount: number = 0;
    RowCount2: number = 0;
    nextflag: number = -1;
    Page_Length_: number = 10;
    firstnum: number = 0;
    lastnum: number = 1;
    shownext: boolean = false;
    showprev: boolean = false;

    Black_Start: number = 1;
    Black_Stop: number = 0;
    Red_Start: number = 1;
    Red_Stop: number = 0;
    points25: boolean = false;
    Edit_Page_Permission: any;

    Followup_Users_Data:Users[]
    Followup_Users_:Users= new Users();

    Student_Selection_Data_Temp:Student[];


    // FollowUp_Status_:Department_Status= new Department_Status();

    // Followup_Status_Data:Department_Status[]

    To_Account_: Client_Accounts = new Client_Accounts();
	To_Account_Temp: Client_Accounts = new Client_Accounts();
	To_Account_Data: Client_Accounts[];


    Collected_By_: Users = new Users();
	Collected_By_Temp: Users = new Users();
	Collected_By_Data: Users[];
    

    // FollowUp_Department_:Department= new Department();
    // Followup_Department_Data:Department[]
    // Followup_Department_Data_Check:Department[]

    // FollowUp_Branch_:Branch= new Branch();
    // Followup_Branch_Data:Branch[]
    // Branch_Temp:Branch= new Branch();

    Remarks_:Remarks= new Remarks
    Remarks_Data:Remarks[]
    Remarks_Temp:Remarks= new Remarks();
    Login_Id:number
    Export_Permission:any
    Export_View:boolean=false;
     
    Total_Amount:number=0;
    Fees_Array: Fees[];
    Fees_Data_: Fees = new Fees();
    myTotalHeight:number;
   
    Enquiry_Source_title = '';
    Enquiry_Source_type = 'BarChart';
    Type_PIe='PieChart'
    Branchwise_data = [  ];
    Data_Bar = [  ];
    Branchwise_columnNames = ['User_Detils_Name', 'Data_Count'];
    Enquiry_Source_options = { 
      is3D: true,
    };
    width = 550;
    height = 400; 
 
    Graph_Button: boolean = false;
    
    View_Graph:boolean=false

    Summary_Sub:boolean=false

    Total_Entries:number=0;

   Entries:number=0;
   Permissions: any;


 
constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) 
{   }
ngOnInit() 
{
  
    this.Login_User = localStorage.getItem("Login_User");
    // this.array = Get_Page_Permission(this.Menu_Id);
    // this.Export_Permission=Get_Page_Permission(38);

    // if (this.array == undefined || this.array == null)
    // {
    //     localStorage.removeItem('token');
    //     this.router.navigateByUrl('/auth/login');
    // }
    // else 
    {
       
        this.Page_Load();
        if (this.Export_Permission != undefined && this.Export_Permission != null)
            this.Export_View=this.Export_Permission.Edit
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Show_FollowUp=false
    this.Black_Stop = this.Page_Length_;
    this.Red_Stop = this.Page_Length_;
    this.main_View=true
    this.Summary_Sub=true
    this.Report_View=true
    this.View_Graph=false
    var my_date=new Date()
    this.Search_FromDate = new Date(my_date.getFullYear(), my_date.getMonth(), 1);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    // this.Get_Lead_Load_Data_ByUser(this.Login_User);
    this.Get_Menu_Status(102,this.Login_User);
    this.Get_Menu_Status(38,this.Login_User);
    // this.Search_Student_Report();
    this.Show_FollowUp=false
    this.Search_By_=1;
    this.Registered_By_ = 1;
    // this.Get_Lead_Load_Data();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight - 260;
    this.myTotalHeight=this.myTotalHeight-20;
    this.myInnerHeight = this.myInnerHeight - 190;
    this.Load_Dropdowns() 
}

Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Student_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            

    // if(Menu_id==17)

    if (Rows[0][0]==undefined)
    {
        if(Menu_id==102)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    // if (Rows[0][0]!=undefined)

    if (Rows[0][0].View >0) 
    {
        if(Menu_id==102)
        {
            
            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
     
        }
    }

        if(Menu_id==38)
        {
            
           
            this.Export_Permission=Rows[0][0];

            if (this.Export_Permission != undefined && this.Export_Permission != null)
             this.Export_View=this.Export_Permission.View;
             else
             this.Export_View=true;

        }
    // else
    // {
    //     localStorage.removeItem('token');
    //                 this.router.navigateByUrl('Home_Page'); 
    // }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}



New_Date(Date_)
{
    this.date = Date_;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    if (this.month < 10)
    {
        this.month = "0" + this.month;
    }
    this.day = this.date.getDate().toString();
    if (Number.parseInt(this.day) < 10)
    {
        this.day = "0" + this.day;
    }
    this.date = this.year + "-" + this.month + "-" + this.day;
    return this.date;
}
trackByFn(index, item) 
{
return index;
}
Edit_Lead(Lead_Id, i) {
        localStorage.setItem('Lead_Id', Lead_Id);

        this.Edit_Page_Permission = Get_Page_Permission(1);
        if (this.Edit_Page_Permission == undefined) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
        }
        else if (this.Edit_Page_Permission.View == true)
            this.router.navigateByUrl('/Leads');
        else {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
        }

    }

Student_View_Click()
{
    
 
 for(var i=0;i<this.Student_Data_Search.length;i++)
{
    if(this.Select_Student==false)
        this.Student_Data_Search[i].Check_Box_View=true;
    else
        this.Student_Data_Search[i].Check_Box_View=false;
}
}
New_Followup()
{
    
    this.Show_FollowUp=true;
    this.main_View=false
    this.Report_View=false
    // this.FollowUp_.Next_FollowUp_Date=new Date();
    // this.FollowUp_.Next_FollowUp_Date=this.New_Date( this.FollowUp_.Next_FollowUp_Date);
}
Search_Lead_button() 
{
    this.Black_Start =1;
    this.Black_Stop = this.Page_Length_;
    this.Red_Start = 1;
    this.Total_Rows=0;
    this.Red_Stop = this.Page_Length_;
    // this.Search_Student_Report();
}
Search_Lead_button1() 
{
    this.Black_Start =1;
    this.Black_Stop = this.Page_Length_;
    this.Red_Start = 1;
    this.Total_Rows=0;
    this.Red_Stop = this.Page_Length_;
    this.Search_Fees_Receipt_Report(this.User_Search.Users_Id)
}
Search_More_Options()
{
    if (this.More_Search_Options == true)
    this.More_Search_Options = false;
    else
    this.More_Search_Options = true;
}
Export()
{
        this.Student_Service_.exportExcel(this.Fees_Receipt_Search,'Receipt_Report')

}
Export_Summary()
{
        this.Student_Service_.exportExcel(this.Student_Data_Search,'Receipt Summary Report')

}
// Branch_Change()
// { 
//     this.FollowUp_Department_=null;
//     this.Followup_Users_=null;
//     this.FollowUp_Status_=null;
//     this.Followup_Department_Data=[];
//     this.Followup_Department_Data_Check=[];
//     this.Followup_Users_Data=[];
//     this.Followup_Status_Data=[];
// }
Focus_It()
{  
    setTimeout("$('[name=Followup_Status]').focus();", 0)
}
// Department_Change()
// {    
//     //  document.getElementById("Followup_Status").focus(); 
//         $('[name=Followup_Status]').focus();
//     this.Focus_It();
//     this.Followup_Users_=null;
//     this.FollowUp_Status_=null;
//     this.Followup_Users_Data=[];
//     this.Followup_Status_Data=[];
//     this.Followup_Department_Data=[];
//     // if(this.FollowUp_Department_.Department_FollowUp==true)
//     // this.Next_FollowUp_Date_Visible=false;
//     // else
//     // this.Next_FollowUp_Date_Visible=true;
//     this.FollowUp_.Next_FollowUp_Date=new Date();
//     this.FollowUp_.Next_FollowUp_Date=this.New_Date(this.FollowUp_.Next_FollowUp_Date);
// }
View_Details(Users_Id)
{
    for (var i = 0; i < this.Users_Data.length; i++) {
        if (Users_Id== this.Users_Data[i].Users_Id)
        this.User_Search=this.Users_Data[i];
    }   
    
this.Search_Fees_Receipt_Report(Users_Id)

}
Search_Fees_Receipt_Report(User_Id){
    this.main_View=false
    this.Report_View=true
    this.View_Graph=false
    var value = 1, dept_id=0,search_name_='0',look_In_Date_Value=0,branch_id=0,Fees_Id=0,To_Account_Id=0;
    if(this.Search_By_!=undefined && this.Search_By_!=null)
    if (this.Search_By_ != undefined && this.Search_By_ != null && this.Search_By_ != '')
    value=this.Search_By_;

    if (this.Look_In_Date == true )
    look_In_Date_Value = 1;

    if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    search_name_ = this.Search_Name;

   
    if (this.Collected_By_ != undefined && this.Collected_By_!=null)
    if (this.Collected_By_.Users_Id != undefined && this.Collected_By_.Users_Id != null)
    User_Id = this.Collected_By_.Users_Id;

    

    if (this.Fees_Data_ != undefined && this.Fees_Data_ != null)
    if (this.Fees_Data_.Fees_Id != undefined && this.Fees_Data_.Fees_Id != null)
    Fees_Id = this.Fees_Data_.Fees_Id;
    

    if (this.To_Account_ != undefined && this.To_Account_ != null)
    if (this.To_Account_.Client_Accounts_Id != undefined && this.To_Account_.Client_Accounts_Id != null)
    To_Account_Id = this.To_Account_.Client_Accounts_Id;



    this.issLoading = true;
    
    this.Student_Service_.Search_Fees_Receipt_Report(moment(this.Search_FromDate).format('YYYY-MM-DD'), 
    moment(this.Search_ToDate).format('YYYY-MM-DD'), To_Account_Id, User_Id,   look_In_Date_Value, this.Black_Start, this.Black_Stop, this.Login_User, this.Red_Start, this.Red_Stop,Fees_Id)
.subscribe(Rows => 
{
    
   
   // log(Rows)

   debugger
    this.Fees_Receipt_Search = Rows.returnvalue.Leads;
    this.Total_Entries=this.Fees_Receipt_Search.length; 

    
    this.missedfollowup_count =0;
    this.followup_count=0;

//     for (var i = 0; i < this.Fees_Receipt_Search.length; i++) {
//     this.Fees_Receipt_Search[i].RowNo =i+1 + this.Total_Rows;
//     if (this.Fees_Receipt_Search[i].tp == 1)
//     this.followup_count = this.followup_count + 1;
//     if (this.Fees_Receipt_Search[i].tp == 2)
//     this.missedfollowup_count = this.missedfollowup_count + 1;

    
// }

if ( this.Fees_Receipt_Search.length>0)
this.Total_Rows= this.Total_Rows+this.Fees_Receipt_Search.length;
this.issLoading = false;

// this.Fees_Receipt_Data = Rows[0];

if(this.Fees_Receipt_Search.length==0)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
}
},
Rows => 
{   
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    this.issLoading = false;
});
}

// Get_Lead_Load_Data()
// {
//     
// this.issLoading = true;
// this.Student_Service_.Get_Lead_Load_Data().subscribe(Rows => {
   
//     if (Rows != undefined)
//     {
//         
//         this.issLoading = false;
//         this.Department_Data = Rows.returnvalue.Department;
//         this.Users_Data = Rows.returnvalue.Users;
//         this.Branch_Data = Rows.returnvalue.Branch;
//         this.Status_Data = Rows.returnvalue.Department_Status;
//         this.Fees_Data = Rows.returnvalue.Fees;


//         this.Fees_Temp.Fees_Id = 0;
//         this.Fees_Temp.Fees_Name = "All";
//         this.Fees_Data.unshift(Object.assign({}, this.Fees_Temp));
//         this.Fees_Search = this.Fees_Data[0];

//         this.Department_Temp.Department_Id = 0;
//         this.Department_Temp.Department_Name = "All";
//         this.Department_Data.unshift(Object.assign({}, this.Department_Temp));
//         this.Department_Search = this.Department_Data[0];

//         this.Users_Temp.Users_Id = 0;
//         this.Users_Temp.User_Details_Name = "All";
//         this.Users_Data.unshift(Object.assign({}, this.Users_Temp));
//         this.User_Search = this.Users_Data[0];
        
//         this.Branch_Temp1.Branch_Id = 0;
//         this.Branch_Temp1.Branch_Name = "All";
//         this.Branch_Data.unshift(this.Branch_Temp1);
//         this.Search_Branch = this.Branch_Data[0];

//         this.Status_Temp.Department_Status_Id = 0;
//         this.Status_Temp.Department_Status_Name = "All";
//         this.Status_Data.unshift(Object.assign({}, this.Status_Temp));
//         this.Status_Search = this.Status_Data[0];
//     }
// },
// Rows => {
    
//     this.issLoading = false;
//     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
// });
// }


// Get_Lead_Load_Data_ByUser(Login_User)
//     {
        
//         this.issLoading = true;
//         this.Student_Service_.Get_Lead_Load_Data_ByUser(Login_User).subscribe(Rows => 
        
//     {
     

//    this.Fees_Data = Rows[3].slice();
//     this.Fees_Temp.Fees_Id = 0;
//     this.Fees_Temp.Fees_Name = "All";
//     this.Fees_Data.unshift(Object.assign({}, this.Fees_Temp));
//     this.Fees_Search = this.Fees_Data[0];

//    this.Users_Data = Rows[0].slice();
//    this.Users_Temp.Users_Id = 0;
//    this.Users_Temp.Users_Name = "All";
//    this.Users_Data.unshift(this.Users_Temp);
//    this.User_Search = this.Users_Data[0];
   
  

//    this.To_Account_Data = Rows[7].slice();
//    this.To_Account_Temp.Client_Accounts_Id = 0;
//    this.To_Account_Temp.Client_Accounts_Name = "All";
//    this.To_Account_Data.unshift(this.To_Account_Temp);
//    //this.To_Account_ = this.To_Account_Data[0];
//    this.Search_ToAccount = this.To_Account_Data[0];

   



// },
// Rows => { 
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
// }


Next_Click()
{
    if (this.Student_Data_Search.length == this.Page_Length_) 
    {
        this.Black_Start = this.Black_Start + this.Page_Length_;
        this.Black_Stop = this.Black_Stop + this.Page_Length_;
        if (this.missedfollowup_count > 0) {
        this.Red_Start = this.Red_Start + this.missedfollowup_count;
        this.Red_Stop = this.Red_Start + this.Page_Length_;
    }
this.nextflag = 1;
    if (this.Student_Data_Search.length > 0)
    {
        // this.Search_Student_Report();
    }
}
}
View_Back()
{
    this.main_View=true;
    this.Summary_Sub=true
    this.Report_View=false;
    //this.Get_Lead_Load_Data_ByUser(this.Login_User);

}
previous_Click()
{
    if (this.Black_Start > 1) {
    {
        this.Black_Start = this.Black_Start - this.Page_Length_;
        this.Black_Stop = this.Black_Stop - this.Page_Length_;
    }
    if (this.missedfollowup_count > 0 || this.Red_Start > 1) 
    {
    this.Red_Start = this.Red_Start - this.Page_Length_;
    if (this.Red_Start <= 0)
    this.Red_Start = 1;
    this.Red_Stop = this.Red_Start + this.Page_Length_;
    }
    this.Total_Rows = this.Total_Rows - this.Student_Data_Search.length - this.Page_Length_;
    // this.Search_Student_Report();
}
}  





Save_Student_Report_FollowUp()
 {
     
   


var Student_Deatils=[];

    for (var m = 0; m < this.Student_Data_Search.length; m++)
    {
        if (Boolean(this.Student_Data_Search[m].Check_Box_View) == true)
        {
            //this.Student_Selection_Data_Temp.push(this.Student_Data[m]);
            Student_Deatils.push({'Student_Id':this.Student_Data_Search[m].Student_Id} )
        }
    }

  
    if(this.Followup_Users_==null||this.Followup_Users_.Users_Id==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter User', Type: "3" } });
        return;
    }
   
    if(this.FollowUp_.Next_FollowUp_Date==undefined){
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Choose Date', Type: "3" } });
        return;
    }
     if(Student_Deatils.length==0)
     {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Please Select Student',Type:"2"}});
       return;
    }
{
     

this.Student_.Next_FollowUp_Date= this.New_Date(new Date(moment(this.FollowUp_.Next_FollowUp_Date).format('YYYY-MM-DD')));
this.Student_.User_Id= this.Followup_Users_.Users_Id;
this.Student_.By_User_Id= parseInt(this.Login_User)
 


   

document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
 

this.Student_Service_.Save_Student_Report_FollowUp(this.Student_).subscribe(Save_status => {
        this.issLoading=false;
              
   
   //log(Save_status[0][0])
if(Number(Save_status[0][0].Student_Id_)>0)
{
   
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
       
   
        this.Close_Click();
document.getElementById('Save_Button').hidden=false;
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

Close_Click()
{
    this.Show_FollowUp=false;
    this.main_View=true
    this.Report_View=false
    this.Select_Student=false;
    this.View_Graph=false
    this.Select_View=false;
    this.Followup_Users_=null
    this.Remarks_=null;
    this.Student_.Next_FollowUp_Date=null
    
    
}
Graph_Load(){  
    this.View_Graph=true
   this.Summary_Sub=false
    
}

Edit_Student_Notification(Student_Id, i) {
    
    localStorage.setItem('Student_Id', Student_Id);
    console.log(Student_Id)
    this.Edit_Page_Permission = Get_Page_Permission(5);
    if (this.Edit_Page_Permission == undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }
    else if (this.Edit_Page_Permission.View == true)
       // this.router.navigateByUrl('/Stu');
      // window.open('/Student')
      this.goToLink();
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




  Load_Dropdowns() {
    debugger
    this.Student_Service_.Get_Load_Dropdowns_Data().subscribe(
    (Rows) => {
      
    
    
    
   
    // this.Client_Accounts_Data = Rows[7].slice();
    // this.Client_Accounts_Temp.Client_Accounts_Id = 0;
    // this.Client_Accounts_Temp.Client_Accounts_Name = "Select";
    // this.Client_Accounts_Data.unshift(Object.assign({},this.Client_Accounts_Temp));
    // this.Client_Accounts_ = this.Client_Accounts_Data[0];
    
    
    
    debugger
    // this.Currency_Data = Rows[11].slice();
    // this.Currency_Temp.Currency_Id = 0;
    // this.Currency_Temp.Currency_Name = "Select";
    // this.Currency_Data.unshift(Object.assign({}, this.Currency_Temp));
    // this.Currency_ = this.Currency_Data[0];
    
    this.To_Account_Data = Rows[12].slice();
    this.To_Account_Temp.Client_Accounts_Id = 0;
    this.To_Account_Temp.Client_Accounts_Name = "Select";
    this.To_Account_Data.unshift(Object.assign({}, this.To_Account_Temp));
    this.To_Account_ = this.To_Account_Data[0];
    
    this.Fees_Array = Rows[13];
    this.Fees_Temp.Fees_Id = 0;
    this.Fees_Temp.Fees_Name = "Select";
    this.Fees_Array.unshift(this.Fees_Temp);
    this.Fees_Data_ = this.Fees_Array[0];
    
    this.Collected_By_Data = Rows[15].slice();
    this.Collected_By_Temp.Users_Id = 0;
    this.Collected_By_Temp.Users_Name = "Select";
    this.Collected_By_Data.unshift(Object.assign({}, this.Collected_By_Temp));
    this.Collected_By_ = this.Collected_By_Data[0];
    

    },
    (Rows) => {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
    panelClass: "Dialogbox-Class",
    data: { Message: "Error Occured", Type: "2" },
    });
    }
    );
    }

}
