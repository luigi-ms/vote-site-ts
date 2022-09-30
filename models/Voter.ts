import User from './User';

class Voter extends User {
	private _id: number;
	private _votedYet: boolean;

	constructor(){
		super('', 0);
		this._id = 0;
		this._votedYet = false;
	}

	public get id(): number {
		return this._id;
	}

	public set id(newId: number){
		this._id = newId;
	}

	public get votedYet(): boolean {
		return this._votedYet;
	}

	public set votedYet(newVotedYet: boolean){
		this._votedYet = newVotedYet;
	}
}

export default Voter;
