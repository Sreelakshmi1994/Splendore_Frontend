import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location_Service } from '../../../services/Location.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Location } from '../../../models/Location';
import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Location',
templateUrl: './Location.component.html',
styleUrls: ['./Location.component.css']
})
export class LocationComponent implements OnInit {
Location_Data:Location[]
Location_:Location= new Location();
Location_Name_Search:string;
Entry_View:boolean=true;
myInnerHeight: number;
EditIndex: number;
 Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Location_Edit:boolean;
Location_Save:boolean;
Location_Delete:boolean;

Search_Location_:string;
constructor(public Location_Service_:Location_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(94);
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Location_Edit=this.Permissions.Edit;
this.Location_Save=this.Permissions.Save;
this.Location_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
this.Clr_Location();
this.Search_Location();
this.Entry_View=false;
}
Create_New()
{
this.Entry_View = true;
this.Clr_Location();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Location()
 {
this.Location_.Location_Id=0;
this.Location_.Location_Name="";

}
Search_Location()
{
     
this.issLoading=true;
if(this.Search_Location_==undefined)
this.Search_Location_="";
this.Location_Service_.Search_Location(this.Search_Location_).subscribe(Rows => {
     
 this.Location_Data=Rows[0];

this.issLoading=false;
this.Total_Entries=this.Location_Data.length;
if(this.Location_Data.length==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
}
this.issLoading = false;
 },
 Rows => { 
this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); 
 });
}
Delete_Location(Location_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Location_Service_.Delete_Location(Location_Id).subscribe(Delete_status => {
    Delete_status=Delete_status[0];
    Delete_status=Delete_status[0].DeleteStatus_.data[0];
 if(Delete_status==1){
 
 this.Location_Data.splice(index, 1);
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
 }
 else
 {
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
 }
this.issLoading=false;
 },
 Rows => { 
     this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
 });
}
Save_Location()
{
if (this.Location_.Location_Name == undefined || this.Location_.Location_Name == null || this.Location_.Location_Name == "") {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter the Location', Type: "3" } });
}

else
{ 
// document.getElementById('Save_Button').hidden=true;
this.issLoading=true;
this.Location_Service_.Save_Location(this.Location_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Location_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
}
else{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
    this.issLoading=false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });

this.Clr_Location();
}
}
Edit_Location(Location_e:Location,index)
{
this.Entry_View=true;
this.Location_=Location_e;
this.Location_=Object.assign({},Location_e);
}
}

