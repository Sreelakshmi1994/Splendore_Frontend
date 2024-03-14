import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Salary_Calculation_Master_Service {
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
Save_Salary_Calculation_Master(Salary_Calculation_Master_)
{
    debugger
return this.http.post(environment.BasePath +'Salary_Calculation_Master/Save_Salary_Calculation_Master/',Salary_Calculation_Master_);
}
Search_Salary_Calculation_Master(From_Date_,To_Date_,Is_Date_,Calculation_No_):Observable<any>
{
    var Search_Data = { 'From_Date_':From_Date_,'To_Date_':To_Date_,'Is_Date_':Is_Date_,'Calculation_No_':Calculation_No_}
 return this.http.get(environment.BasePath +'Salary_Calculation_Master/Search_Salary_Calculation_Master/',{params:Search_Data});
}
Delete_Salary_Calculation_Master(Salary_Calculation_Master_Id)
{
 return this.http.get(environment.BasePath +'Salary_Calculation_Master/Delete_Salary_Calculation_Master/'+Salary_Calculation_Master_Id);
}
Get_Salary_Calculation_Master(Salary_Calculation_Master_Id)
{
 return this.http.get(environment.BasePath +'Salary_Calculation_Master/Get_Salary_Calculation_Master/'+Salary_Calculation_Master_Id);
}
Get_Salary_Print_Details(Salary_Calculation_Details_Id)
{
 return this.http.get(environment.BasePath +'Salary_Calculation_Master/Get_Salary_Print_Details/'+Salary_Calculation_Details_Id);
}
Search_Salary_Employee(From_Date_,To_Date_,Is_Date_,Store_Id_):Observable<any>
{
    var Search_Data = { 'From_Date_':From_Date_,'To_Date_':To_Date_,'Is_Date_':Is_Date_,'Store_Id_':Store_Id_}
    return this.http.get(environment.BasePath +'Salary_Calculation_Master/Search_Salary_Employee/',{params:Search_Data});
}


Save_WPS_Salary_Calculation_Master(WPS_Salary_Calculation_Master_)
{
return this.http.post(environment.BasePath +'Salary_Calculation_Master/Save_WPS_Salary_Calculation_Master/',WPS_Salary_Calculation_Master_);
}
Search_WPS_Salary_Calculation_Master(From_Date_,To_Date_,Is_Date_,Calculation_No_,Store_Id_):Observable<any>
{
    var Search_Data = { 'From_Date_':From_Date_,'To_Date_':To_Date_,'Is_Date_':Is_Date_,'Calculation_No_':Calculation_No_,'Store_Id_':Store_Id_}
 return this.http.get(environment.BasePath +'Salary_Calculation_Master/Search_WPS_Salary_Calculation_Master/',{params:Search_Data});
}
Delete_WPS_Salary_Calculation_Master(WPS_Salary_Calculation_Master_Id)
{
 return this.http.get(environment.BasePath +'Salary_Calculation_Master/Delete_WPS_Salary_Calculation_Master/'+WPS_Salary_Calculation_Master_Id);
}
Get_WPS_Salary_Calculation_Master(WPS_Salary_Calculation_Master_Id)
{
 return this.http.get(environment.BasePath +'Salary_Calculation_Master/Get_WPS_Salary_Calculation_Master/'+WPS_Salary_Calculation_Master_Id);
}
Search_WPS_Employee(From_Date_,To_Date_,Is_Date_,Store_Id_):Observable<any>
{
    var Search_Data = { 'From_Date_':From_Date_,'To_Date_':To_Date_,'Is_Date_':Is_Date_,'Store_Id_':Store_Id_}
    return this.http.get(environment.BasePath +'Salary_Calculation_Master/Search_WPS_Employee/',{params:Search_Data});
}
}