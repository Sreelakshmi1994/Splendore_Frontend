import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralFunctions_Service } from '../../../services/GeneralFunctions.service';
import { Experience_Service } from '../../../services/Experience.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Experience } from '../../../models/Experience';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
selector: 'app-Experience',
templateUrl: './Experience.component.html',
styleUrls: ['./Experience.component.css']
})
export class ExperienceComponent implements OnInit {
Experience_Data:Experience[]
Experience_:Experience= new Experience();
Experience_Name_Search:string;
Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Experience_Edit:boolean;
Experience_Save:boolean;
Experience_Delete:boolean;
myInnerHeight: number;
Login_User: string = "0";

constructor(public GeneralFunctions_Service_:GeneralFunctions_Service ,public Experience_Service_:Experience_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{

this.Login_User = localStorage.getItem("Login_User");
// this.Permissions = Get_Page_Permission(15);
// if(this.Permissions==undefined || this.Permissions==null)
// {
// localStorage.removeItem('token');
// this.router.navigateByUrl('/auth/login');
// }
// else
{
// this.Experience_Edit=this.Permissions.Edit;
// this.Experience_Save=this.Permissions.Save;
// this.Experience_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Experience();
this.Search_Experience();
this.Entry_View=false;
this.Get_Menu_Status(16,this.Login_User); 

}

Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.GeneralFunctions_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            

    
    if (Rows[0][0]==undefined)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
    }  
    else
    if (Rows[0][0].View >0) 
    {
        if(Menu_id==16)
        {
            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.Experience_Edit=this.Permissions.Edit;
                this.Experience_Save=this.Permissions.Save;
                this.Experience_Delete=this.Permissions.Delete;
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
this.Clr_Experience();
}
Close_Click()
{
this.Entry_View = false;
this.Search_Experience();
}
trackByFn(index, item) 
{
return index;
}

 Clr_Experience()
 {
this.Experience_.Experience_Id=0;
this.Experience_.Experience_Name="";
this.Experience_.User_Id=0;

}
Search_Experience()
{
this.issLoading=true;
this.Experience_Service_.Search_Experience(this.Experience_Name_Search).subscribe(Rows => {
 this.Experience_Data=Rows[0];
this.Total_Entries=this.Experience_Data.length;
if(this.Experience_Data.length==0)
{
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
}
this.issLoading=false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
Delete_Experience(Experience_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;

this.Experience_Service_.Delete_Experience(Experience_Id).subscribe(Delete_status => {
    
 Delete_status = Delete_status[0];
// Delete_status = Delete_status[0].DeleteStatus_.data[0];
if(Delete_status[0].Experience_Id_>0){
    
this.Experience_Data.splice(index, 1);
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
}
else
{
this.issLoading=false;
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

Save_Experience()
{
this.issLoading=true;
this.Experience_Service_.Save_Experience(this.Experience_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Experience_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Close_Click();
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
Edit_Experience(Experience_e:Experience,index)
{
this.Entry_View=true;
this.Experience_=Experience_e;
this.Experience_=Object.assign({},Experience_e);
}
}

