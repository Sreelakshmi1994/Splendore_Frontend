import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users_Service } from '../../../services/Users.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Users } from '../../../models/Users';
import {Employer_Details} from '../../../models/Employer_Details'
import { User_Menu_Selection } from '../../../models/User_Menu_Selection';
import { Employer_Details_Servive} from '../../../services/Employer_Details.Service'
import { User_Type } from '../../../models/User_Type';
import { User_Status } from '../../../models/User_Status';
import { Agent } from '../../../models/Agent';
import { User_Role } from '../../../models/User_Role';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';import { GeneralFunctions_Service } from 'app/services/GeneralFunctions.service';
@Component({
selector: 'app-Employer_Details',
templateUrl: './Employer_Details.component.html',
styleUrls: ['./Employer_Details.component.css']
})
export class Employer_DetailsComponent implements OnInit {
Employer_Details_Data:Employer_Details[]
Search_User_Name_: string;
Company_Name:string;
Search_Agent_: Agent = new Agent();

// User_Menu_Selection_Data_Temp: User_Menu_Selection[] = [];
// User_Menu_Selection_Data:User_Menu_Selection[]
// User_Menu_Selection_:User_Menu_Selection= new User_Menu_Selection();


Employer_Details_:Employer_Details= new Employer_Details();

// User_Type_:User_Type=new User_Type();
// User_Type_Temp:User_Type=new User_Type();
// User_Type_Data:User_Type[]

Users_Name_Search:string;

Employer_Details_Role_Temp:User_Role=new User_Role();
Employer_Details_Role_Data:User_Role[];
User_Role_:User_Role=new User_Role();


User_Status_Data: User_Status[]
User_Status_Temp:User_Status = new User_Status();
User_Status_: User_Status = new User_Status();

Agent_Data: Agent[]
Agent_: Agent = new Agent();

Entry_View:boolean=true;
myInnerHeight: number;  
EditIndex: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;

Registration_Target:number;
FollowUp_Target:number

myTotalHeight:number;

Employer_Details_Edit:boolean;
Employer_Details_Save:boolean;
Employer_Details_Delete:boolean;

Login_User:string="0";
Users_Edit:boolean;
Select_View:boolean=false;
Select_View_Department:boolean=false;
Select_View_All_Department:boolean=false;
Select_Save:boolean=false;
Select_Edit:boolean=false;
Select_Delete:boolean=false;
Users_Save:boolean;
Users_Delete:boolean;
View_Password:string;


array:any;
Agent_Temp: Agent = new Agent();
constructor(public GeneralFunctions_Service_:GeneralFunctions_Service,public Employer_Details_Servive:Employer_Details_Servive, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    
this.Login_User = localStorage.getItem("Login_User");  
this.Permissions = Get_Page_Permission(48); 
if(this.Permissions==undefined || this.Permissions==null)
{
localStorage.removeItem('token');
this.router.navigateByUrl('Home_Page');
}
else
{

this.Page_Load()

}
}
Page_Load()
{
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Employer_Details();
    this.Search_Employer_Details();
    this.Entry_View=false;
    this.Get_Menu_Status(48,this.Login_User); 
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-250;
    this.myInnerHeight = this.myInnerHeight - 250;

}
Create_New()
{
    this.Entry_View = true;
    this.Clr_Employer_Details();
}
// Close_Click()
// {
//     this.Search_Employer_Details();
//     this.Clr_Employer_Details();
//     this.Entry_View = false;
// }

Close_Click()
{
this.Clr_Employer_Details();
this.Entry_View = false;
}


trackByFn(index, item) 
{
return index;
}

Clr_Employer_Details()
 {
    this.Employer_Details_.Employer_Details_Id=0;
    this.Employer_Details_.Company_Name="";
    this.Employer_Details_.Contact_Person="";
    this.Employer_Details_.Contact_Number="";
    this.Employer_Details_.Email_Id="";
    this.Employer_Details_.Company_Location="";
    this.Employer_Details_.Website="";
}
// Search_Employer_Details()
// {
//     this.issLoading=true;
//     this.Employer_Details_Servive.Search_Employer_Details(this.Company_Name).subscribe(Rows => {
//     this.Employer_Details_Data=Rows.returnvalue.Leads;
//     this.Total_Entries=this.Employer_Details_Data.length;
//      if(this.Employer_Details_Data.length==0)
//     {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
//     this.issLoading=false;
//     }
//     this.issLoading=false;
//     },
//     Rows => { 
//     this.issLoading=false;
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//     });

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
        
        if(Menu_id==48)
        {
             this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.Employer_Details_Edit=this.Permissions.Edit;
                this.Employer_Details_Save=this.Permissions.Save;
                this.Employer_Details_Delete=this.Permissions.Delete;
        }

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}


    Search_Employer_Details()
    {
        
      var Search_Agent_Id = 0 ;
    
    this.issLoading=true;
    if(this.Search_Employer_Details==undefined)
    this.Search_User_Name_="";
        if(this.Search_Agent_!=undefined && this.Search_Agent_!=null )
        Search_Agent_Id=this.Search_Agent_.Agent_Id;
    
    this.Employer_Details_Servive.Search_Employer_Details(this.Search_User_Name_).subscribe(Rows => {
        
     this.Employer_Details_Data=Rows.returnvalue.Leads;
    this.Total_Entries=this.Employer_Details_Data.length;
    if(this.Employer_Details_Data.length==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type: "3" }});
    }
    this.issLoading=false;
     },
     Rows => { 
         this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
     });
    
    
    }

Delete_Employer_Details(Employer_Details_Id_,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
  
        {
        this.issLoading=true;
        this.Employer_Details_Servive.Delete_Employer_Details(Employer_Details_Id_).subscribe(Delete_Employer_Details => {
    
       Delete_Employer_Details = Delete_Employer_Details[0];
       Delete_Employer_Details = Delete_Employer_Details[0].Employer_Details_Id_;
        if(Delete_Employer_Details>=1){
        this.Employer_Details_Data.splice(index, 1);
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


 

Save_Employer_Details()
{
    if(this.Employer_Details_.Company_Name===undefined || this.Employer_Details_.Company_Name==null || this.Employer_Details_.Company_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Company ',Type: "3" }});
    return  
    }
    this.issLoading=true;
    
    this.Employer_Details_Servive.Save_Employer_Details(this.Employer_Details_).subscribe(Save_status => {       
    
        // Save_status=Save_status[0];
    if(Number(Save_status[0].Employer_Details_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        this.Close_Click();
        this.Search_Employer_Details();
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

    Edit_Employer_Details(Employer_Details_e:Employer_Details,index)
    {
        this.Entry_View=true;
        this.Employer_Details_=Employer_Details_e;
        this.Employer_Details_=Object.assign({},Employer_Details_e);
    }


}