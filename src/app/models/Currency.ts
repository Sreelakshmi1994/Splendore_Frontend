export class Currency
{
Currency_Id:number;
Currency_Name:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

