import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment_Voucher_Service } from '../../../services/Payment_Voucher.Service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Payment_Voucher } from '../../../models/Payment_Voucher';

import { Client_Accounts } from '../../../models/Client_Accounts';
import { Company } from '../../../models/Company';
import { PaymentMode } from '../../../models/PaymentMode';
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

import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Payment_Request_Service } from 'app/services/Payment_Request.Service';

@Component({
selector: 'app-Payment_Voucher',
templateUrl: './Payment_Voucher.component.html',
styleUrls: ['./Payment_Voucher.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],

})
export class Payment_VoucherComponent implements OnInit {
Payment_Voucher_Data:Payment_Voucher[]
Payment_Voucher_:Payment_Voucher= new Payment_Voucher();
Payment_Voucher_Name_Search:string;

Payment_Mode_Data:PaymentMode[]
Payment_Mode_:PaymentMode=new PaymentMode();
Mode_Temp:PaymentMode=new PaymentMode();
FromAccount_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data:Client_Accounts[]
From_Client_Accounts_Data:Client_Accounts[]
Print_Client_:Client_Accounts=new Client_Accounts();
Client_Accounts_Data_:Client_Accounts[]
Company_Temp:Company=new Company();
Company_Data:Company[];
Company_Search:Company=new Company();
Print_Company_:Company=new Company();

Image_Url:string;
Company_Sign:string;
Company_Seal:string;
Amount:number;
ToAccount_:Client_Accounts=new Client_Accounts();
Search_FromDate:Date=new Date();
Search_ToDate:Date=new Date();
FromAccount_Search:Client_Accounts=new Client_Accounts();
Client_Accounts_Name:string;
Group_Name:string;
ToAccount_Search:Client_Accounts=new Client_Accounts();
Voucher_No_search:number;
FromAccount_Temp:Client_Accounts=new Client_Accounts();
ToAccount_Temp:Client_Accounts=new Client_Accounts();

print_paid: string;
print_amount: number;
Payment_Request_Id:number;
Print_Date_:Date;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
Total_Amounts:number=0;
Look_In_Date:Boolean=true;
month: any;
day: any;
date:any;
year: any;
Login_User:string="0";
issLoading: boolean;
Permissions: any;
Permissions1:any;
Payment_Voucher_Edit:boolean;
Payment_Voucher_Save:boolean;
Payment_Voucher_Delete:boolean;
Payment_Voucher_Status:boolean;
Payment_Voucher_Print:boolean;

// Purchase_Payment_:Purchase_Payment=new Purchase_Payment;
// Purchase_Payment_Data:Purchase_Payment[];
//     Purchase_Payment_Data_temp: Purchase_Payment[]
constructor(public Payment_Request_Service_:Payment_Request_Service,public Payment_Voucher_Service_:Payment_Voucher_Service,public Client_Accounts_Service_:Client_Accounts_Service,public Receipt_Voucher_Service_:Receipt_Voucher_Service, public Journal_Entry_Service_:Journal_Entry_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Login_User=localStorage.getItem("Login_User");   
this.Permissions = Get_Page_Permission(96);
this.Permissions1=Get_Page_Permission(96);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Payment_Voucher_Edit=this.Permissions.Edit;
this.Payment_Voucher_Save=this.Permissions.Save;
this.Payment_Voucher_Delete=this.Permissions.Delete;
this.Payment_Voucher_Status=this.Permissions1.status;
this.Page_Load()
}
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

Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 300;
 
//this.Accounts_Typeahead();
this.Search_FromDate=this.New_Date(this.Search_FromDate);
this.Search_ToDate=this.New_Date(this.Search_ToDate);
this.Clr_Payment_Voucher();
this.Search_Payment_Voucher();
this.Get_Payment_Mode();
    this.Clr_Purchase_Payment();
this.Entry_View=false;
this.Payment_Voucher_Print=false;
 this.Search_Company();

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


From_Accounts_Typeahead(event: any)
{
     
    this.issLoading=true;
var Value = "";
if (event.target.value == "")
Value = undefined;
else
Value = event.target.value;
 
this.Journal_Entry_Service_.Accounts_Typeahead('11,4,5',Value).subscribe(Rows => {
     
if (Rows != null) {
this.From_Client_Accounts_Data = Rows[0];
//this.Print_Client_=this.Client_Accounts_Data[0];
}
this.issLoading=false;
},
Rows => {
    this.issLoading=false;
});
}

Accounts_Typeahead(event: any)
{
     
   this.issLoading=true;
var Value = "";
if (event.target.value == "")
Value = undefined;
else
Value = event.target.value;
debugger;
this.Receipt_Voucher_Service_.Get_Client_Accounts_Typeahead(Value).subscribe(Rows => {
     debugger;
if (Rows != null) {
this.Client_Accounts_Data = Rows[0];
//this.Print_Client_=this.Client_Accounts_Data[0];
}

this.issLoading=false;
},
Rows => {
    this.issLoading=false;
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
PR_Change(prno){
    debugger
     this.Payment_Request_Service_.PR_Change(prno).subscribe(
        Rows => {
            debugger
   
                 
                // this.Account_Party_Id = Rows[0][0].Account_Party_Id;
                this.Client_Accounts_Name = Rows[0][0].Client_Accounts_Name;
                // this.Supplier_Temp.Client_Accounts_Id=this.Account_Party_Id;
               
                // this.Supplier_Temp.Client_Accounts_Name=this.Client_Accounts_Name;


                // this.Item_Group_Id = Rows[0][0].Item_Group_Id;
                this.Group_Name = Rows[0][0].Group_Name;
                this.Amount = Rows[1][0].Total;
                // this.Item_Group_temp.Item_Group_Id=this.Item_Group_Id;
                // this.Item_Group_temp.Group_Name=this.Group_Name;

    //             this.Item_Group_=Object.assign({},this.Item_Group_temp);
    this.Payment_Voucher_.PurchaseDate=Rows[0][0].Payment_RequestDate
                this.Payment_Request_Id=Rows[0][0].Payment_Request_Id
  
    // this.Supplier_=Object.assign({},this.Supplier_Temp);

    // this.Purchase_Master_Service_.Get_Purchase_Details(this.Purchase_Master_Id).subscribe(Rows => {         
    //     if (Rows != null) {
    //     this.Payment_Request_Details_Data = Rows[0];
    //     this.issLoading = false;
    //     }    
    //     },
    //     Rows => {     
    //     this.issLoading = false;
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    //     });
             
        },

     )

     

}

Get_Payment_Mode() 
        {
               debugger;  
        this.Payment_Voucher_Service_.Get_Payment_Mode().subscribe(Rows => {
            debugger;      
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
Create_New()
{
this.Payment_Voucher_Print=false;
this.Clr_Payment_Voucher();
    this.Clr_Purchase_Payment();
     
//if(this.Receipt_Voucher_Status==true)
{
    this.Payment_Voucher_.Payment_Status=0;
   }
this.Entry_View = true;

}
Close_Click()
{
    this.Clr_Purchase_Payment();
    this.Search_Payment_Voucher();
this.Clr_Payment_Voucher();
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}
    Address_Change(FromAccount1)
{ 
    
   // this.Get_Client_Accounts_Change(Client_Accounts_Id);
        this.Payment_Voucher_.Address1 =FromAccount1.Address1;
    
    // this.Payment_Voucher_Service_.SelectSettledBills(FromAccount1.Client_Accounts_Id).subscribe(Rows => {

    //     if (Rows != null) {
    //     this.Purchase_Payment_Data = Rows[0];
    //     }
    //     this.issLoading = false;
    // },
    //     Rows => {
    //          const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    //     });

}
 Clr_Payment_Voucher()
 {
    this.Payment_Voucher_.PurchaseDate=null
    this.Payment_Voucher_.prno=0;
    this.Payment_Voucher_.Payment_Voucher_Id=0;
    this.Payment_Voucher_.Date=new Date();
    this.Payment_Voucher_.Date=this.New_Date(this.Payment_Voucher_.Date);
    this.Payment_Voucher_.Voucher_No=0;
    this.Payment_Voucher_.From_Account_Id=0;
    this.Payment_Voucher_.Amount=0;
    this.Payment_Voucher_.To_Account_Id=0;
    this.Payment_Voucher_.Payment_Mode=0;
    this.Payment_Voucher_.User_Id=0;
    this.Client_Accounts_Name=""
    this.Group_Name=""
    this.Amount=0;
    this.Payment_Request_Id=0
    // this.FromAccount_=;
    // this.ToAccount_=;
    this.Payment_Voucher_.Address1="";
    if(this.Payment_Mode_Data!=null && this.Payment_Mode_Data != undefined)
    this.Payment_Mode_=this.Payment_Mode_Data[1];
    this.Payment_Voucher_.Payment_Status=0;
    this.Payment_Voucher_.Description="";
    this.Payment_Voucher_Print=false;
}
 Clr_Purchase_Payment()
 {
    //  this.Purchase_Payment_.Purchase_Payment_Id = 0;
    //  this.Purchase_Payment_.Purchase_Payment_Id = 0;
    // this.Purchase_Payment_.Payment_Voucher_Id=0;
    // this.Purchase_Payment_.Date=new Date();
    // this.Purchase_Payment_.Date=this.New_Date(this.Purchase_Payment_.Date);
    //  this.Purchase_Payment_.Account_Party_Id = 0;
    //  this.Purchase_Payment_.Paying_Amount = 0;
    //  this.Purchase_Payment_.Discount = 0;
    //  this.Purchase_Payment_.NetTotal = 0;
    //  this.Purchase_Payment_.BalAmt = 0;
    //  this.Purchase_Payment_Data=[];
}
Search_Payment_Voucher()
    { 
        var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0,ClientAccounts_Id=0;
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

        this.issLoading=true;
        debugger;
    this.Payment_Voucher_Service_.Search_Payment_Voucher(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value).subscribe(Rows => {
        debugger;
        this.Payment_Voucher_Data=Rows[0];
    
    this.Total_Entries=this.Payment_Voucher_Data.length;

    for(var i=0;i<this.Payment_Voucher_Data.length;i++)
    {
            this.Total_Amounts=Number(this.Total_Amounts)+Number(this.Payment_Voucher_Data[i].Amount);
    }
    if(this.Payment_Voucher_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
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
Delete_Payment_Voucher(Payment_Voucher_Id,index)
{
         
    const dialogRef = this.dialogBox.open
    ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Payment_Voucher_Service_.Delete_Payment_Voucher(Payment_Voucher_Id).subscribe(Delete_status => {
         
    if(Delete_status[0][0].Payment_Voucher_Id_>0){
        this.Total_Entries=this.Total_Entries-1;
        this.Total_Amounts=Number(this.Total_Amounts)-Number(this.Payment_Voucher_Data[index].Amount);
    this.Payment_Voucher_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    }
    else
    {
    //this.Payment_Voucher_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
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
Save_Payment_Voucher()
{
    debugger;
    if (this.FromAccount_ == undefined || this.FromAccount_.Client_Accounts_Id == 0 || this.FromAccount_ == null||this.FromAccount_.Client_Accounts_Id==undefined) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The From account', Type: "3" } });
        return
    }

        else if(this.ToAccount_==undefined||this.ToAccount_==null||this.ToAccount_.Client_Accounts_Id==undefined||this.ToAccount_.Client_Accounts_Id==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The To Account', Type: "3" } });
        return
        }
        else if(this.Payment_Voucher_.Amount==undefined||this.Payment_Voucher_.Amount==null||this.Payment_Voucher_.Amount==undefined||this.Payment_Voucher_.Amount==0)
        {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Amount', Type: "3" } });
        return
        }
        
        else if (this.Payment_Mode_ == null ||this.Payment_Mode_ == undefined || this.Payment_Mode_.Payment_Mode_Id == undefined || this.Payment_Mode_.Payment_Mode_Id == 0) {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select The Payment Mode', Type: "3" } });
        return
        }
     /*   var Purchase_Payment_Check = false;
    this.Purchase_Payment_Data_temp = [];
    for (var j = 0; j < this.Purchase_Payment_Data.length; j++) {
            if (this.Purchase_Payment_Data[j].Check_Box == true)
                Purchase_Payment_Check = true
        }
    if (Purchase_Payment_Check == false) {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Select Atleast one Account', Type: "3" } });
            return
        }

    for (var j = 0; j < this.Purchase_Payment_Data.length; j++) {
        if (this.Purchase_Payment_Data[j].Check_Box == true)
            if (this.Purchase_Payment_Data[j].Paying_Amount == 0 || this.Purchase_Payment_Data[j].Discount == 0 || this.Purchase_Payment_Data[j].Paying_Amount == undefined || this.Purchase_Payment_Data[j].Discount == undefined) {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Paying Amount & Discount', Type: "3" } });
                    return
                }
        }*/
        debugger
    /*if (this.Purchase_Payment_Data_temp == undefined || this.Purchase_Payment_Data_temp == null)
        this.Purchase_Payment_Data_temp = [];
    for (var m = 0; m < this.Purchase_Payment_Data.length; m++) {
        if (Boolean(this.Purchase_Payment_Data[m].Check_Box) == true) {
            this.Purchase_Payment_Data_temp.push(Object.assign({}, this.Purchase_Payment_Data[m]));
        }
    }
    this.Payment_Voucher_.Purchase_Payment = this.Purchase_Payment_Data_temp;*/
    this.Payment_Voucher_.User_Id=Number(this.Login_User);
    this.Payment_Voucher_.From_Account_Id=this.FromAccount_.Client_Accounts_Id;
    this.Payment_Voucher_.To_Account_Id=this.ToAccount_.Client_Accounts_Id;
    this.Payment_Voucher_.Payment_Mode=this.Payment_Mode_.Payment_Mode_Id;

this.Payment_Voucher_.prno=this.Payment_Voucher_.prno
this.Payment_Voucher_.Payment_Request_Id=this.Payment_Request_Id

    this.Payment_Voucher_.Date=this.New_Date(new Date(moment(this.Payment_Voucher_.Date).format('YYYY-MM-DD')));

document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
this.Payment_Voucher_Service_.Save_Payment_Voucher(this.Payment_Voucher_).subscribe(Save_status => {
    debugger
     
// Save_status=Save_status[0];
if(Number(Save_status[0].Payment_Voucher_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Payment_Voucher_Print=true;
this.Payment_Voucher_.Voucher_No=Save_status[0].Voucher_No_;
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
     
this.issLoading=false;
      
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}


Edit_Payment_Voucher(Payment_Voucher_e:Payment_Voucher,index)
{debugger

    this.Entry_View = true;
    this.Payment_Voucher_ = Payment_Voucher_e;

    // this.Print_Date_ = new Date(this.Payment_Voucher_.Date);
    // this.Print_Date_ = this.Print_Date(this.Print_Date_);

    this.Payment_Voucher_Print = true;

    this.Payment_Voucher_ = Object.assign({}, this.Payment_Voucher_);
    this.print_amount = this.Payment_Voucher_.Amount;



    this.print_paid = this.numberToEnglish(this.print_amount, "");
    this.FromAccount_Temp.Client_Accounts_Id = this.Payment_Voucher_.From_Account_Id;
    this.FromAccount_Temp.Client_Accounts_Name = this.Payment_Voucher_.FromAccount_Name;
    this.FromAccount_ = this.FromAccount_Temp;

    this.ToAccount_Temp.Client_Accounts_Id = Payment_Voucher_e.To_Account_Id;
    this.ToAccount_Temp.Client_Accounts_Name = Payment_Voucher_e.ToAccount_Name;
    this.ToAccount_ = this.ToAccount_Temp;


    for (var i = 0; i < this.Payment_Mode_Data.length; i++) {
        if (this.Payment_Voucher_.Payment_Mode == this.Payment_Mode_Data[i].Payment_Mode_Id)
            this.Payment_Mode_ = this.Payment_Mode_Data[i];

    }
    debugger
    this.Payment_Voucher_.prno=this.Payment_Voucher_.prno
    this.PR_Change(this.Payment_Voucher_.prno);

this.issLoading=true;
    this.Client_Accounts_Service_.Get_Client_Accounts(this.Payment_Voucher_.From_Account_Id).subscribe(Rows => {
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
    // this.Payment_Voucher_Service_.Get_Purchase_Payment(this.Payment_Voucher_.Payment_Voucher_Id).subscribe(Rows => {
    
    //     if (Rows != null) {
    //         this.Purchase_Payment_Data = Rows[0];
        
    //     }
    //     this.issLoading = false;
    // },
    //     Rows => {
            
    //         this.issLoading = false;
    // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    //     });
}
}

