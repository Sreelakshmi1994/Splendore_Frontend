import { Component, OnInit,Input,Injectable }from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge }from 'rxjs';
import { Leave_Request_Service }from '../../../services/Leave_Request.service';
import { Master_Call_Service }from '../../../services/Master_Call.service';
import { DialogBox_Component }from '../DialogBox/DialogBox.component';
import { Leave_Request }from '../../../models/Leave_Request';
import { Leave_Type }from '../../../models/Leave_Type';
import { Leave_Count }from '../../../models/Leave_Count';
import { Leave_Mode }from '../../../models/Leave_Mode';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig, MatDatepickerInputEvent}from '@angular/material';
import { ROUTES,Get_Page_Permission }from '../../../components/sidebar/sidebar.component';
import { MomentDateAdapter}from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE}from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment}from 'moment';
import { Leave_Details } from '../../../models/Leave_Details';
import { Batch_Service } from 'app/services/Batch.service';
import { Leave_Request_Status } from 'app/models/Leave_Request_Status';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
parse: { dateInput: 'DD/MM/YYYY',    },
display:
{
dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
},
}; 
@Component({
selector: 'app-Leave_Request',
templateUrl: './Leave_Request.component.html',
styleUrls: ['./Leave_Request.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Leave_RequestComponent implements OnInit {
Leave_Request_Data:Leave_Request[]
Leave_Data:Leave_Details[];
Leave_ : Leave_Details = new Leave_Details();
Leave_Request_:Leave_Request= new Leave_Request();
Leave_Request_Name_Search:string;

Leave_Type_: Leave_Type = new Leave_Type;
Leave_Type_Temp: Leave_Type = new Leave_Type;
Leave_Type_Data: Leave_Type[]

Flag_Leave_Type: number = 0;

// Leave_Mode_Data:Leave_Mode[]
// Leave_Mode_:Leave_Mode= new Leave_Mode();

Leave_Mode_: Leave_Mode = new Leave_Mode;
Leave_Mode_Temp: Leave_Mode = new Leave_Mode;
Leave_Mode_Data: Leave_Mode[]


Leave_Request_Status_Data:Leave_Request_Status[];
Leave_Request_Status_:Leave_Request_Status=new Leave_Request_Status();
Leave_Request_Status_Temp:Leave_Request_Status=new Leave_Request_Status();

myInnerHeight: number;
myTotalHeight: number;
myInnerWidth:number;
myfinallabelwidth:number;
myHeight: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading:boolean;
Permissions:any;
Leave_Request_Edit:boolean;
Leave_Request_Save: boolean;
Leave_Request_Delete: boolean;
Entry_View:boolean=false;
Card_View:boolean=false;
EditIndex: number;
Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();
AppLogin_User_Id: string;
Call_Status:boolean=false;
year: any;
month: any;
day: any;
date: any;
date2:any;
date1:any;
User_Type: number;
spinleft:number;
myInnerwidth_1:number;
throttle = 300;
scrollDistance = 1;
scrollUpDistance = 2;
Leave_Count_:Leave_Count= new Leave_Count();
Leave_Count_data_temp:Leave_Count []
BalanceCL:number;
BalancePL:number;
BalanceMedical:number;

Client_Accounts_Id: string;

BalanceLop:number;
events: string[] = [];
array:any;
constructor(public Batch_Service_:Batch_Service,public Leave_Request_Service_:Leave_Request_Service,public Master_Call_Service_:Master_Call_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    debugger
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight = this.myInnerHeight;
    this.myTotalHeight = this.myTotalHeight - 50;
    this.myInnerHeight = this.myInnerHeight - 150;
    this.myInnerwidth_1= (window.innerWidth)
    this.myInnerWidth = (window.innerWidth)/2-(42.40/2);
    this.myfinallabelwidth=this.myInnerWidth-(64);
    this.myInnerwidth_1= (window.innerWidth)
    this.spinleft = (this.myInnerwidth_1/2)-25;
    this.AppLogin_User_Id=localStorage.getItem('Login_User'); 
    this.Client_Accounts_Id=localStorage.getItem('Client_Accounts_Id');
    debugger
    this.Page_Load()



}

onScrollDown ()
{

}

onScrollUp ()
{

}

Page_Load()
{
    debugger
    let top = document.getElementById('Topdiv');
    if (top !== null) {
    top.scrollIntoView();
    top = null;
    }

this.Get_Menu_Status(82,this.AppLogin_User_Id);
this.Load_Dropdowns() ;
this.Clr_Leave_Request();
// this.Search_Leave_Request();
this.Load_Leave_Type_Dropdown();
this.Load_Leave_Mode_Dropdown();
debugger
this.Get_Leave_Count();

this.Entry_View = false;
this.Search_FromDate=this.New_Date(this.Search_FromDate);
this.Search_ToDate=this.New_Date(this.Search_ToDate);
// this.datediff()
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

                this.Leave_Request_Edit=this.Permissions.Edit;
        this.Leave_Request_Save=this.Permissions.Save;
        this.Leave_Request_Delete=this.Permissions.Delete;
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}


// Page_Load()
// {
   
//     this.myInnerHeight = (window.innerHeight);
//     this.myTotalHeight=this.myInnerHeight
//     this.myTotalHeight=this.myTotalHeight-50;
//     this.myInnerHeight = this.myInnerHeight -50;
  
   
//     //var test = document.getElementById("L_label1");
//     // this.mylabelwidth = (window.innerWidth)/2-(42.41/2);
  
//     this.Entry_View = false;
// }

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
        // this.Search_Status_ = this.Leave_Request_Status_Data[1]; 
        this.issLoading = false;
        // this.Search_Leave_Request_Admin();
        this.Search_Leave_Request();
        },
        Rows => 
        {
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}



Get_Leave_Count()
{
    debugger
 this.Master_Call_Service_.Get_Leave_Count(this.Client_Accounts_Id).subscribe(Rows =>
        {
            
            debugger;
            this.BalanceCL=Rows[0][0].Balance_CL;
            this.BalancePL=Rows[0][0].Balance_PL;   
                
            this.Leave_Request_.Balance_CL=   this.BalanceCL ;
            this.Leave_Request_.Balance_PL=   this.BalancePL;
            
            this.issLoading=false;
        },
        Rows => { 
            
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}})
    })
}
 
Delete_Leave_Details(Leave_Details:Leave_Details,index)
{
    
    this.Leave_Data.splice(index, 1);
    //delete  this.Leave_Data[index]
    this.Clr_Leave_Entry();
}

Create_New() 
{
this.Call_Status = false; 
this.Entry_View = false;
this.Clr_Leave_Request();

}

Apply_Leave() 
{
this.Call_Status = false; 
this.Entry_View = true;
this.Clr_Leave_Request();
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
this.Search_Leave_Request()
}
trackByFn(index, item) 
{
return index;
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
    
    this.issLoading = true;
    this.Master_Call_Service_.Load_Leave_Mode_Dropdown().subscribe(Rows => {
    
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

datediff()
{  
 
try
{
const date2 = new Date(this.Leave_Request_.From_Date);
const date1 = new Date(this.Leave_Request_.To_Date);
 
var diffTime =  Math.floor((Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) - Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) ) /(1000 * 60 * 60 * 24));
//const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
;
this.Leave_Request_.Noof_Leaves=diffTime+1;
if (this.Leave_Mode_.Leave_Mode_Id==4 || this.Leave_Mode_.Leave_Mode_Id==3)
    this.Leave_Request_.Noof_Leaves=this.Leave_Request_.Noof_Leaves/2

//alert(diffTime)
}
catch(e){}
}


addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }


New_Date(Date_)
{
    try
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
catch(e){}

 }

 New_Dates(Date_)
 {
     try
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
     this.date = this.day + "-" + this.month + "-" +  this.year;
   //  this.date = this.day + "-"+ this.month + "-" + this.year ;
     return this.date;
 }
 catch(e){}
 
  }
 

  Clr_Leave_Entry()
  {
 this.Leave_Request_.Leave_Request_Id=0;
 this.Leave_Request_.Client_Accounts_Id=0;
 this.Leave_Request_.Noof_Leaves=1;
 this.Leave_Request_.From_Date=null;
 this.Leave_Request_.To_Date=null;;
//  this.Leave_Request_.To_Date=this.New_Date(this.Leave_Request_.To_Date)
 
 // this.Leave_Type_.Leave_Type_Id=0;
 // this.Leave_Mode_.Leave_Mode_Id=0;
//  this.Leave_Request_.Reasonfor="";
 
//  this.Leave_Request_.Balance_PL=0;
//  this.Leave_Request_.Balance_CL=0;
//  this.Leave_Request_.Approved_Date="";

 this.Leave_Request_.Approved_Date=new Date;
     this.Leave_Request_.Approved_Date=this.New_Date(this.Leave_Request_.Approved_Date);

 this.Leave_Request_.Leave_Request_Status_Id=0;
 this.Leave_Request_.Approved_by=0;
  
 
 if(this.Leave_Type_Data!=null && this.Leave_Type_Data != undefined)
 this.Leave_Type_=this.Leave_Type_Data[0];
 
 if(this.Leave_Mode_Data!=null && this.Leave_Mode_Data != undefined)
 this.Leave_Mode_=this.Leave_Mode_Data[0];
 
 // if (this.Leave_Mode_Data != undefined && this.Leave_Mode_Data != null)
 // this.Leave_Mode_ = this.Leave_Mode_Data[0];
 //this.Get_Leave_Count();
 }


 Clr_Leave_Request()
 {
this.Leave_Request_.Leave_Request_Id=0;
this.Leave_Request_.Client_Accounts_Id=0;
this.Leave_Request_.Noof_Leaves=1;
this.Leave_Request_.From_Date=this.New_Date(new Date());
this.Leave_Request_.To_Date=new Date();
this.Leave_Request_.To_Date=this.New_Date(this.Leave_Request_.To_Date)

// this.Leave_Type_.Leave_Type_Id=0;
// this.Leave_Mode_.Leave_Mode_Id=0;
this.Leave_Request_.Reasonfor="";

this.Leave_Request_.Balance_PL=0;
this.Leave_Request_.Balance_CL=0;
// this.Leave_Request_.Approved_Date="";


if(this.Leave_Request_Status_Data!=null && this.Leave_Request_Status_Data != undefined)
this.Leave_Request_Status_=this.Leave_Request_Status_Data[0];

this.Leave_Request_.Leave_Request_Status_Id=0;

this.Leave_Request_.Approved_Date=new Date;
     this.Leave_Request_.Approved_Date=this.New_Date(this.Leave_Request_.Approved_Date);
this.Leave_Request_.Leave_Request_Status_Id=0;
this.Leave_Request_.Approved_by=0;
this.Leave_Request_.Description="";
this.Leave_Data=[]; 
if(this.Leave_Type_Data!=null && this.Leave_Type_Data != undefined)
this.Leave_Type_=this.Leave_Type_Data[0];

if(this.Leave_Mode_Data!=null && this.Leave_Mode_Data != undefined)
this.Leave_Mode_=this.Leave_Mode_Data[0];

// if (this.Leave_Mode_Data != undefined && this.Leave_Mode_Data != null)
// this.Leave_Mode_ = this.Leave_Mode_Data[0];
this.Get_Leave_Count();
}

// Flag_Leave_Type()
// {    
//     if(this.Flag_Leave_Type==1)
//     {
       
//     this.Leave_Request_.Leave_Type_Id=this.Leave_Type_.Leave_Type_Id;
  
//     return this.Leave_Request_;
// }
// else
// return null;
// }



Search_Leave_Request()
{
this.issLoading = true;
var Status_Id_ =0;
debugger
if(this.Leave_Request_Status_.Leave_Request_Status_Id!=0 ||this.Leave_Request_Status_.Leave_Request_Status_Id!=null||this.Leave_Request_Status_.Leave_Request_Status_Id!=undefined)
{
    Status_Id_ =this.Leave_Request_Status_.Leave_Request_Status_Id;
}

this.Leave_Request_Service_.Search_Leave_Request(this.Client_Accounts_Id,Status_Id_).subscribe(Rows => {
    debugger
 this.Leave_Request_Data=Rows[0];
if(this.Leave_Request_Data.length==0)
 {
        const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:3}});
    }
    this.issLoading = false;
    },
    Rows => 
    {
        this.issLoading = false; 
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class',data: { Message: 'Error Occured',Type: 2} });
    });
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
this.Search_Leave_Request();
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
Save_Leave_Request()
{
    if(this.Leave_Data.length==0)
    {



        if(this.Leave_Mode_.Leave_Mode_Id==0 || this.Leave_Mode_==null || this.Leave_Mode_==undefined)
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Leave Mode', Type: "3" } });
            return
        }
        if(this.Leave_Type_.Leave_Type_Id==0 || this.Leave_Type_==null || this.Leave_Type_==undefined)
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Leave Type', Type: "3" } });
            return
        }
        if(this.Leave_Request_.Noof_Leaves<=0)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select proper dates', Type: "3" } });
                return
            }
        if(this.Leave_Type_.Leave_Type_Id==2 )
        {
            debugger
            if(this.Leave_Request_.Noof_Leaves>this.Leave_Request_.Balance_PL)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Not enough leaves', Type: "3" } });
                return
            }
        }
    
        if(this.Leave_Type_.Leave_Type_Id==1 )
        {
            debugger
            if(this.Leave_Request_.Noof_Leaves>this.Leave_Request_.Balance_CL)
            {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Not enough leaves', Type: "3" } });
                return
            }
        }

        if(this.Leave_Data==undefined)
            this.Leave_Data=[]; 
                  // this.Leave_Request_.From_Date= this.New_Date(new Date(moment(this.Leave_Request_.From_Date).format('YYYY-MM-DD')));
            // this.Leave_Request_.To_Date= this.New_Date(new Date(moment(this.Leave_Request_.To_Date).format('YYYY-MM-DD')));
           
             this.Leave_.Leave_Mode_Name = this.Leave_Mode_.Leave_Mode_Name;
            this.Leave_.Leave_Mode_Id = this.Leave_Mode_.Leave_Mode_Id;
            this.Leave_.Leave_Type_Id = this.Leave_Type_.Leave_Type_Id;
             this.Leave_.Leave_Type_Name = this.Leave_Type_.Leave_Type_Name;
           this.Leave_.No_Of_Leaves = this.Leave_Request_.Noof_Leaves;
            if( this.Leave_.Leave_Type_Id == 1)
                 this.Leave_.Balance_Pl = this.Leave_Request_.Noof_Leaves;
            else
                this.Leave_.Balance_Pl = this.Leave_Request_.Balance_PL
            if(this.Leave_.Leave_Type_Id == 2)
                this.Leave_.Balance_Cl = this.Leave_Request_.Noof_Leaves;
            else
            this.Leave_.Balance_Cl = this.Leave_Request_.Balance_CL;
            this.Leave_.From_Date= this.New_Date(new Date(moment(this.Leave_Request_.From_Date).format('YYYY-MM-DD')));
            this.Leave_.To_Date= this.New_Date(new Date(moment(this.Leave_Request_.To_Date).format('YYYY-MM-DD')));
            this.Leave_Data.push(Object.assign({}, this.Leave_));
            this.Card_View=true;
           this.Clr_Leave_Entry();




    // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Add Data', Type: "3" } });
    // return;
    }
    

     if (this.Call_Status == true)
        return;
    else
    //     this.Leave_Request_.Leave_Mode_Id=this.Leave_Mode_.Leave_Mode_Id;
    //    this.Leave_Request_.Leave_Type_Id=this.Leave_Type_.Leave_Type_Id;
     
        this.Call_Status = true;
        this.issLoading = true;
        
        // this.Leave_Request_.From_Date= this.New_Date(new Date(moment(this.Leave_Request_.From_Date).format('YYYY-MM-DD')));
        // this.Leave_Request_.To_Date= this.New_Date(new Date(moment(this.Leave_Request_.To_Date).format('YYYY-MM-DD')));
       debugger
        
        this.Leave_Request_.Client_Accounts_Id= parseInt (this.Client_Accounts_Id);
        this.Leave_Request_.Leave_Details = this.Leave_Data
        this.Leave_Request_.User_Id= parseInt (this.AppLogin_User_Id);

this.Leave_Request_Service_.Save_Leave_Request(this.Leave_Request_).subscribe(Save_status => {
    debugger
    if(Number(Save_status[0][0].Leave_Request_Id_)>0)
    {
        this.Call_Status = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:false}});
        
        this.Close_Click();
    }
    else
    {
        this.Call_Status = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:false}});
        this.Clr_Leave_Request();
        this.Close_Click();
    }
    this.issLoading = false;
    },
    Rows => 
    { 
        this.issLoading = true;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:false}});
        this.Call_Status = false;
    });
}
Edit_Leave_Request(Leave_Request_e:Leave_Request,index)
{
this.Entry_View=false
this.Leave_Request_=Leave_Request_e
this.Leave_Request_ = Object.assign({},Leave_Request_e);

for (var i = 0; i < this.Leave_Type_Data.length; i++)
        {
        if (this.Leave_Request_.Leave_Type_Id == this.Leave_Type_Data[i].Leave_Type_Id)
        this.Leave_Type_=this.Leave_Type_Data[i];
        } 

for (var i = 0; i < this.Leave_Mode_Data.length; i++)
         {
            if (this.Leave_Request_.Leave_Mode_Id == this.Leave_Mode_Data[i].Leave_Mode_Id) {
                this.Leave_Mode_ = this.Leave_Mode_Data[i];
            }
        }
    

}
Add_Leave()
{
    
    if(this.Leave_Mode_.Leave_Mode_Id==0 || this.Leave_Mode_==null || this.Leave_Mode_==undefined)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Leave Mode', Type: "3" } });
        return
    }
    if(this.Leave_Type_.Leave_Type_Id==0 || this.Leave_Type_==null || this.Leave_Type_==undefined)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Leave Type', Type: "3" } });
        return
    }
    if(this.Leave_Request_.Noof_Leaves<=0)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please select proper dates', Type: "3" } });
        return
    }
    
    if(this.Leave_Type_.Leave_Type_Id==2 )
    {
        if(this.Leave_Request_.Noof_Leaves>this.Leave_Request_.Balance_PL)
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Not enough leaves', Type: "3" } });
            return
        }
    }

    if(this.Leave_Type_.Leave_Type_Id==1 )
    {
        if(this.Leave_Request_.Noof_Leaves>this.Leave_Request_.Balance_CL)
        {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Not enough leaves', Type: "3" } });
            return
        }
    }
    if(this.Leave_Data==undefined)
        this.Leave_Data=[]; 
              // this.Leave_Request_.From_Date= this.New_Date(new Date(moment(this.Leave_Request_.From_Date).format('YYYY-MM-DD')));
        // this.Leave_Request_.To_Date= this.New_Date(new Date(moment(this.Leave_Request_.To_Date).format('YYYY-MM-DD')));
       
         this.Leave_.Leave_Mode_Name = this.Leave_Mode_.Leave_Mode_Name;
        this.Leave_.Leave_Mode_Id = this.Leave_Mode_.Leave_Mode_Id;
        this.Leave_.Leave_Type_Id = this.Leave_Type_.Leave_Type_Id;
         this.Leave_.Leave_Type_Name = this.Leave_Type_.Leave_Type_Name;
        this.Leave_.No_Of_Leaves = this.Leave_Request_.Noof_Leaves;
        this.Leave_.Balance_Pl = this.Leave_Request_.Balance_PL-  this.Leave_.No_Of_Leaves;
        this.Leave_.Balance_Cl = this.Leave_Request_.Balance_CL -  this.Leave_.No_Of_Leaves;
        this.Leave_.From_Date= this.New_Date(new Date(moment(this.Leave_Request_.From_Date).format('YYYY-MM-DD')));
        this.Leave_.To_Date= this.New_Date(new Date(moment(this.Leave_Request_.To_Date).format('YYYY-MM-DD')));
        this.Leave_Data.push(Object.assign({}, this.Leave_));
        this.Card_View=true;
       this.Clr_Leave_Entry();
}
}

