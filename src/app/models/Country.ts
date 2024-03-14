export class Country
{
Country_Id:number;
Country_Name:string;
Country_Temp:string;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

