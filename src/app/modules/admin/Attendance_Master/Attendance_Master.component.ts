import { Component, OnInit,Input,Injectable }from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge }from 'rxjs';
import { Attendance_Master_Service }from '../../../services/Attendance_Master.Service';
import { Master_Call_Service }from '../../../services/Master_Call.Service';
import { DialogBox_Component }from '../DialogBox/DialogBox.component';
import { Attendance_Master }from '../../../models/Attendance_Master';
import { Store} from '../../../models/Store';
import {Attendance_Details} from '../../../models/Attendance_Details';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig}from '@angular/material';
import { ROUTES,Get_Page_Permission }from '../../../components/sidebar/sidebar.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import * as XLSX from 'ts-xlsx';
import { MomentDateAdapter}from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE}from '@angular/material/core';
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
selector: 'app-Attendance_Master',
templateUrl: './Attendance_Master.component.html',
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
styleUrls: ['./Attendance_Master.component.css']
})

export class Attendance_MasterComponent implements OnInit {
Attendance_Master_Data:Attendance_Master[]
Attendance_Master_:Attendance_Master= new Attendance_Master();
Attendance_Master_Name_Search:string;
myInnerHeight: number;
myTotalHeight: number;
myHeight: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading:boolean;
Permissions:any;
Attendance_Master_Edit:string;
Attendance_Master_Save: string;
Attendance_Master_Delete: string;
// Entry_View:boolean=false;
Entry_View:boolean=false;
Edit_View:boolean=false;
List_View:boolean=false;
EditIndex: number;
Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();
AdminLogin_Id: string;
Call_Status:boolean=false;
year: any;
month: any;
day: any;
date: any;
User_Type: number;
Store_Type_Data:Store[];
Store_Type_Data_Filter:Store[];
Search_Store_:Store=new Store();

Store_Type_Datas:Store[];
Store_Type_Data_Filters:Store[];
Search_Stores_:Store=new Store();
Search_Store_Inner_:Store=new Store();

spinleft:number;
myInnerwidth_1:number;

ImageFile:any
Display_File_Name_:string
file:File;
Store_Id:number;
Is_Date_Check:boolean=true;
arrayBuffer:any;
Attendance_Details_Data:Attendance_Details[];
Attendance_Details_:Attendance_Details=new Attendance_Details;
Attendance_Details_Temp:Attendance_Details[];
Attandance_Details_:Attendance_Details=new Attendance_Details;
array:any;
constructor(public Batch_Service_:Batch_Service,public Attendance_Master_Service_:Attendance_Master_Service,public Master_Call_Service_:Master_Call_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
// ngOnInit() 
// {
//     this.Attendance_Master_Data=[];
//     this.Attendance_Details_Data=[];
// this.AdminLogin_Id=localStorage.getItem('Login_User');
// this.User_Type=Number(localStorage.getItem('User_Type'));
// this.Permissions = Get_Page_Permission(40);
// if(this.Permissions==undefined || this.Permissions==null)
// {
// localStorage.removeItem('token');
// this.router.navigateByUrl('/auth/login');
// }

// else
// {
// this.Attendance_Master_Edit = this.Permissions.Edit;
// this.Attendance_Master_Save = this.Permissions.Save; 
// this.Attendance_Master_Delete = this.Permissions.Delete; 
// this.Master_Call_Service_.Get_Menu_Status(this.AdminLogin_Id, 40).subscribe(Rows => {
// if (Rows[0][0].Menu_Status == 0)
// {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Page Not Avilable',Type:'2'}});
//     this.router.navigateByUrl('Home_Page');
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
    this.Attendance_Master_Data=[];
    this.Attendance_Details_Data=[];
    this.AdminLogin_Id=localStorage.getItem(("Login_User"));
    this.User_Type=Number(localStorage.getItem('User_Type'));

    {

    this.Page_Load()
    }
}

Page_Load()
{
this.Get_Menu_Status(80,this.AdminLogin_Id);
this.myInnerHeight = (window.innerHeight);
this.myTotalHeight = this.myInnerHeight;
this.myTotalHeight = this.myTotalHeight - 40;
this.myInnerHeight = this.myInnerHeight -300;
this.myInnerwidth_1 = window.innerWidth;
this.spinleft = (this.myInnerwidth_1/2)-50;
this.Search_Attendance_Master_Import();
this.Entry_View = false;
this.Search_FromDate=new Date();
this.Search_FromDate=this.New_Date(this.Search_FromDate);
this.Search_ToDate=new Date();
this.Search_ToDate=this.New_Date(this.Search_ToDate);
this.Entry_View = false;
this.List_View =true;
this.Edit_View=false;
this.Clr_Attendance_Master();
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

                this.Attendance_Master_Edit = this.Permissions.Edit;
this.Attendance_Master_Save = this.Permissions.Save; 
this.Attendance_Master_Delete = this.Permissions.Delete; 
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
this.List_View =false;
this.Edit_View=false;
this.Attendance_Master_.From_Date=new Date();
this.Attendance_Master_.From_Date=this.New_Date(this.Attendance_Master_.From_Date);
this.Attendance_Master_.To_Date=new Date();
this.Attendance_Master_.To_Date=this.New_Date(this.Attendance_Master_.To_Date);
this.Clr_Attendance_Master();
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
this.List_View =true;
this.Edit_View=false;
this.Search_Attendance_Master_Import();
this.Clr_Attendance_Master();
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


 Clr_Attendance_Master()
 {
     
this.Attendance_Master_.Attendance_Master_Id=0;
this.Attendance_Master_.Store_Id=0;
// this.Attendance_Master_.Store_Id=this.Search_Store_.Store_Id;
this.Attendance_Master_.Users_Id=0;
this.Attendance_Master_.Upload_File="";
this.Attendance_Master_.From_Date=this.New_Date(new Date);
this.Attendance_Master_.To_Date=this.New_Date(new Date);
this.Attendance_Master_.Entry_Date=this.New_Date(new Date);
this.Attendance_Details_Data=[];
// if(this.Search_Store_!=null && this.Search_Store_ != undefined)
//     this.Search_Store_=this.Store_Type_Data[0];
// if(this.Search_Store_Inner_!=null && this.Search_Store_Inner_ != undefined)
//     this.Search_Store_Inner_=this.Store_Type_Data[0];
this.Search_Store_ = null;
this.Search_Store_Inner_ = null;


}
incomingfile(event)
{
    this.file=event.target.files[0];
     this.Display_File_Name_ = this.file.name;
     this.Upload();
  }

//   Upload() {     
//     let fileReader = new FileReader();
//       fileReader.onload = (e) => {
//           this.arrayBuffer = fileReader.result;
//           var data = new Uint8Array(this.arrayBuffer);
//           var arr = new Array();
//           for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
//           var bstr = arr.join("");
//           var workbook = XLSX.read(bstr, {type:"binary"});
//           var first_sheet_name = workbook.SheetNames[0];
//           var worksheet = workbook.Sheets[first_sheet_name];
//           this.Attendance_Details_Data=(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
          
//           this.Attendance_Details_Data.sort();          
//       }
//       fileReader.readAsArrayBuffer(this.file);
// }
Upload() {     
    debugger
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          this.Attendance_Details_Data=[];
          debugger
          this.Attendance_Details_Temp=(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
         // for (var j=10;j-1<=this.Attendance_Details_Temp.length;j++) 
         var ind='k';
         var j=2;
          while(ind!=undefined)
          {
            ind=worksheet['B'+j];
            if(ind != undefined)
            {
              this.Attendance_Details_.Employee_Code=worksheet['B'+j].v
             
              this.Attendance_Details_.Employee_Name=worksheet['C'+j].v
              this.Attendance_Details_.Present_Days=worksheet['D'+j].v
              this.Attendance_Details_.Absent_Days=worksheet['E'+j].v
              this.Attendance_Details_Data.push(Object.assign({},this.Attendance_Details_));
            }
            j++;
          }
        //   this.Attendance_Details_Data.sort();          
      }
      fileReader.readAsArrayBuffer(this.file);
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

Search_Attendance_Master_Import()
{
  var look_In_Date_Value=0,Store_Id = 0;
  if (this.Is_Date_Check == true)
      look_In_Date_Value = 1;
      if (this.Search_Store_!= undefined && this.Search_Store_ != null)
      if (this.Search_Store_.Store_Id != undefined && this.Search_Store_.Store_Id != null)
      Store_Id = this.Search_Store_.Store_Id;
  this.issLoading = true;
  debugger
  this.Attendance_Master_Service_.Search_Attendance_Master_Import(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),look_In_Date_Value,Store_Id).subscribe(Rows => {
   debugger  
    this.Attendance_Master_Data=Rows[0];
  this.issLoading = false;
 if(this.Attendance_Master_Data.length==0)
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

Save_Attendance_Master_Admin()
{

    //  if (this.Call_Status == true)
    //     return;
    // else

    // if(this.Search_Store_Inner_==undefined || this.Search_Store_Inner_==null )
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Store',Type:"3"}});
    //     return;
    // }
    
        this.Call_Status = true;
        this.issLoading = true;      
        this.Attendance_Master_.Users_Id=Number(this.AdminLogin_Id);
        this.Attendance_Master_.Attendance_Details=this.Attendance_Details_Data;
        this.Attendance_Master_.Store_Id=0
        this.Attendance_Master_.From_Date = this.New_Date(new Date(moment(this.Attendance_Master_.From_Date).format('YYYY-MM-DD')));
        this.Attendance_Master_.To_Date = this.New_Date(new Date(moment(this.Attendance_Master_.To_Date).format('YYYY-MM-DD')));
     debugger    
this.Attendance_Master_Service_.Save_Attendance_Master_Import(this.Attendance_Master_).subscribe(Save_status => {
    debugger
    if(Number(Save_status[0].Attendance_Master_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:false}});
        this.Call_Status = false;
        this.Close_Click();
    }
    else
    {
        this.Call_Status = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:false}});
    }
    this.issLoading = false;
    },
    Rows => 
    { 
        this.issLoading = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:false}});
        this.Call_Status = false;
    });
}
Delete_Attendance_Master(Attendance_Master_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading = true;
this.Attendance_Master_Service_.Delete_Attendance_Master(Attendance_Master_Id).subscribe(Delete_status => {
Delete_status = Delete_status[0];
Delete_status = Delete_status[0].DeleteStatus_;
if(Delete_status==1){
this.Attendance_Master_Data.splice(index, 1);
const dialogRef = this.dialogBox.open(DialogBox_Component,{panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:false}});
this.Search_Attendance_Master_Import();
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
Edit_Attendance_Master(Attendance_Master_e:Attendance_Master,index)
{
    this.Entry_View=true;
    this.List_View =false;
    this.Attendance_Master_=Attendance_Master_e
    this.Attendance_Master_ = Object.assign({},Attendance_Master_e);

    this.issLoading=true;
    debugger
    this.Attendance_Master_Service_.Get_Attendance_Master(this.Attendance_Master_.Attendance_Master_Id).subscribe(Rows =>
        {
            debugger
            this.Attendance_Details_Data=Rows[0];
            this.issLoading=false;
            },
            Rows => 
            { 
            this.issLoading=false;
            });
}
}

