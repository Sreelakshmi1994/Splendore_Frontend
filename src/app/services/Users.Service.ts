import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Users_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata

Save_Users(Users_)
{
return this.http.post(environment.BasePath +'Users/Save_Users/',Users_);}

Save_Employee_Details(Employee_Details_)
{
return this.http.post(environment.BasePath +'Users/Save_Employee_Details/',Employee_Details_);}

private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Users(Users_Name_,Branch_Id_):Observable<any>
{
 var Search_Data = { 'Users_Name_': Users_Name_, 'Branch_Id_': Branch_Id_ }
  return this.http.get(environment.BasePath + 'Users/Search_Users/', { params: Search_Data });
}
Get_Users_Load_Data():Observable<any>
{
return this.http.get(environment.BasePath +'Users/Get_Users_Load_Data/');
}
Delete_Users(Users_Id)
{
 return this.http.get(environment.BasePath +'Users/Delete_Users/'+Users_Id);}
 Get_Users_Edit(Users_Id)
{
 return this.http.get(environment.BasePath +'Users/Get_Users_Edit/'+Users_Id);
}


Search_User_Role(User_Role_Name): Observable<any> {
    return this.http.get(environment.BasePath + 'Users/Search_User_Role/' + User_Role_Name);
}

Search_Designation(): Observable<any> {
  return this.http.get(environment.BasePath + 'Users/Search_Designation/');
}

Search_Gender(): Observable<any> {
  return this.http.get(environment.BasePath + 'Users/Search_Gender/');
}

Search_Account_Type(): Observable<any> {
  return this.http.get(environment.BasePath + 'Users/Search_Account_Type/');
}

Get_Menu_Status(Menu_Id_,Login_User_)
 {
        return this.http.get(environment.BasePath + 'Users/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
 }
}

