import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { Agent_Details } from '../models/Agent_Details.js';
// models/Agent_Details.js';
@Injectable({
providedIn: 'root'
})
export class Agent_Details_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Agent_Details(Agent_Details_)
{
return this.http.post(environment.BasePath +'Agent_Details/Save_Agent_Details/',Agent_Details_);
}
// Save_Agent_Details(Agent_Details_:Agent_Details,image: File[]) {
        
//     const postData = new FormData();
//     postData.append("Agent_Details_Id", Agent_Details_.Agent_Details_Id.toString());
//     postData.append("Agent_Details_Name", Agent_Details_.Agent_Details_Name);
//     postData.append("Center_Code", Agent_Details_.Center_Code);
//     postData.append("Center_Name", Agent_Details_.Center_Name);
//     postData.append("Comm_Address1", Agent_Details_.Comm_Address1);
//     postData.append("Address1", Agent_Details_.Address1);
//     postData.append("Comm_Address2", Agent_Details_.Comm_Address2);
//     postData.append("Address2", Agent_Details_.Address2);
//     postData.append("Comm_Address3", Agent_Details_.Comm_Address3);
//     postData.append("Address3", Agent_Details_.Address3);
//     postData.append("Comm_Address4", Agent_Details_.Comm_Address4);
//     postData.append("Address4", Agent_Details_.Address4);
//     postData.append("Comm_Pincode", Agent_Details_.Comm_Pincode);
//     postData.append("Approval_Status", Agent_Details_.Approval_Status.toString());
//     postData.append("Mobile", Agent_Details_.Mobile);
//     postData.append("Reg_No", Agent_Details_.Reg_No);
//     postData.append("Email", Agent_Details_.Email);
//     postData.append("Approval_date", Agent_Details_.Approval_date.toString());
//     postData.append("Category_Id", Agent_Details_.Category_Id.toString());
//     postData.append("Agent_Details_Fees", Agent_Details_.Agent_Details_Fees.toString());
//     postData.append("Commission", Agent_Details_.Commission.toString());


//     postData.append("Photo", Agent_Details_.Photo);

//     ;
//     if (image != undefined) {
//         for (const img of image) {
//             postData.append("myFile", img);
//         }
//     }



  
//     return this.http.post(environment.BasePath + 'Agent_Details/Save_Agent_Details', postData);
// }



private extractData(res: Response)
{
let body = res;
return body || { };
}
Search_Agent_Details(Agent_Details_Name):Observable<any>
{
var Search_Data={'Agent_Details_Name':Agent_Details_Name}
 return this.http.get(environment.BasePath +'Agent_Details/Search_Agent_Details/',{params:Search_Data});}
Delete_Agent_Details(Agent_Details_Id)
{
 return this.http.get(environment.BasePath +'Agent_Details/Delete_Agent_Details/'+Agent_Details_Id);}
 
Get_Agent_Details(Agent_Details_Id)
{
 return this.http.get(environment.BasePath +'Agent_Details/Get_Agent_Details/'+Agent_Details_Id);}

 Load_Agent_Details_Dropdowns(): Observable<any> 
{
    return this.http.get(environment.BasePath + 'Agent_Details/Load_Agent_Details_Dropdowns/');
}
Search_Category_Commision(Category_Id_,Commission_): Observable<any> {
    var Search_Data = { 'Category_Id_': Category_Id_, 'Commission_': Commission_ }
    return this.http.get(environment.BasePath + 'Agent_Details/Search_Category_Commision/', { params: Search_Data });
    // return this.http.get(environment.BasePath + 'Agent_Details/Search_Category_Commision/' + Category_Name);
}
Load_Category_Commission(Category_Id_): Observable<any> {
    return this.http.get(environment.BasePath +'Agent_Details/Load_Category_Commission/'+Category_Id_);
}
Save_Agent_Details_Registration(Agent_Details_Id)  {        
    return this.http.get(environment.BasePath +'Agent_Details/Save_Agent_Details_Registration/' +Agent_Details_Id);
}
Remove_Registration(Agent_Details_Id)
{
 return this.http.get(environment.BasePath +'Agent_Details/Remove_Registration/'+Agent_Details_Id );
}
Get_Menu_Status(Menu_Id_,Login_User_)
{
       return this.http.get(environment.BasePath + 'Agent_Details/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
}
Load_Mode(): Observable<any> 
{
    return this.http.get(environment.BasePath + 'Agent_Details/Load_Mode/');
}
Accounts_Typeahead(Account_Group_Id_,Client_Accounts_Name_): Observable<any> 
{
    var Search_Data = { 'Account_Group_Id_': Account_Group_Id_, 'Client_Accounts_Name_': Client_Accounts_Name_ }
    return this.http.get(environment.BasePath + 'Agent_Details/Accounts_Typeahead/', { params: Search_Data });
}
Save_Receipt_Voucher(Receipt_Voucher_)
{
   return this.http.post(environment.BasePath +'Agent_Details/Save_Receipt_Voucher/',Receipt_Voucher_);
}
Get_Receipt_History(Agent_Details_Id)
{
       return this.http.get(environment.BasePath + 'Agent_Details/Get_Receipt_History/' + Agent_Details_Id);
}
Delete_Receipt_Voucher(Receipt_Voucher_Id)
{
 return this.http.get(environment.BasePath +'Agent_Details/Delete_Receipt_Voucher/'+Receipt_Voucher_Id);
}
}
