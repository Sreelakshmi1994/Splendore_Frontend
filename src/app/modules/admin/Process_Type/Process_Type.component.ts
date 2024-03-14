import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry_Source_Service } from '../../../services/Enquiry_Source.service';
import { GeneralFunctions_Service } from '../../../services/GeneralFunctions.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Enquiry_Source } from '../../../models/Enquiry_Source';
import { Process_Type } from '../../../models/Process_Type';
import {MatDialog} from '@angular/material';
import { Student_Service } from "../../../services/Student.service";
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';

@Component({
selector: 'app-Process_Type',
templateUrl: './Process_Type.component.html',
styleUrls: ['./Process_Type.component.css']
})
export class Process_TypeComponent implements OnInit {

  Process_Type_Data:Process_Type[]
  Process_Type_:Process_Type= new Process_Type();
  Process_Type_Search:string;

Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Process_Type_Edit:boolean;
Process_Type_Save:boolean;
Process_Type_Delete:boolean;
myInnerHeight: number;
myTotalHeight:number;
Login_User: string = "0";
array:any;

constructor(public GeneralFunctions_Service_:GeneralFunctions_Service,
    public Student_Service_: Student_Service,
    public Enquiry_Source_Service_:Enquiry_Source_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Login_User = localStorage.getItem("Login_User");
// this.Permissions = Get_Page_Permission(14);
// if(this.Permissions==undefined || this.Permissions==null)
// {
// localStorage.removeItem('token');
// this.router.navigateByUrl('/auth/login');
// }
// else
{
// this.Enquiry_Source_Edit=this.Permissions.Edit;
// this.Enquiry_Source_Save=this.Permissions.Save;
// this.Enquiry_Source_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{
this.myInnerHeight = (window.innerHeight);
this.myInnerHeight = this.myInnerHeight - 20;
this.Clr_Process_Type();
this.Search_Process_Type();
this.Entry_View=false;
this.Get_Menu_Status(121,this.Login_User); 
this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-230;
    this.myInnerHeight = this.myInnerHeight - 280;

}

Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.GeneralFunctions_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
    this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
    }  
    else
    if (Rows[0][0].View >0) 
    {       
        
        if(Menu_id==121)
        {
             this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.Process_Type_Edit=this.Permissions.Edit;
                this.Process_Type_Save=this.Permissions.Save;
                this.Process_Type_Delete=this.Permissions.Delete;
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
this.Clr_Process_Type();
}
Close_Click()
{
this.Entry_View = false;
this.Search_Process_Type();
this.Clr_Process_Type();
}
trackByFn(index, item) 
{
return index;
}

 Clr_Process_Type()
 {
this.Process_Type_.Process_Type_Id=0;
this.Process_Type_.Process_Type_Name="";
}
Search_Process_Type()
{
this.issLoading=true;
this.Student_Service_.Search_Process_Type(this.Process_Type_Search).subscribe(Rows => {
    this.issLoading=false;
 this.Process_Type_Data=Rows[0];
 this.Total_Entries=this.Process_Type_Data.length;
if(this.Process_Type_Data.length==0)
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
Delete_Process_Type(Process_Type_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Student_Service_.Delete_Process_Type(Process_Type_Id).subscribe(Delete_status => {
        debugger
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        debugger
        if(Delete_status==1){
        this.Process_Type_Data.splice(index, 1);
        debugger
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
        }
        else
        {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Can not be deleted because its already Used',Type:"2"}});
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



Save_Process_Type()
{ 
if(this.Process_Type_.Process_Type_Name===undefined || this.Process_Type_.Process_Type_Name==null ||this.Process_Type_.Process_Type_Name=="")
{
const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Process Type',Type: "3" }});
return  
}
this.issLoading=true;
this.Student_Service_.Save_Process_Type(this.Process_Type_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Process_Type_Id_)>0)
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

Edit_Process_Type(Process_Type_e:Process_Type,index)
{
this.Entry_View=true;
this.Process_Type_=Process_Type_e;
this.Process_Type_=Object.assign({},Process_Type_e);
}
}

