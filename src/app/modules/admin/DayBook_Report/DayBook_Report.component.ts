import { Component, OnInit,Input,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge, from } from 'rxjs';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.service';


import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import {Receipt_Voucher} from '../../../models/Receipt_Voucher';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component'
import {FormControl} from '@angular/forms';
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
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';

@Component({
selector: 'app-DayBook_Report',
templateUrl: './DayBook_Report.component.html',
styleUrls: ['./DayBook_Report.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})
export class DayBook_ReportComponent implements OnInit {
Reciept_Voucher_Data:Receipt_Voucher[]

DayBook_Report_Data:[];
Reciept_Voucher_:Receipt_Voucher= new Receipt_Voucher();
Reciept_Voucher_Name_Search:string;



Entry_View:boolean=false;
myInnerHeight: number;
EditIndex: number;
Receipt_No_search:number;
Search_FromDate:Date=new Date();
Search_ToDate:Date=new Date();
Look_In_Date:Boolean=true;


month: any;
year: any;
date: any;
d: Date;
day: any;Total_Entries:Number=0;
Search_Date:Date=new Date();
color = 'primary';     
Menu_Id:number=90;
mode = 'indeterminate';
value = 50;
issLoading: boolean;
array:any;
Reciept_Voucher_Edit:boolean;
Reciept_Voucher_Save:boolean;
Reciept_Voucher_Delete:boolean;
Login_User:string="0";
date1:Date;
constructor(public Receipt_Voucher_Service_:Receipt_Voucher_Service,private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{

this.Search_FromDate=new Date();

this.Login_User=localStorage.getItem("Login_User");
this.array=Get_Page_Permission(this.Menu_Id);
if(this.array==undefined || this.array==null)
{

}
else 
{

this.Page_Load()
}
//this.Page_Load()
}
Page_Load()
{
        this.myInnerHeight = (window.innerHeight);
        this.myInnerHeight = this.myInnerHeight - 260;
        this.Search_FromDate=new Date();
        this.Search_ToDate=new Date();
        this.Reciept_Voucher_.Date=new Date(); 
        // this.Reciept_Voucher_.Date="",
        this.Search_Date=this.New_Date(this.Search_Date);
        this.Search_Date=new Date();

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
Search_DayBook_Report()
{
        this.issLoading=true;
        //let fromDate= moment()
        //let fromDate1= moment(this.Search_FromDate).format('YYYY-MM-DD');   

        this.Receipt_Voucher_Service_.Search_DayBook_Report(moment(this.Search_FromDate).format('YYYY-MM-DD'),moment(this.Search_ToDate).format('YYYY-MM-DD')).subscribe(Rows =>        
        {

        this.issLoading=false;
        this.DayBook_Report_Data=Rows[0];
        this.Total_Entries=this.DayBook_Report_Data.length;

        if(this.DayBook_Report_Data.length==0)
        {
        const dialogRef = this.dialogBox.open
        ( DialogBox_Component, {panelClass:'Dialogbox-Class'
        ,data:{Message:'No Details Found',Type: "3" }});
        }
        this.issLoading=false;
        },
        Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}    
Export()
{
    
        this.Receipt_Voucher_Service_.exportExcel(this.DayBook_Report_Data,'DayBook Report Report')
       
} 

}

