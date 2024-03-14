
import { Course_Import_Master } from '../models/Course_Import_Master';
export class Import_Master
{

 Import_Master_Id:number;
 Entry_Date:Date;


// Description1:string;
// User_Id:string;ac
// Store_Id:number;

Course_Import:Course_Import_Master[]
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

