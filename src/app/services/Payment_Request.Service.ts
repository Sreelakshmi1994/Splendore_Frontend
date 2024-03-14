import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
@Injectable({
providedIn: 'root'
})
export class Payment_Request_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
private extractData(res: Response)
{
let body = res;
return body || { };
}
fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
fileExtension = '.xlsx';
public exportExcel(jsonData: any[], fileName: string): void 
{
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
  const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  this.saveExcelFile(excelBuffer, fileName);
}
private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
  FileSaver.saveAs(data, fileName + this.fileExtension);
}
Load_Bill_Type(Group_Id):Observable<any>
{ 
 return this.http.get(environment.BasePath +'Sales_Master/Get_Bill_Type/'+ Group_Id);
}
Search_Supplier_Typeahead(Client_Id,Item_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);}



 Search_Item_Group(Client_Id,Item_Name):Observable<any>
 {debugger
    // Client_Id,Item_Name
  return this.http.get(environment.BasePath +'Client_Accounts/Account_Group_Typeahead/'+Client_Id+'/'+Item_Name);
// +Client_Id+'/'+Item_Name
}

Search_Item_Group1(Client_Id,Item_Name):Observable<any>
 {debugger
    // Client_Id,Item_Name
  return this.http.get(environment.BasePath +'Client_Accounts/Expense_Head_Account_Group_Typeahead/'+Client_Id+'/'+Item_Name);
// +Client_Id+'/'+Item_Name
}

 
PR_Change(InvoiceNo):Observable<any>{
    debugger
    return  this.http.get(environment.BasePath +'Payment_Request/PR_Change/'+InvoiceNo);

}

Load_Status(): Observable<any> {
    debugger
    return this.http.get(environment.BasePath + "Payment_Request/Load_Status/");
}
 Get_Payment_Item_Typeahead(Item_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Payment_Request/Get_Payment_Item_Typeahead/'+Item_Name);
}
Get_Payment_Typeahead(Item_Name):Observable<any>
{
    return this.http.get(environment.BasePath +'Payment_Request/Get_Payment_Typeahead/'+Item_Name);
}
Get_Barcode_Payment(Barcode):Observable<any>
 {
  return this.http.get(environment.BasePath +'Payment_Request/Get_Barcode_Payment/'+Barcode);
 }
Search_Payment_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No): Observable<any> 
{
    var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
        'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No }
    return this.http.get(environment.BasePath + 'Payment_Request/Search_Payment_Report/', { params: Search_Data });
}
Search_Payment_Return_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No): Observable<any> 
{
    var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
        'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No }
    return this.http.get(environment.BasePath + 'Payment_Request/Search_Payment_Return_Report/', { params: Search_Data });
}
Load_Payment_SaleTax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Payment_Request/Load_Payment_SaleTax_Report/', { params: Search_Data });
}  
Load_Hsn_Payment_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Payment_Request/Load_Hsn_Payment_Report/', { params: Search_Data });
}
Load_Hsn_Payment_Return_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Payment_Request/Load_Hsn_Payment_Return_Report/', { params: Search_Data });
}
Load_Hsn_Service_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Payment_Request/Load_Hsn_Service_Report/', { params: Search_Data });
}
Load_Service_Tax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Payment_Request/Load_Service_Tax_Report/', { params: Search_Data });
}
Load_Payment_Return_Tax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Payment_Request/Load_Payment_Return_Tax_Report/', { params: Search_Data });
}
Search_Payment_Details_Report(look_In_Date_Value, Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No, Item_Id): Observable<any> {

var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
    'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No,'Item_Id':Item_Id}
    return this.http.get(environment.BasePath + 'Payment_Request/Search_Payment_Details_Report/', { params: Search_Data });
}

Search_Paymentorder_Details_Report(look_In_Date_Value, Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No, Item_Id): Observable<any> {

    var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
        'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No,'Item_Id':Item_Id}
        return this.http.get(environment.BasePath + 'Payment_Request/Search_Paymentorder_Details_Report/', { params: Search_Data });
    }




Search_Payment_Return_Details_Report(look_In_Date_Value, Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No, Item_Id): Observable<any> {

var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
    'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No,'Item_Id':Item_Id}
    return this.http.get(environment.BasePath + 'Payment_Request/Search_Payment_Return_Details_Report/', { params: Search_Data });
}

 Search_To_Stock_Typeahead(Client_Id,Item_Name):Observable<any>
 {
  return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);
 }
// Save_Payment_Request(Payment_Request_)
// {
// return this.http.post(environment.BasePath +'Payment_Request/Save_Payment_Request/',Payment_Request_);
// }
Save_Payment_Request(Payment_Request_, Doc_Photo: File[],
    ImageFile_Doc: File[],
    Document_File_Array: any[]) {
        debugger
   const postData = new FormData();
debugger
       postData.append("Payment_Request_Id", Payment_Request_.Payment_Request_Id);
       postData.append("Account_Party_Id", Payment_Request_.Account_Party_Id);
       postData.append("Entry_Date", Payment_Request_.Entry_Date);
       postData.append("PaymentDate", Payment_Request_.PaymentDate);
       postData.append("InvoiceNo", Payment_Request_.InvoiceNo);
       postData.append("Discount", Payment_Request_.Discount);
       postData.append("Roundoff", Payment_Request_.Roundoff);
       postData.append("Total", Payment_Request_.TotalAmount);
       postData.append("TotalDiscount",Payment_Request_.TotalDiscount);
       postData.append("TaxableAmount",Payment_Request_.TaxableAmount);   
       postData.append("TotalCGST",Payment_Request_.TotalCGST);
       postData.append("TotalSGST",Payment_Request_.TotalSGST);
    //    postData.append("TotalIGST",Payment_Request_.TotalIGST);
       postData.append("Other_Charges",Payment_Request_.Other_Charges);
       postData.append("GrossTotal",Payment_Request_.GrossTotal);
       postData.append("NetTotal",Payment_Request_.NetTotal);
       postData.append("BillType",Payment_Request_.BillType);
       postData.append("User_Id",Payment_Request_.User_Id);
       postData.append("Description",Payment_Request_.Description);
       postData.append("Payment_Details", JSON.stringify(Payment_Request_.Payment_Request_Details));
       postData.append("Document_Name",Payment_Request_.Document_Name);
       postData.append("Item_Group_Id",Payment_Request_.Item_Group_Id);
       postData.append("Item_Group_Name",Payment_Request_.Item_Group_Name);
   var i = 0; 
   debugger

    if (ImageFile_Doc != undefined) {
        for (const img of ImageFile_Doc) {
            postData.append("myFile", img);
            postData.append("ImageFile_Doc", i.toString());
            i = i + 1;
        }
    }

    postData.append("Document_File_Array", i.toString());
    if (Document_File_Array != undefined) {
        var j = 0;
        for (const img of Document_File_Array) {
            if (Document_File_Array[j].New_Entry == 1) {
                postData.append("myFile", img);
            }
            j++;
            i = i + 1;
        }
    }       
 
debugger;
   return this.http.post(environment.BasePath + 'Payment_Request/Save_Payment_Request', Payment_Request_);
}








Save_Payment_Approval(Payment_Request_, Doc_Photo: File[],
    ImageFile_Doc: File[],
    Document_File_Array: any[]) {
        debugger
   const postData = new FormData();
debugger
       postData.append("Payment_Request_Id", Payment_Request_.Payment_Request_Id);
       postData.append("Account_Party_Id", Payment_Request_.Account_Party_Id);
       
       postData.append("Payment_Status_Id", Payment_Request_.Payment_Status_Id);
       postData.append("Entry_Date", Payment_Request_.Entry_Date);
       postData.append("PaymentDate", Payment_Request_.PaymentDate);
       postData.append("InvoiceNo", Payment_Request_.InvoiceNo);
       postData.append("Discount", Payment_Request_.Discount);
       postData.append("Roundoff", Payment_Request_.Roundoff);
       postData.append("Total", Payment_Request_.TotalAmount);
       postData.append("TotalDiscount",Payment_Request_.TotalDiscount);
       postData.append("TaxableAmount",Payment_Request_.TaxableAmount);   
       postData.append("TotalCGST",Payment_Request_.TotalCGST);
       postData.append("TotalSGST",Payment_Request_.TotalSGST);
    //    postData.append("TotalIGST",Payment_Request_.TotalIGST);
       postData.append("Other_Charges",Payment_Request_.Other_Charges);
       postData.append("GrossTotal",Payment_Request_.GrossTotal);
       postData.append("NetTotal",Payment_Request_.NetTotal);
       postData.append("BillType",Payment_Request_.BillType);
       postData.append("User_Id",Payment_Request_.User_Id);
       postData.append("Description",Payment_Request_.Description);
       postData.append("Payment_Details", JSON.stringify(Payment_Request_.Payment_Request_Details));
       postData.append("Document_Name",Payment_Request_.Document_Name);
       postData.append("Item_Group_Id",Payment_Request_.Item_Group_Id);
       postData.append("Item_Group_Name",Payment_Request_.Item_Group_Name);
   var i = 0; 
   debugger

    if (ImageFile_Doc != undefined) {
        for (const img of ImageFile_Doc) {
            postData.append("myFile", img);
            postData.append("ImageFile_Doc", i.toString());
            i = i + 1;
        }
    }

    postData.append("Document_File_Array", i.toString());
    if (Document_File_Array != undefined) {
        var j = 0;
        for (const img of Document_File_Array) {
            if (Document_File_Array[j].New_Entry == 1) {
                postData.append("myFile", img);
            }
            j++;
            i = i + 1;
        }
    }       
 
debugger;
return this.http.post(environment.BasePath + 'Payment_Request/Save_Payment_Request', Payment_Request_);

//    return this.http.post(environment.BasePath + 'Payment_Request/Save_Payment_Approval', postData);


}
Save_Paymentorder_Master(Paymentorder_Master_)
{
return this.http.post(environment.BasePath +'Payment_Request/Save_Paymentorder_Master/',Paymentorder_Master_);
}




Search_Payment_Request(Look_In_Date,Search_FromDate,Search_ToDate,ClientAccount,Voucher_No_search_,Status=0):Observable<any>
{ debugger
 return this.http.get(environment.BasePath +'Payment_Request/Search_Payment_Request/'+Look_In_Date+'/'+Search_FromDate+'/'+Search_ToDate+'/'+ClientAccount+'/'+Voucher_No_search_+'/'+Status);
}
Search_Payment_Approval(Look_In_Date,Search_FromDate,Search_ToDate,ClientAccount,Voucher_No_search_,Status):Observable<any>
{ 
 return this.http.get(environment.BasePath +'Payment_Request/Search_Payment_Approval/'+Look_In_Date+'/'+Search_FromDate+'/'+Search_ToDate+'/'+ClientAccount+'/'+Voucher_No_search_+'/'+Status);
}

Search_Paymentorder_Master(Look_In_Date,Search_FromDate,Search_ToDate,ClientAccount,Voucher_No_search_):Observable<any>
{ 
 return this.http.get(environment.BasePath +'Payment_Request/Search_Paymentorder_Master/'+Look_In_Date+'/'+Search_FromDate+'/'+Search_ToDate+'/'+ClientAccount+'/'+Voucher_No_search_);
}


Delete_Payment_Request(Payment_Request_Id)
{
 return this.http.get(environment.BasePath +'Payment_Request/Delete_Payment_Request/'+Payment_Request_Id);
}

Delete_Paymentorder_Master(Payment_OrderMaster_Id)
{
 return this.http.get(environment.BasePath +'Payment_Request/Delete_Paymentorder_Master/'+Payment_OrderMaster_Id);
}



Get_Payment_Request(Payment_Request_Id)
{
 return this.http.get(environment.BasePath +'Payment_Request/Get_Payment_Request/'+Payment_Request_Id);
}
Get_Payment_Request_Details(Payment_Request_Id)
{
 return this.http.get(environment.BasePath +'Payment_Request/Get_Payment_Request_Details/'+Payment_Request_Id);
}
    Search_Service_Type_Typeahead(Service_Type_Name_)
{
        var search_data = { 'Service_Type_Name_': Service_Type_Name_}
        return this.http.get(environment.BasePath + 'Payment_Request/Search_Service_Type_Typeahead/', { params:search_data});
}

Save_Service(Service_)
{
    return this.http.post(environment.BasePath +'Payment_Request/Save_Service/',Service_);
}
Search_Service(Look_In_Date,Search_FromDate,Search_ToDate,ClientAccount,Voucher_No_search_):Observable<any>
{
    var search_data = {  'Is_Date_Check_': Look_In_Date, 'FromDate_': Search_FromDate, 'ToDate_': Search_ToDate,
        'Account_Party_Id_': ClientAccount, 'InvoiceNo_': Voucher_No_search_ }
    return this.http.get(environment.BasePath + 'Payment_Request/Search_Service/', { params: search_data });
}
Search_Service_Details_Report(Look_In_Date, Search_FromDate, Search_ToDate, ClientAccount, Voucher_No_search_, Service_Type_Id):Observable<any>
{
    
    var search_data = {  'Is_Date_Check_': Look_In_Date, 'FromDate_': Search_FromDate, 'ToDate_': Search_ToDate,
        'Account_Party_Id_': ClientAccount, 'InvoiceNo_': Voucher_No_search_, 'Service_Type_Id': Service_Type_Id }
    return this.http.get(environment.BasePath + 'Payment_Request/Search_Service_Details_Report/', { params: search_data });
}
Delete_Service(Service_Id)
{
    return this.http.get(environment.BasePath +'Payment_Request/Delete_Service/'+Service_Id);
}
Get_Service(Service_Id)
{
    return this.http.get(environment.BasePath +'Payment_Request/Get_Service/'+Service_Id);
}
}

