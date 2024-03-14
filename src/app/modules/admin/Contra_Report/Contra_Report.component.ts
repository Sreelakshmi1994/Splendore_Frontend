import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contra_Entry_Service } from '../../../services/Contra_Entry.service';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Contra_Entry } from '../../../models/Contra_Entry';


import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {
    dateInput: 'DD/MM/YYYY',
    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';import { Student_Service } from 'app/services/Student.service';
@Component({
    selector: 'app-Contra_Report',
    templateUrl: './Contra_Report.component.html',
    styleUrls: ['./Contra_Report.component.css'],

providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],
})
export class Contra_ReportComponent implements OnInit {
Contra_Entry_Data:Contra_Entry[]
Contra_Entry_:Contra_Entry= new Contra_Entry();
Contra_Entry_Name_Search:string;

FromAccount_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data:Client_Accounts[]

ToAccount_:Client_Accounts=new Client_Accounts();
Search_FromDate:Date=new Date();
Search_ToDate:Date=new Date();
FromAccount_Search:Client_Accounts=new Client_Accounts();
ToAccount_Search:Client_Accounts=new Client_Accounts();
Voucher_No_search:number;
FromAccount_Temp:Client_Accounts=new Client_Accounts();
ToAccount_Temp:Client_Accounts=new Client_Accounts();

Look_In_Date:Boolean=true;
month: any;
day: any;
date:any;
year: any;
Login_User:string="0";


Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Contra_Entry_Edit:boolean;
Contra_Entry_Save:boolean;
Contra_Entry_Delete:boolean;
constructor(public Student_Service_:Student_Service,public Receipt_Voucher_Service_:Receipt_Voucher_Service,public Contra_Entry_Service_:Contra_Entry_Service,public Journal_Entry_Service_:Journal_Entry_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Login_User=localStorage.getItem("Login_User"); 
this.Permissions = Get_Page_Permission(89);
if(this.Permissions==undefined || this.Permissions==null)
{1
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Contra_Entry_Edit=this.Permissions.Edit;
this.Contra_Entry_Save=this.Permissions.Save;
this.Contra_Entry_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 300;
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
    this.Search_Contra_Entry();
    this.Entry_View=false;
}
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
    return this.date;
    }
 Get_Client_Accounts_Typeahead(event: any)
 {
      
     this.issLoading=true;
 var Value = "";
 if (event.target.value == "")
 Value = undefined;
 else
 Value = event.target.value;
 this.Journal_Entry_Service_.Accounts_Typeahead('4,5,11',Value).subscribe(Rows => {
      
 if (Rows != null) {
 this.Client_Accounts_Data = Rows[0];
 }    
     this.issLoading=false;
 },
 Rows => {    
         this.issLoading=false;
 });
 }

 display_FromAccount(Client_Accounts_e: Client_Accounts) 
 { 
 if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
}
Search_Contra_Entry()
{ 
    var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0,ClientAccounts_Id=0;
    if (this.Look_In_Date == true )
    look_In_Date_Value = 1;
    if (this.ToAccount_Search != undefined && this.ToAccount_Search!=null)
    if (this.ToAccount_Search.Client_Accounts_Id != undefined && this.ToAccount_Search.Client_Accounts_Id != null)
    ClientAccounts_Id = this.ToAccount_Search.Client_Accounts_Id;
    if (this.FromAccount_Search != undefined && this.FromAccount_Search!=null)
    if (this.FromAccount_Search.Client_Accounts_Id != undefined && this.FromAccount_Search.Client_Accounts_Id != null)
    ClientAccount= this.FromAccount_Search.Client_Accounts_Id;
    if (this.Voucher_No_search != undefined && this.Voucher_No_search != null && this.Voucher_No_search != 0)
    Voucher_No_search_ = this.Voucher_No_search;
                 
    this.issLoading=true;
    this.Contra_Entry_Service_.Search_Contra_Entry(moment(this.Search_FromDate).format('YYYY-MM-DD'),moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value).subscribe(Rows => {
                 
    this.Contra_Entry_Data=Rows[0];
    this.Total_Entries=this.Contra_Entry_Data.length;
    if(this.Contra_Entry_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    this.issLoading=false;
    },
    Rows => {
        this.issLoading=false;
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
  

}
Export()
{
    
        this.Student_Service_.exportExcel(this.Contra_Entry_Data,'Contra Entry Report')
       
}
}

