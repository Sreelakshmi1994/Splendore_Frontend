import { Component, OnInit,Input,Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Journal_Entry } from '../../../models/Journal_Entry';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { PaymentMode } from '../../../models/PaymentMode';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {FormControl} from '@angular/forms';

import { Payment_Voucher_Service } from '../../../services/Payment_Voucher.Service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Client_Accounts_Service } from 'app/services/Client_Accounts.Service';
import { Company } from 'app/models/Company';
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
selector: 'app-Journal_Entry',
templateUrl: './Journal_Entry.component.html',
styleUrls: ['./Journal_Entry.component.css'],
providers: [
            {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
            {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],
})
export class Journal_EntryComponent implements OnInit {
Journal_Entry_Data:Journal_Entry[]
Journal_Entry_:Journal_Entry= new Journal_Entry();

print_amount: number;
Journal_Entry_Name_Search:string;
Entry_View:boolean=true;
Company_Data:Company[];
print_paid: string;
myInnerHeight: number;
myTotalHeight: number;
myInnerHeighttemp: number;
EditIndex: number;

 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
month: any;
day: any;
date:any;
year: any;
 Print_Date_:Date;
issLoading: boolean;
Permissions: any;
Journal_Entry_Edit:boolean;
Journal_Entry_Save:boolean;
Journal_Entry_Delete:boolean;
FromAccount_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data:Client_Accounts[]
ToAccount_:Client_Accounts=new Client_Accounts();
Search_FromDate:Date=new Date();
Search_ToDate:Date=new Date();
Look_In_Date:Boolean=true;
FromAccount_Search:Client_Accounts=new Client_Accounts();
ToAccount_Search:Client_Accounts=new Client_Accounts();
Voucher_No_search:number;
Print_Company_:Company=new Company();

Image_Url:string;
Company_Sign:string;
Print_Client_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data_:Client_Accounts[]
Company_Seal:string;
Login_User:string="0";
FromAccount_Temp:Client_Accounts=new Client_Accounts();
ToAccount_Temp:Client_Accounts=new Client_Accounts();
Journal_Print:boolean;
Payment_Mode_Data:PaymentMode[]
Mode_Temp:PaymentMode=new PaymentMode();
Payment_Mode_:PaymentMode=new PaymentMode();
constructor(public Client_Accounts_Service_:Client_Accounts_Service,public Receipt_Voucher_Service_:Receipt_Voucher_Service,public Payment_Voucher_Service_:Payment_Voucher_Service,public Journal_Entry_Service_:Journal_Entry_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Login_User=localStorage.getItem("Login_User");
this.Permissions = Get_Page_Permission(91);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Journal_Entry_Edit=this.Permissions.Edit;
this.Journal_Entry_Save=this.Permissions.Save;
this.Journal_Entry_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = window.innerHeight;
    this.myTotalHeight = this.myInnerHeight;
    this.myTotalHeight = this.myTotalHeight - 40;
    this.myInnerHeight = this.myInnerHeight - 300;
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
    this.Journal_Entry_.Date = new Date(); 
this.Clr_Journal_Entry();
this.Get_Payment_Mode() ;
this.Search_Company();
this.Search_Journal_Entry();
this.Journal_Print=false;
this.Entry_View=false;
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
 Print_Date(Date_)
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
    this.date = this.day + "-" + this.month + "-" + this.year;
    return this.date;
    }
Create_New()
{
this.Entry_View = true;
this.Journal_Print=false;
this.Clr_Journal_Entry();
}
Close_Click()
{
this.Clr_Journal_Entry();
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Journal_Entry()
 {
this.Journal_Entry_.Journal_Entry_Id=0;
this.Journal_Entry_.Date=new Date();
this.Journal_Entry_.Date=this.New_Date(this.Journal_Entry_.Date);
this.Journal_Entry_.Voucher_No=null;
this.Journal_Entry_.From_Account_Id=0;
this.Journal_Entry_.Amount=null;
this.Journal_Entry_.To_Account_Id=0;
this.Journal_Entry_.Description="";    
this.Journal_Entry_.From_Detail="";   
this.Journal_Entry_.To_Detail="";    
if(this.Payment_Mode_Data!=null && this.Payment_Mode_Data != undefined)
this.Payment_Mode_=this.Payment_Mode_Data[0];
 this.Journal_Entry_.Payment_Status=0;
this.Journal_Entry_.User_Id=0;
this.FromAccount_=null;
this.Journal_Print=false
this.ToAccount_=null;
// this.Journal_Entry_.Description="";
// this.Journal_Entry_.Payment_Status=1;
}
To_Change(Address1) 
{ 
    
    this.Journal_Entry_.To_Detail=Address1;
}
Address_Change(Address1) 
{ 
    
    this.Journal_Entry_.From_Detail=Address1;
}
Get_Payment_Mode() 
{  
    debugger
   this.Payment_Voucher_Service_.Get_Payment_Mode().subscribe(Rows => {      
    debugger         
        this.Payment_Mode_Data = Rows[0];
        this.Mode_Temp.Payment_Mode_Id = 0;
    this.Mode_Temp.Payment_Mode_Name = "Select";
    this.Payment_Mode_Data.unshift(this.Mode_Temp);
    this.Payment_Mode_ = this.Payment_Mode_Data[0];
        },
        Rows => 
        {
        //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}
 Get_Client_Accounts_Typeahead(event: any)
    {
             
            this.issLoading=true;
    var Value = "";
    if (event.target.value == "")
    Value = undefined;
    else
    Value = event.target.value;
    this.Receipt_Voucher_Service_.Get_Client_Accounts_Typeahead(Value).subscribe(Rows => {
    if (Rows != null) {
    this.Client_Accounts_Data = Rows[0];
    }
    this.issLoading=false;
    },
    Rows => { 
        this.issLoading=false;
     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });

    }
display_FromAccount(Client_Accounts_e: Client_Accounts) 
    {
         
    if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
    }
Search_Journal_Entry()
{ var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0,ClientAccounts_Id=0;
   
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
this.Journal_Entry_Service_.Search_Journal_Entry(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value).subscribe(Rows => {
 
    this.Journal_Entry_Data=Rows[0];
this.Total_Entries=this.Journal_Entry_Data.length;
if(this.Journal_Entry_Data.length==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading=false;
 },
 Rows => { 
     this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
Delete_Journal_Entry(Journal_Entry_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Journal_Entry_Service_.Delete_Journal_Entry(Journal_Entry_Id).subscribe(Delete_status => {
if(Delete_status[0][0].Journal_Entry_Id_>0){
this.Total_Entries=this.Total_Entries-1;

this.Journal_Entry_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
this.Search_Journal_Entry();
}
else
{
//this.Journal_Entry_Data.splice(index, 1);

const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});});
}
 });
}
Save_Journal_Entry()
{
   
    if (this.FromAccount_ == undefined || this.FromAccount_.Client_Accounts_Id == 0 || this.FromAccount_ == null||this.FromAccount_.Client_Accounts_Id==undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The From account', Type: "3" } });
        }
        else if(this.Journal_Entry_.Amount==undefined||this.Journal_Entry_.Amount==null||this.Journal_Entry_.Amount==undefined||this.Journal_Entry_.Amount==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        }
        else if(this.ToAccount_==undefined||this.ToAccount_==null||this.ToAccount_.Client_Accounts_Id==undefined||this.ToAccount_.Client_Accounts_Id==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The To Account', Type: "3" } });
        }
        // else if (this.Payment_Mode_ == null ||this.Payment_Mode_ == undefined || this.Payment_Mode_.Payment_Mode_Id == undefined || this.Payment_Mode_.Payment_Mode_Id == 0) {
        //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The Payment Mode', Type: "3" } });
        // }
          
    else{
        this.Journal_Entry_.User_Id=Number(this.Login_User);
        this.Journal_Entry_.From_Account_Id=this.FromAccount_.Client_Accounts_Id;
        this.Journal_Entry_.To_Account_Id=this.ToAccount_.Client_Accounts_Id;
        this.Journal_Entry_.PaymentMode=this.Payment_Mode_.Payment_Mode_Id;
        this.Journal_Entry_.Date=this.New_Date(new Date(moment(this.Journal_Entry_.Date).format('YYYY-MM-DD')));
        this.Journal_Entry_.Status=5;
        this.Journal_Entry_.Master_Id=0;

document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
debugger;
this.Journal_Entry_Service_.Save_Journal_Entry(this.Journal_Entry_).subscribe(Save_status => {
    debugger;
Save_status=Save_status[0];
if(Number(Save_status[0].Journal_Entry_Id_)>0)
{

const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Journal_Print=false
document.getElementById("Save_Button").hidden=true;
this.Journal_Entry_.Voucher_No=Save_status[0].Voucher_No_;
}
else{
 
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}this.Search_Journal_Entry();
this.issLoading=false;
 },
 Rows => { 
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });

}
}
numberToEnglish(n, custom_join_character) {
    var string = n.toString(),
    units,
    tens,
    scales,
    start,
    end,
    chunks,
    chunksLen,
    chunk,
    ints,
    i,
    word,
    words;
    
    var and = custom_join_character || "and";
    
    /* Is number zero? */
    if (parseInt(string) === 0) {
    return "zero";
    }
    
    /* Array of units as words */
    units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
    ];
    
    /* Array of tens as words */
    tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
    ];
    
    /* Array of scales as words */
    scales = ["", "", "Thousand", "Lakh", "Billion"];
    
    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
    end = start;
    chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }
    
    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
    return "";
    }
    
    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {
    chunk = parseInt(chunks[i]);
    
    if (chunk) {
    /* Split chunk into array of individual integers */
    ints = chunks[i].split("").reverse().map(parseFloat);
    
    /* If tens integer is 1, i.e. 10, then add 10 to units integer */
    if (ints[1] === 1) {
    ints[0] += 10;
    }
    
    /* Add scale word if chunk is not zero and array item exists */
    if ((word = scales[i])) {
    words.push(word);
    }
    
    /* Add unit word if array item exists */
    if ((word = units[ints[0]])) {
    words.push(word);
    }
    
    /* Add tens word if array item exists */
    if ((word = tens[ints[1]])) {
    words.push(word);
    }
    
    /* Add 'and' string after units or tens integer if: */
    if (ints[0] || ints[1]) {
    /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
    if (ints[2] || (!i && chunksLen)) {
    words.push(and);
    }
    }
    
    /* Add hundreds word if array item exists */
    if ((word = units[ints[2]])) {
    words.push(word + " hundred");
    }
    }
    }
    
    return words.reverse().join(" ");
    }
Edit_Journal_Entry(Journal_Entry_e:Journal_Entry,index)
{
    this.Journal_Print=true
    
this.Entry_View=true;
this.Journal_Entry_=Journal_Entry_e;

this.Journal_Entry_=Object.assign({},Journal_Entry_e);
 
this.print_amount = this.Journal_Entry_.Amount;


this.print_paid = this.numberToEnglish(this.print_amount, "");
this.FromAccount_Temp.Client_Accounts_Id=Journal_Entry_e.From_Account_Id;
this.FromAccount_Temp.Client_Accounts_Name=Journal_Entry_e.FromAccount_Name;
this.FromAccount_=this.FromAccount_Temp;

this.ToAccount_Temp.Client_Accounts_Id=Journal_Entry_e.To_Account_Id;
this.ToAccount_Temp.Client_Accounts_Name=Journal_Entry_e.ToAccount_Name;
this.ToAccount_=this.ToAccount_Temp;

for (var i = 0; i < this.Payment_Mode_Data.length; i++) {
    if (Journal_Entry_e.PaymentMode == this.Payment_Mode_Data[i].Payment_Mode_Id)
    this.Payment_Mode_ = this.Payment_Mode_Data[i];

}


this.issLoading=true;
    this.Client_Accounts_Service_.Get_Client_Accounts(this.Journal_Entry_.From_Account_Id).subscribe(Rows => {
         debugger;
               if (Rows != null) {
                   this.Client_Accounts_Data_ = Rows[0];
                   this.Print_Client_ = this.Client_Accounts_Data_[0];
             
               }
               this.issLoading = false;
           },
               Rows => {
                    
                   this.issLoading = false;
           const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
               });
    this.issLoading = true;
}
Search_Company() 
        {
             
                this.Receipt_Voucher_Service_.Search_Company().subscribe(Rows => {
                 
                this.Company_Data = Rows[0];
              //  this.Company_Info = Rows[0];
                // this.Company_Temp.Company_Id = 0;
                // this.Company_Temp.Company_Name = "Select";
                // this.Company_Data.unshift(this.Company_Temp);
                this.Print_Company_ = this.Company_Data[0];
        },
        Rows => 
        {
        //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
}

Get_Client_Accounts() 
{
     debugger;
        this.Client_Accounts_Service_.Get_Client_Accounts(this.FromAccount_.Client_Accounts_Id).subscribe(Rows => {
            debugger;
        this.Client_Accounts_Data_ = Rows[0];
      //  this.Company_Info = Rows[0];
        // this.Company_Temp.Company_Id = 0;
        // this.Company_Temp.Company_Name = "Select";
        // this.Company_Data.unshift(this.Company_Temp);
        this.Print_Client_ = this.Client_Accounts_Data_[0];
},
Rows => 
{
//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}

Print_Click()
{
           
  this.Get_Client_Accounts();

                this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
                this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
                this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';
          let popupWinindow
           let innerContents = document.getElementById("Print_Div").innerHTML;
           popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
           popupWinindow.document.open();
           popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
           popupWinindow.document.close();
       // }
//}
}
}

