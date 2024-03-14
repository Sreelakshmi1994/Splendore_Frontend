import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment_Request_Service } from '../../../services/Payment_Request.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Payment_Request } from '../../../models/Payment_Request';
import { Payment_Request_Details } from '../../../models/Payment_Request_Details';
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
import { Item_Group } from '../../../models/Item_Group';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.Service';
import { Company } from '../../../models/Company';
import { Purchase_Master_Service } from '../../../services/Purchase_Master.Service';
import { Payment_Status } from '../../../models/Payment_Status';
// import { Item_Group_Service } from '../../../services/Item_Group.service';
// import { Item_Group } from '../../../models/Item_Group';
 @Component({
selector: 'app-Payment_Approval',
templateUrl: './Payment_Approval.component.html',
styleUrls: ['./Payment_Approval.component.css'],
providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },],
})
export class Payment_ApprovalComponent implements OnInit {
Payment_Request_Data:Payment_Request[]
Payment_Request_:Payment_Request= new Payment_Request();
Payment_Request_Name_Search:string;
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
Payment_Request_Edit:boolean;
Payment_Request_Save:boolean;
Payment_Request_Delete:boolean;
To_Stock_Data:Client_Accounts[]
To_Stock_:Client_Accounts= new Client_Accounts();
Purchase_Master_Id:number;
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

Payment_Status_Search_: Payment_Status = new Payment_Status();
isLoading=false; 
Barcode_Data:Payment_Request_Details[];
Item_Data:Payment_Request_Details[]
Item_:Payment_Request_Details= new Payment_Request_Details();
Barcode_:Payment_Request_Details= new Payment_Request_Details();
Barcode_Temp_:Payment_Request_Details= new Payment_Request_Details();
Item_Temp:Payment_Request_Details= new Payment_Request_Details();
Payment_Request_Details_:Payment_Request_Details=new Payment_Request_Details();
Payment_Request_Details_Data:Payment_Request_Details[];
Purcahse_Master_Index:number;
Payment_Request_Details_Index:number=-1;
CGST_SUM:number=0;
SGST_SUM:number=0;
IGST_Sum:number=0;
GST_Sum:number=0;
Tot_discount:number=0;
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
Account_Party_Id:number;
 Item_Group_Id :number;
Group_Name :string;
Client_Accounts_Name:string;
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
Payment_Request_Data_:Payment_Request[]
 Payment_Request_Print:boolean;
Print_Company_:Company=new Company();
Company_Data:Company[];


Payment_Status_: Payment_Status = new Payment_Status();
Payment_Status_Temp: Payment_Status = new Payment_Status();
  Payment_Status_Data: Payment_Status[];
constructor(public Purchase_Master_Service_:Purchase_Master_Service,public Receipt_Voucher_Service_:Receipt_Voucher_Service,public Payment_Request_Service_:Payment_Request_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{debugger
this.Permissions = Get_Page_Permission(12);
// this.Payment_Status_Search_= this.Payment_Status_Data[0];
if(this.Permissions==undefined || this.Permissions==null)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
    }
    else
    {
        this.Payment_Request_Edit=this.Permissions.Edit;
        this.Payment_Request_Save=this.Permissions.Save;
        this.Payment_Request_Delete=this.Permissions.Delete;
        debugger
        this.Page_Load()
    }
}
Page_Load()
{debugger
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.myHeight = (window.innerHeight);
    this.myHeight = this.myHeight -400;
    this.Search_FromDate = this.New_Date(this.Search_FromDate);
    this.Search_ToDate = this.New_Date(this.Search_ToDate);
    this.Payment_Request_.PaymentDate = new Date(); 
    this.Entry_View=false;
    this.Search_Payment_Approval();
    // this.Load_Bill_Type();
    debugger
    this.Clr_Payment_Request();
    this.Clr_Payment_Request_Details();
    this.Search_Company()
    debugger
    this.Load_Status();
    
this.Payment_Request_Print=false;
}
Create_New()
{  
    this.Entry_View = true;
    this.Clr_Payment_Request();
    this.Clr_Payment_Request_Details();
    this.Payment_Request_Details_Data=[];
    
this.Payment_Request_Print=false;
}
Close_Click()
{
    this.Entry_View = false;
    this.Is_Expiry_Show=true;
    this.Payment_Request_Details_Data=[];
    this.Is_Expiry_Check();
    this.Clr_Payment_Request();
    this.Clr_Payment_Request_Details();
}
trackByFn(index, item) 
{
    return index;
}
Is_Expiry_Check()
{
if(this.Payment_Request_Details_.Is_Expiry==true)
this.Is_Expiry_Show=false;
else
this.Is_Expiry_Show=true;
}
Clr_Payment_Request()
{debugger
   this.Payment_Request_.Payment_Request_Id=0;
   this.Payment_Request_.Account_Party_Id=0;
   this.Payment_Request_.Item_Group_Id=0
//    this.Payment_Request_.Account_Party_Id=0;


   this.Payment_Request_.PaymentDate = new Date();
   this.Payment_Request_.PaymentDate = this.New_Date(this.Payment_Request_.PaymentDate);
   this.Payment_Request_.Discount=0;
   this.Payment_Request_.InvoiceNo="";
   this.Payment_Request_.Roundoff=0;
   this.Payment_Request_.TotalAmount=0;
   this.Payment_Request_.TotalDiscount=0;
   this.Payment_Request_.TaxableAmount=0;
   this.Payment_Request_.TotalGST=0;
   this.Payment_Request_.TotalCGST=0;
   this.Payment_Request_.TotalSGST=0;
   this.Payment_Request_.TotalIGST=0;
   this.Payment_Request_.Other_Charges=0;  
   this.Payment_Request_.GrossTotal=0;
   this.Payment_Request_.NetTotal=0;
   this.Payment_Request_.BillType=0;
   this.Payment_Request_.Description="";
   this.Payment_Request_.User_Id=0;
   this.Supplier_=null;
   this.Item_Group_=null;
   this.Payment_Request_.Address1="";
   this.Payment_Request_.Address2="";
   this.Payment_Request_.Address3="";
   this.Payment_Request_.Address4="";
    this.Payment_Request_.Transportation_Charge = 0;
    this.Payment_Request_.Handling_Charge = 0;
    this.Payment_Request_.Isgst = false;
    this.Payment_Request_.Transportation_Gst = 0;
    this.Payment_Request_.Handling_Gst = 0;
    this.Payment_Request_.Transportation_Total = 0;
    this.Payment_Request_.Handling_Total = 0;
    this.Tot_discount=0;
    this.Tot_Amount=0;
    this.Tot_Net= 0;
    this.Tot_Gross=0;
    this.CGST_SUM=0;
    this.SGST_SUM= 0;
    this.IGST_Sum=0;
    this.GST_Sum=0;     
    
this.Payment_Request_Print=false;
//    if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
//    this.Bill_Type_=this.Bill_Type_Data[0];
//    this.Item_Group_=null;

if(this.Payment_Status_Data!=undefined && this.Payment_Status_Data!=null)
   this.Payment_Status_=this.Payment_Status_Data[0];

   this.Doc_Photo =""
   this.ImageFile_Doc = ""
}
Clr_Payment_Request_Details()
{
this.Payment_Request_Details_Index=-1;
this.Payment_Request_Details_.Payment_Request_Details_Id="";
this.Payment_Request_Details_.Payment_Request_Id=0;
this.Payment_Request_Details_.ItemId=0;
this.Payment_Request_Details_.Barcode="";
this.Payment_Request_Details_.ItemName="";
this.Payment_Request_Details_.GroupId=0;
this.Payment_Request_Details_.GroupName="";
this.Payment_Request_Details_.UnitId=0;
this.Payment_Request_Details_.UnitName="";
    this.Payment_Request_Details_.StockId = 0;
    this.Payment_Request_Details_.To_Employee_Id = 0;
// this.Payment_Request_Details_.PaymentRate=0;
this.Payment_Request_Details_.SaleRate=0;
this.Payment_Request_Details_.MRP=0;
this.Payment_Request_Details_.HSNMasterId=0;
this.Payment_Request_Details_.Remarks="";
this.Payment_Request_Details_.Include_Tax=0;
this.Payment_Request_Details_.SaleTax=0;
this.Payment_Request_Details_.Quantity=0;
this.Payment_Request_Details_.Rate=0;
this.Payment_Request_Details_.Quantity_Kg=0;
this.Payment_Request_Details_.GrossValue=0;
this.Payment_Request_Details_.Discount=0;
this.Payment_Request_Details_.NetValue=0;
this.Payment_Request_Details_.CGST=0;
this.Payment_Request_Details_.CGST_AMT=0;
this.Payment_Request_Details_.SGST=0;
this.Payment_Request_Details_.SGST_AMT=0;
this.Payment_Request_Details_.IGST=0;
    this.Payment_Request_Details_.IGST_AMT = 0;
    this.Payment_Request_Details_.Description = "";
this.Payment_Request_Details_.Is_Expiry=false;
this.Payment_Request_Details_.Expiry_Date=new Date();
this.Payment_Request_Details_.Expiry_Date=this.New_Date(this.Payment_Request_Details_.Expiry_Date);
this.Payment_Request_Details_.GST_Amount=0;
this.Payment_Request_Details_.TotalAmount=0;
this.Payment_Request_Details_.To_Stock_Name="";
this.Item_=null;
this.To_Stock_=null;
this.Barcode_=null;
this.Edit_CGST=0;
this.Edit_SGST=0;
this.Edit_IGST=0;
this.Edit_GST=0;
this.Edit_Discount=0;
this.Edit_Totamt=0;
this.Edit_Net=0;
this.Edit_Gross=0;
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
{    

    debugger
    var rate=0,qty=0,total=0;
    if(this.Payment_Request_Details_.Rate==undefined || this.Payment_Request_Details_.Rate==null)
    this.Payment_Request_Details_.Rate=0;

    rate=this.Payment_Request_Details_.Rate;
    console.log('rate: ', rate);

    if(this.Payment_Request_Details_.Quantity==undefined || this.Payment_Request_Details_.Quantity==null)
    this.Payment_Request_Details_.Quantity=0;

    qty=this.Payment_Request_Details_.Quantity;
    total=rate*qty;
    console.log('total: ', total);
 
    this.Payment_Request_Details_.TotalAmount=Number(total.toFixed(2));
    debugger;

}

// Amount_Calculation()
// {     
//     // if(this.Payment_Request_Details_.PaymentRate==undefined || this.Payment_Request_Details_.PaymentRate==null)
//     // this.Payment_Request_Details_.PaymentRate=0;
//     if(this.Payment_Request_Details_.Quantity==undefined || this.Payment_Request_Details_.Quantity==null)
//     this.Payment_Request_Details_.Quantity=0;
//     if(this.Payment_Request_Details_.Discount==undefined || this.Payment_Request_Details_.Discount==null)
//     this.Payment_Request_Details_.Discount=0;
//     if(this.Payment_Request_Details_.CGST==undefined || this.Payment_Request_Details_.CGST==null)
//     this.Payment_Request_Details_.CGST=0;
//     if(this.Payment_Request_Details_.SGST==undefined || this.Payment_Request_Details_.SGST==null)
//     this.Payment_Request_Details_.SGST=0;
//     if(this.Payment_Request_Details_.IGST==undefined || this.Payment_Request_Details_.IGST==null)
//     this.Payment_Request_Details_.IGST=0;
//     this.Payment_Request_Details_.GrossValue=Number(this.Payment_Request_Details_.PaymentRate)*Number(this.Payment_Request_Details_.Quantity);
//     this.Payment_Request_Details_.GrossValue = Number(this.Payment_Request_Details_.GrossValue.toFixed(2));
//     this.Payment_Request_Details_.NetValue = Number(this.Payment_Request_Details_.GrossValue) - Number(this.Payment_Request_Details_.Discount);
//     this.Payment_Request_Details_.NetValue = Number(this.Payment_Request_Details_.NetValue.toFixed(2));
//     this.Payment_Request_Details_.Include_Tax=Number(this.Payment_Request_Details_.PaymentRate)+(Number(this.Payment_Request_Details_.PaymentRate)*(Number(this.Payment_Request_Details_.SaleTax)/100));
//     this.Payment_Request_Details_.Include_Tax = Number(this.Payment_Request_Details_.Include_Tax.toFixed(2));
//     // if(this.Bill_Type_.Bill_Type_Id==3)
//     // {
//     // this.Payment_Request_Details_.CGST_AMT= Number(this.Payment_Request_Details_.NetValue)*(Number(this.Payment_Request_Details_.CGST)/100);
//     // this.Payment_Request_Details_.CGST_AMT = Number(this.Payment_Request_Details_.CGST_AMT.toFixed(2));
//     //     this.Payment_Request_Details_.SGST_AMT = Number(this.Payment_Request_Details_.NetValue) * (Number(this.Payment_Request_Details_.SGST) / 100);
//     //     this.Payment_Request_Details_.SGST_AMT = Number(this.Payment_Request_Details_.SGST_AMT.toFixed(2));
//     //     this.Payment_Request_Details_.GST_Amount = this.Payment_Request_Details_.CGST_AMT + this.Payment_Request_Details_.SGST_AMT;
//     //     this.Payment_Request_Details_.GST_Amount = Number(this.Payment_Request_Details_.GST_Amount.toFixed(2));
//     // this.Payment_Request_Details_.IGST_AMT=0;
//     // }
//     // else
//     // {
//     // this.Payment_Request_Details_.IGST_AMT= Number(this.Payment_Request_Details_.NetValue)*(Number(this.Payment_Request_Details_.IGST)/100);
//     //     this.Payment_Request_Details_.IGST_AMT = Number(this.Payment_Request_Details_.IGST_AMT.toFixed(2));
//     // this.Payment_Request_Details_.GST_Amount=this.Payment_Request_Details_.IGST_AMT;
//     // this.Payment_Request_Details_.CGST_AMT=0;
//     // this.Payment_Request_Details_.SGST_AMT=0;
//     // }
//     this.Payment_Request_Details_.TotalAmount = this.Payment_Request_Details_.NetValue + this.Payment_Request_Details_.GST_Amount;
//     this.Payment_Request_Details_.TotalAmount = Number(this.Payment_Request_Details_.TotalAmount.toFixed(2));
// }
checkbox_Click()
{ 
    this.Final_Amounts();
}

Load_Status() {
    debugger
    this.issLoading = true;
    this.Payment_Request_Service_.Load_Status().subscribe(
      (Rows) => {
        debugger
        if (Rows != null) {
console.log(Rows[0]);

            debugger
          this.Payment_Status_Data = Rows[0];
          console.log(this.Payment_Status_Data);
          
          this.Payment_Status_Temp.Payment_Status_Id = 0;
          this.Payment_Status_Temp.Payment_Status_Name = "Select";
          this.Payment_Status_Data.unshift(this.Payment_Status_Temp);
          debugger
          this.Payment_Status_ = this.Payment_Status_Data[0];
this.Payment_Status_Search_=this.Payment_Status_Data[1]
          this.issLoading = false;
        }
      },
      (Rows) => {
        this.issLoading = false;
      }
    );
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
Final_Amounts()
{
    this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.CGST_SUM=0,this.SGST_SUM=0,this.GST_Sum=0,this.Tot_Cess=0,this.Tot_Amount=0;
    for(var i = 0; i< this.Payment_Request_Details_Data.length ; i++)
    {
        this.Tot_Gross = Number(this.Tot_Gross) + Number(this.Payment_Request_Details_Data[i].GrossValue);
        this.Tot_discount = Number(this.Tot_discount) + Number(this.Payment_Request_Details_Data[i].Discount);
        this.Tot_Net = Number(this.Tot_Net) + Number(this.Payment_Request_Details_Data[i].NetValue);
        this.CGST_SUM =Number(this.CGST_SUM) + Number(this.Payment_Request_Details_Data[i].CGST_AMT);
        this.SGST_SUM = Number(this.SGST_SUM) + Number(this.Payment_Request_Details_Data[i].SGST_AMT);
        this.IGST_Sum = Number(this.IGST_Sum) + Number(this.Payment_Request_Details_Data[i].IGST_AMT);
        this.GST_Sum = Number(this.GST_Sum) + Number(this.Payment_Request_Details_Data[i].GST_Amount);
        this.Tot_Cess = Number(this.Tot_Cess) + Number(this.Payment_Request_Details_Data[i].CGST_AMT);
        this.Tot_Amount = Number(this.Tot_Amount) + Number(this.Payment_Request_Details_Data[i].TotalAmount);
    }
    if(this.Payment_Request_.Roundoff==undefined || this.Payment_Request_.Roundoff==null)
    this.Payment_Request_.Roundoff=0;
    if(this.Payment_Request_.Other_Charges==undefined || this.Payment_Request_.Other_Charges==null)
    this.Payment_Request_.Other_Charges=0;
    if(this.Payment_Request_.Discount==undefined || this.Payment_Request_.Discount==null)
    this.Payment_Request_.Discount=0;    
    var Transportation_Gst = 0, Transportation_Total = 0, Handling_Gst = 0, Handling_Total=0;
    if (this.Payment_Request_.Transportation_Charge == undefined || this.Payment_Request_.Transportation_Charge == null)
        this.Payment_Request_.Transportation_Charge = 0;
    if (this.Payment_Request_.Handling_Charge == undefined || this.Payment_Request_.Handling_Charge == null)
        this.Payment_Request_.Handling_Charge = 0;    
    if (this.Payment_Request_.Isgst == true) {
        Transportation_Gst = Number(this.Payment_Request_.Transportation_Charge) * (18 / 100);
        this.Payment_Request_.Transportation_Gst = Number(Transportation_Gst.toFixed(2));        
        Transportation_Total = Number(this.Payment_Request_.Transportation_Charge) + Number(this.Payment_Request_.Transportation_Gst);
        this.Payment_Request_.Transportation_Total = Number(Transportation_Total.toFixed(2));
        Handling_Gst = (this.Payment_Request_.Handling_Charge) * (18 / 100);
        this.Payment_Request_.Handling_Gst = Number(Handling_Gst.toFixed(2));      
        Handling_Total = Number(this.Payment_Request_.Handling_Charge) + Number(this.Payment_Request_.Handling_Gst);
        this.Payment_Request_.Handling_Total = Number(Handling_Total.toFixed(2));      
    }
    else
    {
        this.Payment_Request_.Transportation_Gst = 0;
        this.Payment_Request_.Transportation_Total = Number(this.Payment_Request_.Transportation_Charge);
        this.Payment_Request_.Transportation_Total = Number(this.Payment_Request_.Transportation_Total.toFixed(2));
        this.Payment_Request_.Handling_Gst = 0;
        this.Payment_Request_.Handling_Total = Number(this.Payment_Request_.Handling_Charge);
        this.Payment_Request_.Handling_Total = Number(this.Payment_Request_.Handling_Total.toFixed(2));
    }
    this.Payment_Request_.GrossTotal = Number(this.Tot_Gross.toFixed(2));
    this.Payment_Request_.TotalDiscount = Number(this.Tot_discount.toFixed(2));
    this.Payment_Request_.TaxableAmount = Number(this.Tot_Net.toFixed(2));
    this.Payment_Request_.TotalCGST = Number(this.CGST_SUM.toFixed(2));
    this.Payment_Request_.TotalSGST =  Number(this.SGST_SUM.toFixed(2));
    this.Payment_Request_.TotalGST = Number(this.GST_Sum.toFixed(2));
    this.Payment_Request_.TotalIGST = Number(this.IGST_Sum.toFixed(2));
    this.Payment_Request_.NetTotal = Number(this.Tot_Amount.toFixed(2));
    this.Payment_Request_.TotalAmount = Number(this.Tot_Amount.toFixed(2)) + Number(this.Payment_Request_.Other_Charges) - Number(this.Payment_Request_.Discount) +
    Number(this.Payment_Request_.Roundoff) + Number(this.Payment_Request_.Handling_Total) + Number(this.Payment_Request_.Transportation_Total);
    this.Payment_Request_.TotalAmount = Number(this.Payment_Request_.TotalAmount.toFixed(2));
  }
Master_Amount_Change()
{          
    if(this.Payment_Request_.Roundoff==undefined || this.Payment_Request_.Roundoff==null)
    this.Payment_Request_.Roundoff=0;
    if(this.Payment_Request_.Other_Charges==undefined || this.Payment_Request_.Other_Charges==null)
    this.Payment_Request_.Other_Charges=0;
    if(this.Payment_Request_.Discount==undefined || this.Payment_Request_.Discount==null)
    this.Payment_Request_.Discount=0;
    this.Payment_Request_.TotalAmount= Number(this.Payment_Request_.NetTotal)+
    Number(this.Payment_Request_.Other_Charges)-Number(this.Payment_Request_.Discount)+
    Number(this.Payment_Request_.Roundoff);
}
Delete_Payment_Request(Payment_Request_Id,index)
{
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Payment_Request_Service_.Delete_Payment_Request(Payment_Request_Id).subscribe(Delete_status => {
        if(Delete_status[0][0].Payment_Request_Id_>0){
        this.Payment_Request_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
        }
        else
        {
     //   this.Payment_Request_Data.splice(index, 1);
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
Delete_Payment_Request_Details(Payment_Request_Details_e:Payment_Request_Details,index)
{       
    // this.Payment_Request_Details_Data.splice(index, 1);
    // this.Edit_CGST=Payment_Request_Details_e.CGST_AMT
    // this.Edit_SGST=Payment_Request_Details_e.SGST_AMT;
    // this.Edit_IGST=Payment_Request_Details_e.IGST_AMT;
    // this.Edit_GST=Payment_Request_Details_e.GST_Amount;
    // this.Edit_Discount=Number(Payment_Request_Details_e.Discount);
    // this.Edit_Net=Payment_Request_Details_e.NetValue+Payment_Request_Details_e.GST_Amount;
    // this.Edit_Tax=Payment_Request_Details_e.NetValue;
    // this.Edit_Gross=Payment_Request_Details_e.GrossValue;
    // this.Edit_Totamt=Payment_Request_Details_e.TotalAmount;
    // this.CGST_SUM= this.CGST_SUM-this.Edit_CGST;
    // this.SGST_SUM= this.SGST_SUM-this.Edit_SGST;   
    // this.GST_Sum= this.GST_Sum-this.Edit_GST;
    // this.Tot_discount=this.Tot_discount-this.Edit_Discount;
    // this.Tot_Cess=this.Tot_Cess- this.Edit_Cess;
    // this.Tot_Amount=this.Tot_Amount- this.Edit_Totamt;
    // this.Tot_Net=this.Tot_Net- this.Edit_Net;
    // this.Tot_Gross=this.Tot_Gross-this.Edit_Gross;
    // this.Payment_Request_.GrossTotal=this.Payment_Request_.GrossTotal-this.Edit_Gross;
    // this.Payment_Request_.TotalDiscount=this.Payment_Request_.TotalDiscount-this.Edit_Discount;
    // this.Payment_Request_.NetTotal= this.Payment_Request_.NetTotal-this.Edit_Net;
    // this.Payment_Request_.TotalCGST= this.Payment_Request_.TotalCGST-this.Edit_CGST;
    // this.Payment_Request_.TotalSGST=   this.Payment_Request_.TotalSGST-this.Edit_SGST;
    // this.Payment_Request_.TotalIGST=  this.Payment_Request_.TotalIGST-this.Edit_IGST;
    // this.Payment_Request_.TotalAmount= this.Payment_Request_.TotalAmount- this.Edit_Totamt;
    // this.Payment_Request_.TotalGST=   this.Payment_Request_.TotalGST-this.Edit_GST;
    // //this.Payment_Request_.GrandTotal= this.Payment_Request_.GrandTotal-this.Edit_Totamt;      
    // this.Payment_Request_.TaxableAmount=  this.Payment_Request_.TaxableAmount-this.Edit_Tax;
    // this.Payment_Request_.GrossTotal=Number(this.Payment_Request_.GrossTotal.toFixed(2));
    // this.Payment_Request_.TotalDiscount=Number(this.Payment_Request_.TotalDiscount.toFixed(2));
    // this.Payment_Request_.NetTotal=Number(this.Payment_Request_.NetTotal.toFixed(2));
    // this.Payment_Request_.TotalCGST=Number(this.Payment_Request_.TotalCGST.toFixed(2));
    // this.Payment_Request_.TotalSGST=Number(this.Payment_Request_.TotalSGST.toFixed(2));
    // //this.Payment_Request_.Cess=Number(this.Payment_Request_.Cess.toFixed(2));
    // this.Payment_Request_.TotalAmount=Number(this.Payment_Request_.TotalAmount.toFixed(2));
    // this.Payment_Request_.TotalGST=Number(this.Payment_Request_.TotalGST.toFixed(2));
   // this.Round_Off_Calculation();
   // this.Payment_Request_.GrandTotal=Number(this.Payment_Request_.GrandTotal.toFixed(2));
 this.Payment_Request_Details_Data.splice(index, 1);
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
     this.Payment_Request_Service_.Search_To_Stock_Typeahead(2,Value).subscribe(Rows => {      
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
//         this.Payment_Request_Service_.Load_Bill_Type(value).subscribe(Rows => {     
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
    this.Payment_Request_Service_.Search_Supplier_Typeahead('1,3',Value).subscribe(Rows => {     
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
    this.Payment_Request_.Address1=this.Supplier_.Address1;
    this.Payment_Request_.Address2=this.Supplier_.Address2;
    this.Payment_Request_.Address3=this.Supplier_.Address3;
    this.Payment_Request_.Address4=this.Supplier_.Address4;
    }
Get_Barcode_Payment(event: any)
{
  var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
    {
        this.issLoading = true;
        this.Payment_Request_Service_.Get_Barcode_Payment(Value).subscribe(Rows => {
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
 display_Barcode(Barcode_E: Payment_Request_Details) 
 {
    if (Barcode_E) { return Barcode_E.Barcode; }
 }
Get_Payment_Item_Typeahead(event: any)
{
     var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
        {  
            this.issLoading = true;
    this.Payment_Request_Service_.Get_Payment_Item_Typeahead(Value).subscribe(Rows => {
  
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
 display_Item(Item_: Payment_Request_Details)
{
    if (Item_) { return Item_.ItemName; }
}

PR_Change(InvoiceNo){
    debugger
     this.Payment_Request_Service_.PR_Change(InvoiceNo).subscribe(
        Rows => {
            debugger
   
                 
    //             this.Account_Party_Id = Rows[0][0].Account_Party_Id;
    //             this.Client_Accounts_Name = Rows[0][0].Client_Accounts_Name;
    //             this.Supplier_Temp.Client_Accounts_Id=this.Account_Party_Id;
               
    //             this.Supplier_Temp.Client_Accounts_Name=this.Client_Accounts_Name;


    //             this.Item_Group_Id = Rows[0][0].Item_Group_Id;
    //             this.Group_Name = Rows[0][0].Group_Name;
    //             this.Item_Group_temp.Item_Group_Id=this.Item_Group_Id;
    //             this.Item_Group_temp.Group_Name=this.Group_Name;

    //             this.Item_Group_=Object.assign({},this.Item_Group_temp);
                this.Purchase_Master_Id=Rows[0][0].Purchase_Master_Id
  
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





Barcode_Change(Barcode_s:Payment_Request_Details)
{   
    this.Payment_Request_Details_=Object.assign({},Barcode_s);
    this.Barcode_Temp_.ItemId=Barcode_s.ItemId;
    this.Barcode_Temp_.ItemName=Barcode_s.ItemName;
    this.Item_=Object.assign({},this.Barcode_Temp_);
// this.Payment_Request_Details_.ItemId=Barcode_s.ItemId;
// this.Payment_Request_Details_.ItemName=Barcode_s.ItemName;
// this.Payment_Request_Details_.UnitId=Barcode_s.UnitId;
// this.Payment_Request_Details_.UnitName=Barcode_s.UnitName;
// this.Payment_Request_Details_.SaleTax=Barcode_s.SaleTax;
// this.Payment_Request_Details_.GroupId=Barcode_s.GroupId;
// this.Payment_Request_Details_.PaymentRate=Barcode_s.PaymentRate;
// this.Payment_Request_Details_.GroupName=Barcode_s.GroupName;
// this.Payment_Request_Details_.HSNMasterId=Barcode_s.HSNMasterId;
// this.Payment_Request_Details_.Barcode=Barcode_s.Barcode;
// this.Payment_Request_Details_.Quantity=Barcode_s.Quantity;
// this.Payment_Request_Details_.SaleRate=Barcode_s.SaleRate;
// this.Payment_Request_Details_.MRP=Barcode_s.MRP;
}
Item_Name_Change(Item_s:Payment_Request_Details)
{   
    this.Payment_Request_Details_=Object.assign({},Item_s);
 //if(this.Barcode_==undefined||this.Barcode_==null)
//  if(Item_s.Barcode!="")
//     {
//     this.Item_Temp.StockId=Item_s.StockId;
//     this.Item_Temp.Barcode=Item_s.Barcode;
//     this.Barcode_=Object.assign({},this.Item_Temp);
//     this.Payment_Request_Details_.Barcode=Item_s.Barcode;
//     }  
      // this.Payment_Request_Details_.ItemId=Item_s.ItemId;
    // this.Payment_Request_Details_.ItemName=Item_s.ItemName;
    // this.Payment_Request_Details_.UnitId=Item_s.UnitId;
    // this.Payment_Request_Details_.UnitName=Item_s.UnitName;
    // this.Payment_Request_Details_.SaleTax=Item_s.SaleTax;
    // this.Payment_Request_Details_.CGST=Item_s.CGST;
    // this.Payment_Request_Details_.SGST=Item_s.SGST;
    // this.Payment_Request_Details_.IGST=Item_s.IGST;
    // this.Payment_Request_Details_.HSNCODE=Item_s.HSNCODE;
    // this.Payment_Request_Details_.SGST_AMT=Item_s.SGST_AMT;
    // this.Payment_Request_Details_.CGST_AMT=Item_s.CGST_AMT;
    // this.Payment_Request_Details_.IGST_AMT=Item_s.IGST_AMT;
    // this.Payment_Request_Details_.GST_Amount=Item_s.GST_Amount;
    // this.Payment_Request_Details_.GroupId=Item_s.GroupId;
    // this.Payment_Request_Details_.PaymentRate=Item_s.PaymentRate;
    // this.Payment_Request_Details_.GroupName=Item_s.GroupName;
    // this.Payment_Request_Details_.HSNMasterId=Item_s.HSNMasterId;
    // this.Payment_Request_Details_.Quantity=Item_s.Quantity;
    // this.Payment_Request_Details_.SaleRate=Item_s.SaleRate;
    // this.Payment_Request_Details_.MRP=Item_s.MRP;
    // this.Payment_Request_Details_.GroupId=Item_s.GroupId;
    // this.Payment_Request_Details_.GroupName=Item_s.GroupName; 
}
// Search_Payment_Request()
// {
// this.issLoading=true;
// this.Payment_Request_Service_.Search_Payment_Request('').subscribe(Rows => {
//  this.Payment_Request_Data=Rows[0];
// this.Total_Entries=this.Payment_Request_Data.length;
//     if(this.Payment_Request_Data.length==0)
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
Search_Payment_Approval()
{ 
    debugger
var look_In_Date_Value=0,ClientAccount=0,Voucher_No_search_=0,Status=1;
if (this.Look_In_Date == true )
look_In_Date_Value = 1;
if (this.Search_Customer != undefined && this.Search_Customer!=null)
if (this.Search_Customer.Client_Accounts_Id != undefined && this.Search_Customer.Client_Accounts_Id != null)
ClientAccount= this.Search_Customer.Client_Accounts_Id;
if (this.Voucher_Number != undefined && this.Voucher_Number != null && this.Voucher_Number != 0)
Voucher_No_search_ = this.Voucher_Number;
this.issLoading=true;


if (this.Payment_Status_Search_.Payment_Status_Id != undefined && this.Payment_Status_Search_.Payment_Status_Id != null)
Status= this.Payment_Status_Search_.Payment_Status_Id;
 this.Payment_Request_Service_.Search_Payment_Request(look_In_Date_Value,moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),ClientAccount,Voucher_No_search_,Status).subscribe(Rows => {
 this.Payment_Request_Data=Rows[0];
 this.Total_Entries=this.Payment_Request_Data.length;
    if(this.Payment_Request_Data.length==0)
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
Plus_Payment_Request_Details()
{     
    debugger
    // if(this.Item_==undefined || this.Item_==null || this.Item_.ItemId==undefined || this.Item_.ItemId==0 )
    // {
    //     const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select The Item',Type: "3" }});
    //     return
    // }
    // else if(this.Payment_Request_Details_.PaymentRate==undefined || this.Payment_Request_Details_.PaymentRate==null || this.Payment_Request_Details_.PaymentRate==0 )
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Payment Rate',Type: "3" }});
    //     return
    // }
     if(this.Payment_Request_Details_.Quantity==undefined || this.Payment_Request_Details_.Quantity==null || this.Payment_Request_Details_.Quantity==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Quantity',Type: "3" }});
        return
    }
    else if(this.Payment_Request_Details_.Description==undefined || this.Payment_Request_Details_.Description==null || this.Payment_Request_Details_.Description=='' )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Description',Type: "3" }});
        return
    }
    else if(this.Payment_Request_Details_.Remarks==undefined || this.Payment_Request_Details_.Remarks==null || this.Payment_Request_Details_.Remarks=='' )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Remarks',Type: "3" }});
        return
    }
    // if(this.To_Stock_==undefined || this.To_Stock_==null || this.To_Stock_.Client_Accounts_Id==undefined || this.To_Stock_.Client_Accounts_Id==0 )
    // {
    //     const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select To Stock',Type: "3" }});
    //     return
    // }
    // else if(this.Payment_Request_Details_.MRP==undefined || this.Payment_Request_Details_.MRP==null || this.Payment_Request_Details_.MRP==0 )
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter MRP',Type: "3" }});
    //     return
    // }
    // else if(this.Payment_Request_Details_.SaleRate==undefined || this.Payment_Request_Details_.SaleRate==null || this.Payment_Request_Details_.SaleRate==0 )
    // {
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Sale Rate',Type: "3" }});
    //     return
    // }
    // else if ( this.Payment_Request_Details_.Quantity_Kg == null|| this.Payment_Request_Details_.Quantity_Kg == undefined)
    // {
    //     this.Payment_Request_Details_.Quantity_Kg =0
    // }    
    else
    {   
        if(this.Payment_Request_Details_Data==undefined)
this.Payment_Request_Details_Data=[]; 
//document.getElementById("BARCODE").nodeValue = this.Barcode_.Barcode;
//this.Stock_Add_Details_.Barcode=(document.getElementById("BARCODE").value); 
//this.Stock_Add_Details_.Barcode= Object.assign({},this.Barcode_.Barcode);
// if( this.Barcode_==null)
// {
//  //   const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     //this.Payment_Request_Details_.Barcode=Barcode_string;
//     this.Payment_Request_Details_.Barcode='';
// }
//  else if(this.Barcode_.Barcode==undefined ||this.Barcode_.Barcode==null)
// {
//     // const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     // this.Payment_Request_Details_.Barcode=Barcode_string;
//     this.Payment_Request_Details_.Barcode='';
// }
// else if(this.Barcode_.Barcode!=undefined && this.Barcode_.Barcode!=null)
// {
//     this.Payment_Request_Details_.Barcode=  this.Barcode_.Barcode;
// }
// else if(this.Barcode_!=undefined && this.Barcode_!=null)
// {
//     const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     this.Payment_Request_Details_.Barcode=  Barcode_string;
// }       

debugger
var prate=0;var peprs=8;var psale=0;var pmrp=0;var pv=0;
// if(this.Payment_Request_Details_.PaymentRate!=null || this.Payment_Request_Details_.PaymentRate!=undefined)
// prate=this.Payment_Request_Details_.PaymentRate;
pv=prate*peprs/100;
 pv=Number(pv.toFixed(2));
psale=Number(prate)+pv;
this.Payment_Request_Details_.SaleRate=Number(psale.toFixed(2));  ;
this.Payment_Request_Details_.MRP=psale;

        this.Payment_Request_Details_.Expiry_Date=this.New_Date(new Date(moment(this.Payment_Request_Details_.Expiry_Date).format('YYYY-MM-DD')));
        // this.Payment_Request_Details_.ItemId=this.Item_.ItemId;
        // this.Payment_Request_Details_.ItemName=this.Item_.ItemName;
        // this.Payment_Request_Details_.To_Employee_Id=this.To_Stock_.Client_Accounts_Id;
        // this.Payment_Request_Details_.To_Stock_Name=this.To_Stock_.Client_Accounts_Name;        
        if (this.Payment_Request_Details_Index >= 0) {
            this.Payment_Request_Details_Data[this.Payment_Request_Details_Index] = Object.assign({}, this.Payment_Request_Details_);
            }
        else {
            this.Payment_Request_Details_Data.push(Object.assign({}, this.Payment_Request_Details_));
              }               
this.Final_Amounts();
this.Payment_Request_Details_Index=-1;
this.Clr_Payment_Request_Details();
}
}
Save_Payment_Approval()
{debugger
if(this.Payment_Request_Details_Data==undefined || this.Payment_Request_Details_Data==null || this.Payment_Request_Details_Data.length==0 || this.Payment_Request_Details_Data.length==undefined )
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
else if(this.Payment_Request_.PaymentDate==undefined || this.Payment_Request_.PaymentDate==null)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Bill Date',Type: "3" }});
    return
  }
  else if(this.Payment_Request_.Description==undefined || this.Payment_Request_.Description==null || this.Payment_Request_.Description=='' )
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Description',Type: "3" }});
    return
  }

 else if(this.Payment_Request_Details_Data==undefined || this.Payment_Request_Details_Data==null || this.Payment_Request_Details_Data.length==0 || this.Payment_Request_Details_Data.length==undefined )
    {
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type: "3" }});
       return
    }
    else
    {   debugger    
        // this.Payment_Request_.BillType=this.Bill_Type_.Bill_Type_Id;
        this.Payment_Request_.Account_Party_Id=this.Supplier_.Client_Accounts_Id;
        this.Payment_Request_.Payment_Request_Details=this.Payment_Request_Details_Data;
        this.Payment_Request_.Document_Name = this.Doc_Photo;
        this.Payment_Request_.Item_Group_Id=this.Item_Group_.Item_Group_Id;
        
        this.Payment_Request_.Payment_Status_Id=this.Payment_Status_.Payment_Status_Id;
        // this.Payment_Request_.Item_Group_Name=this.Item_Group_.Item_Group_Name;
    // document.getElementById('Save_Button').hidden=true;
    debugger
    let loginUser= parseInt(localStorage.getItem('Login_User'))
    console.log('loginUser: ', loginUser);
    this.Payment_Request_.Approved_By=loginUser
    this.Payment_Request_.PaymentDate = this.New_Date(new Date(moment(this.Payment_Request_.PaymentDate).format('YYYY-MM-DD')));
    this.Payment_Request_.Entry_Date = this.New_Date(new Date(moment(this.Payment_Request_.Entry_Date).format('YYYY-MM-DD')));
       this.issLoading=true;      
   this.Payment_Request_Service_.Save_Payment_Approval(this.Payment_Request_,this.Doc_Photo,
    this.ImageFile_Doc,
    this.Document_File_Array).subscribe(Save_status => {               
   // Save_status=Save_status[0];
    if(Number(Save_status[0][0].Payment_Request_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Clr_Payment_Request_Details();
    this.Clr_Payment_Request();
    this.Payment_Request_Details_Data=[];
    this.Search_Payment_Approval();
    }
    else if (Number(Save_status[0].Payment_Request_Id_) == -1)
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

Edit_Payment_Request(Payment_Request_e:Payment_Request,index)
{  debugger
    this.Entry_View=true
    ;
    this.Purcahse_Master_Index=index;
    this.Payment_Request_=Object.assign({},Payment_Request_e);   
    
this.Payment_Request_Print=true; 
    this.Supplier_Temp.Client_Accounts_Id=Payment_Request_e.Account_Party_Id;
    this.Supplier_Temp.Client_Accounts_Name=Payment_Request_e.Client_Accounts_Name;

     
    this.Payment_Request_.Client_Accounts_Name=Payment_Request_e.Client_Accounts_Name;



    
    this.Supplier_=Object.assign({},this.Supplier_Temp);
    // this.Doc_Photo = this.Payment_Request_.Document_Name;
    this.Item_Group_temp.Item_Group_Id=Payment_Request_e.Item_Group_Id;
    this.Item_Group_temp.Group_Name=Payment_Request_e.Group_Name;
    this.Payment_Request_.Group_Name=Payment_Request_e.Group_Name;

    this.Item_Group_=Object.assign({},this.Item_Group_temp);
  
    // for(var i=0;i<this.Bill_Type_Data.length;i++)
    // {
    //     if(this.Bill_Type_Data[i].Bill_Type_Id==Payment_Request_e.BillType)
    //     {
    //         this.Bill_Type_=this.Bill_Type_Data[i];
    //     }
    // }




    for (var i = 0; i < this.Payment_Status_Data.length; i++) {
        if (this.Payment_Request_.Payment_Status_Id == this.Payment_Status_Data[i].Payment_Status_Id)
          this.Payment_Status_ = this.Payment_Status_Data[i];
      }
    
    // this.Payment_Status_Temp.Payment_Status_Id=Payment_Request_e.Payment_Status_Id;
    
    // this.Payment_Status_Temp.Payment_Status_Name=Payment_Request_e.Payment_Status_Name;
    
    // this.Payment_Status_=Object.assign({},this.Payment_Status_Temp);
    this.Payment_Request_Service_.Get_Payment_Request_Details(Payment_Request_e.Payment_Request_Id).subscribe(Rows => {         
    if (Rows != null) {
    this.Payment_Request_Details_Data = Rows[0];
    console.log('this.Payment_Request_Details_Data: ', this.Payment_Request_Details_Data);
    this.issLoading = false;
    }    
    },
    Rows => {     
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });    
    this.Entry_View=true;
    this.Payment_Request_=Payment_Request_e;
    this.Payment_Request_=Object.assign({},Payment_Request_e);
}
Edit_Payment_Request_Details(Payment_Request_Details_e:Payment_Request_Details,index)
{   
    this.To_Stock_=null;
    this.Payment_Request_Details_Index=index;
    this.Payment_Request_Details_=Object.assign({},Payment_Request_Details_e);
    
 
}
Get_Item_Group(event: any) {
    debugger
    var Value = "";
    if (event.target.value == "") Value = undefined;
    else Value = event.target.value;
    this.issLoading = true;
    debugger
    this.Payment_Request_Service_.Search_Item_Group1('1,3',Value).subscribe(
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


// Edit_Payment_Request_Details(Payment_Request_Details_e:Payment_Request_Details,index)
// {   
//     this.To_Stock_=null;
//     this.Payment_Request_Details_Index=index;
//     this.Payment_Request_Details_=Object.assign({},Payment_Request_Details_e);
    
 
// }

}