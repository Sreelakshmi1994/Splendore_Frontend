import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.Service';
import { Account_Group_Service } from '../../../services/Account_Group.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Client_Accounts } from '../../../models/Client_Accounts';
import {Account_Group } from '../../../models/Account_Group';

import {MatDialog} from '@angular/material';import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';@Component({
selector: 'app-Client_Accounts',
templateUrl: './Client_Accounts.component.html',
styleUrls: ['./Client_Accounts.component.css']
})
export class Client_AccountsComponent implements OnInit {
Client_Accounts_Data:Client_Accounts[]
Employee_Details_Data:Client_Accounts[]
Employee_:Client_Accounts=new Client_Accounts();
Client_Accounts_:Client_Accounts= new Client_Accounts();
Client_Accounts_Name_Search:string;
Account_Group_Data:Account_Group[]
Search_Client_Accounts_:string;
Account_Group_Temp:Account_Group=new Account_Group();
Account_Group_Search:Account_Group=new Account_Group();
Employee_Details_Temp:Client_Accounts=new Client_Accounts();
Account_Group_:Account_Group=new Account_Group();
Client_Accounts_Id:number;
Entry_View:boolean=true;
myInnerHeight: number;
myTotalHeight: number;
myInnerHeighttemp: number;
EditIndex: number;
 Total_Entries: number=0;

color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Client_Accounts_Edit:boolean;
Client_Accounts_Save:boolean;
Client_Accounts_Delete:boolean;
Employee_Name:string;
Employee_Id:number;
User_Type:number;
Employee_Edit:boolean=false;
Login_User:string="0";
constructor(public Client_Accounts_Service_:Client_Accounts_Service,public Journal_Entry_Service_:Journal_Entry_Service, public Account_Group_Service_:Account_Group_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
this.Permissions = Get_Page_Permission(87);
if(this.Permissions==undefined || this.Permissions==null)
{
    this.User_Type=Number(localStorage.getItem('User_Type'));
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.Login_User=localStorage.getItem("Login_User");
localStorage.removeItem('token');
this.router.navigateByUrl('/auth/login');
}
else
{
this.Client_Accounts_Edit=this.Permissions.Edit;
this.Client_Accounts_Save=this.Permissions.Save;
this.Client_Accounts_Delete=this.Permissions.Delete;
this.Page_Load()
}
}

Get_Account_Group(event: any) 
        {
            debugger
            var Value = "";
            if (event.target.value == "")
            Value = undefined;
            else
            Value = event.target.value;
            this.issLoading=true;
       this.Account_Group_Service_.Search_Account_Group_Typeahead(Value).subscribe(Rows => {
                 debugger  
        if (Rows != null) {
       this.Account_Group_Data = Rows[0];
        }
        this.issLoading=false;
        },
        Rows => 
        {
            this.issLoading=false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
        }

 Get_Employee(event: any)
        { 
        var Value = "";
        if (event.target.value == "")
        Value = undefined;
        else
        Value = event.target.value;
        this.issLoading=true;
         
        this.Journal_Entry_Service_.Accounts_Typeahead(2,Value).subscribe(Rows => {
             
        if (Rows != null) {
        this.Employee_Details_Data = Rows[0];
        }
        this.issLoading=false;
        },
        Rows => {
            this.issLoading=false;
        });
        }

        display_Employee(Client_Accounts_e: Client_Accounts) 
        {
              
        if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
        }
    


Page_Load()
{
    this.myInnerHeight = window.innerHeight;
    this.myTotalHeight = this.myInnerHeight;
    this.myTotalHeight = this.myTotalHeight - 40;
    this.myInnerHeight = this.myInnerHeight - 270;
    this.myInnerHeighttemp = this.myInnerHeight
this.Clr_Client_Accounts();
this.Search_Client_Accounts();
this.Entry_View=false;
if (this.User_Type==2){
    this.Employee_.Client_Accounts_Id=this.Employee_Id;
    this.Employee_.Client_Accounts_Name=this.Employee_Name;
    this.Employee_Edit=true;
}
}
Create_New()
{
this.Entry_View = true;
this.Clr_Client_Accounts();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}



 Clr_Client_Accounts()
 {
this.Client_Accounts_.Client_Accounts_Id=0;
this.Client_Accounts_.Account_Group_Id=0;
this.Client_Accounts_.Client_Accounts_Code="";
this.Client_Accounts_.Client_Accounts_Name="";
this.Client_Accounts_.Client_Accounts_No="";
this.Account_Group_=null;
this.Employee_=null;
this.Client_Accounts_.Address1="";
this.Client_Accounts_.Address2="";
this.Client_Accounts_.Address3="";
this.Client_Accounts_.Address4="";
this.Client_Accounts_.PinCode="";
this.Client_Accounts_.State="";
this.Client_Accounts_.Country="";
this.Client_Accounts_.Phone="";
this.Client_Accounts_.Mobile="";
this.Client_Accounts_.Email="";
this.Client_Accounts_.GSTNo="";
this.Client_Accounts_.PanNo="";
this.Client_Accounts_.StateCode="";
this.Client_Accounts_.Opening_Balance=0;
this.Client_Accounts_.Description1="";
this.Client_Accounts_.Entry_Date="";
this.Client_Accounts_.UserId=0;
this.Client_Accounts_.LedgerInclude="";
this.Client_Accounts_.CanDelete="";
this.Client_Accounts_.Commision=0;
this.Client_Accounts_.Opening_Type=0;
this.Client_Accounts_.Commission_Percentage="";

}
Search_Client_Accounts()
{  
    debugger;
    var Account_Group_Id=0;
    if (this.Account_Group_Search != undefined && this.Account_Group_Search!=null)
    if (this.Account_Group_Search.Account_Group_Id != undefined && this.Account_Group_Search.Account_Group_Id != null)
     Account_Group_Id = this.Account_Group_Search.Account_Group_Id;
    if (this.Search_Client_Accounts_ == undefined)
    this.Search_Client_Accounts_ = "";
     this.issLoading=true;
     debugger;
        this.Client_Accounts_Service_.Search_Client_Accounts(this.Search_Client_Accounts_,Account_Group_Id).subscribe(Rows => {
            debugger;
        this.Client_Accounts_Data=Rows[0];
        this.Total_Entries=this.Client_Accounts_Data.length;
        if(this.Client_Accounts_Data.length==0)
        {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
        }
        this.issLoading=false;
        },
        Rows => { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"2"}});
        });
        }

Delete_Client_Accounts(Client_Accounts_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Client_Accounts_Service_.Delete_Client_Accounts(Client_Accounts_Id).subscribe(Delete_status => {

    debugger
    Delete_status=Delete_status[0];
         Delete_status=Delete_status[0].DeleteStatus_.data[0];
         if(Delete_status==1){
this.Client_Accounts_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    this.Search_Client_Accounts();
}
else
{
             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Cannot be Deleted,its already used',Type:"2"}});
}
this.issLoading=false;
 },
 Rows => { 
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
 });
this.issLoading=false;
}
 });
}



display_Item_Group(Account_Group_: Account_Group)
        {
             
        if (Account_Group_) { return Account_Group_.Group_Name; 
        }
        }
Save_Client_Accounts()
{
     

 if(this.Account_Group_==null||this.Account_Group_==undefined||this.Account_Group_.Account_Group_Id==0||this.Account_Group_==undefined)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'select Account group',Type: "3" }});
}
else if(this.Client_Accounts_.Client_Accounts_Name==null||this.Client_Accounts_.Client_Accounts_Name=="")
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the Name ',Type: "3" }});
}

else
{ 
    this.issLoading=true;
this.Client_Accounts_.Employee_Id=4;
this.Client_Accounts_.Account_Group_Id=this.Account_Group_.Account_Group_Id;
debugger
if(this.Client_Accounts_.Commission_Percentage ==null||this.Client_Accounts_.Commission_Percentage ==undefined||this.Client_Accounts_.Commission_Percentage =="")
{
    this.Client_Accounts_.Commission_Percentage ="0" ;
}
this.Client_Accounts_Service_.Save_Client_Accounts(this.Client_Accounts_).subscribe(Save_status => {
     debugger
    Save_status=Save_status[0];

    if(Number(Save_status[0].Client_Accounts_Id_)>0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Search_Client_Accounts();
this.Clr_Client_Accounts();
}
else if (Number(Save_status[0].Client_Accounts_Id_)==-1)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Acoount Name Already Exists',Type:"2"}});
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

this.Clr_Client_Accounts();
}
}
Edit_Client_Accounts(Client_Accounts_e:Client_Accounts,index)
{
     
this.Entry_View=true;
this.Client_Accounts_=Client_Accounts_e;
this.Client_Accounts_=Object.assign({},Client_Accounts_e);



this.Account_Group_Temp.Account_Group_Id=Client_Accounts_e.Account_Group_Id;
this.Account_Group_Temp.Group_Name=Client_Accounts_e.Account_Group_Name;
this.Account_Group_=this.Account_Group_Temp;



 

this.Employee_Details_Temp.Client_Accounts_Id=Client_Accounts_e.Employee_Id;
this.Employee_Details_Temp.Client_Accounts_Name=Client_Accounts_e.Employee;
this.Employee_=this.Employee_Details_Temp;

}
}

