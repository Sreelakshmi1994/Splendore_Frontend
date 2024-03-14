import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
@Injectable({providedIn: 'root'})
export class Master_Call_Service {
constructor(private http: HttpClient)
{
    const httpOptions = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
}AnimationKeyframesSequenceMetadata
private extractData(res: Response)
{
let body = res; return body || { };
}


fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
fileExtension = '.xlsx';
public exportExcel(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
}
private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
}

Get_Menu_Permission(Login_Id): Observable<any> 
{
 return this.http.get(environment.BasePath + 'Login/Get_Menu_Permission/' + Login_Id);
}
Get_Menu_Status(Login_User,Menu_Id_)
{
    return this.http.get(environment.BasePath + 'Login/Get_Menu_Status/' +Login_User+'/'+ Menu_Id_);
}
Search_Account_Group_Typeahead(Account_Group_Name): Observable<any> {
    var Search_Data = { 'Group_Name_': Account_Group_Name, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_Account_Group_Typeahead/', { params: Search_Data });
}
Search_Department_Typeahead(Department_Name): Observable<any> {
    var Search_Data = { 'Department_Name_': Department_Name, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_Department_Typeahead/', { params: Search_Data });
}
Search_HSN_Typeahead(HSN_Id,HSN_Name): Observable<any> {
    var Search_Data = { 'Department_Name_': HSN_Id,HSN_Name }
    return this.http.get(environment.BasePath + 'Master_Call/Search_HSN_Typeahead/', { params: Search_Data });
}
Search_Employee_Details_Typeahead(Client_Accounts_Name): Observable<any> {
    var Search_Data = { 'Client_Accounts_Name_': Client_Accounts_Name, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_Employee_Details_Typeahead/', { params: Search_Data });
}
Search_Item_Typeahead(Item_Name): Observable<any> {
    var Search_Data = { 'Item_Name_': Item_Name, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_Item_Typeahead/', { params: Search_Data });
}
Search_Store_Typeahead(Store_Name): Observable<any> {
    var Search_Data = { 'Store_Name_': Store_Name, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_Store_Typeahead/', { params: Search_Data });
}

Search_From_Partie_Typeahead(Name): Observable<any> {
    var Search_Data = { 'Name_': Name, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_From_Partie_Typeahead/', { params: Search_Data });
}
Search_To_Partie_Typeahead(Name): Observable<any> {
    var Search_Data = { 'Name_': Name, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_To_Partie_Typeahead/', { params: Search_Data });
}
Search_Customer_Typeahead(Customer_Name): Observable<any> {
    var Search_Data = { 'Customer_Name_': Customer_Name, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_Customer_Typeahead/', { params: Search_Data });
}


Load_Attendance_Status_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Attendance_Status_Dropdown/');
}
Load_Gender_Dropdown(): Observable<any>
{
    return this.http.get(environment.BasePath + 'Master_Call/Load_Gender_Dropdown/');
}

Load_OpeningType(): Observable<any>
{
    return this.http.get(environment.BasePath + 'Master_Call/Load_OpeningType/');
}

Load_Payment_Mode_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Payment_Mode_Dropdown/');
}
Load_Designation_Dropdown(): Observable<any> {
   
    return this.http.get(environment.BasePath + 'Master_Call/Load_Designation_Dropdown/');
}
Load_Leave_Type_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Leave_Type_Dropdown/');
}
Load_Loan_Request_Status_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Loan_Request_Status_Dropdown/');
}
Load_Leave_Request_Status_Dropdown(): Observable<any> {
  
    return this.http.get(environment.BasePath + 'Master_Call/Load_Leave_Request_Status_Dropdown/');
}
Load_Advance_Request_Status_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_advance_request_status_Dropdown/');
}
Load_Level_Dropdown(): Observable<any> {
   
    return this.http.get(environment.BasePath + 'Master_Call/Load_Level_Dropdown/');
}
Load_Payment_Status_Dropdown(): Observable<any> {
   
    return this.http.get(environment.BasePath + 'Master_Call/Load_Payment_Status_Dropdown/');
}
Load_Sales_Status_Dropdown(): Observable<any> {
   
    return this.http.get(environment.BasePath + 'Master_Call/Load_Sales_Status_Dropdown/');
}
Load_Store_Preorder_Sales_Dropdown(): Observable<any> {
  
    return this.http.get(environment.BasePath + 'Master_Call/Load_Store_Preorder_Sales_Dropdown/');
}
Load_Store_Expense_Status_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Store_Expense_Status_Dropdown/');
}
Load_Neft_Request_Status_Dropdown(): Observable<any> {
   
    return this.http.get(environment.BasePath + 'Master_Call/Load_Neft_Request_Status_Dropdown/');
}

Load_Bank_Statement_Status_Dropdown(): Observable<any> {
   
    return this.http.get(environment.BasePath + 'Master_Call/Load_Bank_Statement_Status_Dropdown/');
}
Load_Salary_Status_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Salary_Status_Dropdown/');
}
Load_Store_Commision_Status_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Store_Commision_Status_Dropdown/');
}
Load_Transportation_Status_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Transportation_Status_Dropdown/');
}
Load_Stock_Status_Dropdown(): Observable<any> {
   
    return this.http.get(environment.BasePath + 'Master_Call/Load_Stock_Status_Dropdown/');
}
Load_Item_Group_Dropdown(): Observable<any> {
   
    return this.http.get(environment.BasePath + 'Master_Call/Load_Item_Group_Dropdown/');
}
Load_Sales_Unit_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Sales_Unit_Dropdown/');
}
Load_Cancellation(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Cancellation/');
}
Load_Leave_Mode_Dropdown(): Observable<any>
{
    return this.http.get(environment.BasePath + 'Master_Call/Load_Leave_Mode_Dropdown/');
}
Load_Department_Dropdown(): Observable<any>
{
    return this.http.get(environment.BasePath + 'Master_Call/Load_Department_Dropdown/');
}
Get_Dashboard_Count(Client_Accounts_Id)
{
    return this.http.get(environment.BasePath + 'Master_Call/Get_Dashboard_Count/' + Client_Accounts_Id);
}
Get_Leave_Count(Client_Accounts_Id)
{
    debugger
    return this.http.get(environment.BasePath + 'Master_Call/Get_Leave_Count/' + Client_Accounts_Id);
}
Load_Document_Type(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Document_Type/');
}
Load_General_Settings(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_General_Settings/');
}
Search_Under_Group_Typeahead(Under_Group_): Observable<any> {
    var Search_Data = { 'Under_Group_': Under_Group_, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_Under_Group_Typeahead/', { params: Search_Data });
}
Load_Updatedat_Dropdown(): Observable<any> {
   
    return this.http.get(environment.BasePath + 'Master_Call/Load_Updatedat_Dropdown/');
}
Load_Deposited(): Observable<any> {
   
    return this.http.get(environment.BasePath + 'Master_Call/Load_Deposited/');
}
Search_Client_Accounts_Typeahead(Client_Accounts_Name): Observable<any> {
    var Search_Data = { 'Client_Accounts_Name_': Client_Accounts_Name, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_Client_Accounts_Typeahead/', { params: Search_Data });
}
Search_Client_Group_Typeahead(Account_Group_Id_,Client_Accounts_Name): Observable<any> {
    var Search_Data = {'Account_Group_Id_':Account_Group_Id_, 'Client_Accounts_Name_': Client_Accounts_Name, }
    return this.http.get(environment.BasePath + 'Master_Call/Search_Client_Group_Typeahead/', { params: Search_Data });
}
Load_Primary_Details_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_Primary_Details_Dropdown/');
}
Load_For_Month_Data(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_For_Month_Data/');
}
Load_store_preorder_sales_status_Dropdown(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_store_preorder_sales_status_Dropdown/');
}
Load_alphabet(): Observable<any> {
    
    return this.http.get(environment.BasePath + 'Master_Call/Load_alphabet/');
}
}