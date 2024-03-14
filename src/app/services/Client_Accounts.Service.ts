import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Client_Accounts_Service {
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
Save_Client_Accounts(Client_Accounts_)
{
return this.http.post(environment.BasePath +'Client_Accounts/Save_Client_Accounts/',Client_Accounts_);
}
Search_Client_Accounts(Client_Accounts_Name,Account_Group_):Observable<any>
{
    var Search_Data={'Client_Accounts_Name_':Client_Accounts_Name,'Account_Group_':Account_Group_}
 return this.http.get(environment.BasePath +'Client_Accounts/Search_Client_Accounts/',{params:Search_Data});
}
Search_Bank(Client_Accounts_Name,Account_Group_):Observable<any>
{
    var Search_Data={'Client_Accounts_Name_':Client_Accounts_Name,'Account_Group_':Account_Group_}
    return this.http.get(environment.BasePath +'Client_Accounts/Search_Bank/',{params:Search_Data});
}
Search_Customer(Client_Accounts_Name,Employee_Id):Observable<any>
{
 return this.http.get(environment.BasePath +'Client_Accounts/Search_Customer/'+Client_Accounts_Name+ '/' +Employee_Id);}
 Get_Client_Employee_Typeahead(Client_Accounts_Id):Observable<any>
 {
  return this.http.get(environment.BasePath +'Client_Accounts/Get_Client_Employee_Typeahead/'+Client_Accounts_Id);
}
Delete_Client_Accounts(Client_Accounts_Id)
{
 return this.http.get(environment.BasePath +'Client_Accounts/Delete_Client_Accounts/'+Client_Accounts_Id);
}
Get_Client_Accounts(Client_Accounts_Id)
{
    debugger
 return this.http.get(environment.BasePath +'Client_Accounts/Get_Client_Accounts/'+Client_Accounts_Id);
}

Save_Company(Company_)
{
    
    return this.http.post(environment.BasePath + 'Client_Accounts/Save_Company/', Company_);
}

Delete_Company(Company_Id)
{
    return this.http.get(environment.BasePath + 'Client_Accounts/Delete_Company/' + Company_Id);
}
Search_Company(Company_Name):Observable<any>
{
     var Search_Data = { 'Company_Name': Company_Name}
     return this.http.get(environment.BasePath +'Client_Accounts/Search_Company/',{params:Search_Data});
}

Save_Cheque_Book(Cheque_Book_)
{
    return this.http.post(environment.BasePath +'Client_Accounts/Save_Cheque_Book/',Cheque_Book_);
}
Search_Cheque_Book(Book_No_, Bank_Id_):Observable<any>
{
    var Search_Data = { 'Book_No_': Book_No_, 'Bank_Id_': Bank_Id_}
    return this.http.get(environment.BasePath +'Client_Accounts/Search_Cheque_Book/',{params:Search_Data});
}
Delete_Cheque_Book(Cheque_Book_Id)
{
    return this.http.get(environment.BasePath + 'Client_Accounts/Delete_Cheque_Book/' + Cheque_Book_Id);
}
}

