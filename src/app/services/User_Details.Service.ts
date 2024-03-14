import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class User_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_User_Details(User_Details_)
{
return this.http.post(environment.BasePath +'User_Details/Save_User_Details/',User_Details_);}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_User_Details(User_Details_Name):Observable<any>
{
     
 return this.http.get(environment.BasePath +'User_Details/Search_User_Details/'+User_Details_Name);
}
Employee_Typeahead(Client_Id,Item_Name):Observable<any>
{ 
    if(Item_Name==undefined)
    Item_Name="";
 return this.http.get(environment.BasePath +'Client_Accounts/Accounts_Typeahead/'+Client_Id+'/'+Item_Name);}
Get_Users_Load_Data():Observable<any>
{
return this.http.get(environment.BasePath +'User_Details/Get_Users_Load_Data/');
}

Load_Company():Observable<any>
{
return this.http.get(environment.BasePath +'User_Details/Search_Company/');
}

Delete_User_Details(User_Details_Id)
{
 return this.http.get(environment.BasePath +'User_Details/Delete_User_Details/'+User_Details_Id);}
 Get_User_Details_Edit(User_Details_Id)
{
 return this.http.get(environment.BasePath +'User_Details/Get_User_Details_Edit/'+User_Details_Id);
}
}