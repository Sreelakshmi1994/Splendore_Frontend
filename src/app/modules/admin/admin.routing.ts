/***
 * All routes with in admin module should be defined here
 */
    import { Routes } from '@angular/router';
    import { AdminComponent } from './admin.component';
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
    import { Pending_FollowUpComponent } from './Pending_FollowUp/Pending_FollowUp.component';
    import { Fees_Due_ReportComponent } from './Fees_Due_Report/Fees_Due_Report.component';
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
import { Cheque_Book } from 'app/models/Cheque_Book';
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
 //import { Userwise_SummaryComponent } from './Userwise_Summary/Userwise_Summary.component'; 
 //import { Enquiry_Source_ReportComponent } from './Enquiry_Source_Report/Enquiry_Source_Report.component';
 export const AdminRoutes: Routes = [
     {
         path: '',
         component: AdminComponent,
         children: [
             { path: '', redirectTo: '/Dashboard', pathMatch: 'full' },
             { path: 'Accounts', component: AccountsComponent },
             { path: 'Agent', component: AgentComponent },
             { path: 'Agent_Commision', component: Agent_CommisionComponent },
             { path: 'Agent_Course_Type', component: Agent_Course_TypeComponent },
             { path: 'Batch', component: BatchComponent },
             { path: 'Candidate', component: CandidateComponent },
             { path: 'Candidate_Followup', component: Candidate_FollowupComponent },
             { path: 'Applied_Candidate', component: Applied_CandidateComponent },
             { path: 'Attendance', component: AttendanceComponent },
             { path: 'Attendance_Report', component: Attendance_ReportComponent },
             { path: 'Category', component: CategoryComponent },
             { path: 'Certificate_Request', component: Certificate_RequestComponent },
             { path: 'Certificates', component: CertificatesComponent },
             { path: 'Course', component: CourseComponent },
             { path: 'Course_Fees', component: Course_FeesComponent },
             { path: 'Course_Import_Details', component: Course_Import_DetailsComponent },
             { path: 'Course_Import_Master', component: Course_Import_MasterComponent },
             { path: 'Course_Subject', component: Course_SubjectComponent },
             { path: 'Course_Type', component: Course_TypeComponent },
             { path: 'Document', component: DocumentComponent },
             { path: 'Exam_Details', component: Exam_DetailsComponent },
             { path: 'Exam_Master', component: Exam_MasterComponent },
             { path: 'Experience', component: ExperienceComponent },
             { path: 'Fees_Collection_Report', component: Fees_Collection_ReportComponent },
             { path: 'Fees_Outstanding_Report', component: Fees_Outstanding_ReportComponent },
             { path: 'Fees_Receipt', component: Fees_ReceiptComponent },
             { path: 'Fees_Type', component: Fees_TypeComponent },
             { path: 'Followup_Type', component: Followup_TypeComponent },
             { path: 'Functionl_Area', component: Functionl_AreaComponent },
             { path: 'Job_Posting', component: Job_PostingComponent },
             { path: 'Mark_List', component: Mark_ListComponent },
             { path: 'Part', component: PartComponent },
             { path: 'Qualification', component: QualificationComponent },
             { path: 'Question', component: QuestionComponent },
             { path: 'Question_Import', component: Question_ImportComponent },
             { path: 'Settings', component: SettingsComponent },
             { path: 'Specialization', component: SpecializationComponent },
             { path: 'Status', component: StatusComponent },
             { path: 'Student', component: StudentComponent },
             { path: 'Student_Course', component: Student_CourseComponent },
             { path: 'Student_Course_Subject', component: Student_Course_SubjectComponent },
             { path: 'Student_Followup', component: Student_FollowupComponent },
             { path: 'Study_Materials', component: Study_MaterialsComponent },
             { path: 'Subject', component: SubjectComponent },
             { path: 'University', component: UniversityComponent },
             { path: 'University_Followup', component: University_FollowupComponent },
             { path: 'User_Role', component: User_RoleComponent },
             { path: 'User_Type', component: User_TypeComponent },
             { path: 'Users', component: UsersComponent },
             { path: 'Employer_Details', component: Employer_DetailsComponent},
             { path: 'Resume', component: TransactionComponent },
             { path: 'Interview', component: InterviewComponent },
             { path: 'Placed', component: PlacedComponent },
             { path: 'Placed_Report', component: Placed_ReportComponent },
             { path: 'Home_Page', component: Home_PageComponent },
             { path: 'Dashboard', component: DashboardComponent },
             { path: 'Registration_Report', component: Registration_ReportComponent },
             { path: 'Interview_Report', component: Interview_ReportComponent },
             { path: 'Resume_Report', component: Transaction_ReportComponent },
             { path: 'Admission_Report', component: Admission_ReportComponent },
             { path: 'Enquiry_Source', component: Enquiry_SourceComponent },
             { path: 'Lead_Report', component: Lead_ReportComponent },
             { path: 'Candidate_Job_Apply', component: Candidate_Job_ApplyComponent },
             { path: 'Fees_Instalment', component: Fees_InstalmentComponent},
             { path: 'Question_Import', component: Question_ImportComponent},
             { path: 'Question_ImportMaster', component: Question_Import_MasterComponent},
             { path: 'Question_Import_Details', component: Question_Import_DetailsComponent},
             { path: 'State', component: StateComponent},
             { path: 'Pending_FollowUp', component: Pending_FollowUpComponent},
             { path: 'Fees_Due_Report', component: Fees_Due_ReportComponent},
             { path: 'Student_Import', component: Student_ImportComponent},
             { path: 'Company', component: CompanyComponent},
             { path: 'Batch_Report', component: Batch_ReportComponent},
             { path: 'Course_Report', component: Course_ReportComponent},
             { path: 'Candidate_List', component: Candidate_ListComponent},
             { path: 'StudentMark_Report', component: StudentMark_ReportComponent},
             { path: 'Level_Import', component: Level_ImportComponent},
             {path:'Level_Import_New',component:Level_Import_NewComponent},   
             {path:'Books',component:BooksComponent},   
             {path:'Books_Issue',component:Books_IssueComponent}, 
             {path:'Level_Information',component:Level_InformationComponent}, 
             {path:'Exam',component:ExamComponent}, 
             {path:'Internal_Exampage',component:Internal_ExampageComponent}, 
             {path:'Final_Exampage',component:Final_ExampageComponent},
             {path:'Leave_Approval',component:Leave_ApprovalComponent},
             {path:'Attendance_Master',component:Attendance_MasterComponent},
             {path:'Salary_Calculation_Master',component:Salary_Calculation_MasterComponent},
             {path:'Leave_Request',component:Leave_RequestComponent},

             {path:'Account_Group',component:Account_GroupComponent},
             {path:'Account_Years',component:Account_YearsComponent},
             {path:'Bank',component:BankComponent},
             {path:'Cheque_Book',component:Cheque_BookComponent},
             {path:'Client_Accounts',component:Client_AccountsComponent},
             {path:'Contra_Entry',component:Contra_EntryComponent},
             {path:'Contra_Report',component:Contra_ReportComponent},
             {path:'DayBook_Report',component:DayBook_ReportComponent},
             {path:'Journal_Entry',component:Journal_EntryComponent},
             {path:'Journal_Report',component:Journal_ReportComponent},
             {path:'Ledger',component:LedgerComponent},
             {path:'Location',component:LocationComponent},
             {path:'Payment_Report',component:Payment_ReportComponent},
             {path:'Payment_Voucher',component:Payment_VoucherComponent},         
             {path:'Receipt_Report',component:Receipt_ReportComponent},
             {path:'Receipt_Voucher',component:Receipt_VoucherComponent},
           
             {path:'Application_Report',component:Application_ReportComponent},
             {path:'Receipt_Summary_Report',component:Receipt_Summary_ReportComponent},
             {path:'Registration_Fees_Report',component:Registration_Fees_ReportComponent},
             {path:'Book_Issue_Report',component:Book_Issue_ReportComponent},
             {path:'Book_Return_Report',component:Book_Return_ReportComponent},
             {path:'Data_Import',component:Data_ImportComponent},
             {path:'Country',component:CountryComponent},
             {path:'Application_Course',component:Application_CourseComponent},
            //  {path:'Application_Course',component:Application_CourseComponent},
             {path:'Application_University',component:Application_UniversityComponent},
             {path:'Employee_Attendance',component:Employee_AttendanceComponent},
             {path:'Employee_Attendance_Report',component:Employee_Attendance_ReportComponent},
             {path:'Purchase_Master',component:Purchase_MasterComponent},
             {path:'Payment_Request',component:Payment_RequestComponent},
             
             {path:'Payment_Approval',component:Payment_ApprovalComponent},
             {path:'Purchase_Approval',component:PurchaseApprovalComponent},
             {path:'Agent_Details',component:Agent_DetailsComponent},
             {path:'Application_Outstanding_Report',component:ApplicationOutstandingReportComponent},
             {path:'Application_Collection_Report',component:ApplicationCollectionReportComponent},

             {path:'Document_Type',component:Document_TypeComponent},
             {path:'Process_Type',component:Process_TypeComponent},
             {path:'Employees_List',component:Employees_ListComponent},

             { path: '**', redirectTo: '/auth/login' }
             
         ]
     }
 ];
 