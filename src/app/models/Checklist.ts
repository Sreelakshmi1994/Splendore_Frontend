export class Checklist {
   
    Checklist_Id: number;
    Checklist_Name:string;
    Country_Id: number;
    Checklist_Type:number;
    Checklist_Type_Name:string;
    
    
    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}

