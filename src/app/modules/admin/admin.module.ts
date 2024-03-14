/***
 * Admin module
 * Declare all componets that is used in admin module
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatProgressSpinnerModule, MatDialogModule, MatAutocompleteModule, MatPaginatorModule, MatToolbarModule, MatSidenavModule, MatSortModule, MatMenuModule, MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { MatNativeDateModule} from '@angular/material';
import { SharedModule } from '../shared-module/shared-module';
import { AdminRoutes } from './admin.routing';
import { AdminComponent } from './admin.component';
import {HttpClientModule} from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { Home_PageComponent } from './Home_Page/Home_Page.component'; 
import { AccountsComponent } from './Accounts/Accounts.component';
import { AgentComponent } from './Agent/Agent.component';

import { Agent_CommisionComponent } from './Agent_Commision/Agent_Commision.component';
import { Agent_Course_TypeComponent } from './Agent_Course_Type/Agent_Course_Type.component';
import { BatchComponent } from './Batch/Batch.component';
import { CandidateComponent } from './Candidate/Candidate.component';
import { Candidate_FollowupComponent } from './Candidate_Followup/Candidate_Followup.component';
import { Applied_CandidateComponent } from './Applied_Candidate/Applied_Candidate.component';
import { AttendanceComponent } from './Attendance/Attendance.component';
import { Attendance_ReportComponent } from './Attendance_Report/Attendance_Report.component';
import { CategoryComponent } from './Category/Category.component';
import { Certificate_RequestComponent } from './Certificate_Request/Certificate_Request.component';
import { CertificatesComponent } from './Certificates/Certificates.component';
import { CourseComponent } from './Course/Course.component';
import { Course_FeesComponent } from './Course_Fees/Course_Fees.component';
import { Course_Import_DetailsComponent } from './Course_Import_Details/Course_Import_Details.component';
import { Course_Import_MasterComponent } from './Course_Import_Master/Course_Import_Master.component';
import { Course_SubjectComponent } from './Course_Subject/Course_Subject.component';
import { Course_TypeComponent } from './Course_Type/Course_Type.component';
import { DocumentComponent } from './Document/Document.component';
import { Exam_DetailsComponent } from './Exam_Details/Exam_Details.component';
import { Exam_MasterComponent } from './Exam_Master/Exam_Master.component';
import { ExperienceComponent } from './Experience/Experience.component';
import { Fees_Collection_ReportComponent } from './Fees_Collection_Report/Fees_Collection_Report.component';
import { Fees_Outstanding_ReportComponent } from './Fees_Outstanding_Report/Fees_Outstanding_Report.component';
import { Fees_ReceiptComponent } from './Fees_Receipt/Fees_Receipt.component';
import { Fees_TypeComponent } from './Fees_Type/Fees_Type.component';
import { Followup_TypeComponent } from './Followup_Type/Followup_Type.component';
import { Functionl_AreaComponent } from './Functionl_Area/Functionl_Area.component';
import { Job_PostingComponent } from './Job_Posting/Job_Posting.component';
import { Mark_ListComponent } from './Mark_List/Mark_List.component';
import { PartComponent } from './Part/Part.component';
import { QualificationComponent } from './Qualification/Qualification.component';
import { QuestionComponent } from './Question/Question.component';
import { Question_ImportComponent } from './Question_Import/Question_Import.component';
import { SettingsComponent } from './Settings/Settings.component';
import { SpecializationComponent } from './Specialization/Specialization.component';
import { StatusComponent } from './Status/Status.component';
import { StudentComponent } from './Student/Student.component';
import { Student_CourseComponent } from './Student_Course/Student_Course.component';
import { Student_Course_SubjectComponent } from './Student_Course_Subject/Student_Course_Subject.component';
import { Student_FollowupComponent } from './Student_Followup/Student_Followup.component';
import { Study_MaterialsComponent } from './Study_Materials/Study_Materials.component';
import { SubjectComponent } from './Subject/Subject.component';
import { UniversityComponent } from './University/University.component';
import { University_FollowupComponent } from './University_Followup/University_Followup.component';
import { User_RoleComponent } from './User_Role/User_Role.component';
import { User_TypeComponent } from './User_Type/User_Type.component';
import { UsersComponent } from './Users/Users.component';
import { Employer_DetailsComponent} from './Employer_Details/Employer_Details.component';
import { TransactionComponent } from './Transaction/Transaction.component';
import { InterviewComponent } from './Interview/Interview.component';
import { PlacedComponent } from './Placed/Placed.component';
import { Placed_ReportComponent } from './Placed_Report/Placed_Report.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { Registration_ReportComponent } from './Registration_Report/Registration_Report.component';
import { Interview_ReportComponent } from './Interview_Report/Interview_Report.component';
import { Transaction_ReportComponent } from './Transaction_Report/Transaction_Report.component';
import { Admission_ReportComponent } from './Admission_Report/Admission_Report.component';
import { Enquiry_SourceComponent } from './Enquiry_Source/Enquiry_Source.component';
import { Lead_ReportComponent } from './Lead_Report/Lead_Report.component';
import { Candidate_Job_ApplyComponent } from './Candidate_Job_Apply/Candidate_Job_Apply.component';
import { Fees_InstalmentComponent } from './Fees_Instalment/Fees_Instalment.component';
import { Question_Import_MasterComponent } from './Question_Import_Master/Question_Import_Master.component';
import { Question_Import_DetailsComponent } from './Question_Import_Details/Question_Import_Details.component';
import { StateComponent } from './State/State.component';
import {Pending_FollowUpComponent} from './Pending_FollowUp/Pending_FollowUp.component';
import {Fees_Due_ReportComponent} from './Fees_Due_Report/Fees_Due_Report.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { from } from 'rxjs';
import { Student_ImportComponent } from './Student_Import/Student_Import.component';
import { CompanyComponent } from './Company/Company.component';
import { Batch_ReportComponent } from './Batch_Report/Batch_Report.component';
import { Course_ReportComponent } from './Course_Report/Course_Report.component';
import { Candidate_ListComponent } from './Candidate_List/Candidate_List.component';
import { StudentMark_ReportComponent } from './StudentMark_Report/StudentMark_Report.component';
import { Level_ImportComponent } from './Level_Import/Level_Import.component';
import {Level_Import_NewComponent} from './Level_Import_New/Level_Import_New.component';
import { BooksComponent } from './Books/Books.component';
import { Books_IssueComponent } from './Books_Issue/Books_Issue.component';
import { Level_InformationComponent } from './Level_Information/Level_Information.component';
import { ExamComponent } from './Exam/Exam.component';
import { Internal_ExampageComponent } from './Internal_Exampage/Internal_Exampage.component';
import { Final_ExampageComponent } from './Final_Exampage/Final_Exampage.component';
import { Leave_ApprovalComponent } from './Leave_Approval/Leave_Approval.component';
import { Attendance_MasterComponent } from './Attendance_Master/Attendance_Master.component';
import { Salary_Calculation_MasterComponent } from './Salary_Calculation_Master/Salary_Calculation_Master.component';
import { Leave_RequestComponent } from './Leave_Request/Leave_Request.component';
import { Account_GroupComponent } from './Account_Group/Account_Group.component';
import { Account_YearsComponent } from './Account_Years/Account_Years.component';
import { BankComponent } from './Bank/Bank.component';
import { Cheque_BookComponent } from './Cheque_Book/Cheque_Book.component';
import { Client_AccountsComponent } from './Client_Accounts/Client_Accounts.component';
import { Contra_EntryComponent } from './Contra_Entry/Contra_Entry.component';
import { Contra_ReportComponent } from './Contra_Report/Contra_Report.component';
import { DayBook_ReportComponent } from './DayBook_Report/DayBook_Report.component';
import { Journal_EntryComponent } from './Journal_Entry/Journal_Entry.component';
import { Journal_ReportComponent } from './Journal_Report/Journal_Report.component';
import { LedgerComponent } from './Ledger/Ledger.component';
import { LocationComponent } from './Location/Location.component';
import { Payment_ReportComponent } from './Payment_Report/Payment_Report.component';
import { Payment_VoucherComponent } from './Payment_Voucher/Payment_Voucher.component';
import { Receipt_ReportComponent } from './Receipt_Report/Receipt_Report.component';
import { Receipt_VoucherComponent } from './Receipt_Voucher/Receipt_Voucher.component';
import { Application_ReportComponent } from './Application_Report/Application_Report.component';
import { Receipt_Summary_ReportComponent } from './Receipt_Summary_Report/Receipt_Summary_Report.component';
import { Registration_Fees_ReportComponent } from './Registration_Fees_Report/Registration_Fees_Report.component';
import { Book_Issue_ReportComponent } from './Book_Issue_Report/Book_Issue_Report.component';
import { Book_Return_ReportComponent } from './Book_Return_Report/Book_Return_Report.component';
import { Data_ImportComponent } from './Data_Import/Data_Import.component';
import { CountryComponent } from './Country/Country.component';
import { Application_CourseComponent } from './Application_Course/Application_Course.component';
import { Application_UniversityComponent } from './Application_University/Application_University.component';
import { Employee_AttendanceComponent } from './Employee_Attendance/Employee_Attendance.component';
import { Employee_Attendance_ReportComponent } from './Employee_Attendance_Report/Employee_Attendance_Report.component';
import { Purchase_MasterComponent } from './Purchase_Master/Purchase_Master.component';
import { Payment_RequestComponent } from './Payment_Request/Payment_Request.component';
import { Agent_DetailsComponent } from './Agent_Details/Agent_Details.component';
import { Payment_ApprovalComponent } from './Payment_Approval/Payment_Approval.component';
import { PurchaseApprovalComponent } from './purchase-approval/purchase-approval.component';
import { ApplicationOutstandingReportComponent } from './application-outstanding-report/application-outstanding-report.component';
import { ApplicationCollectionReportComponent } from './application-collection-report/application-collection-report.component';
import { Document_TypeComponent } from './Document_Type/Document_Type.component';
import { Process_TypeComponent } from './Process_Type/Process_Type.component';
import { Employees_ListComponent } from './Employees_List/Employees_List.component';
@NgModule({
imports: [ RouterModule.forChild(AdminRoutes),SharedModule,MatTableModule,HttpClientModule,MatPaginatorModule,
    MatSortModule, MatIconModule,MatMenuModule,GoogleChartsModule,MatSelectModule, MatButtonModule,
    MatDialogModule, MatToolbarModule, MatExpansionModule, MatSidenavModule, MatAutocompleteModule,
    MatProgressSpinnerModule,MatFormFieldModule,MatDatepickerModule,ScrollingModule,FormsModule,
    HttpModule  ],
declarations: [AdminComponent, Home_PageComponent, AccountsComponent,AgentComponent,AttendanceComponent,
  Attendance_ReportComponent,Agent_CommisionComponent,Agent_Course_TypeComponent,BatchComponent,CandidateComponent,
  Candidate_FollowupComponent,Applied_CandidateComponent,CategoryComponent,Certificate_RequestComponent,
  CertificatesComponent,CourseComponent,Course_FeesComponent,Course_Import_DetailsComponent,Admission_ReportComponent,
  Course_Import_MasterComponent,Course_SubjectComponent,Course_TypeComponent,DocumentComponent,Lead_ReportComponent,
  Exam_DetailsComponent,Exam_MasterComponent,ExperienceComponent,Fees_Outstanding_ReportComponent,Fees_ReceiptComponent,
  Fees_TypeComponent,Followup_TypeComponent,Functionl_AreaComponent,Job_PostingComponent,Fees_Collection_ReportComponent,
  Mark_ListComponent,PartComponent,QualificationComponent,QuestionComponent,Question_ImportComponent,
  SettingsComponent,SpecializationComponent,StatusComponent,StudentComponent,Student_CourseComponent,Enquiry_SourceComponent,
  Student_Course_SubjectComponent,Student_FollowupComponent, Home_PageComponent,Study_MaterialsComponent,
  SubjectComponent,UniversityComponent,University_FollowupComponent,User_RoleComponent,User_TypeComponent,
  UsersComponent,Employer_DetailsComponent,TransactionComponent,InterviewComponent,PlacedComponent,Placed_ReportComponent,DashboardComponent,
  Registration_ReportComponent,Interview_ReportComponent,Transaction_ReportComponent,Candidate_Job_ApplyComponent,
  Fees_InstalmentComponent,Question_Import_MasterComponent,Question_Import_DetailsComponent,StateComponent,Pending_FollowUpComponent,
  Fees_Due_ReportComponent,Student_ImportComponent,CompanyComponent,
  Batch_ReportComponent,Course_ReportComponent,Candidate_ListComponent,
  StudentMark_ReportComponent,Level_ImportComponent,Level_Import_NewComponent,
  BooksComponent,Books_IssueComponent,Level_InformationComponent,ExamComponent,
  Internal_ExampageComponent,Final_ExampageComponent,Leave_ApprovalComponent,Attendance_MasterComponent,Salary_Calculation_MasterComponent,Leave_RequestComponent,
 Account_GroupComponent,
  Account_YearsComponent,
BankComponent,
Cheque_BookComponent,
Client_AccountsComponent,
Contra_EntryComponent,
Contra_ReportComponent,
DayBook_ReportComponent,
Journal_EntryComponent,
Journal_ReportComponent,
LedgerComponent,
LocationComponent,
Payment_ReportComponent,
Payment_VoucherComponent,         
Receipt_ReportComponent,
Receipt_VoucherComponent,
Application_ReportComponent,
Receipt_Summary_ReportComponent,Registration_Fees_ReportComponent,Book_Issue_ReportComponent,Book_Return_ReportComponent,Data_ImportComponent,
CountryComponent,Application_CourseComponent,Application_UniversityComponent,Employee_AttendanceComponent,
Employee_Attendance_ReportComponent,Purchase_MasterComponent,Payment_RequestComponent,Agent_DetailsComponent,Payment_ApprovalComponent, PurchaseApprovalComponent,
 ApplicationOutstandingReportComponent, ApplicationCollectionReportComponent,Document_TypeComponent,Process_TypeComponent,
 Employees_ListComponent


]
})

export class AdminModule { }
