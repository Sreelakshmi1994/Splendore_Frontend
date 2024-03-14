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
export class Leave_Request_Service {
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
Save_Leave_Request(Leave_Request_)
{
return this.http.post(environment.BasePath +'Leave_Request/Save_Leave_Request/',Leave_Request_);}
Save_Leave_Request_Admin(Leave_Request_)
{
return this.http.post(environment.BasePath +'Leave_Request/Save_Leave_Request_Admin/',Leave_Request_);}


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
Search_Leave_Request_Admin(Search_FromDate, Search_ToDate,Leave_Request_Party_Name_,Date_Value_,Store_Id,Status_Id_):Observable<any>
{
 var Search_Data = {'Fromdate_': Search_FromDate, 'Todate_': Search_ToDate, 'Leave_Request_Party_Name_': Leave_Request_Party_Name_,'Date_Value_':Date_Value_, 'Store_Id_': Store_Id,
 'Status_Id_': Status_Id_}
 return this.http.get(environment.BasePath +'Leave_Request/Search_Leave_Request_Admin/',{params:Search_Data});}
 Search_Leave_Report_Admin(Search_FromDate, Search_ToDate,Leave_Request_Party_Name_,Store_Id):Observable<any>
{
 var Search_Data = {'Fromdate_': Search_FromDate, 'Todate_': Search_ToDate, 'Leave_Request_Party_Name_': Leave_Request_Party_Name_, 'Store_Id_': Store_Id}
 return this.http.get(environment.BasePath +'Leave_Request/Search_Leave_Report_Admin/',{params:Search_Data});}
Delete_Leave_Request(Leave_Request_Id)
{
 return this.http.get(environment.BasePath +'Leave_Request/Delete_Leave_Request/'+Leave_Request_Id);}
Get_Leave_Request(Leave_Request_Id)
{
 return this.http.get(environment.BasePath +'Leave_Request/Get_Leave_Request/'+Leave_Request_Id);}

 Search_Leave_Request(Client_Accounts_Id,Status_Id_):Observable<any>
{
 var Search_Data = { 'Client_Accounts_Id':Client_Accounts_Id,'Status_Id_':Status_Id_}
 return this.http.get(environment.BasePath +'Leave_Request/Search_Leave_Request/',{params:Search_Data});}
}

