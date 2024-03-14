import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Country_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Country(Country_)
{debugger
return this.http.post(environment.BasePath +'Country/Save_Country/',Country_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}


Search_Country_Typeahead(Country_Name): Observable<any> {
    var Search_Data = { 'Country_Name': Country_Name}
    return this.http.get(environment.BasePath + 'Country/Search_Country_Typeahead/', { params: Search_Data });
}


Search_Application_StatusforChangeStatus_Typeahead(Status_Name,Login_User): Observable<any> {
    debugger
    var Search_Data = { 'Status_Name': Status_Name,'Login_User': Login_User}
    return this.http.get(environment.BasePath + 'Country/Search_Application_StatusforChangeStatus_Typeahead/', { params: Search_Data });
}


Search_Country(Country_Name):Observable<any>
{debugger
var Search_Data={'Country_Name':Country_Name}
 return this.http.get(environment.BasePath +'Country/Search_Country/',{params:Search_Data});}
Delete_Country(Country_Id)
{
 return this.http.get(environment.BasePath +'Country/Delete_Country/'+Country_Id);}
Get_Country(Country_Id)
{
 return this.http.get(environment.BasePath +'Country/Get_Country/'+Country_Id);}
Get_Menu_Status(Menu_Id_,Login_User_)
{
    debugger
    return this.http.get(environment.BasePath + 'Student/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
}


Get_Checklist_Country(Country_Id)
   {
    return this.http.get(environment.BasePath +'Student/Get_Checklist_Country/'+Country_Id);
   }



   Save_Checklist(Checklist_)
   {
    debugger
   return this.http.post(environment.BasePath +'Student/Save_Checklist/',Checklist_);
   }

   Delete_Checklist(Checklist_Id)
{
 return this.http.get(environment.BasePath +'Student/Delete_Checklist/'+Checklist_Id);
}

   
}

