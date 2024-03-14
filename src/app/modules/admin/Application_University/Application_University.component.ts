import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Application_University_Service } from '../../../services/Application_University.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Application_University } from '../../../models/Application_University';
import { Status } from '../../../models/Status';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Application_University_Service } from 'app/services/Application_University.Service';
@Component({
selector: 'app-Application_University',
templateUrl: './Application_University.component.html',
styleUrls: ['./Application_University.component.css']
})
export class Application_UniversityComponent implements OnInit {
Application_University_Data:Application_University[]
Application_University_:Application_University= new Application_University();
Application_University_Search:Application_University=new Application_University();

Application_University_Name_Search:string;

Entry_View:boolean=true;
profile_View:boolean=true;
application_View:boolean=true;

EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
myInnerHeight: number;

Application_University_Edit:boolean;
Application_University_Save:boolean;
Application_University_Delete:boolean;

Status_:Status=new Status();
Status_Data:Status[];
Status_Search:Status=new Status();

ImageFile: any;
File: string;

Application_University_File:string
Application_University_Image:any;
Application_University_Photo=[];
Login_User:string='0';
constructor(public Application_University_Service_:Application_University_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.issLoading=true;   
    this.Page_Load()
  
}
Page_Load()
{ 
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 230;
    this.Get_Menu_Status(109, this.Login_User)
    this.Clr_Application_University();
    this.Search_Application_University();
    this.Entry_View=false;
    this.profile_View=true;
    this.application_View=true;


    
    
}
Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Application_University_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            

    
    if (Rows[0][0]==undefined)
    {
        if(Menu_id==109)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==109)
        {
            
           

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.Application_University_Edit=this.Permissions.Edit;
                this.Application_University_Save=this.Permissions.Save;
                this.Application_University_Delete=this.Permissions.Delete;
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Application_University();
    this.profile_View=true;
    this.application_View=false;
}
Close_Click()
{
    this.Entry_View = false;
}
trackByFn(index, item) 
{
    return index;
}
Clr_Application_University()
 {
this.Application_University_.Application_University_Id=0;
this.Application_University_.Application_University_Name="";

}
Search_Application_University()
{
this.issLoading=true;
this.Application_University_Service_.Search_Application_University(this.Application_University_Name_Search).subscribe(Rows => {
     
 this.Application_University_Data=Rows[0];
this.Total_Entries=this.Application_University_Data.length;
if(this.Application_University_Data.length==0)
{
this.issLoading=false;
const dialogRef = this.dialogBox.open
( DialogBox_Component, {panelClass:'Dialogbox-Class'
,data:{Message:'No Details Found',Type:"3"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}


Delete_Application_University(Application_University_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});

dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Application_University_Service_.Delete_Application_University(Application_University_Id).subscribe(Delete_status => {
if(Delete_status[0][0].Application_University_Id_>0){
this.Application_University_Data.splice(this.EditIndex, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
this.Search_Application_University();
}else if(Number(Delete_status[0][0].Application_University_Id_)== -2)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Already in Use, Cannot be Deleted!',Type:"2"}});
}else{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
 });
}
Save_Application_University()
{

    if (this.Application_University_.Application_University_Name == undefined || this.Application_University_.Application_University_Name == null || this.Application_University_.Application_University_Name == undefined || this.Application_University_.Application_University_Name=='') {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Application_University', Type: "3" } });
       return;
    }
    


this.issLoading=true;
this.Application_University_Service_.Save_Application_University(this.Application_University_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Application_University_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Search_Application_University();
this.Clr_Application_University();
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
 });
}
Edit_Application_University(Application_University_e:Application_University,index)
{
this.Entry_View=true;
this.Application_University_=Application_University_e;
this.Application_University_=Object.assign({},Application_University_e);
}
}


