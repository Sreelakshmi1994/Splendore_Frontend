




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase_Master_Service } from '../../../services/Purchase_Master.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Purchase_Master } from '../../../models/Purchase_Master';
import { Purchase_Details } from '../../../models/Purchase_Details';
import { Client_Accounts } from '../../../models/Client_Accounts';
// import { Bill_Type } from '../../../models/Bill_Type';
// import { Item } from '../../../models/Item';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: { dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY', },
};
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Account_Group } from '../../../models/Account_Group';
import { Item_Group } from 'app/models/Item_Group';
import { Company } from 'app/models/Company';
import { Client_Accounts_Service } from 'app/services/Client_Accounts.Service';
import { Receipt_Voucher_Service } from 'app/services/Receipt_Voucher.Service';
import { Purchase_Status } from 'app/models/Purchase_Status';
// import { Item_Group_Service } from '../../../services/Item_Group.service';
// import { Item_Group } from '../../../models/Item_Group';
 @Component({
  selector: 'app-purchase-approval',
  templateUrl: './purchase-approval.component.html',
  styleUrls: ['./purchase-approval.component.scss'],
providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },],
})
export class PurchaseApprovalComponent implements OnInit {
Purchase_Master_Data:Purchase_Master[]
Purchase_Master_:Purchase_Master= new Purchase_Master();
Purchase_Master_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
myHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Purchase_Master_Edit:boolean;
Purchase_Master_Save:boolean;
Purchase_Master_Delete:boolean;
To_Stock_Data:Client_Accounts[]
To_Stock_:Client_Accounts= new Client_Accounts();
To_Stock_Temp_:Client_Accounts=new Client_Accounts();
Supplier_Data:Client_Accounts[]
Supplier_:Client_Accounts= new Client_Accounts();
Search_Supplier:Client_Accounts= new Client_Accounts();
Supplier_Temp:Client_Accounts= new Client_Accounts();
// Bill_Type_Data:Bill_Type[]
// Bill_Type_:Bill_Type= new Bill_Type();
// Bill_Type_Temp:Bill_Type= new Bill_Type();
year:any;
month:any;
day:any;
date:any;
isLoading=false; 
Barcode_Data:Purchase_Details[];
Item_Data:Purchase_Details[]
Purchase_Status_Data: Purchase_Status[];
Purchase_Status_: Purchase_Status = new Purchase_Status();
Purchase_Status_Temp: Purchase_Status = new Purchase_Status();

Purchase_Status_Search_: Purchase_Status = new Purchase_Status();

Item_:Purchase_Details= new Purchase_Details();
Barcode_:Purchase_Details= new Purchase_Details();
Barcode_Temp_:Purchase_Details= new Purchase_Details();
Item_Temp:Purchase_Details= new Purchase_Details();
Purchase_Details_:Purchase_Details=new Purchase_Details();
Purchase_Details_Data:Purchase_Details[];
Purcahse_Master_Index:number;
Purchase_Details_Index:number=-1;
CGST_SUM:number=0;
SGST_SUM:number=0;
IGST_Sum:number=0;
GST_Sum:number=0;
Tot_discount:number=0;

Purchase_Master_Print:boolean;
Tot_Cess:number=0;
Tot_Amount:number=0;
Tot_Net:number=0;
Tot_Gross:number=0;
Tot_Taxamt:number=0;
Edit_CGST:number=0;
Edit_SGST:number=0;
Edit_GST:number=0;
Edit_IGST:number=0;
Edit_Discount:number=0;
Edit_Cess:number=0;
Edit_Totamt:number=0;
Edit_Net:number=0;
Edit_Gross:number=0;
Edit_Tax:number=0;
Amount_In_Words:string;
Search_FromDate: Date = new Date();
Search_ToDate: Date = new Date();
Look_In_Date:Boolean=true;
Voucher_Number:number=0;
Search_Customer:Client_Accounts= new Client_Accounts();
Is_Expiry_Show:boolean=true;
Item_Group_Data : Item_Group[]
Item_Group_ : Item_Group = new Item_Group ()
Item_Group_temp : Item_Group = new Item_Group ()
File: string;
Doc_Photo: any;
ImageFile_Doc: any;
Document_File_Array: any[];


Image_Url:string;
Company_Sign:string;
Company_Seal:string;

Print_Company_:Company=new Company();
Company_Data:Company[];
constructor(public Receipt_Voucher_Service_:Receipt_Voucher_Service,public Client_Accounts_Service_ :Client_Accounts_Service,public Purchase_Master_Service_:Purchase_Master_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(12);
if(this.Permissions==undefined || this.Permissions==null)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
    }
    else
    {
        this.Purchase_Master_Edit=this.Permissions.Edit;
        this.Purchase_Master_Save=this.Permissions.Save;
        this.Purchase_Master_Delete=this.Permissions.Delete;
        this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.myHeight = (window.innerHeight);
    this.myHeight = this.myHeight -400;
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    this.Purchase_Master_.PurchaseDate = new Date(); 
    this.Entry_View=false;
    this.Search_Purchase_Master();
    this.Load_Status()
    // this.Load_Bill_Type();
    this.Clr_Purchase_Master();
    this.Clr_Purchase_Details();
    this.Search_Company();
    
this.Purchase_Master_Print=false;
}
Load_Status() {
  debugger
  this.issLoading = true;
  this.Purchase_Master_Service_.Load_Status().subscribe(
    (Rows) => {
      debugger
      if (Rows != null) {
console.log(Rows[0]);

          debugger
        this.Purchase_Status_Data = Rows[0];
        console.log(this.Purchase_Status_Data);
        
        this.Purchase_Status_Temp.Purchase_Status_Id = 0; 
        this.Purchase_Status_Temp.Purchase_Status_Name = "Select";
        this.Purchase_Status_Data.unshift(this.Purchase_Status_Temp);
        console.log(' this.Purchase_Status_Data: ',  this.Purchase_Status_Data);
        debugger
        this.Purchase_Status_ = this.Purchase_Status_Data[0];
        console.log('  this.Purchase_Status_: ',   this.Purchase_Status_);
this.Purchase_Status_Search_=this.Purchase_Status_Data[1]
        this.issLoading = false;
      }
    },
    (Rows) => {
      this.issLoading = false;
    }
  );
}
Create_New()
{  
    this.Entry_View = true;
    this.Clr_Purchase_Master();
    this.Clr_Purchase_Details();
    this.Purchase_Details_Data=[];
    
this.Purchase_Master_Print=false;
}
Close_Click()
{
    this.Entry_View = false;
    this.Is_Expiry_Show=true;
    this.Purchase_Details_Data=[];
    this.Is_Expiry_Check();
    this.Clr_Purchase_Master();
    this.Clr_Purchase_Details();
}
trackByFn(index, item) 
{
    return index;
}
Is_Expiry_Check()
{
if(this.Purchase_Details_.Is_Expiry==true)
this.Is_Expiry_Show=false;
else
this.Is_Expiry_Show=true;
}
Clr_Purchase_Master()
{
   this.Purchase_Master_.Purchase_Master_Id=0;
   this.Purchase_Master_.Account_Party_Id=0;
   this.Purchase_Master_.Item_Group_Id=0
//    this.Purchase_Master_.Account_Party_Id=0;
   this.Purchase_Master_.PurchaseDate = new Date();
   this.Purchase_Master_.PurchaseDate = this.New_Date(this.Purchase_Master_.PurchaseDate);
//    this.Purchase_Master_.Discount=0;
   this.Purchase_Master_.InvoiceNo="";
//    this.Purchase_Master_.Roundoff=0;
//    this.Purchase_Master_.TotalAmount=0;
//    this.Purchase_Master_.TotalDiscount=0;
//    this.Purchase_Master_.TaxableAmount=0;
//    this.Purchase_Master_.TotalGST=0;
//    this.Purchase_Master_.TotalCGST=0;
//    this.Purchase_Master_.TotalSGST=0;
//    this.Purchase_Master_.TotalIGST=0;
//    this.Purchase_Master_.Other_Charges=0;  
//    this.Purchase_Master_.GrossTotal=0;
   this.Purchase_Master_.NetTotal=0;
//    this.Purchase_Master_.BillType=0;
   this.Purchase_Master_.Description="";
   this.Purchase_Master_.User_Id=0;
   this.Supplier_=null;
   this.Item_Group_=null;
   this.Purchase_Master_.Address1="";
   this.Purchase_Master_.Address2="";
   this.Purchase_Master_.Address3="";
   this.Purchase_Master_.Address4="";
    // this.Purchase_Master_.Transportation_Charge = 0;
    // this.Purchase_Master_.Handling_Charge = 0;
    // this.Purchase_Master_.Isgst = false;
    // this.Purchase_Master_.Transportation_Gst = 0;
    // this.Purchase_Master_.Handling_Gst = 0;
    // this.Purchase_Master_.Transportation_Total = 0;
    // this.Purchase_Master_.Handling_Total = 0;
    // this.Tot_discount=0;
    // this.Tot_Amount=0;
    // this.Tot_Net= 0;
    // this.Tot_Gross=0;
    // this.CGST_SUM=0;
    // this.SGST_SUM= 0;
    // this.IGST_Sum=0;
    // this.GST_Sum=0;     
//    if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
//    this.Bill_Type_=this.Bill_Type_Data[0];
//    this.Item_Group_=null;
//    this.Doc_Photo =""
//    this.ImageFile_Doc = ""
// Edit_Payment_Request_Details

if(this.Purchase_Status_Data!=undefined && this.Purchase_Status_Data!=null)
   this.Purchase_Status_=this.Purchase_Status_Data[0];

   
this.Purchase_Master_Print=false;

}
Clr_Purchase_Details()
{
this.Purchase_Details_Index=-1;
// this.Purchase_Details_.Purchase_Details_Id="";
// this.Purchase_Details_.Purchase_Master_Id=0;
// this.Purchase_Details_.ItemId=0;
// this.Purchase_Details_.Barcode="";
// this.Purchase_Details_.ItemName="";
// this.Purchase_Details_.GroupId=0;
// this.Purchase_Details_.GroupName="";
// this.Purchase_Details_.UnitId=0;
// this.Purchase_Details_.UnitName="";
//     this.Purchase_Details_.StockId = 0;
//     this.Purchase_Details_.To_Employee_Id = 0;
// this.Purchase_Details_.PurchaseRate=0;
// this.Purchase_Details_.SaleRate=0;
// this.Purchase_Details_.MRP=0;
// this.Purchase_Details_.HSNMasterId=0;
// this.Purchase_Details_.Remarks="";
// this.Purchase_Details_.Include_Tax=0;
 this.Purchase_Details_.Rate=0;
this.Purchase_Details_.Quantity=0;
this.Purchase_Details_.Rate=0;
// this.Purchase_Details_.GrossValue=0;
// this.Purchase_Details_.Discount=0;
// this.Purchase_Details_.NetValue=0;
// this.Purchase_Details_.CGST=0;
// this.Purchase_Details_.CGST_AMT=0;
// this.Purchase_Details_.SGST=0;
// this.Purchase_Details_.SGST_AMT=0;
// this.Purchase_Details_.IGST=0;
//     this.Purchase_Details_.IGST_AMT = 0;
     this.Purchase_Details_.Description = "";
     this.Purchase_Details_.Remarks="";
// this.Purchase_Details_.Is_Expiry=false;
// this.Purchase_Details_.Expiry_Date=new Date();
// this.Purchase_Details_.Expiry_Date=this.New_Date(this.Purchase_Details_.Expiry_Date);
// this.Purchase_Details_.GST_Amount=0;
this.Purchase_Details_.TotalAmount=0;
//this.Purchase_Details_.To_Stock_Name="";
//this.Item_=null;
//this.To_Stock_=null;
//this.Barcode_=null;
// this.Edit_CGST=0;
// this.Edit_SGST=0;
// this.Edit_IGST=0;
// this.Edit_GST=0;
// this.Edit_Discount=0;
// this.Edit_Totamt=0;
// this.Edit_Net=0;
// this.Edit_Gross=0;
}
New_Date(Date_) {
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
Amount_Calculation()
{     debugger;
    var rate=0,qty=0,total=0;
    if(this.Purchase_Details_.Rate==undefined || this.Purchase_Details_.Rate==null)
    this.Purchase_Details_.Rate=0;

    rate=this.Purchase_Details_.Rate;

    if(this.Purchase_Details_.Quantity==undefined || this.Purchase_Details_.Quantity==null)
    this.Purchase_Details_.Quantity=0;

    qty=this.Purchase_Details_.Quantity;
    total=rate*qty;
    // if(this.Purchase_Details_.Discount==undefined || this.Purchase_Details_.Discount==null)
    // this.Purchase_Details_.Discount=0;
    // if(this.Purchase_Details_.CGST==undefined || this.Purchase_Details_.CGST==null)
    // this.Purchase_Details_.CGST=0;
    // if(this.Purchase_Details_.SGST==undefined || this.Purchase_Details_.SGST==null)
    // this.Purchase_Details_.SGST=0;
    // if(this.Purchase_Details_.IGST==undefined || this.Purchase_Details_.IGST==null)
    // this.Purchase_Details_.IGST=0;
    this.Purchase_Details_.TotalAmount=Number(total.toFixed(2));
    debugger;
    // this.Purchase_Details_.GrossValue = Number(this.Purchase_Details_.GrossValue.toFixed(2));
    // this.Purchase_Details_.NetValue = Number(this.Purchase_Details_.GrossValue) - Number(this.Purchase_Details_.Discount);
    // this.Purchase_Details_.NetValue = Number(this.Purchase_Details_.NetValue.toFixed(2));
    // this.Purchase_Details_.Include_Tax=Number(this.Purchase_Details_.PurchaseRate)+(Number(this.Purchase_Details_.PurchaseRate)*(Number(this.Purchase_Details_.SaleTax)/100));
    // this.Purchase_Details_.Include_Tax = Number(this.Purchase_Details_.Include_Tax.toFixed(2));
    // if(this.Bill_Type_.Bill_Type_Id==3)
    // {
    // this.Purchase_Details_.CGST_AMT= Number(this.Purchase_Details_.NetValue)*(Number(this.Purchase_Details_.CGST)/100);
    // this.Purchase_Details_.CGST_AMT = Number(this.Purchase_Details_.CGST_AMT.toFixed(2));
    //     this.Purchase_Details_.SGST_AMT = Number(this.Purchase_Details_.NetValue) * (Number(this.Purchase_Details_.SGST) / 100);
    //     this.Purchase_Details_.SGST_AMT = Number(this.Purchase_Details_.SGST_AMT.toFixed(2));
    //     this.Purchase_Details_.GST_Amount = this.Purchase_Details_.CGST_AMT + this.Purchase_Details_.SGST_AMT;
    //     this.Purchase_Details_.GST_Amount = Number(this.Purchase_Details_.GST_Amount.toFixed(2));
    // this.Purchase_Details_.IGST_AMT=0;
    // }
    // else
    // {
    // this.Purchase_Details_.IGST_AMT= Number(this.Purchase_Details_.NetValue)*(Number(this.Purchase_Details_.IGST)/100);
    //     this.Purchase_Details_.IGST_AMT = Number(this.Purchase_Details_.IGST_AMT.toFixed(2));
    // this.Purchase_Details_.GST_Amount=this.Purchase_Details_.IGST_AMT;
    // this.Purchase_Details_.CGST_AMT=0;
    // this.Purchase_Details_.SGST_AMT=0;
    // }
    // this.Purchase_Details_.TotalAmount = this.Purchase_Details_.NetValue + this.Purchase_Details_.GST_Amount;
    // this.Purchase_Details_.TotalAmount = Number(this.Purchase_Details_.TotalAmount.toFixed(2));
}
checkbox_Click()
{ 
    this.Final_Amounts();
}
Final_Amounts()
{
    debugger;
    var Tot_Amount=0,AMT=0;
    for(var i = 0; i< this.Purchase_Details_Data.length ; i++)
    {      
        AMT=Number(this.Purchase_Details_Data[i].TotalAmount);;
        Tot_Amount = Number(Tot_Amount) + Number(AMT);
    }
    this.Purchase_Master_.NetTotal = Number(Tot_Amount.toFixed(2));
    debugger;

  }
Master_Amount_Change()
{          
    // if(this.Purchase_Master_.Roundoff==undefined || this.Purchase_Master_.Roundoff==null)
    // this.Purchase_Master_.Roundoff=0;
    // if(this.Purchase_Master_.Other_Charges==undefined || this.Purchase_Master_.Other_Charges==null)
    // this.Purchase_Master_.Other_Charges=0;
    // if(this.Purchase_Master_.Discount==undefined || this.Purchase_Master_.Discount==null)
    // this.Purchase_Master_.Discount=0;
    // this.Purchase_Master_.TotalAmount= Number(this.Purchase_Master_.NetTotal)+
    // Number(this.Purchase_Master_.Other_Charges)-Number(this.Purchase_Master_.Discount)+
    // Number(this.Purchase_Master_.Roundoff);
}
Delete_Purchase_Master(Purchase_Master_Id,index)
{
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Purchase_Master_Service_.Delete_Purchase_Master(Purchase_Master_Id).subscribe(Delete_status => {
        if(Delete_status[0][0].Purchase_Master_Id_>0){
        this.Purchase_Master_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
        }
        else
        {
     //   this.Purchase_Master_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
        }
        this.issLoading=false;
        },
        Rows => { 
            this.issLoading = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
        }
    });
}
Delete_Purchase_Details(Purchase_Details_e:Purchase_Details,index)
{       
    // this.Purchase_Details_Data.splice(index, 1);
    // this.Edit_CGST=Purchase_Details_e.CGST_AMT
    // this.Edit_SGST=Purchase_Details_e.SGST_AMT;
    // this.Edit_IGST=Purchase_Details_e.IGST_AMT;
    // this.Edit_GST=Purchase_Details_e.GST_Amount;
    // this.Edit_Discount=Number(Purchase_Details_e.Discount);
    // this.Edit_Net=Purchase_Details_e.NetValue+Purchase_Details_e.GST_Amount;
    // this.Edit_Tax=Purchase_Details_e.NetValue;
    // this.Edit_Gross=Purchase_Details_e.GrossValue;
    // this.Edit_Totamt=Purchase_Details_e.TotalAmount;
    // this.CGST_SUM= this.CGST_SUM-this.Edit_CGST;
    // this.SGST_SUM= this.SGST_SUM-this.Edit_SGST;   
    // this.GST_Sum= this.GST_Sum-this.Edit_GST;
    // this.Tot_discount=this.Tot_discount-this.Edit_Discount;
    // this.Tot_Cess=this.Tot_Cess- this.Edit_Cess;
    // this.Tot_Amount=this.Tot_Amount- this.Edit_Totamt;
    // this.Tot_Net=this.Tot_Net- this.Edit_Net;
    // this.Tot_Gross=this.Tot_Gross-this.Edit_Gross;
    // this.Purchase_Master_.GrossTotal=this.Purchase_Master_.GrossTotal-this.Edit_Gross;
    // this.Purchase_Master_.TotalDiscount=this.Purchase_Master_.TotalDiscount-this.Edit_Discount;
    // this.Purchase_Master_.NetTotal= this.Purchase_Master_.NetTotal-this.Edit_Net;
    // this.Purchase_Master_.TotalCGST= this.Purchase_Master_.TotalCGST-this.Edit_CGST;
    // this.Purchase_Master_.TotalSGST=   this.Purchase_Master_.TotalSGST-this.Edit_SGST;
    // this.Purchase_Master_.TotalIGST=  this.Purchase_Master_.TotalIGST-this.Edit_IGST;
    // this.Purchase_Master_.TotalAmount= this.Purchase_Master_.TotalAmount- this.Edit_Totamt;
    // this.Purchase_Master_.TotalGST=   this.Purchase_Master_.TotalGST-this.Edit_GST;
    // //this.Purchase_Master_.GrandTotal= this.Purchase_Master_.GrandTotal-this.Edit_Totamt;      
    // this.Purchase_Master_.TaxableAmount=  this.Purchase_Master_.TaxableAmount-this.Edit_Tax;
    // this.Purchase_Master_.GrossTotal=Number(this.Purchase_Master_.GrossTotal.toFixed(2));
    // this.Purchase_Master_.TotalDiscount=Number(this.Purchase_Master_.TotalDiscount.toFixed(2));
    // this.Purchase_Master_.NetTotal=Number(this.Purchase_Master_.NetTotal.toFixed(2));
    // this.Purchase_Master_.TotalCGST=Number(this.Purchase_Master_.TotalCGST.toFixed(2));
    // this.Purchase_Master_.TotalSGST=Number(this.Purchase_Master_.TotalSGST.toFixed(2));
    // //this.Purchase_Master_.Cess=Number(this.Purchase_Master_.Cess.toFixed(2));
    // this.Purchase_Master_.TotalAmount=Number(this.Purchase_Master_.TotalAmount.toFixed(2));
    // this.Purchase_Master_.TotalGST=Number(this.Purchase_Master_.TotalGST.toFixed(2));
   // this.Round_Off_Calculation();
   // this.Purchase_Master_.GrandTotal=Number(this.Purchase_Master_.GrandTotal.toFixed(2));
 this.Purchase_Details_Data.splice(index, 1);
 this.Final_Amounts();
}
 Search_To_Stock_Typeahead(event: any)
 {
     var Value = "";
     if (event.target.value == "")
     Value = undefined;
     else
     Value = event.target.value;
     {      
     this.issLoading = true;
     this.Purchase_Master_Service_.Search_To_Stock_Typeahead(2,Value).subscribe(Rows => {      
     if (Rows != null) {
     this.To_Stock_Data = Rows[0];
     }
     this.issLoading = false;
     },
     Rows => {      
     this.issLoading = false;
     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
     });
     }
 }
display_To_Stock(Client_Accounts_e: Client_Accounts)
 {
    if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
 }
// Load_Bill_Type()
// {
//     var value=2;
//         this.Purchase_Master_Service_.Load_Bill_Type(value).subscribe(Rows => {     
//         if (Rows != null) {
//         this.Bill_Type_Data = Rows[0];
//         this.Bill_Type_=this.Bill_Type_Data[0];
//         }
//         },
//         Rows => {
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });
// }
Search_Supplier_Typeahead(event: any)
{
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
      {
     this.issLoading = true;
    this.Purchase_Master_Service_.Search_Supplier_Typeahead('1,3',Value).subscribe(Rows => {     
    if (Rows != null) {
        this.Supplier_Data = Rows[0];
    }
    this.issLoading = false;
    },
    Rows => {
     
    this.issLoading = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
 }
display_Supplier(Client_Accounts_e: Client_Accounts) 
    {
    if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
    }
Supplier_Change()
    {
    this.Purchase_Master_.Address1=this.Supplier_.Address1;
    this.Purchase_Master_.Address2=this.Supplier_.Address2;
    this.Purchase_Master_.Address3=this.Supplier_.Address3;
    this.Purchase_Master_.Address4=this.Supplier_.Address4;
    }
Get_Barcode_Purchase(event: any)
{
  var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    {
        this.issLoading = true;
        this.Purchase_Master_Service_.Get_Barcode_Purchase(Value).subscribe(Rows => {
    if (Rows != null) 
    {
        this.Barcode_Data = Rows[0];
    }
    this.issLoading = false;
    },
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:false}});
    });
    }
}
 display_Barcode(Barcode_E: Purchase_Details) 
 {
    if (Barcode_E) { return Barcode_E.Barcode; }
 }
Get_Purchase_Item_Typeahead(event: any)
{
     var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
        {  
            this.issLoading = true;
    this.Purchase_Master_Service_.Get_Purchase_Item_Typeahead(Value).subscribe(Rows => {
  
        if (Rows != null) {
            this.Item_Data = Rows[0];
    }
        this.issLoading = false;
    },
        Rows => {
      this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
    }
 }
 display_Item(Item_: Purchase_Details)
{
    if (Item_) { return Item_.ItemName; }
}
Barcode_Change(Barcode_s:Purchase_Details)
{   
    this.Purchase_Details_=Object.assign({},Barcode_s);
    this.Barcode_Temp_.ItemId=Barcode_s.ItemId;
    this.Barcode_Temp_.ItemName=Barcode_s.ItemName;
    this.Item_=Object.assign({},this.Barcode_Temp_);
// this.Purchase_Details_.ItemId=Barcode_s.ItemId;
// this.Purchase_Details_.ItemName=Barcode_s.ItemName;
// this.Purchase_Details_.UnitId=Barcode_s.UnitId;
// this.Purchase_Details_.UnitName=Barcode_s.UnitName;
// this.Purchase_Details_.SaleTax=Barcode_s.SaleTax;
// this.Purchase_Details_.GroupId=Barcode_s.GroupId;
// this.Purchase_Details_.PurchaseRate=Barcode_s.PurchaseRate;
// this.Purchase_Details_.GroupName=Barcode_s.GroupName;
// this.Purchase_Details_.HSNMasterId=Barcode_s.HSNMasterId;
// this.Purchase_Details_.Barcode=Barcode_s.Barcode;
// this.Purchase_Details_.Quantity=Barcode_s.Quantity;
// this.Purchase_Details_.SaleRate=Barcode_s.SaleRate;
// this.Purchase_Details_.MRP=Barcode_s.MRP;
}
Item_Name_Change(Item_s:Purchase_Details)
{   
    this.Purchase_Details_=Object.assign({},Item_s);
 //if(this.Barcode_==undefined||this.Barcode_==null)
//  if(Item_s.Barcode!="")
//     {
//     this.Item_Temp.StockId=Item_s.StockId;
//     this.Item_Temp.Barcode=Item_s.Barcode;
//     this.Barcode_=Object.assign({},this.Item_Temp);
//     this.Purchase_Details_.Barcode=Item_s.Barcode;
//     }  
      // this.Purchase_Details_.ItemId=Item_s.ItemId;
    // this.Purchase_Details_.ItemName=Item_s.ItemName;
    // this.Purchase_Details_.UnitId=Item_s.UnitId;
    // this.Purchase_Details_.UnitName=Item_s.UnitName;
    // this.Purchase_Details_.SaleTax=Item_s.SaleTax;
    // this.Purchase_Details_.CGST=Item_s.CGST;
    // this.Purchase_Details_.SGST=Item_s.SGST;
    // this.Purchase_Details_.IGST=Item_s.IGST;
    // this.Purchase_Details_.HSNCODE=Item_s.HSNCODE;
    // this.Purchase_Details_.SGST_AMT=Item_s.SGST_AMT;
    // this.Purchase_Details_.CGST_AMT=Item_s.CGST_AMT;
    // this.Purchase_Details_.IGST_AMT=Item_s.IGST_AMT;
    // this.Purchase_Details_.GST_Amount=Item_s.GST_Amount;
    // this.Purchase_Details_.GroupId=Item_s.GroupId;
    // this.Purchase_Details_.PurchaseRate=Item_s.PurchaseRate;
    // this.Purchase_Details_.GroupName=Item_s.GroupName;
    // this.Purchase_Details_.HSNMasterId=Item_s.HSNMasterId;
    // this.Purchase_Details_.Quantity=Item_s.Quantity;
    // this.Purchase_Details_.SaleRate=Item_s.SaleRate;
    // this.Purchase_Details_.MRP=Item_s.MRP;
    // this.Purchase_Details_.GroupId=Item_s.GroupId;
    // this.Purchase_Details_.GroupName=Item_s.GroupName; 
}
// Search_Purchase_Master()
// {
// this.issLoading=true;
// this.Purchase_Master_Service_.Search_Purchase_Master('').subscribe(Rows => {
//  this.Purchase_Master_Data=Rows[0];
// this.Total_Entries=this.Purchase_Master_Data.length;
//     if(this.Purchase_Master_Data.length==0)
//     {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
//     }
//     this.issLoading = false;
//  },
//  Rows => { 
//      this.issLoading = false;
// const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
//     });
// }
Search_Purchase_Master()
{ 
  let Status=1;
var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0;
if (this.Purchase_Status_Search_.Purchase_Status_Id != undefined && this.Purchase_Status_Search_.Purchase_Status_Id != null)
Status= this.Purchase_Status_Search_.Purchase_Status_Id;
if (this.Look_In_Date == true )
look_In_Date_Value = 1;
if (this.Search_Customer != undefined && this.Search_Customer!=null)
if (this.Search_Customer.Client_Accounts_Id != undefined && this.Search_Customer.Client_Accounts_Id != null)
ClientAccount= this.Search_Customer.Client_Accounts_Id;
if (this.Voucher_Number != undefined && this.Voucher_Number != null && this.Voucher_Number != 0)
Voucher_No_search_ = this.Voucher_Number;
this.issLoading=true;
 this.Purchase_Master_Service_.Search_Purchase_Master(look_In_Date_Value,moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,Voucher_No_search_,Status).subscribe(Rows => {
 this.Purchase_Master_Data=Rows[0];
 console.log('this.Purchase_Master_Data: ', this.Purchase_Master_Data);
 this.Total_Entries=this.Purchase_Master_Data.length;
    if(this.Purchase_Master_Data.length==0)
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
Plus_Purchase_Details()
{     
    debugger
    // if(this.Item_==undefined || this.Item_==null || this.Item_.ItemId==undefined || this.Item_.ItemId==0 )
    // {
    //     const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select The Item',Type: "3" }});
    //     return
    // }
    // else if(this.Purchase_Details_.PurchaseRate==undefined || this.Purchase_Details_.PurchaseRate==null || this.Purchase_Details_.PurchaseRate==0 )
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Purchase Rate',Type: "3" }});
    //     return
    // }
     if(this.Purchase_Details_.Quantity==undefined || this.Purchase_Details_.Quantity==null || this.Purchase_Details_.Quantity==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Quantity',Type: "3" }});
        return
    }
    if(this.Purchase_Details_.Description==undefined || this.Purchase_Details_.Description==null || this.Purchase_Details_.Description=='' )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Description',Type: "3" }});
        return
    }
     if(this.Purchase_Details_.Remarks==undefined || this.Purchase_Details_.Remarks==null || this.Purchase_Details_.Remarks=='' )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Remarks',Type: "3" }});
        return
    }
    // if(this.To_Stock_==undefined || this.To_Stock_==null || this.To_Stock_.Client_Accounts_Id==undefined || this.To_Stock_.Client_Accounts_Id==0 )
    // {
    //     const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select To Stock',Type: "3" }});
    //     return
    // }
    // else if(this.Purchase_Details_.MRP==undefined || this.Purchase_Details_.MRP==null || this.Purchase_Details_.MRP==0 )
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter MRP',Type: "3" }});
    //     return
    // }
    // else if(this.Purchase_Details_.SaleRate==undefined || this.Purchase_Details_.SaleRate==null || this.Purchase_Details_.SaleRate==0 )
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Sale Rate',Type: "3" }});
    //     return
    // }
    // else if ( this.Purchase_Details_.Quantity_Kg == null|| this.Purchase_Details_.Quantity_Kg == undefined)
    // {
    //     this.Purchase_Details_.Quantity_Kg =0
    // }    
    else
    {   
        if(this.Purchase_Details_Data==undefined)
this.Purchase_Details_Data=[]; 
//document.getElementById("BARCODE").nodeValue = this.Barcode_.Barcode;
//this.Stock_Add_Details_.Barcode=(document.getElementById("BARCODE").value); 
//this.Stock_Add_Details_.Barcode= Object.assign({},this.Barcode_.Barcode);
// if( this.Barcode_==null)
// {
//  //   const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     //this.Purchase_Details_.Barcode=Barcode_string;
//     this.Purchase_Details_.Barcode='';
// }
//  else if(this.Barcode_.Barcode==undefined ||this.Barcode_.Barcode==null)
// {
//     // const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     // this.Purchase_Details_.Barcode=Barcode_string;
//     this.Purchase_Details_.Barcode='';
// }
// else if(this.Barcode_.Barcode!=undefined && this.Barcode_.Barcode!=null)
// {
//     this.Purchase_Details_.Barcode=  this.Barcode_.Barcode;
// }
// else if(this.Barcode_!=undefined && this.Barcode_!=null)
// {
//     const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     this.Purchase_Details_.Barcode=  Barcode_string;
// }       

debugger
// var prate=0;var peprs=8;var psale=0;var pmrp=0;var pv=0;
// if(this.Purchase_Details_.PurchaseRate!=null || this.Purchase_Details_.PurchaseRate!=undefined)
// prate=this.Purchase_Details_.PurchaseRate;
// pv=prate*peprs/100;
//  pv=Number(pv.toFixed(2));
// psale=Number(prate)+pv;
// this.Purchase_Details_.SaleRate=Number(psale.toFixed(2));  ;
// this.Purchase_Details_.MRP=psale;

       // this.Purchase_Details_.Expiry_Date=this.New_Date(new Date(moment(this.Purchase_Details_.Expiry_Date).format('YYYY-MM-DD')));
        // this.Purchase_Details_.ItemId=this.Item_.ItemId;
        // this.Purchase_Details_.ItemName=this.Item_.ItemName;
        // this.Purchase_Details_.To_Employee_Id=this.To_Stock_.Client_Accounts_Id;
        // this.Purchase_Details_.To_Stock_Name=this.To_Stock_.Client_Accounts_Name;        
        if (this.Purchase_Details_Index >= 0) {
            this.Purchase_Details_Data[this.Purchase_Details_Index] = Object.assign({}, this.Purchase_Details_);
            }
        else {
            this.Purchase_Details_Data.push(Object.assign({}, this.Purchase_Details_));
              }               
this.Final_Amounts();
this.Purchase_Details_Index=-1;
this.Clr_Purchase_Details();
}
}
Save_Purchase_Master()
{debugger
if(this.Purchase_Details_Data==undefined || this.Purchase_Details_Data==null || this.Purchase_Details_Data.length==0 || this.Purchase_Details_Data.length==undefined )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Please Add Details',Type: "3" }});
        return
    }
else if(this.Supplier_==undefined || this.Supplier_==null )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Supplier',Type: "3" }});
        return
    }
else if(this.Supplier_.Client_Accounts_Id==undefined||this.Supplier_==undefined || this.Supplier_==null ||this.Supplier_.Client_Accounts_Id==0)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Supplier',Type: "3" }});
    return
  } 
else if(this.Purchase_Master_.PurchaseDate==undefined || this.Purchase_Master_.PurchaseDate==null)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Bill Date',Type: "3" }});
    return
  }
  else if(this.Purchase_Master_.Description==undefined || this.Purchase_Master_.Description==null || this.Purchase_Master_.Description=='')
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Description',Type: "3" }});
    return
  }
//   else  if(this.Purchase_Master_.InvoiceNo==undefined || this.Purchase_Master_.InvoiceNo==null ||  this.Purchase_Master_.InvoiceNo=="")
//     {
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Invoice No',Type: "3" }});
//         return
//     }
 else if(this.Purchase_Details_Data==undefined || this.Purchase_Details_Data==null || this.Purchase_Details_Data.length==0 || this.Purchase_Details_Data.length==undefined )
    {
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type: "3" }});
       return
    }
    else 
    {   debugger    
      this.Purchase_Master_.Purchase_Status_Id=this.Purchase_Status_.Purchase_Status_Id;

        // this.Purchase_Master_.BillType=this.Bill_Type_.Bill_Type_Id;
        this.Purchase_Master_.Account_Party_Id=this.Supplier_.Client_Accounts_Id;
        this.Purchase_Master_.Purchase_Details=this.Purchase_Details_Data;
       // this.Purchase_Master_.Document_Name = this.Doc_Photo;
        this.Purchase_Master_.Item_Group_Id=this.Item_Group_.Item_Group_Id;
        // this.Purchase_Master_.Item_Group_Name=this.Item_Group_.Item_Group_Name;
    // document.getElementById('Save_Button').hidden=true;
    debugger
    this.Purchase_Master_.PurchaseDate = this.New_Date(new Date(moment(this.Purchase_Master_.PurchaseDate).format('YYYY-MM-DD')));
   // this.Purchase_Master_.Entry_Date = this.New_Date(new Date(moment(this.Purchase_Master_.Entry_Date).format('YYYY-MM-DD')));
       this.issLoading=true;     
       
       let loginUser= parseInt(localStorage.getItem('Login_User'))
       console.log('loginUser: ', loginUser);
       this.Purchase_Master_.Approved_By=loginUser
   this.Purchase_Master_Service_.Save_Purchase_Master(this.Purchase_Master_).subscribe(Save_status => {               
   // Save_status=Save_status[0];
    if(Number(Save_status[0][0].Purchase_Master_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Clr_Purchase_Details();
    this.Clr_Purchase_Master();
    this.Purchase_Details_Data=[];
    this.Search_Purchase_Master();
    }
    else if (Number(Save_status[0].Purchase_Master_Id_) == -1)
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Bill No Already Exists', Type: "2" } });
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
}
Print_Click()
{
           
//   this.Get_Client_Accounts();

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
        this.Client_Accounts_Service_.Get_Client_Accounts(this.Supplier_.Client_Accounts_Id).subscribe(Rows => {
            debugger;
        // this.Client_Accounts_Data_ = Rows[0];
      //  this.Company_Info = Rows[0];
        // this.Company_Temp.Company_Id = 0;
        // this.Company_Temp.Company_Name = "Select";
        // this.Company_Data.unshift(this.Company_Temp);
        // this.Print_Client_ = this.Client_Accounts_Data_[0];
},
Rows => 
{
//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}

Edit_Purchase_Master(Purchase_Master_e:Purchase_Master,index)
{  debugger
    this.Purcahse_Master_Index=index;
    this.Purchase_Master_=Object.assign({},Purchase_Master_e);
    
this.Purchase_Master_Print=true;    
    this.Supplier_Temp.Client_Accounts_Id=Purchase_Master_e.Account_Party_Id;
    this.Supplier_Temp.Client_Accounts_Name=Purchase_Master_e.Client_Accounts_Name;

    this.Purchase_Master_.Client_Accounts_Name=Purchase_Master_e.Client_Accounts_Name;


    
    this.Supplier_=Object.assign({},this.Supplier_Temp);
    // this.Doc_Photo = this.Purchase_Master_.Document_Name;
    this.Item_Group_temp.Account_Group_Id=Purchase_Master_e.Account_Group_Id;
    this.Item_Group_temp.Item_Group_Id=Purchase_Master_e.Account_Group_Id;
    this.Item_Group_temp.Group_Name=Purchase_Master_e.Group_Name;
    this.Purchase_Master_.Group_Name=Purchase_Master_e.Group_Name;


    this.Item_Group_=Object.assign({},this.Item_Group_temp);
  
    // for(var i=0;i<this.Bill_Type_Data.length;i++)
    // {
    //     if(this.Bill_Type_Data[i].Bill_Type_Id==Purchase_Master_e.BillType)
    //     {
    //         this.Bill_Type_=this.Bill_Type_Data[i];
    //     }
    // }
    for (var i = 0; i < this.Purchase_Status_Data.length; i++) {
      if (this.Purchase_Master_.Purchase_Status_Id == this.Purchase_Status_Data[i].Purchase_Status_Id)
        this.Purchase_Status_ = this.Purchase_Status_Data[i];
    }
    console.log('this.Purchase_Status_ : ', this.Purchase_Status_ );
    console.log('Purchase_Master_e: ', Purchase_Master_e);
    this.Purchase_Master_Service_.Get_Purchase_Details(Purchase_Master_e.Purchase_Master_Id).subscribe(Rows => {         
    if (Rows != null) {
    this.Purchase_Details_Data = Rows[0];
    this.issLoading = false;
    }    
    },
    Rows => {     
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });    
    this.Entry_View=true;
    this.Purchase_Master_=Purchase_Master_e;
    this.Purchase_Master_=Object.assign({},Purchase_Master_e);
}
Edit_Purchase_Details(Purchase_Details_e:Purchase_Details,index)
{   
    this.To_Stock_=null;
    this.Purchase_Details_Index=index;
    this.Purchase_Details_=Object.assign({},Purchase_Details_e);
    
 
}
Get_Item_Group(event: any) {
    debugger
    var Value = "";
    if (event.target.value == "") Value = undefined;
    else Value = event.target.value;
    this.issLoading = true;
    debugger
    this.Purchase_Master_Service_.Search_Item_Group('1,3',Value).subscribe(
        (Rows) => {
            debugger
            if (Rows != null) {
                this.Item_Group_Data = Rows[0];
            }
            this.issLoading = false;
        },
        (Rows) => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, {
                panelClass: "Dialogbox-Class",
                data: { Message: "Error Occured", Type: "2" },
            });
        }
    );
}
display_Item_Group(Item_Group_: Account_Group) {
    if (Item_Group_) {
        return Item_Group_.Group_Name;
    }
}
File_Change_Vat(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    this.ImageFile_Doc = file;
    this.Doc_Photo = this.ImageFile_Doc[0].name;
}
}