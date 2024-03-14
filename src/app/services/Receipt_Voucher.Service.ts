import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
 
export class Receipt_Voucher_Service {
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

fileType =
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

fileExtension = ".xlsx";
public exportExcel(jsonData: any[], fileName: string): void {
const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
const excelBuffer: any = XLSX.write(wb, {
   bookType: "xlsx",
   type: "array",
});
this.saveExcelFile(excelBuffer, fileName);
}
private saveExcelFile(buffer: any, fileName: string): void {
const data: Blob = new Blob([buffer], { type: this.fileType });
FileSaver.saveAs(data, fileName + this.fileExtension);
}
Save_Receipt_Voucher(Receipt_Voucher_)
{
   return this.http.post(environment.BasePath +'Receipt_Voucher/Save_Receipt_Voucher/',Receipt_Voucher_);
}
Save_Receipt_Voucher_Mobile(Receipt_Voucher_)
{
   return this.http.post(environment.BasePath +'Receipt_Voucher/Save_Receipt_Voucher_Mobile/',Receipt_Voucher_);
}
Search_Ledger(Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_Type_Id): Observable<any> {
   ;
 return this.http.get(environment.BasePath + 'Receipt_Voucher/Ledger_Report/'  
  + Search_FromDate + '/' + Search_ToDate + '/' + ClientAccounts_Id + '/' + Voucher_Type_Id  );
}
Search_Sales_Summary_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No,Employee_Id): Observable<any> {
return this.http.get(environment.BasePath + 'Receipt_Voucher/Get_Sales_summary/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
ClientAccounts_Id + '/' + Voucher_No + '/' +  Employee_Id);
}
Search_Sales_Report_Details(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Employee_Id,Item_Id_): Observable<any> {
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Search_Sales_Report_Details/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
   ClientAccounts_Id + '/' + Employee_Id + '/' +  Item_Id_);
}
Customer_Sales_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Item_Id_): Observable<any> {
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Customer_Sales_Report/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
   ClientAccounts_Id + '/'  +  Item_Id_);
}
Employee_Sales_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, Employee_Id, Item_Id_): Observable<any> {
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Employee_Sales_Report/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
   Employee_Id + '/'  +  Item_Id_);
}
Search_Sales_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Employee_Id,Item_Id_): Observable<any> {
      return this.http.get(environment.BasePath + 'Receipt_Voucher/Search_Sales_Report/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
      ClientAccounts_Id + '/' + Employee_Id + '/' +  Item_Id_);
      }
Search_Sales_Report_Monthly_Items(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Employee_Id,Item_Id_): Observable<any> {
         return this.http.get(environment.BasePath + 'Receipt_Voucher/Search_Sales_Report_Monthly_Items/'  +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + 
         ClientAccounts_Id + '/' + Employee_Id + '/' +  Item_Id_);
         }
Search_Sales_Details_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No,Item_Id_): Observable<any> 
{
   
    var Search_Data = {'Is_Date_Check_': look_In_Date_Value, 'FromDate_': Search_FromDate, 'ToDate_': Search_ToDate,
       'Client_Id_': ClientAccounts_Id, 'VoucherType_': Voucher_No, 'ItemId_': Item_Id_ }
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Get_Sales_Details_Report/', { params: Search_Data });
}

Search_Quotation_Details_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No,Item_Id_): Observable<any> 
{
   
    var Search_Data = {'Is_Date_Check_': look_In_Date_Value, 'FromDate_': Search_FromDate, 'ToDate_': Search_ToDate,
       'Client_Id_': ClientAccounts_Id, 'VoucherType_': Voucher_No, 'ItemId_': Item_Id_ }
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Get_Quotation_Details_Report/', { params: Search_Data });
}




Search_Sales_Return_Details_Report(look_In_Date_Value,Search_FromDate, Search_ToDate, ClientAccounts_Id, Voucher_No,Item_Id_): Observable<any> 
{
   
    var Search_Data = {'Is_Date_Check_': look_In_Date_Value, 'FromDate_': Search_FromDate, 'ToDate_': Search_ToDate,
       'Client_Id_': ClientAccounts_Id, 'VoucherType_': Voucher_No, 'ItemId_': Item_Id_ }
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Search_Sales_Return_Details_Report/', { params: Search_Data });
}
Search_Receipt_Voucher(Search_FromDate, Search_ToDate,ClientAccount, ClientAccounts_Id,Voucher_No_search_,look_In_Date_Value,Payment_Status_Id): Observable<any> 
{
   debugger
 return this.http.get(environment.BasePath + 'Receipt_Voucher/Search_Receipt_Voucher/' + Search_FromDate +  '/' + Search_ToDate + 
   '/' + ClientAccount + '/' + ClientAccounts_Id + '/' + Voucher_No_search_  + '/' + look_In_Date_Value +'/'+Payment_Status_Id);
}

Get_Stock_Report(Barcode_Search_,Item_Id_,Item_Group_Id_,Employee_Id,look_In_Date_Value): Observable<any>
{
    
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Get_Stock_Report/'+ Barcode_Search_ + '/' + Item_Id_+ '/' + Item_Group_Id_+ '/' + Employee_Id+'/'+look_In_Date_Value);
}
Item_Expiry_Report(look_In_Date_Value,Search_FromDate, Search_ToDate,Barcode_Search_,Item_Id_,Item_Group_Id_,Employee_Id): Observable<any> {
    
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Item_Expiry_Report/' +look_In_Date_Value+'/'+ Search_FromDate + '/' + Search_ToDate + '/' + Barcode_Search_ + '/' + Item_Id_+ '/' + Item_Group_Id_+ '/' + Employee_Id);
}
Search_DayBook_Report(Search_FromDate, Search_ToDate): Observable<any>
{
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Load_DayBook_Report/'+ Search_FromDate + '/' + Search_ToDate );
}
Search_Company() 
{
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Search_Company');
}
Get_Client_Accounts_Typeahead(Client_Accounts_Name): Observable<any> 
{
return this.http.get(environment.BasePath + 'Receipt_Voucher/Client_Accounts_Typeahead/' + Client_Accounts_Name );
}
Sales_receipt_Bill(Account_Party_Id_): Observable<any>
{
   return this.http.get(environment.BasePath + 'Receipt_Voucher/Sales_receipt_Bill/' + Account_Party_Id_ );
}
   
Search_Accounts(Client_Accounts_Name): Observable<any> {  
return this.http.get(environment.BasePath + 'Receipt_Voucher/Client_Accounts_Typeahead/' + Client_Accounts_Name );
}
Get_Payment_Mode():Observable<any>
{
 return this.http.get(environment.BasePath +'Payment_Voucher/Get_Payment_Mode/');
}
Get_Voucher_Type():Observable<any>
{
 return this.http.get(environment.BasePath +'Receipt_Voucher/Search_Voucher_Type/');
}
 Delete_Receipt_Voucher(Receipt_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Receipt_Voucher/Delete_Receipt_Voucher/'+Receipt_Voucher_Id);
}
Get_Receipt_Voucher(Receipt_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Receipt_Voucher/Get_Receipt_Voucher/'+Receipt_Voucher_Id);
}
Get_Receipt_Voucher_Mobile(Receipt_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Receipt_Voucher/Get_Receipt_Voucher_Mobile/'+Receipt_Voucher_Id);
}
}

