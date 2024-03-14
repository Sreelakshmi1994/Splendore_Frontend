import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
import { Payment_Voucher_Service } from '../../../services/Payment_Voucher.Service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Receipt_Voucher } from '../../../models/Receipt_Voucher';
import { Client_Accounts } from '../../../models/Client_Accounts';
//import { Sales_Receipt } from '../../../models/Sales_Receipt';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { PaymentMode} from '../../../models/PaymentMode';
import { Company } from '../../../models/Company';
import { User_Details_Service } from '../../../services/User_Details.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {parse: {dateInput: 'DD/MM/YYYY',},
display: {
dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
},
};
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';@Component({
selector: 'app-Employee_Details',
templateUrl: './Receipt_Voucher.component.html',
styleUrls: ['./Receipt_Voucher.component.css'],
providers: [
{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})

export class Receipt_VoucherComponent implements OnInit {
Receipt_Voucher_Data:Receipt_Voucher[]
Receipt_Voucher_:Receipt_Voucher= new Receipt_Voucher();
Receipt_Voucher_Name_Search:string;
Payment_Mode_Data:PaymentMode[]
Payment_Mode_:PaymentMode=new PaymentMode();
Mode_Temp:PaymentMode=new PaymentMode();
PaymentMode_Temp:PaymentMode=new PaymentMode();
Print_Client_:Client_Accounts=new Client_Accounts();
FromAccount_:Client_Accounts=new Client_Accounts();
Client_Accounts_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data:Client_Accounts[]
Client_Accounts_Data_:Client_Accounts[]
To_Client_Accounts_Data:Client_Accounts[]
ToAccount_:Client_Accounts=new Client_Accounts();
By_Employee:Client_Accounts=new Client_Accounts();
Search_FromDate:Date=new Date();
Search_ToDate:Date=new Date();
print_amount: number;
FromAccount_Search:Client_Accounts=new Client_Accounts();
ToAccount_Search:Client_Accounts=new Client_Accounts();
Voucher_No_search:number;
FromAccount_Temp:Client_Accounts=new Client_Accounts();
ToAccount_Temp:Client_Accounts=new Client_Accounts();
print_paid: string;
Employee_Temp:Client_Accounts=new Client_Accounts();
Company_Temp:Company=new Company();
Company_Data:Company[];
Company_Search:Company=new Company();
Print_Company_:Company=new Company();
Total_Amounts:number=0;
Print_Date_:Date;
Image_Url:string;
Company_Sign:string;
Company_Seal:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
Look_In_Date:Boolean=true;
month: any;
day: any;
date:any;
year: any;
Login_User:string="0";
issLoading: boolean;
Permissions: any;
Permissions1: any;
Receipt_Voucher_Edit:boolean;
Receipt_Voucher_Save:boolean;
Receipt_Voucher_Delete:boolean;
Receipt_Voucher_Status:boolean;
Receipt_Voucher_Print:boolean;
Payment_Status_:number;
Employee_:Client_Accounts= new Client_Accounts();
Employee_Data:Client_Accounts[]
Employee_Name:string;
Employee_Id:number;
User_Type:number;
Employee_Edit:boolean=false;
Employee_Save_Edit:boolean=false;

// Sales_Receipt_: Sales_Receipt = new Sales_Receipt();
// Sales_Receipt_Data: Sales_Receipt[];
// Sales_Receipt_Data_Temp: Sales_Receipt[]
constructor(public Receipt_Voucher_Service_:Receipt_Voucher_Service,public User_Details_Service_:User_Details_Service,public Client_Accounts_Service_:Client_Accounts_Service, public Payment_Voucher_Service_:Payment_Voucher_Service,public Journal_Entry_Service_:Journal_Entry_Service,  private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    debugger
this.User_Type=Number(localStorage.getItem('User_Type'));
this.Employee_Name=localStorage.getItem('Employee_Name');
this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
this.Login_User=localStorage.getItem("Login_User"); 
this.Permissions = Get_Page_Permission(98);
this.Permissions1 = Get_Page_Permission(98);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Receipt_Voucher_Edit=this.Permissions.Edit;
this.Receipt_Voucher_Save=this.Permissions.Save;
this.Receipt_Voucher_Delete=this.Permissions.Delete;
this.Receipt_Voucher_Status=this.Permissions1.status;
debugger
this.Page_Load()
}
}
Page_Load()
{
    debugger
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 300;
this.Search_FromDate=this.New_Date(this.Search_FromDate);
this.Search_ToDate=this.New_Date(this.Search_ToDate);
this.Get_Payment_Mode();
this.Clr_Receipt_Voucher();
// this.Clr_Sales_Receipt(); 
this.Search_Receipt_Voucher();

this.Receipt_Voucher_Print=false;
this.Entry_View=false;
debugger
this.Search_Company();
}
trackByFn(index, item) 
{
return index;
}
Create_New()
{
// this.Clr_Sales_Receipt();
this.Clr_Receipt_Voucher();
this.Receipt_Voucher_Print=false;
{
this.Receipt_Voucher_.Payment_Status=0;
}
this.Entry_View = true;


}
// New_Date(Date_)
// {       
// this.date=Date_;
// this.year = this.date.getFullYear();
// this.month = this.date.getMonth() + 1;
// if (this.month < 10) {
// this.month = "0" + this.month;
// }
// this.day = this.date.getDate().toString();
// if (Number.parseInt(this.day) <10) {
// this.day = "0" + this.day;
// }
// this.date = this.year + "-" + this.month + "-" + this.day;
// return this.date;
// }

 New_Date(Date_) {
    // Check if Date_ is undefined or not a Date object
    if (!Date_ || !(Date_ instanceof Date)) {
        // You can throw an error, return a default value, or handle it according to your use case.
        throw new Error("Invalid date input");
    }

    this.date = Date_;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    if (this.month < 10) {
        this.month = "0" + this.month;
    }
    this.day = this.date.getDate().toString();
    if (Number.parseInt(this.day) < 10) {
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
Close_Click()
{

    debugger
// this.Clr_Receipt_Voucher();
// this.Clr_Sales_Receipt();
this.Search_Receipt_Voucher();
this.Entry_View = false;
}
Clr_Receipt_Voucher()
{
this.Receipt_Voucher_.Receipt_Voucher_Id=0;
// this.Receipt_Voucher_.Date=new Date();
// this.Receipt_Voucher_.Date=this.New_Date(this.Receipt_Voucher_.Date);

this.Receipt_Voucher_.Voucher_No=0;
this.Receipt_Voucher_.From_Account_Id=0;
this.Receipt_Voucher_.Amount=0;
this.Receipt_Voucher_.To_Account_Id=0;
this.Receipt_Voucher_.Payment_Mode=0;
this.Receipt_Voucher_.User_Id=0;
this.Receipt_Voucher_.Address1="";
this.Receipt_Voucher_Print=false;



if (this.User_Type==2)
{
this.By_Employee.Client_Accounts_Id=this.Employee_Id;
this.By_Employee.Client_Accounts_Name=this.Employee_Name;
this.Employee_Save_Edit=true;
}
this.Receipt_Voucher_.Description="";
if(this.Payment_Mode_Data!=null && this.Payment_Mode_Data != undefined)
this.Payment_Mode_=this.Payment_Mode_Data[0];
this.Receipt_Voucher_.Payment_Status=0;
this.Receipt_Voucher_Print=false;
}

Clr_Sales_Receipt()
{

}
Search_Company() 
{
this.Receipt_Voucher_Service_.Search_Company().subscribe(Rows => {
this.Company_Data = Rows[0];
this.Print_Company_ = this.Company_Data[0];
},
Rows => 
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}
// Get_Client_Accounts(Client_Accounts_Id,Address1) 
// { 

//     this.Get_Client_Accounts_Change(Client_Accounts_Id);
//     this.Receipt_Voucher_.Address1=Address1;
//     debugger
//     this.Receipt_Voucher_Service_.Sales_receipt_Bill(Client_Accounts_Id).subscribe(Rows => {
//     debugger
//     if (Rows != null) {
//     this.Sales_Receipt_Data = Rows[0];
//     }
//     this.issLoading = false;
//     },
//     Rows => {
//     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
//     });
// }
Get_Client_Accounts_Change(Client_Accounts_Id)
{
this.Client_Accounts_Service_.Get_Client_Accounts(Client_Accounts_Id).subscribe(Rows => {

this.Client_Accounts_Data_ = Rows[0];
this.Print_Client_ = this.Client_Accounts_Data_[0];
},
Rows => 
{
//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}
Print_Click()
{        
this.Get_Client_Accounts_Change(this.Client_Accounts_.Client_Accounts_Id);
this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';  
let popupWinindow
let innerContents = document.getElementById("Print_Div").innerHTML;
popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
popupWinindow.document.open();
popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
popupWinindow.document.close();      
}
Get_Payment_Mode() 
{
this.Payment_Voucher_Service_.Get_Payment_Mode().subscribe(Rows => {
this.Payment_Mode_Data= Rows[0];
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

Employee_Typeahead(event: any)
{

var Value = "";
if (event.target.value == "")
Value = undefined;
else
Value = event.target.value;
{
this.issLoading = true;
this.User_Details_Service_.Employee_Typeahead(2,Value).subscribe(Rows => {

if (Rows != null) {
this.Employee_Data = Rows[0];
}
this.issLoading = false;
},
Rows => {            
this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}
}
display_Employee(Client_Accounts_e: Client_Accounts)
{
if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
}
Accounts_Typeahead(event: any)
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
    });
}
To_Accounts_Typeahead(event: any)
{

this.issLoading=true;
var Value = "";
if (event.target.value == "")
Value = undefined;
else
Value = event.target.value;
this.Journal_Entry_Service_.Accounts_Typeahead('11,4,5',Value).subscribe(Rows => {

if (Rows != null) {
this.To_Client_Accounts_Data = Rows[0];
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
Search_Receipt_Voucher()
{ 
    debugger
    var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0,ClientAccounts_Id=0,Employee_Id=0,Payment_Status_Id=0;
    this.Total_Amounts=0;
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
    if(this.Employee_.Client_Accounts_Id==undefined ||  this.Employee_==undefined || this.Employee_==null)
    Employee_Id=0
    else
    Employee_Id=this.Employee_.Client_Accounts_Id;
    if(this.Payment_Status_==undefined ||  this.Payment_Status_==undefined )
    Payment_Status_Id=0
    else
    Payment_Status_Id=this.Payment_Status_;

    this.issLoading=true;
    debugger
    this.Receipt_Voucher_Service_.Search_Receipt_Voucher(moment(this.Search_FromDate).format('YYYY-MM-DD'),moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value,Payment_Status_Id).subscribe(Rows => {
debugger
    this.Receipt_Voucher_Data=Rows[0];
    this.Total_Entries=this.Receipt_Voucher_Data.length;

    for(var i=0;i<this.Receipt_Voucher_Data.length;i++)
    {
    this.Total_Amounts=Number(this.Total_Amounts)+Number(this.Receipt_Voucher_Data[i].Amount);
    }
    if(this.Receipt_Voucher_Data.length==0)
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
Delete_Receipt_Voucher(Receipt_Voucher_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Receipt_Voucher_Service_.Delete_Receipt_Voucher(Receipt_Voucher_Id).subscribe(Delete_status => {

if(Delete_status[0][0].Receipt_Voucher_Id_>0){
this.Total_Entries=this.Total_Entries-1;
this.Total_Amounts=Number(this.Total_Amounts)-Number(this.Receipt_Voucher_Data[index].Amount);
this.Receipt_Voucher_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
}
else
{
//this.Receipt_Voucher_Data.splice(index, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
}
this.issLoading=false;
},
Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
}
});
}
Save_Receipt_Voucher()
{

    if (this.FromAccount_ == undefined || this.FromAccount_.Client_Accounts_Id == 0 || this.FromAccount_ == null||this.FromAccount_.Client_Accounts_Id==undefined) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select From account', Type: "3" } });
    return
    }

    else if (this.ToAccount_ == undefined || this.ToAccount_ == null || this.ToAccount_.Client_Accounts_Id == undefined || this.ToAccount_.Client_Accounts_Id == 0) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select To Account', Type: "3" } });
        return
    }

    // else if (this.By_Employee == undefined || this.By_Employee == null || this.By_Employee.Client_Accounts_Id == undefined || this.By_Employee.Client_Accounts_Id == 0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Employee', Type: "3" } });
    //     }
    else if(this.Receipt_Voucher_.Amount==undefined||this.Receipt_Voucher_.Amount==null||this.Receipt_Voucher_.Amount==undefined||this.Receipt_Voucher_.Amount==0)
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        return
    }

    else if (this.Payment_Mode_ == null || this.Payment_Mode_ == undefined || this.Payment_Mode_.Payment_Mode_Id == undefined || this.Payment_Mode_.Payment_Mode_Id == 0) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Mode', Type: "3" } });
        return
    }
    // var Sales_Receipt_Check = false;
    // this.Sales_Receipt_Data_Temp = [];
    // for (var j = 0; j < this.Sales_Receipt_Data.length; j++) {
    // if (this.Sales_Receipt_Data[j].Check_Box == true)
    // Sales_Receipt_Check = true
    // }
    // if (Sales_Receipt_Check == false) {
    // const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast one Account', Type: "3" } });
    // return
    // }

    /*for (var j = 0; j < this.Sales_Receipt_Data.length; j++) {
    if (this.Sales_Receipt_Data[j].Check_Box == true)
    if (this.Sales_Receipt_Data[j].Receiving_Amount == 0 || this.Sales_Receipt_Data[j].Discount == 0 || this.Sales_Receipt_Data[j].Receiving_Amount == undefined || this.Sales_Receipt_Data[j].Discount == undefined) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Receiving Amount & Discount', Type: "3" } });
    return
    }
    }
    debugger
    if (this.Sales_Receipt_Data_Temp == undefined || this.Sales_Receipt_Data_Temp == null)
    this.Sales_Receipt_Data_Temp = [];
    for (var m = 0; m < this.Sales_Receipt_Data.length; m++) {
    if (Boolean(this.Sales_Receipt_Data[m].Check_Box) == true) {
    this.Sales_Receipt_Data_Temp.push(Object.assign({}, this.Sales_Receipt_Data[m]));
    }
    }
    */
   // this.Receipt_Voucher_.Sales_Receipt = this.Sales_Receipt_Data_Temp;
    this.Receipt_Voucher_.User_Id=Number(this.Login_User);
    this.Receipt_Voucher_.From_Account_Id=this.FromAccount_.Client_Accounts_Id;
    this.Receipt_Voucher_.FromAccount_Name=this.FromAccount_.Client_Accounts_Name;
    this.Receipt_Voucher_.ToAccount_Name=this.ToAccount_.Client_Accounts_Name;
    this.Receipt_Voucher_.To_Account_Id=this.ToAccount_.Client_Accounts_Id;
    this.Receipt_Voucher_.Student_Id=0;
    // this.Receipt_Voucher_.Employee_Name=this.By_Employee.Client_Accounts_Name;
   // this.Receipt_Voucher_.Employee_Id=0;
    this.Receipt_Voucher_.Payment_Mode=this.Payment_Mode_.Payment_Mode_Id;
    this.Receipt_Voucher_.Date=this.New_Date(new Date(moment(this.Receipt_Voucher_.Date).format('YYYY-MM-DD')));
this.Receipt_Voucher_.Fees_Status=3;

    document.getElementById('Save_Button').hidden=true;
    this.issLoading=true;
    this.Receipt_Voucher_Service_.Save_Receipt_Voucher(this.Receipt_Voucher_).subscribe(Save_status => {
   // Save_status=Save_status[0];
    if(Number(Save_status[0].Receipt_Voucher_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Search_Receipt_Voucher();
    document.getElementById("Save_Button").hidden=true;

    this.Receipt_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
    this.Receipt_Voucher_Print = false;
    }
    else{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    document.getElementById("Save_Button").hidden=true;

    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
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
Edit_Receipt_Voucher(Receipt_Voucher_e:Receipt_Voucher,index)
{

    debugger
    this.Receipt_Voucher_Print = true;
    this.Entry_View=true;
    this.Receipt_Voucher_=Receipt_Voucher_e;

    // this.Print_Date_=new Date ( this.Receipt_Voucher_.Date);
    // this.Print_Date_=this.Print_Date(this.Print_Date_);
   
    this.Receipt_Voucher_=Object.assign({},Receipt_Voucher_e);

    this.print_amount = this.Receipt_Voucher_.Amount;


    this.print_paid = this.numberToEnglish(this.print_amount, "");
    this.FromAccount_Temp.Client_Accounts_Id=Receipt_Voucher_e.From_Account_Id;
    this.FromAccount_Temp.Client_Accounts_Name=Receipt_Voucher_e.FromAccount_Name;
    this.FromAccount_=this.FromAccount_Temp;

    this.ToAccount_Temp.Client_Accounts_Id=Receipt_Voucher_e.To_Account_Id;
    this.ToAccount_Temp.Client_Accounts_Name=Receipt_Voucher_e.ToAccount_Name;
    this.ToAccount_=this.ToAccount_Temp;

    // this.Employee_Temp.Client_Accounts_Id=Receipt_Voucher_e.Employee_Id;
    // this.Employee_Temp.Client_Accounts_Name=Receipt_Voucher_e.Employee_Name;
    // this.By_Employee=this.Employee_Temp;

    for (var i = 0; i < this.Payment_Mode_Data.length; i++)
    {
    if (Receipt_Voucher_e.Payment_Mode == this.Payment_Mode_Data[i].Payment_Mode_Id)
    this.Payment_Mode_ = this.Payment_Mode_Data[i];
    }

    this.issLoading = true;
    debugger
    this.Client_Accounts_Service_.Get_Client_Accounts(Receipt_Voucher_e.To_Account_Id).subscribe(Rows => {
        debugger
        if (Rows != null) {
            this.Client_Accounts_Data_ = Rows[0];
            this.Print_Client_ = this.Client_Accounts_Data_[0];
        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
         this.issLoading = true;
    // this.Receipt_Voucher_Service_.Get_Receipt_Voucher(this.Receipt_Voucher_.Receipt_Voucher_Id).subscribe(Rows => {
    
    //     if (Rows != null) {
    //         this.Sales_Receipt_Data = Rows[0];
        
    //     }
    //     this.issLoading = false;
    // },
    //     Rows => {
            
    //         this.issLoading = false;
    // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    //     });
}
}

