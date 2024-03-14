export class Course_Fees
{
Course_Fees_Id:number;
Course_Id:number;
Fees_Type_Id:number;
Amount:number;
Tax:number;
    Fees_Type_Name:string;
No_Of_Instalment:string;
Instalment_Period:number;
Is_Associate:boolean;
Is_Associate_:number;
Is_Agent:boolean;
Is_Agent_:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

