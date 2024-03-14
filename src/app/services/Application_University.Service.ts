import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Application_University_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata

// Save_Application_University(Application_University_): Observable<any> {
//     const postData = new FormData();
//     postData.append("Application_University_Id", Application_University_.Application_University_Id);
//     postData.append("Application_University_Name", Application_University_.Application_University_Name);
//     postData.append("About", Application_University_.About);
//     postData.append("About1", Application_University_.About1); 
//     postData.append("About2", Application_University_.About2);
//     postData.append("Location", Application_University_.Location);
//     postData.append("Address", Application_University_.Address);
//     postData.append("Founded_In", Application_University_.Founded_In);
//     postData.append("Institution_Type", Application_University_.Institution_Type);
//     postData.append("Cost_Of_Living", Application_University_.Cost_Of_Living);
//     postData.append("Tution_Fee", Application_University_.Tution_Fee);
//     postData.append("Application_Fee", Application_University_.Application_Fee);
//     postData.append("Type_Of_Accomodation", Application_University_.Type_Of_Accomodation);
//     postData.append("Contact_Number", Application_University_.Contact_Number);
//     postData.append("Email", Application_University_.Email);
//     postData.append("Web", Application_University_.Web);
//     postData.append("Fb", Application_University_.Fb);
//     postData.append("Linkedin", Application_University_.Linkedin);
//     postData.append("Twitter", Application_University_.Twitter);
//     postData.append("Googlemap", Application_University_.Googlemap);
//     postData.append("Status", Application_University_.Status);
//     postData.append("Country_Id", Application_University_.Country_Id);
//     postData.append("Sub_Heading1", Application_University_.Sub_Heading1);
//     postData.append("Sub_Heading2", Application_University_.Sub_Heading2);
//     postData.append("Sub_Heading3", Application_University_.Sub_Heading3);
//     postData.append("School_Rank", Application_University_.School_Rank);
//     postData.append("Video_Link", Application_University_.Video_Link);
//     postData.append("Sub_Heading_Colored", Application_University_.Sub_Heading_Colored);
//     postData.append("Banner_Image", Application_University_.Banner_Image);
//     if(image!=undefined){
//   for(const img of image)
//   {
//      postData.append("myFile", img);
// }
//     }
    
//     return this.http.post(environment.BasePath + 'Application_University/Save_Application_University', postData);
// }
Save_Application_University_Photos(Application_University_Id,Application_University_File,image: File[]): Observable<any> 
{
    const postData = new FormData();
    postData.append("Application_University_Id", Application_University_Id);
   
    postData.append("Photo", Application_University_File);
    if(image!=undefined){
    for(const img of image)
    {
       postData.append("myFile", img);
  }
}

return this.http.post(environment.BasePath + 'Application_University/Save_Application_University_Photos', postData);
}
private extractData(res: Response)
{
let body = res;
return body || { };
}
Save_Application_University(Application_University_)
{
return this.http.post(environment.BasePath +'Application_University/Save_Application_University/',Application_University_);}
Application_University_Typeahead_with_Level_Country(Country_Id,Level_Detail_Id,Application_University_Id): Observable<any> {
    var Search_Data = { 'Application_University_Name': Application_University_Id,'Country_Id': Country_Id,'Level_Detail_Id': Level_Detail_Id }
    return this.http.get(environment.BasePath + 'Application_University/Application_University_Typeahead_with_Level_Country/', { params: Search_Data });
}
Application_University_Typeahead(Application_University_Id): Observable<any> {
  var Search_Data = { 'Application_University_Name': Application_University_Id}
  return this.http.get(environment.BasePath + 'Application_University/Application_University_Typeahead/', { params: Search_Data });
}
Load_Country()
 {
  return this.http.get(environment.BasePath +'Application_University/Load_Country/');}
 Load_Status()
 {
  return this.http.get(environment.BasePath +'Application_University/Load_Status/');}
Search_Application_University(Application_University_Name):Observable<any>
{
var Search_Data={'Application_University_Name':Application_University_Name}
 return this.http.get(environment.BasePath +'Application_University/Search_Application_University/',{params:Search_Data});}
Delete_Application_University(Application_University_Id)
{
 return this.http.get(environment.BasePath +'Application_University/Delete_Application_University/'+Application_University_Id);}
Get_Application_University(Application_University_Id)
{
 return this.http.get(environment.BasePath +'Application_University/Get_Application_University_Photos/'+Application_University_Id);}


 Search_Application_University_Typeahead(Application_University_Name): Observable<any> {
  var Search_Data = { 'Application_University_Name': Application_University_Name}
  return this.http.get(environment.BasePath + 'Application_University/Search_Application_University_Typeahead/', { params: Search_Data });
}

Get_Menu_Status(Menu_Id_,Login_User_)
{
    return this.http.get(environment.BasePath + 'Student/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
}


}

