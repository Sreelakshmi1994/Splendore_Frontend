export class Item_Group {
	Item_Group_Id: number;
	Item_Group_Code: string;
	Item_Group_Name: string;
	UnderGroupId: number;
	Check_Box: boolean;
	Account_Group_Id:number;
	Group_Name:string;
	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
