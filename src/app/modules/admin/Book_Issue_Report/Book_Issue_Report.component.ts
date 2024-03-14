import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student_Service } from '../../../services/Student.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Enquiry_Source } from '../../../models/Enquiry_Source';
import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Users } from '../../../models/Users';
import { Status } from '../../../models/Status';
import { Course } from '../../../models/Course';
import { Books } from 'app/models/Books';
import { Student } from 'app/models/Student';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: { dateInput: 'DD/MM/YYYY', },
    display: {
        dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
    },
};
@Component({
selector: 'app-Book_Issue_Report',
templateUrl: './Book_Issue_Report.component.html',
styleUrls: ['./Book_Issue_Report.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Book_Issue_ReportComponent implements OnInit {
    EditIndex: number;
    Total_Entries: number=0;
    Total_Amount:number=0;
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    issLoading: boolean;
    Permissions: any;
    Book_Issue_Report_Edit:boolean;
    Book_Issue_Report_Save:boolean;
    Book_Issue_Report_Delete:boolean;
    myInnerHeight: number;
    myTotalHeight:number;
    Export_Permission:any;
    Export_View :boolean =false;
    Books_Data_Filter: Books[]  
    BooksNo_Data:Books[];
    BooksNo_Data_Filter: Books[]  
    User_Search: Users = new Users();
    Users_Data: Users[]
    Users_Temp: Users = new Users();

    Enquiry_Status_Search: Status=new Status();
    Enquiry_Status_Data: Status[]
    Enquiry_Status_Temp: Status=new Status();
    Registration_No_:string;
    Books_No_:string;

    // Search_Status: Status = new Status;
    // Search_Status_Temp: Status = new Status;
    // Status_Data: Status[];
    Books_Typeaheadsearch:Books= new Books();
    BooksNo_Typeaheadsearch:Books= new Books();
    Book_Issue_Report_Data:any;
    year: any;
    month: any;
    day: any;
    date: any;
    Entry_View: boolean = true;
    profile_View:boolean=true;
    
    Login_User: number = 0;
    Book_Issue_Report_EditIndex: number = -1;

    FromDate_: Date = new Date();
    ToDate_: Date = new Date();
    Is_Date:boolean=true;   

    Course_Data: Course[];
    Course_:Course=new Course;
    Course_Temp: Course = new Course;
    Course_Data_Filter: Course[]  
    Reg_Typeaheadsearch:Student= new Student();

   
    // Book_Issue_Report_Data:any;

    Edit_Page_Permission: any;

    Enquiry_Source_: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Temp: Enquiry_Source = new Enquiry_Source;
    Enquiry_Source_Data: Enquiry_Source[]    


    
   Student_Data:Student[];
   Student_Data_Filter: Student[]  
   Student_Search_:Student= new Student();
constructor(public Student_Service_:Student_Service, private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog) { }
ngOnInit() 
{
    this.Login_User = Number(localStorage.getItem("Login_User"));
    this.Permissions = Get_Page_Permission(47);
    this.Export_Permission=Get_Page_Permission(50);
    if(this.Permissions==undefined || this.Permissions==null)
    {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
    }
    else
    {
    this.Book_Issue_Report_Edit=this.Permissions.Edit;
    this.Book_Issue_Report_Save=this.Permissions.Save;
    this.Book_Issue_Report_Delete=this.Permissions.Delete;
    this.Page_Load()
    if(this.Export_Permission !=undefined && this.Export_Permission !=null)
    this.Export_View=this.Export_Permission.Edit
    
    }
     
}
Page_Load()
{
    // this.myInnerHeight = (window.innerHeight);
    // this.myInnerHeight = this.myInnerHeight - 200;
    this.Entry_View = false;
    this.FromDate_=this.New_Date(this.FromDate_)
    this.ToDate_=this.New_Date(this.ToDate_)
    this.Load_Enquiry_Source();
    this.Get_Lead_Load_Data();
    this.myInnerHeight = (window.innerHeight);
    this.myTotalHeight=this.myInnerHeight -200
    this.myTotalHeight=this.myTotalHeight-40;
    this.myInnerHeight = this.myInnerHeight - 320;
    this.Search_Book_Issued_Report();
}

Export()
{
    
        this.Student_Service_.exportExcel(this.Book_Issue_Report_Data,'Book Issued Report')
       
}
Get_Lead_Load_Data()
{
this.issLoading = true;
this.Student_Service_.Get_Lead_Load_Data().subscribe(Rows => {
   
    if (Rows != undefined)
    {
        
        this.issLoading = false;
        // this.Department_Data = Rows.returnvalue.Department;
         this.Users_Data = Rows.returnvalue.Users;
         this.Enquiry_Status_Data = Rows.returnvalue.Status;
        
        this.Users_Temp.Users_Id = 0;
        this.Users_Temp.Users_Name = "All";
        this.Users_Data.unshift(Object.assign({},this.Users_Temp));
        this.User_Search = this.Users_Data[0];

        this.Enquiry_Status_Temp.Status_Id = 0;
        this.Enquiry_Status_Temp.Status_Name = "All";
        this.Enquiry_Status_Data.unshift(Object.assign({},this.Enquiry_Status_Temp));
        this.Enquiry_Status_Search = this.Enquiry_Status_Data[0];

    }
},
Rows => {
    this.issLoading = false;
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
});
}
Load_Enquiry_Source()
{
    this.issLoading = true;
    this.Student_Service_.Load_Enquiry_Source().subscribe(Rows => {
        if (Rows != null) {
            this.Enquiry_Source_Data = Rows[0];
            this.Enquiry_Source_Temp.Enquiry_Source_Id = 0;
            this.Enquiry_Source_Temp.Enquiry_Source_Name = "All";
            this.Enquiry_Source_Data.unshift(this.Enquiry_Source_Temp);
            this.Enquiry_Source_ = this.Enquiry_Source_Data[0];
            this.issLoading = false;
        }
    },
        Rows => {
            this.issLoading = false;
        });
}
isMobileMenu() {
    if ($(window).width() > 991)
    {
        return false;
    }
    return true;
};
isDesktopMenu() 
{
    if ($(window).width() < 991)
    {
        return false;
    }
    return true;
};
trackByFn(index, item) 
{
    return index;
}
Search_Course_Typeahead(event: any)
{     
    var Value = "";
    if (event.target.value == "")
        Value = "";
    else
        Value = event.target.value;
    if (this.Course_Data == undefined || this.Course_Data.length==0)
    {
        this.issLoading = true;
        this.Student_Service_.Search_Course_Typeahead('').subscribe(Rows => {
    if (Rows != null) 
    {
        this.Course_Data = Rows[0];
        this.issLoading = false;

        this.Course_Data_Filter=[];

        for (var i=0;i<this.Course_Data.length;i++)
        {
            if(this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
                this.Course_Data_Filter.push(this.Course_Data[i])
        }
    }
    },
    Rows => {
     this.issLoading = false;
    });
    } 

    else
    {
        
        this.Course_Data_Filter=[];
        for (var i=0;i<this.Course_Data.length;i++)
        {
            if(this.Course_Data[i].Course_Name.toLowerCase().includes(Value))
                this.Course_Data_Filter.push(this.Course_Data[i])
        }
    }
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

Edit_Lead(Student_Id, i) {

    localStorage.setItem('Student_Id', Student_Id);
    console.log(Student_Id)
    
    this.Edit_Page_Permission = Get_Page_Permission(14);
    ;
    if (this.Edit_Page_Permission == undefined ||this.Edit_Page_Permission.Edit == undefined || this.Edit_Page_Permission.Edit ==0 || this.Edit_Page_Permission.Edit ==null) {
        ;
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }    
    else if (this.Edit_Page_Permission.View == true)    
    {
        ;
        this.router.navigateByUrl('/Student');
       // this.router.navigateByUrl('/Stu');
      // window.open('/Student')      
    //   this.goToLink();  
    }
    else {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission to view', Type: "2" } });
    }
}




goToLink() {
    
    return;
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/Student'])
    );
    // window.open('/Student');
    window.open(url, '_blank');
  }
display_Course(Course_: Course)
{     
    if (Course_) { return Course_.Course_Name; }
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
Search_Book_Issued_Report()
{
    debugger
    var  look_In_Date_Value=0,book_no='',Registration_No=''

    // if (this.Search_Name != undefined && this.Search_Name != null && this.Search_Name != '')
    // search_name_ = this.Search_Name;
    var User_Id=0,status =0;
    if (this.Is_Date == true)
         look_In_Date_Value = 1;
         if (this.BooksNo_Typeaheadsearch != undefined && this.BooksNo_Typeaheadsearch != null)
        //  if (this.BooksNo_Typeaheadsearch.Books_Id != undefined && this.BooksNo_Typeaheadsearch.Books_Id != null)
        //  book_no = this.BooksNo_Typeaheadsearch.Books_Id;
        //  if (this.Reg_Typeaheadsearch != undefined && this.Reg_Typeaheadsearch != null)
        //  if (this.Reg_Typeaheadsearch.Student_Id != undefined && this.Reg_Typeaheadsearch.Student_Id != null)
        //  Registration_No = this.Reg_Typeaheadsearch.Student_Id;
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
       
    // if (this.Course_ != undefined && this.Course_ != null)
    //     if (this.Course_.Course_Id != undefined && this.Course_.Course_Id != null)
    //         Course_Id = this.Course_.Course_Id;   

    this.issLoading = true;
    debugger
    this.Student_Service_.Search_Books_Issued_Report(look_In_Date_Value,moment(this.FromDate_).format('YYYY-MM-DD'), moment(this.ToDate_).format('YYYY-MM-DD'),book_no,Registration_No).subscribe(Rows =>{
        debugger
    this.Book_Issue_Report_Data = Rows[0];
    this.Total_Entries = this.Book_Issue_Report_Data.length;
    this.issLoading = false;
    if(this.Book_Issue_Report_Data.length==0)
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
}

