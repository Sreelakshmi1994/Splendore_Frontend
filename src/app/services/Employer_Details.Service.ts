import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Employer_Details_Servive {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata

Save_Employer_Details(Employer_Details_)
{
return this.http.post(environment.BasePath +'Employer_Details/Save_Employer_Details/',Employer_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Employer_Details(Company_Name):Observable<any>
{
 var Search_Data = { 'Company_Name': Company_Name }
  return this.http.get(environment.BasePath + 'Employer_Details/Search_Employer_Details/', { params: Search_Data });
}
Get_Employer_Details_Load_Data():Observable<any>
{
return this.http.get(environment.BasePath +'Employer_Details/Get_Employer_Details_Load_Data/');
}
Delete_Employer_Details(Employer_Details_Id_)
{
 return this.http.get(environment.BasePath +'Employer_Details/Delete_Employer_Details/'+Employer_Details_Id_);}
 Get_Employer_Details_Edit(Company_Name)
{
 return this.http.get(environment.BasePath +'Employer_Details/Get_Users_Edit/'+Company_Name);
}
Search_Employer_Details_Role(Employer_Details_Role_Name): Observable<any> {
    return this.http.get(environment.BasePath + 'Employer_Details/Search_User_Role/' + Employer_Details_Role_Name);
}
}

