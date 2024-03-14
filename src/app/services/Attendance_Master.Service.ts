import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Attendance_Master_Service {
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
Save_Attendance_Master(Attendance_Master_)
{
return this.http.post(environment.BasePath +'Attendance_Master/Save_Attendance_Master/',Attendance_Master_);}
Search_Attendance_Master(Attendance_Master_Name):Observable<any>
{
 var Search_Data = { 'Attendance_Master_Name':Attendance_Master_Name}
 return this.http.get(environment.BasePath +'Attendance_Master/Search_Attendance_Master/',{params:Search_Data});}
 Search_Attendance_Master_Admin(Search_FromDate, Search_ToDate,Store_Id):Observable<any>
{
 var Search_Data = {'From_Date_': Search_FromDate, 'To_Date_': Search_ToDate,'Store_Id_': Store_Id}
 return this.http.get(environment.BasePath +'Attendance_Master/Search_Attendance_Master_Admin/',{params:Search_Data});
}
Delete_Attendance_Master(Attendance_Master_Id)
{
 return this.http.get(environment.BasePath +'Attendance_Master/Delete_Attendance_Master/'+Attendance_Master_Id);}
Get_Attendance_Master(Attendance_Master_Id)
{
 return this.http.get(environment.BasePath +'Attendance_Master/Get_Attendance_Master/'+Attendance_Master_Id);}

 Search_Attendance_Master_Import(From_Date_,To_Date_,Is_Date_Check_,Store_Id_):Observable<any>
{
 var Search_Data = { 'From_Date_':From_Date_,'To_Date_':To_Date_,'Is_Date_Check_':Is_Date_Check_,'Store_Id_':Store_Id_}
 return this.http.get(environment.BasePath +'Attendance_Master/Search_Attendance_Master_Import/',{params:Search_Data});
}

Save_Attendance_Master_Import(Attendance_Master_)
{
return this.http.post(environment.BasePath +'Attendance_Master/Save_Attendance_Master_Import/',Attendance_Master_);
}

Load_Employee(): Observable<any> {
    debugger
    return this.http.get(environment.BasePath + "Attendance_Master/Load_Employee/");
}

}

