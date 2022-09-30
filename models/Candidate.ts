import User from './User';

class Candidate extends User {
	private _digit: number;
	private _partyId: number;
	private _positionId: number;
	private _votes: number;
	private _state: string;

	constructor(){
		super('', 0);
		this._digit = 0;
		this._partyId = 0;
		this._positionId = 0;
		this._votes = 0;
		this._state = "";
	}

	public get digit(): number {
		return this._digit;
	}

	public set digit(newDigit: number){
		this._digit = newDigit;
	}

	public get partyId(): number {
		return this._partyId;
	}

	public set partyId(newPartyId: number){
		this._partyId = newPartyId;
	}

	public get positionId(): number {
		return this._positionId;
	}

	public set positionId(newPositionId: number){
		this._positionId = newPositionId;
	}

	public get votes(): number {
		return this._votes;
	}

	public set votes(newVotes: number){
		this._votes = newVotes;
	}

	public get state(): string {
		return this._state;
	}

	public set state(newState: string){
		this._state = newState;
	}
}

export default Candidate;
