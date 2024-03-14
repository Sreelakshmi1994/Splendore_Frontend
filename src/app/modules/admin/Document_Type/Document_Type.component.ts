import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enquiry_Source_Service } from '../../../services/Enquiry_Source.service';
import { GeneralFunctions_Service } from '../../../services/GeneralFunctions.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Enquiry_Source } from '../../../models/Enquiry_Source';
import { Document_Type } from '../../../models/Document_Type';
import {MatDialog} from '@angular/material';
import { Student_Service } from "../../../services/Student.service";
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';

@Component({
selector: 'app-Document_Type',
templateUrl: './Document_Type.component.html',
styleUrls: ['./Document_Type.component.css']
})
export class Document_TypeComponent implements OnInit {

  Document_Type_Data:Document_Type[]
  Document_Type_:Document_Type= new Document_Type();
  Document_Type_Search:string;

Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Document_Type_Edit:boolean;
Document_Type_Save:boolean;
Document_Type_Delete:boolean;
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
this.Clr_Document_Type();
this.Search_Document_Type();
this.Entry_View=false;
this.Get_Menu_Status(120,this.Login_User); 
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
        
        if(Menu_id==120)
        {
             this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.Document_Type_Edit=this.Permissions.Edit;
                this.Document_Type_Save=this.Permissions.Save;
                this.Document_Type_Delete=this.Permissions.Delete;
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
this.Clr_Document_Type();
}
Close_Click()
{
this.Entry_View = false;
this.Search_Document_Type();
this.Clr_Document_Type();
}
trackByFn(index, item) 
{
return index;
}

 Clr_Document_Type()
 {
this.Document_Type_.Document_Type_Id=0;
this.Document_Type_.Document_Type_Name="";
}
Search_Document_Type()
{
this.issLoading=true;
this.Student_Service_.Search_Document_Type(this.Document_Type_Search).subscribe(Rows => {
    this.issLoading=false;
 this.Document_Type_Data=Rows[0];
 this.Total_Entries=this.Document_Type_Data.length;
if(this.Document_Type_Data.length==0)
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
Delete_Document_Type(Document_Type_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Student_Service_.Delete_Document_Type(Document_Type_Id).subscribe(Delete_status => {
        debugger
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        debugger
        if(Delete_status==1){
        this.Document_Type_Data.splice(index, 1);
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



Save_Document_Type()
{ 
if(this.Document_Type_.Document_Type_Name===undefined || this.Document_Type_.Document_Type_Name==null ||this.Document_Type_.Document_Type_Name=="")
{
const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Document Type',Type: "3" }});
return  
}
this.issLoading=true;
this.Student_Service_.Save_Document_Type(this.Document_Type_).subscribe(Save_status => {
Save_status=Save_status[0];
if(Number(Save_status[0].Document_Type_Id_)>0)
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

Edit_Document_Type(Document_Type_e:Document_Type,index)
{
this.Entry_View=true;
this.Document_Type_=Document_Type_e;
this.Document_Type_=Object.assign({},Document_Type_e);
}
}

