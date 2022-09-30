import User from './User';

class Voter extends User {
	private _id: number;

	constructor(){
		super('', 0);
		this._id = 0;
	}

	private get id(): number {
		return this._id;
	}

	private set id(newId: number){
		this._id = newId;
	}
}

export default Voter;
