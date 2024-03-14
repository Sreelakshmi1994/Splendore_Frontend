import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Sub_Section_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Sub_Section(Sub_Section_)
{
return this.http.post(environment.BasePath +'Sub_Section/Save_Sub_Section/',Sub_Section_);}
// private extractData(res: Response)
// {
// let body = res;
// return body || { };
// }


Sub_Section_Typeahead(Sub_Section_Id):Observable<any>
{
var Search_Data={'Sub_Section_Name':Sub_Section_Id}
 return this.http.get(environment.BasePath +'Sub_Section/Sub_Section_Typeahead/',{params:Search_Data});}

Search_Sub_Section(Sub_Section_Name):Observable<any>
{
var Search_Data={'Sub_Section_Name':Sub_Section_Name}
 return this.http.get(environment.BasePath +'Sub_Section/Search_Sub_Section/',{params:Search_Data});}
Delete_Sub_Section(Sub_Section_Id)
{
 return this.http.get(environment.BasePath +'Sub_Section/Delete_Sub_Section/'+Sub_Section_Id);}
 Get_Sub_Section_From_Course(Subject_Id)
{
 return this.http.get(environment.BasePath +'Sub_Section/Get_Sub_Section_From_Course/'+Subject_Id);
}
}

