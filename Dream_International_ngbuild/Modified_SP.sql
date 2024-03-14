DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Register_Student`(In Student_Id_ int , User_Id_ int,Registration_Fees_ int,Enquiry_For_Id_ int)
BEGIN
declare Client_Accounts_Id_ int;declare Client_Accounts_Name_ varchar(100);declare Address1_ varchar(100);declare Address2_ varchar(100);
declare Address3_ varchar(100);declare Address4_ varchar(100);declare Pincode_ varchar(100);declare Phone_ varchar(100);declare Mobile_ varchar(100);
declare Email_ varchar(100);declare Is_registered_ tinyint;declare Is_Mail_Status_ tinyint;declare Is_Status_ tinyint;
declare reg varchar(100);declare Registration_No_ int;

set reg=(select max(Registration_No) from Student where DeleteStatus=false);
if (reg<>0 or reg<>null or reg ="") then
set Registration_No_ = (SELECT COALESCE( MAX(Registration_No),0)+1 from Student);
/*else
set Registration_No_ = (select Registration_No from settings where DeleteStatus=false);*/
end if;

select Student_Name,Address1,Address2,Address3,Address4,Pincode,Phone,Mobile,Email
INTO Client_Accounts_Name_,Address1_,Address2_,Address3_,Address4_,Pincode_,Phone_,Mobile_,Email_
from Student  where Student_Id=Student_Id_;
set Client_Accounts_Id_=(select COALESCE(Client_Accounts_Id,0) from  Student where Student_Id=Student_Id_ and DeleteStatus=false);
if (Client_Accounts_Id_>0) then
update Client_Accounts set Email=Email_,Client_Accounts_Name=Client_Accounts_Name_,Account_Group_Id=3,Address1=Address1_,Address2=Address2_,
        Address3=Address3_,Address4=Address4_,Pincode=Pincode_,Phone=Phone_,Mobile=Mobile_ where Client_Accounts_Id=Client_Accounts_Id_;
else
INSERT INTO Client_Accounts(Client_Accounts_Id ,Account_Group_Id ,Client_Accounts_Code ,Client_Accounts_Name ,Client_Accounts_No ,Address1 ,
         Address2 ,Address3 ,Address4 ,PinCode ,StateCode,GSTNo,PanNo, State ,Country ,Phone ,Mobile ,Email ,Opening_Balance ,Description1 ,
Entry_Date ,UserId ,LedgerInclude ,CanDelete ,Commision ,Opening_Type,Employee_Id,DeleteStatus )
values (Client_Accounts_Id_ ,3 ,'' ,Client_Accounts_Name_ ,'' ,Address1_ ,Address2_ ,Address3_ ,Address4_ ,PinCode_ ,'','','', '' ,'' ,Phone_ ,
        Mobile_ ,Email_ ,0 ,'' ,curdate() ,User_Id_ ,'Y' ,'Y' ,0 ,0,0,false);
        set Client_Accounts_Id_ =(SELECT LAST_INSERT_ID());
        end if;        
if(Enquiry_For_Id_=2) then
call `Save_Journal_Entry`( 0,now(),Client_Accounts_Id_,Registration_Fees_,5,1,User_Id_,1,'',1,0);
end if;
Update Student set Registered = true , Registered_By = User_Id_ ,Registered_On = now(),Client_Accounts_Id=Client_Accounts_Id_,Registration_No=Registration_No_,
        Registration_Fees=Registration_Fees_ where Student_Id = Student_Id_;
#set Is_registered_ = (select Registered from student where Student_Id = Student_Id_);
#set Is_Mail_Status_ = (select Mail_Status from student where Student_Id = Student_Id_);
#set Is_Status_ = (select Status_FollowUp from student where Student_Id = Student_Id_);
#select Student_Id_,Is_registered_,Is_Mail_Status_,Is_Status_;
select Student_Id_;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Application_Course`( In Application_Course_Id_ Int)
Begin 
 SELECT Application_Course_Id,
Application_Course_Name
/*Subject_Id,
Sub_Section_Id ,
Duration_Id,
Level_Id,
Ielts_Minimum_Score,
Internship_Id,
Notes,
Details,
Application_Fees,
Tution_Fees ,
Entry_Requirement,
Living_Expense,
Work_Experience,
IELTS_Name,
Intake_Name,
University_Id,
Country_Id,
Tag,
Application_Course_Status,
Intake_Name,
Tution_Fees,
Entry_Requirement,
IELTS_Name,
Duration,
Living_Expense,
Work_Experience,
Registration_Fees,
Date_Charges,
Bank_Statements,
Insurance,
VFS_Charges,
Apostille,
Other_Charges*/
 From Application_Course where Application_Course_Id =Application_Course_Id_ and DeleteStatus=false ;

  /*SELECT  case when  Intake_Status=1 then true else false end as Intake_Status , case when  Application_Course_intake_id>0 then true else false end as Intake_Selection
  ,Intake_Name,intake.Intake_Id from Intake left join  Application_Course_intake on Application_Course_intake.Intake_Id=intake.Intake_Id
  and Application_Course_intake.Application_Course_id =Application_Course_id_
  order by Intake_Name ;*/
  
 End$$
DELIMITER ;
