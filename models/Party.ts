class Party {
	private _id: number;
	private _initials: string;
	private _fullName: string;

	constructor(){
		this._id = 0;
		this._initials = "";
		this._fullName = "";
	}

	public get id(): number {
		return this._id;
	}

	public set id(newId: number){
		this._id = newId;
	}

	public get initials(): string {
		return this._initials;
	}

	public set initials(newInitials: string){
		this._initials = newInitials;
	}

	public get fullName(): string {
		return this._fullName;
	}

	public set fullName(newFullName: string){
		this._fullName = newFullName;
	}
}

export default Party;
