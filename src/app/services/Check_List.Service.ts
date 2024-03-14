import { Component, OnInit, Input, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class Check_List_Service {
    constructor(private http: HttpClient) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    } AnimationKeyframesSequenceMetadata
    Save_Check_List(Check_List_) {
        return this.http.post(environment.BasePath + 'Check_List/Save_Check_List/', Check_List_);
    }
    private extractData(res: Response) {
        let body = res;
        return body || {};
    }
    Search_Check_List(Check_List_Name): Observable<any> {
        return this.http.get(environment.BasePath + 'Check_List/Search_Check_List/' + Check_List_Name);
    }
    Delete_Check_List(Check_List_Id) {
        return this.http.get(environment.BasePath + 'Check_List/Delete_Check_List/' + Check_List_Id);
    }
    Get_Check_List(Check_List_Id) {
        return this.http.get(environment.BasePath + 'Check_List/Get_Check_List/' + Check_List_Id);
    }

    Get_Menu_Status(Menu_Id_,Login_User_)
    {
           return this.http.get(environment.BasePath + 'Student/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
   }
   

}

