import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Batch_Service } from '../../../services/Batch.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Batch } from '../../../models/Batch';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
    selector: 'app-Batch',
    templateUrl: './Batch.component.html',
    styleUrls: ['./Batch.component.css'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
 
})
export class BatchComponent implements OnInit {
    Batch_Data:Batch[]
    Batch_:Batch= new Batch();
    Batch_Name_Search:string;
    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Batch_Edit:boolean;
    Batch_Save:boolean;
    Batch_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;

    Login_User_Id:number=0;

    year: any;
    month: any;
    Start_Date:Date;
    End_Date:Date;
    day: any;
    date: any;
    Login_User:string="0";
array:any;
constructor(public Batch_Service_:Batch_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Login_User_Id = Number(localStorage.getItem('Login_User'));
    // this.Permissions = Get_Page_Permission(32);
    // if(this.Permissions==undefined || this.Permissions==null)
    // {
    // localStorage.removeItem('token');
    // this.router.navigateByUrl('/auth/login');
    // }
    // else
    {
    // this.Batch_Edit=this.Permissions.Edit;
    // this.Batch_Save=this.Permissions.Save;
    // this.Batch_Delete=this.Permissions.Delete;
    this.Page_Load()
    }
}
Page_Load()
{
    this.Get_Menu_Status(32,this.Login_User);
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 20;
    this.Clr_Batch();
    this.Search_Batch();
    this.Entry_View=false;
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-230;
    this.myInnerHeight = this.myInnerHeight - 250;
}
Get_Menu_Status(Menu_id, Login_user_id)
{
    
this.issLoading = false;
this.Batch_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
  this.array=Rows[0][0]
    
    if (Rows[0][0]==undefined)
    {
      if(Menu_id==32)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        
        
        if(Menu_id==32)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
                this.Batch_Edit= this.array.Edit;
                this.Batch_Save= this.array.Save;
                this.Batch_Delete= this.array.Delete;
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
    this.Clr_Batch();
    this.Batch_.Start_Date = new Date();
    this.Batch_.Start_Date = this.New_Date(this.Batch_.Start_Date);  
    this.Batch_.End_Date = new Date();
    this.Batch_.End_Date = this.New_Date(this.Batch_.End_Date);  
}
Close_Click()
{
    this.Search_Batch();
    this.Clr_Batch();
    this.Entry_View = false;
}
New_Date(Date_)
{
         this.date=Date_;
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        if (this.month < 10) {
        this.month = "0" + this.month;
    }
        this.day = this.date.getDate().toString();
        if (Number.parseInt(this.day) <10) {
        this.day = "0" + this.day;
    }
        this.date = this.year + "-" + this.month + "-" + this.day;
      //  this.date = this.day + "-"+ this.month + "-" + this.year ;
        return this.date;
}
trackByFn(index, item) 
{
return index;
}

Clr_Batch()
{
    this.Batch_.Batch_Id=0;
    this.Batch_.Batch_Name="";
    this.Batch_.User_Id=0;
    this.Batch_.Start_Date = new Date();
    this.Batch_.Start_Date = this.New_Date(this.Batch_.Start_Date);  
    this.Batch_.End_Date = new Date();
    this.Batch_.End_Date = this.New_Date(this.Batch_.End_Date);  
   
}
Search_Batch()
{
    this.issLoading=true;
    this.Batch_Service_.Search_Batch(this.Batch_Name_Search).subscribe(Rows => {
    this.Batch_Data=Rows[0];
    this.Total_Entries=this.Batch_Data.length;
    if(this.Batch_Data.length==0)
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



Delete_Batch(Batch_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        //this.issLoading=true;
        this.Batch_Service_.Delete_Batch(Batch_Id).subscribe(Delete_Batch => {
        
        Delete_Batch = Delete_Batch[0];
        Delete_Batch = Delete_Batch[0].DeleteStatus_.data[0];
        if(Delete_Batch==1){
        this.Batch_Data.splice(index, 1);
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
        }
        else
        {
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot be delete',Type:"2"}});
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
Save_Batch()
{
    if(this.Batch_.Batch_Name===undefined || this.Batch_.Batch_Name==null || this.Batch_.Batch_Name=="")
    {
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Batch ',Type: "3" }});
    return  
    }
    // if(this.Batch_.Start_Date==undefined || this.Batch_.Start_Date==null )
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter Start Date ',Type: "3" }});
    // return  
    // }
    // if(this.Batch_.End_Date==undefined || this.Batch_.End_Date==null )
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message:'Enter End Date ',Type: "3" }});
    // return  
    // }


    this.issLoading=true;
    debugger
    this.Batch_.User_Id = this.Login_User_Id;
    // this.Batch_.Start_Date = this.New_Date(new Date(moment(this.Batch_.Start_Date).format('YYYY-MM-DD')));
    // this.Batch_.End_Date = this.New_Date(new Date(moment(this.Batch_.End_Date).format('YYYY-MM-DD')));
    this.Batch_Service_.Save_Batch(this.Batch_).subscribe(Save_Batch => {
        debugger 
    Save_Batch=Save_Batch[0];
    if(Number(Save_Batch[0].Batch_Id_)>0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    this.Close_Click();
    }


    else if (Number(Save_Batch[0].Batch_Id_) == -1) {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Batch Already Exists',Type:"2"}});
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
Edit_Batch(Batch_e:Batch,index)
{
    
    this.Entry_View=true;
    this.Batch_=Batch_e;
    // if(this.Batch_.Batch_Name==null || this.Batch_.Batch_Name==undefined)
    // {
    //     this.Batch_.Start_Date=new Date();
    //     this.Batch_.Start_Date=this.New_Date(this.Batch_.Start_Date);
    // }
    // else
    // this.Batch_.Start_Date = this.New_Date(new Date(moment(this.Batch_.Start_Date).format('YYYY-MM-DD')));


        // if(this.Batch_.Batch_Name==null || this.Batch_.Batch_Name==undefined)
        // {
        //     this.Batch_.End_Date=new Date();
        //     this.Batch_.End_Date=this.New_Date(this.Batch_.End_Date);
        // }
        
        // else
        // this.Batch_.End_Date = this.New_Date(new Date(moment(this.Batch_.End_Date).format('YYYY-MM-DD')));

    this.Batch_=Object.assign({},Batch_e);
}
}

