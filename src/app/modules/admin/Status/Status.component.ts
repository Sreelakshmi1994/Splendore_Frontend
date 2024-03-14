import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Status_Service } from '../../../services/Status.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Status } from '../../../models/Status';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
@Component({
    selector: 'app-Status',
    templateUrl: './Status.component.html',
    styleUrls: ['./Status.component.css']
})
export class StatusComponent implements OnInit {
    Status_Data:Status[]
    Status_:Status= new Status();
    Status_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Status_Edit:boolean;
    Status_Save:boolean;
    Status_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;


    Login_User_Id:number=0;
    Login_User:string="0";
array:any;
constructor(public Status_Service_:Status_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    // this.Permissions = Get_Page_Permission(9);
    // if(this.Permissions==undefined || this.Permissions==null)
    // {
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('/auth/login');
    // }
    // else
    {
    // this.Status_Edit=this.Permissions.Edit;
    // this.Status_Save=this.Permissions.Save;
    // this.Status_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.Get_Menu_Status(9,this.Login_User);
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Status();
    this.Search_Status();
    this.Entry_View=false;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-230;
    this.myInnerHeight = this.myInnerHeight - 250;

}
Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Status_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
  this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==9)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==9)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.Status_Edit= this.array.Edit;
                this.Status_Save= this.array.Save;
                this.Status_Delete= this.array.Delete;
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
    this.Clr_Status();
}
Close_Click()
{
    this.Search_Status();
    this.Clr_Status();
    this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

Clr_Status()
{
    this.Status_.Status_Id=0;
    this.Status_.Status_Name="";
    this.Status_.User_Id=0;
    this.Status_.FollowUp=null;
}
Search_Status()
{
    this.issLoading=true;
    this.Status_Service_.Search_Status(this.Status_Name_Search).subscribe(Rows => {
    this.Status_Data=Rows[0];
    this.Total_Entries=this.Status_Data.length;
    if(this.Status_Data.length==0)
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
Delete_Status(Status_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
            debugger
        this.issLoading=true;
        this.Status_Service_.Delete_Status(Status_Id).subscribe(Delete_status => {
        
        Delete_status = Delete_status[0];
        // Delete_status = Delete_status[0].DeleteStatus_.data[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];


        // debugger
        // if(Delete_status==-2)
        //         {
                
        //         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:' Cannot be Deleted',Type:"2"}});
                
        //         }
      if(Delete_status==1){
            debugger
        this.Status_Data.splice(index, 1);
        const
         dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
        }


        else
        {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be Deleted',Type:"2"}});
        }
        // else
        // {
        // this.issLoading=false;
        // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        // }
        this.issLoading=false;
        },
        Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
    }
    });
}
Save_Status()
{
    if(this.Status_.Status_Name===undefined || this.Status_.Status_Name==null || this.Status_.Status_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Status ',Type: "3" }});
    return  
    } 
    if(this.Status_.FollowUp===undefined || this.Status_.FollowUp==null )
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Select FollowUp ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    this.Status_.User_Id = this.Login_User_Id;
    this.Status_Service_.Save_Status(this.Status_).subscribe(Save_status => {
    Save_status=Save_status[0];
    if(Number(Save_status[0].Status_Id_)>0)
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
Edit_Status(Status_e:Status,index)
{
    this.Entry_View=true;
    this.Status_=Status_e;
    this.Status_=Object.assign({},Status_e);
}
}

