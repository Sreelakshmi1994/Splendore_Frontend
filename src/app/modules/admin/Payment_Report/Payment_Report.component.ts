import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment_Voucher_Service } from '../../../services/Payment_Voucher.service';
import { Journal_Entry_Service } from '../../../services/Journal_Entry.service';
import { Receipt_Voucher_Service } from '../../../services/Receipt_Voucher.service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Payment_Voucher } from '../../../models/Payment_Voucher';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { Company } from '../../../models/Company';
import { PaymentMode } from '../../../models/PaymentMode';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
        parse: {
                dateInput: 'DD/MM/YYYY',
        },
        display: {
                dateInput: 'DD/MM/YYYY', monthYearLabel: 'MMM YYYY', dateA11yLabel: 'DD/MM/YYYY', monthYearA11yLabel: 'MMMM YYYY',
        },
};

import { MatDialog } from '@angular/material'; import { ROUTES, Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import { Student_Service } from 'app/services/Student.service';

@Component({
        selector: 'app-Payment_Report',
        templateUrl: './Payment_Report.component.html',
        styleUrls: ['./Payment_Report.component.css'],
        providers: [
                { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
                { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },],

})
export class Payment_ReportComponent implements OnInit {
        Payment_Voucher_Data: Payment_Voucher[]
        Payment_Voucher_: Payment_Voucher = new Payment_Voucher();
        Payment_Voucher_Name_Search: string;

        Payment_Mode_Data: PaymentMode[]
        Payment_Mode_: PaymentMode = new PaymentMode();
        Mode_Temp: PaymentMode = new PaymentMode();
        FromAccount_: Client_Accounts = new Client_Accounts();
        Client_Accounts_Data: Client_Accounts[]
        From_Client_Accounts_Data: Client_Accounts[]
        Print_Client_: Client_Accounts = new Client_Accounts();
        Client_Accounts_Data_: Client_Accounts[]
        Company_Temp: Company = new Company();
        Company_Data: Company[];
        Company_Search: Company = new Company();
        Print_Company_: Company = new Company();

        Image_Url: string;
        Company_Sign: string;
        Company_Seal: string;

        ToAccount_: Client_Accounts = new Client_Accounts();
        Search_FromDate: Date = new Date();
        Search_ToDate: Date = new Date();
        FromAccount_Search: Client_Accounts = new Client_Accounts();
        ToAccount_Search: Client_Accounts = new Client_Accounts();
        Voucher_No_search: number;
        FromAccount_Temp: Client_Accounts = new Client_Accounts();
        ToAccount_Temp: Client_Accounts = new Client_Accounts();

        Print_Date_: Date;
        Entry_View: boolean = true;
        myInnerHeight: number;
        EditIndex: number;
        Total_Entries: number = 0;
        color = 'primary';
        mode = 'indeterminate';
        value = 50;
        Total_Amounts: number = 0;
        Look_In_Date: Boolean = true;
        month: any;
        day: any;
        date: any;
        year: any;
        Login_User: string = "0";
        issLoading: boolean;
        Permissions: any;
        Permissions1: any;
        Payment_Voucher_Edit: boolean;
        Payment_Voucher_Save: boolean;
        Payment_Voucher_Delete: boolean;
        Payment_Voucher_Status: boolean;
        Payment_Voucher_Print: boolean;

        constructor(public Student_Service_:Student_Service ,public Payment_Voucher_Service_: Payment_Voucher_Service, public Client_Accounts_Service_: Client_Accounts_Service, public Receipt_Voucher_Service_: Receipt_Voucher_Service, public Journal_Entry_Service_: Journal_Entry_Service, private route: ActivatedRoute, private router: Router, public dialogBox: MatDialog) { }
        ngOnInit() {
                this.Login_User = localStorage.getItem("Login_User");
                this.Permissions = Get_Page_Permission(95);
                this.Permissions1 = Get_Page_Permission(95);
                if (this.Permissions == undefined || this.Permissions == null) {
                        localStorage.removeItem('token');
                        this.router.navigateByUrl('/auth/login');
                }
                else {
                        this.Payment_Voucher_Edit = this.Permissions.Edit;
                        this.Payment_Voucher_Save = this.Permissions.Save;
                        this.Payment_Voucher_Delete = this.Permissions.Delete;
                        this.Payment_Voucher_Status = this.Permissions1.status;
                        this.Page_Load()
                }
        }
        New_Date(Date_) {
                this.date = Date_;
                this.year = this.date.getFullYear();
                this.month = this.date.getMonth() + 1;
                if (this.month < 10) {
                        this.month = "0" + this.month;
                }
                this.day = this.date.getDate().toString();
                if (Number.parseInt(this.day) < 10) {
                        this.day = "0" + this.day;
                }
                this.date = this.year + "-" + this.month + "-" + this.day;
                return this.date;
        }
        Print_Date(Date_) {
                this.date = Date_;
                this.year = this.date.getFullYear();
                this.month = this.date.getMonth() + 1;
                if (this.month < 10) {
                        this.month = "0" + this.month;
                }
                this.day = this.date.getDate().toString();
                if (Number.parseInt(this.day) < 10) {
                        this.day = "0" + this.day;
                }
                this.date = this.day + "-" + this.month + "-" + this.year;
                return this.date;
        }

        Page_Load() {
                this.myInnerHeight = (window.innerHeight);
                this.myInnerHeight = this.myInnerHeight - 300;
                this.Search_FromDate = this.New_Date(this.Search_FromDate);
                this.Search_ToDate = this.New_Date(this.Search_ToDate);
                this.Search_Payment_Voucher();
                this.Get_Payment_Mode();
                this.Entry_View = false;
                this.Payment_Voucher_Print = false;
                this.Search_Company();

        }

 From_Accounts_Typeahead(event: any) {

                this.issLoading = true;
                var Value = "";
                if (event.target.value == "")
                        Value = undefined;
                else
                        Value = event.target.value;

                this.Journal_Entry_Service_.Accounts_Typeahead('11', Value).subscribe(Rows => {

                        if (Rows != null) {
                                this.From_Client_Accounts_Data = Rows[0];
                                //this.Print_Client_=this.Client_Accounts_Data[0];
                        }
                        this.issLoading = false;
                },
                        Rows => {
                                this.issLoading = false;
                        });
        }

        Accounts_Typeahead(event: any) {

                this.issLoading = true;
                var Value = "";
                if (event.target.value == "")
                        Value = undefined;
                else
                        Value = event.target.value;

                this.Journal_Entry_Service_.Accounts_Typeahead('1,2,3', Value).subscribe(Rows => {

                        if (Rows != null) {
                                this.Client_Accounts_Data = Rows[0];
                                //this.Print_Client_=this.Client_Accounts_Data[0];
                        }

                        this.issLoading = false;
                },
                        Rows => {
                                this.issLoading = false;
                        });
        }
        Get_Client_Accounts() {

                this.Client_Accounts_Service_.Get_Client_Accounts(this.FromAccount_.Client_Accounts_Id).subscribe(Rows => {

                        this.Client_Accounts_Data_ = Rows[0];
                        //  this.Company_Info = Rows[0];
                        // this.Company_Temp.Company_Id = 0;
                        // this.Company_Temp.Company_Name = "Select";
                        // this.Company_Data.unshift(this.Company_Temp);
                        this.Print_Client_ = this.Client_Accounts_Data_[0];
                },
                        Rows => {
                                //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                        });
        }

        Get_Payment_Mode() {


                this.Payment_Voucher_Service_.Get_Payment_Mode().subscribe(Rows => {

                        this.Payment_Mode_Data = Rows[0];
                        this.Mode_Temp.Payment_Mode_Id = 0;
                        this.Mode_Temp.Payment_Mode_Name = "Select";
                        this.Payment_Mode_Data.unshift(this.Mode_Temp);
                        this.Payment_Mode_ = this.Payment_Mode_Data[0];
                },
                        Rows => {
                                //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                        });
        }

        
        Search_Company() {

                this.Receipt_Voucher_Service_.Search_Company().subscribe(Rows => {

                        this.Company_Data = Rows[0];
                        //  this.Company_Info = Rows[0];
                        // this.Company_Temp.Company_Id = 0;
                        // this.Company_Temp.Company_Name = "Select";
                        // this.Company_Data.unshift(this.Company_Temp);
                        this.Print_Company_ = this.Company_Data[0];
                },
                        Rows => {
                                //  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                        });
        }

        trackByFn(index, item) {
                return index;
        }


        Export()
{
    
        this.Student_Service_.exportExcel(this.Payment_Voucher_Data,'Payment Voucher Report')
       
}
        Address_Change(Address1) {

                // this.Get_Client_Accounts_Change(Client_Accounts_Id);
                this.Payment_Voucher_.Address1 = Address1;
        }
        Search_Payment_Voucher() {
                var look_In_Date_Value = 0, ClientAccount = 0, Voucher_No_search_ = 0, ClientAccounts_Id = 0;
                this.Total_Amounts = 0;
                if (this.Look_In_Date == true)
                        look_In_Date_Value = 1;

                if (this.ToAccount_Search != undefined && this.ToAccount_Search != null)
                        if (this.ToAccount_Search.Client_Accounts_Id != undefined && this.ToAccount_Search.Client_Accounts_Id != null)
                                ClientAccounts_Id = this.ToAccount_Search.Client_Accounts_Id;

                if (this.FromAccount_Search != undefined && this.FromAccount_Search != null)
                        if (this.FromAccount_Search.Client_Accounts_Id != undefined && this.FromAccount_Search.Client_Accounts_Id != null)
                                ClientAccount = this.FromAccount_Search.Client_Accounts_Id;

                if (this.Voucher_No_search != undefined && this.Voucher_No_search != null && this.Voucher_No_search != 0)
                        Voucher_No_search_ = this.Voucher_No_search;

                this.issLoading = true;
                this.Payment_Voucher_Service_.Search_Payment_Voucher(moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'), ClientAccount, ClientAccounts_Id, Voucher_No_search_, look_In_Date_Value).subscribe(Rows => {

                        this.Payment_Voucher_Data = Rows[0];

                        this.Total_Entries = this.Payment_Voucher_Data.length;

                        for (var i = 0; i < this.Payment_Voucher_Data.length; i++) {
                                this.Total_Amounts = Number(this.Total_Amounts) + Number(this.Payment_Voucher_Data[i].Amount);
                        }
                        if (this.Payment_Voucher_Data.length == 0) {
                                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No Details Found', Type: "3" } });
                        }
                        this.issLoading = false;
                },
                        Rows => {
                                this.issLoading = false;
                                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
                        });

        }

        display_FromAccount(Client_Accounts_e: Client_Accounts) {

                if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
        }
}

