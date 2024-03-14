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
export class Purchase_Master_Service {
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


Load_Status(): Observable<any> {
    debugger
    return this.http.get(environment.BasePath + "Purchase_Master/Load_Purchase_Status/");
}

 Get_Purchase_Item_Typeahead(Item_Name):Observable<any>
{
 return this.http.get(environment.BasePath +'Purchase_Master/Get_Purchase_Item_Typeahead/'+Item_Name);
}
Get_Purchase_Typeahead(Item_Name):Observable<any>
{
    return this.http.get(environment.BasePath +'Purchase_Master/Get_Purchase_Typeahead/'+Item_Name);
}
Get_Barcode_Purchase(Barcode):Observable<any>
 {
  return this.http.get(environment.BasePath +'Purchase_Master/Get_Barcode_Purchase/'+Barcode);
 }
Search_Purchase_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No): Observable<any> 
{
    var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
        'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No }
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchase_Report/', { params: Search_Data });
}
Search_Purchase_Return_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No): Observable<any> 
{
    var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
        'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No }
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchase_Return_Report/', { params: Search_Data });
}
Load_Purchase_SaleTax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Purchase_SaleTax_Report/', { params: Search_Data });
}  
Load_Hsn_Purchase_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Hsn_Purchase_Report/', { params: Search_Data });
}
Load_Hsn_Purchase_Return_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Hsn_Purchase_Return_Report/', { params: Search_Data });
}
Load_Hsn_Service_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Hsn_Service_Report/', { params: Search_Data });
}
Load_Service_Tax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Service_Tax_Report/', { params: Search_Data });
}
Load_Purchase_Return_Tax_Report(Search_FromDate, Search_ToDate): Observable<any> 
{
    var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate}
    return this.http.get(environment.BasePath + 'Purchase_Master/Load_Purchase_Return_Tax_Report/', { params: Search_Data });
}
Search_Purchase_Details_Report(look_In_Date_Value, Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No, Item_Id): Observable<any> {

var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
    'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No,'Item_Id':Item_Id}
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchase_Details_Report/', { params: Search_Data });
}

Search_Purchaseorder_Details_Report(look_In_Date_Value, Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No, Item_Id): Observable<any> {

    var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
        'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No,'Item_Id':Item_Id}
        return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchaseorder_Details_Report/', { params: Search_Data });
    }




Search_Purchase_Return_Details_Report(look_In_Date_Value, Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No, Item_Id): Observable<any> {

var Search_Data = { 'Is_Date_Check_': look_In_Date_Value, 'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,
    'Account_Party_Id_': ClientAccounts_Id, 'Voucher_No': Voucher_No,'Item_Id':Item_Id}
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Purchase_Return_Details_Report/', { params: Search_Data });
}

 Search_To_Stock_Typeahead(Client_Id,Item_Name):Observable<any>
 {
  return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);
 }
// Save_Purchase_Master(Purchase_Master_)
// {
// return this.http.post(environment.BasePath +'Purchase_Master/Save_Purchase_Master/',Purchase_Master_);
// }
Save_Purchase_Master(Purchase_Master_) {
        debugger
   const postData = new FormData();
debugger
       postData.append("Purchase_Master_Id", Purchase_Master_.Purchase_Master_Id);
       postData.append("Account_Party_Id", Purchase_Master_.Account_Party_Id);
    //    postData.append("Entry_Date", Purchase_Master_.Entry_Date);
       postData.append("PurchaseDate", Purchase_Master_.PurchaseDate);
       postData.append("InvoiceNo", Purchase_Master_.InvoiceNo);
       postData.append("Item_Group_Id",Purchase_Master_.Item_Group_Id);
       postData.append("Item_Group_Name",Purchase_Master_.Item_Group_Name);       
       postData.append("NetTotal",Purchase_Master_.NetTotal);     
       postData.append("User_Id",Purchase_Master_.User_Id);
       postData.append("Description",Purchase_Master_.Description);
       postData.append("Purchase_Details", JSON.stringify(Purchase_Master_.Purchase_Details));
    
debugger;
   return this.http.post(environment.BasePath + 'Purchase_Master/Save_Purchase_Master', Purchase_Master_);
}
Save_Purchaseorder_Master(Purchaseorder_Master_)
{
return this.http.post(environment.BasePath +'Purchase_Master/Save_Purchaseorder_Master/',Purchaseorder_Master_);
}




Search_Purchase_Master(Look_In_Date,Search_FromDate,Search_ToDate,ClientAccount,Voucher_No_search_,Status=0):Observable<any>
{ 
    console.log('Status: ', Status);
 return this.http.get(environment.BasePath +'Purchase_Master/Search_Purchase_Master/'+Look_In_Date+'/'+Search_FromDate+'/'+Search_ToDate+'/'+ClientAccount+'/'+Voucher_No_search_+'/'+Status);
}


Search_Purchaseorder_Master(Look_In_Date,Search_FromDate,Search_ToDate,ClientAccount,Voucher_No_search_):Observable<any>
{ 
 return this.http.get(environment.BasePath +'Purchase_Master/Search_Purchaseorder_Master/'+Look_In_Date+'/'+Search_FromDate+'/'+Search_ToDate+'/'+ClientAccount+'/'+Voucher_No_search_);
}


Delete_Purchase_Master(Purchase_Master_Id)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Delete_Purchase_Master/'+Purchase_Master_Id);
}

Delete_Purchaseorder_Master(Purchase_OrderMaster_Id)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Delete_Purchaseorder_Master/'+Purchase_OrderMaster_Id);
}



Get_Purchase_Master(Purchase_Master_Id)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Get_Purchase_Master/'+Purchase_Master_Id);
}
Get_Purchase_Details(Purchase_Master_Id)
{
 return this.http.get(environment.BasePath +'Purchase_Master/Get_Purchase_Details/'+Purchase_Master_Id);
}
    Search_Service_Type_Typeahead(Service_Type_Name_)
{
        var search_data = { 'Service_Type_Name_': Service_Type_Name_}
        return this.http.get(environment.BasePath + 'Purchase_Master/Search_Service_Type_Typeahead/', { params:search_data});
}

Save_Service(Service_)
{
    return this.http.post(environment.BasePath +'Purchase_Master/Save_Service/',Service_);
}
Search_Service(Look_In_Date,Search_FromDate,Search_ToDate,ClientAccount,Voucher_No_search_):Observable<any>
{
    var search_data = {  'Is_Date_Check_': Look_In_Date, 'FromDate_': Search_FromDate, 'ToDate_': Search_ToDate,
        'Account_Party_Id_': ClientAccount, 'InvoiceNo_': Voucher_No_search_ }
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Service/', { params: search_data });
}
Search_Service_Details_Report(Look_In_Date, Search_FromDate, Search_ToDate, ClientAccount, Voucher_No_search_, Service_Type_Id):Observable<any>
{
    
    var search_data = {  'Is_Date_Check_': Look_In_Date, 'FromDate_': Search_FromDate, 'ToDate_': Search_ToDate,
        'Account_Party_Id_': ClientAccount, 'InvoiceNo_': Voucher_No_search_, 'Service_Type_Id': Service_Type_Id }
    return this.http.get(environment.BasePath + 'Purchase_Master/Search_Service_Details_Report/', { params: search_data });
}
Delete_Service(Service_Id)
{
    return this.http.get(environment.BasePath +'Purchase_Master/Delete_Service/'+Service_Id);
}
Get_Service(Service_Id)
{
    return this.http.get(environment.BasePath +'Purchase_Master/Get_Service/'+Service_Id);
}
}

