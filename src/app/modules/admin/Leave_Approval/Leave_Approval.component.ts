import { Component, OnInit,Input,Injectable }from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge }from 'rxjs';
import { Leave_Request_Service }from '../../../services/Leave_Request.service';
import { Master_Call_Service }from '../../../services/Master_Call.service';
import{Store} from '../../../models/Store';
import { Leave_Request_Status } from '../../../models/Leave_Request_Status';
import { DialogBox_Component }from '../DialogBox/DialogBox.component';
import { Leave_Request }from '../../../models/Leave_Request';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig}from '@angular/material';
import { ROUTES,Get_Page_Permission }from '../../../components/sidebar/sidebar.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { MomentDateAdapter}from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE}from '@angular/material/core';
import { Leave_Type} from '../../../models/Leave_Type'
import {Leave_Mode} from '../../../models/Leave_Mode'
import * as _moment from 'moment';
import { default as _rollupMoment}from 'moment';
import { Batch_Service } from 'app/services/Batch.service';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: { dateInput: 'DD/MM/YYYY',    },
display:
{
dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
},
}; 
@Component({
selector: 'app-Leave_Approval',
templateUrl: './Leave_Approval.component.html',
styleUrls: ['./Leave_Approval.component.css'],
animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        // query(':leave', [
        //   stagger(100, [
        //     animate('0.5s', style({ opacity: 0 }))
        //   ])
        // ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Leave_ApprovalComponent implements OnInit {
 Leave_Request_Data:Leave_Request[]
Leave_Request_:Leave_Request= new Leave_Request();
Leave_Request_Name_Search:string;
myInnerHeight: number;
myTotalHeight: number;
myHeight: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading:boolean;
Permissions:any;
spinleft:number;
myInnerwidth_1:number;
Leave_Request_Edit:string;
Leave_Request_Save: string;
Leave_Request_Delete: string;
Entry_View:boolean=false;
editview:boolean=false;
EditIndex: number;
Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();
AdminLogin_Id: string;
Call_Status:boolean=false;
Search_Name:string;
Store_Data:Store[];
Store_:Store=new Store();
Store_Temp:Store=new Store();
Store_Type_Data:Store[];
Store_Type_Data_Filter:Store[];
Search_Store_:Store=new Store();
Search_Status_:Leave_Request_Status=new Leave_Request_Status();
Leave_Request_Status_Data:Leave_Request_Status[];
Leave_Request_Status_:Leave_Request_Status=new Leave_Request_Status();
Leave_Request_Status_Temp:Leave_Request_Status=new Leave_Request_Status();
year: any;
month: any;
day: any;
date: any;
User_Type: number;
Leave_Type_: Leave_Type = new Leave_Type;
Leave_Type_Temp: Leave_Type = new Leave_Type;
Leave_Type_Data: Leave_Type[]

Leave_Mode_: Leave_Mode = new Leave_Mode;
Leave_Mode_Temp: Leave_Mode = new Leave_Mode;
Leave_Mode_Data: Leave_Mode[]

Is_Date_Check:boolean=true;
array:any;
constructor(public Batch_Service_:Batch_Service,public Leave_Request_Service_:Leave_Request_Service,public Master_Call_Service_:Master_Call_Service, private router: Router,public dialogBox: MatDialog) { }
// ngOnInit() 
// { 
//     debugger
//     this.Leave_Request_Data = []
//     this.AdminLogin_Id=localStorage.getItem('Login_User');
//     this.User_Type=Number(localStorage.getItem('User_Type'));
//     this.Permissions = Get_Page_Permission(11);
//     if(this.Permissions==undefined || this.Permissions==null)
//     {
//         localStorage.removeItem('token');
//         this.router.navigateByUrl('/auth/login');
//     }
//     else
//     {
//         this.Leave_Request_Edit = this.Permissions.Edit;
//         this.Leave_Request_Save = this.Permissions.Save; 
//         this.Leave_Request_Delete = this.Permissions.Delete; 
//         this.Master_Call_Service_.Get_Menu_Status(this.AdminLogin_Id, 79).subscribe(Rows => {
//         if (Rows[0][0].Menu_Status == 0)
//         {
//             const dialogRef = this.dialogBox.open
//             ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Page Not Avilable',Type:'2'}});
//             this.router.navigateByUrl('Home_Page');
//         }
//         else {
//             this.Page_Load()
//         }
//         this.issLoading = false;
//     },
//     Rows => {
//     this.issLoading = false; 
//     const dialogRef = this.dialogBox.open
//     ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:'2'}});
//     });
//     }     
// }


ngOnInit() 
{
    this.Leave_Request_Data = []
    this.AdminLogin_Id=localStorage.getItem(("Login_User"));
    this.User_Type=Number(localStorage.getItem('User_Type'));
    
    // this.Permissions = Get_Page_Permission(32);
    // if(this.Permissions==undefined || this.Permissions==null)
    // {
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('/auth/login');
    // }
    // else
    {
    // this.Batch_Edit=this.Permissions.Edit;
    // this.Batch_Save=this.Permissions.Save;
    // this.Batch_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}


datediff()
{  
 
try
{
const date2 = new Date(this.Leave_Request_.From_Date);
const date1 = new Date(this.Leave_Request_.To_Date);
 
var diffTime =  Math.floor((Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) - Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) ) /(1000 * 60 * 60 * 24));
//const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

this.Leave_Request_.Noof_Leaves=diffTime+1;
if (this.Leave_Mode_.Leave_Mode_Id==4 || this.Leave_Mode_.Leave_Mode_Id==3)
    this.Leave_Request_.Noof_Leaves=this.Leave_Request_.Noof_Leaves/2

//alert(diffTime)
}
catch(e){}
}

Page_Load()
{   
    debugger
    this.Get_Menu_Status(79,this.AdminLogin_Id);
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight = this.myInnerHeight;
    this.myTotalHeight = this.myTotalHeight - 40;
    this.myInnerHeight = this.myInnerHeight -290;
    this.spinleft = (this.myInnerwidth_1/2)-50;
    this.myInnerwidth_1 = window.innerWidth;
    this.spinleft = (this.myInnerwidth_1/2)-50;
    this.Clr_Leave_Request();
   
    this.Load_Dropdowns() ;
    this.Load_Leave_Type_Dropdown();
    this.Load_Leave_Mode_Dropdown();
    this.Entry_View = false;

    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
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

                this.Leave_Request_Edit = this.Permissions.Edit;
                this.Leave_Request_Save = this.Permissions.Save; 
                this.Leave_Request_Delete = this.Permissions.Delete;
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}





Create_New() 
{
    this.Call_Status = false; 
    this.Entry_View = true;
    this.editview = true;
   // this.Clr_Leave_Request();
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
    this.Search_Leave_Request_Admin()
}
trackByFn(index, item) 
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
 Load_Leave_Type_Dropdown()
{
    
    this.issLoading = true;
    this.Master_Call_Service_.Load_Leave_Type_Dropdown().subscribe(Rows => {
    
        if (Rows != null) {
            this.Leave_Type_Data = Rows[0];
            this.Leave_Type_Temp.Leave_Type_Id = 0;
            this.Leave_Type_Temp.Leave_Type_Name = "Select";
            this.Leave_Type_Data.unshift(this.Leave_Type_Temp);
            
            this.Leave_Type_ = this.Leave_Type_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
        
            this.issLoading = false;
        });
}
Load_Leave_Mode_Dropdown()
{
    debugger
    this.issLoading = true;
    this.Master_Call_Service_.Load_Leave_Mode_Dropdown().subscribe(Rows => {
    debugger
        if (Rows != null) {
            this.Leave_Mode_Data = Rows[0];
            this.Leave_Mode_Temp.Leave_Mode_Id = 0;
            this.Leave_Mode_Temp.Leave_Mode_Name = "Select";
            this.Leave_Mode_Data.unshift(this.Leave_Mode_Temp);
            
            this.Leave_Mode_ = this.Leave_Mode_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
        
            this.issLoading = false;
        });
}
Load_Dropdowns() 
{    
    debugger
    this.issLoading = true;   
    this.Master_Call_Service_.Load_Leave_Request_Status_Dropdown().subscribe(Rows => {   
        debugger
        this.Leave_Request_Status_Data = Rows[0];
        this.Leave_Request_Status_Temp.Leave_Request_Status_Id=0;
        this.Leave_Request_Status_Temp.Leave_Request_Status_Name="All";
        this.Leave_Request_Status_Data.unshift(this.Leave_Request_Status_Temp);
        this.Leave_Request_Status_ = this.Leave_Request_Status_Data[0];  
        this.Search_Status_ = this.Leave_Request_Status_Data[1]; 
        this.issLoading = false;
        this.Search_Leave_Request_Admin();
        },
        Rows => 
        {
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}

Clr_Leave_Request()
 {
    this.Leave_Request_.Leave_Request_Id=0;
    this.Leave_Request_.Client_Accounts_Id=0;
    this.Leave_Request_.From_Date=new Date;
     this.Leave_Request_.From_Date=this.New_Date(this.Leave_Request_.From_Date);
     this.Leave_Request_.To_Date=new Date;
     this.Leave_Request_.To_Date=this.New_Date(this.Leave_Request_.To_Date);
    this.Leave_Request_.Leave_Type_Id=0;
    this.Leave_Request_.Reasonfor="";
    this.Leave_Request_.Noof_Leaves=0;
    this.Leave_Request_.Balance_PL=0;
    this.Leave_Request_.Balance_CL=0;
    this.Leave_Request_.Approved_Date=new Date;
     this.Leave_Request_.Approved_Date=this.New_Date(this.Leave_Request_.Approved_Date);
     this.Leave_Request_.Entry_Date=new Date;
     this.Leave_Request_.Entry_Date=this.New_Date(this.Leave_Request_.Entry_Date);
     this.Leave_Request_.Approved_Date=this.New_Date(new Date);
    this.Leave_Request_.Leave_Request_Status_Id=0;
    this.Leave_Request_.Approved_by=0;
    this.Leave_Request_.Description="";
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
display_Store(Store_e: Store) {
   
    if (Store_e) { return Store_e.Store_Name; }
}
Search_Leave_Request_Admin()
{

    var Store_Id=0, look_In_Date_Value=0, Status_Id=0;   
    if (this.Is_Date_Check == true )
        look_In_Date_Value = 1;
    this.issLoading = true;  
    
    if (this.Search_Status_!= undefined && this.Search_Status_ != null)
    if (this.Search_Status_.Leave_Request_Status_Id != undefined && this.Search_Status_.Leave_Request_Status_Id != null)
    Status_Id = this.Search_Status_.Leave_Request_Status_Id;

    if (this.Search_Store_!= undefined && this.Search_Store_ != null)
        if (this.Search_Store_.Store_Id != undefined && this.Search_Store_.Store_Id != null)
            Store_Id = this.Search_Store_.Store_Id;
debugger
        
    this.Leave_Request_Service_.Search_Leave_Request_Admin(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),this.Search_Name,look_In_Date_Value,Store_Id,Status_Id).subscribe(Rows => {
        debugger
        
        this.Leave_Request_Data=Rows[0];
    if(this.Leave_Request_Data.length==0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:'3'}});
        }
        this.issLoading = false;
        },
        Rows => 
        {
            this.issLoading = false; 
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class',data: { Message: 'Error Occured',Type: 2} });
        }
        );
}
Delete_Leave_Request(Leave_Request_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
        if(result=='Yes')
        {
            this.issLoading = true;
            this.Leave_Request_Service_.Delete_Leave_Request(Leave_Request_Id).subscribe(Delete_status => {
            Delete_status = Delete_status[0];
            Delete_status = Delete_status[0].DeleteStatus_;
            if(Delete_status==1){
            this.Leave_Request_Data.splice(index, 1);
            const dialogRef = this.dialogBox.open(DialogBox_Component,{panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:false}});
            this.Search_Leave_Request_Admin();
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

Save_Leave_Request_Admin()
{
    if(  this.Leave_Request_Status_.Leave_Request_Status_Id == undefined || this.Leave_Request_Status_.Leave_Request_Status_Id == 0 )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Status', Type: "3" } });
        return;
    }
     if (this.Call_Status == true)
        return;
    else
        this.Call_Status = true;
        this.issLoading = true;
        
        this.Leave_Request_.Approved_by= Number(this.AdminLogin_Id);
        this.Leave_Request_.Leave_Request_Status_Id=this.Leave_Request_Status_.Leave_Request_Status_Id;
        this.Leave_Request_.Leave_Type_Id=this.Leave_Type_.Leave_Type_Id;
        this.Leave_Request_.Leave_Mode_Id=this.Leave_Mode_.Leave_Mode_Id;
        this.Leave_Request_.Entry_Date = this.New_Date(new Date(moment(this.Leave_Request_.Entry_Date).format('YYYY-MM-DD')));
        this.Leave_Request_.From_Date = this.New_Date(new Date(moment(this.Leave_Request_.From_Date).format('YYYY-MM-DD')));
        this.Leave_Request_.To_Date = this.New_Date(new Date(moment(this.Leave_Request_.To_Date).format('YYYY-MM-DD')));
        this.Leave_Request_.Approved_Date = this.New_Date(new Date(moment(this.Leave_Request_.Approved_Date).format('YYYY-MM-DD')));
        debugger
        this.Leave_Request_Service_.Save_Leave_Request_Admin(this.Leave_Request_).subscribe(Save_status => {
            debugger
        
    if(Number(Save_status[0][0].Leave_Request_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:false}});
        this.Call_Status = false;
        this.Close_Click();
    }
    else
    {
        this.Call_Status = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:'2'}});
    }
    this.issLoading = false;
    },
    Rows => 
    { 
        this.issLoading = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:'2'}});
        this.Call_Status = false;
    });
}
Edit_Leave_Request(Leave_Request_e:Leave_Request,index)
{
    this.Leave_Request_=Leave_Request_e;
    
 if(this.Leave_Request_.Approved_by==null || this.Leave_Request_.Approved_by==undefined)
    {
        this.Leave_Request_.Approved_Date= new Date();
        this.Leave_Request_.Approved_Date=this.New_Date(this.Leave_Request_.Approved_Date);
    }
  
    this.Master_Call_Service_.Get_Leave_Count(this.Leave_Request_.Client_Accounts_Id)
    .subscribe(Rows => {    
        debugger
        this.Leave_Request_.Balance_CL=Rows[0][0].Balance_CL;
        this.Leave_Request_.Balance_PL=Rows[0][0].Balance_PL;
     });

    this.Entry_View=true;
   
    this.Leave_Request_ = Object.assign({},Leave_Request_e);
    
    this.Leave_Request_.Entry_Date = this.New_Date(new Date(moment(this.Leave_Request_.Entry_Date).format('YYYY-MM-DD')));
    this.Leave_Request_.From_Date = this.New_Date(new Date(moment(this.Leave_Request_.From_Date).format('YYYY-MM-DD')));
    this.Leave_Request_.To_Date = this.New_Date(new Date(moment(this.Leave_Request_.To_Date).format('YYYY-MM-DD')));
    
// this.Store_Temp.Store_Id=this.Leave_Request_.Store_Id
// this.Store_Temp.Store_Name=this.Leave_Request_.Store_Name
// this.Search_Store_=this.Store_Temp;
    
    for (var i = 0; i < this.Leave_Request_Status_Data.length; i++) {
        if (this.Leave_Request_.Leave_Request_Status_Id == this.Leave_Request_Status_Data[i].Leave_Request_Status_Id)
        this.Leave_Request_Status_=this.Leave_Request_Status_Data[i];
    }
    
    for (var i = 0; i < this.Leave_Type_Data.length; i++) {
        if (this.Leave_Request_.Leave_Type_Id == this.Leave_Type_Data[i].Leave_Type_Id)
        this.Leave_Type_=this.Leave_Type_Data[i];
    }
    for (var i = 0; i < this.Leave_Mode_Data.length; i++) {
        if (this.Leave_Request_.Leave_Mode_Id == this.Leave_Mode_Data[i].Leave_Mode_Id)
        this.Leave_Mode_=this.Leave_Mode_Data[i];
    }
}
}