import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { Agent_Service } from '../../../services/Agent.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Agent } from '../../../models/Agent';
import {MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Status } from '../../../models/Status';
import { Mode } from '../../../models/Mode';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Receipt_Voucher } from '../../../models/Receipt_Voucher';
import { Category } from '../../../models/Category';
import { Books } from '../../../models/Books';
import { Books_Issued } from '../../../models/Books_Issued';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
// import { debug } from 'console';
export const MY_FORMATS = {
parse: {
dateInput: 'DD/MM/YYYY',
},
display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
},
};
const moment = _rollupMoment || _moment;

@Component({
selector: 'app-Books',
templateUrl: './Books.component.html',
styleUrls: ['./Books.component.css']
})
export class BooksComponent implements OnInit 
{
    Agent_Data:Agent[]
    Agent_:Agent= new Agent();
    Agent_Name_Search:string;

    Books_Data:Books[]
    BooksNo_Data:Books[]
    Books_:Books= new Books();
    Books_Search_:Books= new Books();
    Books_Name_Search:string;
    Books_Issued_:Books_Issued= new Books_Issued();
    Search_Name=""

    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
  Books_Edit:boolean;
  Books_Save:boolean;
  Books_Delete:boolean;
    myInnerHeight: number;
    myInnerHeightTwo: number;
    Approval_Status: Status = new Status();
    Category_Id: Category = new Category();
    Photo: Agent = new Agent();
    Agent_Id_Edit:number;

    Status_Data: Status[]
    Status_Temp:Status= new Status();

    // Category_Data: Category[]
    Category_Temp:Category= new Category();

    Category_Data:Category[]
    Category_Type_:Category= new Category();
    Category_Type_Temp:Category= new Category();

    Registration_Visiblility:boolean=true;
    Remove_Registration_Visibility:boolean=true;

    Registration_Permissions: any;
    Remove_Registration_Permissions: any;

    Login_User:string="0";
    tab_view:boolean=true;

    profile_View:boolean=true;
    Receipt_View:boolean=false;
    Receipt_Click_Status:boolean
    year: any;
    month: any;
    day: any;
    date: any;
    Search_FromDate:Date=new Date();

    Search_ToDate:Date=new Date();
    ImageFile: any;
    file: File;
    Agentfile:string;
    AgentReceipt_View:boolean=false;
    Receipt_History_View:boolean=false;

    Mode:Mode=new Mode();
    Mode_Temp:Mode=new Mode();
    Mode_Data:Mode[]

    Receipt_Voucher_:Receipt_Voucher=new Receipt_Voucher;
    Receipt_Voucher_Data:Receipt_Voucher[]

    Client_Accounts_:Client_Accounts=new Client_Accounts;
    Client_Accounts_Temp:Client_Accounts=new Client_Accounts;
    Client_Accounts_Data:Client_Accounts[]

    Receipt_Voucher_Index:number=-1;
    Fees_Tab_Permission: any;
    Fees_Tab_View: boolean = false;
    Fees_Tab_Edit: boolean = false;
    Registration: boolean = false;
    myTotalHeight:number;


   Books_Temp: Books = new Books;
   Books_Data_Filter: Books[]  
   BooksNo_Data_Filter: Books[]  
    
  Books_Report_Data:any;
  Issueddetails_View:boolean=true;



Bookissuedetails_Data:any;

 viewissuebtn:boolean=false;
 Books_No_:string="";
constructor(public Agent_Service_:Agent_Service, 
    public Student_Service_:Student_Service, 
    private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Permissions = Get_Page_Permission(70);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Books_Edit=this.Permissions.Edit;
    this.Books_Save=this.Permissions.Save;
    this.Books_Delete=this.Permissions.Delete;
    this.Page_Load()
    if (this.Fees_Tab_Permission != undefined && this.Fees_Tab_Permission != null)
    {
    this.Fees_Tab_Edit=this.Fees_Tab_Permission.Edit;
    this.Fees_Tab_View=this.Fees_Tab_Permission.View
    }
    }
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Clr_Agent();
    this.tab_view = true;
    this.profile_View = false;
    this.AgentReceipt_View=false;
    this.Receipt_History_View=false;
    this.Issueddetails_View=false;
    this.Load_Agent_Dropdowns();
 
    this.Search_Books_Report();
 
    this.Entry_View=false;
    this.Remove_Registration_Visibility=false;
    this.Registration_Visiblility=false
    this.Get_Menu_Status(24,this.Login_User)
    this.Get_Menu_Status(25,this.Login_User)
    this.Get_Menu_Status(26,this.Login_User)

    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight
    this.myTotalHeight=this.myTotalHeight-300;
    this.myInnerHeight = this.myInnerHeight - 250;
    this.myInnerHeightTwo = this.myInnerHeight - -60;

}
Get_Menu_Status(Menu_id, Login_user_id)
{
    this.issLoading = true;
    this.Agent_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {  
    if(Menu_id==70)
    if (Rows[0][0]==undefined)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('Home_Page');
    }  

    var a=Rows[0]

    if (Rows[0][0]!=undefined)
    if (Rows[0][0].View >0)
    {

    if(Menu_id==70)
    {
    this.Permissions=Rows[0][0];
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('Home_Page');
    }
    this.Books_Edit=this.Permissions.Edit;
    this.Books_Save=this.Permissions.Save;
    this.Books_Delete=this.Permissions.Delete;
    }
    else if(Menu_id==25)
    {
    this.Remove_Registration_Permissions=Rows[0][0];
    if(this.Remove_Registration_Permissions.View==true)
    this.Remove_Registration_Visibility=true;
    }
    else if(Menu_id==24)
    {
    this.Registration_Permissions=Rows[0][0];
    if(this.Registration_Permissions.View==true)
    this.Registration_Visiblility=true;
    } 
    else if(Menu_id==26)
    {
    this.Fees_Tab_Permission=Rows[0][0];
    if(this.Fees_Tab_Permission.View==true)
    this.Fees_Tab_View=true;
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
    this.profile_View=true;
    this.AgentReceipt_View=false;
    this.Receipt_History_View=false;
    this.Clr_Books();
  
}
Close_Click()
{
    this.Entry_View = false;
    this.profile_View=false;
    this.Issueddetails_View=false;
    this.Clr_Books();
    this.Search_Books_Report();
    
   
}
trackByFn(index, item) 
{
return index;
}
Clr_Agent()
{
    this.Agent_Id_Edit=0;
    this.Agent_.Agent_Id=0;
    this.Agent_.Agent_Name="";
    this.Agent_.Address1="";
    this.Agent_.Address2="";
    this.Agent_.Address3="";
    this.Agent_.Address4="";
    this.Agent_.Pincode="";
    this.Agent_.Phone="";
    this.Agent_.Mobile="";
    this.Agent_.Whatsapp="";
    this.Agent_.Gender=0;
    this.Agent_.Email="";
    this.Agent_.Center_Code="";
    this.Agent_.Center_Name="";
    this.Agent_.Agent_Fees=0;
    this.Agent_.Alternative_Email="";
    this.Agent_.Comm_Address1="";
    this.Agent_.Comm_Address2="";
    this.Agent_.Comm_Address3="";
    this.Agent_.Comm_Address4="";
    this.Agent_.Comm_Mobile="";
    this.Agent_.Comm_Pincode="";
    this.Agent_.User_Name="";
    this.Agent_.Password="";
    this.Agent_.Photo="";
    this.Agent_.GSTIN="";
    this.Agent_.Category_Id=0;
    this.Agent_.Commission=0;
    this.Agent_.User_Id=0;
    this.Category_Type_=null;

    this.Remove_Registration_Visibility=false
    this.Registration_Visiblility=false
}

Clr_Books()
{
    this.Books_.Books_Id=0;
    this.Books_.Books_Name="";
    this.Books_.Authors="";
    this.Books_.Description="";
    this.Books_.Books_No="";
    this.Books_.Book_Count=0;
    this.Books_.Rack_No="";
}




Category_Click()
{
    this.Agent_.Commission=this.Category_Type_.Commision_Percentage
}
Load_Agent_Dropdowns()
    {
    this.Agent_Service_.Load_Agent_Dropdowns().subscribe(Rows => {    
    if (Rows != null) {

    this.Category_Data= Rows.Category;        
    this.Category_Type_Temp.Category_Id = 0;
    this.Category_Type_Temp.Category_Name = "Select";
    this.Category_Data.unshift(this.Category_Type_Temp);
    // this.Category_Type_Search=this.Category_Type_Data[0];
    this.Category_Type_=this.Category_Data[0];
    }
    this.issLoading = false;
    },
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
Load_Category_Commission(Category_Id_)
{
    if(this.Category_Data==undefined || this.Category_Data.length==0)
    {
    this.issLoading = true;
    this.Agent_Service_.Load_Category_Commission(Category_Id_).subscribe(Rows => {
    if (Rows != null) {
    // this.Category_Data = Rows[0];
    this.Agent_.Commission = Rows[0];
    this.issLoading = false;
    }

    },
    Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
}
Search_Agent()
{ 
    this.issLoading=true;
    this.Agent_Service_.Search_Agent(this.Agent_Name_Search).subscribe(Rows => {
 
    this.Agent_Data=Rows[0];
    this.Total_Entries=this.Agent_Data.length;
    if(this.Agent_Data.length==0)
    
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

New_Date(Date_)
{
this.date=Date_
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
return this.date;
}
File_Change(event)
{
    this.file = event.target.files[0]; 
    this.ImageFile = this.file;
    this.Agentfile=this.file.name;
    this.Agent_.Photo =this.ImageFile.name;
}
// Save_Books()
// {debugger
//     if(this.Books_.Books_Name=="" ||this.Books_.Books_Name==null || this.Books_.Books_Name==undefined)
//     {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data: { Message: 'Enter Book Name', Type: "3" }});
//     return;
//     }
   
//     if(this.Books_.Books_No=="" ||this.Books_.Books_No==null || this.Books_.Books_No==undefined)
//     {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data: { Message: 'Enter Book No', Type: "3" }});
//     return;
//     }
 
//     this.issLoading=true;
    
//     debugger
// this.Student_Service_.Save_Books(this.Books_).subscribe(Save_status => {
//     debugger
//     Save_status=Save_status[0];
//     if(Number(Save_status[0].Books_Id_)>0)
//     {
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
//         this.Close_Click();
//     // this.issLoading=false; 
//     // this.Books_.Books_Id=Save_status[0].Books_Id_


// } else if (Number(Save_status[0].Books_Id_) === -1) {
//     const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass: 'Dialogbox-Class', data: { Message: 'Book Name / Book No already exists', Type: "2" }});
// } else {
//     const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass: 'Dialogbox-Class', data: { Message: 'Error Occurred', Type: "2" }});




// }
// this.issLoading=false;
// },
// error => {
// this.issLoading = false;
// const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass: 'Dialogbox-Class', data: { Message: error.error, Type: "2" }});
// }
// );
    
// //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
// //  this.Clr_Books();
// //     }
// //     else{
// //     this.issLoading=false;
// //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
// //     }
// //     this.issLoading=false;
// //     },
// //     Rows => { 
// //     this.issLoading=false;
// //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
// //     });
// }
// Edit_Books(Books_e:Books,index)
// {
//     this.tab_view=true;
//     this.profile_View=true;
//     this.AgentReceipt_View=false;
//     this.Receipt_History_View=false;
//     this.Entry_View=true;
//     this.Books_=Books_e;
//     // this.Agent_Id_Edit=Agent_e.Agent_Id;
//     this.Books_=Object.assign({},Books_e);

 
//     }
Save_Books()
{debugger
    if(this.Books_.Books_Name=="" ||this.Books_.Books_Name==null || this.Books_.Books_Name==undefined)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data: { Message: 'Enter Book Name', Type: "3" }});
    return;
    }
   
    if(this.Books_.Books_No=="" ||this.Books_.Books_No==null || this.Books_.Books_No==undefined)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data: { Message: 'Enter Book No', Type: "3" }});
    return;
    }
 
    this.issLoading=true;
    
    debugger
this.Student_Service_.Save_Books(this.Books_).subscribe(Save_status => {
    debugger
    Save_status=Save_status[0];
    if(Number(Save_status[0].Books_Id_)>0)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
        this.Close_Click();
    // this.issLoading=false; 
    // this.Books_.Books_Id=Save_status[0].Books_Id_


} else if (Number(Save_status[0].Books_Id_) === -1) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass: 'Dialogbox-Class', data: { Message: 'Book Name / Book No already exists', Type: "2" }});
} else {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass: 'Dialogbox-Class', data: { Message: 'Error Occurred', Type: "2" }});




}
this.issLoading=false;
},
error => {
this.issLoading = false;
const dialogRef = this.dialogBox.open(DialogBox_Component, {panelClass: 'Dialogbox-Class', data: { Message: error.error, Type: "2" }});
}
);
    
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
//  this.Clr_Books();
//     }
//     else{
//     this.issLoading=false;
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//     }
//     this.issLoading=false;
//     },
//     Rows => { 
//     this.issLoading=false;
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
//     });
}
Edit_Books(Books_e:Books,index)
{
    debugger

        this.profile_View=true;
        this.AgentReceipt_View=false;
        this.Receipt_History_View=false;
        this.Entry_View=true;
        // this.Books_=Books_e;
        this.Books_=Object.assign({},Books_e);

}
   

// Edit_Books(book_Id, index) {

//     this.profile_View=true;
//             this.AgentReceipt_View=false;
//             this.Receipt_History_View=false;
//             this.Entry_View=true;
           
//   this.issLoading = true;
// debugger
//   this.Student_Service_.Get_Books(this.Books_.Books_Id).subscribe(
//   (Rows) => {
    
//   this.Books_ = Object.assign({}, Rows[0][0]);
 
//   this.issLoading = false;
//   },
//   (Rows) => {
//   this.issLoading = false;
//   const dialogRef = this.dialogBox.open(DialogBox_Component, {
//   panelClass: "Dialogbox-Class",
//   data: { Message: "Error Occured", Type: "2" },
//   });
//   }
//   );
//   }



Search_Books_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Books_Data == undefined || this.Books_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Books_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        this.Books_Data = Rows[0];
        this.issLoading = false;

        this.Books_Data_Filter=[];

        for (var i=0;i<this.Books_Data.length;i++)
        {
            if(this.Books_Data[i].Books_Name.toLowerCase().includes(Value))
                this.Books_Data_Filter.push(this.Books_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Books_Data_Filter=[];
        for (var i=0;i<this.Books_Data.length;i++)
        {
            if(this.Books_Data[i].Books_Name.toLowerCase().includes(Value))
                this.Books_Data_Filter.push(this.Books_Data[i])
        }
    }
}


display_Books(Books_: Books)
{     
    if (Books_) { return Books_.Books_Name; }
}



Search_Books_Report()
{
    debugger
    var 	search_name_ = "", book_no=""

    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    // search_name_ = this.Search_Name;
    // debugger
    // this.Books_Issued_.Users_Id=Number(this.Login_User);
    
    // if (this.Books_ != undefined && this.Books_ != null)
    //     if (this.Books_.Books_Id != undefined && this.Books_.Books_Id != null)
    //     book_Id = this.Books_.Books_Id;


    if (
        this.Search_Name != undefined &&
        this.Search_Name != null &&
        this.Search_Name != ""
    )
        search_name_ = this.Search_Name;



    
        if (
            this.Books_No_ != undefined &&
            this.Books_No_ != null 
        )
        book_no = this.Books_No_;
      

    // if (this.Course_ != undefined && this.Course_ != null)
    //     if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
    //         Course_Id = this.Course_.Course_Id;   

    this.issLoading = true;
    this.Student_Service_.Search_Books_Report(search_name_,book_no).subscribe(Rows =>{
        debugger
    this.Books_Report_Data = Rows[0];
    this.Total_Entries = this.Books_Report_Data.length;
    this.issLoading = false;
    if(this.Books_Report_Data.length==0)
    { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    }
    this.issLoading=false;
    },
    Rows => 
    { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}


Delete_Books(Books_Id,index)
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
        {
        this.issLoading=true;
        this.Student_Service_.Delete_Books(Books_Id).subscribe(Delete_status => {
        debugger
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        debugger
        if(Delete_status==1){
        this.Books_Report_Data.splice(index, 1);
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


Search_BooksNo_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
        debugger
    if (this.BooksNo_Data == undefined || this.BooksNo_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_BooksNo_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        debugger
        this.BooksNo_Data = Rows[0];
        this.issLoading = false;

        this.BooksNo_Data_Filter=[];

        for (var i=0;i<this.BooksNo_Data.length;i++)
        {
            if(this.BooksNo_Data[i].Books_No.toLowerCase().includes(Value))
                this.BooksNo_Data_Filter.push(this.BooksNo_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.BooksNo_Data_Filter=[];
        for (var i=0;i<this.BooksNo_Data.length;i++)
        {
            if(this.BooksNo_Data[i].Books_No.toLowerCase().includes(Value))
                this.BooksNo_Data_Filter.push(this.BooksNo_Data[i])
        }
    }
}


display_BooksNo(Books_: Books)
{     
    if (Books_) { return Books_.Books_No; }
}







// View_IssuedDetails(Books_Id) {
//     this.Issueddetails_View=true;
//         this.profile_View=false;
//         this.Entry_View=true;
//     debugger
//     this.Books_.Users_Name=this.Login_User;
//     this.Student_Service_.Search_BooksViewdetails_Report(Books_Id).subscribe(
//     (Rows) => {
    
//         debugger




//     this.Books_Report_Data = Rows[0];
    
   


//     if (this.Books_Report_Data.length == 0) {
//         this.issLoading = false;
//         const dialogRef = this.dialogBox.open(DialogBox_Component, {
//         panelClass: "Dialogbox-Class",
//         data: { Message: "No Details Found", Type: "3" },
//         });
//         }


        
//     this.issLoading = false;
//     },
//     (Rows) => {
//     this.issLoading = false;
//     const dialogRef = this.dialogBox.open(DialogBox_Component, {
//     panelClass: "Dialogbox-Class",
//     data: { Message: "Error Occured", Type: "2" },
//     });
//     }
//     );
//     }


View_IssuedDetails(Books_Id) {
    this.Issueddetails_View = true;
    this.profile_View = false;
    this.Entry_View = true;
    this.Books_.Users_Name = this.Login_User;
  
    // Reset the data to clear old values
    this.Books_Report_Data = null;
  
    this.issLoading = true; // Show loading indicator while fetching data
  
    this.Student_Service_.Search_BooksViewdetails_Report(Books_Id).subscribe(
      (Rows) => {
        this.Books_Report_Data = Rows[0];
        this.issLoading = false; // Hide loading indicator once data is fetched
  
        if (this.Books_Report_Data.length === 0) {
          const dialogRef = this.dialogBox.open(DialogBox_Component, {
            panelClass: "Dialogbox-Class",
            data: { Message: "No Details Found", Type: "3" },
          });
        }
      },
      (error) => {
        this.issLoading = false; // Hide loading indicator in case of an error
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: "Dialogbox-Class",
          data: { Message: "Error Occurred", Type: "2" },
        });
      }
    );
  }
  
  
  
  
  
  
  







}
