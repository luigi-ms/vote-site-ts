class Position {
	private _id: number;
	private _title: string;

	constructor(){
		this._id = 0;
		this._title = "";
	}

	public get id(): number {
		return this._id;
	}

	public set id(newId: number){
		this._id = newId;
	}

	public get title(): string {
		return this._title;
	}

	public set title(newTitle: string){
		this._title = newTitle;
	}
}

export default Position;
