import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User_Type_Service } from '../../../services/User_Type.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { User_Type } from '../../../models/User_Type';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-User_Type',
    templateUrl: './User_Type.component.html',
    styleUrls: ['./User_Type.component.css']
})
export class User_TypeComponent implements OnInit {
    User_Type_Data:User_Type[]
    User_Type_:User_Type= new User_Type();
    User_Type_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    User_Type_Edit:boolean;
    User_Type_Save:boolean;
    User_Type_Delete:boolean;
    myInnerHeight: number;

    Login_User_Id:number=0;
constructor(public User_Type_Service_:User_Type_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    this.Permissions = Get_Page_Permission(7);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.User_Type_Edit=this.Permissions.Edit;
    this.User_Type_Save=this.Permissions.Save;
    this.User_Type_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_User_Type();
    this.Search_User_Type();
    this.Entry_View=false;
}
Create_New()
{
    this.Entry_View = true;
    this.Clr_User_Type();
}
Close_Click()
{
    this.Search_User_Type();
    this.Clr_User_Type();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_User_Type()
{
    this.User_Type_.User_Type_Id=0;
    this.User_Type_.User_Type_Name="";
}
Search_User_Type()
{
    this.issLoading=true;
    this.User_Type_Service_.Search_User_Type(this.User_Type_Name_Search).subscribe(Rows => {
    this.User_Type_Data=Rows[0];
    this.Total_Entries=this.User_Type_Data.length;
    if(this.User_Type_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    this.issLoading=false;
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Delete_User_Type(User_Type_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.User_Type_Service_.Delete_User_Type(User_Type_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        if(Delete_status==1){
        this.User_Type_Data.splice(index, 1);
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
Save_User_Type()
{
    if(this.User_Type_.User_Type_Name===undefined || this.User_Type_.User_Type_Name==null || this.User_Type_.User_Type_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter User Type ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    this.User_Type_Service_.Save_User_Type(this.User_Type_).subscribe(Save_status => {
    Save_status=Save_status[0];
    if(Number(Save_status[0].User_Type_Id_)>0)
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
Edit_User_Type(User_Type_e:User_Type,index)
{
    this.Entry_View=true;
    this.User_Type_=User_Type_e;
    this.User_Type_=Object.assign({},User_Type_e);
}
}

