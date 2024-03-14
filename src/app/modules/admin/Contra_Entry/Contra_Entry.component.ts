import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contra_Entry_Service } from '../../../services/Contra_Entry.Service';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
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
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';import { Company } from 'app/models/Company';
import { Client_Accounts_Service } from 'app/services/Client_Accounts.Service';
@Component({
selector: 'app-Contra_Entry',
templateUrl: './Contra_Entry.component.html',
styleUrls: ['./Contra_Entry.component.css'],

providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],
})
export class Contra_EntryComponent implements OnInit {
Contra_Entry_Data:Contra_Entry[]
Contra_Entry_:Contra_Entry= new Contra_Entry();
Contra_Entry_Name_Search:string;

FromAccount_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data:Client_Accounts[]

ToAccount_:Client_Accounts=new Client_Accounts();
Search_FromDate:Date=new Date();
Search_ToDate:Date=new Date();

print_amount: number;
FromAccount_Search:Client_Accounts=new Client_Accounts();
ToAccount_Search:Client_Accounts=new Client_Accounts();
Voucher_No_search:number;


Print_Company_:Company=new Company();
print_paid: string;

Image_Url:string;
Company_Sign:string;
Company_Seal:string;


FromAccount_Temp:Client_Accounts=new Client_Accounts();
ToAccount_Temp:Client_Accounts=new Client_Accounts();

Look_In_Date:Boolean=true;
month: any;
day: any;
date:any;
year: any;
Login_User:string="0";
Print_Date_:Date;
Print_Client_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data_:Client_Accounts[]
Company_Data:Company[];
Entry_View:boolean=true;
myInnerHeight: number;
myTotalHeight: number;
myInnerHeighttemp: number;
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
Contra_Entry_Print:boolean;
constructor(public  Client_Accounts_Service_:Client_Accounts_Service,public Receipt_Voucher_Service_:Receipt_Voucher_Service,public Contra_Entry_Service_:Contra_Entry_Service,public Journal_Entry_Service_:Journal_Entry_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Login_User=localStorage.getItem("Login_User"); 
this.Permissions = Get_Page_Permission(88);
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
    this.myInnerHeight = window.innerHeight;
    this.myTotalHeight = this.myInnerHeight;
    this.myTotalHeight = this.myTotalHeight - 40;
    this.myInnerHeight = this.myInnerHeight - 300;
this.Search_FromDate=this.New_Date(this.Search_FromDate);
this.Search_ToDate=this.New_Date(this.Search_ToDate);
this.Clr_Contra_Entry();
this.Search_Contra_Entry();
this.Search_Company()
this.Contra_Entry_Print=false;
this.Entry_View=false;
}
Create_New()
{
    
this.Contra_Entry_Print=false;
this.Entry_View = true;
this.Clr_Contra_Entry();
}
Close_Click()
{
this.Clr_Contra_Entry();
this.Entry_View = false;
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
 Clr_Contra_Entry()
 {
    this.Contra_Entry_.Contra_Entry_Id=0;
    this.Contra_Entry_.Date=new Date();
    this.Contra_Entry_.Date=this.New_Date(this.Contra_Entry_.Date);
    this.Contra_Entry_.Voucher_No=null;
    this.Contra_Entry_.From_Account_Id=0;
    this.Contra_Entry_.Amount=null;
    this.Contra_Entry_.To_Account_Id=0;
    this.Contra_Entry_.PaymentMode=0;
    this.Contra_Entry_.User_Id=0;
    this.ToAccount_=null;
    this.FromAccount_=null;
    this.Contra_Entry_.Description="";
    this.Contra_Entry_.Payment_Status=0;
    
this.Contra_Entry_Print=false;

}
//  Get_Client_Accounts_Typeahead(event: any)
//     {
             
//             this.issLoading=true;
//     var Value = "";
//     if (event.target.value == "")
//     Value = undefined;
//     else
//     Value = event.target.value;
//     this.Receipt_Voucher_Service_.Get_Client_Accounts_Typeahead(Value).subscribe(Rows => {
//     if (Rows != null) {
//     this.Client_Accounts_Data = Rows[0];
//     }
//     this.issLoading=false;
//     },
//     Rows => { 
//         this.issLoading=false;
//      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
//     }

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
    debugger;
    this.Contra_Entry_Service_.Search_Contra_Entry(moment(this.Search_FromDate).format('YYYY-MM-DD'),moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value).subscribe(Rows => {
    debugger;       
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
Delete_Contra_Entry(Contra_Entry_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Contra_Entry_Service_.Delete_Contra_Entry(Contra_Entry_Id).subscribe(Delete_status => {         
       console.log( Delete_status[0][0].Contra_Entry_Id_)
    if(Delete_status[0][0].Contra_Entry_Id_>0){
        this.Total_Entries=this.Total_Entries-1;
        this.Contra_Entry_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    else
    {   
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Eroor occured',Type:"2"}});
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
Save_Contra_Entry()
{
    debugger
    if (this.FromAccount_ == undefined || this.FromAccount_.Client_Accounts_Id == 0 || this.FromAccount_ == null||this.FromAccount_.Client_Accounts_Id==undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The From account', Type: "3" } });
        }
        else if(this.Contra_Entry_.Amount==undefined||this.Contra_Entry_.Amount==null||this.Contra_Entry_.Amount==undefined||this.Contra_Entry_.Amount==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        }
        else if(this.ToAccount_==undefined||this.ToAccount_==null||this.ToAccount_.Client_Accounts_Id==undefined||this.ToAccount_.Client_Accounts_Id==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The To Account', Type: "3" } });
        }
        else
    {
        this.Contra_Entry_.User_Id=Number(this.Login_User);
        this.Contra_Entry_.From_Account_Id=this.FromAccount_.Client_Accounts_Id;
        this.Contra_Entry_.To_Account_Id=this.ToAccount_.Client_Accounts_Id;
        this.Contra_Entry_.Date=this.New_Date(new Date(moment(this.Contra_Entry_.Date).format('YYYY-MM-DD')));    
document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
debugger
this.Contra_Entry_Service_.Save_Contra_Entry(this.Contra_Entry_).subscribe(Save_status => {
    debugger
Save_status=Save_status[0];
if(Number(Save_status[0].Contra_Entry_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Search_Contra_Entry();

this.Contra_Entry_Print=false;
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
document.getElementById('Save_Button').hidden=true;
this.Contra_Entry_.Voucher_No=Save_status[0].Voucher_No_;
}
this.issLoading=false;
 },
 Rows => { 
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
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
Edit_Contra_Entry(Contra_Entry_e:Contra_Entry,index)
{
    debugger
this.Entry_View=true; 
this.Contra_Entry_Print=true;
this.Contra_Entry_=Contra_Entry_e;
this.Contra_Entry_=Object.assign({},Contra_Entry_e);
debugger
// this.Print_Date_ = new Date(this.Contra_Entry_.Search_Date);
// this.Print_Date_ = this.Print_Date(this.Print_Date_);


this.FromAccount_Temp.Client_Accounts_Id=Contra_Entry_e.From_Account_Id;
this.FromAccount_Temp.Client_Accounts_Name=Contra_Entry_e.FromAccount_Name;
this.FromAccount_=this.FromAccount_Temp;

this.ToAccount_Temp.Client_Accounts_Id=Contra_Entry_e.To_Account_Id;
this.ToAccount_Temp.Client_Accounts_Name=Contra_Entry_e.ToAccount_Name;
this.ToAccount_=this.ToAccount_Temp;
this.print_amount = this.Contra_Entry_.Amount;


this.print_paid = this.numberToEnglish(this.print_amount, "");
this.issLoading=true;
    this.Client_Accounts_Service_.Get_Client_Accounts(this.Contra_Entry_.From_Account_Id).subscribe(Rows => {
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
}

