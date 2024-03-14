export class ApplicationStatus
{
    Application_status_Id:number;
    Application_Status_Name:string;
    DeleteStatus:number;
    View:boolean;
    Application_Group_Id:number;
    Application_Group_Name:string;
    Transfer_Status:boolean;
    Notification_Status:boolean;
    Notification_Department_Id:number;
    Notification_Department_Name:string;
    Transfer_Department_Name:string;
    Transfer_Department_Id:number;
    Group_Restriction:number;
    Remark:string;

    
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

