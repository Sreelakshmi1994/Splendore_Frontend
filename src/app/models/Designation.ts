export class Designation
{
Designation_Id:number;
Designation_Name:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

