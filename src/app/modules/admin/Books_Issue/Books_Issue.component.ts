import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { Agent_Service } from '../../../services/Agent.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Agent } from '../../../models/Agent';
import {MatAutocomplete, MatDialog} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Status } from '../../../models/Status';
import { Mode } from '../../../models/Mode';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Receipt_Voucher } from '../../../models/Receipt_Voucher';
import { Category } from '../../../models/Category';
import { Books } from '../../../models/Books';
import { Student } from '../../../models/Student';
import { Books_Issued } from '../../../models/Books_Issued';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
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
selector: 'app-Books_Issue',
templateUrl: './Books_Issue.component.html',
styleUrls: ['./Books_Issue.component.css']
})
export class Books_IssueComponent implements OnInit 
{
    // @ViewChild(MatAutocompleteTrigger,{false})
    // @ViewChild(MatAutocompleteTrigger, { read: Books, static: true }) any;

    Agent_Data:Agent[]
    Agent_:Agent= new Agent();
    Agent_Name_Search:string;
    Search_By_:number=0
    Books_Data:Books[]
    Books_:Books= new Books();
    Books_Name_Search:string;

    Books_Issued_:Books_Issued= new Books_Issued();

    Entry_View:boolean=true;
    EditIndex: number;
    Total_Entries: number;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Books_Temp3: Student= new Student();
   BookIssue_Edit:boolean;
   BookIssue_Save:boolean;
   BookIssue_Delete:boolean;

    myInnerHeight: number;
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

    Registration_No_:string;
    Books_No_:string;

   Books_Temp: Books = new Books;
   Books_Temp1: Books = new Books;
   Books_Temp2: Books = new Books;
   Books_Data_Filter: Books[]  
   BooksNo_Data:Books[];
   BooksNo_Data_Filter: Books[]  
   Books_Search_:Books= new Books();
   BooksIssued_Report_Data:any;

   Booksissued_Data:Books[];
   Booksissued_Data_Filter: Books[]  

   BooksNoIssued_Data:Books[];
   BooksNoIssued_Data_Filter: Books[]  

   BooksNameIssued_Data:Books[]
   BooksNameIssued_Data_Filter:Books[];


  ReturnStatus_Type:Books_Issued= new Books_Issued();
  ReturnStatus_Type_Temp:Books_Issued= new Books_Issued();
  ReturnStatus_Type_Data:Books_Issued[]

   Student_Data:Student[];
   Student_Data_Filter: Student[]  
   Student_Search_:Student= new Student();

   Booksissue_Search_:Books= new Books();

   Books_Typeaheadsearch:Books= new Books();
   BooksNo_Typeaheadsearch:Books= new Books();
//    Phone_Typeaheadsearch:Student= new Student();
 Reg_Typeaheadsearch:Student= new Student();


 BooksNo_Temp: Books = new Books();
 PhoneNo_Temp: Student = new Student();

 Return_btn:boolean=true;

constructor(public Agent_Service_:Agent_Service, 
    public Student_Service_:Student_Service, 
    private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User=localStorage.getItem(("Login_User"));
    this.Permissions = Get_Page_Permission(71);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.BookIssue_Edit=this.Permissions.Edit;
    this.BookIssue_Save=this.Permissions.Save;
    this.BookIssue_Delete=this.Permissions.Delete;
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
    this.Books_Issued_.Return_Promise_Date=null;
    this.Load_Agent_Dropdowns();
 
    this.Search_BooksIssued_Report();
 
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

}
Get_Menu_Status(Menu_id, Login_user_id)
{
    this.issLoading = true;
    this.Agent_Service_.Get_Menu_Status(Menu_id,Login_user_id).subscribe(Rows => {  
    if(Menu_id==71)
    if (Rows[0][0]==undefined)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('Home_Page');
    }  

    var a=Rows[0]

    if (Rows[0][0]!=undefined)
    if (Rows[0][0].View >0)
    {

    if(Menu_id==71)
    {
    this.Permissions=Rows[0][0];
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('Home_Page');
    }
    this.BookIssue_Edit=this.Permissions.Edit;
    this.BookIssue_Save=this.Permissions.Save;
    this.BookIssue_Delete=this.Permissions.Delete;
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
    this.Clr_Books();
    this.Search_BooksIssued_Report();
    
   
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
    this.Books_Search_=null;
    this.Books_Issued_.Books_Id=0;
    this.Books_Issued_.Books_No="";
    this.Books_Issued_.Books_Issued_Id=0;
    this.Books_Issued_.Student_Id=0;
    this.Books_Issued_.Phone="";
    this.Books_Issued_.Books_Name="";
    this.Student_Data=[];
    this.BooksNameIssued_Data=[];
    this.BooksNoIssued_Data=[];
    this.Student_Search_=null;
    this.Books_=null;
    this.Books_Issued_.Return_Promise_Date=null;
//     this.Books_Issued_.Return_Promise_Date = new Date();
// this.Books_Issued_.Return_Promise_Date = this.New_Date(this.Books_Issued_.Return_Promise_Date);
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
Save_Books_Issued()
{
   
   debugger
    
 
   if (!this.Student_Search_ || !this.Student_Search_.Registration_No) {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Registration No", Type: "3" },
    });
    return;
}

if (this.Books_Search_.Books_No == null || this.Books_Search_.Books_No == undefined ||this.Books_Search_.Books_No == '') {
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Select Book No", Type: "3" },
    });
    return;
}
     
                // const selectedBook = this.BooksNoIssued_Data_Filter.find(book => book.Books_No === this.Books_.Books_No);
                // if (selectedBook) {
                //     this.Books_.Books_Id = selectedBook.Books_Id;
                // } else {
                //     const dialogRef = this.dialogBox.open(DialogBox_Component, {
                //         panelClass: "Dialogbox-Class",
                //         data: { Message: "Invalid Book Number", Type: "3" },
                //     });
                //     return;
                // }

    // if(this.Books_Issued_.Return_Promise_Date==null || this.Books_Issued_.Return_Promise_Date==undefined)
    // {
    // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data: { Message: 'Enter Return Date', Type: "3" }});
    // return;
    // }
 
    this.issLoading=true;
    debugger
    this.Books_Issued_.Users_Id=Number(this.Login_User);
    this.Books_Issued_.Books_Id=this.Books_Search_.Books_Id;
    this.Books_Issued_.Student_Id=this.Student_Search_.Student_Id;

    // this.Books_Issued_.Return_Promise_Date=this.New_Date(new Date(moment(this.Books_Issued_.Return_Promise_Date).format('YYYY-MM-DD')));
this.Student_Service_.Save_Books_Issued(this.Books_Issued_).subscribe(Save_status => {
debugger
    Save_status=Save_status[0];




    
    if(Number(Save_status[0].Books_Issued_Id_)>0)
    {
     this.issLoading=false; 
    // this.Books_.Books_Id=Save_status[0].Books_Id_
    

    // if (Number(Save_status[0].Books_Issued_Id_==-2)) {
    //     this.issLoading = false;
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Book Already Issued',Type:"2"}});

    //     return;
    //     }

    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
 this.Clr_Books();
    }
    else{
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    }
    this.issLoading=false;
    },
    Rows => { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:Rows.error.error,Type:"2"}});
    });
}
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

Edit_Books(Books_e:Books_Issued,index)
{
    debugger

        this.profile_View=true;
        this.AgentReceipt_View=false;
        this.Receipt_History_View=false;
        this.Entry_View=true;
        this.Books_Issued_=Object.assign({},Books_e);

        debugger

        this.Books_Issued_.Return_Promise_Date=this.New_Date(new Date(moment(this.Books_Issued_.Return_Promise_Date).format("YYYY-MM-DD")));


        this.Books_Temp.Books_Id = this.Books_Issued_.Books_Id;
 this.Books_Temp.Books_Name = this.Books_Issued_.Books_Name;
this.Books_ = Object.assign(this.Books_Temp);


this.BooksNo_Temp.Books_Id = this.Books_Issued_.Books_Id;
this.BooksNo_Temp.Books_No = this.Books_Issued_.Books_No;
this.Books_Search_ = Object.assign(this.BooksNo_Temp);


this.PhoneNo_Temp.Student_Id = this.Books_Issued_.Student_Id;
this.PhoneNo_Temp.Phone = this.Books_Issued_.Phone;
this.Student_Search_ = Object.assign(this.PhoneNo_Temp);

this.Books_Temp3.Student_Name =  this.Books_Issued_.Student_Name
this.Books_Temp3.Registration_No =  this.Books_Issued_.Registration_No
this.Books_Temp3.Student_Id =  this.Books_Issued_.Student_Id
this.Student_Search_ = Object.assign(this.Books_Temp3);

        // this.Books_=Books_e;
       
}
   

// Get_Books(book_Id, index) {

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
        debugger
    if (this.Books_Data == undefined || this.Books_Data.length==0)
    {

       
        this.issLoading = true;
        this.Student_Service_.Search_Books_Typeahead('').subscribe(Rows => {
            debugger
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




Search_Student_Reg_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
        debugger
    if (this.Student_Data == undefined || this.Student_Data.length==0)
    {
        this.issLoading = true;
        debugger
        this.Student_Service_.Search_Student_Reg_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        debugger
        this.Student_Data = Rows[0];
        this.issLoading = false;

        this.Student_Data_Filter=[];

        for (var i=0;i<this.Student_Data.length;i++)
        {
            if(this.Student_Data[i].Registration_No.toLowerCase().includes(Value))
                this.Student_Data_Filter.push(this.Student_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Student_Data_Filter=[];
        for (var i=0;i<this.Student_Data.length;i++)
        {
            if(this.Student_Data[i].Registration_No.toLowerCase().includes(Value))
                this.Student_Data_Filter.push(this.Student_Data[i])
        }
    }
}


display_reg(Student_: Student)
{     
    if (Student_) { return Student_.Registration_No; }
}













Search_BooksIssued_Report()
{
    debugger
    var book_no='',Registration_No='',Search_By_=0


    Search_By_ =Number(this.Search_By_)

    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    // search_name_ = this.Search_Name;
    
    // if (this.Books_Typeaheadsearch != undefined && this.Books_Typeaheadsearch != null)
    //     if (this.Books_Typeaheadsearch.Books_Id != undefined && this.Books_Typeaheadsearch.Books_Id != null)
    //     book_Id = this.Books_Typeaheadsearch.Books_Id;
    

    //     if (this.BooksNo_Typeaheadsearch != undefined && this.BooksNo_Typeaheadsearch != null)
    //     if (this.BooksNo_Typeaheadsearch.Books_Id != undefined && this.BooksNo_Typeaheadsearch.Books_Id != null)
    //     book_no = this.BooksNo_Typeaheadsearch.Books_Id;

        // if (this.Phone_Typeaheadsearch != undefined && this.Phone_Typeaheadsearch != null)
        // if (this.Phone_Typeaheadsearch.Student_Id != undefined && this.Phone_Typeaheadsearch.Student_Id != null)
        // phone_no = this.Phone_Typeaheadsearch.Student_Id;

        // if (this.Reg_Typeaheadsearch != undefined && this.Reg_Typeaheadsearch != null)
        // if (this.Reg_Typeaheadsearch.Student_Id != undefined && this.Reg_Typeaheadsearch.Student_Id != null)
        // Registration_No = this.Reg_Typeaheadsearch.Student_Id;

        

    // if (this.Course_ != undefined && this.Course_ != null)
    //     if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
    //         Course_Id = this.Course_.Course_Id;   
if (
        this.Registration_No_ != undefined &&
        this.Registration_No_ != null 
        
    )
    Registration_No = this.Registration_No_;



    
        if (
            this.Books_No_ != undefined &&
            this.Books_No_ != null 
        )
        book_no = this.Books_No_;
   
        
    this.issLoading = true;
    debugger
    this.Student_Service_.Search_BooksIssued_Report(book_no,Registration_No,Search_By_).subscribe(Rows =>{
        debugger
    this.BooksIssued_Report_Data = Rows[0];
    this.Total_Entries = this.BooksIssued_Report_Data.length;
    this.issLoading = false;
    if(this.BooksIssued_Report_Data.length==0)
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
        this.Student_Service_.Delete_BooksIssued(Books_Id).subscribe(Delete_status => {
        debugger
        Delete_status = Delete_status[0];
        Delete_status = Delete_status[0].DeleteStatus_.data[0];
        debugger
        if(Delete_status==1){
        this.BooksIssued_Report_Data.splice(index, 1);
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

BookIssued_Return(Books_Issued_Id)
{this.issLoading = true;
    
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Returned", Type:"false" },
        });
        

    
    debugger
    this.Student_Service_.BookIssued_Return(Books_Issued_Id).subscribe(Rows =>{
       this.Search_BooksIssued_Report();

    this.issLoading = false;
   
   
    },
    Rows => 
    { 
    this.issLoading=false;
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
cancelReturn(Books_Issued_Id){
    
    const dialogRef = this.dialogBox.open(DialogBox_Component, {
        panelClass: "Dialogbox-Class",
        data: { Message: "Do you want to cancel this book issue return?", Type:"false" },
        });
        this.Student_Service_.BookIssued_Cancel(Books_Issued_Id).subscribe(Rows =>{
            this.Search_BooksIssued_Report();
     
         this.issLoading = false;
        },
        Rows => 
        { 
        this.issLoading=false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });
  
}






Search_Booksissued_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
        debugger
    if (this.Booksissued_Data == undefined || this.Booksissued_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Booksissued_Typeahead(this.Books_.Books_Id,'','').subscribe(Rows => {
    if (Rows != null) 
    {
        debugger
        this.Booksissued_Data = Rows[0];
        this.issLoading = false;

        this.Booksissued_Data_Filter=[];
        debugger
        for (var i=0;i<this.Booksissued_Data.length;i++)
        {
            if(this.Booksissued_Data[i].Books_No.toLowerCase().includes(Value))
                this.Booksissued_Data_Filter.push(this.Booksissued_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Booksissued_Data_Filter=[];
        for (var i=0;i<this.Booksissued_Data.length;i++)
        {
            if(this.Booksissued_Data[i].Books_No.toLowerCase().includes(Value))
                this.Booksissued_Data_Filter.push(this.Booksissued_Data[i])
        }
    }
}


display_Booksissued(Books_: Books)
{     
    if (Books_) { return Books_.Books_No; }
}





Search_BooksNo_Issued_Typeahead(event: any)
{    
    
    debugger
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
        debugger
    if (this.BooksNoIssued_Data == undefined || this.BooksNoIssued_Data.length==0)
    {
        this.issLoading = true;
        debugger
        this.Student_Service_.Search_BooksNo_Issued_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        debugger
        this.BooksNoIssued_Data = Rows[0];
        this.issLoading = false;

        this.BooksNoIssued_Data_Filter=[];

        for (var i=0;i<this.BooksNoIssued_Data.length;i++)
        {
            if(this.BooksNoIssued_Data[i].Books_No.toLowerCase().includes(Value))
                this.BooksNoIssued_Data_Filter.push(this.BooksNoIssued_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.BooksNoIssued_Data_Filter=[];
        for (var i=0;i<this.BooksNoIssued_Data.length;i++)
        {
            if(this.BooksNoIssued_Data[i].Books_No.toLowerCase().includes(Value))
                this.BooksNoIssued_Data_Filter.push(this.BooksNoIssued_Data[i])
        }
    }
}


display_BooksNoIssued(Books_2: Books)
{     
    if (Books_2) { return Books_2.Books_No; }
}




Search_Books_Issued_Typeahead(event: any)
{     
     var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
        debugger
    if (this.BooksNameIssued_Data == undefined || this.BooksNameIssued_Data.length==0)
    {

       
        this.issLoading = true;
        this.Student_Service_.Search_Books_Issued_Typeahead('').subscribe(Rows => {
            debugger
            if (Rows != null) 
    {
        
        this.BooksNameIssued_Data = Rows[0];
        this.issLoading = false;
        debugger
        this.BooksNameIssued_Data_Filter=[];

        for (var i=0;i<this.BooksNameIssued_Data.length;i++)
        {
            if(this.BooksNameIssued_Data[i].Books_Name.toLowerCase().includes(Value))
                this.BooksNameIssued_Data_Filter.push(this.BooksNameIssued_Data[i])
        }
        
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.BooksNameIssued_Data_Filter=[];
        for (var i=0;i<this.BooksNameIssued_Data.length;i++)
        {
            if(this.BooksNameIssued_Data[i].Books_Name.toLowerCase().includes(Value))
                this.BooksNameIssued_Data_Filter.push(this.BooksNameIssued_Data[i])
        }
    }
}




display_BooksName(Books_1: Books)
{     
    if (Books_1) { return Books_1.Books_Name; }
}






Get_Books_Name(Books_Temp_T: Books) {
    debugger
    this.Books_Temp1.Books_Name =  Books_Temp_T.Books_Name
    this.Books_Temp1.Books_No =  Books_Temp_T.Books_No
   this.Books_ = Object.assign(this.Books_Temp1);
  
    
}


Get_Books_No(Books_Temp_N: Books) {
    debugger
    this.Books_Temp2.Books_No =  Books_Temp_N.Books_No
    this.Books_Temp2.Books_Name =  Books_Temp_N.Books_Name
    this.Books_Search_ = Object.assign(this.Books_Temp2);
    
}



}
