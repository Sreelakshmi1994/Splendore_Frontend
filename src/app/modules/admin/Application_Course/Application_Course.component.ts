import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Application_Course_Service } from '../../../services/Application_Course.Service';
// import { University_Service } from '../../../services/University.service';
// import { Country_Service } from '../../../services/Country.Service'
// import { Subject_Service } from '../../../services/Subject.service';
// import { Sub_Section_Service } from '../../../services/Sub_Section_Service';

// import { Internship_Service } from '../../../services/Internship.service';

import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Application_Course } from '../../../models/Application_Course';
// import { Ielts } from '../../../models/Ielts';
// import { Subject} from '../../../models/Subject';
// import { Internship } from '../../../models/Internship';
// import { University } from '../../../models/University';
// import { Country } from '../../../models/Country';
// import { Level_Detail } from '../../../models/Level_Detail';
// import { Duration } from '../../../models/Duration';
// import { Intake } from '../../../models/Intake';

import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Intake } from '../../../models/Intake';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Sub_Section } from '../../../models/Sub_Section';
// import { Sub_Section_Service } from 'app/services/Sub_Section_Service';
import { Sub_Section_Service } from '../../../services/Sub_Section.Service';
//import { Subject } from 'rxjs';
@Component({
selector: 'app-Application_Course',
templateUrl: './Application_Course.component.html',
styleUrls: ['./Application_Course.component.css']
})
export class Application_CourseComponent implements OnInit {
Application_Course_Data:Application_Course[]
Application_Course_:Application_Course= new Application_Course();


Intake_Data:Intake[]


Application_Course_Name_Search:string;

Subject_Id:number;
Subject_Name:string;
Sub_Section_Id:number;
Sub_Section_Name:string;
University_Name:string;
University_Id:string;
Page_Length_: number = 100;

Total_Application_Course:number;

Entry_View:boolean=true;
EditIndex: number;
Total_Entries: number;
// Search_Subject_:Subject=new Subject();
// Subject_Data:Subject[];

Search_Sub_Section_:Sub_Section=new Sub_Section();
Sub_Section_Data:Sub_Section[];
// University_:University=new University();
// Search_University_:University=new University();
// University_Data:University[];


// Search_Internship_:Internship=new Internship();
// Internship_:Internship=new Internship();
// Internship_Data:Internship[];
// Internship_Search_Data:Internship[];
// Internship_Search_Temp:Internship=new Internship();
// Internship_Temp:Internship=new Internship();

// Ielts_:Ielts=new Ielts();
// Ielts_Data:Ielts[];
// Ielts_Temp:Ielts=new Ielts();

// Level_:Level_Detail=new Level_Detail();
// Level_Data:Level_Detail[];
// Level_Search_Data:Level_Detail[];
// Level_Temp:Level_Detail=new Level_Detail();
// Level_Search_Temp:Level_Detail=new Level_Detail();
Search_Application_Course_name:string;
// Search_Intake_:string;
// Search_Duration_:Duration=new Duration();
//  Search_Level_:Level_Detail=new Level_Detail();
 //Search_Internship_:string;
 Status_Select_All:boolean=false;
 

// Duration_Id:number;
Advance_Search:boolean=true;
// Duration_:Duration=new Duration();
// Duration_Data:Duration[];
// Duration_Search_Data:Duration[];
// Duration_Temp:Duration=new Duration();
// Duration_Search_Temp:Duration=new Duration();
// Intake_:Intake=new Intake();
// Intake_Data:Intake[];
// Intake_Temp:Intake=new Intake();

// Intake_Id :number;
// Intake_Name:string;

// Country_:Country=new Country();
// Subject_:Subject=new Subject();
Sub_Section_:Sub_Section=new Sub_Section();

// Search_Country_:Country=new Country();
// Intake:Intake=new Intake();
// Country_Data:Country[];

Intake_Selection:Intake[];

color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Application_Course_Edit:boolean;
Application_Course_Save:boolean;
Application_Course_Delete:boolean;
myInnerHeight: number;
Pointer_Start_:number;
Pointer_Stop_:number;
nextflag:number;

myTotalHeight:number;
MyInnerHeight:number;
MyTotalHeight:number;


   Select_Status:boolean=false;
   Select_Selection:boolean=false;
   IntakeSelection:boolean;
   IntakeStatus:boolean;
   Item_Export:boolean;
Login_User:string="0";


// constructor(public Application_Course_Service_:Application_Course_Service,public Internship_Service_:Internship_Service,public Subject_Service_:Subject_Service,public Sub_Section_Service_:Sub_Section_Service,public Country_Service_:Country_Service,public University_Service_:University_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }

constructor(public Application_Course_Service_:Application_Course_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));

// this.Permissions = Get_Page_Permission(3);
// if(this.Permissions==undefined || this.Permissions==null)
// {
// localStorage.removeItem('token');
// this.router.navigateByUrl('Home_Page');
// }
// else
{
// this.Application_Course_Edit=this.Permissions.Edit;
// this.Application_Course_Save=this.Permissions.Save;
// this.Application_Course_Delete=this.Permissions.Delete;
this.Page_Load()
}
}
Page_Load()
{debugger
    
    this.Get_Menu_Status(108,Number(this.Login_User)); 
    this.myInnerHeight = (window.innerHeight);
    this.myInnerHeight = this.myInnerHeight - 210;

// this.MyInnerHeight = (window.innerHeight);
// this.MyTotalHeight = this.MyInnerHeight - 180;
// this.MyTotalHeight=this.MyTotalHeight-0;
// this.MyInnerHeight = this.MyInnerHeight - 180;
this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -100;
    this.myTotalHeight=this.myTotalHeight-0;
    this.myInnerHeight = this.myInnerHeight - 230;
    
this.Clr_Application_Course();
// this.Load_Dropdowns();
// this.Search_Application_Course();
debugger
this.Search_Application_Course_Click()
this.Pointer_Start_ = 1;
this.Pointer_Stop_ =this.Page_Length_;
debugger
 //this. Get_Intakes_InApplication_Course()

this.Entry_View=false;

// this.myInnerHeight = (window.innerHeight);
// this.myTotalHeight=this.myInnerHeight - 230;
// this.myTotalHeight=this.myTotalHeight-0;
// this.myInnerHeight = this.myInnerHeight - 230;

this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -100;
    this.myTotalHeight=this.myTotalHeight-0;
    this.myInnerHeight = this.myInnerHeight - 230;
}

Get_Menu_Status(Menu_id, Login_user_id)
{
    debugger
this.issLoading = false;
this.Application_Course_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {            
    debugger
    
    if (Rows[0][0]==undefined)
    {
        debugger
        if(Menu_id==108)
        {
        localStorage.removeItem('token');
        this.router.navigateByUrl('Home_Page');
        }
    }  
    else
    if (Rows[0][0].View >0) 
    {
        debugger
        
        if(Menu_id==108)
        {
            
        

            this.Permissions=Rows[0][0];
            if(this.Permissions==undefined || this.Permissions==null)
                {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('Home_Page');
                }
               
                this.Application_Course_Edit=this.Permissions.Edit;
                this.Application_Course_Save=this.Permissions.Save;
                this.Application_Course_Delete=this.Permissions.Delete;
        }

    }
},
Rows => {
    debugger
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}

Create_New()
{
this.Entry_View = true;
this.Clr_Application_Course();
}
Close_Click()
{
this.Entry_View = false;
}
trackByFn(index, item) 
{
return index;
}

 Clr_Application_Course()
 {
     
this.Application_Course_.Application_Course_Id=undefined;
this.Application_Course_.Application_Course_Name="";
this.Application_Course_.Application_Course_Code="";
this.Application_Course_.Subject_Id=undefined;
this.Application_Course_.Sub_Section_Id=undefined;

this.Application_Course_.Duration_Id=undefined;
this.Application_Course_.Level_Id=undefined;
this.Application_Course_.Ielts_Minimum_Score=undefined;
this.Application_Course_.Internship_Id=undefined;
this.Application_Course_.Notes="";
this.Application_Course_.Intake="";
this.Application_Course_.Intake_Name="";
this.Application_Course_.Tution_Fees="";
this.Application_Course_.Living_Expense="";
this.Application_Course_.Work_Experience="";
this.Application_Course_.Registration_Fees="";
this.Application_Course_.VFS_Charges="";
this.Application_Course_.Other_Charges="";
this.Application_Course_.Apostille="";
this.Application_Course_.Bank_Statements="";
this.Application_Course_.Insurance="";
this.Application_Course_.Date_Charges="";
this.Application_Course_.Entry_Requirement="";
this.Application_Course_.IELTS_Name="";

this.Application_Course_.Details="";
this.Application_Course_.Tag="";
this.Application_Course_.Application_Fees=undefined;
this.Application_Course_.University_Id=undefined;
this.Application_Course_.Country_Id=undefined;

this.Select_Status=false;
this.Select_Selection=false;
// this.Subject_.Subject_Id = undefined;
// this.Subject_.Subject_Name ="";
// this.Subject_ = new Subject();

// this.Select_Status=false;
// this.Select_Selection=false;
this.Sub_Section_.Sub_Section_Id = undefined;
this.Sub_Section_.Sub_Section_Name ="";
this.Sub_Section_ = new Sub_Section();

// this.University_.University_Name ="";
// this.University_.University_Id = undefined;
// this.University_ =new University();

// this.Country_.Country_Id =undefined;
// this.Country_.Country_Name="";
// this.Country_ = new Country();


// if(this.Duration_!=null && this.Duration_Data != undefined)
// this.Duration_=this.Duration_Data[0];

// if(this.Level_!=null && this.Level_Data != undefined)
// this.Level_=this.Level_Data[0];

// if(this.Ielts_!=null && this.Ielts_Data != undefined)
// this.Ielts_=this.Ielts_Data[0];

// if(this.Internship_!=null && this.Internship_Data != undefined)
// this.Internship_=this.Internship_Data[0];
if(this.Intake_Data!=undefined)
for(var i=0;i<this.Intake_Data.length;i++)
{

        this.Intake_Data[i].Intake_Selection=false;
        this.Intake_Data[i].Intake_Status=false;
}

// if(this.Intake_!=null && this.Intake_Data != undefined)
// this.Intake_=this.Intake_Data[0];


}
// Load_Dropdowns() 
//     {
         
//     this. Internship_Service_.Get_Application_Course_Load_Data().subscribe(Rows => 
        
//     {
     
// //     //  this.Internship_Data =  Object.assign({},Rows[0]);
// //       this.Internship_Data = Rows[0].slice();
// //    this.Internship_Temp.Internship_Id = 0;
// //    this.Internship_Temp.Internship_Name = "Select";
// //    this.Internship_Data.unshift(this.Internship_Temp);
// //    this.Internship_ = this.Internship_Data[0];

   
   
// // //    this.Internship_Search_Data =  Object.assign({},Rows[0]);
// //    this.Internship_Search_Data = Rows[0].slice();
// //    this.Internship_Search_Temp.Internship_Id = 0;
// //    this.Internship_Search_Temp.Internship_Name = "All";
// //    this.Internship_Search_Data.unshift(this.Internship_Search_Temp);
// //    this.Search_Internship_ = this.Internship_Search_Data[0];
   
  
   
// // //    this.Duration_Data = Rows[2];
// //    this.Duration_Data = Rows[2].slice();
// //    this.Duration_Temp.Duration_Id = 0;
// //    this.Duration_Temp.Duration_Name = "Select";
// //    this.Duration_Data.unshift(this.Duration_Temp);
// //    this.Duration_ = this.Duration_Data[0];

// //    this.Duration_Search_Data = Rows[2].slice();
// //    this.Duration_Search_Temp.Duration_Id = 0;
// //    this.Duration_Search_Temp.Duration_Name = "All";
// //    this.Duration_Search_Data.unshift(this.Duration_Search_Temp);
// //    this.Search_Duration_ = this.Duration_Search_Data[0];




// //    this.Level_Data = Rows[3].slice();
// //    this.Level_Temp.Level_Detail_Id = 0;
// //    this.Level_Temp.Level_Detail_Name = "Select";
// //    this.Level_Data.unshift(this.Level_Temp);
// //    this.Level_ = this.Level_Data[0];

// //    this.Level_Search_Data = Rows[3].slice();
// //    this.Level_Search_Temp.Level_Detail_Id = 0;
// //    this.Level_Search_Temp.Level_Detail_Name = "All";
// //    this.Level_Search_Data.unshift(this.Level_Search_Temp);
// //    this.Search_Level_ = this.Level_Search_Data[0];


// //    this.Ielts_Data= Rows[1];
// //    this.Ielts_Temp.Ielts_Id = 0;
// //    this.Ielts_Temp.Ielts_Name = "Select";
// //    this.Ielts_Data.unshift(this.Ielts_Temp);
// //    this.Ielts_ = this.Ielts_Data[0];






// //    this.Intake_Data = Rows[4];
// //    this.Intake_Temp.Intake_Id = 0;
// //    this.Intake_Temp.Intake_Name = "Select";
// //    this.Intake_Data.unshift(this.Intake_Temp);
// //    this.Intake_ = this.Intake_Data[0];




//  },
//   Rows => { 
//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });
// }



// University_Typeahead(event: any) {

//     var Value = "";
//     if (event.target.value == "")
//         Value = undefined;
//     else
//         Value = event.target.value;
//     this.issLoading = true;
    

//     this.University_Service_.University_Typeahead(Value).subscribe(Rows => {
//         if (Rows != null) {
           
//             this.University_Data = Rows[0];
            
//         }
//         this.issLoading = false;
//     },
//         Rows => {
//             this.issLoading = false;
//         });
// }    
// display_University_(University_e: University)
//  {
   
//     if (University_e) { return University_e.University_Name; }
// }




// Search_Country_Typeahead(event: any) {
//     var Value = "";
//     if (event.target.value == "")
//         Value = undefined;
//     else
//         Value = event.target.value;
//     this.issLoading = true;
   
//     this.Country_Service_.Search_Country_Typeahead(Value).subscribe(Rows => {
       
//         this.Country_Data = Rows[0];
//         this.issLoading = false;
//     },
//         Rows => {
//             this.issLoading = false;
//             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
//         });
// }
// display_Country_(Country_e: Country) {
    
//     if (Country_e) { return Country_e.Country_Name; }
// }

// Subject_Typeahead(event: any) {

//     var Value = "";
//     if (event.target.value == "")
//         Value = undefined;
//     else
//         Value = event.target.value;
//     this.issLoading = true;
    

//     this.Subject_Service_.Subject_Typeahead(Value).subscribe(Rows => {

//         if (Rows != null) {
          
//             this.Subject_Data = Rows[0];
            
//         }
//         this.issLoading = false;
//     },
//         Rows => {
//             this.issLoading = false;
//         });
// }   

// display_Subject_(Subject_e: Subject)
//  {
    
//     if (Subject_e) { return Subject_e.Subject_Name; }
// }

// Sub_Section_Typeahead(event: any) {
    
//     var Value = "";
//     if (event.target.value == "")
//         Value = undefined;
//     else
//         Value = event.target.value;
//     this.issLoading = true;
    

//     this.Sub_Section_Service_.Sub_Section_Typeahead(Value).subscribe(Rows => {
        
//         if (Rows != null) {
          
//             this.Sub_Section_Data = Rows[0];
            
//         }
//         this.issLoading = false;
//     },
//         Rows => {
//             this.issLoading = false;
//         });
// }   

display_Sub_Section_(Sub_Section_e: Sub_Section)
 {
    
    if (Sub_Section_e) { return Sub_Section_e.Sub_Section_Name; }
}

Search_Application_Course_Click() {
    this.Pointer_Start_ = 1;
    this.Pointer_Stop_ = this.Page_Length_;
debugger
    this.Search_Application_Course();
}



// Export() 
// {
      
//     if(this.Application_Course_Data==undefined) 
// {
//  const dialogRef = this.dialogBox.open     ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
// }
// else{
//     this.Application_Course_Service_.exportExcel(this.Application_Course_Data, 'Application_Course_Report')
// }
// }


    
// Get_Intakes_InApplication_Course() 
//         {
//             debugger
//             this.issLoading=true;
//        this.Application_Course_Service_.Get_Intakes_InApplication_Course().subscribe(Rows => {
           

//         this.Intake_Data=Rows[0];
//     for(var j=0;j<this.Intake_Data.length;j++)
//     {
//     if (this.Intake_Data[j].Intake_Selection.toString()=='1')
//     this.Intake_Data[j].Intake_Selection= true;  
//     else
//     this.Intake_Data[j].Intake_Selection= false;
//     if (this.Intake_Data[j].Intake_Status.toString()=='1')
//     this.Intake_Data[j].Intake_Status= true;
//     else  
//     this.Intake_Data[j].Intake_Status= false; 
//     }
   
                   
//         if (Rows != null) {
//        this.Intake_Data = Rows[0];
//         }
//         this.issLoading=false;
//         },
//         Rows => 
//         {
//             this.issLoading=false;
//        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });
//         }
        
Search_Application_Course()
{ debugger

    var Search_Application_Course_name = 0,Search_Level = 0,Search_Internship = 0, 
    Search_Duration = 0, Search_Country_temp = 0, Search_University = 0,  Subject_Id_ = 0, Sub_Section_Id_ =0;
   
//     if (this.Search_Country_== undefined ||  this.Search_Country_ == null)
//         Search_Country_temp= 0
//     else if (this.Search_Country_.Country_Id == undefined || this.Search_Country_.Country_Id == null)
//         Search_Country_temp = 0
//     else
//         Search_Country_temp= this.Search_Country_.Country_Id;

//     if (this.Search_Application_Course_name== null)
//     this.Search_Application_Course_name= undefined;

//     // if (this.Search_Intake_ != null && this.Search_Intake_ != undefined && this.Search_Intake_ != '')
//     //     Search_Intake = 0;


//     if(this.Search_Duration_!=undefined && this.Search_Duration_!=null&& this.Search_Duration_.toString()!='Duration_')
//     {
//         if(this.Search_Duration_.Duration_Id!=undefined && this.Search_Duration_.Duration_Id!=null)
//         {
//             Search_Duration=this.Search_Duration_.Duration_Id;
//         }
//     }
// if(this.Search_Level_!=undefined && this.Search_Level_!=null&& this.Search_Level_.toString()!='Level_')
// {
// if(this.Search_Level_.Level_Detail_Id!=undefined && this.Search_Level_.Level_Detail_Id!=null)
// {
//     Search_Level=this.Search_Level_.Level_Detail_Id;
// }
// }

// if(this.Search_Internship_!=undefined && this.Search_Internship_!=null&& this.Search_Internship_.toString()!='Internship_')
// {
// if(this.Search_Internship_.Internship_Id!=undefined && this.Search_Internship_.Internship_Id!=null)
// {
//     Search_Internship=this.Search_Internship_.Internship_Id;

// }
// }
//     if (this.Search_University_ == undefined || this.Search_University_ == null)
//         Search_University =0;
//     else if (this.Search_University_.University_Id == undefined ||  this.Search_University_.University_Id == null)
//         Search_University = 0;
//     else
//        Search_University  = this.Search_University_.University_Id;
 
//     if (this.Search_Subject_== undefined ||  this.Search_Subject_ == null)
//     Subject_Id_ =0; 
//     else if (this.Search_Subject_.Subject_Id == undefined ||  this.Search_Subject_.Subject_Id == null)
//     Subject_Id_ = 0;
//     else
//     Subject_Id_  = this.Search_Subject_.Subject_Id;

    if (this.Search_Sub_Section_== undefined ||  this.Search_Sub_Section_ == null)
    Sub_Section_Id_ =0; 
    else if (this.Search_Sub_Section_.Sub_Section_Id == undefined ||  this.Search_Sub_Section_.Sub_Section_Id == null)
    Sub_Section_Id_ = 0;
    else
    Sub_Section_Id_  = this.Search_Sub_Section_.Sub_Section_Id;
 
this.issLoading=true;
debugger
this.Application_Course_Service_.Search_Application_Course(this.Search_Application_Course_name, Search_Level ,Search_Country_temp, Search_Internship, Search_Duration, Search_University, Subject_Id_, Sub_Section_Id_, this.Pointer_Start_, this.Pointer_Stop_, this.Page_Length_).subscribe(Rows => {
 debugger
 this.Application_Course_Data=Rows[0];

 this.Total_Application_Course=this.Application_Course_Data[this.Application_Course_Data.length-1].Application_Course_Id
            this.Application_Course_Data.splice(this.Application_Course_Data.length-1)


this.Total_Entries=this.Application_Course_Data.length;
if(this.Application_Course_Data.length==0)
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


Advance_Search_Click()
{
    this.Advance_Search=!this.Advance_Search;
}

Next_Click ()
{ 
   if (this.Application_Course_Data.length == this.Page_Length_)
   {
       this.Pointer_Start_ = this.Pointer_Start_ + this.Page_Length_;
       this.Pointer_Stop_ = this.Pointer_Stop_+ this.Page_Length_;
       this.nextflag = 1;   
       if (this.Application_Course_Data.length > 0)
           {
               this.Search_Application_Course();
           }
   }
}

previous_Click  () 
   {
        
       if ( this.Pointer_Start_ > 1) 
       { 
           this.Pointer_Start_ = this.Pointer_Start_ - this.Page_Length_;
           this.Pointer_Stop_ = this.Pointer_Stop_ - this.Page_Length_;
           this.Search_Application_Course();    
       }    
   }




Delete_Application_Course(Application_Course_Id,index)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
dialogRef.afterClosed().subscribe(result =>
{
if(result=='Yes')
{
this.issLoading=true;
this.Application_Course_Service_.Delete_Application_Course(Application_Course_Id).subscribe(Delete_status => {
if(Delete_status[0][0].Application_Course_Id_>0){
this.Application_Course_Data.splice(this.EditIndex, 1);
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
this.Search_Application_Course();
}else if(Number(Delete_status[0][0].Application_Course_Id_)== -2)
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
Save_Application_Course()
{
    debugger
    if(this.Application_Course_.Application_Course_Name==undefined || this.Application_Course_.Application_Course_Name==null || this.Application_Course_.Application_Course_Name=="" )
    {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Enter Application_Course', Type: "3" } });
        return;
    }

    // if(this.University_==undefined || this.University_==null || this.University_.University_Id == undefined || this.University_.University_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Select University', Type: "3" } });
    //     return;
    // }
    // if (this.Level_ == undefined || this.Level_ == null || this.Level_.Level_Detail_Id == undefined || this.Level_.Level_Detail_Id==0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: ' Please Select Level', Type: "3" } });
    //     return;
                
    //         }
    // if(this.Subject_==undefined || this.Subject_==null || this.Subject_.Subject_Id == undefined || this.Subject_.Subject_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Select subject', Type: "3" } });
    //     return;
    // }

    // if(this.Sub_Section_==undefined || this.Sub_Section_==null || this.Sub_Section_.Sub_Section_Id == undefined || this.Sub_Section_.Sub_Section_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Select Sub Section', Type: "3" } });
    //     return;
    // }

    // if (this.Duration_ == undefined || this.Duration_ == null || this.Duration_.Duration_Id == undefined || this.Duration_.Duration_Id==0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: ' Please Select Duration', Type: "3" } });
    //     return;
    //         }
    // if(this.Country_==undefined || this.Country_==null || this.Country_.Country_Id == undefined || this.Country_.Country_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: ' Please Select Country', Type: "3" } });
    //     return;
    // }


    // if(this.Subject_.Subject_Id==undefined || this.Subject_.Subject_Id==null || this.Subject_.Subject_Id == undefined || this.Subject_.Subject_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Select Subject', Type: "3" } });
    //     return;
    // }

    // if(this.Sub_Section_.Sub_Section_Id==undefined || this.Sub_Section_.Sub_Section_Id==null || this.Sub_Section_.Sub_Section_Id == undefined || this.Sub_Section_.Sub_Section_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Select Sub Section', Type: "3" } });
    //     return;
    // }


    // if(this.University_.University_Id==undefined || this.University_.University_Id==null || this.University_.University_Id == undefined || this.University_.University_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Select University', Type: "3" } });
    //     return;
    // }

    // if(this.Ielts_.Ielts_Id==undefined || this.Ielts_.Ielts_Id==null || this.Ielts_.Ielts_Id == undefined || this.Ielts_.Ielts_Id==0)
    // {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Please Select IELTS Score', Type: "3" } });
    //     return;
    // }

    // if (this.Internship_ == undefined || this.Internship_ == null || this.Internship_.Internship_Id == undefined || this.Internship_.Internship_Id==0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: ' Please Select Internship', Type: "3" } });
    // return;
    // }
    // var intakeval=0
    // for(var i =0;i<this.Intake_Data.length;i++ )
    // {
    //     if(this.Intake_Data[i].Intake_Selection==true)
    //     {
    //         intakeval=1
    //         break
    //     }
            
    // }

    // if (intakeval==0) {
    //     const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: ' Please Select Intake', Type: "3" } });
    // return;
    // }

    
this.issLoading=true;
// this.Application_Course_.Country_Id= this.Country_.Country_Id;
// this.Application_Course_.Subject_Id= this.Subject_.Subject_Id;
// this.Application_Course_.Sub_Section_Id= this.Sub_Section_.Sub_Section_Id;
// this.Application_Course_.University_Id=this.University_.University_Id;
// this.Application_Course_.Internship_Id=this.Internship_.Internship_Id;
// this.Application_Course_.Ielts_Minimum_Score = this.Ielts_.Ielts_Id;
// this.Application_Course_.Level_Id = this.Level_.Level_Detail_Id;
// this.Application_Course_.Duration_Id = this.Duration_.Duration_Id;
// this.Application_Course_.Intake_Data = this.Intake_Data;

debugger

this.Application_Course_Service_.Save_Application_Course(this.Application_Course_).subscribe(Save_status => {
    debugger 
Save_status=Save_status[0];
if(Number(Save_status[0].Application_Course_Id_)>0)
{
    
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
this.Search_Application_Course();
this.Clr_Application_Course();
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


Edit_Application_Course(Application_Course_e:any,index)
{     
   debugger;
this.Entry_View=true;
this.Application_Course_=Application_Course_e;
// this.Application_Course_=Object.assign({},Application_Course_e);  
// this.Subject_.Subject_Name=Application_Course_e.Subject_Name;
// this.Subject_.Subject_Id=Application_Course_e.Subject_Id;
// ;
this.Sub_Section_.Sub_Section_Name=Application_Course_e.Sub_Section_Name;
this.Sub_Section_.Sub_Section_Id=Application_Course_e.Sub_Section_Id;
// this.University_.University_Name=Application_Course_e.University_Name;
// this.University_.University_Id=Application_Course_e.University_Id;
// this.Country_.Country_Name=Application_Course_e.Country_Name;
// this.Country_.Country_Id=Application_Course_e.Country_Id;
this.issLoading = true;
this.Application_Course_Service_.Get_Application_Course(Application_Course_e.Application_Course_Id).subscribe(Rows => 
    {     debugger;   
        this.Application_Course_= Object.assign({},Rows[0][0]);
        this.Intake_Data=Rows[1]
        for (var i = 0; i < this.Intake_Data.length; i++) {
            if (this.Intake_Data[i].Intake_Status.toString()=="1")
                this.Intake_Data[i].Intake_Status=true;
            else
                this.Intake_Data[i].Intake_Status=false;
            if (this.Intake_Data[i].Intake_Selection.toString()=="1")
                this.Intake_Data[i].Intake_Selection=true;
            else
                this.Intake_Data[i].Intake_Selection=false;
        }
        // for (var i = 0; i < this.Internship_Data.length; i++) {
        //     if (this.Application_Course_.Internship_Id == this.Internship_Data[i].Internship_Id)
        //     this.Internship_=this.Internship_Data[i];
        // }         
        // for (var i = 0; i < this.Ielts_Data.length; i++) {
        //     if (this.Application_Course_.Ielts_Minimum_Score == this.Ielts_Data[i].Ielts_Id)
        //     this.Ielts_=this.Ielts_Data[i];
        // }
        // for (var i = 0; i < this.Level_Data.length; i++) {
        //     if (this.Application_Course_.Level_Id== this.Level_Data[i].Level_Detail_Id)
        //     this.Level_=this.Level_Data[i];
        // }         
        // for (var i = 0; i < this.Duration_Data.length; i++) {
        //     if (this.Application_Course_.Duration_Id== this.Duration_Data[i].Duration_Id)
        //     this.Duration_=this.Duration_Data[i];
        // }
        // for (var i = 0; i < this.Intake_Data.length; i++) {
        //     if (this.Application_Course_.Intake_Id== this.Intake_Data[i].Intake_Id)
        //     this.Intake_=this.Intake_Data[i];
        // }

        this.issLoading = false;
    },
     Rows => {
            this.issLoading = false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
     
   
}


Selection_Click()
{
     


 
 for(var i=0;i<this.Intake_Data.length;i++)
{
    if(this.Select_Selection==false)
        this.Intake_Data[i].Intake_Selection=true;
    else
        this.Intake_Data[i].Intake_Selection=false;
}
}
Status_Click()
{
 
    for(var i=0;i<this.Intake_Data.length;i++)
   {
       if(this.Select_Status==false)
           this.Intake_Data[i].Intake_Status=true;
       else
           this.Intake_Data[i].Intake_Status=false;
   }
   }

//    Get_Sub_Section_From_Application_Course(Subject_Id)
//    {

//            this.issLoading = true;
//        this.Sub_Section_Service_.Get_Sub_Section_From_Application_Course(Subject_Id).subscribe(Save_status => {
            
//         Save_status=Save_status[0];

//            this.issLoading = false;
//         },
//         Rows => {
//            this.issLoading = false;
//        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });  
   
//    }

}

