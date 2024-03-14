import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Internship_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Internship(Internship_)
{
return this.http.post(environment.BasePath +'Internship/Save_Internship/',Internship_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}

Get_Application_Course_Load_Data():Observable<any>
{
return this.http.get(environment.BasePath +'Internship/Get_Application_Course_Load_Data/');
}


Search_Internship(Internship_Name):Observable<any>
{
var Search_Data={'Internship_Name':Internship_Name}
 return this.http.get(environment.BasePath +'Internship/Search_Internship/',{params:Search_Data});}
Delete_Internship(Internship_Id)
{
 return this.http.get(environment.BasePath +'Internship/Delete_Internship/'+Internship_Id);}
Get_Internship(Internship_Id)
{
 return this.http.get(environment.BasePath +'Internship/Get_Internship/'+Internship_Id);}
}

