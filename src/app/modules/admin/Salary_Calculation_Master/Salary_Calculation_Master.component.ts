import { Component, OnInit,Input,Injectable }from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge }from 'rxjs';
import { Master_Call_Service }from '../../../services/Master_Call.Service';
import { Salary_Calculation_Master_Service }from '../../../services/Salary_Calculation_Master.Service';
import { DialogBox_Component }from '../DialogBox/DialogBox.component';
import { General_Settings }from '../../../models/General_Settings';
import { Store }from '../../../models/Store';
import { Salary_Calculation_Master }from '../../../models/Salary_Calculation_Master';
import { Salary_Calculation_Details }from '../../../models/Salary_Calculation_Details';
import { WPS_Salary_Calculation_Details }from '../../../models/WPS_Salary_Calculation_Details';
import * as XLSX from 'ts-xlsx';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig}from '@angular/material';
import { ROUTES,Get_Page_Permission }from '../../../components/sidebar/sidebar.component';
import { MomentDateAdapter}from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE}from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment}from 'moment';
import { Batch_Service } from 'app/services/Batch.service';
import { sum } from 'chartist';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: { dateInput: 'DD/MM/YYYY',    },
display:
{
dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
},
}; 
@Component({
selector: 'app-Salary_Calculation_Master',
templateUrl: './Salary_Calculation_Master.component.html',
animations: [
trigger('listAnimation', [
transition('* => *', [ 
query(':enter', [
style({ opacity: 0 }),
stagger(100, [
animate('0.5s', style({ opacity: 1 }))
])
], { optional: true })
])
])
],
styleUrls: ['./Salary_Calculation_Master.component.css']
})
export class Salary_Calculation_MasterComponent implements OnInit {

myInnerHeight: number;
myTotalHeight: number;
myHeight: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading:boolean;
Permissions:any;
Salary_Calculation_Master_Edit:string;
Salary_Calculation_Master_Save: string;
Salary_Calculation_Master_Delete: string;
Entry_View:boolean=false;
EditIndex: number;
AdminLogin_Id: string;
Call_Status:boolean=false;
year: any;
month: any;
day: any;
date: any;
User_Type: number;

ImageFile:any
Display_File_Name_:string
file:File;
arrayBuffer:any;

General_Settings_:General_Settings=new General_Settings;
General_Settings_Data:General_Settings[];

Salary_Calculation_Master_:Salary_Calculation_Master=new Salary_Calculation_Master;
Salary_Calculation_Master_Temp:Salary_Calculation_Master=new Salary_Calculation_Master;
Salary_Calculation_Master_Data:Salary_Calculation_Master[];

Salary_Calculation_Details_:Salary_Calculation_Details=new Salary_Calculation_Details;
Salary_Calculation_Details_Temp:Salary_Calculation_Details=new Salary_Calculation_Details;
Salary_Calculation_Details_Data:Salary_Calculation_Details[];
Salary_Calculation_Details_Print:Salary_Calculation_Details[];
WPS_Salary_Calculation_Details_Data:WPS_Salary_Calculation_Details[];

Store_Type_Data:Store[];
Store_Type_Data_Filter:Store[];
Search_Store_:Store=new Store();
Store_:Store=new Store();
Store_Temp:Store=new Store();

Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();
Wps_FromDate: Date = new Date();
Wps_ToDate: Date = new Date();
Is_Date_Check:boolean=true;
Calculation_No_Search:string;
Print_Button:boolean=false;
myinnerWidth:number;
myInnerwidth_1:number;
spinleft:number;
array:any;
firstDay: Date;
lastDay: Date;
constructor(public Batch_Service_:Batch_Service,public Salary_Calculation_Master_Service_ :Salary_Calculation_Master_Service , public Master_Call_Service_:Master_Call_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
// ngOnInit() 
// {
// this.Salary_Calculation_Master_Data=[];
// this.Salary_Calculation_Details_Data=[];
// this.AdminLogin_Id=localStorage.getItem('Login_User');
// this.User_Type=Number(localStorage.getItem('User_Type'));
// this.Permissions = Get_Page_Permission(41);
// if(this.Permissions==undefined || this.Permissions==null)
// {
// localStorage.removeItem('token');
// this.router.navigateByUrl('/auth/login');
// }
// else
// {
// this.Salary_Calculation_Master_Edit = this.Permissions.Edit;
// this.Salary_Calculation_Master_Save = this.Permissions.Save; 
// this.Salary_Calculation_Master_Delete = this.Permissions.Delete; 
// this.Master_Call_Service_.Get_Menu_Status(this.AdminLogin_Id, 41).subscribe(Rows => {
// if (Rows[0][0].Menu_Status == 0)
// {
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Page Not Avilable',Type:'2'}});
// this.router.navigateByUrl('Home_Page');
// }
// else 
// {
// this.Page_Load()
// }
// this.issLoading = false;
// },
// Rows => {
// this.issLoading = false; 
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:'2'}});
// });
// }
// }

ngOnInit() 
{
    this.Salary_Calculation_Master_Data=[];
    this.Salary_Calculation_Details_Data=[];
    this.AdminLogin_Id=localStorage.getItem(("Login_User"));
    this.User_Type=Number(localStorage.getItem('User_Type'));

    {

    this.Page_Load()
    }
}


Page_Load()
{
    this.Get_Menu_Status(81,this.AdminLogin_Id);
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight = this.myInnerHeight;

    this.myinnerWidth = (window.innerWidth/2 )-50;
    this.myTotalHeight = this.myTotalHeight - 40;
this.myInnerHeight = this.myInnerHeight -300;
    this.myInnerwidth_1 = window.innerWidth;
   this.spinleft = (this.myInnerwidth_1/2)-50;

   this.Month_date()

    this.Search_Salary_Calculation_Master();
    this.Load_General_Settings();
    this.Clr_Salary_Calculation_Master();
    this.Entry_View = false;
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
    this.Wps_FromDate=this.New_Date(this.Wps_FromDate);
    this.Wps_ToDate=this.New_Date(this.Wps_ToDate);
    this.Print_Button=false;
}


Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Batch_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
  this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==32)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==32)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }

                this.Salary_Calculation_Master_Edit = this.Permissions.Edit;
this.Salary_Calculation_Master_Save = this.Permissions.Save; 
this.Salary_Calculation_Master_Delete = this.Permissions.Delete; 
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}



Load_General_Settings()
{
    this.issLoading=true;
    this.Master_Call_Service_.Load_General_Settings().subscribe(Rows =>
    {  
        debugger
    this.General_Settings_Data=Rows[0];
    this.General_Settings_.Transportation_Percentage=this.General_Settings_Data[0].Transportation_Percentage;
    this.issLoading=false;
    },
    Rows => 
    { 
    this.issLoading=false;
    });
}
Create_New() 
{
    this.Call_Status = false; 
    this.Entry_View = true;
    this.Clr_Salary_Calculation_Master();
    this.Print_Button=false;
}
Downloadwpflist(Salary_Calculation_Master_e:Salary_Calculation_Master,index)
{
    //this.Entry_View=true
    this.Salary_Calculation_Master_=Salary_Calculation_Master_e
    this.Salary_Calculation_Master_ = Object.assign({},Salary_Calculation_Master_e);

    this.Store_Temp.Store_Id=this.Salary_Calculation_Master_.Store_Id;
    this.Store_Temp.Store_Name=this.Salary_Calculation_Master_.Store_Name;
    this.Store_=Object.assign({},this.Store_Temp);

    this.issLoading=true;
    this.Salary_Calculation_Master_Service_.Get_WPS_Salary_Calculation_Master(this.Salary_Calculation_Master_.Salary_Calculation_Master_Id).subscribe(Rows =>
    {
        debugger
    //this.WPS_Salary_Calculation_Details_Data=Rows[0];
    this.Master_Call_Service_.exportExcel(Rows[0],'WPS_Salary')
    this.issLoading=false;
    },
    Rows => 
    { 
    this.issLoading=false;
    });
}

Downloadalllist(Salary_Calculation_Master_e:Salary_Calculation_Master,index)
{
    //this.Entry_View=true
    this.Salary_Calculation_Master_=Salary_Calculation_Master_e
    this.Salary_Calculation_Master_ = Object.assign({},Salary_Calculation_Master_e);

    this.Store_Temp.Store_Id=this.Salary_Calculation_Master_.Store_Id;
    this.Store_Temp.Store_Name=this.Salary_Calculation_Master_.Store_Name;
    this.Store_=Object.assign({},this.Store_Temp);

    this.issLoading=true;
    this.Salary_Calculation_Master_Service_.Get_Salary_Calculation_Master(this.Salary_Calculation_Master_.Salary_Calculation_Master_Id).subscribe(Rows =>
    {
    //this.WPS_Salary_Calculation_Details_Data=Rows[0];
    this.Master_Call_Service_.exportExcel(Rows[0],'Attendance_Data')
    this.issLoading=false;
    },
    Rows => 
    { 
    this.issLoading=false;
    });
}













Clr_Salary_Calculation_Master()
{
    debugger
    this.Salary_Calculation_Master_.Salary_Calculation_Master_Id=0;
    this.Salary_Calculation_Master_.Store_Id=0;
    this.Salary_Calculation_Master_.Entry_Date=this.New_Date(new Date)
    this.Salary_Calculation_Master_.Month_Year="";
    this.Salary_Calculation_Master_.Calculation_No="";
    this.Salary_Calculation_Master_.Users_Id=0;
    this.Salary_Calculation_Master_.Remark="";
    this.Salary_Calculation_Details_Data=[];
    this.Store_=null;
    this.Wps_FromDate=this.New_Date(this.firstDay);
    this.Wps_ToDate =this.New_Date(this.lastDay);

}
Close_Click()
{
    this.Call_Status = false;
    let top = document.getElementById('Topdiv'); 
    if (top !== null)
    {
    top.scrollIntoView();
    top = null;
    }
    this.Entry_View = false;
    this.Clr_Salary_Calculation_Master();
    this.Search_Salary_Calculation_Master();
    this.Print_Button=false;
}
trackByFn(index) 
{
    return index;
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
        if (Number.parseInt(this.day) <10) {
        this.day = "0" + this.day;
    }
    this.date = this.year + "-" + this.month + "-" + this.day;
    //  this.date = this.day + "-"+ this.month + "-" + this.year ;
    return this.date;
 }
Search_Store_Typeahead(event: any)
{        
    var Value = "";
    if (event.target.value == "")
    Value = "";
    else
    Value = event.target.value.toLowerCase();
    if(this.Store_Type_Data == undefined || this.Store_Type_Data.length==0)
    {    
    this.issLoading = true;        
    this.Master_Call_Service_.Search_Store_Typeahead(Value).subscribe(Rows => {
    if (Rows != null) 
    {       
    this.Store_Type_Data = Rows[0];
    this.issLoading = false;
    this.Store_Type_Data_Filter=[];
    for (var i=0;i<this.Store_Type_Data.length;i++)
    {
    if(this.Store_Type_Data[i].Store_Name.toLowerCase().includes(Value))
    this.Store_Type_Data_Filter.push(this.Store_Type_Data[i])
    }
    }        
    },
    Rows => {
    this.issLoading = false;
    });
    }
    else
    {
    this.Store_Type_Data_Filter=[];
    for (var i=0;i<this.Store_Type_Data.length;i++)
    {
    if(this.Store_Type_Data[i].Store_Name.toLowerCase().includes(Value))
    this.Store_Type_Data_Filter.push(this.Store_Type_Data[i])
    }
    }
}
display_Store(Store_e: Store) 
{  
if (Store_e) { return Store_e.Store_Name; }
}

Search_Salary_Employee()
{
    // if (this.Store_ == null || this.Store_ == undefined ) 
    // {      
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Store',Type:"3"}});
    //     return;
    // }
    // if (this.Store_.Store_Id == 0 || this.Store_.Store_Id == undefined || this.Store_.Store_Id == null ) 
    // {      
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Store',Type:"3"}});
    //     return;
    // }
    var look_In_Date_Value=0,  Store_Id=0;
    if (this.Is_Date_Check == true )
    look_In_Date_Value = 1;

    // if (this.Store_!= undefined && this.Store_ != null)
    // if (this.Store_.Store_Id != undefined && this.Store_.Store_Id != null)
    Store_Id = 0;//this.Store_.Store_Id;

    this.issLoading = true;
    debugger
    this.Salary_Calculation_Master_Service_.Search_Salary_Employee(moment(this.Wps_FromDate).format('YYYY-MM-DD'), moment(this.Wps_ToDate).format('YYYY-MM-DD'),look_In_Date_Value,Store_Id).subscribe(Rows => {
    debugger
    this.Salary_Calculation_Details_Data=Rows[0];

    for (var i=0;i<this.Salary_Calculation_Details_Data.length;i++)
    {
       
       debugger
        // if(this.Salary_Calculation_Details_Data[i].Placement_Status==1)
        {

            this.Salary_Calculation_Details_Data[i].Total_Attendance =this.Salary_Calculation_Details_Data[i].Present_Days;
            this.Salary_Calculation_Details_Data[i].Total_Leaves =this.Salary_Calculation_Details_Data[i].Absent_Days;
            this.Salary_Calculation_Details_Data[i].Total_Working_Days=(Number(this.Salary_Calculation_Details_Data[i].Present_Days)+Number(this.Salary_Calculation_Details_Data[i].Absent_Days));
            // this.Salary_Calculation_Details_Data[i].Total_Working_Days=sum(this.Salary_Calculation_Details_Data[i].Present_Days,this.Salary_Calculation_Details_Data[i].Absent_Days)
            this.Salary_Calculation_Details_Data[i].Salary_Per_Day=(this.Salary_Calculation_Details_Data[i].Basic_Salary/this.Salary_Calculation_Details_Data[i].Total_Working_Days)
       
        }
        // else (this.Salary_Calculation_Details_Data[i].Placement_Status_Name = "Not Placed");
        
        
    }


    this.Calcualtion_Total_Loop(0,this.Salary_Calculation_Details_Data.length)
    if(this.Salary_Calculation_Details_Data.length==0)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:'3'}});
    }
    this.issLoading = false;
    },
    Rows => 
    {
    this.issLoading = false; 
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class',data: { Message: 'Error Occured',Type: 2} });
    });
}
Ded_Amount(i)
{
    if(this.Salary_Calculation_Details_Data[i].LOP==undefined||this.Salary_Calculation_Details_Data[i].LOP==null)
    this.Salary_Calculation_Details_Data[i].LOP=0;
    if(this.Salary_Calculation_Details_Data[i].Salary_Per_Day==undefined||this.Salary_Calculation_Details_Data[i].Salary_Per_Day==null)
    this.Salary_Calculation_Details_Data[i].Salary_Per_Day=0;
    this.Salary_Calculation_Details_Data[i].Leave_Amount=Number(this.Salary_Calculation_Details_Data[i].LOP)*Number(this.Salary_Calculation_Details_Data[i].Salary_Per_Day)
    this.Salary_Calculation_Details_Data[i].Leave_Amount=Number(this.Salary_Calculation_Details_Data[i].Leave_Amount.toFixed(2))
}
Calcualtion_Total_Loop(j,k)
{
    for(var i=j;i<k;i++)
    {
    if(this.Salary_Calculation_Details_Data[i].Basic_Salary==undefined||this.Salary_Calculation_Details_Data[i].Basic_Salary==null)
    this.Salary_Calculation_Details_Data[i].Basic_Salary=0;
    if(this.Salary_Calculation_Details_Data[i].Leave_Amount==undefined||this.Salary_Calculation_Details_Data[i].Leave_Amount==null)
    this.Salary_Calculation_Details_Data[i].Leave_Amount=0;
    if(this.Salary_Calculation_Details_Data[i].Excess_Deduction==undefined||this.Salary_Calculation_Details_Data[i].Excess_Deduction==null)
    this.Salary_Calculation_Details_Data[i].Excess_Deduction=0;
    if(this.Salary_Calculation_Details_Data[i].Advance_Amount==undefined||this.Salary_Calculation_Details_Data[i].Advance_Amount==null)
    this.Salary_Calculation_Details_Data[i].Advance_Amount=0;
    if(this.Salary_Calculation_Details_Data[i].Loan_Amount==undefined||this.Salary_Calculation_Details_Data[i].Loan_Amount==null)
    this.Salary_Calculation_Details_Data[i].Loan_Amount=0;
    if(this.Salary_Calculation_Details_Data[i].ESI_Amount==undefined||this.Salary_Calculation_Details_Data[i].ESI_Amount==null)
    this.Salary_Calculation_Details_Data[i].ESI_Amount=0;

    if(this.Salary_Calculation_Details_Data[i].ESI_Percentage==undefined||this.Salary_Calculation_Details_Data[i].ESI_Percentage==null)
    this.Salary_Calculation_Details_Data[i].ESI_Percentage=0;
debugger
    if(this.Salary_Calculation_Details_Data[i].PF_Percentage==undefined||this.Salary_Calculation_Details_Data[i].PF_Percentage==null)
    this.Salary_Calculation_Details_Data[i].PF_Percentage=0;

    if(this.Salary_Calculation_Details_Data[i].PF_Amount==undefined||this.Salary_Calculation_Details_Data[i].PF_Amount==null)
    this.Salary_Calculation_Details_Data[i].PF_Amount=0;
    if(this.Salary_Calculation_Details_Data[i].Mediclaim==undefined||this.Salary_Calculation_Details_Data[i].Mediclaim==null)
    this.Salary_Calculation_Details_Data[i].Mediclaim=0;
    this.Salary_Calculation_Details_Data[i].Total_Amount=Number(this.Salary_Calculation_Details_Data[i].Basic_Salary)-Number(this.Salary_Calculation_Details_Data[i].Leave_Amount)-
    Number(this.Salary_Calculation_Details_Data[i].Excess_Deduction)-Number(this.Salary_Calculation_Details_Data[i].Advance_Amount)-
    Number(this.Salary_Calculation_Details_Data[i].Loan_Amount)-Number(this.Salary_Calculation_Details_Data[i].ESI_Amount)-
    Number(this.Salary_Calculation_Details_Data[i].PF_Amount)-Number(this.Salary_Calculation_Details_Data[i].Mediclaim)
    this.Salary_Calculation_Details_Data[i].Total_Amount=Number(this.Salary_Calculation_Details_Data[i].Total_Amount.toFixed(2))
    }
}
Calcualtion_Total(i)
{
    this.Calcualtion_Total_Loop(i,i+1)
}
Save_Salary_Calculation_Master()
{    
    if (this.Salary_Calculation_Details_Data== undefined || this.Salary_Calculation_Details_Data == null || this.Salary_Calculation_Details_Data== undefined ) 
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No Data Found', Type: "3" } });
    return;
    }
    if (this.Call_Status == true)
    return;
    else
    this.Call_Status = true;
    this.issLoading = true;
    
    this.Salary_Calculation_Master_.Store_Id=0;//this.Store_.Store_Id;
    this.Salary_Calculation_Master_.Users_Id=Number(this.AdminLogin_Id)
    this.Salary_Calculation_Master_.Salary_Calculation_Details=this.Salary_Calculation_Details_Data;
    this.Salary_Calculation_Master_.Entry_Date=this.New_Date(new Date(moment(this.Salary_Calculation_Master_.Entry_Date).format('YYYY-MM-DD')));
debugger
    this.Salary_Calculation_Master_Service_.Save_Salary_Calculation_Master(this.Salary_Calculation_Master_).subscribe(Save_status => {
        debugger

    if(Number(Save_status[0].Salary_Calculation_Master_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:false}});
    this.Call_Status = false;
    this.Close_Click();
    }
    else
    {
    this.Call_Status = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{ Message: 'Error Occured',Type:2} });
    }
    this.issLoading = false;
    },
    Rows => 
    { 
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{ Message: 'Error Occured',Type:2} });
    this.Call_Status = false;
    });
}
Search_Salary_Calculation_Master()
{
    var look_In_Date_Value=0, Store_Id = 0;
    if (this.Is_Date_Check == true)
    look_In_Date_Value = 1;

    if (this.Search_Store_!= undefined && this.Search_Store_ != null)
    if (this.Search_Store_.Store_Id != undefined && this.Search_Store_.Store_Id != null)
    Store_Id = this.Search_Store_.Store_Id;

    this.issLoading = true;
    debugger
    this.Salary_Calculation_Master_Service_.Search_Salary_Calculation_Master(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),look_In_Date_Value,this.Calculation_No_Search).subscribe(Rows => {
debugger

    this.Salary_Calculation_Master_Data=Rows[0];
    if(this.Salary_Calculation_Master_Data.length==0)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:'3'}});
    }
    this.issLoading = false;
    },
    Rows => 
    {
    this.issLoading = false; 
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class',data: { Message: 'Error Occured',Type: 2} });
    });
}
Edit_Salary_Calculation_Master(Salary_Calculation_Master_e:Salary_Calculation_Master,index)
{
    this.Entry_View=true
    this.Salary_Calculation_Master_=Salary_Calculation_Master_e
    this.Salary_Calculation_Master_ = Object.assign({},Salary_Calculation_Master_e);

    this.Store_Temp.Store_Id=this.Salary_Calculation_Master_.Store_Id;
    this.Store_Temp.Store_Name=this.Salary_Calculation_Master_.Store_Name;
    this.Store_=Object.assign({},this.Store_Temp);

    this.Print_Button=true;

    this.issLoading=true;
    this.Salary_Calculation_Master_Service_.Get_Salary_Calculation_Master(this.Salary_Calculation_Master_.Salary_Calculation_Master_Id).subscribe(Rows =>
    {
        debugger
    this.Salary_Calculation_Details_Data=Rows[0];

    for (var i=0;i<this.Salary_Calculation_Details_Data.length;i++)
    {
       
        this.Salary_Calculation_Details_Data[i].Present_Days =this.Salary_Calculation_Details_Data[i].Total_Attendance;
        this.Salary_Calculation_Details_Data[i].Absent_Days =this.Salary_Calculation_Details_Data[i].Total_Leaves;


        
        
    }


    this.issLoading=false;
    },
    Rows => 
    { 
    this.issLoading=false;
    });
}

Print_Click(Salary_Calculation_Details_:Salary_Calculation_Details,i)
{   
    this.Salary_Calculation_Details_= Salary_Calculation_Details_;
    this.Print();
}
Print()
{
    setTimeout(function() {
        let popupWinindow
        let innerContents = document.getElementById("Slip_Div").innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();   
      }, 1000);   
}
Get_Salary_Print_Details(Salary_Calculation_Details_Id)
{  
    this.issLoading=true;
    this.Salary_Calculation_Master_Service_.Get_Salary_Print_Details(Salary_Calculation_Details_Id).subscribe(Rows =>
    {
    this.Salary_Calculation_Details_Print=Rows[0];
    if( this.Salary_Calculation_Details_Print.length>0)
    {
        this.Salary_Calculation_Details_=this.Salary_Calculation_Details_Print[0]
    }
    this.issLoading=false;
    },
    Rows => 
    { 
    this.issLoading=false;
    });
}
Delete_Salary_Calculation_Master(Salary_Calculation_Master_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading = true;
    this.Salary_Calculation_Master_Service_.Delete_Salary_Calculation_Master(Salary_Calculation_Master_Id).subscribe(Delete_status => {
        debugger
    Delete_status = Delete_status[0];
    Delete_status = Delete_status[0].DeleteStatus_;
    if(Delete_status==1)
    {
    this.Salary_Calculation_Master_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open(DialogBox_Component,{panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:false}});
    this.Search_Salary_Calculation_Master();
    }
    else
    {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:2}});
    }
    this.issLoading = false;
    },
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class',data: { Message: 'Error Occured',Type: 2}});
    });
    }
    });
    }


    Month_date(){

        debugger
        var date = new Date(), year = date.getFullYear(), month = date.getMonth();
        this.firstDay = new Date(year, month, 1);
        this.lastDay = new Date(year, month + 1, 0);
           
     }
}

