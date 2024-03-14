import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
providedIn: 'root'
})
export class Application_Course_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Application_Course(Application_Course_)
{
    debugger
return this.http.post(environment.BasePath +'Application_Course/Save_Application_Course/',Application_Course_);}
// private extractData(res: Response)
// {
// let body = res;
// return body || { };
// }


// fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// fileExtension = '.xlsx';
// public exportExcel(jsonData: any[], fileName: string): void 
// {
//   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
//   const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
//   const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//   this.saveExcelFile(excelBuffer, fileName);
// }
// private saveExcelFile(buffer: any, fileName: string): void {
//     const data: Blob = new Blob([buffer], { type: this.fileType });
//    FileSaver.saveAs(data, fileName + this.fileExtension);
// }








Search_Application_Course(Application_Course_Name_,Level_Id_ ,Country_Id_ ,Internship_Id_ ,Duration_Id_ ,University_Id_ ,Subject_Id_,Sub_Section_Id_,Pointer_Start_,Pointer_Stop_,Page_Length_):Observable<any>
{
     debugger
var Search_Data={ 'Application_Course_Name_':Application_Course_Name_,'Level_Id_': Level_Id_,'Country_Id_':Country_Id_,'Internship_Id_':Internship_Id_ ,'Duration_Id_':Duration_Id_,'University_Id_':University_Id_,'Subject_Id_':Subject_Id_,'Sub_Section_Id_':Sub_Section_Id_,'Pointer_Start_':Pointer_Start_,'Pointer_Stop_':Pointer_Stop_,'Page_Length_':Page_Length_}
 return this.http.get(environment.BasePath +'Application_Course/Search_Application_Course/',{params:Search_Data});}


Delete_Application_Course(Application_Course_Id)
{
 return this.http.get(environment.BasePath +'Application_Course/Delete_Application_Course/'+Application_Course_Id);}

Get_Application_Course(Application_Course_Id)
{
    debugger; 
 return this.http.get(environment.BasePath +'Application_Course/Get_Application_Course/'+Application_Course_Id);}
 Get_Intakes_InApplication_Course()
{
    return this.http.get(environment.BasePath +'Intake/Get_Intakes_InApplication_Course/');}


    Get_Menu_Status(Menu_Id_,Login_User_)
 {debugger
        return this.http.get(environment.BasePath + 'Student/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
}
 
Search_Application_Courses_Typeahead(Application_Course_Name): Observable<any> {
  var Search_Data = { 'Application_Course_Name': Application_Course_Name}
  return this.http.get(environment.BasePath + 'Application_Course/Search_Application_Courses_Typeahead/', { params: Search_Data });
}
Search_Application_Courses_Fees_Typeahead(Application_Course_Name,Student_Id): Observable<any> {
  var Search_Data = { 'Application_Course_Name': Application_Course_Name,'Student_Id':Student_Id}
  return this.http.get(environment.BasePath + 'Application_Course/Search_Application_Courses_Fees_Typeahead/', { params: Search_Data });
}



}


